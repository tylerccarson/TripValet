import React from 'react';
import TripLink from './TripLink.jsx';
import { Media } from 'react-bootstrap';

const TripLinks = (props) => {
  return (
    <div className='trips-container'>
      {props.trips.map((trip, i) => {
        return (
          <Media key={i}>
            <Media.Left align="top">
              <h3> {trip.location} </h3>
            </Media.Left>
            <Media.Body>
              <Media.Heading><TripLink tripName={trip.tripname} key={i} number={i} id={trip.id}/></Media.Heading>
              <p>{trip.description}</p>
            </Media.Body>
          </Media>
        );
      })}
    </div>
  );
};

export default TripLinks;
