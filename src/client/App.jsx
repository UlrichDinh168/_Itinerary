/** @format */

import React from 'react';
import { Provider } from 'react-redux';
import { store } from './components/store.js';
import Container from './components/components/index';
import Snackbar from './components/shared/SnackBar.jsx';
import Helmet from 'react-helmet';
const App = () => {
  return (
    <Provider store={store}>
      <Helmet titleTemplate="Itinerary" defaultTitle="Itinerary">
        <meta content="upgrade-insecure-requests" />
      </Helmet>
      <Container />
      <Snackbar />
    </Provider>
  );
};

export default App;
