import React from 'react';
import {
  Map,
  InfoWindow,
  Marker,
  GoogleApiWrapper,
  IProvidedProps,
} from 'google-maps-react';
import Loading from './Loading';
import mapPin from '@assets/images/map_pin.svg';
import './Map.scss';

const LoadingContainer = () => <Loading>Loading bangzones...</Loading>;

interface Props extends IProvidedProps {}

function HangzoneMap({ google }: Props) {
  return (
    <div className="HangzoneMap">
      <Map
        google={google}
        //@ts-ignore
        zoom={18}
        initialCenter={{
          lat: 35.6642367,
          lng: 139.6677701,
        }}
      >
        <Marker
          // @ts-ignore
          onClick={() => console.log('marker clicked')}
          // @ts-ignore
          name={'Current location'}
          position={{
            lat: 35.6642367,
            lng: 139.6677701,
          }}
          icon={{
            url: mapPin,
            anchor: new google.maps.Point(32, 32),
            scaledSize: new google.maps.Size(24, 24),
          }}
        />
        <InfoWindow
          visible={true}
          // @ts-ignore
          onClose={() => console.log('Info window closed')}
          onOpen={() => console.log('Info window closed')}
        >
          <div className="info-window">
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
