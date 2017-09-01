import React from 'react';
import ReactDOM from 'react-dom';
import Event from '../src/components/Event.jsx';

import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount, shallow, } from 'enzyme';

describe('<Event /> component', () => {
  const wrapper = shallow(<Event />);
  it('should placeholder text', () => {
    expect(wrapper.contains(<p>This is the Event</p>)).toEqual(true);
  });
});