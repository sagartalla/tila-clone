import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import Cookie from 'universal-cookie';
import { selectors as productSelectors, actionCreators as productActionCreators } from '../../../store/product';
import { actionCreators, selectors } from '../../../store/auth';
import SVGCompoent from '../SVGComponet';
import { languageDefinations } from '../../../utils/lang';
import { mergeCss } from '../../../utils/cssUtil';

const styles = mergeCss('components/common/GeoWidget/geoWidget');

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
    // this.autoCompleteCity = this.autoCompleteCity.bind(this);
    this.selectCityFromSuggesstions = this.selectCityFromSuggesstions.bind(this);
    this.deleteCity = this.deleteCity.bind(this);
    this.locateMe = this.locateMe.bind(this);
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
      }, () => location.reload());
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
    });
  }

  locateMe() {
    const shippingInfo = cookies.get('shippingInfo');
    if (navigator.geolocation && !shippingInfo) {
      navigator.geolocation.getCurrentPosition(this.deriveCity);
    }
  }
  deriveCity(position) {
    const { longitude, latitude } = position.coords;
    this.props.deriveCity({
      longitude,
      latitude,
      api: '/geocode/json',
    });
  }

  selectCityFromSuggesstions(e) {
    // const { autoCompleteCityData } = this.props;
    const selectedCity = e.target.getAttribute('data-id');
    const city = e.target.getAttribute('data-code');
    const displayCity = e.target.getAttribute('data-id');
    const country = cookies.get('country');
    // resetAutoCompleteData();
    this.setState({
      displayCity: selectedCity,
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
    this.props.removeCity();
  }

  render() {
    const {
      geoShippingData, hideLabel, getAllCities, isLoading,
    } = this.props;
    const { showCitiesData } = this.state;
    console.log('showCitiesData', showCitiesData);
    console.log('getAllCities', getAllCities);
    console.log('isLoading', isLoading);
    console.log('this.state.displayCity', this.state.displayCity);
    return (
      <div className={`${styles['flex-center']} ${styles['delovery-inn']}`}>
        {
          (!hideLabel)
            ?
              <span className={`${styles['flex-center']} ${styles['delivery-part']}`}>
                <SVGCompoent clsName={`${styles['map-icon']}`} src="icons/common-icon/black-map-location" />
                <span className={`${styles.fontW600} ${styles['pl-5']} ${styles['pr-10']}`}>{SEARCH_PAGE.DELIVER_TO} :</span>

              </span>
            :
            null
        }
        <div
          className={styles['auto-suggestions-wrap']}
          ref={(el) => { this.filterRef = el; }}
        >
          <input type="text" value={isLoading ? 'Loading...' : this.state.displayCity} className={styles['fs-12']} onChange={this.onChangeCity} />
          {
            <div className={`${styles['auto-suggestions-list']}`}>
              {showCitiesData && getAllCities.map(result =>
              (
                <div
                  key={result.rescity_nameult}
                  className={`${styles['auto-suggestions']} ${styles['pt-5']} ${styles['pl-10']} ${styles['bg-white']}`}
                >
                  <div data-id={result.city_name} data-code={result.code} onClick={this.selectCityFromSuggesstions} className={`${styles.item} ${styles['fs-12']}`}>{result.city_name}</div>
                </div>
              ))}
            </div>
          }
          {
            this.state.displayCity
              ?
                <div onClick={this.deleteCity} className={styles['delete-btn']}>x</div>
              :
                <div onClick={this.locateMe} className={styles['delete-btn']}>
                <SVGCompoent clsName={`${styles['map-icon']}`} src="icons/locate-me" />
              </div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  geoShippingData: selectors.getDeliveryCity(store),
  // autoCompleteCityData: productSelectors.getAutoCompleteCityData(store),
  getAllCities: productSelectors.getAllCities(store),
  isLoading: productSelectors.isLoading(store),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      deriveCity: actionCreators.deriveCity,
      setCity: actionCreators.setCity,
      autoCompleteCity: productActionCreators.autoCompleteCity,
      // resetAutoCompleteData: actionCreators.resetAutoCompleteData,
      getCitiesByCountryCode: productActionCreators.getCitiesByCountryCode,
      removeCity: actionCreators.removeCity,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(GeoWidget);
