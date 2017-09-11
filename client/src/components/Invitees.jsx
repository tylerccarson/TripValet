import React from 'react';
import {ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

class Invitees extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmed: this.props.invitee.confirmed
    };
  }

  handleUserCheck() {
    //toggle state and update database
  }

  render() {
    let checkBox; 
    if (this.props.user.email === this.props.invitee.email) {
      checkBox = <Checkbox defaultChecked={this.state.confirmed} onCheck={this.handleUserCheck}/>; 
    } else {
      checkBox = <Checkbox checked={this.state.confirmed}/>;
    }

    return (
      <div>
        <ListItem 
          leftCheckbox={checkBox}
          primaryText={this.props.invitee.email}/>
      </div>
    );
  }
} 

export default Invitees;
