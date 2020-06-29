import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <div>
    <ul>
      <li>
        <Link to="/">Main</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  </div>
);

export default Navigation;