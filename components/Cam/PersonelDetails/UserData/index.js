import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import PersonalInfo from './PersonalInfo';
import ContactInfo from './ContactInfo';
import SVGCompoent from '../../../common/SVGComponet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../store/cam/personalDetails';
import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Cam/PersonelDetails/profile');

const UserData = ({getUserProfileInfo}) => {
  getUserProfileInfo();
  return (
    <div className={`${styles['box']} ${styles['mb-20']}`}>
      <Row className={`${styles['p-30']} ${styles['m-0']}`}>
        <Col xs={12} md={7}>
          <PersonalInfo />
          <ContactInfo />
        </Col>
        <Col md={5}>
          <div className={`${styles['box']} ${styles['p-20']} ${styles['t-c']}`}>
            <span>
              
            </span>
            <h4>Thank You</h4>
            <span className={styles['thick-gry-clr']}>Your profile is complete. You can edit or change any details at anytime you want</span>
          </div>
        </Col>
      </Row>
      <span className={`${styles['flex']} ${styles['thick-gry-clr']} ${styles['deactive-account-lable']} ${styles['p-10-40']} ${styles['bg-light-gray']}`}>Deactivate account</span>
    </div>
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
