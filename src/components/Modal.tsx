import React from 'react'
import './Modal.scss'

interface Props {
  active: boolean,
  className?: string,
  onCloseClick: () => void
}

const Modal: React.SFC<Props> = ({
  active,
  className = '',
  onCloseClick,
  children,
}) => {
  return active ? (
    <div className={`Modal ${className}`}>
      <div className="Modal__container">
        <div className="Modal__close-x" onClick={onCloseClick}>x</div>
        <div className="Modal__content">
          {children}
        </div>
      </div>
      <div className="Modal__bg" onClick={onCloseClick}></div>
    </div>
  ) : null
}

export default Modal
