import * as React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { Container } from "./components";
import Snackbar from "./shared/SnackBar";

export const App = () => {
  return (
    <Provider store={store}>
      <Container />
      <Snackbar />
    </Provider>
  );
};

