import React from 'react';
import { Row, Col } from 'react-bootstrap';

import PersonalInfo from './PersonalInfo';
import ContactInfo from './ContactInfo';

import styles from '../user.styl';


const UserData = () => (
  <Row>
    <Col xs={12} md={6}>
      <PersonalInfo />
      <ContactInfo />
    </Col>
    <Col xs={12} md={6}>
      <div className={styles['update-info']} />
    </Col>
  </Row>
);

export default UserData;
