import React from 'react';
import Divider from 'material-ui/Divider';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import axios from 'axios';
import moment from 'moment';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      secondaryText: moment(this.props.createdAt).format('MMMM Do YYYY, h:mm:ss a')
    };
    this.deleteMessage = this.deleteMessage.bind(this);
  }

  deleteMessage() {
    let deleteMe = {
      messageId: this.props.messageId
    };
    axios.post('/messages/delete', deleteMe)
      .then((deleted) => {
        this.setState({
          disabled: true,
          secondaryText: 'message deleted'
        });
      })
      .catch((error) => {
        console.log(error);
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

    const style = {
      text: {
        color: 'grey'
      }
    };

    if (this.props.currentUser === this.props.user) {
      //show delete button
      return (
        <div className='message-container'>
          <ListItem 
            rightIconButton={rightIconMenu} 
            disabled={this.state.disabled} 
            secondaryText={
              <p style={style.text}>{this.state.secondaryText}</p>
            }>
            { this.props.user }: {this.props.message}
          </ListItem>
          <Divider/>
        </div>
      );

    } else { 
      // don't show menu
      return (
        <div className='message-container'>
          <ListItem 
            secondaryText={
              <p style={style.text}>{this.state.secondaryText}</p>
            }>
            { this.props.user }: {this.props.message}
          </ListItem>
          <Divider/>
        </div>
      );
    }

  }

}

export default Message;