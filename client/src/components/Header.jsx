import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
  <nav>
    <h1>"Header.jsx"</h1>
    <ul>
      <li><Link to='/'>Dashboard</Link></li>
      <li><Link to='/Trip'>Trip</Link></li>
    </ul>
  </nav>
</header>
);


export default Header;
