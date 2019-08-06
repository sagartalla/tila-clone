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

const RewardPonits = props => (
  <div className={`${styles['reward-points']} ${styles['p-10']} `}>
    <Grid>
      <Row>
        <Col md={12}>
          {PAYMENT_PAGE.REWARD_POINTS}
        </Col>
      </Row>
      <Row>
        <Col md={12} sm={12} xs={12}>
          <button className={`${styles['fp-btn']} ${styles['fp-btn-primary']}`} onClick={props.makePayment}>{PAYMENT_PAGE.PAY} {props.orderRes.data.amount} {props.orderRes.data.currency}</button>
        </Col>
      </Row>
    </Grid>
  </div>
);

RewardPonits.propTypes = {
  makePayment: PropTypes.func.isRequired,
}

RewardPonits.defaultProps = {

}

export default RewardPonits;
