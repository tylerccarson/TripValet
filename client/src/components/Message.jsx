import React from 'react';
import Divider from 'material-ui/Divider';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false
    };
    this.deleteMessage = this.deleteMessage.bind(this);
  }

  deleteMessage() {
    //axios post request to delete message from the database

    //then
    this.setState({
      disable: true
    });
  }

  render() {

    const iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left"
      >
        <MoreVertIcon color={grey400} />
      </IconButton>
    );

    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem onClick={this.deleteMessage}>Delete</MenuItem>
      </IconMenu>
    );

    if (props.currentUser === props.user) {
      //show delete button
      return (
        <div className='message-container'>
          <ListItem rightIconButton={rightIconMenu} disabled={this.state.disabled}>
            { this.props.user }: {this.props.message}
          </ListItem>
          <Divider/>
        </div>
      );

    } else { 
      // don't show menu
      return (
        <div className='message-container'>
          <ListItem>
            { this.props.user }: {this.props.message}
          </ListItem>
          <Divider/>
        </div>
      );
    }

  }

}

export default Message;