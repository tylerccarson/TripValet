import React from 'react';

const TripInfo = (props) => {

  let userList=[];
  for (var x in props.users) {
    userList.push(props.users[x].display);
  }
  userList = userList.join(', ');

  return (
    <div id="tripinfo">
      <div id="tripinforow1" className="row">
      <text className="col-lg-12" style={{fontSize: 16}}>
        Dates: {new Date(props.dates.start).toString().slice(0,16)} - {new Date(props.dates.end).toString().slice(0,16)} <br/>
        Location: {props.trip.location}<br/>
        Members: {userList} <br/>
        Details<br/>
        {props.trip.description}
      </text>
      </div>
    </div>
    
        
  );
};

export default TripInfo;


