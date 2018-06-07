import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { languageDefinations } from '../../../../utils/lang/';
import styles from '../../payment.styl';

const Voucher = props => {
  const { PAYMENT_PAGE } = languageDefinations();
  return (
    <div className={`${styles['voucher']} ${styles['p-10']}`}>
      <Grid>
        <Row>
          <Col md={12}>
            {PAYMENT_PAGE.VOUCHER}
          </Col>
        </Row>
        <Row>
          <Col md={12} sm={12} xs={12}>
          <button className={`${styles['fp-btn']} ${styles['fp-btn-primary']}`} onClick={props.makePayment}>Pay {props.orderRes.data.amount} {props.orderRes.data.currency}</button>
          </Col>
        </Row>
      </Grid>
    </div>
  )
}

Voucher.propTypes = {
  makePayment: PropTypes.func.isRequired,
}

Voucher.defaultProps = {

}

export default Voucher;
