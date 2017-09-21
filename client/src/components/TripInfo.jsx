import React from 'react';

const TripInfo = (props) => {

  let userList=[];
  for (var x in props.users) {
    userList.push(props.users[x].display);
  }
  userList = userList.join(', ');

  return (
    <div id="tripinfo">
      <div id="tripinforow1" className="row" style={{margin: '0px'}}>
      <text className="col-lg-12" style={{fontSize: 20, padding: '0px'}}>
        <p style={{paddingBottom: '5px', margin: '0px'}}><b>Dates:</b> {new Date(props.dates.start).toString().slice(0,16)} - {new Date(props.dates.end).toString().slice(0,16)} <br/></p>
        <p style={{paddingBottom: '5px', margin: '0px'}}><b>Location:</b> {props.trip.location}<br/></p>
        <p style={{paddingBottom: '5px', margin: '0px'}}><b>Members:</b> {userList} <br/></p>
        <p style={{paddingBottom: '5px', margin: '0px'}}><b>Details</b><br/></p>
        <p style={{paddingLeft: '15px', paddingRight: '15px'}}>{props.trip.description}</p>
      </text>
      </div>
    </div>
    
        
  );
};

export default TripInfo;


