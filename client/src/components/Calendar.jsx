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
      overlapAvailabilities: []
    };
    this.pickDate = this.pickDate.bind(this);
    this.compareToSelectDates = this.compareToSelectDates.bind(this);
    this.sortArraysInProperty = this.sortArraysInProperty.bind(this);
    this.compareDates = this.compareDates.bind(this);
    this.compareDateStrings = this.compareDateStrings.bind(this);
    this.checkForConnectedAvailability = this.checkForConnectedAvailability.bind(this);
    this.turnAvailabilityToOjb = this.turnAvailabilityToOjb.bind(this);
    this.addAvailabilityByRange = this.addAvailabilityByRange.bind(this);
    this.deleteMultipleDates = this.deleteMultipleDates.bind(this);
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
        }, () => {
          this.setState({overlapAvailabilities: this.compareToSelectDates()});
          console.log('NEW OVERLAP STATE: ', this.state.overlapAvailabilities);
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
        this.setState({overlapAvailabilities: this.compareToSelectDates()});
        console.log('NEW OVERLAP STATE: ', this.state.overlapAvailabilities);

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
      }, () => {
        this.checkForConnectedAvailability();
      }, ()=>{
        this.setState({overlapAvailabilities: this.compareToSelectDates()}); // this state is relying on availability state changes
      });
      
      console.log('NEW OVERLAP STATE: ', this.state.overlapAvailabilities);

    });
  }

  turnAvailabilityToOjb() {
    var avails = this.state.availability;
    var availsObj = {};
    var selected = {};
    avails.forEach(avail=>{ // this will collect all avails and organize by username
      var check = false;
      if (avail.id) {
        if (availsObj[avail.title] === undefined ) {
          availsObj[avail.title] = [];
        }
        availsObj[avail.title].push({id: avail.id, title: avail.title, start: avail.start, end: avail.end });

      }
    });

    this.sortArraysInProperty(availsObj, this.compareDates);
    // console.log('AVAILABILITIES IN OBJ: ', availsObj);
    return availsObj;
  }

  compareToSelectDates() {
    
    var availsObj = this.turnAvailabilityToOjb();

    // below is to sort multiple availabilities 
    // sortObject(availsObj);

    var list = [];
    var first = true;


    for (var x in availsObj) {
      if (first) {
        list = availsObj[x];
        first = false;
      }
      var tempList = [];
      for (var i = 0; i < availsObj[x].length; i++) {
        // this will examine, current persons avails and noted list
        tempList = tempList.concat(this.compareWithSelectedList(list, availsObj[x][i], x, i));
        // then update.
      }
      if (tempList.length === 0) {
        return [];
      }
      list = tempList;

    }
    console.log('OVERLAP FOUND:', list);
    return list;
    

  }

  compareWithSelectedList(notelist, avail) { // takes notelist(multiple overlaps) and find overlap for current availability passed in as second argument
    var result = [];
    notelist.forEach(noted => { // note[], avail {}

      
      if (this.compareDateStrings(noted.start, avail.start) <= 0 && this.compareDateStrings(noted.end, avail.end) >= 0) {
        // note is larger [{}]
        result.push(avail);
      } else if (this.compareDateStrings(noted.start, avail.start) >= 0 && this.compareDateStrings(noted.end, avail.end) <= 0) {
        // note is smaller {[]}
        result.push(noted);
      } else if (this.compareDateStrings(noted.start, avail.start) <= 0 && this.compareDateStrings(noted.end, avail.end) <= 0) {
        // skew note left [{]}
        var obj = {start: avail.start, end: noted.end};
        if (this.compareDateStrings(obj.start, obj.end) <= 0) {
          result.push(obj);
        }
        
      } else if (this.compareDateStrings(noted.start, avail.start) >= 0 && this.compareDateStrings(noted.end, avail.end) >= 0) {
        // skew note right {[}] 
        var obj = {start: noted.start, end: avail.end};
        if (this.compareDateStrings(obj.start, obj.end) <= 0) {
          result.push(obj);
        }
        
      } 

    });
    // return all overlapping dates
    return result;
  }

  sortArraysInProperty(obj, filter) { // filter to be used for comapring distinct date ranges
    for (var x in obj) {
      obj[x].sort(filter);
    }
  }

  compareDates(first, second) { // this function determines whether the first date is earlier than second
    var date1 = first.start;
    var date2 = second.start;

    if (typeof date1 === 'string') {
      date1 = new Date(date1);
    }
    if (typeof date2 === 'string') {
      date2 = new Date(date2);
    }

    if (date1.getFullYear() < date2.getFullYear()) {
      return -1;
    } else if (date1.getFullYear() > date2.getFullYear()) {
      return 1;
    } else {
      if (date1.getMonth() < date2.getMonth()) {
        return -1;
      } else if (date1.getMonth() > date2.getMonth()) {
        return 1;
      } else {
        if (date1.getDate() < date2.getDate()) {
          return -1;
        } else if (date1.getDate() > date2.getDate()) {
          return 1;
        } else {
          return 0;
        }

      }
    }
  }

  compareDateStrings(first, second) { // this function determines whether the first date string is earlier than second

    var date1 = first;
    var date2 = second;  
    if (typeof date1 === 'string') {
      date1 = new Date(date1);
    }
    if (typeof date2 === 'string') {
      date2 = new Date(date2);
    }

    if (date1.getFullYear() < date2.getFullYear()) {
      return -1;
    } else if (date1.getFullYear() > date2.getFullYear()) {
      return 1;
    } else {
      if (date1.getMonth() < date2.getMonth()) {
        return -1;
      } else if (date1.getMonth() > date2.getMonth()) {
        return 1;
      } else {
        if (date1.getDate() < date2.getDate()) {
          return -1;
        } else if (date1.getDate() > date2.getDate()) {
          return 1;
        } else {
          return 0;
        }

      }
    }
  }

  iterateAvails() {

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

      
      if ( (formatedPickedSlotStartDate.toString() === formatedStartDateFromDB.toString()) && (this.state.user.display === availabilityDuplicate[i]['title']) ) {

        let deleteMe = availabilityDuplicate[i].id;
        sameDateClickedTwice = true;
        // availabilityDuplicate.splice(i, 1);

        // this.setState({
        //   availability: availabilityDuplicate
        // }, ()=>{
          this.setState({overlapAvailabilities: this.compareToSelectDates()});
          console.log('NEW OVERLAP STATE: ', this.state.overlapAvailabilities);

        // });

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
        'title': this.state.user.display,
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

  checkForConnectedAvailability() {
    console.log('enter check for connected availability');
    var availabilityObj = this.turnAvailabilityToOjb();
    console.log('availability obj: ', availabilityObj);

    var currentUserName = this.state.user.display;


    // length - 1 so the next date of i is still in range of the array
    for (var i = 0; i < availabilityObj[currentUserName].length - 1; i++) {

      var iEndDate = new Date(availabilityObj[currentUserName][i].end).getDate();
      var startDateOneDayAfteri = new Date(availabilityObj[currentUserName][i + 1].start).getDate();
      
      console.log('i start date', iEndDate);
      console.log('i next dates end', startDateOneDayAfteri);
      
      var idsToDelete = [];

      if (iEndDate === startDateOneDayAfteri - 1) {
        
        // to prevent i + 2 gets out of array range
        if (availabilityObj[currentUserName][i + 2] !== undefined) {
          var endDateOneDayAfteri = new Date(availabilityObj[currentUserName][i + 1].end).getDate();
          var startDateTwoDaysAfteri = new Date(availabilityObj[currentUserName][i + 2].start).getDate();
          // if the new picked date is in the middle of two dates, ex. originally
          // had 9/3, 9/5, then pick 9/4, we shall combine the activities
          if (endDateOneDayAfteri === startDateTwoDaysAfteri - 1) {
            // connect i, i + 1 and i + 2
            idsToDelete.push(availabilityObj[currentUserName][i].id, availabilityObj[currentUserName][i + 1].id, availabilityObj[currentUserName][i + 2].id);
            
            this.addAvailabilityByRange(availabilityObj[currentUserName][i].start, availabilityObj[currentUserName][i + 2].end);
            

          // 2 days after is in range, but not connected to the new added date
          } else {
            // connect i and i + 1
            idsToDelete.push(availabilityObj[currentUserName][i].id, availabilityObj[currentUserName][i + 1].id);

            this.addAvailabilityByRange(availabilityObj[currentUserName][i].start, availabilityObj[currentUserName][i + 1].end);
            

          }

        // 2 days after is out of range, but i and i + 1 are still connected
        } else {
          // connect i and i + 1
          this.addAvailabilityByRange(availabilityObj[currentUserName][i].start, availabilityObj[currentUserName][i + 1].end);
          
        }
        console.log('connected!');
      }
    }

  }

  addAvailabilityByRange(startDateString, endDateString) {
    // for range end, we need to add 1 to include it on the calendar
    var startDate = new Date(startDateString);
    var endDate = new Date(endDateString);

    var newEndDateYear = endDate.getFullYear();
    var newEndDateMonth = endDate.getMonth();
    var newEndDateDate = endDate.getDate() + 1;

    let newAvailability = {
      'id': null,
      'title': this.state.user.display,
      'start': startDate,
      'end': new Date(newEndDateYear, newEndDateMonth, newEndDateDate)
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

  deleteMultipleDates() {
    
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
            console.log('name: ', name);
          }
          }
          onSelectSlot={ (slotInfo) => {
            this.pickDate(slotInfo);
            console.log('slotInfo: ', slotInfo);
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
