import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

// TODO: click again to unpick    done!
// be able to set range for long dates
// only put your name once per day


class Calendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: 'Lee',  // hard coded for now
      eventList: [  // hard coded for now
        {
          'title': 'Long Event',
          'start': new Date(2017, 8, 7),
          'end': new Date(2017, 8, 10)
        }
      ]
    }

    this.pickDate = this.pickDate.bind(this);
  }

  pickDate(pickedSlot) {
    // create duplicate cause Oleg said we shouldn't be altering state directly
    var eventListDuplicate = this.state.eventList.slice();

    for (var i = 0; i < eventListDuplicate.length; i++) {
      var sameDateClickedTwice = false;
      // if the same user clicked the same date twice
      if (pickedSlot.start.toString() === eventListDuplicate[i]['start'].toString() && this.state.userName === eventListDuplicate[i]['title']) {
        sameDateClickedTwice = true;
        eventListDuplicate.splice(i, 1);

        this.setState({
          eventList: eventListDuplicate
        })

        break;
      }
    }
    
    if (!sameDateClickedTwice) {
      eventListDuplicate.push({
        'title' : this.state.userName,
        'start' : pickedSlot.start,
        'end' : pickedSlot.end
      });
      this.setState({
        eventList: eventListDuplicate
      });

    }


  }

  render() {

    // should give an explicit height based on documentation
    var style = {
      height: "400px"
    }

    return (
      <div style={style} {...this.props}>
        <BigCalendar
          selectable
          events = {this.state.eventList}
          defaultDate={new Date()}
          onSelectEvent={ (event) => 
            {
              // unpick for clicking on event cause it is more intuitive
              this.pickDate(event);
            }
          }
          onSelectSlot={ (slotInfo) => 
            {
              this.pickDate(slotInfo);
            }
            
          }
        />
      </div>
    );
  }
};

export default Calendar;