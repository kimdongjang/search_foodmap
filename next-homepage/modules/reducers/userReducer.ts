import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface user {
  id?: string
  username?: string
  email?: string
  phoneNumber?: string
}

const initialState: user = {
  id: '',
  username: '',
  email: '',
  phoneNumber: '',
}

const userSlice = createSlice({
  name: 'searchItemSlice',
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<user>) => {
      state = action.payload
    },
  },
})
export const userActions = userSlice.actions
export default userSlice
