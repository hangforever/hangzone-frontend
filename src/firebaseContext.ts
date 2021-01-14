import { createContext } from 'react';
import firebase from 'firebase/app';
import { appStore } from 'stores/appStoreContext';
import * as profileApi from 'api/profiles';
import API from 'api/axios';
import { History } from 'history';
import { Routes } from 'types';

// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// TODO: add potentially multiple configs for addition of STG/PRD servers
let firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  appId: process.env.REACT_APP_APP_ID,
};

firebase.initializeApp(firebaseConfig);
if (process.env.NODE_ENV === 'development') {
  // TODO: Use auth emulator when firebase fixes auth
  firebase.auth().useEmulator('http://localhost:9099/');
}

function handleSignOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      appStore.firebaseUser = null;
      appStore.profile = null;
      appStore.signedIn = false;
    })
    .catch(() => alert('whoops'));
}

/**
 * This function handles auth change for Firebase Auth
 * Mainly, it's responsible for settings the firebaseUser and profile state
 */
function handleAuthChange(history: History): void {
  async function checkFirebaseUser(firebaseUser: firebase.User | null) {
    if (!firebaseUser) {
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
      appStore.loading = false;
      return;
    }
    try {
      await checkFirebaseUser(firebaseUser);
      await checkProfile();
      appStore.signedIn = true;
    } catch (e) {
      console.error(e);
    }

    appStore.loading = false;
  });
}

const gAuthProvider = new firebase.auth.GoogleAuthProvider();
gAuthProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');

export { firebase, handleSignOut, handleAuthChange };

export default createContext(firebase);
