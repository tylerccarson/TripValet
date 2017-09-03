import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

import Calendar from './Calendar.jsx';


const DashBoard = (props) => (
  <div>
    <Jumbotron>
      <h1>Upcoming Trips</h1>
      <p>Trip one</p>
      <p>Trip two</p>
    
      <p><Button bsStyle="primary">Create</Button></p>
    </Jumbotron>
  </div>
);

export default DashBoard;
