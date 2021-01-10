import React from 'react';
import { ToolColor } from 'types';
import './Button.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  faceColor?: ToolColor;
  shadowColor?: ToolColor;
  iconGlyph?: string;
  solid?: boolean;
}

export default function Button({
  className = '',
  iconGlyph,
  faceColor = 'black',
  shadowColor = 'green',
  children,
  ...rest
}: Props) {
  const backgroundColor = (color: ToolColor) => `background-${color}`;
  return (
    <div className={`Button ${className}`}>
      <button
        className={`${iconGlyph ? 'has-icon' : ''} ${backgroundColor(
          faceColor
        )}`}
        {...rest}
      >
        {children}
      </button>
      <div className={`shadow ${backgroundColor(shadowColor)}`}></div>
      {iconGlyph && <span className="icon oi" data-glyph={iconGlyph} />}
    </div>
  );
}