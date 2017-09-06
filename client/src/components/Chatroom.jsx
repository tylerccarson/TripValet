import React from 'react';
//import Message from './Message.jsx';
//import ChatInput from './ChatInput.jsx';

//set up socketio
import io from 'socket.io-client';
let env = window.location.hostname + ':' + window.location.port;
let socket = io(env);

const Message = (props) => {
  return (
    <div className='message-container'>
      { this.props.user } : {this.props.message}
    </div>
  );
};

class Chatroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      chatInput: '',
      user: 'Ty'
    };
    this.handleChatInput = this.handleChatInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    socket.on('serverMessage', (data) => {
      this.setState({
        messages: this.state.messages.concat(data)
      });
    });
  }

  handleChatInput(event) {
    this.setState({
      chatInput: event.target.value
    });
  }

  handleSubmit(text) {
    event.preventDefault();
    let message = {
      //eventually change to props received from trip page?
      //also need to consult team on what this schema looks like
      user: this.state.user,
      message: this.state.chatInput
    };
    socket.emit('clientMessage', message);
    this.setState({
      chatInput: ''
    });
  }

  render() {
    return (
      <div className='chatroom-container'>
        <h4>Chatroom</h4>
        <div className='messages-container'>
          { this.state.map((message) => {
            return <Message />;
          })}
        </div>
        <div className='chatinput-container'>
          <form className='chat-input' onSubmit={this.handleSubmit}>
            <input 
              type='text'
              value={this.state.chatInput}
              onChange={this.handleChatInput}
              required
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Chatroom;