import React, { useEffect, useState, useContext } from 'react';
import API from '@src/api/axios';
import InputText from './InputText';
import Button from './Button';
import * as authApi from '../api/auth';
import './Login.scss';

const SignUp: React.FC = () => {
  const [error, setError] = useState('');
  const [email, updateEmail] = useState('');
  const [password, updatePassword] = useState('');

  useEffect(() => {
    if (email && password) {
      setError('');
    }
  }, [email, password]);

  function handleError(e: Error): void {
    setError(e.message);
    console.error(e);
  }

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await authApi.signUp(email, password);
  }

  return (
    <div className="SignUp bg-fresh">
      <div className="container login__normal">
        <div className="row">
          <form onSubmit={handleSignUp}>
            <div className="form__inner">
              {error && <div className="form-group has-error">{error}</div>}
              <div className="form-group">
                <InputText
                  type="text"
                  name="email"
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
            <div className="form-group">
              <Button>Create Account</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
