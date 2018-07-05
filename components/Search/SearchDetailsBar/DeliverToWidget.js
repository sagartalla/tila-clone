import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators, selectors } from '../../../store/auth';
import SVGCompoent from '../../common/SVGComponet';

import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Search/search');

class DeliverToWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.deriveCity = this.deriveCity.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
  }

  componentDidMount() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.deriveCity);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      city: nextProps.city
    });
  }

  onChangeCity(e) {
    this.props.setCity({city: e.target.value});
  }

  deriveCity(position) {
    const { longitude, latitude } = position.coords;
    this.props.deriveCity({
      longitude,
      latitude,
      api: '/geocode/json',
    });
  }

  render() {
    const { city } = this.state;
    return (
      <div className={`${styles['flex-center']} ${styles['delovery-inn']}`}>
        <span className={`${styles['flex-center']} ${styles['delivery-part']}`}>
          <SVGCompoent clsName={`${styles['map-icon']}`} src="icons/common-icon/black-map-location" />
          <span className={`${styles['fontW600']} ${styles['pl-5']} ${styles['pr-10']}`}>Deliver to :</span>
        </span>
        <input type="text" value={city} onChange={this.onChangeCity}/>
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  city: selectors.getCity(store)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      deriveCity: actionCreators.deriveCity,
      setCity: actionCreators.setCity
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(DeliverToWidget);
