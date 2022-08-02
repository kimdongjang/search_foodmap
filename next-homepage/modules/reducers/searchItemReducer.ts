import { CaseReducer, createAction, createReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { Product } from "../../interfaces/Product";

// state type(interface)
export interface searchItem {
    data: string;
}
const internalInitialState: searchItem = {
  data:""
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
    changeSearchItem:(state, action: PayloadAction<searchItem>)=>{
      state.data = action.payload.data;
    }
  },
})
export const searchItemActions = searchItemSlice.actions;
export default searchItemSlice;


// const searchItemSlice = createSlice({
//     name: "searchItem",
//     initialState:internalInitialState,
//     reducers: {
//         // 액션에 따른 reducer 로직을 작성한다.
//         // createSlice가 자동으로 state의 타입을 추론한다.
//         // 또한 immer를 사용하고 있어 함수 몸체 안에서 직접 변경해도 불변성을 유지한다.
//         setSearchItem: (state,  action) => {
//             state.data = action.payload;
//         },
//     }
// })
// // 정의한 액션과 리듀서를 export한다.
// export const searchItemActions = searchItemSlice.actions;
// // 아래와 같이 actions을 명시하는 것도 가능하다.
// //export const {getProducts,getProductsSuccess,getProductsError } = productsSlice.actions;

// // reducer의 RootState 타입을 지정
// export type searchItemState = ReturnType<typeof searchItemSlice.reducer>;

// export default searchItemSlice;