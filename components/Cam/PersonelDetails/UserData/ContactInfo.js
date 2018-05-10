import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Input from '../../Common/Input';

import styles from '../user.styl';

const ContactInfo = () => (
  <div className={styles['personel-data-container']}>
    <Row>
      <Col xs={12} md={12}>
        <h6>Contact Information</h6>
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={3} className={styles['contact-info-margin']}>
        <span>Email</span>
      </Col>
      <Col xs={12} md={9} >
        <Col xs={6} md={9}>
          <Input placeholder="Email" />
        </Col>
        <Col xs={6} md={3}>
          <span className={styles['edit-icon']}><i className="fa fa-pencil" aria-hidden="true" /></span>
        </Col>
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={3} className={styles['contact-info-margin']}>
        <span>Password</span>
      </Col>
      <Col xs={12} md={9} >
        <Col xs={6} md={9}>
          <Input placeholder="Updated 2 months back" />
        </Col>
        <Col xs={6} md={3}>
          <span className={styles['edit-icon']}><i className="fa fa-pencil" aria-hidden="true" /></span>
        </Col>
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={4} className={styles['contact-info-margin']}>
        <span>Phone Number</span>
      </Col>
      <Col xs={12} md={8}>
        <Col xs={6} md={9} className={styles['contact-info-margin']}>
          <a href="#">Enter Phone number</a>
        </Col>
        <Col xs={6} md={3}>
          <span className={styles['edit-icon']}><i className="fa fa-pencil" aria-hidden="true" /></span>
        </Col>
      </Col>

    </Row>
    <Row>
      <Col xs={12} md={12} className={styles['col-base-margin']}>Deactivate account</Col>
    </Row>
  </div>
);

export default ContactInfo;
