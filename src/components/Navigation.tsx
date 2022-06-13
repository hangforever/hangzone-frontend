import './Navigation.scss';
import { NavLink } from 'react-router-dom';
import { User, Notebook, Map } from './icons';
import Routes from '@src/types/Routes';

const Navigation = () => {
  return (
    <nav className="Navigation">
      <ul>
        <NavLink to={Routes.Profile}>
          <li>
            <User />
            <span>Profile</span>
          </li>
        </NavLink>
        <NavLink to={Routes.Map}>
          <li>
            <Map />
            <span>Map</span>
          </li>
        </NavLink>
        <NavLink to={Routes.Friends}>
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
