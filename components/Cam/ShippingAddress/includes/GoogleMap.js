import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox";

import styles from '../address.styl';

const MyGoogleMap = withScriptjs(withGoogleMap((props) => {
  return (
    <GoogleMap
      ref={props.onMapMounted}
      onBoundsChanged={props.onBoundsChanged}
      center={props.center}
      defaultZoom={16}
      options={{ streetViewControl: false, mapTypeControl: false, zoomControl: false, draggable: true }}
    >
      <SearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        controlPosition={google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Enter a location"
          className={styles['map-input']}
        />
      </SearchBox>
      {props.markers.map((marker, index) =>
        <Marker key={index} position={marker.position} />
      )}
    </GoogleMap>
  )
}));

MyGoogleMap.propTypes = {
  onMapMounted: PropTypes.func.isRequired,
  onBoundsChanged: PropTypes.func.isRequired,
  onSearchBoxMounted: PropTypes.func.isRequired,
  onPlacesChanged: PropTypes.func.isRequired,
  markers: PropTypes.array,
  center: PropTypes.object
};

MyGoogleMap.defaultProps = {
  markers: [],
  center: {}
};

export default MyGoogleMap;