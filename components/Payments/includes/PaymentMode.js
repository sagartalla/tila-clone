import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import ShippingAddress from '../../Cam/ShippingAddress';

import styles from '../payment.styl';

const PaymentMode = props => {

  const showPaymentType = (e) => {
    props.showPaymentType(e.target.id);
  }

  const makePayment = (e) => {
    props.makePayment();
  }

  return (
    <div className={`${styles['p-24']} ${styles['box']} ${styles['mb-20']}`}>
      <Row className={`${props.configJson.basic ? '' : 'hide'}`}>
        <Col md={12} sm={12} xs={12}>
          <h3 className={styles['m-0']}>Make Payment</h3>
          <p>
            Net banking, credit card, vouchers and etc..
          </p>
        </Col>
      </Row>
      {
         props.data && props.data.orderRes ? 
          <div>
            <h3>Make Payment</h3>
              <Row>
                <Col md={3} sm={12} xs={12}>
                  <ul className={` ${styles['pay-menu']} ${styles['m-0']} ${styles['p-5']} ${styles['pr-0']}`}>
                    {
                      props.data.data.paymentOptionsAvailable.map( (val, index) => {
                        return (
                          <li id={index} key={index} onClick={showPaymentType} className={`${ index == props.showTab ? styles['active']: ''}`}>{val.type}</li>
                        )
                      })
                    }
                  </ul>
                </Col>
                <Col md={9} sm={12} xs={12}>
                  {
                    props.data.data.paymentOptionsAvailable.map( (val, index) => {
                      return (
                        <div key={index} className={`${props.showTab == index ? '': 'hide' }`}>
                          <span>{val.type + ' - ' +val.balance}</span>
                        </div>
                      )
                    })
                  }
                </Col>
              </Row>
              <Row>
                <Col md={12} sm={12} xs={12}>
                  <button className={`${styles['fp-btn']} ${styles['fp-btn-primary']}`} onClick={makePayment}>Pay 2200 AED</button>
                </Col>
              </Row>
          </div>
         : null
      }

    </div>
  );
};

PaymentMode.propTypes = {
  data: PropTypes.object.isRequired
}

PaymentMode.defaultProps = {
  data: {}
}


export default PaymentMode;

