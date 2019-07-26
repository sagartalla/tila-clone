import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dropdown, MenuItem } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { Router } from '../../../routes';
import _ from 'lodash';
import Cookie from 'universal-cookie';
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
      ...props.geoShippingData,
      ...shippingInfo,
      showCitiesData: false,
    };
    this.deriveCity = this.deriveCity.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.selectCityFromSuggesstions = this.selectCityFromSuggesstions.bind(this);
    this.deleteCity = this.deleteCity.bind(this);
    // this.locateMe = this.locateMe.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentDidMount() {
    const { getCitiesByCountryCode } = this.props;
    getCitiesByCountryCode(cookies.get('country'));
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
  // locateMe() {
  //   const shippingInfo = cookies.get('shippingInfo');
  //   if (navigator.geolocation && !shippingInfo) {
  //     navigator.geolocation.getCurrentPosition(this.deriveCity);
  //   }
  // }

  deriveCity(position) {
    const { longitude, latitude } = position.coords;
    this.props.deriveCity({
      longitude,
      latitude,
      api: '/geocode/json',
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
      displayCity: null,
    });
    this.props.removeCity().then(() => {
      Router.pushRoute(`${window.location.pathname}${window.location.search}`)
    });
  }

  render() {
    const {
      geoShippingData, hideLabel, getAllCities, isPdp,
    } = this.props;
    const { showCitiesData } = this.state;
    return (
      <div className={`${styles['flex-center']} ${styles['delovery-inn']}`}>
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
          className={`${styles['auto-suggestions-wrap']}`}
          ref={(el) => { this.filterRef = el; }}
        >
          <Dropdown id="search-toggle">
            <Dropdown.Toggle id="dropdown-custom-components">
              <input
                type="text"
                value={this.state.displayCity}
                className={`${styles['fs-14']} ${styles['delivery-input']} ${isPdp ? styles['pdp-border-btm'] : ''}`}
                onChange={this.onChangeCity}
              />
            </Dropdown.Toggle>
            <Dropdown.Menu className={`${styles['p-0']} ${styles['m-0']} ${styles['auto-suggestions-list']}`}>
              {showCitiesData && getAllCities.map((value, index) => (
                <MenuItem data-id={value.city_name} data-code={value.city_code} onClick={this.selectCityFromSuggesstions} onFocus={this.mouseOver} eventKey={index + 1} key={value.city_name}>
                  <a className={`${styles['black-color']}`}>
                      <span>{value.city_name}</span>
                    </a>
                </MenuItem>))
              }
            </Dropdown.Menu>
          </Dropdown>
          {
            this.state.displayCity
              &&
                <div onClick={this.deleteCity} className={styles['delete-btn']}>x</div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  geoShippingData: selectors.getDeliveryCity(store),
  getAllCities: productSelectors.getAllCities(store),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      deriveCity: actionCreators.deriveCity,
      setCity: actionCreators.setCity,
      autoCompleteCity: productActionCreators.autoCompleteCity,
      getCitiesByCountryCode: productActionCreators.getCitiesByCountryCode,
      removeCity: actionCreators.removeCity,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(GeoWidget);
