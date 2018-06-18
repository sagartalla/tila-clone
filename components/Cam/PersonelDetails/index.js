import React from 'react';
import { Row, Col } from 'react-bootstrap';


import UserData from './UserData';
import SocialMedia from './SocialMedia';
import Notification from './Notification';

import styles from '../cam.styl';

const UserInfo = () => {
  return (
    <div>
      <Row className={styles['ml-10']}>
        <Col md={12} xs={12} className={styles['pl-0']}>
          <div className={`${styles['ht-auto']} ${styles['fs-12']} ${styles['box']}`}>
            <UserData />
          </div>
        </Col>
      </Row>
      <Row className={`${styles['ml-10']} ${styles['mt-10']}`}>
        <Col xs={12} md={6} className={styles['pl-0']}>
          <div className={`${styles['fs-12']} ${styles['ht-170']} ${styles['box']} `}>
            <SocialMedia />
          </div>
        </Col>
        <Col xs={12} md={6} className={styles['pl-0']}>
          <div className={`${styles['fs-12']} ${styles['ht-170']} ${styles['box']} `}>
            <Notification />
          </div>
        </Col>
      </Row>

    </div>
  );
}

export default UserInfo;
