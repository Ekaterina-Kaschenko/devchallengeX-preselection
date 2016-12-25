import React, { PropTypes } from 'react';
import { Map, Marker, TileLayer, Polyline, Popup } from 'react-leaflet';

import { icon } from 'leaflet';
import startIconUrl from './start.png';
import goalIconUrl from './goal.png';

const startIcon = icon({
  iconUrl: startIconUrl,
  iconSize: [64, 64],
  iconAnchor: [20, 56],
  popupAnchor: [10, -45],
});
const goalIcon = icon({
  iconUrl: goalIconUrl,
  iconSize: [64, 64],
  iconAnchor: [24, 60],
  popupAnchor: [10, -55],
});

const renderStartMarker = (point) => (
  <Marker position={[point.lat, point.lon]} icon={startIcon}>
    <Popup>
      <span>{point.name}</span>
    </Popup>
  </Marker>
);
const renderGoalMarker = (point) => (
  <Marker position={[point.lat, point.lon]} icon={goalIcon}>
    <Popup>
      <span>{point.name}</span>
    </Popup>
  </Marker>
);

export class MapBox extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { position, zoom, path, onClickHandler, start, goal } = this.props;
    return (
      <Map center={position} zoom={zoom} style={{ height: '80vh' }} onClick={onClickHandler}>
        <TileLayer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
        />
        {start ? renderStartMarker(start) : null}
        {goal ? renderGoalMarker(goal) : null}
        {path ? <Polyline positions={path} color="red" /> : null }
      </Map>
    );
  }
}

MapBox.propTypes = {
  position: PropTypes.array,
  zoom: PropTypes.number,
  path: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  onClickHandler: React.PropTypes.func,
  start: PropTypes.object,
  goal: PropTypes.object,
};

export default MapBox;
