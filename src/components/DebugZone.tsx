import React, { useState } from 'react';
import InputText from './InputText';
import Button from './Button';
import Notification from './Notification';
import Portal from './Portal';
import { User, Notebook, Map } from './icons';
import mapPin from 'assets/images/map_pin.svg';
import mapPinShine from 'assets/images/map_pin_shine.svg';
import unfocusedPin from 'assets/images/unfocused_pin.svg';
import unfocusedPinPulse from 'assets/images/unfocused_pin_pulse.svg';
import './DebugZone.scss';

/**
 * A General debug sandbox that only shows up in local development
 * You can do anything in here! (I'm too lazy to add storybook)
 */
export default function DebugZone() {
  const [isNotificationShown, setIsNotificationShown] = useState(false);
  return (
    <div className="DebugZone bg-fresh">
      {isNotificationShown && (
        <Portal>
          <Notification onClose={() => setIsNotificationShown(false)}>
            I am a hidden notification!
          </Notification>
        </Portal>
      )}
      <div className="container">
        <div className="DebugZone-body">
          <div className="form-group">
            <InputText iconGlyph="magnifying-glass" placeholder="Username" />
          </div>
          <div className="form-group">
            <InputText placeholder="Password" type="password" />
          </div>
          <div className="form-group">
            <InputText
              iconGlyph="magnifying-glass"
              placeholder="Username"
              solid
            />
          </div>
          <div className="form-group">
            <Button>Create a new zone!</Button>
          </div>
          <div className="form-group">
            <Button
              faceColor="black"
              shadowColor="red"
              iconGlyph="magnifying-glass"
            >
              Search
            </Button>
          </div>
          <div className="form-group">
            <Notification arrowDirection="right">
              TIP: Join an existing hang, or create your own zone!
              <br />
              Let’s hangzone!
            </Notification>
          </div>
          <div className="form-group">
            <Button onClick={() => setIsNotificationShown(true)}>
              Click on me to reveal a notification
            </Button>
          </div>
          <div className="form-group">
            <User className="fill-white" />
            <Notebook className="fill-red" />
            <Map className="fill-white" />
          </div>
          <div className="form-group">
            <img className="w50" src={mapPin} alt="" />
            <img className="w50" src={mapPinShine} alt="" />
          </div>
          <div className="form-group">
            <img className="w50" src={unfocusedPin} alt="" />
            <img className="w50" src={unfocusedPinPulse} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
