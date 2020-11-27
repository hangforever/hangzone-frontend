import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import appStoreContext from '../stores/appStoreContext';
import HangzoneItem from './HangzoneItem';
import NewZone from './NewZone';

const Map = () => {
  const appStore = useContext(appStoreContext);

  return (
    <div className="map-container">
      <h1>Hangzones</h1>
      <ul>
        {appStore.hangzones.map((hangzone) => (
          <div>
            <HangzoneItem key={hangzone.id} {...hangzone} />
            <button onClick={() => appStore.removeHangzone(hangzone.id)}>
              Remove Bangerino
            </button>
          </div>
        ))}
      </ul>
      <NewZone />
    </div>
  );
};

export default observer(Map);
