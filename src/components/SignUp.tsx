import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import firebaseContext from 'firebaseContext';
import API from 'api/axios';
import InputText from './InputText';
import Button from './Button';
import * as authApi from '../api/auth';
import './Login.scss';

const SignUp: React.FC = () => {
  const [email, updateEmail] = useState('');
  const [password, updatePassword] = useState('');
  const history = useHistory();
  const firebase = useContext(firebaseContext);

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await authApi.signUp(email, password);
      await firebase.auth().signInWithEmailAndPassword(email, password);
      const token = await firebase.auth().currentUser?.getIdToken();
      API.defaults.headers['Authorization'] = `Bearer ${token}`;
      history.push('/');
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="SignUp bg-fresh">
      <div className="container login__normal">
        <div className="row">
          <form onSubmit={handleSignUp}>
            <div className="form__inner">
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
