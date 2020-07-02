import React, { useState } from 'react'
import { FirebaseContext } from '../firebase'

export default function Login() {
  const [email, updateEmail] = useState('')
  const [password, updatePassword] = useState('')
  return (
    <FirebaseContext.Consumer>
      {firebase => { 
        function login(email: string, password: string) {
          return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch(function (error) {
              console.error(error.code, error.message)
            })
        }
          
        return (
          <div className="Login">
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
