import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators, selectors } from '../../../store/auth';

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
    this.state = {
      ...nextProps
    }
  }

  onChangeCity(e) {
    this.props.setCity(e.target.value);
  }

  deriveCity(position) {
    this.props.deriveCity({
      ...position.coords,
      api: '/geocode/json',
    });
  }

  render() {
    const { city } = this.state;
    return (
      <div>
        <label> Deliver to: </label>
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
