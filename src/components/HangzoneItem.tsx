import React, { useContext } from 'react';
import { Hangzone } from '@src/types';

interface Props extends Hangzone {}

const HangzoneItem: React.FC<Props> = ({
  id,
  name,
  description,
  isPrivate,
}) => {
  return (
    <li>
      ID: {id} <br />
      Name:{' '}
      <input
        type="text"
        value={name}
        onChange={(e) => {}}
      />{' '}
      <br />
      Description: {description} <br />
      Private?:{' '}
      <input
        type="checkbox"
        checked={isPrivate}
        onChange={() => console.log('Go fuck yourself')}
      />{' '}
      <br />
    </li>
  );
};

export default HangzoneItem;
