import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Trip from './Trip.jsx';
import DashBoard from './DashBoard.jsx';

const Main = () => (
  <div>
    <Switch>
      <Route path='/dashboard' render={DashBoard}/>

      <Route path='/event' render={Trip}/>

      <Dashboard />
    </Switch>
  </div>
);
export default Main;


//We will add this route later when we are creating new event pages. "Route path='/event'... " should reroute people when they try to go to a url ending in just "event" or if they try to access an id that does not exists or if they try to enter an event that they are no members of.
// <Route path='/event/:number' component={Event}/>
