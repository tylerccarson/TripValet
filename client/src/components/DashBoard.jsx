import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import GifsTemp from '../components/GifsTemp.jsx';
import { connect } from 'react-redux';

import Chatroom from '../components/Chatroom.jsx';

const DashBoard = (props) => (
  <div>
    <Jumbotron>
      <h1>Upcoming Trips</h1>
      <p>Trip one</p>
      <p>Trip two</p>
      <p><Button bsStyle="primary">Create</Button></p>
    </Jumbotron>
    <Chatroom />
  </div>
);

export default DashBoard;
