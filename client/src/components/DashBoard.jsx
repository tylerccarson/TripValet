import React from 'react';
import { Jumbotron, Button, Modal } from 'react-bootstrap';
import GifsTemp from '../components/GifsTemp.jsx';
import { connect } from 'react-redux';
import Calendar from '../components/Calendar.jsx';

class DashBoard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      lgShow: false
    };
    this.hideModal = this.hideModal.bind(this);
    this.showModal = this.showModal.bind(this);
  }
  hideModal(e){
    this.setState({
      lgShow: false
    });
  }

  showModal(e){
    this.setState({
      lgShow: true
    });
  }
  render() {
    return (
      <div>
        <Modal show={this.state.lgShow}  bsSize="large" aria-labelledby="contained-modal-title-sm">
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

        </Jumbotron>
        <p><Button bsStyle="primary" onClick={this.showModal}>Create</Button></p>

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

//<Calendar />
