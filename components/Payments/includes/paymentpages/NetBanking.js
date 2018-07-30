import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { languageDefinations } from '../../../../utils/lang/';
import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Payments/payment');

const NetBanking = props => {
  const { PAYMENT_PAGE } = languageDefinations();
  return (
    <div className={`${styles['reward-points']} ${styles['p-10']} `}>
      <Grid>
        <Row>
          <Col md={12}>
            Net Banking
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

NetBanking.propTypes = {
  makePayment: PropTypes.func.isRequired,
}

NetBanking.defaultProps = {

}

export default NetBanking;
