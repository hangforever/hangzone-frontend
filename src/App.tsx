import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import Main from './components/Main'
import Login from './components/Login'
import Routes from './types/Routes'

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
        </div>
      </Router>
    </div>
  );
}

export default App;
