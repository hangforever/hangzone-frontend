import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router'
import firebaseContext from 'firebaseContext'
import { Routes } from 'types'
import './Login.scss'

const Login: React.SFC = () => {
  const [email, updateEmail] = useState('')
  const [password, updatePassword] = useState('')
  const history = useHistory()
  const firebase = useContext(firebaseContext)

  function handleGmailLogin() {
    const gAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
      .signInWithPopup(gAuthProvider).then(() => history.push('/'))
      .catch(function (error) {
        console.error(error.code, error.message)
      })
  }

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => history.push('/'))
      .catch(function (error) {
        console.error(error.code, error.message)
      })
  }
  
  return (
    <div className="Login">
      <div>
        <form
          onSubmit={handleLogin}
        >
          <div className="form__inner">
            <input type="text" name="email" value={email} onChange={e => updateEmail(e.target.value)} />
            <input type="password" name="password" value={password} onChange={e => updatePassword(e.target.value)} />
          </div>
          <input className="btn--no-border" type="submit" value="LOG IN >>" />
          <button
            className="btn--no-border"
            onClick={() => history.push(Routes.SignUp)}
          >
            Create Account >>
          </button>
          <button
            className="btn--no-border"
            onClick={handleGmailLogin}
          >
            Gmail >>
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
