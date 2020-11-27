import React from 'react';
import './ProgressBar.scss';

interface Props {
  progress: number;
}

export default function ProgressBar({ progress }: Props) {
  // This just keeps values between 0 - 100
  const capped = progress < 0 ? 0 : progress > 100 ? 100 : progress;
  return (
    <div className="ProgressBar">
      <div className="progress" style={{ width: `${capped}%` }} />
    </div>
  );
}
