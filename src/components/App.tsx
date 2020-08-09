import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite'
import './App.scss';
import { Route, useHistory } from 'react-router-dom';
import Navigation from 'components/Navigation';
import Main from 'components/Main'
import Login from 'components/Login'
import Map from 'components/Map'
import Settings from 'components/Settings'
import Profile from 'components/Profile'
import SignUp from 'components/SignUp'
import { Routes, IProfile } from 'types'
import firebaseContext from 'firebaseContext'
import { appStoreContext } from 'stores'

function App() {
  const firebase = useContext(firebaseContext)
  const appStore = useContext(appStoreContext)
  const history = useHistory()
  const user = appStore.user && appStore.user

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async function (firebaseUser) {
      if (firebaseUser && firebaseUser.uid) {
        const profile = await firebase.firestore()
          .collection('profiles')
          .doc(firebaseUser.uid)
          .get()
          .then(doc => doc.data())
        // @ts-ignore
        appStore.user = { firebaseUser, profile }
      } else {
        history.push(Routes.Login)
      }
    });
  }, [appStore.user, firebase, history, user])

  return (
    <div className="App">
      {user ? (
        <>
          <div className="body">
            <Route exact path={Routes.Main} component={Main} />
            <Route path={Routes.Map} component={Map} />
            <Route path={Routes.Settings} component={Settings} />
            <Route path={Routes.Profile} component={Profile} />
          </div>

          <Navigation />
        </>
      ) : (
        <>
          <Route path={Routes.Login} component={Login} />
          <Route path={Routes.SignUp} component={SignUp} />
        </>
      )}
    </div>
  );
}

export default observer(App);
