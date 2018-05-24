import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';

import styles from '../thankyou.styl';

const PaymentStatus = props => (
  <div className={styles['box']}>
    <Row>
      <Col md={2} xs={12} sm={12}>
        <h5>ADDRESS DETAILS</h5>
        
      </Col>
      <Col md={2} xs={12} sm={12}>
        <h5><a>Pin Address</a></h5>
      </Col>
      <Col md={2} xs={12} sm={12}>
        <h5>ORDER SUMMARY</h5>
      </Col>
      <Col md={2} xs={12} sm={12}>
        <h5>ORDER#DUMMY_ID</h5>
      </Col>
      <Col md={2} xs={12} sm={12}>
        <h5>PAYMENT METHOD</h5>
      </Col>
      <Col md={2} xs={12} sm={12}>
        <h5><a>Request Invoice</a></h5>
      </Col>
    </Row>
  </div>
)

export default PaymentStatus;