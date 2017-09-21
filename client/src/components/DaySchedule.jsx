import React from 'react';

const DaySchedule = (props) => {
  return (
    <li style={{listStyle: 'none', paddingRight: '15px'}}>
      <ul className="row" style={{paddingLeft: '15px', paddingRight: '15px', width:"100%", margin: '0px'}}>
        <h4 style={{margin: '0px', paddingTop: '5px', paddingBottom: '5px'}}><i>{`Day ${props.day+1}`}</i></h4>
        {props.todos.map(
          (todo, index)=>{
            return (
              <li key={index} style={{zIndex:302, listStyle: 'none', paddingLeft: '15px', paddingRight: '15px'}}>
                <div className="row" >
                  <div className="col-lg-8 col-md-12" >{`${todo.title}`}</div>
                  <a className="col-lg-2 col-md-10" href={`https://foursquare.com/v/${todo.fs_id}`} target="_blank" >more info...</a>
                  <button className="col-lg-2 col-md-2" onClick={()=>{props.removeSchedule(todo.id)}}>Remove</button>
                </div>
              
              </li>
            )
          }
        )}
      </ul>
    </li>
  );
};

export default DaySchedule;
