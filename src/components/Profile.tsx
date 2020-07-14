import './Profile.scss'
import React, { useState, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { appStoreContext } from 'stores'
import firebaseContext from 'firebaseContext'
import { IProfile } from 'types'
import Field from 'components/Field'

const Profile = () => {
  const appStore = useContext(appStoreContext)
  const firebase = useContext(firebaseContext)
  const user = appStore.user.get()
  const [profile, updateProfile] = useState<IProfile>({ ...appStore.profile })
  
  return (
    <div>
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
      <Field
        label="user name"
        initialValue={profile.name}
        onSubmit={(value) => {
          appStore.updateProfile('name', value)
        }}
      />
      <div>user name: {appStore.profile.name}</div>
      <div>user name: {profile.name}</div>
      <div>user id:{profile.id}</div>
      <div>user bio:{profile.bio}</div>
      <input type="text"/>
      <div>profile photo</div>
      <button>add photo</button>
      <div><img src="" alt="photo here"/></div>
      <div>email: {profile.email}</div>
      <button>change password</button>
    </div>
  )
}

export default observer(Profile)