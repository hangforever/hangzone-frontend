import React, { useContext, useState } from 'react' 
import './NewZone.scss'
import HangzoneItem from './HangzoneItem'

const NewZoneModal = () => {
  const [active, toggleActive] = useState(false)
  return (
    <div className="NewZone">
      {active &&       
      <div className="NewZone__modal">
        <div className="NewZone__modal-container">
          <button className="NewZone__modal-close" onClick={() => toggleActive(active ? false : true)}>
            x
          </button>
          <div>this will be a modal to make a new hangzone someday</div>
        </div>
      </div>}
      {!active &&
       <button className="NewZoneModal__button" onClick={() => toggleActive(active ? false : true)}>
        add zone +
      </button>}
    </div>
  )
}

export default NewZoneModal

