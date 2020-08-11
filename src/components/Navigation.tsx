import './Navigation.scss'
import React from 'react';
import { NavLink } from 'react-router-dom';
import Routes from '../types/Routes'

const Navigation = () => {
  return (
    <nav className="Navigation">
      <ul>
        <NavLink exact activeClassName='active' to={Routes.Main}><li>Main</li></NavLink>
        <NavLink activeClassName='active' to={Routes.Map}><li>Map</li></NavLink>
        <NavLink activeClassName='active' to={Routes.Friends}><li>Friends</li></NavLink>
        <NavLink activeClassName='active' to={Routes.Profile}><li>Profile</li></NavLink>
        <NavLink activeClassName='active' to={Routes.Settings}><li>Settings</li></NavLink>
      </ul>
    </nav>
  )
};

export default Navigation;