import React from 'react';
import { backgroundColor } from 'util/colors';
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
  shadowColor = 'turquoise',
  children,
  ...rest
}: Props) {
  return (
    <div className={`Button ${className}`}>
      <button
        className={`${iconGlyph ? 'has-icon' : ''} ${backgroundColor(
          faceColor
        )}`}
        {...rest}
      >
        {iconGlyph && <span className="icon oi" data-glyph={iconGlyph} />}
        {children}
      </button>
      <div className={`shadow ${backgroundColor(shadowColor)}`}></div>
    </div>
  );
}
