import {
  createStore,
  applyMiddleware,
  compose,
  Middleware,
  StoreEnhancer,
  combineReducers,
  AnyAction,
} from 'redux'
import { createWrapper, HYDRATE, MakeStore } from 'next-redux-wrapper'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './reducers/authReducer'
import searchItemSlice from './reducers/searchItemReducer'
import { testSlice } from './reducers/apiReducer'
import { useDispatch } from 'react-redux'

const combinedReducers = combineReducers({
  authReducer: authSlice.reducer,
  testReducer: testSlice.reducer,
  searchItemReducer: searchItemSlice.reducer,
})
export type OurStore = ReturnType<typeof combinedReducers>

const rootReducer = (
  state: ReturnType<typeof combinedReducers>,
  action: AnyAction
) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    }
    return nextState
  }
  return combinedReducers(state, action)
}

export const store = configureStore<OurStore>({
  reducer: rootReducer,
})
const makeStore = () => store

// https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const wrapper = createWrapper(makeStore, { debug: true })
// export const wrapper = createWrapper(makeStore, { storeKey: 'key' })

export type ThunkDispatch = typeof store.dispatch

// 미들웨어 끼리 묶음
// const bindMiddleware = (middlewares: Middleware[]): StoreEnhancer => {
//   const logger = createLogger();

//   // if (process.env.NODE_ENV !== "production") {
//   //   const { composeWithDevTools } = require("redux-devtools-extension");
//   //   return composeWithDevTools(
//   //     applyMiddleware(...middlewares),
//   //     applyMiddleware(logger)
//   //   );
//   // }
//   // return compose(applyMiddleware(...middlewares), applyMiddleware(logger));

//   const { composeWithDevTools } = require("redux-devtools-extension");
//   return composeWithDevTools(
//     applyMiddleware(...middlewares),
//     applyMiddleware(logger)
//   );
//   return compose(applyMiddleware(...middlewares), applyMiddleware(logger));
// };

// // Next Redux Wrapper 리듀서와 rootSaga를 묶음
// export const makeStore = () => {
//   const sagaMiddleware = createSagaMiddleware();
//   // const logger = createLogger();

//   const store = configureStore({reducer: rootReducer, middleware:[sagaMiddleware]});
//   // const store = createStore(rootReducer, bindMiddleware([sagaMiddleware]));
//   // const store = configureStore<OurStore>({
//   //   reducer: rootReducer,
//   //   middleware: [sagaMiddleware]
//   // });

//   sagaMiddleware.run(rootSaga);

//   return store;
// };

// export const wrapper = createWrapper(makeStore, { debug: true });
