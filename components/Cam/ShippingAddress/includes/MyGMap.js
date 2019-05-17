import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Row, Col } from 'react-bootstrap';

import MyGoogleMap from './GoogleMap';
import { actionCreators } from '../../../../store/auth';

import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../address_en.styl';
import styles_ar from '../address_ar.styl';


const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const refs = {};
class MyGMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bounds: null,
      center: {
        lat: 24.7135517, lng: 46.6752957,
      },
      markers: [],
    };

    this.onMapMounted = this.onMapMounted.bind(this);
    this.markerLatlng = this.markerLatlng.bind(this);
    this.onPlacesChanged = this.onPlacesChanged.bind(this);
    this.onBoundsChanged = this.onBoundsChanged.bind(this);
    this.onSearchBoxMounted = this.onSearchBoxMounted.bind(this);
  }

  // TODO locate me is pending SF-27
  // https://developers.google.com/maps/documentation/javascript/examples/geocoding-reverse
  // https://github.com/tomchentw/react-google-maps/issues/324
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

  // http://maps.googleapis.com/maps/api/geocode/json?latlng=44.4647452,7.3553838&sensor=true
  onGetLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        this.geocodeLatLng(location.coords.latitude, location.coords.longitude);
      });
    }
  }

  onMapMounted = (ref) => {
    refs.map = ref;
  }

  // if we remove debounce, map drag wont work as expected.
  onBoundsChanged() {
    _.debounce(() => {
      this.setState({
        bounds: refs.map.getBounds(),
        center: refs.map.getCenter(),
      });
    }, 100, { maxWait: 500 });
  }

  onSearchBoxMounted = (ref) => {
    refs.searchBox = ref;
  }

  onPlacesChanged() {
    const { center } = this.state;
    const { getDataFromMap } = this.props;

    const places = refs.searchBox.getPlaces();
    const _bounds = new google.maps.LatLngBounds();

    const lat = places[0].geometry.location.lat();
    const lng = places[0].geometry.location.lng();

    const cityCountryObj = this.fetchCountryName(places[0].address_components);

    cityCountryObj.address = places[0].formatted_address;

    getDataFromMap({
      lat, lng, cityCountryObj,
    });

    places.forEach((place) => {
      if (place.geometry.viewport) {
        _bounds.union(place.geometry.viewport);
      } else {
        _bounds.extend(place.geometry.location);
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

  fetchCountryName = data => data.reduce((obj, curr) => {
    if (curr.types.includes('country')) {
      obj.country = curr;
    }
    if (curr.types.includes('locality')) {
      obj.city = curr.long_name;
    }
    if (curr.types.includes('postal_code')) {
      obj.postal_code = curr.long_name;
    }
    return obj;
  }, {});


  markerLatlng(marker) {
    const { getDataFromMap } = this.props;

    const lat = marker.latLng.lat();
    const lng = marker.latLng.lng();
    const places = refs.searchBox.getPlaces();
    const cityCountryObj = this.fetchCountryName(places[0].address_components);

    cityCountryObj.address = places[0].formatted_address;
    getDataFromMap({
      lat, lng, cityCountryObj,
    });
  }

  onMapClick = (marker) => {
    const { deriveCity, getDataFromMap } = this.props;
    const lng = marker.latLng.lng();
    const lat = marker.latLng.lat();
    deriveCity({
      longitude: lng,
      latitude: lat,
      api: '/geocode/json',
    }).then((res) => {
      if (res.value) {
        const cityCountryObj = this.fetchCountryName(res.value.address_components);

        cityCountryObj.address = res.value.formatted_address;

        getDataFromMap({
          lat, lng, cityCountryObj,
        });
        this.setState({
          markers: [{
            position: {
              lat,
              lng,
            },
          }],
        });
      }
    });
  }

  // <button onClick={this.onGetLocation.bind(this)}>LOCATE ME</button>
  render() {
    const {
      refs, bounds, center, markers
    } = this.state;
    const { clsName } = this.props;
    return (
      <div>
        <MyGoogleMap
          refs={refs}
          bounds={bounds}
          center={center}
          markers={markers}
          onMapClick={this.onMapClick}
          onMapMounted={this.onMapMounted}
          onBoundsChanged={this.onBoundsChanged}
          onSearchBoxMounted={this.onSearchBoxMounted}
          onPlacesChanged={this.onPlacesChanged}
          markerLatlng={this.markerLatlng}
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDrVNKZshUspEprFsNnQD-sos6tvgFdijg&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div className={`${styles[clsName]}`} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      </div>

    );
  }
}

MyGMap.propTypes = {
  getDataFromMap: PropTypes.func.isRequired,
};

MyGoogleMap.defaultProps = {

};


const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      deriveCity: actionCreators.deriveCity,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(MyGMap);
