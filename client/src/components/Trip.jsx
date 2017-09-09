import React from 'react';
import Calendar from './Calendar.jsx';
import Chatroom from './Chatroom.jsx';
class Trip extends React.Component {
  constructor (props) {
    super(props);
    this.state = {



    };
    console.log('test');
  }

  getAllStateData() {
    console.log('clicked!');
  }

  componentDidMount () {

  }

  render( ) {
    var style = {'padding-top': '200px'};

    return (
      <div>

        <h1>This is the Trip</h1>
        <Calendar />
        <h2 style={style} onClick={()=>{this.getAllStateData();}}>Click</h2>
        <Chatroom />
      </div>
    );
  }
}

export default Trip;
