import React from 'react';
import Calendar from './Calendar.jsx';
import Chatroom from './Chatroom.jsx';
import MapContainer from './MapContainer.jsx';
import Confirmations from './Confirmations.jsx';
import Schedule from './Schedule.jsx';
import axios from 'axios';
import io from 'socket.io-client';
import Promise from 'bluebird';
import { FormGroup, InputGroup, FormControl, DropdownButton, Button, ButtonToolbar, MenuItem, ControlLabel } from 'react-bootstrap';
import FlatButton from 'material-ui/FlatButton';
import $ from 'jquery';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

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
      email: '',
      toggleValue: 1,
      schedule: [[], [], [], []]
    };

    this.onChange = this.onChange.bind(this);
    this.addToSchedule = this.addToSchedule.bind(this);
    this.getTripData = this.getTripData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getTripData();
  }

  getTripData() {
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

  addToSchedule(schedule, day) {

    console.log('CLICKED', schedule);
    console.log('Day: ', day);

  }

  onChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleChange(value) {
    this.setState({
      toggleValue: value
    });
  }

  render( ) {
    const style = {
      confirms: {
        textAlign: 'center'
      },
      calendar: {
      },
      chatroom: {
      },
      map: {

      },
      toggle: {
        marginTop: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }
    };

    let view;

    if (this.state.toggleValue === 1) {
      view = (
        <div style={style.calendar}>
          {Object.keys(this.state.currentUser).length !== 0 ? <Calendar
            allUsers={this.state.usersWithAccount}
            currentUser={this.state.currentUser}
            trip={this.state.trip}
            socket={socket}/>
            : <div>loading...</div>
          }
        </div>
      );
    } else {
      view = (
        <div style={style.map}>
          <MapContainer id="mapcont" addToSchedule={this.addToSchedule} schedule={this.state.schedule}/>
          <Schedule list={this.state.schedule} />
        </div>
      );
    }

    return (
      <div id="cont">
        <h1>{this.state.trip.tripname}</h1>
        <h3>Description: {this.state.trip.description}</h3>
        <div>
          <div style={style.toggle}>
            <ButtonToolbar>
              <ToggleButtonGroup
                type="radio"
                name="options"
                defaultValue={this.state.toggleValue}
                onChange={this.handleChange}>
                <ToggleButton value={1}>Calendar View</ToggleButton>
                <ToggleButton value={2}>Map View</ToggleButton>
              </ToggleButtonGroup>
            </ButtonToolbar>
          </div>
          {view}
        </div>
        <div>
          {Object.keys(this.state.trip).length !== 0 ? <Chatroom
            style={style.chatroom}
            tripId={this.state.trip.id}
            user={this.state.currentUser.display}
            userId={this.state.currentUser.id}
            socket={socket}/>
            : <div>loading...</div> }
        </div>
        <div>
          {Object.keys(this.state.confirms).length !== 0 ? <Confirmations
            style={style.confirms}
            trip={this.state.trip}
            user={this.state.currentUser}
            userId={this.state.currentUser.id}
            confirms={this.state.confirms}
            socket={socket}/>
            : <div>loading...</div> }
        </div>
        <div>
          <form>
            <FormGroup>
              <ControlLabel>Invite a friend</ControlLabel>
              <InputGroup>
                <FormControl
                  type="text"
                  name="email"
                  value={this.state.email}
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
        <ImageUpload
          user={this.state.currentUser}
          trip={tripData}
        />
      </div>
    );
  }
}

export default Trip;
