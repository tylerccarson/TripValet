import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';

import 'react-big-calendar/lib/css/react-big-calendar.css';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class Calendar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: this.props.currentUser,
      trip: this.props.trip,
      availability: [{
        title: this.props.trip.tripname,
        start: this.props.trip.rangeStart,
        end: this.props.trip.rangeEnd,
      }]
    };
    this.pickDate = this.pickDate.bind(this);
    this.checkForConnectedAvailability = this.checkForConnectedAvailability.bind(this);
  }

  componentWillMount() {
    let currentAvailability = this.state.availability;
    axios.get('/availability/byTripId')
      .then((availabilities)=>{

        let storedAvailability = availabilities.data.map((avail) => {
          let users = this.props.allUsers;
          let name;
          for (var i = 0; i < users.length; i++) {
            if (users[i].id === avail.user_id) {
              name = users[i].first;
            }
          }
          return {
            'id': avail.id,
            'title': name,
            'start': avail.rangeStart,
            'end': avail.rangeEnd
          };
        });

        currentAvailability = currentAvailability.concat(storedAvailability);
        this.setState({
          availability: currentAvailability
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {

    this.props.socket.on('serverAvailabilityAdd', (data) => {

      let stateAvailability = this.state.availability;
      stateAvailability.push(data);


      this.setState({
        availability: stateAvailability
      }, () => {
        this.checkForConnectedAvailability();
      });
    });

    this.props.socket.on('serverAvailabilityDelete', (data) => {
      let stateAvailability = this.state.availability;

      console.log('this.state.availability before sending to server: ', stateAvailability);

      for (var i = 0; i < stateAvailability.length; i++) {
        if (stateAvailability[i].id === data) {
          stateAvailability.splice(i, 1);
        }
      }

      console.log('this.state.availability after sending to server: ', stateAvailability);
      

      this.setState({
        availability: stateAvailability
      }, () => {
        this.checkForConnectedAvailability();        
      });
    });
  }

  pickDate(pickedSlot, callback) {

    // if the availablity list array is empty, the for loop below won't run
    if (!this.state.availability.length) {
      var sameDateClickedTwice = false;
    }

    // Following best practices to not mutate state, so create a duplicate, modify
    // the duplicate, and set state to the duplicate
    var availabilityDuplicate = this.state.availability.slice();


    // TODO: improve efficiency in the future if I have time.
    for (var i = 0; i < availabilityDuplicate.length; i++) {
      var sameDateClickedTwice = false;
      // if the same user clicked the same date twice,
      // compare string since the date seems to be unique


      // formate the date from DB (string) to a date(Date()) so the .toString()
      // comparison works.
      var formatedStartDateFromDB = new Date(availabilityDuplicate[i]['start']);

      if (typeof pickedSlot.start === 'string') {
        var formatedPickedSlotStartDate = new Date(pickedSlot.start);
      } else {
        var formatedPickedSlotStartDate = pickedSlot.start;
      }

      if ( formatedPickedSlotStartDate.toString() === formatedStartDateFromDB.toString() && (this.state.user.first === availabilityDuplicate[i]['title']) ) {
        let deleteMe = availabilityDuplicate[i].id;
        sameDateClickedTwice = true;
        availabilityDuplicate.splice(i, 1);

        //delete entry from the DB
        axios.post('/availability/delete', {
          'id': deleteMe
        })
          .then((res) => {
            this.props.socket.emit('clientAvailabilityDelete', deleteMe);
          })
          .catch((err) => {
            console.log(err);
          });

        break;
      }
    }

    if (!sameDateClickedTwice) {

      let newAvailability = {
        'id': null,
        'title': this.state.user.first,
        'start': pickedSlot.start,
        'end': pickedSlot.end
      };

      //1 put new availability into DB and emit via sockets
      axios.post('/availability/byTripId', newAvailability)
        .then((posted) => {
          newAvailability.id = posted.data.id;
          this.props.socket.emit('clientAvailabilityAdd', newAvailability);
        })
        .catch((err) => {
          console.log(err);
        });

    }

  }

  checkForConnectedAvailability(selected) {

    console.log('this.state.availability: ', this.state.availability);
    // console.log('this.state.availability.length: ', this.state.availability.length);

    for (var i = 0; i < this.state.availability.length; i++) {
      for (var j = i + 1; j < this.state.availability.length; j++) {

        console.log('i: ', i);
        console.log('j: ', j);

        var iStartDate = this.state.availability[i].start;
        var iEndDate = this.state.availability[i].end;

        var jStartDate = this.state.availability[j].start;
        var jEndDate = this.state.availability[j].end;

        console.log('iStartDate: ', iStartDate);
        console.log('iEndDate: ', iEndDate);
        console.log('jStartDate: ', jStartDate);
        console.log('jEndDate: ', jEndDate);

        // console.log('new Date(iEndDate).getDate() - 1: ', new Date(iEndDate).getDate() - 1);
        // console.log('new Date(jStartDate).getDate(): ', new Date(jStartDate).getDate());


        // assuming the added date is availability j, if availability j is one day 
        // after availability i, add a merged availability and delete the 2 
        // individual availabilities
        if ( (this.state.user.first === this.state.availability[i]['title']) && (this.state.user.first === this.state.availability[j]['title']) && (new Date(iEndDate).getDate() === new Date(jStartDate).getDate() - 1) ) {

          // delete jth availability

          console.log('delete j ', j);
          console.log('i in delete j: ', i);

          var availabilityDuplicate = this.state.availability.slice();

          let deleteMe = availabilityDuplicate[j].id;
          availabilityDuplicate.splice(j, 1);
          
          this.setState({
            availability: availabilityDuplicate
          });

          console.log('i in delete j after setState: ', i);
          
          //delete entry from the DB
          axios.post('/availability/delete', {
            'id': deleteMe
          })
          .then((res) => {
            console.log('this.state.availability after post', this.state.availability);
            console.log('i in delete j after post: ', i);
            
            this.props.socket.emit('clientAvailabilityDelete', deleteMe);
          })
          .then(() => {
            // delete ith availability

            console.log('delete i', i);

            console.log('availability', this.state.availability);

            var availabilityDuplicate = this.state.availability.slice();
                        
            let deleteMe = availabilityDuplicate[i].id;
            availabilityDuplicate.splice(i, 1);

            this.setState({
              availability: availabilityDuplicate
            });
            //delete entry from the DB
            axios.post('/availability/delete', {
              'id': deleteMe
            })
            .then((res) => {
            this.props.socket.emit('clientAvailabilityDelete', deleteMe);
            })
            .then(() => {
              // add new availability

              console.log('add availability');

              console.log('this.state.availability: ', this.state.availability);

              let newAvailability = {
                'id': null,
                'title': this.state.user.first,
                'start': iStartDate,
                'end': jEndDate
              };

              //1 put new availability into DB and emit via sockets
              axios.post('/availability/byTripId', newAvailability)
                .then((posted) => {
                  newAvailability.id = posted.data.id;
                  this.props.socket.emit('clientAvailabilityAdd', newAvailability);
                })
                .catch((err) => {
                  console.log('error happend when trying to add availability: ',err);
                });
            })
            .catch((err) => {
              console.log('error happend when trying to delete i: ', i, err);
            })

          })
          .catch((err) => {
            console.log('error happened when trying to delete j: ', j, err);
          });          
        }
      }
    }
  }

  render() {

    // should give an explicit height based on documentation
    var style = {
      height: '400px'
    };

    return (
      <div style={style} {...this.props}>
        <BigCalendar
          selectable
          popup
          events = {this.state.availability}
          defaultDate={ new Date() } // set to current date
          onSelectEvent={ (name) => {
            // unpick for clicking on name cause it is more intuitive
            this.pickDate(name, () => {
              console.log('name: ', name);
            });
          }
          }
          onSelectSlot={ (slotInfo) => {
            this.pickDate(slotInfo, () => {
              console.log('slotInfo: ', slotInfo);
            });
          }
          }
        />
        <div>
          <br/>
        </div>

      </div>
    );
  }
}

export default Calendar;
