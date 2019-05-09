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

const GiftCard = props => {
  const { PAYMENT_PAGE } = languageDefinations();
  return (
    <div className={`${styles['reward-points']}`}>
      <Row>
        <Col md={7} className={styles['pl-40']}>
          <h4 className={`${styles['fontW300']} ${styles['fs-20']} ${styles['lgt-blue']} ${styles['mt-0']} ${styles['pb-20']}`}>{PAYMENT_PAGE.GIFT_CARDS}</h4>
          <div className={`${styles['fp-input']} ${styles['mb-25']}`}>
            <input type="text" required />
            <span className={styles['highlight']}></span>
            <span className={styles['bar']}></span>
            <label className={styles['thick-gry-clr']}>{PAYMENT_PAGE.ENTER_GIFT_CARD}</label>
            <span className={styles['error']}></span>
          </div>
          <div className={styles['fp-input']}>
            <input type="text" required />
            <span className={styles['highlight']}></span>
            <span className={styles['bar']}></span>
            <label className={styles['thick-gry-clr']}>{PAYMENT_PAGE.ENTER_PIN}</label>
            <span className={styles['error']}></span>
          </div>
          <span className={`${styles['thick-gry-clr']} ${styles['flex']} ${styles['pt-20']} ${styles['pb-20']}`}>{PAYMENT_PAGE.YOU_CAN_USE_MAXIMUM_OF_15_GIFT_CARDS}</span>
        </Col>
        <Col md={7} sm={12} xs={12} className={`${styles['pl-40']} ${styles['pt-20']} ${styles['pb-20']}`}>
          <button className={`${styles['fp-btn']} ${styles['fs-16']} ${styles['fontW600']} ${styles['fp-btn-primary']} ${styles['fp-btn-large']}`} onClick={props.makePayment}>{PAYMENT_PAGE.PAY} {props.orderRes.data.amount} {props.orderRes.data.currency}</button>
        </Col>
      </Row>
    </div>
  );
}

GiftCard.propTypes = {
  makePayment: PropTypes.func.isRequired,
}

GiftCard.defaultProps = {

}

export default GiftCard;
