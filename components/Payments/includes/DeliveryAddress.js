import React from 'react';
import propTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import ShippingAddress from '../../Cam/ShippingAddress';

import styles from '../payment.styl';

const DeliveryAddress = props => (
  
    <div className={`${styles['p-24']} ${styles['box']} ${styles['mb-20']}`}>
      <Row className={`${props.configJson.basic || props.configJson.done ? '' : 'hide'}`}>
        <Col md={6} sm={12} xs={12}>
          <h3 className={styles['m-0']}>Delivery Address</h3>
          <p>
            select a delivery address or create new address.
          </p>
        </Col>
        <Col md={4} sm={12} xs={12} className={`${props.configJson.done ? '' : 'hide'}`}>
          
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
        <Col md={2} sm={12} xs={12} className={`${props.configJson.done ? '' : 'hide'}`}>
          <button className={`${styles['fp-btn']} ${styles['fp-btn-default']}`} onClick={props.editAddress}>
            Edit
          </button>
        </Col>
      </Row>
      <div className={`${props.configJson.progress ? '' : 'hide'}`}>
        <h3 className={`${styles['m-0']} ${styles['pl-24']}`}>Delivery Address</h3>
        <ShippingAddress 
          handleShippingAddressContinue = {props.handleShippingAddressContinue}
        />
      </div>
    </div>
  
);

DeliveryAddress.propTypes = {
  handleShippingAddressContinue: propTypes.func.isRequired,
  editAddress: propTypes.func.isRequired,
  configJson: propTypes.object.isRequired,
  defaultAddress: propTypes.array
}

DeliveryAddress.defaultProps = {
  configJson:{}
}

export default DeliveryAddress;

