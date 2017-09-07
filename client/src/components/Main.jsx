import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashBoard from './DashBoard.jsx';
import Trip from './Trip.jsx';
var Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={DashBoard}/>
      <Route path='/trip' component={Trip}/>
    </Switch>
  </main>
);

export default Main;
