import React from 'react';
import ReactDOM from 'react-dom';
import DashBoard from '../src/components/Dashboard.jsx';

import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount, shallow, } from 'enzyme';

describe('<DashBoard /> component', () => {
  const wrapper = shallow(<DashBoard />);
  it('should placeholder text', () => {
    expect(wrapper.contains(<h1>Dashboard is loaded</h1>)).toEqual(true);
  });
});
