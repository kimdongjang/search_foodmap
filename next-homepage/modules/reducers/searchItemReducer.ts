import {
  CaseReducer,
  createAction,
  createReducer,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'

// state type(interface)
export interface searchItem {
  data: string
}
const internalInitialState: searchItem = {
  data: '',
}
// builder 형식의 typescript 구성
// const searchItemReducer = createReducer(internalInitialState, builder => {
//   builder.addCase(changeSearchItem, (state, action: PayloadAction<searchItem>) => action.payload)
// })

const searchItemSlice = createSlice({
  name: 'searchItemSlice',
  initialState: internalInitialState,
  reducers: {
    changeSearchItem: (state, action: PayloadAction<searchItem>) => {
      console.log(action.payload.data)
      state.data = action.payload.data
    },
  },
})
export const searchItemActions = searchItemSlice.actions
export default searchItemSlice
