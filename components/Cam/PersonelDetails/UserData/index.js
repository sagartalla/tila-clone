import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PersonalInfo from './PersonalInfo';
import ContactInfo from './ContactInfo';
import { actionCreators } from '../../../../store/cam/personalDetails';
import { mergeCss } from '../../../../utils/cssUtil';
import { languageDefinations } from '../../../../utils/lang';

const styles = mergeCss('components/Cam/PersonelDetails/profile');
const { CONTACT_INFO_MODAL } = languageDefinations();

const UserData = ({
  getUserProfileInfo,
  deactivateUserProfile,
  useractive,
}) => {
  if (!useractive) {
    window.location.href = '/';
  }
  getUserProfileInfo();
  return (
    <div className={`${styles.box} ${styles['mb-20']} ${styles['ipad-mb-15']}`}>
      <Row className={`${styles['p-30']} ${styles['m-0']}`}>
        <Col xs={12} md={7}>
          <PersonalInfo />
          <ContactInfo />
        </Col>
      </Row>
      <span
        className={`${styles.flex} ${styles.pointer} ${styles['thick-red-clr']} ${styles['deactive-account-lable']} ${styles['p-10-40']} ${styles['bg-light-gray']}`}
        onClick={deactivateUserProfile}
      >
        {CONTACT_INFO_MODAL.DEACTIVATE_ACCOUNT}
      </span>
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
