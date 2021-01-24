import React from 'react';
import './Loading.scss';

interface Props {
  children?: React.ReactNode;
}

export default function Loading({ children }: Props) {
  return (
    <div className="Loading bg-fresh" data-testid="Loading" aria-busy>
      <div className="Loading__message">{children}</div>
    </div>
  );
}
