import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dropdown, MenuItem, Modal } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { Router } from '../../../routes';
import _ from 'lodash';
import Cookie from 'universal-cookie';
import Button from '../../common/CommonButton';
import { selectors as productSelectors, actionCreators as productActionCreators } from '../../../store/product';
import { actionCreators, selectors } from '../../../store/auth';
import SVGCompoent from '../SVGComponet';
import { languageDefinations } from '../../../utils/lang';
import lang from '../../../utils/language';
import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './geoWidget_en.styl';
import styles_ar from './geoWidget_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const { SEARCH_PAGE } = languageDefinations();
const cookies = new Cookie();

class GeoWidget extends Component {
  constructor(props) {
    const shippingInfo = cookies.get('shippingInfo');
    super(props);
    this.state = {
      displayCity: '',
      showCitiesData: false,
      ...props.geoShippingData,
      ...shippingInfo,
      showModal: false,
      showServingLocations: false,
      showLocationBlockMsg: false,

    };
    this.onChangeCity = this.onChangeCity.bind(this);
    this.deleteCity = this.deleteCity.bind(this);    
    this.selectCityFromSuggesstions = this.selectCityFromSuggesstions.bind(this);
    this.deriveCityFromLatLng = this.deriveCityFromLatLng.bind(this);
    this.locateMe = this.locateMe.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.getDataFromMap = this.getDataFromMap.bind(this);
  }

  componentDidMount() {
    const { getGeoShippingData, getCitiesByCountryCode } = this.props;
    getCitiesByCountryCode(cookies.get('country'));
    getGeoShippingData();
    if (Number(window.sessionStorage.getItem('TiLaLocation')) !== 1) {
      this.locateMe(); 
    }
    if (!window.sessionStorage.getItem('TiLaLocation')) {
      window.sessionStorage.setItem('TiLaLocation', 1);
    }
    document.addEventListener('click', this.handleOutsideClick, false);
  }

