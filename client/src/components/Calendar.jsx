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
      }],
      startDateForRange: '',
      endDateForRange: ''
    };
    this.pickDate = this.pickDate.bind(this);
    this.startDateChange = this.startDateChange.bind(this);
    this.endDateChange = this.endDateChange.bind(this);
    this.pickDateByRange = this.pickDateByRange.bind(this);
    this.inputIsValid = this.inputIsValid.bind(this);
    this.compareToSelectDates = this.compareToSelectDates.bind(this);
    this.sortArraysInProperty = this.sortArraysInProperty.bind(this);
    this.compareDates = this.compareDates.bind(this);
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
              name = users[i].display;
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

        this.compareToSelectDates();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {

    this.props.socket.on('serverAvailabilityAdd', (data) => {

      let stateAvailability = this.state.availability;
      stateAvailability.push(data);

      this.setState({
        availability: stateAvailability
      });
    });

    this.props.socket.on('serverAvailabilityDelete', (data) => {
      let stateAvailability = this.state.availability;

      for (var i = 0; i < stateAvailability.length; i++) {
        if (stateAvailability[i].id === data) {
          stateAvailability.splice(i, 1);
        }
      }

      this.setState({
        availability: stateAvailability
      });
    });
  }

  compareToSelectDates() {
    var avails = this.state.availability;
    console.log("COMPARE Avails!", avails);

    var availsObj = {};
    var selected = {};
    avails.forEach(avail=>{ // this will collect all avails and organize by user
      var check = false;
      if (avail.id) {
        if (availsObj[avail.title] === undefined ) {
          availsObj[avail.title] = [];
        }
        availsObj[avail.title].push({start: avail.start, end: avail.end });

      }
    });
    console.log('AVAIL OBJ: ', availsObj);
    //console.log('Demo distinct ', availsObj)

    this.sortArraysInProperty(availsObj, this.compareDates);
    console.log('Avails After Sort', availsObj);

    // below is to sort multiple availabilityies 
    // sortObject(availsObj);
  }

  sortArraysInProperty(obj, filter) { // filter will be comapring distinct ranges
    for (var x in obj) {
      obj[x].sort(filter);
    }
  }

  compareDates(first, second) { // assume one date obj;
    var date1 = first.start;
    var date2 = second.start;

    if (typeof date1 === 'string') {
      date1 = new Date(date1);
    }
    if (typeof date2 === 'string') {
      date2 = new Date(date2);
    }

    if (date1.getFullYear()<date2.getFullYear()) {
      return -1;
    } else if (date1.getFullYear()>date2.getFullYear()) {
      return 1;
    } else {
      if (date1.getMonth()<date2.getMonth()) {
        return -1;
      } else if (date1.getMonth()>date2.getMonth()) {
        return 1;
      } else {
        if (date1.getDate()<date2.getDate()) {
          return -1;
        } else if (date1.getDate()>date2.getDate()) {
          return 1;
        } else {
          return 0;
        }

      }
    }
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


      // formate the date from DB (string) to a date(Date()) so the .toString()
      // comparison works.
      var formatedStartDateFromDB = new Date(availabilityDuplicate[i]['start']);

      if (typeof pickedSlot.start === 'string') {
        var formatedPickedSlotStartDate = new Date(pickedSlot.start);
      } else {
        var formatedPickedSlotStartDate = pickedSlot.start;
      }


      if ( formatedPickedSlotStartDate.toString() === formatedStartDateFromDB.toString() && (this.state.user.display === availabilityDuplicate[i]['title']) ) {
        let deleteMe = availabilityDuplicate[i].id;
        sameDateClickedTwice = true;
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
            this.compareToSelectDates();
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
        'title': this.state.user.display,
        'start': pickedSlot.start,
        'end': pickedSlot.end
      };

      //1 put new availability into DB and emit via sockets
      axios.post('/availability/byTripId', newAvailability)
        .then((posted) => {
          newAvailability.id = posted.data.id;
          this.props.socket.emit('clientAvailabilityAdd', newAvailability);
          this.compareToSelectDates();
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

    let newAvailability = {
      'title': this.state.user.display,
      'start': new Date(startDateObj.year, startDateObj.month, startDateObj.date),
      'end': new Date(endDateObj.year, endDateObj.month, endDateObj.date)
    };
    availabilityDuplicate.push(newAvailability);

    this.setState({
      startDateForRange: '',
      endDateForRange: '',
      availability: availabilityDuplicate
    });

    //put into DB test: {rangeStart: '2017/09/08', rangeEnd: '2017/09/30'}
    //maybe switch this out for sockets?
    axios.post('/availability/byTripId', newAvailability)
      .then((posted) => {
        console.log('successfully added to DB');
        this.compareToSelectDates();
      })
      .catch((error) => {
        console.log(error);
      });
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
            this.pickDate(name);
          }
          }
          onSelectSlot={ (slotInfo) => {
            this.pickDate(slotInfo);
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
