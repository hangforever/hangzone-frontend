import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { FirebaseContext } from '../firebase'

interface LoginProps {
  setUser: (user: firebase.User) => void
}

const Login: React.SFC<LoginProps> = ({ setUser }) => {
  const [email, updateEmail] = useState('')
  const [password, updatePassword] = useState('')
  const history = useHistory()
  return (
    <FirebaseContext.Consumer>
      {firebase => { 
        function signUp(email: string, password: string) {
          return firebase.signUp(email, password)
            .then(user => {
              if (user) setUser(user.user as firebase.User)
              history.push('/')
            })
            .catch(function (error) {
              console.error(error.code, error.message)
            })
        }

        function login(email: string, password: string) {
          return firebase
            .login(email, password)
            .then(user => {
              if (user) setUser(user.user as firebase.User)
              history.push('/')
            })
            .catch(function (error) {
              console.error(error.code, error.message)
            })
        }
          
        function loginGmail() {
          firebase
            .loginGmail()
            .then(user => {
              if (user) setUser(user.user as firebase.User)
              history.push('/')
            })
            .catch(function (error) {
              console.error(error.code, error.message)
            })
        }

        return (
          <div className="Login">
            <h1>Gmail</h1>
            <button onClick={loginGmail}>Gmail</button>
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

export default Login
