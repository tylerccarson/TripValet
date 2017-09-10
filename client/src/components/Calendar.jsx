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
      availability: [],
      startDateForRange: '',
      endDateForRange: ''
    };

    this.pickDate = this.pickDate.bind(this);
    this.startDateChange = this.startDateChange.bind(this);
    this.endDateChange = this.endDateChange.bind(this);
    this.pickDateByRange = this.pickDateByRange.bind(this); 
    this.inputIsValid = this.inputIsValid.bind(this); 
  }

  componentWillMount() {
    //get all availability for current trip and push into the availability array
    let currentAvailability = this.state.availability;
    axios.get('/availability/byTripId')
      .then((availabilities)=>{
        console.log('AVAIL---------', availabilities.data);
        currentAvailability = currentAvailability.concat(availabilities.data);
        this.setState({
          availability: currentAvailability
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    //set up to receive socket info for new availability
    //how to do this based on trip id?
  }

  pickDate(pickedSlot) {

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
      if (pickedSlot.start.toString() === availabilityDuplicate[i]['start'].toString() && this.state.user.first === availabilityDuplicate[i]['title']) {
        sameDateClickedTwice = true;
        availabilityDuplicate.splice(i, 1);
        //delete entry from the DB
        //

        this.setState({
          availability: availabilityDuplicate
        });

        break;
      }
    }
    
    if (!sameDateClickedTwice) {
      let newAvailability = {
        'title': this.state.user.first,
        'start': pickedSlot.start,
        'end': pickedSlot.end
      };
      availabilityDuplicate.push(newAvailability);

      //1 reset state with new availabiliyt
      this.setState({
        availability: availabilityDuplicate
      });
      
      //2 put new availability into DB w/ trip id as well
      axios.post('/availability/byTripId', newAvailability)
        .then((posted) => {
          console.log('successfully added to DB');
        })
        .catch((error) => {
          console.log(error);
        });
    }

  }

  startDateChange(e) {
    this.setState({
      startDateForRange: e.target.value
    });
  }

  endDateChange(e) {
    this.setState({
      endDateForRange: e.target.value
    });
  }

  pickDateByRange() {

    if ( !this.inputIsValid() ) {
      return;
    }

    var startDateArray = this.state.startDateForRange.split('/');
    var endDateArray = this.state.endDateForRange.split('/');

    var startDateObj = {
      year: parseInt(startDateArray[0]),
      month: parseInt(startDateArray[1]) - 1, // month is 0 based
      date: parseInt(startDateArray[2])
    };

    var endDateObj = {
      year: parseInt(endDateArray[0]),
      month: parseInt(endDateArray[1]) - 1,
      date: parseInt(endDateArray[2]) + 1 // doesn't include end date so have to + 1 to include it
    };

    var availabilityDuplicate = this.state.availability.slice();

    availabilityDuplicate.push({
      'title': this.state.user.first,
      'start': new Date(startDateObj.year, startDateObj.month, startDateObj.date),
      'end': new Date(endDateObj.year, endDateObj.month, endDateObj.date)
    });

    this.setState({
      startDateForRange: '',
      endDateForRange: '',
      availability: availabilityDuplicate
    });

    //put into DB

  }

  inputIsValid() {
    var startDateArray = this.state.startDateForRange.split('/');
    var endDateArray = this.state.endDateForRange.split('/');

    // BUG: if the end date is at the most right bottom corner of the calendar,
    // the next month's first date would be selected, ex. 2017/09, 2016/12

    // alert if user inputs invalid date, haven't try to prevent XSS yet

    // should have two /s,  like 2017/09/01
    if (startDateArray.length !== 3 || endDateArray.length !== 3  
        // year should be 4 digits
        || startDateArray[0].length !== 4 || endDateArray[0].length !== 4 
        // month should be between 0 to 11 (0 based)
        || parseInt(startDateArray[1]) < 0 || parseInt(startDateArray[1]) > 12
        || parseInt(endDateArray[1]) < 0 || parseInt(endDateArray[1]) > 12
        // date should be between 0 to 31
        || parseInt(startDateArray[2]) <= 0 || parseInt(startDateArray[2]) > 31
        || parseInt(endDateArray[2]) <= 0 || parseInt(endDateArray[2]) > 31
    ) {
      alert('Invalid date!');
      return false;
    }

    return true;
  }

  componentDidMount() {
    axios.get('/availability/byTripId')
      .then((availabilities)=>{
        console.log('AVAIL---------', availabilities);
      });
    axios.post('/availability/byTripId', {rangeStart: '2017/09/08', rangeEnd: '2017/09/30'})
      .then((avail)=>{
        console.log('1238917239128731298371293', avail);
      });
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
          events = {this.state.availability}
          defaultDate={ new Date() } // set to current date
          onSelectEvent={ (name) => {
            // unpick for clicking on name cause it is more intuitive
            this.pickDate(name);
          }
          }
          onSelectSlot={ (slotInfo) => {
            this.pickDate(slotInfo);
          }
          }
        />

        <div>
          <p>Start Date: </p>
          <input value={this.state.startDateForRange} placeholder="YYYY/MM/DD" onChange={this.startDateChange}/>
          
          <p>End Date: </p>
          <input value={this.state.endDateForRange} placeholder="YYYY/MM/DD" onChange={this.endDateChange}/>
          
          <br/>
          <button className="pickDateRange" onClick={this.pickDateByRange}>Set Availability!</button>
        </div>

      </div>
    );
  }
}

export default Calendar;