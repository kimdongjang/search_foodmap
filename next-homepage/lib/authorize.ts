import { ServerResponse } from 'http'
import { GetServerSidePropsContext } from 'next'
import { AnyAction, Store } from 'redux'
import { OurStore, AppDispatch, wrapper } from '../modules/store'
import * as setCookie from 'set-cookie-parser'
import * as cookie from 'cookie'
import axiosInstance from './axios'
import { AxiosResponse } from 'axios'
import {
  AuthSliceState,
  fetchUser,
  reset,
  updateAccessToken,
} from '../modules/reducers/authReducer'
import { AxiosAuthRefreshRequestConfig } from 'axios-auth-refresh'

// This type contains context of the wrapper.getServerSideProps + State of our store.
export type ContextWithStore = Omit<
  GetServerSidePropsContext & {
    store: Store<OurStore, AnyAction>
  },
  'resolvedUrl'
>

// This type tells us how our callback function will look like.
// We will provide accessToken, store and server response to the callback
// But you can provide whatever you want.
export type Callback = (
  accessToken: string,
  store: Store<OurStore, AnyAction>,
  response: ServerResponse
) => Record<string, unknown> | Promise<Record<string, unknown>>

// General props type for our authorize function.
interface AuthorizeProps {
  context: ContextWithStore
  callback: Callback
}

export const authorize = async ({ context, callback }: AuthorizeProps) => {
  // 필요한 변수를 분해
  const { store, req: request, res: response } = context
  const { dispatch }: { dispatch: AppDispatch } = store // get dispatch action
  const { accessToken } = store.getState().authReducer // get accessToken from memory - redux.
  // 클라이언트 브라우저에서 새로고침 토큰 쿠키를 가져옴
  if (request) {
    // We take cookies (refresh_token) from the client's browser and set it as ours (server-side)

    axiosInstance.defaults.headers.cookie = request.headers.cookie || null

    // 1a. If accessToken exists assign it as Authorization token in our axios instance.
    // 처음에 획득한 액세스토큰이 있을 경우 axios 인스턴스에 할당
    if (accessToken)
      axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`

    if (!accessToken) {
      // 액세스 토큰이 없을 경우
      // No accessToken path:
      // You're probably revisiting the size cuz the accessToken
      // is not available in the server store. Or you refreshed the page.
      // In that case we need to go through the refresh token process.
      try {
        // 1. Call our proxy api refresh token route. Try to refresh the token
        // using the refresh token assigned in step 1 (global).
        const response = await axiosInstance.get<AuthSliceState>(
          '/api/refreshToken'
        )
        const newAccessToken = response.data.accessToken
        // 2. We got new set of cookies from the response.
        // 2a. Parse the refreshToken cookie using 'set-cookie-parser' library
        const responseCookie = setCookie.parse(
          response.headers['set-cookie']
        )[0]
        // 3. Set a fresh cookie header for our axios instance.
        axiosInstance.defaults.headers.cookie = cookie.serialize(
          responseCookie.name,
          responseCookie.value
        )
        // 4. Set a fresh Authorization header for our axios instance.
        axiosInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`
        // 5. Update the client's refresh token
        response.headers.setHeader('set-cookie', response.headers['set-cookie'])
        // 6. And last step => update server's redux store accessToken
        dispatch(updateAccessToken({ token: newAccessToken }))
      } catch (error) {
        // Handle error case. The most possible error would be
        // axios.get('/api/refreshToken) failing
        // that would mean our refreshToken has expired or
        // it is simply wrong. So let's reset our auth slice.
        // So we get logged out :)
        store.dispatch(reset())
        return null
      }
    }

    // Now we should be ready to call the authorized endpoint we want.
    // Disclaimer: its still not 100% sure that we will be able to get the resources
    // Our accessToken we got in line 31 could be INVALID / EXPIRED !
    try {
      // 1. We call the callback. ( some callback with api calls - for example fetching list of frogs )
      // If it fails axios interceptor defined in axios.ts will fire
      // will try to refresh the token for us and call that action once again.
      // 액세스 토큰이 존재하기 때문에 요청하고 싶은 콜백을 호출한다.
      // but, 액세스 토큰이 유효한지 검증해야한다.
      const cbResponse = await callback(accessToken, store, response)
      if (axiosInstance.defaults.headers.setCookie) {
        // 2. Optional
        // If callback fired refreshing the token
        // then the interceptor set a helper header (see axios.ts file)
        // 2a. that we will use to update the client's refreshToken.
        response.setHeader(
          'set-cookie',
          axiosInstance.defaults.headers.setCookie
        )
        // 2b. We also update the accessToken
        dispatch(
          updateAccessToken({
            token: axiosInstance.defaults.headers.Authorization.split(' ')[1],
          })
        )
        // 2c. Then we clean up the header.
        delete axiosInstance.defaults.headers.setCookie
      }
      // 3. We return response.
      return cbResponse
    } catch (e) {
      // We're here when axios interceptor fails to refresh the token.
      // Here we should handle handling/ indicating that the user is not authorized.
      store.dispatch(reset())
      return null
    }
  }
}

interface UserProps {
  callback: Callback
}

export const user = ({ callback }: UserProps) =>
  // 1. We use wrapper from next-wrapper-redux library to wrap our gerServerSideProps
  // with our redux store.
  // property "context" contains store
  {
    wrapper.getServerSideProps(async (context: ContextWithStore) => {
      const { dispatch }: { dispatch: AppDispatch } = context.store
      // 2. Call our authorize Higher order Function
      return authorize({
        context,
        callback: async (...props) => {
          // 3. If we currently don't have our user fetched
          // Then we're not authorized.
          // So try to fetch the user.
          if (!context.store.getState().authReducer.user)
            await dispatch(fetchUser())
          // 4. return the response from the callback
          return callback(...props)
        },
      })
    })
  }
