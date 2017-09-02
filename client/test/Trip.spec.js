import React from 'react';
import ReactDOM from 'react-dom';
import Trip from '../src/components/Trip.jsx';

import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount, shallow, } from 'enzyme';

describe('<Trip /> component', () => {
  const wrapper = shallow(<Trip />);
  it('should placeholder text', () => {
    expect(wrapper.contains(<p>This is the Trip</p>)).toEqual(true);
  });
});