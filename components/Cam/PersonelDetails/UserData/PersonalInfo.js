import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Input from '../../Common/Input';

import styles from '../user.styl';

const PersonalInfo = () => (
  <div className={styles['personel-data-container']}>
    <div className={styles['row-space']} />
    <Row className={styles['title-container']}>
      <Col xs={6} md={6}>
        <h6>Personel Information</h6>
      </Col>
      <Col xs={6} md={6}>
        <span className={styles['edit-icon']}><i className="fa fa-pencil" aria-hidden="true" /></span>
      </Col>
    </Row>
    <div className={styles['row-space']} />
    <Row>
      <Col xs={12} md={12}>
        <Input placeholder="Name" />
      </Col>
    </Row>
    <div className={styles['row-space']} />
    <Row>
      <Col xs={12} md={12}>
        <Input placeholder="Date of birth" />
      </Col>
    </Row>
    <div className={styles['row-space']} />
    <Row className={styles['row-paddding']}>
      <Col xs={12} md={6}>
        <labe>Gender</labe>
      </Col>
      <Col xs={12} md={6}>
        <Col xs={4} md={3}>
          <span>Male</span>
        </Col>
        <Col xs={4} md={6}>
          <label className={styles.switch}>
            <input type="checkbox" />
            <span className={styles.slider} />
          </label>
        </Col>
        <Col xs={4} md={3}>
          <span>Female</span>
        </Col>
      </Col>
    </Row>
  </div>
);

export default PersonalInfo;
