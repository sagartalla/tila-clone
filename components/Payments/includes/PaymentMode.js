import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import Voucher from './paymentpages/Voucher';
import GiftCard from './paymentpages/GiftCard';
import SVGComponent from '../../common/SVGComponet';
import PayOnline from './paymentpages/PayOnline';
import NetBanking from './paymentpages/NetBanking';
import RewardPoints from './paymentpages/RewardPoints';
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
    "CASH_ON_DELIVERY": CashOnDelivery
  }

  const paymentPageIcons = {
    "VOUCHER": '',
    "REWARD_POINTS": '',
    "PAY_ONLINE": 'credit-card',
    "GIFT_CARD": 'gift-card',
    "NET_BANKING": 'netbanking',
    "CASH_ON_DELIVERY": 'cash-on-drt'
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
    props.showPaymentType(e.currentTarget.id);
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
                  <ul className={` ${styles['pay-menu']} ${styles['m-0']} ${styles['pl-5']} ${styles['pt-5']}`}>
                    {
                      props.data.data.payment_options_available.map((val, index) => {
                        return (
                          <li id={index} key={index} onClick={showPaymentType} className={`${index == props.showTab ? styles['active'] : ''} ${styles['flex-center']} ${styles['payment-lists']}`}>
                            <SVGComponent clsName={`${styles['make-paymrnt-icon']}`} src={"icons/cards-icons-list/" + paymentPageIcons[val.type]} />
                            {/* <img src={"/static/img/icons/cards-icons-list/" + paymentPageIcons[val.type]} /> */}
                            <span className={styles['pl-10']}>{val.display_name}</span>
                          </li>
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
                            saveCard={props.saveCard}
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

