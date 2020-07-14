import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite'
import './App.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from 'components/Navigation';
import Main from 'components/Main'
import Login from 'components/Login'
import Map from 'components/Map'
import Settings from 'components/Settings'
import Profile from 'components/Profile'
import { Routes } from 'types'
import firebaseContext from 'firebaseContext'
import { appStoreContext } from 'stores'


function App() {
  const firebase = useContext(firebaseContext)
  const appStore = useContext(appStoreContext)
  const user = appStore.user.get()

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) appStore.user.set(user)
    });
  }, [appStore, firebase])

  return (
    <div className="App">
      {user && user.email && (
        <div>
          <div><img src={user.photoURL || ''} alt="" style={{ width: '50px', height: '50px', borderRadius: '50%' }} /></div>
          <div>logged in as: {user.email}</div>
        </div>
      )}
      <Router>
        
        <div className="body">
          <Route exact path={Routes.Main} component={Main} />
          <Route path={Routes.Login} component={Login} />
          <Route path={Routes.Map} component={Map} />
          <Route path={Routes.Settings} component={Settings} />
          <Route path={Routes.Profile} component={Profile} />
        </div>

        <Navigation />
      </Router>
    </div>
  );
}

export default observer(App);
