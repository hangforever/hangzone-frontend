import React from 'react';
import { ToolColor } from 'types';
import { backgroundColor } from 'util/colors';
import './Notification.scss';

interface Props {
  className?: string;
  faceColor?: ToolColor;
  shadowColor?: ToolColor;
  iconGlyph?: string;
  children: React.ReactNode;
  onClose?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function Notification({
  className = '',
  iconGlyph,
  faceColor = 'black',
  shadowColor = 'green',
  children,
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
    </div>
  );
}
