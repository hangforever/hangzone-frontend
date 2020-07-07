import './styles/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import AppStore from './stores/AppStore'
import { AppStoreContext } from './stores'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <AppStoreContext.Provider value={new AppStore()}>
      <App />
    </AppStoreContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
