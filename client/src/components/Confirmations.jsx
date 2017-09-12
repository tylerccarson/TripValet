import React from 'react';
import Invitees from './Invitees.jsx';
import {List} from 'material-ui/List';

const Confirmations = (props) => {
  return (
    <List>
      {props.confirms.map((invitee, i) => {
        return <Invitees key={i} invitee={invitee} user={props.user} trip={props.trip}/>;
      })}
    </List>
  );
};

export default Confirmations;