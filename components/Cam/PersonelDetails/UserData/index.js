import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PersonalInfo from './PersonalInfo';
import ContactInfo from './ContactInfo';
import { actionCreators } from '../../../../store/cam/personalDetails';
import { languageDefinations } from '../../../../utils/lang';

import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../profile_en.styl';
import styles_ar from '../profile_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};


const { CONTACT_INFO_MODAL } = languageDefinations();

const UserData = ({
  getUserProfileInfo,
  deactivateUserProfile,
  useractive,
  getUserInfo,
}) => {
  if (!useractive) {
    window.location.href = '/';
  }
  const deactiveProfile = () => {
    confirm('Do you really want to deactivate the account?') ?
          deactivateUserProfile() : null
  }
  getUserProfileInfo();
  return (
    <div className={`${styles.box} ${styles['mb-20']} ${styles['ipad-mb-15']} ${styles['right-part-cam']}`}>
      <Row className={`${styles['p-30']} ${styles['m-0']}`}>
        <Col xs={12} md={7}>
          <PersonalInfo />
          <ContactInfo />
        </Col>
      </Row>
    </div>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUserProfileInfo: actionCreators.getUserProfileInfo,
      deactivateUserProfile: actionCreators.deactivateUserProfile,
    },
    dispatch,
  );

const mapStateToProps = store => ({
  useractive: store.personalDetailsReducer.useractive,
});

UserData.propTypes = {
  getUserProfileInfo: PropTypes.func.isRequired,
  deactivateUserProfile: PropTypes.func.isRequired,
  useractive: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserData);
