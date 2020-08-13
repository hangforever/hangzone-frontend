import React, { useState, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { appStoreContext } from 'stores'
import firebaseContext from 'firebaseContext'
import { setProfile } from 'db/profiles'
import { NavLink } from 'react-router-dom'
import Field from 'components/Field'
import Modal from 'components/Modal'
import Routes from 'types/Routes'
import './Profile.scss'

const Profile = () => {
  const appStore = useContext(appStoreContext)
  const firebase = useContext(firebaseContext)
  const [modalActive, updateModalActive] = useState(false)

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
      <Modal
        active={modalActive}
        onCloseClick={() => updateModalActive(false)}
      >
        <Field
          label="Enter a url"
          initialActive
          onSubmit={(newURL) => {
            profile.photoURL = newURL
            setProfile(firebaseUser.uid, profile)
            updateModalActive(false)
          }}
        />
        <div>Or upload a file</div>
        <input type="file" name="" id=""/>
      </Modal>
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
          <button onClick={() => updateModalActive(true)}>
            change photo
          </button>
        </div>
      </div>
      <button className="button button-primary" onClick={handleSignOut}>Sign Out</button>
    </div>
  ) : null
}

export default observer(Profile)