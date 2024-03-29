import './styles/main.scss';
import React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '@src/components/App';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

