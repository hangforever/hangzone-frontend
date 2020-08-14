import React, { useState } from 'react'

interface Props {
  activeStart: boolean
  content: React.SFC
}

const Modal: React.SFC<Props> = ({ activeStart, content }) => {
  const [active, toggleActive] = useState(activeStart)
  return (
    <div className="Modal">
      <div className="Modal__close-x" onClick={() => toggleActive(!active)}>x</div>
      <div className="Modal__content">{content}</div>
    </div>
  )
}

export default Modal