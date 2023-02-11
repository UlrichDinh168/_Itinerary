import * as React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { Container } from "./components";
import Snackbar from "./shared/SnackBar";
import Helmet from "react-helmet";

export const App = () => {
  return (
    <Provider store={store}>
      <Helmet titleTemplate="Itinerary" defaultTitle="Itinerary">
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Helmet>
      <Container />
      <Snackbar />
    </Provider>
  );
};

