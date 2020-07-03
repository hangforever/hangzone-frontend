import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from './Navigation';
import Main from './Main'
import Login from './Login'
import Map from './Map'
import Routes from '../types/Routes'

function App() {
  return (
    <div className="App">
      <Router>
        <div className="navigation">
          <Navigation />
        </div>

        <hr />

        <div className="body">
          <Route exact path={Routes.Main} component={Main} />
          <Route path={Routes.Login} component={Login} />
          <Route path={Routes.Map} component={Map}/>
        </div>
      </Router>
    </div>
  );
}

export default App;
