import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { stringify } from "querystring";

/**
 * createAsyncThunk는 createAsyncThunk와 createSlice를 사용하여
 *  Redux Toolkit만으로 비동기 처리를 쉽게 할 수 있으며, redux-saga에서만 사용할 수 있던 기능
 * (이미 호출한 API 요청 취소하기 등)까지 사용할 수 있다.
 * createAsyncThunk는 액션타입 문자열 기반('auth/me')으로 프로미스 라이프 사이클 액션타입 생성하고,
 * thunk action creator(프로미스 콜백을 실행하고 프로미스를 기반으로 라이프사이클 액션을 디스패치)를 반환
 * createAsyncThunk는 결과에 상관없이 무조건 항상 이행된 프로미스를 반환함.
 * try-catch를 이용해 rejectedValue()로 createAsyncThunk 내부에서 오류처리
 */
export const fetchUser = createAsyncThunk('auth/me', async (_, thunkAPI) => {
  try{
    const response = await axios.get<{name: string; email: string; type: string}>('api/me');
    return response.data;
  }
  catch (error){
    return thunkAPI.rejectWithValue(error);
  }
})

/**
 * 파라미터 1: 액션타입 문자열
 * 파라미터 2: 프로미스를 반환하는 비동기 함수
 */
export const register = createAsyncThunk('auth/register',
  async (credentials: {email: string, password:string, name:string }, thunkAPI) => {
    try{
      const response = await axios.post<{accessToken:string}>('api/register', credentials);
      const refetch = await axios.get<{name:string}>('api/me', {
        headers : { Authorization: `Bearer ${response.data.accessToken}`},
      })
      return { accessToken: response.data.accessToken, me: { name:refetch.data.name}}


    }
    catch(error){
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post<{ accessToken: string }>('api/login', credentials)
      const refetch = await axios.get<{ name: string }>('api/me', {
        headers: { Authorization: `Bearer ${response.data.accessToken}` },
      })
      return { accessToken: response.data.accessToken, me: { name: refetch.data.name } }
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