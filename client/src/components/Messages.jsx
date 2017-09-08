import React from 'react';
import Message from './Message.jsx';
import {List} from 'material-ui/List';

const Messages = (props) => {
  return (
    <div className='messages-container'>
      <List>
        { props.messages.map((message, i) => {
          return <Message createdAt={message.created_at} messageId={message.id} currentUser={props.currentUser} user={message.user} message={message.text} key={i}/>;
        })}
      </List>
    </div>
  );
};

export default Messages;