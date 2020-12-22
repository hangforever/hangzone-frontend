import React from 'react';
import './InputText.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function InputText({ ...rest }: Props) {
  return (
    <div className="InputText">
      <input type="text" {...rest} />
      <div className="border-bottom"></div>
    </div>
  );
}
