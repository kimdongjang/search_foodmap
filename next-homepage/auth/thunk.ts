import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { stringify } from "querystring";

/**
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