import React from 'react';
import { Row, Col } from 'react-bootstrap';

import styles from '../cam.styl';
import commonStyle from './common.styl';

const GenericUpdate = () => (
  <div>
    <Row>
      <Col xs={4} md={4} />
      <Col xs={4} md={4}>
        <div className={commonStyle['image-block-style']} />
      </Col>
      <Col xs={4} md={4} />
    </Row>
    <Row>
      <div className={styles['base-margin']}>
        <Col xs={12} md={12} className={`${styles['text-align-center']} ${styles['base-line-height']}`}>
          <span>Enter Your Name, DOB and Gender for a</span><br />
          <span>more personalised abcd.com Experience</span>
        </Col>
      </div>
    </Row>
  </div>
);


export default GenericUpdate;
