import React from 'react';
import { FormGroup, InputGroup, FormControl, DropdownButton, Button, ButtonToolbar, MenuItem, ControlLabel } from 'react-bootstrap';
import DatePicker from 'material-ui/DatePicker';
import Invitees from './Invitees.jsx';

var inviteListStyle = {
  textDecoration: 'underline'
};

var buttonAlign = {
  textAlign: 'center'
};

class TripForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invitees: [],
      tripname: '',
      location: '',
      description: '',
      rangeStart: null,
      rangeEnd: null
    };
    this.onChange = this.onChange.bind(this);
    this.addToList = this.addToList.bind(this);
    this.sendForm = this.sendForm.bind(this);
    this.setStartDate = this.setStartDate.bind(this);
    this.setEndDate = this.setEndDate.bind(this);

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
    var joined = this.state.invitees.slice();
    joined.push(this.state.email);

    this.setState({
      email: '',
      invitees: joined
    }, function() {
      console.log('curent invitees', this.state.invitees);

    });
  }


  sendForm (e) {
    console.log(this.state);
  }

  render () {
    return (
      <form>
        <FormGroup>
          <InputGroup>
            <ControlLabel>Trip Name</ControlLabel>
            <InputGroup.Addon>Location</InputGroup.Addon>
            <FormControl
              type="text"
              placeholder="Tim's Bachelor Party!"
              name="name"
              value={this.state.name}
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
            <InputGroup.Addon></InputGroup.Addon>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <ControlLabel>Invitees</ControlLabel>
          <InputGroup>
            <FormControl
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              placeholder="Who's coming with?"
            />

            <DropdownButton
              componentClass={InputGroup.Button}
              id="input-dropdown-addon"
              title="Action">
              <MenuItem
                key="submit"
                onClick={this.addToList}>
               Add to list</MenuItem>
            </DropdownButton>
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
        {this.state.invitees.map((invitee, i) => {
          return <Invitees
            invitee={invitee}
            key={i}/>;
        })
        }
        <ButtonToolbar style={buttonAlign}>
          <Button
            bsStyle="primary"
            onClick={this.sendForm}>
            Create
          </Button>
          <Button
            bsStyle="danger"
            onClick={this.hideModal}>
            Cancel
          </Button>
        </ButtonToolbar>
      </form>
    );
  }
}

export default TripForm;
