import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import App from './App';
import configureStore from './store/configureStore';
import theme from './theme';
import 'typeface-roboto';


// Create browser history to use in the Redux store
const history = createBrowserHistory();

// Get the application-wide store instance, prepopulating with state from the server where available
const initialState = window.initialReduxState;
export const store = configureStore(history, initialState);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
