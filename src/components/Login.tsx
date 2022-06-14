import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Routes } from '@src/types';
import { useAuth0 } from '@auth0/auth0-react';
import Button from './Button';
import InputText from './InputText';
import './Login.scss';

const Login: React.FC = () => {
  const { loginWithRedirect } = useAuth0();
  const [error, setError] = useState('');
  const [email, updateEmail] = useState('');
  const [password, updatePassword] = useState('');
  const [anonUsername, updateAnonUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (email && password) {
      setError('');
    }
  }, [email, password]);

  function handleError(): void {
  }

  function transferUser() {
    navigate(Routes.Profile);
  }

  function handleGmailLogin() {
    console.log('TODO: login gmail');
  }

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    console.log('TODO: login');
  }

  function handleAnonLogin(e: React.FormEvent<HTMLFormElement>) {
    console.log('TODO: login anon');
  }

  return (
    <div className="Login bg-fresh">
      <div className="container login__normal">
        <div className="row">
          <form onSubmit={handleLogin}>
            <div className="form__inner">
              {error && <div className="form-group has-error">{error}</div>}
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
            </div>
            <div className="form-group">
              <Button>Log In</Button>
            </div>
            <div className="form-group">
              <Button
                shadowColor="red"
                onClick={() => navigate(Routes.SignUp)}
              >
                Sign Up Instead
              </Button>
              <Button
                shadowColor="red"
                onClick={() => loginWithRedirect()}
              >
                Login with Auth0
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
