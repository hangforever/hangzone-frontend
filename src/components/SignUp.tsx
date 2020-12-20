import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import firebaseContext from 'firebaseContext';
import API from 'api/axios';
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
    <div className="Login">
      <form onSubmit={handleSignUp}>
        <div className="form__inner">
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => updateEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => updatePassword(e.target.value)}
          />
        </div>
        <input
          className="btn--no-border"
          type="submit"
          value="Create Account >>"
        />
      </form>
    </div>
  );
};

export default SignUp;
