import React from 'react';
import { ListItem } from 'material-ui/List';
import DaySchedule from './DaySchedule.jsx';

const Schedule = (props) => {
  return (
    <ul style={{margin:'0px', zIndex:301, padding: '0px', width: "100%"}}>
    	<h4 style={{margin: '0px', fontSize: '20px'}}><b>Schedules</b></h4>
      {props.list.map((todos, index)=>{ // day is array
        return <DaySchedule key={index} todos={todos} day={index} removeSchedule={props.removeSchedule} />;
      })}
    </ul>
  );
};

export default Schedule;