import React from 'react';
import Calendar from './Calendar.jsx';
import Chatroom from './Chatroom.jsx';
import Confirmations from './Confirmations.jsx';
import axios from 'axios';
import io from 'socket.io-client';
import Promise from 'bluebird';

let env = window.location.hostname + ':' + window.location.port;
let socket = io(env);

class Trip extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      trip: {},
      confirms: {},
      currentUser: {},
      usersWithAccount: {}
    };
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
    var style = {
      confirms: {
        textAlign: 'center'
      },
      calendar: {
      },
      chatroom: {
      }
    };

    return (
      <div>
        <h1>{this.state.trip.tripname}</h1>
        <h3>Description: {this.state.description}</h3>
        {Object.keys(this.state.currentUser).length !== 0 ? <Calendar
          allUsers={this.state.usersWithAccount}
          currentUser={this.state.currentUser}
          trip={this.state.trip}
          socket={socket}/>
          : <div>loading...</div>
        }
        {Object.keys(this.state.trip).length !== 0 ? <Chatroom
          tripId={this.state.trip.id}
          user={this.state.currentUser.display}
          userId={this.state.currentUser.id}
          socket={socket}/>
          : <div>loading...</div> }
        {Object.keys(this.state.confirms).length !== 0 ? <Confirmations
          style={style.confirms}
          trip={this.state.trip}
          user={this.state.currentUser}
          userId={this.state.currentUser.id}
          confirms={this.state.confirms}
          socket={socket}/>
          : <div>loading...</div> }
      </div>
    );
  }
}

export default Trip;
