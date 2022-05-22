import React, { useContext, useEffect } from 'react';
import './App.scss';
import { Route, useHistory } from 'react-router-dom';
import Navigation from 'components/Navigation';
import Main from '@src/components/Main';
import Login from '@src/components/Login';
import Map from '@src/components/Map';
import Profile from '@src/components/Profile';
import SignUp from '@src/components/SignUp';
import SignUpComplete from '@src/components/SignUpComplete';
import Loading from '@src/components/Loading';
import Friends from '@src/components/Friends';
import DebugZone from '@src/components/DebugZone';
import { Routes } from 'types';
import { isDevelopment } from '../util';

function App() {
  const history = useHistory();

  const appContent = (
    <div className="App bg-main" data-testid="App">
      {false ? (
        <>
          <div className="body">
            <Route exact path={Routes.Main} component={Main} />
            <Route path={Routes.Map} component={Map} />
            <Route path={Routes.Profile} component={Profile} />
            <Route path={Routes.Friends} component={Friends} />
          </div>

          <Navigation />
          <div className="spacer"></div>
        </>
      ) : (
        <>
          <Route path={Routes.Login} component={Login} />
          <Route exact path={Routes.SignUp} component={SignUp} />
          <Route path={Routes.SignUpComplete} component={SignUpComplete} />
          {isDevelopment() && (
            <Route path={Routes.DebugZone} component={DebugZone} />
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

export default observer(App);
