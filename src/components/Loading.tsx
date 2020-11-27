import React from 'react';
import './Loading.scss';

const Loading = () => (
  <div className="Loading" data-testid="Loading" aria-busy>
    <div className="Loading__message">Loading...</div>
  </div>
);

export default Loading;
