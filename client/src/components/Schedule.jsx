import React from 'react';
import { ListItem } from 'material-ui/List';
import DaySchedule from './DaySchedule.jsx';

const Schedule = (props) => {
  return (
    <ul style={{marginTop: '800px'}}>
    	{props.list.map((day, index)=>{
    		return <DaySchedule key={index} day={day} />
    	})}
    </ul>
  );
};

export default Schedule;