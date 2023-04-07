/** @format */

import { createStore, applyMiddleware, compose } from "redux";

import thunk from "redux-thunk";
import { rootReducer } from "./reducers";
import { PERSIST_KEY } from "./constants";
import { multiClientMiddleware } from "redux-axios-middleware";
import { persistStore, persistReducer } from "redux-persist";
import { createLogger } from "redux-logger";
import storage from "redux-persist/lib/storage";
import axios from "axios";

const isProduction = process.env.NODE_ENV === "production";
let baseURL

if (isProduction) {
  baseURL = 'https://itinerary-ulrich.herokuapp.com/'
} else {
  baseURL = 'http://localhost:8000'
}

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
