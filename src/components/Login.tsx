import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router'
import firebaseContext from 'firebaseContext'
import { appStoreContext } from 'stores'

const Login: React.SFC = () => {
  const [email, updateEmail] = useState('')
  const [password, updatePassword] = useState('')
  const history = useHistory()
  const firebase = useContext(firebaseContext)
  const appStore = useContext(appStoreContext)
  
  return (
    <div className="Login">
      <h1>Gmail</h1>
      <button
        onClick={() => {
          const gAuthProvider = new firebase.auth.GoogleAuthProvider();
          firebase.auth()
            .signInWithPopup(gAuthProvider).then(() => history.push('/')).catch(function (error) {
            console.error(error.code, error.message)
          })
        }}
      >
        Gmail
      </button>
      <h1>Sign up</h1>
      <form
        onSubmit={e => {
          e.preventDefault()
          
          firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => history.push('/'))
            .catch(function (error) {
              console.error(error.code, error.message)
            })
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
          firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => history.push('/'))
            .catch(function (error) {
              console.error(error.code, error.message)
            })
        }}
      >
        <input type="text" name="email" value={email} onChange={e => updateEmail(e.target.value)} />
        <input type="password" name="password" value={password} onChange={e => updatePassword(e.target.value)} />
        <input type="submit" value="Submit" />
      </form>
      <button onClick={() => {
        firebase.auth().signOut()
          .then(() => {
            appStore.user.set(null)
          })
          .catch(() => alert('whoops'))
        
      }}>Sign Out</button>
    </div>
  )
}

export default Login
