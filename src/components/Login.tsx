import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import firebaseContext from 'firebaseContext';
import { Routes } from 'types';
import * as profileApi from 'api/profiles';
import Button from './Button';
import InputText from './InputText';
import './Login.scss';

const Login: React.FC = () => {
  const [error, setError] = useState('');
  const [email, updateEmail] = useState('');
  const [password, updatePassword] = useState('');
  const [anonUsername, updateAnonUsername] = useState('');
  const history = useHistory();
  const firebase = useContext(firebaseContext);

  useEffect(() => {
    if (email && password) {
      setError('');
    }
  }, [email, password]);

  function handleError(e: firebase.default.auth.AuthError): void {
    setError(e.message);
    console.error(e);
  }

  function handleGmailLogin() {
    const gAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(gAuthProvider)
      .then(() => history.push('/'))
      .catch(handleError);
  }

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => history.push('/'))
      .catch(handleError);
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
      .catch(handleError);
  }

  return (
    <div className="Login bg-fresh">
      <div className="container login__normal">
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
              {/* TODO: Setup forgot password */}
              <Link to="/login">Forgot password?</Link>
              {error && <div className="form-group has-error">{error}</div>}
            </div>
            <div className="form-group">
              <Button>Log In</Button>
            </div>
            <div className="form-group">
              <Button
                shadowColor="red"
                onClick={() => history.push(Routes.SignUp)}
              >
                Sign Up Instead
              </Button>
            </div>
            <div className="form-group">
              <Button shadowColor="white" onClick={handleGmailLogin}>
                Gmail Login
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="container login__anonomous">
        <div className="row">
          <form onSubmit={handleAnonLogin} className="form__anon">
            <div className="form__inner">
              <p className="pull-left mb-0">
                Continue without logging in using this name:
              </p>
              <InputText
                name="anon_username"
                placeholder="Username"
                value={anonUsername}
                onChange={(e) => updateAnonUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <Button disabled={!anonUsername}>Continue</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
