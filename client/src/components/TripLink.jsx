import React from 'react';
import { Link } from 'react-router-dom';
import {ListItem} from 'material-ui/List';

const TripLink = (props) => {
  return (
    <ListItem><Link to={`/trip/${props.id}`}>{props.tripName}</Link></ListItem>
  );
};

export default TripLink;
