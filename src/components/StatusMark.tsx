import React from 'react';
import { Status } from '@types';
import './StatusMark.scss';

const StatusMark: React.FC<{ status: Status }> = ({ status }) => (
  <div className={`StatusMark ${status}`}></div>
);

export default StatusMark;
