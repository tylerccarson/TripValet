import React from 'react';
import { FormGroup, InputGroup, FormControl, Button, DropdownButton, MenuItem, Grid, HelpBlock } from 'react-bootstrap';


class TripForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render () {
    return (
      <form>
        <FormGroup>
          <InputGroup>
            <InputGroup.Addon>Location</InputGroup.Addon>
            <FormControl
              type="text"
              placeholder="Item Name"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            />
          </InputGroup>
        </FormGroup>
      </form>
    );
  }
}

export default TripForm;
