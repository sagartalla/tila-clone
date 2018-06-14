import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { languageDefinations } from '../../../../utils/lang/';
import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Payments/payment');

const PayOnline = props => {
  const { PAYMENT_PAGE } = languageDefinations();
  return (
    <div className={`${styles['pay-online']} ${styles['p-10']} `}>
      <Grid>
        <Row>
          <Col md={12}>
            {PAYMENT_PAGE.PAY_ONLINE}
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
}


PayOnline.propTypes = {
  makePayment: PropTypes.func.isRequired,
  data: PropTypes.object
}

PayOnline.defaultProps = {

}

export default PayOnline;
