import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';

import Navigation from './components/Navigation';

function App() {
  return (
    <div className="App">
      <div className="app-body">
        <Router>
          <Navigation />
        </Router>
      </div>
    </div>
  );
}

export default App;
