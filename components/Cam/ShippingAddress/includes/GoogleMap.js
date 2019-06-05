import React from 'react';
import PropTypes from 'prop-types';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';

import { languageDefinations } from '../../../../utils/lang/';
import lang from '../../../../utils/language';
import Button from '../../../common/CommonButton';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../address_en.styl';
import styles_ar from '../address_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const MyGoogleMap = withScriptjs(withGoogleMap((props) => {
  const { DELIVERY_ADDR_PAGE } = languageDefinations();
  return (
    <GoogleMap
      ref={props.onMapMounted}
      onBoundsChanged={props.onBoundsChanged}
      center={props.center}
      defaultZoom={props.defaultZoom}
      onClick={props.onMapClick}
      options={{
        streetViewControl: false, mapTypeControl: false, zoomControl: false, draggable: true,
      }}
    >
      <SearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        controlPosition={google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged}
      >
        <div className={`${styles.flex} ${styles['m-10']}`}>
          <input
            type="text"
            placeholder={DELIVERY_ADDR_PAGE.ENTER_LOC}
            className={styles['map-input']}
          />
          <Button
            className={`${styles.fontW600} ${styles['pl-25']} ${styles['pr-25']}`}
            btnText={DELIVERY_ADDR_PAGE.LOCATE_ME}
            showImage="icons/Locate"
            onClick={props.locateMe}
          />
        </div>
      </SearchBox>
      {props.markers.map((marker, index) =>
        <Marker key={index} position={marker.position} defaultDraggable onMouseUp={props.markerLatlng} />)}
    </GoogleMap>
  );
}));

MyGoogleMap.propTypes = {
  onMapMounted: PropTypes.func.isRequired,
  onBoundsChanged: PropTypes.func.isRequired,
  onSearchBoxMounted: PropTypes.func.isRequired,
  onPlacesChanged: PropTypes.func.isRequired,
  markers: PropTypes.array,
  center: PropTypes.object,
  defaultZoom: PropTypes.number,
};

MyGoogleMap.defaultProps = {
  markers: [],
  center: {},
  defaultZoom: 15,
};

export default MyGoogleMap;
