import React, { useContext, useState } from 'react' 
import { observer } from "mobx-react-lite"
import appStoreContext from '../stores/appStoreContext'
import './NewZone.scss'
import '../styles/modifiers.scss'

const NewZoneModal = () => {
  const appStore = useContext(appStoreContext)
  const [name, updateName] = useState('')
  const [isPrivate, updateIsPrivate] = useState(false)
  const [description, updateDescription] = useState('')
  function resetForm() {
    updateName('')
    updateIsPrivate(false)
    updateDescription('')
  }

  const [active, toggleActive] = useState(false)
  return (
    <div className="NewZone">
      {active &&       
      <div className="NewZone__modal">
        <div className="NewZone__modal-container">
            <div className="NewZone__modal-close-x" onClick={() => toggleActive(false)}>x</div>
            <div className="NewZone__modal-content">
              <div className="form-item">
                <label htmlFor="name">Name:</label>
                <input type="text" value={name} name="name" onChange={e => updateName(e.target.value)} />
              </div>
              <div className="form-item">
                <label className="--inline-block" htmlFor="is-private">Private?::</label>
                <input type="checkbox" checked={isPrivate} name="is-private" onChange={e => updateIsPrivate(!isPrivate)} />
              </div>
              <div className="form-item">
                <label htmlFor="description">Description:</label>
                <textarea value={description} name="description" onChange={e => updateDescription(e.target.value)} />
              </div>
              <button onClick={() => {
                appStore.addHangzone(name, description, isPrivate)
                resetForm()
                toggleActive(active ? false : true)
              }}>complete</button>
              </div>  
          </div>
          <div className="NewZone__modal-bg" onClick={() => toggleActive(false)}></div>      
      </div>}
      {!active &&
       <button className="NewZoneModal__button" onClick={() => toggleActive(active ? false : true)}>
        add zone +
      </button>}
    </div>
  )
}

export default observer(NewZoneModal)

