import React from 'react';
import { ListItem } from 'material-ui/List';
import DaySchedule from './DaySchedule.jsx';

const Schedule = (props) => {
  return (
    <ul style={{margin:'800px', zIndex:301}}>
      {props.list.map((todos, index)=>{ // day is array
        return <DaySchedule key={index} todos={todos} day={index} removeSchedule={props.removeSchedule} />;
      })}
    </ul>
  );
};

export default Schedule;