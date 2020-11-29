import './styles/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from 'components/App';
import { firebase } from 'firebaseContext';
import { appStore } from 'stores/appStoreContext';
import * as profileApi from 'api/profiles';
import API from 'api/axios';
import * as serviceWorker from './serviceWorker';

firebase.auth().onAuthStateChanged(async function (firebaseUser) {
  if (!firebaseUser) {
    appStore.loading = false;
    return;
  }
  appStore.firebaseUser = firebaseUser;
  const token = await firebaseUser.getIdToken();
  API.defaults.headers['Authorization'] = `Bearer ${token}`;

  const profile = await profileApi.get();
  if (!profile) {
    appStore.loading = false;
    return;
  }

  const friendProfiles = await profileApi.getFriends();
  appStore.friendProfiles = friendProfiles;
  appStore.profile = profile;
  appStore.loading = false;
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
