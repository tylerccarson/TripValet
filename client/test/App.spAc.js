import React from 'react';
import App from '../src/app.js';
import Dashboard from '../src/components/Dashboard.jsx';

import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount, shallow } from 'enzyme';

describe('<App /> component', () => {
  const wrapper = shallow(<App />);

  test('should have a dashboard component', () => {
    expect(wrapper.containsAllMatchingElements([
      <Dashboard />
    ])).toEqual(true);
  });

});	