import './Profile.scss'
import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { appStoreContext } from 'stores'
import firebaseContext from 'firebaseContext'
import Field from 'components/Field'
import { NavLink } from 'react-router-dom'
import { setProfile } from 'db/profiles'
import Routes from '../types/Routes'

const Profile = () => {
  const appStore = useContext(appStoreContext)
  const firebase = useContext(firebaseContext)

  function handleUpgradeAccount() {
    alert('Unimplemented')
    console.log('Docs for upgrading here: https://firebase.google.com/docs/auth/web/anonymous-auth#convert-an-anonymous-account-to-a-permanent-account')
  }
  function handleSignOut() {
    firebase.auth().signOut()
      .then(() => {
        appStore.firebaseUser = null
        appStore.profile = null
      })
      .catch(() => alert('whoops'))
  }

  const { firebaseUser, profile } = appStore
  
  return firebaseUser && profile ? (
    <div className="Profile">
      <div>
        {firebaseUser.isAnonymous ? (
          <div>
            Anonomous User <br />
            {/* TODO: Decide how to handle upgrading */}
            <button onClick={handleUpgradeAccount}>Upgrade Account</button>
            <button>
              <NavLink activeClassName='active' to={Routes.SignUp}>SignUp</NavLink>
            </button>
          </div>
        ) : (
            <Field
              label="email"
              initialValue={firebaseUser.email || ''}
              disabled
            />
          )}
      </div>
      <div className="Profile__user-name">
        <Field
          label="user name"
          initialValue={profile.displayName}
          onSubmit={(value) => {
            profile.displayName = value
            setProfile(firebaseUser.uid, profile)
          }}
        />
      </div>
      <div className="Profile__bio">
        <Field
          label="bio"
          initialValue={profile.bio || ''}
          onSubmit={(value) => {
            profile.bio = value
            setProfile(firebaseUser.uid, profile)
          }}
        />
      </div>
      <div className="Field">
        <label htmlFor="profile photo">profile photo</label>
        <div className="Profile__photo-area">
          <img className="Profile__profile-photo" src={appStore.profilePhoto} alt="user profile" />
          <button
            onClick={() => {
              // TODO: add functionality for uploads from hard disk 
              const newURL = prompt('', 'enter img url here')
              profile.photoURL = newURL || ''
              setProfile(firebaseUser.uid, profile)
            }}
          >
            change photo
          </button>
        </div>
      </div>
      <button className="button button-primary" onClick={handleSignOut}>Sign Out</button>
    </div>
  ) : null
}

export default observer(Profile)