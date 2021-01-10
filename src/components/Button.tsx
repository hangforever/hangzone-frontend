import React from 'react';
import './Button.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconGlyph?: string;
  solid?: boolean;
}

export default function Button({ iconGlyph, solid, ...rest }: Props) {
  return (
    <div className={`Button ${solid ? 'solid' : ''}`}>
      <button className={iconGlyph ? 'has-icon' : ''} {...rest} />
      <div className="shadow"></div>
      {iconGlyph && <span className="icon oi" data-glyph={iconGlyph} />}
    </div>
  );
}
