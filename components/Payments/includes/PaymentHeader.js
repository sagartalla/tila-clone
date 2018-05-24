import { Grid, Row, Col } from 'react-bootstrap';
import styles from '../payment.styl';

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
