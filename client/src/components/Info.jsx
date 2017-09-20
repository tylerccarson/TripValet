import React from 'react';
import { FormGroup, InputGroup, FormControl, SplitButton, DropdownButton, Button, ButtonToolbar, MenuItem, ControlLabel } from 'react-bootstrap';


class Info extends React.Component { // DO NOT REMOVE THIS COMMENT => This element need to be stateful component to fix issue with broken google map package
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>{ Object.keys(this.props.place).length !== 0 ? 
        <div>
          <h3>{this.props.place.info.name}</h3>
            {this.props.place.info.location.address ? this.props.addressArrayToString(this.props.place.info.location.formattedAddress) : ''}
            {this.props.place.info.contact.formattedPhone ? <text>{`Contact: ${this.props.place.info.contact.formattedPhone}`}<br/></text> : ''}
            {this.props.place.info.url ? <text><a href={this.props.place.info.url} target="_blank" >Website</a><br/></text> : ''}
            <a href={`https://foursquare.com/v/${this.props.place.info.id}`} target="_blank" >more info...</a><br/>
            <SplitButton id="damnbutton" dropup title="Add to Schedule" >
              {this.props.schedule.map((day, index)=>{
                return (<MenuItem eventKey={index} onClick={()=>{ this.props.infoClick(this.props.place, index); }}>{`Day ${index+1}`}</MenuItem>);
              })}
            </SplitButton>
          
        </div>
        : <div><h1>loading...</h1></div>
      }
      </div>
    );
  }
}

export default Info;


