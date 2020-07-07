import React, { useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from './Navigation';
import Main from './Main'
import Login from './Login'
import Map from './Map'
import Routes from '../types/Routes'

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
