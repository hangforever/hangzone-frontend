import React, { Component } from 'react';
import {
  Map,
  InfoWindow,
  Marker,
  GoogleApiWrapper,
  IProvidedProps,
} from 'google-maps-react';
import Loading from './Loading';
import './Map.scss';

const LoadingContainer = () => <Loading>Loading bangzones...</Loading>;

interface Props extends IProvidedProps {}

class HangzoneMap extends Component<Props> {
  render() {
    return (
      <div className="HangzoneMap">
        <Map
          google={this.props.google}
          //@ts-ignore
          zoom={14}
        >
          <Marker
            // @ts-ignore
            onClick={this.onMarkerClick}
            // @ts-ignore
            name={'Current location'}
          >
            <InfoWindow
              visible={true}
              // @ts-ignore
              onClose={() => console.log('Info window closed')}
            >
              <div>
                <h1>Placeholder</h1>
              </div>
            </InfoWindow>
          </Marker>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAPS_API_KEY as string,
  LoadingContainer,
})(HangzoneMap);
