import React from 'react';
import { Row, Col } from 'react-bootstrap';

import PersonalInfo from './PersonalInfo';
import ContactInfo from './ContactInfo';

import styles from '../../cam.styl';


const UserData = () => (
  <Row>
    <Col xs={12} md={6}>
      <PersonalInfo />
      <ContactInfo />
    </Col>
    <Col xs={12} md={6} className={styles['update-info']} />
  </Row>
);

export default UserData;
