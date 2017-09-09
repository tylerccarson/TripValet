import React from 'react';
import TripLink from './TripLink.jsx';

const Trips = (props) => {
  return (
    <div className='trips-container'>
      {props.trips.map((trip, i) => {
        return <TripLink tripName={trip.tripname} key={i} number={i} id={trip.id}/>;
      })}
    </div>
  );
};

export default Trips;