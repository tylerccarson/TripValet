import React from 'react';
import { Jumbotron, Button, Modal } from 'react-bootstrap';
import GifsTemp from '../components/GifsTemp.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import Calendar from '../components/Calendar.jsx';
import { Link } from 'react-router-dom';
import TripForm from './TripForm.jsx';
class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lgShow: false
    };
    console.log('Dashboard Constructor says hello');
    this.hideModal = this.hideModal.bind(this);
    this.showModal = this.showModal.bind(this);
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
            <TripForm />
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="danger" onClick={this.hideModal}>Cancel</Button>
          </Modal.Footer>
        </Modal>
        <Jumbotron>
          <h1>Upcoming Trips</h1>
          <li><Link to='/trip'>Trip One</Link></li>
        </Jumbotron>
        <p><Button bsStyle="primary" onClick={this.showModal}>Create</Button></p>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/about-us')
}, dispatch);

export default connect(null, mapDispatchToProps) (DashBoard);
