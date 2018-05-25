import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import ShippingAddress from '../../Cam/ShippingAddress';

import Voucher from './paymentpages/Voucher';
import RewardPoints from './paymentpages/RewardPoints';
import PayOnline from './paymentpages/PayOnline';

import styles from '../payment.styl';

const PaymentMode = props => {

  //NOTE: For every new payment type, 
  //      we need to create one page under "paymentpages" folder and add one key vale pair here.
  const paymentPageConfig = {
    "VOUCHER": Voucher,
    "REWARD_POINTS": RewardPoints,
    "PAY_ONLINE": PayOnline
  }

  const paymentTypeNames = {
    "VOUCHER": "Voucher",
    "REWARD_POINTS": "Reward Points",
    "PAY_ONLINE": "Pay Online"
  }

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
      <div className={`${props.configJson.progress ? '' : 'hide'}`}>
      {
        props.data && props.data.orderRes ?
          <div>
            <h3>Make Payment</h3>
            <Row>
              <Col md={3} sm={12} xs={12}>
                <ul className={` ${styles['pay-menu']} ${styles['m-0']} ${styles['p-5']} ${styles['pr-0']}`}>
                  {
                    props.data.data.payment_options_available.map((val, index) => {
                      return (
                        <li id={index} key={index} onClick={showPaymentType} className={`${index == props.showTab ? styles['active'] : ''}`}>{paymentTypeNames[val.type]}</li>
                      )
                    })
                  }
                </ul>
              </Col>
              <Col md={9} sm={12} xs={12}>
                {
                  props.data.data.payment_options_available.map((val, index) => {
                    const Page = paymentPageConfig[val.type];
                    return (
                      <div key={index} className={`${props.showTab == index ? '' : 'hide'}`}>
                        <Page
                          makePayment={makePayment}
                          orderRes={props.data}
                        />
                      </div>
                    )
                  })
                }
              </Col>
            </Row>
          </div>
          : <div>Loading...</div>
        }
      </div>
    </div>
  );
};

PaymentMode.propTypes = {
  data: PropTypes.object.isRequired,
  showPaymentType: PropTypes.func.isRequired,
  // showTab: PropTypes.string
}

PaymentMode.defaultProps = {
  data: {}
}

export default PaymentMode;

