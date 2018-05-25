import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';

import styles from '../thankyou.styl';

const PaymentStatus = props => (
  <div className={styles['box']}>
    <Row>
      <Col md={12} xs={12} sm={12}>
        <div className={`${styles['box']} ${styles['p-5']}`}>
          <Row className={`${styles['ml-0']} ${styles['mr-0']}`}>
            <Col md={4} xs={12} sm={12} className={styles['pt-15']}>
              <Row className={styles['col-header']}>
                <Col md={6} xs={6} sm={6}>
                  <h5>ADDRESS DETAILS</h5>
                </Col>
                <Col md={6} xs={6} sm={6}>
                  <h5>
                    <a>Pin Address</a>
                  </h5>
                </Col>
              </Row>
              <Row className={`${styles['ht-100']} ${styles['mt-10']} ${styles['value']}`}>
                <Col md={12} xs={12} sm={12}>
                  <div>
                    Some address
                </div>
                </Col>
              </Row>
              <Row className={`${styles['mt-5']} ${styles['bt-dashed']}`}>
                <Col md={12} xs={12} sm={12} className={`${styles['pt-10']} ${styles['label-size']}`}>
                  <a>Change Address</a>
                </Col>
              </Row>
            </Col>
            <Col md={4} xs={12} sm={12} className={styles['pt-15']}>
              <Row className={styles['col-header']}>
                <Col md={6} xs={6} sm={6}>
                  <h5>ORDER SUMMARY</h5>
                </Col>
                <Col md={6} xs={6} sm={6}>
                  <h5>ORDER#xxxxxxxxxxxxx</h5>
                </Col>
              </Row>
              <Row className={`${styles['ht-100']} ${styles['mt-10']}`}>
                <Col md={6} xs={6} sm={6} className={styles['sub-label']}>
                  <p>Order Date</p>
                  <p>Item(s) Subtotal</p>
                  <p>Shipping</p>
                </Col>
                <Col md={6} xs={6} sm={6} className={styles['value']}>
                  <p>DUMMY_DATE</p>
                  <p>DUMMY_VALUE</p>
                  <p>DUMMY_DELIVERY_DATE</p>
                </Col>
              </Row>
              <Row className={`${styles['mt-5']} ${styles['bt-dashed']}`}>
                <Col md={6} xs={6} sm={6} className={`${styles['pt-10']} ${styles['label']}`}>
                  <p>Grand Total</p>
                </Col>
                <Col md={6} xs={6} sm={6} className={`${styles['pt-10']} ${styles['label-size']}`}>
                  <p>DUMMY_TOTAL_VALUE</p>
                </Col>
              </Row>
            </Col>
            <Col md={4} xs={12} sm={12} className={styles['pt-15']}>
              <Row className={styles['col-header']}>
                <Col md={6} xs={6} sm={6}>
                  <h5>PAYMENT METHOD</h5>
                </Col>
                <Col md={6} xs={6} sm={6}>
                  <h5><a>Request Invoice</a></h5>
                </Col>
              </Row>
              <Row className={`${styles['ht-100']} ${styles['mt-10']}`}>
                <Col md={6} xs={6} sm={6} className={styles['sub-label']}>
                  <p>
                    <img src="http://via.placeholder.com/25x15" alt="gift"/>
                    <span className={styles['ml-10']}>Gift Card</span>
                  </p>
                  <p>Visa<span className={`${styles['ml-10']} ${styles['card']}`}>**** **** ****</span></p>
                </Col>
                <Col md={6} xs={6} sm={6} className={styles['value']}>
                  <p>DUMMY_VALUE</p>
                  <p>DUMMY_EMI</p>
                </Col>
              </Row>
              <Row className={`${styles['mt-5']} ${styles['bt-dashed']}`}>
                <Col md={12} xs={12} sm={12} className={`${styles['pt-10']} ${styles['label']}`}>
                  Share with friends
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  </div>
)

export default PaymentStatus;