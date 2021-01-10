import React from 'react';
import InputText from './InputText';
import './DebugZone.scss';

/**
 * A General debug sandbox that only shows up in local development
 * You can do anything in here! (I'm too lazy to add storybook)
 */
export default function DebugZone() {
  return (
    <div className="DebugZone">
      {/* <h1>The freedom to do anything isn't freedom at all!</h1> */}
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
        </div>
      </div>
    </div>
  );
}
