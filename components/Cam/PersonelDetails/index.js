import React from 'react';
import { Row, Col } from 'react-bootstrap';


import UserData from './UserData';
import SocialMedia from './SocialMedia';
import Notification from './Notification';

import styles from './user.styl';
import commonStyles from '../cam.styl';

const UserInfo = () => (
  <div className={styles['right-layout-container']}>
    <Row >
      <Col md={12} xs={12}>
        <div className={`${styles['user-info-container']} ${commonStyles['box-shadow']}`}>
          <UserData />
        </div>
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={6} >
        <div className={`${styles['common-sub-container']} ${commonStyles['box-shadow']} ${commonStyles['base-margin']}`}>
          <SocialMedia />
        </div>
      </Col>
      <Col xs={12} md={6}>
        <div className={`${styles['common-sub-container']} ${commonStyles['box-shadow']} ${commonStyles['base-margin']}`}>
          <Notification />
        </div>
      </Col>
    </Row>

  </div>
);

export default UserInfo;
