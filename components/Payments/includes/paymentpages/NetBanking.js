import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';

import { languageDefinations } from '../../../../utils/lang/';

import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../../payment_en.styl';
import styles_ar from '../../payment_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const { PAYMENT_PAGE } = languageDefinations();

const NetBanking = props => {
  const { PAYMENT_PAGE } = languageDefinations();
  return (
    <div className={`${styles['reward-points']}`}>
      <Row>
        <Col md={12} className={styles['pl-40']}>
          <h4 className={`${styles['fontW300']} ${styles['fs-20']} ${styles['lgt-blue']} ${styles['mt-0']} ${styles['pb-20']}`}>{PAYMENT_PAGE.INTERNET_BANKING}</h4>
          <div className={`${styles['flx-space-bw']} ${styles['netbanking-part']} ${styles['pb-30']}`}>
            <div className={`${styles['pay-loyalty-inn']}`}>
              <h5 className={`${styles['t-c']} ${styles['thick-gry-clr']}`}>{PAYMENT_PAGE.ABCD}</h5>
              <div className={`${styles['pay-loyalty']} ${styles['flex-center']} ${styles['justify-center']} ${styles['p-15']}`}>
                <img className={styles['img-responsive']} src={"/static/img/payment-images/abcd.png"} />
              </div>
            </div>
            <div className={`${styles['pay-loyalty-inn']}`}>
              <h5 className={`${styles['t-c']} ${styles['thick-gry-clr']}`}>{PAYMENT_PAGE.MASHREQ}</h5>
              <div className={`${styles['pay-loyalty']} ${styles['flex-center']} ${styles['justify-center']} ${styles['p-15']}`}>
                <img className={styles['img-responsive']} src={"/static/img/payment-images/mashreq_logo.png"} />
              </div>
            </div>
            <div className={`${styles['pay-loyalty-inn']}`}>
              <h5 className={`${styles['t-c']} ${styles['thick-gry-clr']}`}>{PAYMENT_PAGE.SABB}</h5>
              <div className={`${styles['pay-loyalty']} ${styles['flex-center']} ${styles['justify-center']} ${styles['p-15']}`}>
                <img className={styles['img-responsive']} src={"/static/img/payment-images/sabb.png"} />
              </div>
            </div>
            <div className={`${styles['pay-loyalty-inn']}`}>
              <h5 className={`${styles['t-c']} ${styles['thick-gry-clr']}`}>{PAYMENT_PAGE.AL_RAJHI_BANK}</h5>
              <div className={`${styles['pay-loyalty']} ${styles['flex-center']} ${styles['justify-center']} ${styles['p-15']}`}>
                <img className={styles['img-responsive']} src={"/static/img/payment-images/Al-bank.png"} />
              </div>
            </div>
            <div className={`${styles['pay-loyalty-inn']}`}>
              <h5 className={`${styles['t-c']} ${styles['thick-gry-clr']}`}>{PAYMENT_PAGE.EMIRATES_NBD}</h5>
              <div className={`${styles['pay-loyalty']} ${styles['flex-center']} ${styles['justify-center']} ${styles['p-15']}`}>
                <img className={styles['img-responsive']} src={"/static/img/payment-images/emirates.png"} />
              </div>
            </div>
          </div>
          <Col md={4} className={`${styles['pl-0']} ${styles['pt-10']} ${styles['pb-20']}`}>
            <h4 className={`${styles['fontW300']} ${styles['fs-20']} ${styles['lgt-blue']} ${styles['mt-0']} ${styles['pb-5']}`}>{PAYMENT_PAGE.MORE_BANKS}</h4>
            <div className={`${styles['select']}`}>
              <select className={`${styles['select-text']}`} required>
                <option value="" disabled selected></option>
                <option value="1"> {PAYMENT_PAGE.ABCD}</option>
                <option value="2">{PAYMENT_PAGE.SABB}</option>
                <option value="3">{PAYMENT_PAGE.AL_RAJHI_BANK}</option>
              </select>
              <span className={styles['select-highlight']}></span>
              <span className={styles['select-bar']}></span>
              <span className={styles['error']}></span>
            </div>
          </Col>
        </Col>
        <Col md={7} sm={12} xs={12} className={`${styles['pt-20']} ${styles['pb-20']} ${styles['pl-40']}`}>
          <button className={`${styles['fp-btn']} ${styles['fs-16']} ${styles['fontW600']} ${styles['fp-btn-primary']} ${styles['fp-btn-large']}`} onClick={props.makePayment}>{PAYMENT_PAGE.PAY} {props.orderRes.data.amount} {props.orderRes.data.currency}</button>
        </Col>
      </Row>
    </div>
  );
}

NetBanking.propTypes = {
  makePayment: PropTypes.func.isRequired,
}

NetBanking.defaultProps = {

}

export default NetBanking;
