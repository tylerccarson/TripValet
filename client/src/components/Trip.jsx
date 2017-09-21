import React from 'react';
import Calendar from './Calendar.jsx';
import Chatroom from './Chatroom.jsx';
import MapContainer from './MapContainer.jsx';
import Confirmations from './Confirmations.jsx';
import ImageUpload from './ImageUpload.jsx';
import TripInfo from './TripInfo.jsx';
import Schedule from './Schedule.jsx';
import axios from 'axios';
import io from 'socket.io-client';
import { FormGroup, InputGroup, FormControl, DropdownButton, Button, ButtonToolbar, MenuItem, ControlLabel, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import FlatButton from 'material-ui/FlatButton';

let env = window.location.hostname + ':' + window.location.port;
let socket = io(env);
const style = {
  confirms: {
    textAlign: 'center',
    paddingRight: '15px'
  },
  calendar: {
    paddingLeft: '15px',
    paddingRight: '15px',
    height: '545px'
  },
  chatroom: {
    paddingLeft: '15px',
    paddingRight: '15px',
    height: '545px'
  },
  map: {
    paddingLeft: '15px',
    height: '545px',
    paddingRight: '15px'

  },
  toggle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '15px',
    marginBottom: '15px'
  }
};

class Trip extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      trip: {},
      confirms: {},
      currentUser: {},
      usersWithAccount: {},
      email: '',
      toggleValue: 2,
      schedule: [],
      lockedRange: {start: '2017-09-15T09:00:00-07:00', end: '2017-09-20T09:00:00-07:00'}
    };

    this.onChange = this.onChange.bind(this);
    this.addToSchedule = this.addToSchedule.bind(this);
    this.getTripData = this.getTripData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.calculateDays = this.calculateDays.bind(this);
    this.getSchedules = this.getSchedules.bind(this);
    this.removeSchedule = this.removeSchedule.bind(this);

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
          })
          .then(()=>{
            this.getSchedules();
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  calculateDays(range) {

    var date1 = new Date(range.start);
    var date2 = new Date(range.end);
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  }

  removeSchedule(scheduleId) {
    axios.post('/schedules/remove', {
      id: scheduleId
    })
      .then((response)=>{
      })
      .catch((err)=>{
        console.log('ERROR trying to delete schedule: ', err);
      });
  }

  getSchedules() {
    axios.get('/schedules/get')
      .then((schedules)=>{
        var numDays = this.calculateDays(this.state.lockedRange);

        var newSchedule = [];
        for (var i = 0; i < numDays; i++) {
          newSchedule.push([]);
        }
        var schedulesObj = {};
        var scheduleState = [];
        schedules.data.forEach((schedule)=>{
          newSchedule[schedule.day].push(schedule);
        });
        this.setState({
          schedule: newSchedule
        });
      });
  }

  addToSchedule(schedule, day) {
    axios.post('/schedules/add', {
      schedule: schedule.info,
      day: day,
      tripId: this.state.trip.id
    })
      .then((response)=>{
        this.getSchedules();
      })
      .catch((err)=>{
        console.log('ERROR: ', err);
      });
  }

  onChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleChange(value) {
    console.log("Change: ", value);
    this.setState({
      toggleValue: value
    });
  }

  render( ) {

    return (
      <div id="cont" className="container" style={{padding: '15px', margin: '0px'}}>
        <div id="row1" className="row" style={{paddingLeft:'15px', paddingRight: '15px'}}>
          <h1 className="col-lg-12 col-md-12" style={{margin: '0px', paddingLeft: '15px'}}>{this.state.trip.tripname}</h1>
        </div>
        <div id="row2" className="row" style={{padding:'0px', paddingRight: '15px'}}>
          <div style={style.toggle} className="col-lg-12 col-md-12">
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
        </div>
        <div id="row3" className="row" style={{paddingLeft:'0px', paddingRight: '15px'}}>
          { this.state.toggleValue === 1 
            ? <div style={style.calendar} className="col-lg-8 col-md-12">
              {Object.keys(this.state.currentUser).length !== 0 ? <Calendar
                allUsers={this.state.usersWithAccount}
                currentUser={this.state.currentUser}
                trip={this.state.trip}
                socket={socket}/>
                : <div>loading...</div>
              }
            </div>
            : <div id="beforemap" style={style.map} className="col-lg-8 col-md-12">
                <MapContainer id="mapcont" addToSchedule={this.addToSchedule} schedule={this.state.schedule} style={{paddingRight: '15px'}}/>
              </div>
          }
          <div className="col-lg-4 col-md-12" style={{height:'525px', paddingRight: '15px'}}>
          {Object.keys(this.state.trip).length !== 0 ? <Chatroom
            style={style.chatroom}
            tripId={this.state.trip.id}
            user={this.state.currentUser.display}
            userId={this.state.currentUser.id}
            socket={socket}/>
            : <div>loading...</div> }
          </div>
        </div>
        <div id="row4" className="row" style={{paddingLeft:'15px', width: '100%' }}>
          <div className="col-lg-8 col-md-12" style={{ paddingRight: '15px'}}>
            <div className="col-lg-12 col-md-12" style={{padding: '0px'}}>
              <TripInfo trip={this.state.trip} users={this.state.usersWithAccount} dates={this.state.lockedRange}/>
            </div>
            <div id="schedulerow" className="row" style={{paddingLeft: '15px', paddingRight: '0px'}}>
              <div className="col-lg-12 col-md-12" style={{padding: '0px'}}>
                {this.state.schedule.length > 0 
                  ? <Schedule id="schedule" list={this.state.schedule} style={{zIndex:300}} removeSchedule={this.removeSchedule}/> 
                  : <div>loading...</div>
                }          
              </div>
              <div className="col-lg-4 col-md-12" ></div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12" style={{paddingRight: '15px'}}>
            {Object.keys(this.state.confirms).length !== 0 ? <Confirmations
              style={style.confirms}
              trip={this.state.trip}
              user={this.state.currentUser}
              userId={this.state.currentUser.id}
              confirms={this.state.confirms}
              socket={socket}/>
              : <div>loading...</div> }
          </div>
        </div>
        <div id="row6" className="row" style={{padding:'0px', marginTop: '20px' }}>
          <div className="col-lg-8" style={{height: '120px'}}>
            {Object.keys(this.state.trip).length !== 0
              ? <ImageUpload user={this.state.currentUser} trip={this.state.trip}/>
              : <div>loading...</div> 
            }
          </div>
        </div>


      </div>
    );
  }
}

export default Trip;

