import React from 'react';
import { FormGroup, InputGroup, FormControl, DropdownButton, Button, ButtonToolbar, MenuItem, ControlLabel } from 'react-bootstrap';
import DatePicker from 'material-ui/DatePicker';
import Invited from './Invited.jsx';
import axios from 'axios';
import FlatButton from 'material-ui/FlatButton';
import { Route, Switch } from 'react-router-dom';

const inviteListStyle = {
  textDecoration: 'underline'
};

const buttonAlign = {
  textAlign: 'center'
};

class TripForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invited: [],
      email: '',
      tripname: '',
      location: '',
      description: '',
      rangeStart: null,
      rangeEnd: null
    };
    this.onChange = this.onChange.bind(this);
    this.addToList = this.addToList.bind(this);
    this.setStartDate = this.setStartDate.bind(this);
    this.setEndDate = this.setEndDate.bind(this);
    this.createTrip = this.createTrip.bind(this);

  }

  createTrip() {

    //only submit if entries have been made
    if (this.state.invited.length === 0 || this.state.tripname === '' || this.state.location === '' || this.state.description === '' || this.state.rangeStart === null || this.state.rangeEnd === null) {
      //alert
      alert("Please fill out all fields before submitting form.\nThanks!");
      return;
    }

    // when we select 9/13 ~ 9/14, we expect the event to be till the end of 9/14
    // which is the start of 9/15, so we add one day to the end date, since it is
    // currently the start of 9/14

    var oldEndDate = this.state.rangeEnd;

    var nextDaysYear = oldEndDate.getFullYear();
    var nextDaysMonth = oldEndDate.getMonth();
    var nextDaysDate = oldEndDate.getDate() + 1;

    var endDatesNextDay = new Date(nextDaysYear, nextDaysMonth, nextDaysDate);

    this.setState({
      rangeEnd: endDatesNextDay
    }, () =>{
      // set state is async, so post endDatesNextDay to prevent the post happens
      // before the set state, sending the old date

      axios.post('/trips/create', {
        tripname: this.state.tripname,
        description: this.state.description,
        location: this.state.location,
        rangeStart: this.state.rangeStart,
        rangeEnd: endDatesNextDay,
        invited: this.state.invited
      })
        .then((trips)=>{
          this.props.hideModal();
          window.location.reload();
        })
        .catch((error) => {
          console.log('error', error);
        });
    
      });

  }

  onChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  setStartDate (e, date) {
    this.setState({
      rangeStart: date
    });
  }
  setEndDate (e, date) {
    this.setState({
      rangeEnd: date
    });
  }

  addToList (e) {

    //if user has already been invited, don't add to list
    let invites = this.state.invited;
    let entry = this.state.email;
    if (invites.includes(entry)) {
      this.setState({
        email: ''
      });
    } else {
      //post to server to validate email
      axios.post('/trips/validate', {
        email: entry
      })
        //if valid response
        .then((validated) => {
          //add to invited list and set state
          invites.push(entry);
          //reset email field to empty string
          this.setState({
            invited: invites,
            email: ''
          });
        })
        //if error
        .catch((err) => {
          //reset email field without adding
          this.setState({
            email: ''
          });
        });
    }

  }

  render () {
    return (
      <form>

        <FormGroup>
          <InputGroup>
            <ControlLabel>Trip Name</ControlLabel>
            <FormControl
              type="text"
              placeholder="Tim's Bachelor Party!"
              name="tripname"
              value={this.state.tripname}
              onChange={this.onChange}
            />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <InputGroup>
            <ControlLabel>Location</ControlLabel>
            <FormControl
              type="text"
              placeholder="Where ya goin?"
              name="location"
              value={this.state.location}
              onChange={this.onChange}
            />
          </InputGroup>
        </FormGroup>

        <FormGroup>

          <ControlLabel>Invitees</ControlLabel>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Who's coming with?"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
            />
            <FlatButton
              primary={true}
              label="Add invite"
              fullWidth={true}
              onClick={() => this.addToList()}
            />

          </InputGroup>
        </FormGroup>

        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Trip Description</ControlLabel>
          <FormControl
            onChange={this.onChange}
            name="description"
            value={this.state.description}
            componentClass="textarea"
            placeholder="Thoughts for the group" />
        </FormGroup>

        <ControlLabel>Dates</ControlLabel>


        <DatePicker
          name="rangeStart"
          onChange={this.setStartDate}
          value={this.state.rangeStart}
          placeholder="Start"
        />

        <DatePicker
          name="rangeEnd"
          onChange={this.setEndDate}
          value={this.state.rangeEnd}
          placeholder="End"
        />

        <h3 style={inviteListStyle}>Invitees:</h3>
        {this.state.invited.map((invitee, i) => {
          return <Invited
            invitee={invitee}
            key={i}/>;
        })
        }
        <ButtonToolbar style={buttonAlign}>
          <Button
            bsStyle="primary"
            onClick={this.createTrip}>
            Create
          </Button>
          <Button
            bsStyle="danger"
            onClick={this.props.hideModal}>
            Cancel
          </Button>
        </ButtonToolbar>
      </form>
    );
  }
}

export default TripForm;
