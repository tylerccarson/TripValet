import React from 'react';
import TextField from 'material-ui/TextField';
import ReactScrollbar from 'react-scrollbar-js';
import Messages from './Messages.jsx';
import axios from 'axios';

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
    this.fetchAllMessages = this.fetchAllMessages.bind(this);
    this.subscribeToMessages = this.subscribeToMessages.bind(this);
  }

  componentDidMount() {
    this.fetchAllMessages();
    this.subscribeToMessages();
  }

  fetchAllMessages() {
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
        this.props.socket.emit('clientMessage', res);
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

  subscribeToMessages() {
    this.props.socket.on('serverMessage', (data) => {
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
        float: 'right',
        height: '540px',
        padding: '0px'

      },
      scrollbar: {
        width: '100%',
        height: '434px',
        margin: '0px',
        paddingRight: '15px'
      },
      textInput: {
        paddingRight: '15px'
      },
      header: {
        textAlign: 'center',
        marginTop: '0px',
        marginBottom: '0px',
        paddingRight: '15px'
      }
    };

    return (
      <div className='chatroom-container col-lg-12 col-md-12' style={styling.chatroom}>
        <h3 className="row" style={styling.header}>GroupChat</h3>
        <ReactScrollbar className="row" ref='Scrollbar' style={styling.scrollbar}>
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