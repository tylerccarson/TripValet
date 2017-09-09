import React from 'react';
import Calendar from './Calendar.jsx';
import Chatroom from './Chatroom.jsx';
import Confirmations from './Confirmations.jsx';
import axios from 'axios';
import Promise from 'bluebird';

class Trip extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
<<<<<<< c661942d9e7017e8090bbebca4e67e53bd225fdc
      trip: {},
      confirms: {},
      currentUser: {},
      usersWithAccount: {}
    };
=======

    };
    this.getTripData = this.getTripData.bind(this);
    this.getConfirmation = this.getConfirmation.bind(this);
    this.getUserInformation = this.getUserInformation.bind(this);
    console.log('test');
>>>>>>> add state to trip.jsx
  }

  componentWillMount() {
    axios.get('/trips')
      .then((trip)=>{
        this.setState({
          trip: trip.data.trip,
        });
      })
<<<<<<< c661942d9e7017e8090bbebca4e67e53bd225fdc
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
=======
      .then(()=>{
        console.log(this.state);
      });
  }

  getConfirmation() {

    axios.get('/confirmed/byTrip')
      .then((confirms)=>{

        this.setState({confirms});
>>>>>>> add state to trip.jsx
      })
      .catch((error) => {
        console.log(error);
      });
  }

<<<<<<< c661942d9e7017e8090bbebca4e67e53bd225fdc
  render( ) {
    var style = {
      confirms: {
        textAlign: 'center'
      },
      calendar: {
=======
  getUserInformation() {
    axios.get('/user/byUserId')
      .then((user)=>{
        this.setState({currentUser: user.data});
      })
      .then(()=>{
        console.log(this.state);

      });
  }
>>>>>>> add state to trip.jsx

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
          trip={this.state.trip}/>
          : <div>loading...</div>
        }
        {Object.keys(this.state.trip).length !== 0 ? <Chatroom 
          tripId={this.state.trip.id}
          user={this.state.currentUser.display}
          userId={this.state.currentUser.id}/> 
          : <div>loading...</div> }
        {Object.keys(this.state.confirms).length !== 0 ? <Confirmations 
          style={style.confirms}
          tripId={this.state.trip.id}
          user={this.state.currentUser}
          userId={this.state.currentUser.id}
          confirms={this.state.confirms}/>
          : <div>loading...</div> }
      </div>
    );
  }
}

export default Trip;
