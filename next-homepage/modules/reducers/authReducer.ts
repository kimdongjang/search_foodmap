import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit'
import axios from 'axios'


/**
 * 액세스 토큰을 클라이언트 메모리 어딘가에 저장하기 위해 redux toolkit을 사용
 */

export enum AuthStates {
  IDLE = 'idle',
  LOADING = 'loading',
}

/**
 * createAsyncThunk는 createAsyncThunk와 createSlice를 사용하여
 *  Redux Toolkit만으로 비동기 처리를 쉽게 할 수 있으며, redux-saga에서만 사용할 수 있던 기능
 * (이미 호출한 API 요청 취소하기 등)까지 사용할 수 있다.
 * createAsyncThunk는 액션타입 문자열 기반('auth/me')으로 프로미스 라이프 사이클 액션타입 생성하고,
 * thunk action creator(프로미스 콜백을 실행하고 프로미스를 기반으로 라이프사이클 액션을 디스패치)를 반환
 * createAsyncThunk는 결과에 상관없이 무조건 항상 이행된 프로미스를 반환함.
 * try-catch를 이용해 rejectedValue()로 createAsyncThunk 내부에서 오류처리
 */
export const fetchUser = createAsyncThunk(
  'auth/profile',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<{
        name: string
        email: string
        type: string
      }>('api/users/me')
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

/**
 * 파라미터 1: 액션타입 문자열
 * 파라미터 2: 프로미스를 반환하는 비동기 함수
 */
export const register = createAsyncThunk(
  'auth/register',
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post<{ accessToken: string }>(
        'api/register',
        credentials
      )
      const refetch = await axios.get<{ name: string }>('api/me', {
        headers: { Authorization: `Bearer ${response.data.accessToken}` },
      })
      return {
        accessToken: response.data.accessToken,
        user: { name: refetch.data.name },
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

/**
 * 로그인 api를 호출하고 accessToken을 받아옴
 * credentials: 사용자가 입력한 회원 정보
 */
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      /**
       * 로그인시 리턴 받을 값을 명시(accessToken, etc)
       */
      const response = await axios.post<{ accessToken: string }>(
        'auth/login',
        credentials
      )
      console.log(response.data.accessToken)

      // const refetch = await axios.get<{ email: string }>('/api/users/profile', {
      //   headers: { Authorization: `Bearer ${response.data.accessToken}` },
      // })
      return {
        accessToken: response.data.accessToken,
        // user: { email: refetch.data.email },
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error })
    }
  }
)

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await axios.delete<{ accessToken: string }>('api/logout')
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error })
  }
})

export interface AuthSliceState {
  accessToken: string
  loading: AuthStates
  user?: {
    name?: string
    email?: string
  }
  isLogin: boolean
  error?: SerializedError
}

// That's what we will store in the auth slice.
const internalInitialState: AuthSliceState = {
  accessToken: '',
  loading: AuthStates.IDLE,
  user: null,
  isLogin: false,
  error: null,
}

export const authSlice = createSlice({
  name: 'auth', // nme of the slice taht we will use
  initialState: internalInitialState,
  reducers: {
    updateAccessToken: (state: AuthSliceState, action) => {
      state.accessToken = action.payload.token
    },
    reset: () => internalInitialState,
  },

  // createAsyncThunk를 통해 생성한 함수의 콜백을 사용하는 builder를 리듀서에 연결
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      // Update the state.
      // fulfilled, 작업이 성공할 경우 데이터를 가져옴
      state.accessToken = action.payload.accessToken
      state.isLogin = true
      state.loading = AuthStates.IDLE
    })
    builder.addCase(login.rejected, (state, action) => {
      // 1. Reset state with initial state + add error to state.
      console.log('extra reducers')
      // thunkAPI.rejectWithValue를 통해 에러가 발생할 경우, 초기 상태로 돌리고 에러를 반환
      state = { ...internalInitialState, error: action.error }
      // 2. VERY IMPORTANT! Throw an error!
      throw new Error(action.error.message)
    })
    builder.addCase(login.pending, (state, _action) => {
      // Update the state.
      // 여전히 데이터를 가져오는 상태인 경우 보류임.
      state.loading = AuthStates.LOADING
    })
    builder.addCase(logout.pending, (state) => {
      state.loading = AuthStates.LOADING
    })
    builder.addCase(logout.fulfilled, (state) => {
      internalInitialState
    })

    builder.addCase(register.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken
      state.user = action.payload.user
      state.loading = AuthStates.IDLE
    })
    builder.addCase(register.rejected, (state, action) => {
      state.error = action.error
    })
    builder.addCase(fetchUser.rejected, (state, action) => {
      state = { ...internalInitialState, error: action.error }
      // throw new Error(action.error.message)
    })
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload
    })
  },
})

// 정의한 액션과 리듀서를 export한다.
// Actions generated automatically by createSlice function
export const { updateAccessToken, reset } = authSlice.actions
// or export const authActions = authSlice.actions;

// export type AuthState = ReturnType<typeof authSlice.reducer>;
