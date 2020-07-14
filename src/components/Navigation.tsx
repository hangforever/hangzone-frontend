import './Navigation.scss'
import React from 'react';
import { NavLink } from 'react-router-dom';
import Routes from '../types/Routes'

const Navigation = () => {
  return (
    <nav className="Navigation">
      <ul>
        <li>
          <NavLink exact activeClassName='active' to={Routes.Main}>Main</NavLink>
        </li>
        <li>
          <NavLink activeClassName='active' to={Routes.Login}>Login</NavLink>
        </li>
        <li>
          <NavLink activeClassName='active' to={Routes.Map}>Map</NavLink>
        </li>
        <li>
          <NavLink activeClassName='active' to={Routes.Settings}>Settings</NavLink>
        </li>
        <li>
          <NavLink activeClassName='active' to={Routes.Profile}>Profile</NavLink>
        </li>
      </ul>
    </nav>
  )
};

export default Navigation;