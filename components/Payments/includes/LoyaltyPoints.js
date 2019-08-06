import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import SVGComponent from '../../common/SVGComponet';
import { languageDefinations } from '../../../utils/lang/';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../payment_en.styl';
import styles_ar from '../payment_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const { PAYMENT_PAGE } = languageDefinations();

class LoyaltyPoints extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { configJson, editLoyalityTab, handleLoyaltyBtn } = this.props;
    return (
      <div className={`${styles['pb-15']} ${styles['pt-15']} ${styles['box']} ${styles['mb-20']} ${styles['relative']} ${styles['pay-loyalty-main']}`}>
        <SVGComponent clsName={`${styles['payment-icon']} ${configJson.done ? 'done' : ''} ${configJson.progress ? 'payment-active' : ''}`} src="icons/common-icon/pay-loyalty" />
        <div className={`${configJson.basic || configJson.done ? '' : 'hide'} ${styles['flex-center']} ${styles['pay-loyalty-main-inn']}`}>
          <Col md={10} sm={12} xs={12} className={styles['pl-0']}>
            <h4 className={styles['m-0']}>Pay With Loyalty Points</h4>
            <small>Pay With Loyalty Points</small>
          </Col>
          {/* <Col md={2} sm={12} xs={12} className={`${configJson.done ? '' : 'hide'} ${styles['t-rt']} ${styles['pl-0']}`}>
            <button className={`${styles['fp-btn']} ${styles['fp-btn-default']} ${styles['text-uppercase']}`} onClick={editLoyalityTab}>
              EDIT
            </button>
          </Col> */}
        </div>

        <div className={`${configJson.progress ? '' : 'hide'} ${styles['pb-5']} ${styles['pt-5']} ${styles['loyalty-points-inn']}`}>
          <h4 className={styles['m-0']}>Pay With Loyalty Points</h4>
          <div className={`${styles['flex']} ${styles['pt-30']} ${styles['pb-30']} ${styles['m-flx-wrap']}`}>
            <Col md={2} xs={6} className={styles['pl-0']} >
              <div className={`${styles['pay-loyalty-inn']}`}>
                <h5 className={`${styles['t-c']} ${styles['thick-gry-clr']}`}>ADCB</h5>
                <div className={`${styles['pay-loyalty']} ${styles['flex-center']} ${styles['justify-center']} ${styles['p-15']}`}>
                  <img className={styles['img-responsive']} src={"/static/img/payment-images/abcd.png"} />
                </div>
              </div>
            </Col>
            <Col md={2} xs={6} className={styles['pl-0']}>
              <div className={`${styles['pay-loyalty-inn']}`}>
                <h5 className={`${styles['t-c']} ${styles['thick-gry-clr']}`}>Mashreq</h5>
                <div className={`${styles['pay-loyalty']} ${styles['flex-center']} ${styles['justify-center']} ${styles['p-15']}`}>
                  <img className={styles['img-responsive']} src={"/static/img/payment-images/mashreq_logo.png"} />
                </div>
              </div>
            </Col>
            <Col md={2} xs={6} className={styles['pl-0']}>
              <div className={`${styles['pay-loyalty-inn']}`}>
                <h5 className={`${styles['t-c']} ${styles['thick-gry-clr']}`}>SABB</h5>
                <div className={`${styles['pay-loyalty']} ${styles['flex-center']} ${styles['justify-center']} ${styles['p-15']}`}>
                  <img className={styles['img-responsive']} src={"/static/img/payment-images/sabb.png"} />
                </div>
              </div>
            </Col>
            <Col md={2} xs={6} className={styles['pl-0']}>
              <div className={`${styles['pay-loyalty-inn']}`}>
                <h5 className={`${styles['t-c']} ${styles['thick-gry-clr']}`}>Al Rajhi Bank</h5>
                <div className={`${styles['pay-loyalty']} ${styles['flex-center']} ${styles['justify-center']} ${styles['p-15']}`}>
                  <img className={styles['img-responsive']} src={"/static/img/payment-images/Al-bank.png"} />
                </div>
              </div>
            </Col>
            <Col md={2} xs={6} className={styles['pl-0']}>
              <div className={`${styles['pay-loyalty-inn']}`}>
                <h5 className={`${styles['t-c']} ${styles['thick-gry-clr']}`}>Emirates NBD</h5>
                <div className={`${styles['pay-loyalty']} ${styles['flex-center']} ${styles['justify-center']} ${styles['p-15']}`}>
                  <img className={styles['img-responsive']} src={"/static/img/payment-images/emirates.png"} />
                </div>
              </div>
            </Col>
            <Col md={2} xs={6} className={styles['pl-0']}>
              <div className={`${styles['pay-loyalty-inn']}`}>
                <h5 className={`${styles['t-c']} ${styles['thick-gry-clr']}`}>Air Miles</h5>
                <div className={`${styles['pay-loyalty']} ${styles['flex-center']} ${styles['justify-center']} ${styles['p-15']}`}>
                  <img className={styles['img-responsive']} src={"/static/img/payment-images/airmiles.png"} />
                </div>
              </div>
            </Col>

          </div>

        </div>
        <div className={`${configJson.progress ? '' : 'hide'} ${styles['flex']} ${styles['pt-15']} ${styles['pl-35']} ${styles['flex']} ${styles['m-pd-l-0']} ${styles['offers-bottom']}`}>
          <Col md={12} xs={12} className={`${styles['pl-0']} ${styles['m-pd-r-0']} ${styles['m-loyalty-btm']}`}>
            <button className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['fp-btn-x-large']} ${styles['mr-20']} ${styles['cont-btn']}`} onClick={handleLoyaltyBtn}>
              CONTINUE
              </button>
            <button className={`${styles['fp-btn']} ${styles['fp-btn-default']} ${styles['skip-btn']}`} onClick={handleLoyaltyBtn}>
              SKIP THIS STEP
              </button>
          </Col>
        </div>
      </div>
    );
  }
}

export default LoyaltyPoints;
