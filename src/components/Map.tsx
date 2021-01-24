import React, { useState, useEffect } from 'react';
import {
  Map,
  InfoWindow,
  Marker,
  GoogleApiWrapper,
  IProvidedProps,
} from 'google-maps-react';
import { Hangzone, LatLng } from 'types';
import * as hangzonesAPI from 'api/hangzones';
import Loading from './Loading';
import mapPin from 'assets/images/map_pin.svg';
import './Map.scss';

const LoadingContainer = () => <Loading>Loading bangzones...</Loading>;

interface Props extends IProvidedProps {}

function HangzoneMap({ google }: Props) {
  const [hangzones, setHangzones] = useState<Hangzone[]>([]);
  const [selectedHangzone, setSelectedHangzone] = useState<Hangzone>();
  const [selectedMarker, setSelectedMarker] = useState<Hangzone>();
  const [curLatLng, setCurLatLng] = useState<LatLng | null>(null);
  const [showCreateZoneInfo, setShowcreateZoneInfo] = useState<boolean>(false);
  function handleMapClick(lat: number, lng: number) {
    setCurLatLng([lat, lng]);
    setShowcreateZoneInfo(true);
    console.log([lat, lng]);
  }

  useEffect(() => {
    hangzonesAPI.get().then(setHangzones);
  }, []);

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
        onClick={(_props, _map, e) => {
          handleMapClick(e.latLng.lat(), e.latLng.lng());
        }}
      >
        {hangzones.map((zone) => (
          <Marker
            key={zone.id}
            // @ts-ignore
            name={zone.name}
            position={{
              lat: zone.position[0],
              lng: zone.position[1],
            }}
            icon={{
              url: mapPin,
              anchor: new google.maps.Point(32, 32),
              scaledSize: new google.maps.Size(24, 24),
            }}
            onClick={(_props, marker) => {
              setSelectedHangzone(zone);
              setSelectedMarker(marker);
            }}
          />
        ))}
        {curLatLng && (
          <Marker
            // @ts-ignore
            name={'Current location'}
            position={{
              lat: curLatLng[0],
              lng: curLatLng[1],
            }}
            icon={{
              url: mapPin,
              anchor: new google.maps.Point(32, 32),
              scaledSize: new google.maps.Size(24, 24),
            }}
          />
        )}
        {selectedHangzone && (
          // @ts-ignore
          <InfoWindow visible marker={selectedMarker}>
            <div className="info-window">
              {selectedHangzone.name}
              {selectedHangzone.description}
            </div>
          </InfoWindow>
        )}
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAPS_API_KEY as string,
  LoadingContainer,
})(HangzoneMap);
