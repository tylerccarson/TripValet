import React from 'react';
import {ListItem} from 'material-ui/List';

const Invitees = (props) => (
  <div>
    <ul>
      <ListItem>{props.invitee.email}</ListItem>
    </ul>
  </div>
);
export default Invitees;
