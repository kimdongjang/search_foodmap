import { createSlice, SerializedError } from "@reduxjs/toolkit"
import { PayloadAction } from "typesafe-actions"

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
  extraReducers: (builder) => {} // here will end up async more complex reducers
})


// 정의한 액션과 리듀서를 export한다.
// Actions generated automatically by createSlice function
export const { updateAccessToken, reset } = authSlice.actions;
// or export const authActions = authSlice.actions;

export type AuthState = ReturnType<typeof authSlice.reducer>;
export default authSlice;