import React from 'react';
import './InputText.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  iconGlyph?: string;
  solid?: boolean;
}

export default function InputText({
  className = '',
  iconGlyph,
  solid,
  ...rest
}: Props) {
  return (
    <div className={`InputText ${solid ? 'solid' : ''} ${className}`}>
      <input className={iconGlyph ? 'has-icon' : ''} type="text" {...rest} />
      <div className="shadow"></div>
      {iconGlyph && <span className="icon oi" data-glyph={iconGlyph} />}
    </div>
  );
}
