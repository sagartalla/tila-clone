import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Btn from '../../common/Button';


const Notification = () => (
  <div>
    <Row>
      <Col xs={12} md={12}>
        <span>02</span>
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={12}>
        <span>New Notifications</span>
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={6} >
        <span>Are you overloaded with notifications? Manage messages,
          emails and notifications the way you want
        </span>
      </Col>
      <Col xs={12} md={6} >
        <Btn btnText="Edit Notifications" />
      </Col>
    </Row>
  </div>
);

export default Notification;
