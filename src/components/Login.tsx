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
        firebase.setSetUserFn(setUser)
        return (
          <div className="Login">
            <h1>Gmail</h1>
            <button
              onClick={() => firebase.loginGmail().then(() => history.push('/'))}
            >
              Gmail
            </button>
            <h1>Sign up</h1>
            <form
              onSubmit={e => {
                e.preventDefault()
                firebase.signUp(email, password).then(() => history.push('/'))
              }}
            >
              <input type="text" name="email" value={email} onChange={e => updateEmail(e.target.value)} />
              <input type="password" name="password" value={password} onChange={e => updatePassword(e.target.value)} />
              <input type="submit" value="Submit" />
            </form>
            <h1>Login</h1>
            <form
              onSubmit={e => {
                e.preventDefault()
                firebase.login(email, password).then(() => history.push('/'))
              }}
            >
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
