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
      confirms: {},
      currentUser: {},
      usersWithAccount: {}
    };
    this.getAllInvitedUsers = this.getAllInvitedUsers.bind(this);
  }

  componentWillMount() {
    axios.get('/trips')
      .then((trip)=>{
        this.setState({
          trip: trip.data.trip,
        });
      })
      .then(() => {
        axios.get('/confirmed/byTrip')
          .then((confirms)=>{
            this.setState({
              confirms: confirms.data
            });
          })
          .then(() => {
            axios.get('/user/byUserId')
              .then((user)=>{
                this.setState({
                  currentUser: user.data
                });
              });
          })
          .then(() => {
            axios.get('/user/usersByTripId')
              .then((users)=>{
                this.setState({
                  usersWithAccount: users.data
                });
              });
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render( ) {
    var style = {'paddingTop': '200px'};

    return (
      <div>
        <h1>{this.state.trip.tripname}</h1>
        <h3>Description: {this.state.description}</h3>
        <Calendar />
        {Object.keys(this.state.trip).length !== 0 ? <Chatroom 
          tripId={this.state.trip.id}
          user={this.state.currentUser.display}
          userId={this.state.currentUser.id}/> : <div>LOADING</div> }
      </div>
    );
  }
}

export default Trip;
