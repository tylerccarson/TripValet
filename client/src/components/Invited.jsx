import React from 'react';
import Chip from 'material-ui/Chip';

const Invited = (props) => (
  <div>
    <Chip key={props.i}>
      {props.invitee}
    </Chip>
  </div>
);

export default Invited;