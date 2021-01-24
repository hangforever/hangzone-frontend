import React, { useContext, useState, useEffect } from 'react';
import {
  Map,
  Marker,
  GoogleApiWrapper,
  IProvidedProps,
  InfoWindow,
} from 'google-maps-react';
import { observer } from 'mobx-react-lite';
import HangzoneInfoWindow from './HangzoneInfoWindow';
import { Hangzone, LatLng } from 'types';
import * as hangzonesAPI from 'api/hangzones';
import Loading from './Loading';
import appStoreContext from '../stores/appStoreContext';
import mapPin from 'assets/images/map_pin.svg';
import './Map.scss';

const LoadingContainer = () => <Loading>Loading bangzones...</Loading>;

interface Props extends IProvidedProps {}

function HangzoneMap({ google }: Props) {
  const appStore = useContext(appStoreContext);
  const [hangzones, setHangzones] = useState<Hangzone[]>([]);
  const [selectedHangzoneId, setSelectedHangzoneId] = useState<string>();
  const [selectedMarker, setSelectedMarker] = useState();
  const [newMarker, setNewMarker] = useState();
  const [curLatLng, setCurLatLng] = useState<LatLng | null>(null);
  const [showCreateZoneInfo, setShowCreateZoneInfo] = useState<boolean>(false);
  function handleMapClick(lat: number, lng: number) {
    setCurLatLng([lat, lng]);
    setShowCreateZoneInfo(true);
  }

  const selectedHangzone = hangzones.find((h) => h.id === selectedHangzoneId);

  function isCheckedIn(): boolean {
    if (!(selectedHangzone && appStore.profile?.hangzoneId)) return false;

    return appStore.profile.hangzoneId === selectedHangzone.id;
  }

  async function fetchHangzones() {
    const hangzones = await hangzonesAPI.get();
    setHangzones(hangzones);
  }

  useEffect(() => {
    fetchHangzones();
  }, [appStore.profile?.hangzoneId]);

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
              setSelectedHangzoneId(zone.id);
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
            onClick={(_props, marker) => setNewMarker(marker)}
          />
        )}
        {newMarker && (
          // @ts-ignore
          <InfoWindow visible={showCreateZoneInfo} marker={newMarker}>
            <div>New Hangzone!</div>
          </InfoWindow>
        )}
        {selectedHangzone && selectedMarker && (
          // @ts-ignore
          <HangzoneInfoWindow
            visible
            marker={selectedMarker}
            hangzone={selectedHangzone}
            checkedIn={isCheckedIn()}
            onJoin={async () => {
              await appStore.checkIn(selectedHangzone.id);
            }}
          />
        )}
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAPS_API_KEY as string,
  LoadingContainer,
})(observer(HangzoneMap));
