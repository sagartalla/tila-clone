import React from 'react';
import PropTypes from 'prop-types';
import { languageDefinations } from '../../../utils/lang/';
import { Grid, Row, Col } from 'react-bootstrap';
import ShippingAddress from '../../Cam/ShippingAddress';

import styles from '../payment.styl';

const DeliveryAddress = props => {
  const { configJson, defaultAddress, handleShippingAddressContinue, editAddress } = props;
  const { DELIVERY_ADDR_PAGE } = languageDefinations();
  return (
    <div className={`${styles['p-24']} ${styles['box']} ${styles['mb-20']}`}>
      <Row className={`${configJson.basic || configJson.done ? '' : 'hide'}`}>
        <Col md={6} sm={12} xs={12}>
          <h4 className={styles['m-0']}>{DELIVERY_ADDR_PAGE.DELIVERY_ADDR}</h4>
          <p>
            <small>{DELIVERY_ADDR_PAGE.SUB_TAG}</small>
          </p>
        </Col>
        <Col md={4} sm={12} xs={12} className={`${configJson.done ? '' : 'hide'} ${styles['t-rt']}`}>
          {
            defaultAddress && defaultAddress.length > 0 ?
              <div>
                <div>{defaultAddress[0].first_name + ' ' + defaultAddress[0].last_name} </div>
                <small>
                  {defaultAddress[0].address_line_1 + ', ' + defaultAddress[0].address_line_2 + ', ' + defaultAddress[0].city}
                </small>
              </div>
              : null
          }
        </Col>
        <Col md={2} sm={12} xs={12} className={`${configJson.done ? '' : 'hide'} ${styles['t-rt']}`}>
          <button className={`${styles['fp-btn']} ${styles['fp-btn-default']}`} onClick={editAddress}>
            {DELIVERY_ADDR_PAGE.EDIT}
          </button>
        </Col>
      </Row>
      {
        configJson.progress ?
          <div>
            <h4 className={`${styles['mb-20']} ${styles['mt-0']}`}>{DELIVERY_ADDR_PAGE.DELIVERY_ADDR}</h4>
            <ShippingAddress
              handleShippingAddressContinue={handleShippingAddressContinue}
            />
          </div>
          : null
      }
    </div>

  );
}

DeliveryAddress.propTypes = {
  handleShippingAddressContinue: PropTypes.func.isRequired,
  editAddress: PropTypes.func.isRequired,
  configJson: PropTypes.object.isRequired,
  // defaultAddress: propTypes.object
}

DeliveryAddress.defaultProps = {
  configJson: {}
}

export default DeliveryAddress;

