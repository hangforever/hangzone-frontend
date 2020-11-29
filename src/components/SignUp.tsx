import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import firebaseContext from 'firebaseContext';
import API from 'api/axios';
import './Login.scss';

const SignUp: React.FC = () => {
  const [email, updateEmail] = useState('');
  const [password, updatePassword] = useState('');
  const history = useHistory();
  const firebase = useContext(firebaseContext);

  function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        const token = await userCredential.user?.getIdToken();
        API.defaults.headers['Authorization'] = `Bearer ${token}`;
        history.push('/');
      })
      .catch(function (error) {
        console.error(error.code, error.message);
      });
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
