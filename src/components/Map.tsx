import React from 'react';
import Loading from './Loading';
import mapPin from '@src/assets/images/map_pin.svg';
import './Map.scss';

const LoadingContainer = () => <Loading>Loading bangzones...</Loading>;

interface Props {}

function HangzoneMap({}: Props) {
  return (
    <div className="hangzone-map">Map</div>
  );
}

export default HangzoneMap; 
