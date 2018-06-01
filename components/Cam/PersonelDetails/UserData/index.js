import React from 'react';
import { Row, Col } from 'react-bootstrap';

import PersonalInfo from './PersonalInfo';
import ContactInfo from './ContactInfo';
import UpdateInfoComponent from './UpdateInfo';

const UserData = props => {
  const { contactInfo, personalInfo } = props;
  return(
  <Row>
    <Col xs={12} md={6}>
      <PersonalInfo personalInfo={personalInfo}/>
      <ContactInfo contactInfo={contactInfo}/>
    </Col>
    <Col xs={12} md={6}>
      <UpdateInfoComponent />
    </Col>
  </Row>
);
}
export default UserData;
