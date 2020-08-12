import React, { useContext, useState } from 'react' 
import { observer } from "mobx-react-lite"
import appStoreContext from '../stores/appStoreContext'
import './NewZone.scss'
import '../styles/modifiers.scss'

const NewZoneModal = () => {
  const appStore = useContext(appStoreContext)
  const [active, toggleActive] = useState(false)
  const [name, updateName] = useState('')
  const [isPrivate, updateIsPrivate] = useState(true)
  const [isPublic, updateIsPublic] = useState(false)
  const [description, updateDescription] = useState('')

  function resetForm() {
    updateName('')
    updateIsPrivate(true)
    updateIsPublic(false)
    updateDescription('')
  }
  
  return (
    <div className="NewZone">
      {active &&       
      <div className="NewZone__modal">
        <div className="NewZone__modal-container">
            <div className="NewZone__modal-close-x" onClick={() => toggleActive(!active)}>x</div>
            <div className="NewZone__modal-content">
              <div className="form-item">
                <label htmlFor="name">Name:</label>
                <input type="text" placeholder="what's your hangzone called?" value={name} name="name" onChange={e => updateName(e.target.value)} />
              </div>
              <div className="form-item --inline-block">
                <label className="--inline-block" htmlFor="is-private">Public</label>
                <input type="checkbox" className=".--right-padding" checked={isPublic} name="is-public" onChange={e => {
                  updateIsPrivate(!isPrivate)
                  updateIsPublic(!isPublic)
                }}/>
              </div>
              <div className="form-item --inline-block">
                <label className="--inline-block" htmlFor="is-private">Private</label>
                <input type="checkbox" checked={isPrivate} name="is-private" onChange={e => {
                  updateIsPrivate(!isPrivate)
                  updateIsPublic(!isPublic)
                }}/>
              </div>
              <div className="form-item">
                <label htmlFor="description">Description:</label>
                <textarea value={description} placeholder="[optional] write up  to 300 words about this hangzone for others to see" name="description" onChange={e => updateDescription(e.target.value)} />
              </div>
              <button onClick={() => {
                appStore.addHangzone(name, description, isPrivate)
                resetForm()
                toggleActive(!active)
              }}>complete</button>
              </div>  
          </div>
          <div className="NewZone__modal-bg" onClick={() => toggleActive(false)}></div>      
      </div>}
      {!active &&
       <button className="NewZoneModal__button" onClick={() => toggleActive(!active)}>
        add zone +
      </button>}
    </div>
  )
}

export default observer(NewZoneModal)

