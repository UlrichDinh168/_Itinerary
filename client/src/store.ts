import { configureStore, Action, applyMiddleware } from '@reduxjs/toolkit'
import { rootReducer, RootState } from "./reducers";
import { multiClientMiddleware } from "redux-axios-middleware";
import logger from 'redux-logger'
import thunk from "redux-thunk"

import axios from "axios";
import { ThunkAction, } from 'redux-thunk'

// const baseURL = BACKEND_BASE_URL || "http://localhost:8000";
// const baseURL = "http://localhost:8000";

// export const instance = {
//   default: {
//     client: axios.create({
//       baseURL: baseURL,
//       responseType: "json",
//     }),
//   },
// };


// const middleware = [ multiClientMiddleware(client)];
// const isProduction = process.env.NODE_ENV === "production";
// if (!isProduction) {
//   const logger = createLogger();
//   middleware.push(logger);
// }

// const tools = [applyMiddleware(...middleware)];
// if (window.__REDUX_DEVTOOLS_EXTENSION__) {
//   tools.push(window.__REDUX_DEVTOOLS_EXTENSION__());
// }

export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>

// Create redux store
export const store = configureStore({
  reducer: rootReducer,
  middleware: [logger, thunk],
  devTools: process.env.NODE_ENV !== 'production',

})


