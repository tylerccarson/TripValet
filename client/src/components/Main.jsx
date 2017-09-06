import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashBoard from '../components/DashBoard.jsx';
import Trip from '../components/Trip.jsx';

const Main = () => (

  <div>
    <Switch>
      <Route exact path= '/' render={(propz) =>(
        <DashBoard {...propz} />
      )}/>
      <Route exact path='/trip' render={(propz) =>(
        <Trip {...propz} />
      )}/>
    </Switch>
  </div>
);

export default Main;

// We will add this route later when we are creating new event pages. "Route path='/event'... " should reroute people when they try to go to a url ending in just "event" or if they try to access an id that does not exists or if they try to enter an event that they are no members of.
// <Route path='/event/:number' component={Trip}/>
