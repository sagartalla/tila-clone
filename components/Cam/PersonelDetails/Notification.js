import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import styles from '../cam.styl';

const Notification = () => (
  <div>
    <Row>
      <Col xs={12} md={12}>
        <span>02</span>
      </Col>
    </Row>
    <div className={styles['row-space']} />
    <Row>
      <Col xs={12} md={12}>
        <span>New Notifications</span>
      </Col>
    </Row>
    <div className={styles['row-space']} />
    <Row>
      <Col xs={12} md={7}>
        <span>Are you overloaded with notifications? Manage messages,
          emails and notifications the way you want
        </span>
      </Col>
      <Col xs={12} md={5}>
        <Button>Edit Notifications</Button>
      </Col>
    </Row>
  </div>
);

export default Notification;
