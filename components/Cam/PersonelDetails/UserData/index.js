import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import PersonalInfo from './PersonalInfo';
import ContactInfo from './ContactInfo';
import UpdateTimelineComponent from './UpdateTimelineComponent';


const UserData = () => {
  return (
    <Row>
      <Col xs={12} md={6}>
        <PersonalInfo />
        <ContactInfo />
      </Col>
      {/* <Col xs={12} md={6}>
        <UpdateTimelineComponent />
      </Col> */}
    </Row>
  );
}

export default UserData;
