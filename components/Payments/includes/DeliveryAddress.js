import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import ShippingAddress from '../../Cam/ShippingAddress';

import styles from '../payment.styl';

const DeliveryAddress = props => (
  
    <div className={`${styles['pt-24']} ${styles['pb-24']} ${styles['box']} ${styles['mb-20']}`}>
      <Row className={`${props.configJson.basic || props.configJson.done ? '' : 'hide'} ${styles['pl-24']}`}>
        <Col md={6} sm={12} xs={12}>
          <h4 className={styles['m-0']}>Delivery Address</h4>
          <p>
            <small>select a delivery address or create new address</small>
          </p>
        </Col>
        <Col md={4} sm={12} xs={12} className={`${props.configJson.done ? '' : 'hide'} ${styles['t-rt']}`}>
          
          {
            props.defaultAddress &&  props.defaultAddress.length > 0? 
            <div>
              <div>{props.defaultAddress[0].first_name +' '+props.defaultAddress[0].last_name} </div>
              <small>
                {props.defaultAddress[0].address_line_1 + ', ' + props.defaultAddress[0].address_line_2 +', '+ props.defaultAddress[0].city}
              </small>
            </div>
          :null
          }  
          
        </Col>
        <Col md={2} sm={12} xs={12} className={`${props.configJson.done ? '' : 'hide'} ${styles['t-rt']}`}>
          <button className={`${styles['fp-btn']} ${styles['fp-btn-default']}`} onClick={props.editAddress}>
            Edit
          </button>
        </Col>
      </Row>
      {
        props.configJson.progress ? 
        <div>
          <h4 className={`${styles['m-0']} ${styles['pl-24']}`}>Delivery Address</h4>
          <ShippingAddress 
            handleShippingAddressContinue = {props.handleShippingAddressContinue}
          />
        </div>
        : null
      }
    </div>
  
);

DeliveryAddress.propTypes = {
  handleShippingAddressContinue: PropTypes.func.isRequired,
  editAddress: PropTypes.func.isRequired,
  configJson: PropTypes.object.isRequired,
  // defaultAddress: propTypes.object
}

DeliveryAddress.defaultProps = {
  configJson:{}
}

export default DeliveryAddress;
