import React from 'react';
import { FormGroup, InputGroup, FormControl, DropdownButton, Button, MenuItem, ControlLabel } from 'react-bootstrap';
import DatePickers from './DatePicker.jsx';
import Invitees from './Invitees.jsx';
class TripForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invitees: [],
      name: '',
      location: '',
      email: '',
      description: '',
      startDate: '',
      endDate: ''
<<<<<<< 2c9867f58ac932b5bb69838c9fe9089f87e58b1c
    };
    this.onChange = this.onChange.bind(this);
    this.addToList = this.addToList.bind(this);
  }

  onChange (e) {
    this.setState({
      [e.target.name]: e.target.value
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
=======
>>>>>>> add date picker to form
    };
    this.onChange = this.onChange.bind(this);
    this.addToList = this.addToList.bind(this);
  }

  onChange (e) {
    this.setState({
      [e.target.name]: e.target.value
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
              title="Action"
            >
              <MenuItem
                key="submit"
                onClick={this.addToList}
              > Add to list</MenuItem>
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
        <DatePickers
          onChange={this.onChange}
          name="startDate"
          value={this.state.startDate}
          placeholder="Start"
        />
        <DatePickers
          name="endDate"
          onChange={this.onChange}
          value={this.state.endDate}
          placeholder="End"
        />
        <h3>Invitees</h3>
        
        {this.state.invitees.map((invitee, i) => {
          return <Invitees
            invitee={invitee}
            key={i}/>;
        })
        }
      </form>


    );
  }
}

export default TripForm;
