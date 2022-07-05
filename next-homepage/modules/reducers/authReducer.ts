import { createSlice, SerializedError } from "@reduxjs/toolkit"
import { PayloadAction } from "typesafe-actions"
import { fetchUser, register } from "../../auth/thunk"

export enum AuthStates {
  IDLE = 'idle',
  LOADING = 'loading',
}

export interface AuthSliceState {
  accessToken: string,
  loading: AuthStates,
  me?: {
    name?: string,
    email?: string
  },
  error?: SerializedError
}

// That's what we will store in the auth slice.
const internalInitialState:AuthSliceState = {
  accessToken: '',
  loading: AuthStates.IDLE,
  me: null,
  error: null,
}

const authSlice = createSlice({
  name: 'auth', // nme of the slice taht we will use
  initialState: internalInitialState,
  reducers: {
    updateAccessToken: (state: AuthSliceState,action) => {
      state.accessToken = action.payload.token
    },
    reset: () => internalInitialState,
  },
  
  // createAsyncThunk를 통해 생성한 함수의 콜백을 사용하는 builder를 리듀서에 연결
  extraReducers: (builder) => {
    builder.addCase(fetchUser.rejected, (state, action) => {
      // 1. Reset state with initial state + add error to state.
      console.log("extra reducers")
      // thunkAPI.rejectWithValue를 통해 에러가 발생할 경우, 초기 상태로 돌리고 에러를 반환
      state = { ...internalInitialState, error: action.error }
      // 2. VERY IMPORTANT! Throw an error!
      throw new Error(action.error.message)
    })
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      // Update the state.
      // fulfilled, 작업이 성공할 경우 데이터를 가져옴
      state.me = action.payload
      state.loading = AuthStates.IDLE
    })
    builder.addCase(register.pending, (state, _action) => {
      // Update the state.
      // 여전히 데이터를 가져오는 상태인 경우 보류임.
      state.loading = AuthStates.LOADING
    })
  },
})


// 정의한 액션과 리듀서를 export한다.
// Actions generated automatically by createSlice function
export const { updateAccessToken, reset } = authSlice.actions;
// or export const authActions = authSlice.actions;

export type AuthState = ReturnType<typeof authSlice.reducer>;
export default authSlice;