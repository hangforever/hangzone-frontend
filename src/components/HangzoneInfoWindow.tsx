import React from 'react';
import { InfoWindow, IInfoWindowProps } from 'google-maps-react';
import Button from './Button';
import { Hangzone } from 'types';
import './HangzoneInfoWindow.scss';

interface Props extends IInfoWindowProps {
  hangzone: Hangzone;
  checkedIn?: boolean;
}

export default function HangzoneInfoWindow({
  hangzone,
  checkedIn,
  ...infoWindowProps
}: Props) {
  return (
    <InfoWindow {...infoWindowProps}>
      <div className="info-window">
        <h3>{hangzone.name}</h3>
        <div className="hangsters">
          Hangsters: {hangzone.checkedInProfileIds.length}
        </div>
        <div className="description">{hangzone.description}</div>
        {checkedIn ? (
          <div className="checked-in-options">
            <div className="checked-in-option">
              <span className="icon"></span>
              <div className="text">Share/Copy URL</div>
            </div>
            <div className="checked-in-option">
              <span className="icon"></span>
              <div className="text">Invite Friends</div>
            </div>
            <div className="checked-in-option">
              <span className="icon"></span>
              <div className="text">More Options</div>
            </div>
          </div>
        ) : (
          <Button className="join-btn">Join hangzone!</Button>
        )}
      </div>
    </InfoWindow>
  );
}
