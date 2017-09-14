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
    axios.post('/trips/create', {
      tripname: this.state.tripname,
      description: this.state.description,
      location: this.state.location,
      rangeStart: this.state.rangeStart,
      rangeEnd: this.state.rangeEnd,
      invited: this.state.invited
    })
      .then((trips)=>{
        this.props.hideModal();
        window.location.reload();
      })
      .catch((error) => {
        console.log('error', error);
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
    this.setState({
      invited: this.state.invited.concat([this.state.email]),
      email: ""
    });

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
          console.log(invitee);
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
