import React from 'react';
import { Row, Col } from 'react-bootstrap';


import UserData from './UserData';
import SocialMedia from './SocialMedia';
import Notification from './Notification';

import commonStyles from '../cam.styl';

const UserInfo = (props) => {
  return (
    <div>
      <Row className={commonStyles['ml-10']}>
        <Col md={12} xs={12} className={commonStyles['pl-0']}>
          <div className={`${commonStyles['ht-auto']} ${commonStyles['fs-12']} ${commonStyles['box']}`}>
            <UserData {...props} />
          </div>
        </Col>
      </Row>
      <Row className={`${commonStyles['ml-10']} ${commonStyles['mt-10']}`}>
        <Col xs={12} md={6} className={commonStyles['pl-0']}>
          <div className={`${commonStyles['fs-12']} ${commonStyles['ht-170']} ${commonStyles['box']} `}>
            <SocialMedia />
          </div>
        </Col>
        <Col xs={12} md={6} className={commonStyles['pl-0']}>
          <div className={`${commonStyles['fs-12']} ${commonStyles['ht-170']} ${commonStyles['box']} `}>
            <Notification />
          </div>
        </Col>
      </Row>

    </div>
  );
}

export default UserInfo;
