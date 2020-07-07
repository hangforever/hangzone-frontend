import React, { useContext } from 'react';
import { observer } from "mobx-react-lite"
import AppStore from '../stores/AppStore'
import HangzoneItem from './HangzoneItem'

const Map = () => {
  const appStore = useContext(AppStore)
  function handleAddHangzoneClick() {
    appStore.addHangzone('Test', 'test description', true)
  }
  return (
    <div className="map-container">
      <h1>Hangzones</h1>
      <ul>
        {appStore.hangzones.map((hangzone) => (
          <HangzoneItem {...hangzone} />
        ))}
      </ul>
      <button onClick={handleAddHangzoneClick}>Add Hangzone</button>
    </div>
  )
}

export default observer(Map)