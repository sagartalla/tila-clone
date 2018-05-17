import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Btn from '../Common/Button';

import styles from './user.styl';


const Notification = () => (
  <div>
    <Row>
      <Col xs={12} md={12} className={styles['user-info-margin']}>
        <span>02</span>
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={12} className={styles['user-info-margin']}>
        <span>New Notifications</span>
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={6} className={styles['user-info-margin']}>
        <span>Are you overloaded with notifications? Manage messages,
          emails and notifications the way you want
        </span>
      </Col>
      <Col xs={12} md={6} className={styles['user-info-margin']}>
        <Btn btnText="Edit Notifications" />
      </Col>
    </Row>
  </div>
);

export default Notification;
