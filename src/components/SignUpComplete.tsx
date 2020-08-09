import React, { useState, useContext } from 'react'
import { useLocation, useHistory } from 'react-router'
import firebaseContext from 'firebaseContext'
import { createProfile } from 'db/profiles'
import { Routes } from 'types'

const SignUpComplete: React.SFC<{}> = () => {
  const firebase = useContext(firebaseContext)
  const [displayName, updateDisplayName] = useState('')
  const location = useLocation()
  const history = useHistory()

  async function handleComplete(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const urlParams = new URLSearchParams(location.search)
    const uid = urlParams.get('uid')
    try {
      if (!uid) throw new Error('Params not set correctly. Please login again.')
      const profile = createProfile(displayName)
      await firebase.firestore().collection('profiles').doc(uid).set(profile)
      history.push(Routes.Profile)
    } catch(e) {
      alert(e.message)
      history.push(Routes.SignUp)
    }
  }

  return (
    <div className="SignUpComplete Login">
      <div className="row">
        <form onSubmit={handleComplete} className="form__anon">
          <div className="form__inner">
            <span>enter a name you would like others to see:</span>
            <input
              type="text"
              name="anon_username"
              placeholder="Username"
              value={displayName}
              onChange={e => updateDisplayName(e.target.value)}
            />
          </div>
          <input
            className="btn--no-border"
            type="submit"
            value="CONTINUE >>"
            disabled={!displayName}
          />
        </form>
      </div>
    </div>
  )
}

export default SignUpComplete
