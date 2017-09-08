import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../src/components/Header.jsx';

import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount, shallow, } from 'enzyme';

xdescribe('<Header /> component', () => {
  const wrapper = shallow(<Header />);
  it('should placeholder text', () => {
    expect(wrapper.contains(<h1>Header.jsx is connected</h1>)).toEqual(true);
  });
});
