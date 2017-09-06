import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import GifsTemp from '../components/GifsTemp.jsx';
import { connect } from 'react-redux';

import Calendar from '../components/Calendar.jsx';

const DashBoard = (props) => (
  <div>
    <Calendar />
    <Jumbotron>
      <h1>Upcoming Trips</h1>
      <p>Trip one</p>
      <p>Trip two</p>

      <p><Button bsStyle="primary">Create</Button></p>
    </Jumbotron>
  </div>
);

export default DashBoard;
