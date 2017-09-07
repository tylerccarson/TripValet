import React from 'react';
import { connect } from 'react-redux';

class Trip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        console.log("test");
        <h1>This is the Trip</h1>
      </div>
    );
  }
}

export default Trip;
