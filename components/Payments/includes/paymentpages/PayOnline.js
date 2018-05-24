import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import styles from '../../payment.styl';

const PayOnline = props => (
  <div className={`${styles['pay-online']} ${styles['p-10']} `}>
    <Grid>
      <Row>
        <Col md={12}>
          Pay Online
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


PayOnline.propTypes = {
  makePayment: PropTypes.func.isRequired,
  data: PropTypes.object
}

PayOnline.defaultProps = {

}

export default PayOnline;
