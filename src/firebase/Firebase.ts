import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage"

// TODO: add potentially multiple configs for addition of STG/PRD servers
var firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  appId: process.env.REACT_APP_APP_ID,
};

type SetUserFn = (user: firebase.User) => void

export default class Firebase {
  public auth: firebase.auth.Auth
  public gAuthProvider: firebase.auth.GoogleAuthProvider
  private setUser: SetUserFn

  constructor() {
    firebase.initializeApp(firebaseConfig)
    
    this.auth = firebase.auth()
    this.gAuthProvider = new firebase.auth.GoogleAuthProvider();
    this.setUser = () => {}
    
    this.gAuthProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  }

  setSetUserFn = (setUser: SetUserFn) => {
    this.setUser = setUser
    this.auth.onAuthStateChanged(function (user) {
      if (user) {
        console.log('user', user)
        setUser(user)
      } else {
        // No user is signed in.
        console.log('No user signed in')
      }
    });
  }

  signUp = (email: string, password: string) => {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        if (user) this.setUser(user.user as firebase.User)
      })
      .catch(function (error) {
        console.error(error.code, error.message)
      })
  }

  login = (email: string, password: string) => {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        if (user) this.setUser(user.user as firebase.User)
      })
      .catch(function (error) {
        console.error(error.code, error.message)
      })
  }

  loginGmail = () => {
    return this.auth
      .signInWithPopup(this.gAuthProvider)
      .then(user => {
        if (user) this.setUser(user.user as firebase.User)
      })
      .catch(function (error) {
        console.error(error.code, error.message)
      })
  }
}
