import React from 'react';
import {
  Map,
  InfoWindow,
  Marker,
  GoogleApiWrapper,
  IProvidedProps,
} from 'google-maps-react';
import './Map.scss';

const LoadingContainer = () => <div>Fancy loading container!</div>;

interface Props extends IProvidedProps {}

function HangzoneMap({ google }: Props) {
  return (
    <div className="HangzoneMap">
      <Map
        google={google}
        //@ts-ignore
        zoom={14}
      >
        <Marker
          onClick={() => console.log('marker clicked')}
          // @ts-ignore
          name={'Current location'}
        />

        <InfoWindow
          // @ts-ignore
          onClose={() => console.log('Info window closed')}
        >
          <div>
            <h1>Placeholder</h1>
          </div>
        </InfoWindow>
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAPS_API_KEY as string,
  LoadingContainer,
})(HangzoneMap);
