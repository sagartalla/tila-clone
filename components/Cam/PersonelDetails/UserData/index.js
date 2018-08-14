import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import PersonalInfo from './PersonalInfo';
import ContactInfo from './ContactInfo';
import SVGComponent from '../../../common/SVGComponet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../store/cam/personalDetails';
import { mergeCss } from '../../../../utils/cssUtil';
import {languageDefinations} from '../../../../utils/lang';
const styles = mergeCss('components/Cam/PersonelDetails/profile');
const {CONTACT_INFO_MODAL} = languageDefinations();

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
            <h4>{CONTACT_INFO_MODAL.THANK_YOU}</h4>
            <span className={styles['thick-gry-clr']}>{CONTACT_INFO_MODAL.PROFILE_CREATION_SUCCESS_MESSAGE}</span>
          </div>
        </Col>
      </Row>
      <span className={`${styles['flex']} ${styles['thick-gry-clr']} ${styles['deactive-account-lable']} ${styles['p-10-40']} ${styles['bg-light-gray']}`}>{CONTACT_INFO_MODAL.DEACTIVATE_ACCOUNT}</span>
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
