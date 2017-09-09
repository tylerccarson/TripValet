import React from 'react';
import Calendar from './Calendar.jsx';
import Chatroom from './Chatroom.jsx';
import axios from 'axios';
import Promise from 'bluebird';

class Trip extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      trip: {},
      tripId: null,
      user: '',
      userId: null
    };

    this.getTripData = this.getTripData.bind(this);
    this.getConfirmation = this.getConfirmation.bind(this);
  }

  getAllStateData() {

    // probably get states in promise.

  }

  getTripData() {
    axios.get('/trips')
      .then((data)=>{
        this.setState({
          trip: data.data.trip,
          tripId: data.data.trip.id,
          user: data.data.user,
          userId: data.data.userId
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getConfirmation() {
    axios.get('/confirmed/byTrip')
      .then((confirm)=>{
        console.log(confirm);
      })
      .then(()=>{
        console.log(this.state);
      });
  }

  componentWillMount () {
    this.getTripData();
  }

  render( ) {
    var style = {'paddingTop': '200px'};

    return (
      <div>
        <h1>{this.state.trip.tripname}</h1>
        <h3>Description: {this.state.trip.description}</h3>
        <Calendar />
        <Chatroom 
          tripId={this.state.tripId}
          user={this.state.user}
          userId={this.state.userId}/>
      </div>
    );
  }
}

export default Trip;
