import React from 'react';
import propTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import ShippingAddress from '../../Cam/ShippingAddress';

import styles from '../payment.styl';

const DeliveryAddress = props => (
  <ShippingAddress 
    handleShippingAddressContinue = {props.handleShippingAddressContinue}
  />
);

DeliveryAddress.propTypes = {
  handleShippingAddressContinue: propTypes.func.isRequired
}

DeliveryAddress.defaultProps = {

}

export default DeliveryAddress;

