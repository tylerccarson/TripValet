import React from 'react';
import Message from './Message.jsx';

const Messages = (props) => {
  return (
    <div className='messages-container'>
      <List>
        { props.messages.map((message, i) => {
          return <Message currentUser={props.currentUser} user={message.user} message={message.text} key={i}/>;
        })}
      </List>
    </div>
  );
};

export default Messages;