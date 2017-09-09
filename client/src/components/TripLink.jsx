import React from 'react';
import { Link } from 'react-router-dom';

const TripLink = (props) => {
  return (
    <li><Link to={`/trip/${props.id}`}>Trip {props.number + 1}</Link></li>
  );
};

export default TripLink;
