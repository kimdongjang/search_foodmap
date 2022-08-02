import { configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE, MakeStore } from 'next-redux-wrapper';
import { AnyAction, CombinedState, combineReducers, Store } from 'redux';
import authSlice, { AuthSliceState } from './authReducer';
import productsSlice, { ProductApi } from './productReducer';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import searchItemSlice from './searchItemReducer';

const rootReducer = combineReducers({
  authReducer: authSlice.reducer,
  productReducer: productsSlice.reducer,
  searchItemReducer: searchItemSlice.reducer
})

export default rootReducer;

// ==================================================================================

// // Combine all the slices we created together.
// const combinedReducers = combineReducers({
//   authReducer: authSlice.reducer,
//   productReducer: productsSlice.reducer,
// });

// /**
//  * SSR을 사용하기 때문에, 서버측과 클라이언트 측에 둘다 저장이 되어야함
//  * next-redux-wrapper 패키지를 생성해 자동으로 Store Instance를 생성하고 서버와 클라이언트 둘 다
//  * 동일한 상태를 갖도록 함.
//  * */
// // Type that indicates our whole State will be used for useSelector and other things.
// export type OurStore = ReturnType<typeof combinedReducers>;

// export const rootReducer = (
//   state: ReturnType<typeof combinedReducers>,
//   action: AnyAction
// ) => {
//   /**
//    * 서버와 클라이언트 간의 저장소 동기화를 관리하기 위해 Hydrate 액션 타입을 사용
//     1. HTML string gets rendered in the SSR process
//     2. JS bundle gets created
//     3. HTML is sent to client. It improves SEO as search engine bots can read the HTML.
//     4. JS bundle is sent
//     5. JavaScript bundle gets hydrated to the HTML string
//    *  */
//   if (action.type === HYDRATE) {
//     const nextState = {
//       ...state,
//       ...action.payload,
//     };
//     // If action.type is HYDRATE, then return previous
//     // server side store state that sits in the action.payload.
//     return nextState;
//   }
//   return combinedReducers(state, action);
// };

// // export const store = configureStore<OurStore>({
// //   reducer: rootReducer,
// // });
