import './styles/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from 'components/App';
import { firebase } from 'firebaseContext'
import { appStore } from 'stores/appStoreContext'
import { getProfile, getFriendProfiles } from 'db/profiles'
import * as serviceWorker from './serviceWorker';

firebase.auth().onAuthStateChanged(async function (firebaseUser) {
  if (!firebaseUser) { 
    appStore.loading = false
    return
  }
  appStore.firebaseUser = firebaseUser

  const profile = await getProfile(firebaseUser.uid)
  const friendProfiles = await getFriendProfiles(['CqMfzAa07hb16H45UMG3tCxeJAg2', 'I3p7f3fAxoQchzUkdwoUYc3Knsq2'])

  if (!profile) {
    appStore.loading = false
    return
  }
  appStore.profile = profile
  // appStore.friendProfiles = friendProfiles
  appStore.loading = false
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
