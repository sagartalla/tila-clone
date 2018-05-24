import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Row, Col } from 'react-bootstrap';

import MyGoogleMap from './GoogleMap';

import styles from '../address.styl';

const refs = {};
class MyGMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bounds: null,
      center: {
        lat: 41.9, lng: -87.624
      },
      markers: []
    }
    this.onMapMounted = this.onMapMounted.bind(this);
    this.onBoundsChanged = this.onBoundsChanged.bind(this);
    this.onSearchBoxMounted = this.onSearchBoxMounted.bind(this);
    this.onPlacesChanged = this.onPlacesChanged.bind(this);
  }

  // TODO locate me is pending SF-27
  //https://developers.google.com/maps/documentation/javascript/examples/geocoding-reverse
  //https://github.com/tomchentw/react-google-maps/issues/324
  // geocodeLatLng( lat, lng) {
  //   // let map  = new window.google.maps.Geocoder();
  //   let geocoder = new google.maps.Geocoder;
  //   // let infowindow = new google.maps.InfoWindow;
  //   let latlng = {lat: parseFloat(lat), lng: parseFloat(lng)};
  //   geocoder.geocode({'location': latlng}, function(results, status) {
  //     if (status === 'OK') {
  //       if (results[0]) {
  //         console.log(results)
  //         // map.setZoom(11);
  //         // var marker = new google.maps.Marker({
  //         //   position: latlng,
  //         //   map: map
  //         // });
  //         // // infowindow.setContent(results[0].formatted_address);
  //         // infowindow.open(map, marker);
  //       } else {
  //         console.log('No results found');
  //       }
  //     } else {
  //       console.log('Geocoder failed due to: ' + status);
  //     }
  //   });
  // }

  //http://maps.googleapis.com/maps/api/geocode/json?latlng=44.4647452,7.3553838&sensor=true
  onGetLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        this.geocodeLatLng(location.coords.latitude, location.coords.longitude);
      });
    }
  }

  onMapMounted(ref) {
    refs.map = ref;
  }

  //if we remove debounce, map drag wont work as expected.
  onBoundsChanged() {
    _.debounce(
      () => {
        this.setState({
          bounds: refs.map.getBounds(),
          center: refs.map.getCenter()
        })
      }, 100, { maxWait: 500 }
    )
  }

  onSearchBoxMounted(ref) {
    refs.searchBox = ref;
  }

  onPlacesChanged() {
    const { center } = this.state;
    const { updateAddressFromGoogleMap } = this.props;

    const places = refs.searchBox.getPlaces();
    const _bounds = new google.maps.LatLngBounds();

    const lat = places[0].geometry.location.lat()
    const lng = places[0].geometry.location.lng()
    const address = places[0].formatted_address;

    updateAddressFromGoogleMap({ lat, lng, address });

    places.forEach(place => {
      if (place.geometry.viewport) {
        _bounds.union(place.geometry.viewport)
      } else {
        _bounds.extend(place.geometry.location)
      }
    });
    const nextMarkers = places.map(place => ({
      position: place.geometry.location,
    }));
    const nextCenter = _.get(nextMarkers, '0.position', center);

    this.setState({
      center: nextCenter,
      markers: nextMarkers,
    });
  }

  // <button onClick={this.onGetLocation.bind(this)}>LOCATE ME</button>
  render() {
    let { refs, bounds, center, markers } = this.state;
    return (
      <div>
       
        <MyGoogleMap
          refs={refs}
          bounds={bounds}
          center={center}
          markers={markers}
          onMapMounted={this.onMapMounted}
          onBoundsChanged={this.onBoundsChanged}
          onSearchBoxMounted={this.onSearchBoxMounted}
          onPlacesChanged={this.onPlacesChanged}

          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDrVNKZshUspEprFsNnQD-sos6tvgFdijg&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div className={styles['map']} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>

    )
  }
}

MyGoogleMap.propTypes = {
  updateAddressFromGoogleMap: PropTypes.func.isRequired
};

MyGoogleMap.defaultProps = {

};

export default MyGMap;