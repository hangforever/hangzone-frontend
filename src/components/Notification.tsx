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
}

export default function Notification({
  className = '',
  iconGlyph,
  faceColor = 'black',
  shadowColor = 'green',
  children,
}: Props) {
  return (
    <div className={`Notification ${className} ${backgroundColor(faceColor)}`}>
      <span className="oi" data-glyph="x" />
      {children}
      <div className={`shadow ${backgroundColor(shadowColor)}`}></div>
      {iconGlyph && <span className="icon oi" data-glyph={iconGlyph} />}
    </div>
  );
}
