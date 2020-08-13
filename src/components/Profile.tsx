import React, { useState, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { appStoreContext } from 'stores'
import firebaseContext from 'firebaseContext'
import { setProfile } from 'db/profiles'
import { NavLink } from 'react-router-dom'
import Field from 'components/Field'
import Modal from 'components/Modal'
import ProgressBar from 'components/ProgressBar'
import Routes from 'types/Routes'
import './Profile.scss'

const Profile = () => {
  const appStore = useContext(appStoreContext)
  const firebase = useContext(firebaseContext)
  const { firebaseUser, profile } = appStore
  const [modalActive, updateModalActive] = useState(false)
  const [uploadProgress, updateUploadProgress] = useState(0)

  function handleUpgradeAccount() {
    alert('Unimplemented')
    console.log('Docs for upgrading here: https://firebase.google.com/docs/auth/web/anonymous-auth#convert-an-anonymous-account-to-a-permanent-account')
  }
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0]
    try {
      if (!file) throw new Error('There was a problem getting your profile image.')

      const storageRef = firebase.storage().ref()
      const userProfileImgRef = storageRef.child(`profile/images/${appStore.firebaseUser?.uid}`)
      const uploadTask = userProfileImgRef.put(file)

      // https://firebase.google.com/docs/storage/web/upload-files#full_example
      uploadTask.on('state_changed', function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        updateUploadProgress(progress)
      }, function (error) {
        alert(error.message)
      }, function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          if (appStore.profile && appStore.firebaseUser) {
            appStore.profile.photoURL = downloadURL
            setProfile(appStore.firebaseUser.uid, appStore.profile)
            updateModalActive(false)
          }
        });
      });
    } catch (e) {
      alert(e.message)
    }
  }
  
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
        <input
          type="file"
          accept="image/*"
          name="profile-upload"
          id="profile-upload"
          onChange={handleImageUpload}
        />
        <ProgressBar progress={uploadProgress} />
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
      
    </div>
  ) : null
}

export default observer(Profile)