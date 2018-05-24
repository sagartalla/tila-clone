import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import styles from '../../payment.styl';

const RewardPonits = props => (
  <div className={`${styles['reward-points']} ${styles['p-10']} `}>
    <Grid>
      <Row>
        <Col md={12}>
          Reward Points
          </Col>
      </Row>
      <Row>
        <Col md={12} sm={12} xs={12}>
        <button className={`${styles['fp-btn']} ${styles['fp-btn-primary']}`} onClick={props.makePayment}>Pay {props.orderRes.data.amount} {props.orderRes.data.currency}</button>
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
