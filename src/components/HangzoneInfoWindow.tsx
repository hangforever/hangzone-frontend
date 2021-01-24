import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { InfoWindow, IInfoWindowProps } from 'google-maps-react';
import Button from './Button';
import { Hangzone } from 'types';
import './HangzoneInfoWindow.scss';

class InfoWindowEx extends Component {
  // @ts-ignore
  constructor(props) {
    super(props);
    // @ts-ignore
    this.infoWindowRef = React.createRef();
    // @ts-ignore
    this.contentElement = document.createElement(`div`);
  }

  // @ts-ignore
  componentDidUpdate(prevProps) {
    if (this.props.children !== prevProps.children) {
      // @ts-ignore
      ReactDOM.render(
        // @ts-ignore
        React.Children.only(this.props.children),
        // @ts-ignore
        this.contentElement
      );
      // @ts-ignore
      this.infoWindowRef.current.infowindow.setContent(this.contentElement);
    }
  }

  render() {
    // @ts-ignore
    return <InfoWindow ref={this.infoWindowRef} {...this.props} />;
  }
}

interface Props extends IInfoWindowProps {
  hangzone: Hangzone;
  checkedIn?: boolean;
  onJoin?: () => void;
}

export default function HangzoneInfoWindow({
  hangzone,
  checkedIn,
  onJoin,
  ...infoWindowProps
}: Props) {
  return (
    <InfoWindowEx {...infoWindowProps}>
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
          <Button className="join-btn" onClick={onJoin}>
            Join hangzone!
          </Button>
        )}
      </div>
    </InfoWindowEx>
  );
}
