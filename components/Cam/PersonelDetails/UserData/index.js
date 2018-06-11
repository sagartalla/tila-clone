import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import PersonalInfo from './PersonalInfo';
import ContactInfo from './ContactInfo';
import UpdateInfoComponent from './UpdateInfo';


const UserData = props => {
  const { contactInfo, personalInfo } = props;
  return (
    <Row>
      <Col xs={12} md={6}>
        <PersonalInfo personalInfo={personalInfo} />
        <ContactInfo contactInfo={contactInfo} />
      </Col>
      {/* <Col xs={12} md={6}>
        <UpdateInfoComponent personalInfo={personalInfo} />
      </Col> */}
    </Row>
  );
}

UserData.propTypes = {
  personalInfo: PropTypes.object,
  contactInfo: PropTypes.object
}

export default UserData;
