import React from 'react';
import { Row, Col} from 'react-bootstrap';

import styles from '../address.styl';

const AddressHeader = () => (
  <div className={styles['addr-header']}>
    <Row>
      <Col md={1} sm={3} xs={3}>
        <i className="fa fa-address-card"></i>
      </Col>
      <Col md={10} sm={9} xs={9}>
        <h1 className={styles['black-color']}>Manage Shipping Address</h1>
        <small>select a delivery address or create a new address</small>
      </Col>
    </Row>
  </div>
);

export default AddressHeader;