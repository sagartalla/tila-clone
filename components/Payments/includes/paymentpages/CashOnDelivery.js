import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';

import { languageDefinations } from '../../../../utils/lang/';

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Payments/payment');
const { PAYMENT_PAGE } = languageDefinations();

const CashOnDelivery = props => (
  <div className={`${styles['reward-points']} ${styles['p-10']} `}>
    <Grid>
      <Row>
        <Col md={12}>
          Cash On Delivery
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

CashOnDelivery.propTypes = {
  makePayment: PropTypes.func.isRequired,
}

CashOnDelivery.defaultProps = {

}

export default CashOnDelivery;
