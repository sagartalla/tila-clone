import React from 'react';
import { Row, Col } from 'react-bootstrap';


import UserData from './UserData';
import SocialMedia from './SocialMedia';
import Notification from './Notification';

import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Cam/PersonelDetails/profile');

const UserInfo = () => {
  return (
    <div className={`${styles['profile-main-part']} ${styles['pl-5']}`}>
      <UserData />
      <Col xs={12} md={6} className={styles['pl-0']}>
        <SocialMedia />
      </Col>
      <Col xs={12} md={6} className={`${styles['pl-5']} ${styles['pr-0']}`}>
        <Notification />
      </Col>
    </div>
  );
}

export default UserInfo;
