import {
  CaseReducer,
  createAction,
  createReducer,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { Product } from '../../interfaces/Product'

// state type(interface)
export interface searchItem {
  data: string
  lat?: number
  lng?: number
}
const internalInitialState: searchItem = {
  data: '',
}

// const changeSearchItem = createAction<searchItem>('changeSearchItem');

// builder 형식의 typescript 구성
// const searchItemReducer = createReducer(internalInitialState, builder => {
//   builder.addCase(changeSearchItem, (state, action: PayloadAction<searchItem>) => action.payload)
// })

const searchItemSlice = createSlice({
  name: 'searchItemSlice',
  initialState: internalInitialState,
  reducers: {
    changeSearchItem: (state, action: PayloadAction<searchItem>) => {
      state.data = action.payload.data
    },
  },
})
export const searchItemActions = searchItemSlice.actions
export default searchItemSlice
