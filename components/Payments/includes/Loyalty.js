import React from 'react';
import PropTypes from 'prop-types';
import { languageDefinations } from '../../../utils/lang/';
import { Grid, Row, Col } from 'react-bootstrap';
import SVGComponent from '../../common/SVGComponet';
import ShippingAddress from '../../Cam/ShippingAddress';

import lang from '../../../utils/language';

import styles_en from '../payment_en.styl';
import styles_ar from '../payment_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;

const Loyalty = props => {
  const { configJson } = props;
  return (
    <div className={`${styles['box']} ${styles['mb-20']} ${styles['pay-loyalty-main']} ${styles['relative']}`}>
      <SVGComponent clsName={`${styles['map-address']}`} src="icons/map/address" />
      <h4 className={`${styles['mb-20']} ${styles['mt-0']}`}>Pay with Loyalty Points</h4>
      <Row>
        <Col md={2}>
          <div className={`${styles['pay-loyalty-inn']}`}>
            <h5 className={`${styles['t-c']} ${styles['thick-gry-clr']}`}>ADCB</h5>
            <div className={`${styles['pay-loyalty']} ${styles['flex-center']} ${styles['justify-center']} ${styles['p-15']}`}>
              <img className={styles['img-responsive']} src={"/static/img/payment-images/abcd.png"} />
            </div>
          </div>
        </Col>
        <Col md={2}>
          <div className={`${styles['pay-loyalty-inn']}`}>
            <h5 className={`${styles['t-c']} ${styles['thick-gry-clr']}`}>Mashreq</h5>
            <div className={`${styles['pay-loyalty']} ${styles['flex-center']} ${styles['justify-center']} ${styles['p-15']}`}>
              <img className={styles['img-responsive']} src={"/static/img/payment-images/mashreq_logo.png"} />
            </div>
          </div>
        </Col>
        <Col md={2}>
          <div className={`${styles['pay-loyalty-inn']}`}>
            <h5 className={`${styles['t-c']} ${styles['thick-gry-clr']}`}>SABB</h5>
            <div className={`${styles['pay-loyalty']} ${styles['flex-center']} ${styles['justify-center']} ${styles['p-15']}`}>
              <img className={styles['img-responsive']} src={"/static/img/payment-images/sabb.png"} />
            </div>
          </div>
        </Col>
        <Col md={2}>
          <div className={`${styles['pay-loyalty-inn']}`}>
            <h5 className={`${styles['t-c']} ${styles['thick-gry-clr']}`}>Al Rajhi Bank</h5>
            <div className={`${styles['pay-loyalty']} ${styles['flex-center']} ${styles['justify-center']} ${styles['p-15']}`}>
              <img className={styles['img-responsive']} src={"/static/img/payment-images/Al-bank.png"} />
            </div>
          </div>
        </Col>
        <Col md={2}>
          <div className={`${styles['pay-loyalty-inn']}`}>
            <h5 className={`${styles['t-c']} ${styles['thick-gry-clr']}`}>Emirates NBD</h5>
            <div className={`${styles['pay-loyalty']} ${styles['flex-center']} ${styles['justify-center']} ${styles['p-15']}`}>
              <img className={styles['img-responsive']} src={"/static/img/payment-images/emirates.png"} />
            </div>
          </div>
        </Col>
        <Col md={2}>
          <div className={`${styles['pay-loyalty-inn']}`}>
            <h5 className={`${styles['t-c']} ${styles['thick-gry-clr']}`}>Air Miles</h5>
            <div className={`${styles['pay-loyalty']} ${styles['flex-center']} ${styles['justify-center']} ${styles['p-15']}`}>
              <img className={styles['img-responsive']} src={"/static/img/payment-images/airmiles.png"} />
            </div>
          </div>
        </Col>
      </Row>

    </div>
  )
}

export default Loyalty;
