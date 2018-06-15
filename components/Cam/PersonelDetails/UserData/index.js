import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import PersonalInfo from './PersonalInfo';
import ContactInfo from './ContactInfo';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../store/cam/personalDetails';


const UserData = ({getUserProfileInfo}) => {
  getUserProfileInfo();
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

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getUserProfileInfo: actionCreators.getUserProfileInfo
    },
    dispatch,
  );

  UserData.propTypes = {
    getUserProfileInfo: PropTypes.func
  };
  
  export default connect(null, mapDispatchToProps)(UserData);
