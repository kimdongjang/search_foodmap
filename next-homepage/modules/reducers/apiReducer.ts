import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const testFetch = createAsyncThunk<string>(
  // string action type value: 이 값에 따라 pending, fulfilled, rejected가 붙은 액션 타입이 생성된다.
  'test',
  // payloadCreator callback: 비동기 로직의 결과를 포함하고 있는 프로미스를 반환하는 비동기 함수
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        'https://dog.ceo/api/breeds/image/random'
      )
      console.log(response.data)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
  // 세 번째 파라미터로 추가 옵션을 설정할 수 있다.
  // condition(arg, { getState, extra } ): boolean (비동기 로직 실행 전에 취소하거나, 실행 도중에 취소할 수 있다.)
  // dispatchConditionRejection: boolean (true면, condition()이 false를 반환할 때 액션 자체를 디스패치하지 않도록 한다.)
  // idGenerator(): string (requestId를 만들어준다. 같은 requestId일 경우 요청하지 않는 등의 기능을 사용할 수 있게 된다.)
)

export const testSlice = createSlice({
  name: 'test',
  initialState: {
    imgHref: '',
    loading: 'idle',
    currentRequestId: undefined,
    error: null,
  },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(testFetch.pending, (state, action) => {
      // Add user to the state array
      state.loading = 'pending'
    })
    builder.addCase(testFetch.fulfilled, (state, action) => {
      state.loading = 'fulfilled'
      state.imgHref = action.payload
      state.currentRequestId = undefined
      // const { requestId } = action.meta
      // if (state.loading === 'pending' && state.currentRequestId === requestId) {
      //   state.loading = 'fulfilled'
      //   state.imgHref = action.payload
      //   state.currentRequestId = undefined
      // }
    })
    builder.addCase(testFetch.rejected, (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.error = action.error
        state.currentRequestId = undefined
      }
    })
  },
})
