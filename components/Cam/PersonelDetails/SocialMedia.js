import React from 'react';
import { Row, Col } from 'react-bootstrap';

import styles from './user.styl';


const SocialMedia = () => (
  <div>
    <Row>
      <Col xs={12} md={12} className={styles['col-base-margin']}>
        <span>Link to Social Media</span>
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={12} className={styles['col-base-margin']}>
        <span>Easy one clicklogin when using your Social Media Accounts</span>
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={12} className={styles['col-base-margin']} >
        <Col xs={4} md={4}>
          <span>Icon</span>
        </Col>
        <Col xs={4} md={4}>
          <span>Icon</span>
        </Col>
        <Col xs={4} md={4}>
          <span>Icon</span>
        </Col>
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={12} className={styles['col-base-margin']}>
        <span>Your facebook account has been linked with abcd.com<span>(</span><a href="#">Unlink Now</a><span>)</span></span>
      </Col>
    </Row>
  </div>
);

export default SocialMedia;
