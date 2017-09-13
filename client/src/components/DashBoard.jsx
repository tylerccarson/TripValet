import React from 'react';
import { Jumbotron, Button, Modal, ButtonToolbar } from 'react-bootstrap';
import GifsTemp from '../components/GifsTemp.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import TripForm from './TripForm.jsx';
import TripLinks from './TripLinks.jsx';
import { List } from 'material-ui/List';
import axios from 'axios';

class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lgShow: false,
      user: {},
      upcomingTrips: [],
      currentTrips: [],
      previousTrips: []
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

  componentWillMount() {
    axios.get('/trips/byEmail')
      .then((trips)=>{

        for (var i = 0; i < trips.data.length; i++) {
          var startDate = new Date(trips.data[i].rangeStart);
          var endDate = new Date(trips.data[i].rangeEnd);

          // if the trip's end date is earlier than today, this trip has happened 
          // already. valueOf() returns the miliseconds passed since 1970/1/1 till
          // today since it is complicated to compare year, months and dates
          if (endDate.valueOf() <= new Date().valueOf()) {
            var previousTripsDuplicate = this.state.previousTrips;
            previousTripsDuplicate.push(trips.data[i]);

            this.setState({
              previousTrips: previousTripsDuplicate
            });
          // if the trip's start data is later than today, this trip is in the 
          // future
          } else if (startDate.valueOf() >= new Date().valueOf()) {
            var upcomingTripsDuplicate = this.state.upcomingTrips;
            upcomingTripsDuplicate.push(trips.data[i]);

            this.setState({
              upcomingTrips: upcomingTripsDuplicate
            });

          // if none of them is true, it can be considered as currently happening
          // trip
          } else {
            var currentTripsDuplicate = this.state.currentTrips;
            currentTripsDuplicate.push(trips.data[i]);

            this.setState({
              currentTrips: currentTripsDuplicate
            });
          }

        }

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
          <h3>Current Trips</h3>
          <List>
            <TripLinks trips={this.state.currentTrips}/>
          </List>
        </Jumbotron>
        
        <Jumbotron>
          <h3>Upcoming Trips</h3>
          <List>
            <TripLinks trips={this.state.upcomingTrips}/>
          </List>
        </Jumbotron>

        <Jumbotron>
          <h3>Previous Trips</h3>
          <List>
            <TripLinks trips={this.state.previousTrips}/>
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
