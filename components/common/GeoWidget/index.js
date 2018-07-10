import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { actionCreators, selectors } from '../../../store/auth';
import SVGCompoent from '../SVGComponet';
import { languageDefinations } from '../../../utils/lang';

import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/common/GeoWidget/geoWidget');

const { SEARCH_PAGE } = languageDefinations();

class GeoWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.geoShippingData
    }
    this.deriveCity = this.deriveCity.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.autoCompleteCity = _.debounce(this.autoCompleteCity.bind(this), 300);
    this.selectCityFromSuggesstions = this.selectCityFromSuggesstions.bind(this);
  }

  componentDidMount() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.deriveCity);
    }
  }

  componentWillReceiveProps(nextProps) {
    // this.setState({
    //   ...nextProps.geoShippingData
    // })
  }

  onChangeCity(e) {
    const displayCity = e.target.value;
    this.setState({
      displayCity
    });
    this.autoCompleteCity(displayCity);
  }

  autoCompleteCity(city) {
    this.props.autoCompleteCity({
      input: city
    });
  }

  setCity(city, country, displayCity) {
    this.props.setCity({
      city,
      country,
      displayCity,
    });
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
    const { autoCompleteCityData, resetAutoCompleteData } = this.props;
    const selectedCity = _.find(autoCompleteCityData, { displayCity: e.target.getAttribute('data-id') });
    const { city, country, displayCity } = selectedCity;
    resetAutoCompleteData();
    this.setState({
      displayCity: selectedCity.displayCity
    });
    this.setCity(city, country, displayCity);
  }

  render() {
    const { autoCompleteCityData, geoShippingData } = this.props;
    const { displayCity } = geoShippingData;
    const { displayCity: stateDisplayCity } = this.state;
    return (
      <div className={`${styles['flex-center']} ${styles['delovery-inn']}`}>
        <span className={`${styles['flex-center']} ${styles['delivery-part']}`}>
          <SVGCompoent clsName={`${styles['map-icon']}`} src="icons/common-icon/black-map-location" />
          <span className={`${styles['fontW600']} ${styles['pl-5']} ${styles['pr-10']}`}>{SEARCH_PAGE.DELIVER_TO} :</span>
        </span>
        <div className={styles['auto-suggestions-wrap']}>
          <input type="text" value={stateDisplayCity  || stateDisplayCity === '' ? stateDisplayCity : displayCity} onChange={this.onChangeCity} onFocus={this.onFocusCity}/>
          <div className={styles['auto-suggestions']}>
            {
              autoCompleteCityData.map((result) => <div key={result.displayCity} data-id={result.displayCity} onClick={this.selectCityFromSuggesstions} className={styles['item']}>{result.displayCity}</div>)
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  geoShippingData: selectors.getDeliveryCity(store),
  autoCompleteCityData: selectors.getAutoCompleteCityData(store)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      deriveCity: actionCreators.deriveCity,
      setCity: actionCreators.setCity,
      autoCompleteCity: actionCreators.autoCompleteCity,
      resetAutoCompleteData: actionCreators.resetAutoCompleteData,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(GeoWidget);
