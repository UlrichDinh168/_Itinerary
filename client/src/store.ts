import { configureStore } from '@reduxjs/toolkit'
import { rootReducer, RootState } from "./reducers";
import { multiClientMiddleware } from "redux-axios-middleware";
import logger from 'redux-logger'
import axios from "axios";


// const baseURL = BACKEND_BASE_URL || "http://localhost:8000";
// const baseURL = "http://localhost:8000";

// const client = {
//   default: {
//     client: axios.create({
//       baseURL: baseURL,
//       responseType: "json",
//     }),
//   },
// };


// const middleware = [thunk, multiClientMiddleware(client)];
// const isProduction = process.env.NODE_ENV === "production";
// if (!isProduction) {
//   const logger = createLogger();
//   middleware.push(logger);
// }

// const tools = [applyMiddleware(...middleware)];
// if (window.__REDUX_DEVTOOLS_EXTENSION__) {
//   tools.push(window.__REDUX_DEVTOOLS_EXTENSION__());
// }



// Create redux store
export const store = configureStore({
  reducer: rootReducer,
  middleware: [logger,],
  devTools: process.env.NODE_ENV !== 'production',
})


