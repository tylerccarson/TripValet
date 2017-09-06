import React from 'react';
import Calendar from '../src/components/Calendar.jsx';
import BigCalendar from 'react-big-calendar';
import { mount, shallow, } from 'enzyme';

describe('<Calendar /> component', () => {

  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Calendar />);
  });

  it('should have a BigCalendar component', () => {
    expect(wrapper.containsMatchingElement(<BigCalendar />)).toEqual(true);
  });

  it('should set new availability for current user on submit', () => {
    wrapper.setState({
      startDateForRange: '2017/09/08',
      endDateForRange: '2017/09/13'
    });
    expect(wrapper.state('availability')).toEqual([]);
    wrapper.find('.pickDateRange').simulate('click');
    expect(wrapper.state('availability')[0].start.getDay()).toEqual(5);
    expect(wrapper.state('availability')[0].start.getMonth()).toEqual(8);
    expect(wrapper.state('availability')[0].start.getFullYear()).toEqual(2017);
  });

  it('should be able to make a range across different months', () => {
    wrapper.setState({
      startDateForRange: '2017/09/08',
      endDateForRange: '2017/09/13'
    });
  });

  it('should make multiple ranges for one user', () => {
    expect(wrapper.state('availability')).toEqual([]);
    wrapper.setState({
      startDateForRange: '2017/09/08',
      endDateForRange: '2017/09/13'
    });

    wrapper.find('.pickDateRange').simulate('click');
    expect(wrapper.state('availability')).toHaveLength(1);
    wrapper.setState({
      startDateForRange: '2017/09/18',
      endDateForRange: '2017/09/24'
    });

    wrapper.find('.pickDateRange').simulate('click');
    expect(wrapper.state('availability')).toHaveLength(2);
    expect(wrapper.state('availability')).not.toHaveLength(5);
  });

  //component needs work to make this test pass
  xit('should not create duplicate date ranges', () => {
    expect(wrapper.state('availability')).toEqual([]);
    wrapper.setState({
      startDateForRange: '2017/09/08',
      endDateForRange: '2017/09/13'
    });

    wrapper.find('.pickDateRange').simulate('click');
    expect(wrapper.state('availability')).toHaveLength(1);
    wrapper.setState({
      startDateForRange: '2017/09/10',
      endDateForRange: '2017/09/20'
    });

    wrapper.find('.pickDateRange').simulate('click');
    expect(wrapper.state('availability')).toHaveLength(1);
    expect(wrapper.state('availability')).not.toHaveLength(2);
  });

  xit('should fetch friend availability on load', () => {
    //seed data into the test database before mounting the component
    //then check that it was fetched during the mounting process
    expect(wrapper.state('availability')).toHaveLength();
  });

});
