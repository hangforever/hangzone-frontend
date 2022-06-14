import './styles/main.scss';
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '@src/components/App';
import { Auth0Provider } from '@auth0/auth0-react';

const container = document.getElementById('root') as HTMLDivElement;
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
      <Auth0Provider
        domain="dev-544ohv26.us.auth0.com"
        clientId="dM0h47bJkqv6p3gCVmFhnm7IMVQzB900"
        redirectUri={window.location.origin}
      >
    <Router>
        <App />
    </Router>
      </Auth0Provider>
  </React.StrictMode>
);

