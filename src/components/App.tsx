import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import './App.scss';
import { Route, useHistory } from 'react-router-dom';
import { History } from 'history';
import Navigation from 'components/Navigation';
import Main from 'components/Main';
import Login from 'components/Login';
import MapPage from 'components/MapPage';
import Settings from 'components/Settings';
import Profile from 'components/Profile';
import SignUp from 'components/SignUp';
import SignUpComplete from 'components/SignUpComplete';
import Loading from 'components/Loading';
import Friends from 'components/Friends';
import DebugZone from 'components/DebugZone';
import { Routes } from 'types';
import { appStoreContext } from 'stores';
import { isDevelopment } from '../util';
import { firebase } from 'firebaseContext';
import { appStore } from 'stores/appStoreContext';
import * as profileApi from 'api/profiles';
import API from 'api/axios';

function handleAuthChange(history: History) {
  async function checkFirebaseUser(firebaseUser: firebase.User | null) {
    if (!firebaseUser) {
      appStore.loading = false;
      history.push(Routes.Login);
      throw new Error('No firebase user');
    }
    const token = await firebaseUser.getIdToken();
    API.defaults.headers['Authorization'] = `Bearer ${token}`;
    appStore.firebaseUser = firebaseUser;
  }

  async function checkProfile() {
    const profile = await profileApi.get();
    if (!profile) {
      appStore.loading = false;
      history.push(Routes.SignUpComplete);
      throw new Error('No profile');
    }
    const friendProfiles = await profileApi.getFriends();
    appStore.friendProfiles = friendProfiles;
    appStore.profile = profile;
  }

  firebase.auth().onAuthStateChanged(async function (firebaseUser) {
    if (process.env.REACT_APP_DEBUG_MODE === 'true') {
      history.push(Routes.DebugZone);
      return;
    }
    try {
      await checkFirebaseUser(firebaseUser);
      await checkProfile();
    } catch (e) {
      console.error(e);
    }

    appStore.loading = false;
    appStore.signedIn = true;
  });
}

function App() {
  const appStore = useContext(appStoreContext);
  const history = useHistory();

  useEffect(() => handleAuthChange(history), []);

  const appContent = appStore.loading ? (
    <Loading />
  ) : (
    <div className="App bg-main" data-testid="App">
      {appStore.firebaseUser && appStore.profile ? (
        <>
          <div className="body">
            <Route exact path={Routes.Main} component={Main} />
            <Route path={Routes.Map} component={MapPage} />
            <Route path={Routes.Settings} component={Settings} />
            <Route path={Routes.Profile} component={Profile} />
            <Route path={Routes.Friends} component={Friends} />
          </div>

          <Navigation />
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
