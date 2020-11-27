import React from 'react'
import './Modal.scss'

interface Props {
  active: boolean,
  className?: string,
  maxHeight?: string,
  maxWidth?: string,
  onCloseClick: () => void
}

const Modal: React.SFC<Props> = ({
  active,
  className = '',
  maxHeight = '',
  maxWidth = '',
  onCloseClick,
  children,
}) => {
  return active ? (
    <div className="Modal">
      <div className={`Modal__container ${className}`} style={{maxWidth: maxWidth}}>
        <div className="Modal__close-x" onClick={onCloseClick}>x</div>
        <div className="Modal__content" style={{maxHeight: maxHeight}}>
          {children}
        </div>
      </div>
      <div className="Modal__bg" onClick={onCloseClick}></div>
    </div>
  ) : null
}

export default Modal
