import React, { useContext } from 'react';
import { Hangzone } from '@types';
import { appStoreContext } from 'stores';

interface Props extends Hangzone {}

const HangzoneItem: React.FC<Props> = ({
  id,
  name,
  description,
  isPrivate,
}) => {
  const appStore = useContext(appStoreContext);
  return (
    <li>
      ID: {id} <br />
      Name:{' '}
      <input
        type="text"
        value={name}
        onChange={(e) => appStore.updateHangzone(id, { name: e.target.value })}
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
