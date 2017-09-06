import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import GifsTemp from '../components/GifsTemp.jsx';
import { connect } from 'react-redux';

import Calendar from '../components/Calendar.jsx';

class DashBoard extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Jumbotron>
          <h1>Upcoming Trips</h1>
          <p>Trip one</p>
          <p>Trip two</p>
            <div>

              <GifsTemp gifs={ this.props.gifs } />
            </div>
          <p><Button bsStyle="primary">Create</Button></p>
        </Jumbotron>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    gifs: state.gifs
  };
}

export default connect(mapStateToProps) (DashBoard);
