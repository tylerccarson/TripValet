import React from 'react';
import { Jumbotron, Button, Modal, ButtonToolbar } from 'react-bootstrap';
import GifsTemp from '../components/GifsTemp.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import TripForm from './TripForm.jsx';
import Trips from './Trips.jsx';
import {List} from 'material-ui/List';
import axios from 'axios';

class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lgShow: false,
      user: {},
      trips: []
    };
    this.hideModal = this.hideModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.close = this.close.bind(this);
    
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

  componentWillMount() {
    axios.get('/trips/byEmail')
      .then((trips)=>{
        this.setState({
          trips: trips.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  close() {
    this.setState({
      lgShow: false
    });
  }


  render() {
    return (
      <div>
        <Modal
          show={this.state.lgShow}
          onHide={this.close}
          bsSize="large"
          aria-labelledby="contained-modal-title-sm">
          <Modal.Header >
            <Modal.Title id="contained-modal-title-sm">Create New Trip</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TripForm
              hideModal={this.hideModal}
            />
          </Modal.Body>
        </Modal>
        <Jumbotron>
          <h1>Upcoming Trips</h1>
          <List>
            <Trips trips={this.state.trips}/>
          </List>
        </Jumbotron>


        <p>
          <Button
            bsStyle="primary"
            onClick={this.showModal}>
          Create
          </Button>
        </p>


      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/about-us')
}, dispatch);

export default connect(null, mapDispatchToProps) (DashBoard);
