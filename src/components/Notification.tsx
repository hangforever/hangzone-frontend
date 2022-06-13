import React from 'react';
import { ToolColor } from '@src/types';
import { backgroundColor } from '@src/util/colors';
import './Notification.scss';

type Direction = 'up' | 'down' | 'left' | 'right';

function Arrow({ direction = 'down' }: { direction: Direction }) {
  const arrowSvg = {
    up: <polygon points="12,3 5,20 20,20" className="triangle" />,
    down: <polygon points="12,20 0,3 20,3" className="triangle" />,
    left: <polygon points="0,10 20,0 20,20" className="triangle" />,
    right: <polygon points="20,10 0,0 0,20" className="triangle" />,
  }[direction];
  return (
    <svg className={`Arrow ${direction}`} height="20" width="20">
      {arrowSvg}
    </svg>
  );
}

interface Props {
  className?: string;
  faceColor?: ToolColor;
  shadowColor?: ToolColor;
  iconGlyph?: string;
  children: React.ReactNode;
  arrowDirection?: Direction;
  onClose?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function Notification({
  className = '',
  iconGlyph,
  faceColor = 'black',
  shadowColor = 'green',
  children,
  arrowDirection,
  onClose = (e) => console.log('On close', e),
  onClick = (e) => console.log('On click', e),
}: Props) {
  return (
    <div className={`Notification ${className}`} onClick={onClick}>
      {iconGlyph && <span className="icon oi" data-glyph={iconGlyph} />}
      <div className={`inner ${backgroundColor(faceColor)}`}>
        <span className="oi" data-glyph="x" onClick={onClose} />
        {children}
      </div>
      <div className={`shadow ${backgroundColor(shadowColor)}`} />
      {arrowDirection && <Arrow direction={arrowDirection} />}
    </div>
  );
}
