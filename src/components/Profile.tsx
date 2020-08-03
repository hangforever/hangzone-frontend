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
  
  return (
    <div className="Profile">
      {user && (
        <div>
          <div><img src={user.photoURL || ''} alt="" style={{ width: '50px', height: '50px', borderRadius: '50%' }} /></div>
          <div>
            {user.isAnonymous ? (
              <div>
                Anonomous User <br />
                <button onClick={handleUpgradeAccount}>Upgrade Account</button>
              </div>
            ) : (
              <div>Email: {user.email}</div>
            )}
          </div>
          <button
            onClick={() => {
              firebase.auth().signOut()
                .then(() => {
                  appStore.user = null
                })
                .catch(() => alert('whoops'))
            }}
          >
            Sign Out
      </button>
        </div>
      )}
      <div className="Profile__user-name">
        <Field
          label="user name"
          initialValue={appStore.profile.name}
          onSubmit={(value) => appStore.profile.name = value }
        />
      </div>
      <div>user id:{appStore.profile.id}</div>
      <div className="Profile__bio">
        <Field
          label="bio"
          initialValue={appStore.profile.bio}
          onSubmit={(value) => appStore.profile.bio = value}
        />
      </div>
      <div>profile photo:</div>
      <div className="Profile__photo-area">
        <img className="Profile__profile-photo" src={appStore.profile.photo} alt="user profile"/>
        <button onClick={() => {
          // TODO: add functionality for uploads from hard disk 
          const newURL = prompt('', 'enter img url here')
          appStore.profile.photo = newURL || ''
        }}>change photo</button>
      </div>
      <div>email: {appStore.profile.email}</div>
      {appStore.profile.anonymous === true ? (
      <button>
        <NavLink activeClassName='active' to={Routes.SignUp}>SignUp</NavLink>
      </button>
      ): null}
    </div>
  )
}

export default observer(Profile)