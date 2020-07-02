import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { FirebaseContext } from '../firebase'

export default function Login() {
  const [email, updateEmail] = useState('')
  const [password, updatePassword] = useState('')
  const history = useHistory()
  return (
    <FirebaseContext.Consumer>
      {firebase => { 
        function signUp(email: string, password: string) {
          return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(user => {
              console.log('Successfully created user!', user)
              history.push('/')
            })
            .catch(function (error) {
              console.error(error.code, error.message)
            })
        }

        function login(email: string, password: string) {
          return firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(user => {
              console.log('Successfully logged in!', user)
              history.push('/')
            })
            .catch(function (error) {
              console.error(error.code, error.message)
            })
        }
          
        return (
          <div className="Login">
            <h1>Sign up</h1>
            <form onSubmit={e => {
              e.preventDefault()
              signUp(email, password)
            }}>
              <input type="text" name="email" value={email} onChange={e => updateEmail(e.target.value)} />
              <input type="password" name="password" value={password} onChange={e => updatePassword(e.target.value)} />
              <input type="submit" value="Submit" />
            </form>
            <h1>Login</h1>
            <form onSubmit={e => {
              e.preventDefault()
              login(email, password)
            }}>
              <input type="text" name="email" value={email} onChange={e => updateEmail(e.target.value)} />
              <input type="password" name="password" value={password} onChange={e => updatePassword(e.target.value)} />
              <input type="submit" value="Submit" />
            </form>
          </div>
        )
      }}
    </FirebaseContext.Consumer>
  )
}
