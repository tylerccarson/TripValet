import React from 'react';

const DaySchedule = (props) => {
  return (
    <li>
      <ul>
        <h2>{`Day ${props.day+1}`}</h2>
        {props.todos.map(
          (todo, index)=>{
            return (<li key={index} style={{zIndex:302}}>
              <div>
                <text>{`${todo.title}`}</text><br/>
                <a href={`https://foursquare.com/v/${todo.fs_id}`} target="_blank" >more info...</a><br/>
                <button onClick={()=>{props.removeSchedule(todo.id)}}>Remove</button>
  
              </div>
              
              </li>)
          }
        )}
      </ul>
    </li>
  );
};

export default DaySchedule;
