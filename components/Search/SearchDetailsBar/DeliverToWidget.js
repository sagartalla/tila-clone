import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class DeliverToWidget extends Component {
  componentDidMount() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(deriveCity);
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
    this.props.deriveCity(position.coords);
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
