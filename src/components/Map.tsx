import React, { useState, useContext } from 'react';
import { observer } from "mobx-react-lite"
import appStoreContext from '../stores/appStoreContext'
import HangzoneItem from './HangzoneItem'
import NewZone from './NewZone'

const Map = () => {
  const appStore = useContext(appStoreContext)
  const [name, updateName] = useState('')
  const [isPrivate, updateIsPrivate] = useState(false)
  const [description, updateDescription] = useState('')
  function resetForm() {
    updateName('')
    updateIsPrivate(false)
    updateDescription('')
  }
  
  return (
    <div className="map-container">
      <h1>Hangzones</h1>
      <ul>
        {appStore.hangzones.map((hangzone) => (
          <div>
            <HangzoneItem key={hangzone.id} {...hangzone} />
            <button onClick={() => appStore.removeHangzone(hangzone.id)}>Remove Bangerino</button>
          </div>
        ))}
      </ul>
      <div className="form-item">
        <label htmlFor="name">Name:</label>
        <input type="text" value={name} name="name" onChange={e => updateName(e.target.value)} />
      </div>
      <div className="form-item">
        <label htmlFor="is-private">Private?::</label>
        <input type="checkbox" checked={isPrivate} name="is-private" onChange={e => updateIsPrivate(!isPrivate)} />
      </div>
      <div className="form-item">
        <label htmlFor="description">Description:</label>
        <textarea value={description} name="description" onChange={e => updateDescription(e.target.value)} />
      </div>
      <button onClick={() => {
        appStore.addHangzone(name, description, isPrivate)
        resetForm()
      }}>
        Add Hangzone
      </button>
      <NewZone />
    </div>
  )
}

export default observer(Map)