import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { InfoWindow, IInfoWindowProps } from 'google-maps-react';
import Button from './Button';
import { Hangzone } from 'types';
import shareSvg from 'assets/images/share.svg';
import inviteSvg from 'assets/images/invite.svg';
import ellipsisSvg from 'assets/images/ellipsis.svg';
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
  function handleCopyURL() {
    console.log('unimplemented!');
  }
  function handleInviteFriends() {
    console.log('unimplemented!');
  }
  function handleMoreOptions() {
    console.log('unimplemented!');
  }
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
            <div className="checked-in-option" onClick={handleCopyURL}>
              <span className="icon">
                <img src={shareSvg} alt="Share/Copy URL Icon" />
              </span>
              <div className="text">Share/Copy URL</div>
            </div>
            <div className="checked-in-option" onClick={handleInviteFriends}>
              <span className="icon">
                <img src={inviteSvg} alt="Invite Friends Icon" />
              </span>
              <div className="text">Invite Friends</div>
            </div>
            <div className="checked-in-option" onClick={handleMoreOptions}>
              <span className="icon">
                <img src={ellipsisSvg} alt="More Options Icon" />
              </span>
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
