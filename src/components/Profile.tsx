import './Profile.scss'
import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { appStoreContext } from 'stores'
import firebaseContext from 'firebaseContext'
import Field from 'components/Field'
import { NavLink } from 'react-router-dom';
import Routes from '../types/Routes'

const Profile = () => {
  const appStore = useContext(appStoreContext)
  const firebase = useContext(firebaseContext)
  const user = appStore.user

  function handleUpgradeAccount() {
    alert('Unimplemented')
    console.log('Docs for upgrading here: https://firebase.google.com/docs/auth/web/anonymous-auth#convert-an-anonymous-account-to-a-permanent-account')
  }
  function handleSignOut() {
    firebase.auth().signOut()
      .then(() => {
        appStore.user = null
      })
      .catch(() => alert('whoops'))
  }
  
  return user ? (
    <div className="Profile">
      <div>
        {user.firebaseUser.isAnonymous ? (
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
              initialValue={user.firebaseUser.email || ''}
              disabled
            />
          )}
      </div>
      <div className="Profile__user-name">
        <Field
          label="user name"
          initialValue={user.profile.displayName}
          onSubmit={(value) => user.profile.displayName = value}
        />
      </div>
      <div className="Profile__bio">
        <Field
          label="bio"
          initialValue={user.profile.bio || ''}
          onSubmit={(value) => user.profile.bio = value}
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
              user.profile.photoURL = newURL || ''
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