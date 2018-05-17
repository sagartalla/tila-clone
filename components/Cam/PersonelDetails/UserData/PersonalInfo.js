import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Input from '../../Common/Input';

import styles from '../user.styl';
import CommonStyle from '../../cam.styl';

const PersonalInfo = () => (
  <div className={CommonStyle['base-padding']}>
    <Row className={styles['title-container']}>
      <Col xs={6} md={6}>
        <h6>Personel Information</h6>
      </Col>
      <Col xs={6} md={6}>
        <span className={CommonStyle['float-right']}>
          <i className="fa fa-pencil" aria-hidden="true" />
        </span>
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={12} className={styles['user-info-margin']}>
        <Input placeholder="Name" />
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={12} className={styles['user-info-margin']}>
        <Input placeholder="Date of birth" />
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={12} className={styles['user-info-margin']}>
        <Col xs={12} md={6}>
          <labe>Gender</labe>
        </Col>
      </Col>
    </Row>
  </div>
);

export default PersonalInfo;
