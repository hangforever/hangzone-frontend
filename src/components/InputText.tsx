import React from 'react';
import { backgroundColor } from 'util/colors';
import { ToolColor } from 'types';
import './InputText.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  iconGlyph?: string;
  solid?: boolean;
  shadowColor?: ToolColor;
}

export default function InputText({
  className = '',
  iconGlyph,
  solid,
  shadowColor = 'turquoise',
  ...rest
}: Props) {
  return (
    <div className={`InputText ${solid ? 'solid' : ''} ${className}`}>
      <input className={iconGlyph ? 'has-icon' : ''} type="text" {...rest} />
      <div className={`shadow ${backgroundColor(shadowColor)}`}></div>
      {iconGlyph && <span className="icon oi" data-glyph={iconGlyph} />}
    </div>
  );
}
