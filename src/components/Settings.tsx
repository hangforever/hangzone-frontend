import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { appStoreContext } from 'stores';
import { ISettings } from 'types';

export default observer(function Settings() {
  const appStore = useContext(appStoreContext);

  function updateSetting(e: React.ChangeEvent<HTMLInputElement>) {
    appStore.settings[e.target.name as keyof ISettings] = e.target.checked;
  }

  return (
    <div className="Settings">
      <h2>Settings</h2>
      <form className="Settings__form">
        <div className="form-group">
          <label htmlFor="gps">GPS on?</label>
          <input
            type="checkbox"
            name="gpsOn"
            checked={appStore.settings.gpsOn}
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
            checked={appStore.settings.emailOnFriendHang}
            onChange={updateSetting}
          />
        </div>
        <div className="form-group">
          <label htmlFor="notifications">Notifications</label>
          <input
            type="checkbox"
            name="notifications"
            checked={appStore.settings.notifications}
            onChange={updateSetting}
          />
        </div>
        <input type="submit" value="Save" />
      </form>
    </div>
  );
});
