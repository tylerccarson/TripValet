import React from 'react';
import ReactDOM from 'react-dom';
import DashBoard from '../src/components/DashBoard.jsx';
import { Jumbotron, Button } from 'react-bootstrap';
import { Provider } from 'react-redux';

import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount, shallow, } from 'enzyme';
import configureStore from '../src/store/configureStore';
const store = configureStore();

describe('<DashBoard /> component', () => {
  const wrapper = shallow( <Provider store={store}><DashBoard /></Provider>);
  it('should placeholder text', () => {
    // expect(wrapper.contains(<Jumbotron>
    //   <h1>Upcoming Trips</h1>
    //   <p>Trip one</p>
    //   <p>Trip two</p>
    //
    //   <p><Button bsStyle="primary">Create</Button></p>
    // </Jumbotron>)).toEqual(true);
  });
});
