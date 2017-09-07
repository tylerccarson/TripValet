import React from 'react';
import io from 'socket.io-client';
import ChatView from 'react-chatview';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import ReactScrollbar from 'react-scrollbar-js';

let env = window.location.hostname + ':' + window.location.port;
let socket = io(env);

const Message = (props) => {
  return (
    <div className='message-container'>
      <ListItem>
        { props.user }: {props.message}
      </ListItem>
      <Divider/>
    </div>
  );
};

const Messages = (props) => {
  return (
    <div className='messages-container'>
      <List>
        { props.messages.map((message, i) => {
          return <Message user={message.user} message={message.message} key={i}/>;
        })}
      </List>
    </div>
  );
};

class Chatroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      chatInput: '',
      user: 'Ty',
      trip: 'Galapagos'
    };

    this.handleChatInput = this.handleChatInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //component will mount
  //fetch all messages associated with trip id


  handleChatInput(event) {
    this.setState({
      chatInput: event.target.value
    });
  }

  sendMessage() {
    let message = {
      //trip, user, message
      trip: this.state.trip,
      user: this.state.user,
      message: this.state.chatInput
    };
    socket.emit('clientMessage', message);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.sendMessage();
    this.setState({
      chatInput: ''
    });
  }

  //not working yet
  scrollToBottom() {
    console.log('scrolling');
    this.refs.Scrollbar.scrollToY('120%'); 
  }

  componentDidMount() {
    socket.on('serverMessage', (data) => {
      let currentMessages = this.state.messages;
      currentMessages.push(data);
      this.setState({
        messages: currentMessages
      }, () => {
        this.scrollToBottom();
      });
    });
  }

  render() {
    let styling = {
      chatroom: {
        width: 350,
        height: 500,
        float: 'right'
      },
      scrollbar: {
        width: '100%',
        height: '100%'
      },
      textInput: {

      },
      header: {
        textAlign: 'center'
      }
    };

    return (
      <div className='chatroom-container' style={styling.chatroom}>
        <h3 style={styling.header}>GroupChat</h3>
        <ReactScrollbar ref='Scrollbar' style={styling.scrollbar}>
          <Messages messages={this.state.messages} user={this.state.user}/>
        </ReactScrollbar>
        <div className='chatinput-container' style={styling.textInput}>
          <form className='chat-input' onSubmit={this.handleSubmit}>
            <TextField
              type='text'
              value={this.state.chatInput}
              onChange={this.handleChatInput}
              fullWidth={true}
              required
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Chatroom;