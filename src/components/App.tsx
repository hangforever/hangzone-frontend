import React, { useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from 'components/Navigation';
import Main from 'components/Main'
import Login from 'components/Login'
import Map from 'components/Map'
import { Routes } from 'types'

function App() {
  const [user, setUser] = useState({} as firebase.User)

  return (
    <div className="App">
      {user.email && (
        <div>
          <div><img src={user.photoURL || ''} alt="" style={{ width: '50px', height: '50px', borderRadius: '50%' }} /></div>
          <div>logged in as: {user.email}</div>
        </div>
      )}
      <Router>
        <div className="navigation">
          <Navigation />
        </div>

        <hr />

        <div className="body">
          <Route exact path={Routes.Main} component={Main} />
          <Route path={Routes.Login} component={() => <Login setUser={setUser} />} />
          <Route path={Routes.Map} component={Map} />
        </div>
      </Router>
    </div>
  );
}

export default App;
