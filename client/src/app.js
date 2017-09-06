import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { ConnectedRouter } from 'react-router-redux';

const store = configureStore();

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'));
