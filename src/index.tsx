import './styles/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from 'components/App';
import { firebase } from 'firebaseContext'
import { appStore } from 'stores/appStoreContext'
import { IProfile } from 'types'
import * as serviceWorker from './serviceWorker';

firebase.auth().onAuthStateChanged(async function (firebaseUser) {
  if (!firebaseUser) { 
    appStore.loading = false
    return
  }
  appStore.firebaseUser = firebaseUser

  const profile = await firebase.firestore()
    .collection('profiles')
    .doc(firebaseUser.uid)
    .get()
    .then(doc => doc.data()) as IProfile | null

  if (!profile) {
    appStore.loading = false
    return
  }
  appStore.profile = profile
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
