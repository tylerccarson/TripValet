import React from 'react';

const Message = (props) => {
  return (
    <div className='message-container'>
      { this.props.user } : {this.props.message}
    </div>
  );
};