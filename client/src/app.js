import React from 'react';
import ReactDOM from 'react-dom';
import DashBoard from './components/Dashboard.jsx';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import Dashboard from './components/DashBoard.jsx';

const App = () => (
      <div>
        <Header />
        <Main />
      </div>
);


ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
  ), document.getElementById('root'));
