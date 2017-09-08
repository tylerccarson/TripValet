import React from 'react';
import { Link, Route } from 'react-router-dom';

const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/trip'>Trip</Link></li>
        <li><Link to='/'>Dashboard</Link></li>
      </ul>
    </nav>
  </header>
);


export default Header;
