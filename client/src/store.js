/** @format */

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers";
import { PERSIST_KEY, BACKEND_BASE_URL } from "./constants";
import { multiClientMiddleware } from "redux-axios-middleware";
import { persistStore, persistReducer } from "redux-persist";
import { createLogger } from "redux-logger";
import storage from "redux-persist/lib/storage";
import axios from "axios";

// const baseURL = BACKEND_BASE_URL || "http://localhost:5001";
const baseURL = "http://localhost:5001";
// Config redux-persist
const persistConfig = {
  key: PERSIST_KEY,
  storage,
  blacklist: [],
};
const client = {
  default: {
    client: axios.create({
      baseURL: baseURL,
      responseType: "json",
    }),
  },
};

const middleware = [thunk, multiClientMiddleware(client)];
const isProduction = process.env.NODE_ENV === "production";
if (!isProduction) {
  const logger = createLogger();
  middleware.push(logger);
}

const tools = [applyMiddleware(...middleware)];
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  tools.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create redux store
const store = createStore(persistedReducer, compose(...tools));
const persistor = persistStore(store);

export { store, persistor };
