import React from 'react';
import { Jumbotron, Button, Modal } from 'react-bootstrap';
import GifsTemp from '../components/GifsTemp.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lgShow: false,
      user: {}
    };
    console.log('Dashboard Constructor says hello');
    this.hideModal = this.hideModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.createTrip = this.createTrip.bind(this);
  }

  hideModal(e) {
    this.setState({
      lgShow: false
    });
  }

  showModal(e) {
    this.setState({
      lgShow: true
    });
  }
  /*
      tripname: req.body.tripname,
      description: req.body.description,
      location: req.body.location,
      rangeStart: req.body.rangeStart,
      rangeEnd: req.body.rangeEnd,
      user_id: req.session.passport.user


  */
  createTrip() {
    console.log('CLICK TO CREATE TRIP');
    axios.post('/trips/create', {
      
      tripname: 'fake trip name',
      description: 'fake trip description',
      location: 'Fake Location',
      rangeStart: '2017/09/02',
      rangeEnd: '2017/09/23',
      invited: ['fake1@fake.com', 'fake2@fake.com', 'fake3@fake.com']
      
    })
      .then((trips)=>{
        console.log(trips);
        // setState?
      });

  }



  componentWillMount() {
    axios.get('/trips/byUser', {
      
    })
      .then((trips)=>{
        console.log(trips);

      });
    console.log(document);

  }


  render() {
    return (
      <div>
        <Modal show={this.state.lgShow} bsSize="large" aria-labelledby="contained-modal-title-sm">
          <Modal.Header >
            <Modal.Title id="contained-modal-title-sm">Create New Trip</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Create a Listing!</h4>
            <p>Fill out the form below</p>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="danger" onClick={this.hideModal}>Cancel</Button>
          </Modal.Footer>
        </Modal>
        <Jumbotron>
          <h1>Upcoming Trips</h1>
          <ul>
            <li><Link to={`/trip`}>Trip One</Link></li>
          </ul>
        </Jumbotron>
        <p><Button bsStyle="primary" onClick={this.showModal}>Create</Button></p>

        <h2 onClick={()=>{this.createTrip()}}>CLICK</h2>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/about-us')
}, dispatch);

export default connect(null, mapDispatchToProps) (DashBoard);
