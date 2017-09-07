import React from 'react';
import { connect } from 'react-redux';

class Trip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log("test");
  }
  
  render() {
    return (
      <div>
        <h1>This is the Trip</h1>
      </div>
    );
  }
}

export default Trip;
