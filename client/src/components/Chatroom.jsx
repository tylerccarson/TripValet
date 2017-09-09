import React from 'react';
import io from 'socket.io-client';
import TextField from 'material-ui/TextField';
import ReactScrollbar from 'react-scrollbar-js';
import Messages from './Messages.jsx';
import axios from 'axios';

let env = window.location.hostname + ':' + window.location.port;
let socket = io(env);

//to-dos:
//1 styling
//2 get scroll box to go to bottom of chat on load
//3 put avatar on the message

class Chatroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      chatInput: '',
    };

    this.handleChatInput = this.handleChatInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.tripId) {
      axios.get('/messages/byTrip', {
        params: {
          tripId: this.props.tripId
        }
      })
        .then((messages) => {
          let currentMessages = this.state.messages;
          currentMessages = currentMessages.concat(messages.data);
          this.setState({
            messages: currentMessages
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  handleChatInput(event) {
    this.setState({
      chatInput: event.target.value
    });
  }

  sendMessage() {
    let message = {
      tripId: this.props.tripId,
      user: this.props.user,
      userId: this.props.userId,
      text: this.state.chatInput
      //avatar: avatar URL for user
    };

    axios.post('/messages/create', message)
      .then((res) => {
        socket.emit('clientMessage', res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.sendMessage();
    this.setState({
      chatInput: ''
    });
  }

  //to-do: goes most of the down, not to the complete end of the chat window
  scrollToBottom() {
    this.refs.Scrollbar.scrollToY('120%'); 
  }

  componentDidMount() {
    socket.on('serverMessage', (data) => {
      //data needs user property
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
        width: 400,
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
          <Messages messages={this.state.messages} currentUser={this.props.user}/>
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