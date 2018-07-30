import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import ShippingAddress from '../../Cam/ShippingAddress';
import SVGComponent from '../../common/SVGComponet';
import Voucher from './paymentpages/Voucher';
import RewardPoints from './paymentpages/RewardPoints';
import PayOnline from './paymentpages/PayOnline';
import GiftCard from './paymentpages/GiftCard';
import NetBanking from './paymentpages/NetBanking';
import CashOnDelivery from './paymentpages/CashOnDelivery';

import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Payments/payment');

const PaymentMode = props => {

  //NOTE: For every new payment type, 
  //      we need to create one page under "paymentpages" folder and add one key vale pair here.
  const paymentPageConfig = {
    "VOUCHER": Voucher,
    "REWARD_POINTS": RewardPoints,
    "PAY_ONLINE": PayOnline,
    "GIFT_CARD": GiftCard,
    "NET_BANKING": NetBanking,
    "CASH_ON_DELIVERY":CashOnDelivery
  }

  // const paymentTypeNames = {
  //   "VOUCHER": "Voucher",
  //   "REWARD_POINTS": "Reward Points",
  //   "PAY_ONLINE": "Pay Online",
  //   "GIFT_CARD": GiftCard,
  //   "NET_BANKING": NetBanking,
  //   "CASH_ON_DELIVERY":Cod
  // }

  const showPaymentType = (e) => {
    props.showPaymentType(e.target.id);
  }

  const makePayment = (e) => {
    props.makePayment();
  }

  return (
    <div className={`${styles['pb-15']} ${styles['pt-15']} ${styles['pl-35']} ${styles['pr-35']} ${styles['box']} ${styles['mb-20']} ${styles['relative']}`}>
      <SVGComponent clsName={`${styles['payment-icon']} ${props.configJson.progress ? 'payment-active' : ''}`} src="icons/payment-icon/payment-icon" />
      <Row className={`${props.configJson.basic ? '' : 'hide'}`}>
        <Col md={12} sm={12} xs={12}>
          <h4 className={styles['m-0']}>Make Payment</h4>
          <p className={styles['mb-0']}>
            <small>Net banking, credit card, vouchers and etc....</small>
          </p>
        </Col>
      </Row>
      <div className={`${props.configJson.progress ? '' : 'hide'}`}>
      {
        props.data && props.data.orderRes ?
          <div>
            <h4 className={`${styles['m-0']} ${styles['mb-10']}`}>Make Payment</h4>
            <Row>
              <Col md={3} sm={12} xs={12}>
                <ul className={` ${styles['pay-menu']} ${styles['m-0']} ${styles['p-5']} ${styles['pr-0']}`}>
                  {
                    props.data.data.payment_options_available.map((val, index) => {
                      return (
                        <li id={index} key={index} onClick={showPaymentType} className={`${index == props.showTab ? styles['active'] : ''}`}>{val.display_name}</li>
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

