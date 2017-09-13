import React from 'react';
import { Link, Route } from 'react-router-dom';
import { Navbar, NavItem, Nav, NavDropdown} from 'react-bootstrap';
const Header = (props) => (
  <header>
    <nav>

      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/'>Trip Valet</Link>
            <Link to='/*'></Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Brand pullRight>
            <Link
              to='/logout'
              onClick={props.logout}>
              |       Logout
            </Link>
          </Navbar.Brand>
        </Navbar.Collapse>
      </Navbar>

    </nav>
  </header>
);


export default Header;
//
