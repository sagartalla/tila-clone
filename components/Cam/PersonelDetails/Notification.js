import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import styles from './user.styl';


const Notification = () => (
  <div>
    <Row>
      <Col xs={12} md={12} className={styles['col-base-margin']}>
        <span>02</span>
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={12} className={styles['col-base-margin']}>
        <span>New Notifications</span>
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={7} className={styles['col-base-margin']}>
        <span>Are you overloaded with notifications? Manage messages,
          emails and notifications the way you want
        </span>
      </Col>
      <Col xs={12} md={5} className={styles['col-base-margin']}>
        <Button>Edit Notifications</Button>
      </Col>
    </Row>
  </div>
);

export default Notification;
