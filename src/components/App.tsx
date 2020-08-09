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
import SignUpComplete from 'components/SignUpComplete'
import Loading from 'components/Loading'
import { Routes } from 'types'
import firebaseContext from 'firebaseContext'
import { appStoreContext } from 'stores'

function App() {
  const appStore = useContext(appStoreContext)
  const history = useHistory()

  useEffect(() => { 
    const { profile, firebaseUser } = appStore
    if (!firebaseUser) return history.push(Routes.Login)
    if (!profile) return history.push(Routes.SignUpComplete + `?uid=${firebaseUser.uid}`)
    history.push(Routes.Main)
  }, [appStore, history, appStore.profile, appStore.firebaseUser])

  return appStore.loading
    ? (<Loading />)
    : (
      <div className="App">
        {appStore.firebaseUser && appStore.profile ? (
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
            <Route exact path={Routes.SignUp} component={SignUp} />
            <Route path={Routes.SignUpComplete} component={SignUpComplete} />
          </>
        )}
      </div>
    );
}

export default observer(App);
