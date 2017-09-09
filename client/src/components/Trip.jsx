import React from 'react';
import Calendar from './Calendar.jsx';
import Chatroom from './Chatroom.jsx';
import axios from 'axios';
import Promise from 'bluebird';

class Trip extends React.Component {
  constructor (props) {
    super(props);
    this.getTripData = this.getTripData.bind(this);
    this.getConfirmation = this.getConfirmation.bind(this);
    this.getUserInformation = this.getUserInformation.bind(this);
    this.getAllInvitedUsers = this.getAllInvitedUsers.bind(this);
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
      .then(()=>{
        console.log(this.state);
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

  getAllInvitedUsers() {
    axios.get('/user/usersByTripId')
      .then((users)=>{
        this.setState({usersWithAccount: users.data});
      })
      .then(()=>{
        console.log(this.state);
      });
  }

  componentDidMount () {
    this.getTripData();
    this.getConfirmation();
    this.getUserInformation();
    this.getAllInvitedUsers();
  }

  render( ) {
    var style = {'paddingTop': '200px'};

    return (
      <div>

        <h1>This is the Trip</h1>
        <Calendar />
        <h2 style={style} onClick={()=>{this.getAllStateData();}}>Click</h2>
        <Chatroom />
      </div>
    );
  }
}

export default Trip;
