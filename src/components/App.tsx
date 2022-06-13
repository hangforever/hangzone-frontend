import React, { useContext, useEffect } from 'react';
import './App.scss';
import { Route, useNavigate } from 'react-router-dom';
import Navigation from '@components/Navigation';
import Main from '@components/Main';
import Login from '@components/Login';
import Map from '@components/Map';
import Profile from '@components/Profile';
import SignUp from '@components/SignUp';
import SignUpComplete from '@components/SignUpComplete';
import Loading from '@components/Loading';
import Friends from '@components/Friends';
import DebugZone from '@components/DebugZone';
import { Routes } from '@src/types';
import { isDevelopment } from '../util';

function App() {
  const navigate = useNavigate();

  const appContent = (
    <div className="App bg-main" data-testid="App">
      {false ? (
        <>
          <div className="body">
            <Route path={Routes.Main}><Main /></Route>
            <Route path={Routes.Map}><Map /></Route>
            <Route path={Routes.Profile}><Profile /></Route>
            <Route path={Routes.Friends}><Friends /></Route>
          </div>

          <Navigation />
          <div className="spacer"></div>
        </>
      ) : (
        <>
          <Route path={Routes.Login}><Login /></Route>
          <Route path={Routes.SignUp}><SignUp /></Route>
          <Route path={Routes.SignUpComplete}><SignUpComplete /></Route>
          {isDevelopment() && (
            <Route path={Routes.DebugZone}><DebugZone /></Route>
          )}
        </>
      )}
    </div>
  );

  return (
    <>
      <div id="portal-root" />
      {true ? <Loading>Loading...</Loading> : appContent}
    </>
  );
}

export default App;
