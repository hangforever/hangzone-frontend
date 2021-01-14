import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import './App.scss';
import { Route, useHistory } from 'react-router-dom';
import Navigation from 'components/Navigation';
import Main from 'components/Main';
import Login from 'components/Login';
import Map from 'components/Map';
import Profile from 'components/Profile';
import SignUp from 'components/SignUp';
import SignUpComplete from 'components/SignUpComplete';
import Loading from 'components/Loading';
import Friends from 'components/Friends';
import DebugZone from 'components/DebugZone';
import { Routes } from 'types';
import { appStoreContext } from 'stores';
import { handleAuthChange } from 'firebaseContext';
import { isDevelopment } from '../util';

function App() {
  const appStore = useContext(appStoreContext);
  const history = useHistory();

  useEffect(() => handleAuthChange(history), [history]);

  const appContent = appStore.loading ? (
    <Loading />
  ) : (
    <div className="App bg-main" data-testid="App">
      {appStore.firebaseUser && appStore.profile ? (
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
      {appContent}
    </>
  );
}

export default observer(App);
