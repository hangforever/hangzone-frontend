import './Profile.scss'
import React, { useState, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { appStoreContext } from 'stores'
import firebaseContext from 'firebaseContext'
import { IProfile } from 'types'
import Field from 'components/Field'
import { NavLink } from 'react-router-dom';
import Routes from '../types/Routes'

const Profile = () => {
  const appStore = useContext(appStoreContext)
  const firebase = useContext(firebaseContext)
  const user = appStore.user.get()
  const [profile, updateProfile] = useState<IProfile>({ ...appStore.profile })
  
  return (
    <div className="Profile">
      {user && user.email && (
        <div>
          <div><img src={user.photoURL || ''} alt="" style={{ width: '50px', height: '50px', borderRadius: '50%' }} /></div>
          <div>logged in as: {user.email}</div>
          <button
            onClick={() => {
              firebase.auth().signOut()
                .then(() => {
                  appStore.user.set(null)
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
          initialValue={profile.name}
          onSubmit={(value) => {
            appStore.updateProfile('name', value)
          }}
        />
      </div>
      <div>user id:{profile.id}</div>
      <div className="Profile__bio">
        <Field
          label="bio"
          initialValue={profile.bio}
          onSubmit={(value) => {
            appStore.updateProfile('bio', value)
          }}
        />
      </div>
      <div>profile photo:</div>
      <div className="Profile__photo-area">
        <img className="Profile__profile-photo" src={appStore.profile.photo} alt="user profile"/>
        <button onClick={() => {
          const newURL = prompt('', 'enter img url here')
          appStore.updateProfile('photo', newURL)
        }}>change photo</button>
      </div>
      <div>email: {profile.email}</div>
      <button><NavLink activeClassName='active' to={Routes.SignUp}>SignUp</NavLink></button>
    </div>
  )
}

export default observer(Profile)