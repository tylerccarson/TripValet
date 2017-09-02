import React from 'react';
import ReactDOM from 'react-dom';
import Trip from '../src/components/Trip.jsx';

import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount, shallow, } from 'enzyme';

describe('<Trip /> component', () => {
  const wrapper = shallow(<Trip />);
  it('should placeholder text', () => {
    expect(wrapper.contains(<h1>This is the Trip</h1>)).toEqual(true);
  });
});
