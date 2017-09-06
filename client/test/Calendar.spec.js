import React from 'react';
import Calendar from '../src/components/Calendar.jsx';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { mount, shallow, } from 'enzyme';

describe('<Calendar /> component', () => {

  const wrapper = mount(<Calendar />);
  wrapper.setState({
    startDateForRange: '2017/09/08',
    endDateForRange: '2017/09/13'
  });

  it('should have a BigCalendar component', () => {
    expect(wrapper.containsMatchingElement(<BigCalendar />)).toEqual(true);
  });

  it('should set new availability for current user on click', () => {
    expect(wrapper.state('availability')).toEqual([]);
    wrapper.find('.pickDateRange').simulate('click');
    expect(wrapper.state('availability')[0].start.getDay()).toEqual(5);
    expect(wrapper.state('availability')[0].start.getMonth()).toEqual(8);
    expect(wrapper.state('availability')[0].start.getFullYear()).toEqual(2017);
  });

  it('should not allow invalid dates', () => {

  });

  it('should be able to make a range across different months', () => {

  });

  it('should make multiple ranges for one user', () => {

  });

  it('should not create duplicate date ranges', () => {

  });

  it('should fetch friend availability on load', () => {

  });

});
