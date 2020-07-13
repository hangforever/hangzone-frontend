import React from 'react';
import { Link } from 'react-router-dom';
import Routes from '../types/Routes'

const Navigation = () => (
  <div>
    <ul>
      <li>
        <Link to={Routes.Main}>Main</Link>
      </li>
      <li>
        <Link to={Routes.Login}>Login</Link>
      </li>
      <li>
        <Link to={Routes.Map}>Map</Link>
      </li>
      <li>
        <Link to={Routes.Settings}>Settings</Link>
      </li>
    </ul>
  </div>
);

export default Navigation;