  componentWillReceiveProps(nextProps) {
    const { geoShippingData } = nextProps;
    if (this.props.geoShippingData.city !== geoShippingData.city) {
      this.setState({
        displayCity: geoShippingData.displayCity,
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick, false);
  }
  onChangeCity(e) {
    const { autoCompleteCity, getAllCities } = this.props;
    const displayCity = e.target.value;
    this.setState({
      displayCity,
      showCitiesData: true,
      showLocationBlockMsg: false,
    });
    autoCompleteCity(e.target.value);
  }

  setCity(city, country, displayCity) {
    this.props.setCity({
      city,
      country,
      displayCity,
    }).then(() => {
      Router.pushRoute(`${window.location.pathname}${window.location.search}`)
    });
  }

  mouseOver = (e) => {
    const searchValue = e.target.getAttribute('data-id');
    this.setState({
      displayCity: searchValue,
    });
  }
  locateMe(e) {
    const param = e !== undefined  && e.target && e.target.getAttribute('data-val');
    this.setState({
      detectLocationVal: param,
    });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        this.setState({
          center: {
            lat, lng,
          },
        });
        this.deriveCityFromLatLng(lng, lat);
      }, (error) => {
        console.log(error);
        param ? this.openToast() : this.openModal();
      });
    } else {
      alert('Browser does not support');
    }
  }

  fetchCountryName = data => data && data.reduce((obj, curr) => {
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

  deriveCityFromLatLng = (lng, lat) => {
    const { deriveCity } = this.props;
    deriveCity({
      longitude: lng,
      latitude: lat,
      api: '/geocode/json',
    }).then((res) => {
      if (res.value) {
        const cityCountryObj = this.fetchCountryName(res.value.address_components);

        cityCountryObj.address = res.value.formatted_address;
        localStorage.setItem('allowedLocation', true); 

        this.getDataFromMap({
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

  getDataFromMap(json) {
    const {
      lat, lng, cityCountryObj: {
        country, address, postal_code, city,
      },
    } = json;
    const { getCitiesByCountryCode, getAllDefaultCities } = this.props;
    for (let i = 0; i < getAllDefaultCities.length; i += 1) {
      if(getAllDefaultCities[i].city_name === city) {
        const city = getAllDefaultCities[i].city_code;  
        this.setState({
          displayCity: getAllDefaultCities[i].city_name,
        }, () => {
          this.setCity(city, country, this.state.displayCity);
       });
        break;
      } else {
        this.setState({
          showModal: true,
        })
      }
    }
  }

  openModal = () => {
    this.setState({
      showModal: true,
      showServingLocations: true,
    })
  }

  openToast = () => {
    this.setState({
      showLocationBlockMsg: true,
    });
  }

  selectCityFromSuggesstions(e) {
    const city = e.currentTarget.getAttribute('data-code');
    const displayCity = e.currentTarget.getAttribute('data-id');
    const country = cookies.get('country');
    this.setState({
      displayCity,
      showCitiesData: false,
    });
    this.setCity(city, country, displayCity);
  }
  handleOutsideClick(event) {
    const { target } = event;
    if (this.filterRef && target !== this.filterRef && !this.filterRef.contains(target)) {
      this.setState({
        showCitiesData: false,
      });
    }
  }
  deleteCity() {
    this.setState({
      displayCity: '',
    });
    this.props.removeCity().then(() => {
      Router.pushRoute(`${window.location.pathname}${window.location.search}`)
    });
  }

  closeModal = () => {
    const { detectLocationVal } = this.state;
    const { getAllDefaultCities } = this.props;
    for (let i = 0; i < getAllDefaultCities.length; i += 1) {
      if(getAllDefaultCities[i].city_name === 'Riyadh') {
        const city = getAllDefaultCities[i].city_code;
        const country = cookies.get('country');
        this.setState({
          displayCity: getAllDefaultCities[i].city_name,
        }, () => {
           this.setCity(city, country, this.state.displayCity);
        });
      } break;
    }
    this.setState({
      showModal: false,
    });
  }

  render() {
    const {
      geoShippingData, hideLabel, getAllCities, isPdp,
    } = this.props;
    const { showCitiesData, showModal, showServingLocations, showLocationBlockMsg } = this.state;
    return (
      <div className={`${styles['flex-center']} ${styles['delovery-inn']} ${styles['pr-5']}`}>
        {
          (!hideLabel)
            ?
              <span className={`${styles['flex-center']} ${styles['delivery-part']}`}>
                <SVGCompoent clsName={`${styles['map-icon']}`} src="icons/common-icon/black-map-location" />
                <span className={`${styles.fontW600} ${styles['pl-5']} ${styles['pr-5']}`}>{SEARCH_PAGE.DELIVER_TO}:</span>
              </span>
            :
            null
        }
        <div
          className={`${styles['auto-suggestions-wrap']} ${styles['flex']} ${styles['justify-flex-end']}`}
          ref={(el) => { this.filterRef = el; }}
        >
          <Dropdown id="search-toggle">
            <Dropdown.Toggle id="dropdown-custom-components">
              <input
                type="text"
                value={this.state.displayCity}
                className={`${styles['fs-14']} ${styles['delivery-input']} ${isPdp ? styles['pdp-border-btm'] : ''}`}
                // onInput={this.onChangeCity}
                onChange={this.onChangeCity}
                style={{ width: `${this.state.displayCity && this.state.displayCity.length * 8}px` }}
                contentEditable
              />
            </Dropdown.Toggle>
            <Dropdown.Menu className={`${styles['p-0']} ${styles['m-0']} ${styles['auto-suggestions-list']}`}>
            {showLocationBlockMsg ? <div className={`${styles['block-location-msg']} ${styles['thick-red-clr']} ${styles['p-10']}`}>You have blocked TiLa from tracking your Location. To use this, change your location settings in browser</div> : ''}
            {!localStorage.getItem('allowedLocation') && !showLocationBlockMsg && showCitiesData && this.state.displayCity === '' &&
            <div className={`${styles['detect-location']} ${styles['margin-5']}`}>
            <span className={`${styles.flex}`}>
                <SVGCompoent clsName={`${styles['location-icon']}`} src="icons/common-icon/icon-locate-me" />
                <div className={`${styles['flex']} ${styles['pl-5']} ${styles.pointer}`} data-val="detect" onClick={this.locateMe}>{SEARCH_PAGE.DETECT_LOCATION}</div>
                </span>
                <div className={`${styles['border-b']} ${styles['margin-5']}`}></div>
                <div className={`${styles.flex} ${styles['fs-12']} ${styles['thick-gry-clr']}`}>{SEARCH_PAGE.SELECT_CITY_BELOW}</div>
                </div>
                }
              {!showLocationBlockMsg && showCitiesData && getAllCities.length > 0 ? getAllCities.map((value, index) => (
                <MenuItem data-id={value.city_name} data-code={value.city_code} onClick={this.selectCityFromSuggesstions} onFocus={this.mouseOver} eventKey={index + 1} key={value.city_name}>
                  <a className={`${styles['black-color']}`}>
                      <span>{value.city_name}</span>
                    </a>
                </MenuItem>)) :
                showCitiesData && !showLocationBlockMsg &&
                <div className={`${styles['margin-5']}`}>
                <div className={`${styles['thick-red-clr']} ${styles['flex']} ${styles['justify-center']}`}>{SEARCH_PAGE.NO_MATCHING_SAUDI_CITY}</div>
                {!localStorage.getItem('allowedLocation') && <div className={`${styles['border-b']} ${styles['margin-5']}`}></div>}
                {!localStorage.getItem('allowedLocation') &&
                <span className={`${styles.flex} ${styles['justify-center']}`}>
                <SVGCompoent clsName={`${styles['location-icon']}`} src="icons/common-icon/icon-locate-me" />
                <div className={`${styles['flex']} ${styles['justify-center']} ${styles['pl-5']} ${styles.pointer}`} data-val="detect" onClick={this.locateMe}>{SEARCH_PAGE.DETECT_LOCATION}</div>                
                </span>}
                </div>           
              }
            </Dropdown.Menu>
          </Dropdown>
          {
            this.state.displayCity
              &&
                <div onClick={this.deleteCity} className={styles['delete-btn']}>
                  <img className={styles['img-responsive']} src={"/static/img/bg-img/delivery-remove-icon.png"} />
                </div>
          }
           <Modal
            show={showModal}
            onHide={this.closeModal}
            className={styles.modalClassName}
          >
          <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']}`}>
            <Modal.Body>
             {!showServingLocations && <div className={`${styles['fs-20']} ${styles['fontW800']}`}>{SEARCH_PAGE.PLEASE_SELECT_LOCATION_WITHIN_SAUDI}</div>}
             {showServingLocations && <div className={`${styles['fs-20']} ${styles['fontW800']}`}>{SEARCH_PAGE.WE_ARE_SERVING_WITHIN_SAUDI}</div>}
            </Modal.Body>
            <div className={`${styles['mt-20']} `}>
            <Button
             className={`${styles.buttonStyle} ${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['m-10']} ${styles['left-radius']}`}
             btnText={SEARCH_PAGE.OKAY}
             onClick={this.closeModal}
            />
            </div>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  geoShippingData: selectors.getDeliveryCity(store),
  getAllCities: productSelectors.getAllCities(store),
  getAllDefaultCities: productSelectors.getAllDefaultCities(store),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      deriveCity: actionCreators.deriveCity,
      setCity: actionCreators.setCity,
      autoCompleteCity: productActionCreators.autoCompleteCity,
      getCitiesByCountryCode: productActionCreators.getCitiesByCountryCode,
      removeCity: actionCreators.removeCity,
      getGeoShippingData: actionCreators.getGeoShippingData,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(GeoWidget);