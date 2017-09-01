import React from 'react';
import ReactDOM from 'react-dom';
import DashBoard from '../src/components/Dashboard.jsx';

import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount, shallow, render } from 'enzyme';

chai.use(chaiEnzyme());

describe('<DashBoard /> component', () => {
  const wrapper = shallow(<DashBoard />);

  it('should have text', () => {
    console.log(wrapper);
    expect(wrapper.contains(<p>This is the Dashboard</p>)).to.equal(true);
  });
});