import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import firebaseContext from 'firebaseContext';
import { Routes } from 'types';
import * as profileApi from 'api/profiles';
import InputText from './InputText';
import './Login.scss';

const Login: React.FC = () => {
  const [email, updateEmail] = useState('');
  const [password, updatePassword] = useState('');
  const [anonUsername, updateAnonUsername] = useState('');
  const history = useHistory();
  const firebase = useContext(firebaseContext);

  function handleGmailLogin() {
    const gAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(gAuthProvider)
      .then(() => history.push('/'))
      .catch(function (error) {
        console.error(error.code, error.message);
      });
  }

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => history.push('/'))
      .catch(function (error) {
        console.error(error.code, error.message);
      });
  }

  function handleAnonLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    firebase
      .auth()
      .signInAnonymously()
      .then(({ user }) => {
        if (user) {
          return profileApi.create({ displayName: anonUsername });
        } else {
          throw new Error('Anonymous Login failed!');
        }
      })
      .then(() => history.push('/'))
      .catch(function (error) {
        console.error(error.code, error.message);
      });
  }

  return (
    <div className="Login">
      <div>
        <div className="container">
          <div className="row">
            <form onSubmit={handleLogin}>
              <div className="form__inner">
                <div className="form-group">
                  <InputText
                    name="email"
                    placeholder="hanger@zone.com"
                    value={email}
                    onChange={(e) => updateEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <InputText
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => updatePassword(e.target.value)}
                  />
                </div>
              </div>
              <input
                className="btn--no-border"
                type="submit"
                value="LOG IN >>"
              />
              <button
                className="btn--no-border"
                onClick={() => history.push(Routes.SignUp)}
              >
                Create Account {'>>'}
              </button>
              <button className="btn--no-border" onClick={handleGmailLogin}>
                Gmail {'>>'}
              </button>
            </form>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <form onSubmit={handleAnonLogin} className="form__anon">
              <div className="form__inner">
                <span>continue without logging in using this name:</span>
                <InputText
                  name="anon_username"
                  placeholder="Username"
                  value={anonUsername}
                  onChange={(e) => updateAnonUsername(e.target.value)}
                />
              </div>
              <input
                className="btn--no-border"
                type="submit"
                value="CONTINUE >>"
                disabled={!anonUsername}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
