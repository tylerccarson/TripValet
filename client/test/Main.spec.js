import React from 'react';
import Main from '../src/components/Main.jsx';
import { Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Header from '../src/components/Header.jsx';
import DashBoard from '../src/components/DashBoard.jsx';
import { MemoryRouter } from 'react-router';

import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount, shallow, } from 'enzyme';

xdescribe('<Main /> component', () => {
  const wrapper = shallow(<MemoryRouter><Main /></MemoryRouter>);
  it('should have a <DashBoard /> component', () => {
    // expect(wrapper.containsAllMatchingElements([
    //   <DashBoard />
    // ])).toEqual(true);
  });
});
