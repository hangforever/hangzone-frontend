import './Navigation.scss';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { User, Notebook, Map } from './icons';
import Routes from '../types/Routes';

const Navigation = () => {
  return (
    <nav className="Navigation">
      <ul>
        <NavLink activeClassName="active" to={Routes.Profile}>
          <li>
            <User />
            <span>Profile</span>
          </li>
        </NavLink>
        <NavLink activeClassName="active" to={Routes.Map}>
          <li>
            <Map />
            <span>Map</span>
          </li>
        </NavLink>
        <NavLink activeClassName="active" to={Routes.Friends}>
          <li>
            <Notebook />
            <span>Friends</span>
          </li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navigation;
