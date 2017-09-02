import React from 'react';
import ReactDOM from 'react-dom';
import DashBoard from '../src/components/DashBoard.jsx';

import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount, shallow, } from 'enzyme';

describe('<DashBoard /> component', () => {
  const wrapper = shallow(<DashBoard />);
  it('should placeholder text', () => {
    expect(wrapper.contains(<Jumbotron>
      <h1>Upcoming Trips</h1>
      <p>Trip one</p>
      <p>Trip two</p>

      <p><Button bsStyle="primary">Create</Button></p>
    </Jumbotron>)).toEqual(true);
  });
});
