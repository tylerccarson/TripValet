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
    this.getUserInformation = this.getUserInformation.bind(this);
    console.log('test');
  }

  getAllStateData() {

    // probably get states in promise.

  }

  getTripData() {
    axios.get('/trips')

      .then((trip)=>{
        this.setState({trip: trip.data});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getConfirmation() {

    axios.get('/confirmed/byTrip')
      .then((confirms)=>{
        
        this.setState({confirms});
      })
      .then(()=>{
        console.log(this.state);
      });
  }

  getUserInformation() {
    axios.get('/user/byUserId')
      .then((user)=>{
        this.setState({currentUser: user.data});
      })
      .then(()=>{
        console.log(this.state);
        
      });
  }

  componentDidMount () {
    this.getTripData();
    this.getConfirmation();
    this.getUserInformation();
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
