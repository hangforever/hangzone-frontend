import React, { useState, useContext } from 'react'
import { appStoreContext } from 'stores'
import { ISettings } from 'types'

export default function Settings() {
  const appStore = useContext(appStoreContext)
  const [settings, ISettings] = useState({ ...appStore.settings })
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    for (let [key, val] of Object.entries(settings)) {
      appStore.updateSettings(key as keyof ISettings, val)
    }
  }

  function updateSetting(e: React.ChangeEvent<HTMLInputElement>) {
    ISettings({ ...settings, [e.target.name]: e.target.checked})
  }

  return (
    <div className="Settings">
      <h2>Settings</h2>
      <form className="settings-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="gps">GPS on?</label>
          <input type="checkbox" name="gpsOn" checked={settings.gpsOn} onChange={updateSetting} />
        </div>
        <div className="form-group">
          <label htmlFor="email-on-friend-hang">Email on friend's hanging?</label>
          <input type="checkbox" name="emailOnFriendHang" checked={settings.emailOnFriendHang} onChange={updateSetting} />
        </div>
        <div className="form-group">
          <label htmlFor="notifications">Notifications</label>
          <input type="checkbox" name="notifications" checked={settings.notifications} onChange={updateSetting} />
        </div>
        <input type="submit" value="Save" />
      </form>
    </div>
  )
}