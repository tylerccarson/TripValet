import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const store = configureStore();

ReactDOM.render((
  <Provider store={store}>
    <MuiThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>
), document.getElementById('root'));
