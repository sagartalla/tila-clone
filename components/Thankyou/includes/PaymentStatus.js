import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';

import styles from '../thankyou.styl';

// TODO order page link is required.
const PaymentStatus = props => (
  <div>
    <Row>
      <Col md={2} xs={2} sm={2}>
        <span className={styles['ml-32']}><img src="http://via.placeholder.com/75x75" alt="gift" className={styles['m-10']}/></span>
      </Col>
      <Col md={8} xs={9} sm={9} className={styles['header']}>
        <h3>YOUR ORDER HAS BEEN PLACED SUCCESSFULLY</h3>
        <p className={styles['col-header']}>
          Your order has been placed and is being processed. You will receive an email with details once the 
          item(s) are shipped. You can track your <a>Orders page</a> in your account
        </p>
      </Col>
    </Row>
  </div>
)

export default PaymentStatus;