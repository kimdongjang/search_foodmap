import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import * as cookie from 'cookie'
import * as setCookie from 'set-cookie-parser'

const axiosInstance = axios.create({
  baseURL: process.env.SERVER_DOMAIN,
  withCredentials: true,
});

// 401 상태의 응답을 받을 경우, 토큰을 새로 고치고 새로운 refreshToken+헤더를 사용해 요청을
// 다시 보내도록 시도.
createAuthRefreshInterceptor(axiosInstance, (failedRequest) =>
// 1. First try request fails - refresh the token.
  axiosInstance.get('/api/refreshToken').then((resp) => {
    // 1a. Clear old helper cookie used in 'authorize.ts' higher order function.
    if(axiosInstance.defaults.headers.setCookie){
      const {accessToken} = resp.data;
      
      // 2. Set up new access token
      const bearer = `Bearer ${accessToken}`;
      axiosInstance.defaults.headers.Authorizaion = bearer;

      const responseCookie = setCookie.parse(resp.headers['set-cookie'])[0]; // // 3a. We can't just acces it, we need to parse it first.
      axiosInstance.defaults.headers.setCookie = resp.headers['set-cookie']; // 3b. Set helper cookie for 'authorize.ts' Higher order Function.
      axiosInstance.defaults.headers.cookie = cookie.serialize(
        responseCookie.name,
        responseCookie.value,
      )
       // 4. Set up access token of the failed request.
      failedRequest.response.config.headers.Authorization = bearer

      // 5. Retry the request with new setup!
      return Promise.resolve()
    }
  })
);

export default axiosInstance