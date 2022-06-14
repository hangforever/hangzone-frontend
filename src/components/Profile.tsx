import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Field from '@src/components/Field';
import Modal from '@src/components/Modal';
import ProgressBar from '@src/components/ProgressBar';
import Routes from '@src/types/Routes';
import { ISettings } from '@src/types';
import { useAuth0 } from '@auth0/auth0-react';
import './Profile.scss';

const Profile = () => {
  const [modalActive, updateModalActive] = useState(false);
  const [uploadProgress, updateUploadProgress] = useState(0);
  const { logout } = useAuth0();

  function updateSetting(e: React.ChangeEvent<HTMLInputElement>) {
    console.log('updateSetting');
  }
  function handleUpgradeAccount() {
    alert('Unimplemented');
    console.log(
      'Docs for upgrading here: https://firebase.google.com/docs/auth/web/anonymous-auth#convert-an-anonymous-account-to-a-permanent-account'
    );
  }
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    console.log('handleImageUpload');
  }

  return true ? (
    <div className="Profile">
      <button className="button button-primary" onClick={() => logout({ returnTo: window.location.origin })}>
        Sign Out
      </button>
      <Modal active={modalActive} onCloseClick={() => updateModalActive(false)}>
        <Field
          label="Enter a url"
          initialActive
          onSubmit={(newURL) => {
            // TODO: profile url
            updateModalActive(false);
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
        {true ? (
          <div>
            Anonomous User <br />
            {/* TODO: Decide how to handle upgrading */}
            <button onClick={handleUpgradeAccount}>Upgrade Account</button>
            <button>
              <NavLink to={Routes.SignUp}>
                SignUp
              </NavLink>
            </button>
          </div>
        ) : (
          <Field
            label="email"
            initialValue={''}
            disabled
          />
        )}
      </div>
      <div className="Profile__user-name">
        <Field
          label="user name"
          initialValue={''}
          onSubmit={(value) => {
            // TODO: profile display name
          }}
        />
      </div>
      <div className="Profile__bio">
        <Field
          label="bio"
          initialValue={''}
          onSubmit={(value) => {
            // TODO: bio
          }}
        />
      </div>
      <div className="Field">
        <label htmlFor="profile photo">profile photo</label>
        <div className="Profile__photo-area">
          <img
            className="Profile__profile-photo"
            src={''}
            alt="user profile"
          />
          <button onClick={() => updateModalActive(true)}>change photo</button>
        </div>
      </div>
      <div className="Settings">
        <h2>Settings</h2>
        <form className="Settings__form">
          <div className="form-group">
            <label htmlFor="gps">GPS on?</label>
            <input
              type="checkbox"
              name="gpsOn"
              checked={true}
              onChange={updateSetting}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email-on-friend-hang">
              Email on friend's hanging?
            </label>
            <input
              type="checkbox"
              name="emailOnFriendHang"
              checked={true}
              onChange={updateSetting}
            />
          </div>
          <div className="form-group">
            <label htmlFor="notifications">Notifications</label>
            <input
              type="checkbox"
              name="notifications"
              checked={true}
              onChange={updateSetting}
            />
          </div>
          <input type="submit" value="Save" />
        </form>
      </div>
    </div>
  ) : null;
};

export default Profile;
