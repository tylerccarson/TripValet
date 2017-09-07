import React from 'react';
import Calendar from './Calendar.jsx';
import Chatroom from './Chatroom.jsx';
class Trip extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
    console.log('test');
  }
  render( ) {
    return (
      <div>

        <h1>This is the Trip</h1>
        <Calendar />
        <Chatroom />
      </div>
    );
  }
}

export default Trip;
