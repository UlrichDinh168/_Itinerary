import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store";
import "./styles/index.scss";

ReactDOM.render(
  <PersistGate loading={null} persistor={persistor}>
    <App />
  </PersistGate>,

  document.getElementById("root"),
);
