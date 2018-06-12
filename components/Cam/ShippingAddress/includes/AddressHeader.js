import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { languageDefinations } from '../../../../utils/lang/';

import styles from '../address.styl';

const AddressHeader = () => {
  const {DELIVERY_ADDR_PAGE} = languageDefinations();
  return(
    <div className={styles['addr-header']}>
      <Row>
        <Col md={1} sm={3} xs={3}>
          <i className="fa fa-address-card"></i>
        </Col>
        <Col md={10} sm={9} xs={9}>
          <h1 className={`${styles['black-color']} ${styles['m-0']} ${styles['fs-16']}`}>{DELIVERY_ADDR_PAGE.MANAGE_SHIP_ADDR}</h1>
          <small>{DELIVERY_ADDR_PAGE.SUB_TAG}</small>
        </Col>
      </Row>
    </div>
  );
};

export default AddressHeader;