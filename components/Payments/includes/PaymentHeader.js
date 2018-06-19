import { Grid, Row, Col } from 'react-bootstrap';
import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Payments/payment');

const PaymentHeader = props => (
  <div className={`${styles['payment-header']} ${styles['p-10']} `}>
    <Grid>
      <Row>
        <Col md={12}>
          LOGO
        </Col>
      </Row>
    </Grid>
  </div>
);

export default PaymentHeader;
