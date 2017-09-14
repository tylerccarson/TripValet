import React from 'react';
import Calendar from './Calendar.jsx';
import Chatroom from './Chatroom.jsx';
import Confirmations from './Confirmations.jsx';
import axios from 'axios';
import io from 'socket.io-client';
import Promise from 'bluebird';
import { FormGroup, InputGroup, FormControl, DropdownButton, Button, ButtonToolbar, MenuItem, ControlLabel } from 'react-bootstrap';
import FlatButton from 'material-ui/FlatButton';

let env = window.location.hostname + ':' + window.location.port;
let socket = io(env);

class Trip extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      trip: {},
      confirms: {},
      currentUser: {},
      usersWithAccount: {},
      inviteInput: ''
    };

    this.inviteNewUser = this.inviteNewUser.bind(this);
    this.onChange = this.onChange.bind(this);
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

  onChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  inviteNewUser(email) {
    axios.post('/trips/invite', {
      invitee: email,
      trip: this.state.trip,
      inviter: this.state.user
    })
      .then((invited) => {
        let confirmations = this.state.confirms;
        confirmations.push(invited);
        this.setState({
          confirms: confirmations,
          inviteInput: ''
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
        <div>
          <form>
            <FormGroup>
              <ControlLabel>Invite a friend</ControlLabel>
              <InputGroup>
                <FormControl
                  type="text"
                  name="email"
                  value={this.state.inviteInput}
                  onChange={this.onChange}
                  placeholder="Who's coming with?"
                />
                <FlatButton
                  primary={true}
                  label="Add invite"
                  fullWidth={true}
                  key="submit"
                  onClick={this.inviteNewUser} />

              </InputGroup>
            </FormGroup>

          </form>
        </div>
      </div>
    );
  }
}

export default Trip;
