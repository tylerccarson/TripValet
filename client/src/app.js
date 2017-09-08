import React from 'react';
import App from './containers/App.jsx';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ConnectedRouter } from 'react-router-redux';
import { render } from 'react-dom';
import store, { history } from './store';


const target = document.querySelector('#root');

render(
  <Provider store={store}>
    <MuiThemeProvider>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </MuiThemeProvider>
  </Provider>,
  target
);
