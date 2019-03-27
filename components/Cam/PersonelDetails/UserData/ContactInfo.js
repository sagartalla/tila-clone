import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { selectors } from '../../../../store/cam/personalDetails';
import { languageDefinations } from '../../../../utils/lang/';
import UpdateContactInfoModal from './UpdateContactInfoModal';
import SVGComponent from '../../../common/SVGComponet';
import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Cam/PersonelDetails/profile');


class ContactInfo extends React.Component {
  state = {
    show: false,
    element: "",
    contactInfo: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.userInfo.contactInfo) {
      this.setState({
        contactInfo: nextProps.userInfo.contactInfo
      });
    }
  }

  handleShow = (showVal, elem) => (e) => {
    this.setState({
      show: showVal,
      element: elem
    });
  }

  render() {
    const { mailId, email, mobile_no, lastUpdated, phoneNum, email_verified } = this.state.contactInfo ? this.state.contactInfo : { mailId: "", email: "", mobile_no: "", lastUpdated: "not available", phoneNum: "", email_verified: "" };
    const { element, show } = this.state;
    const { CONTACT_INFO_MODAL } = languageDefinations();
    return (
      <div className={`${styles['mb-10']}`}>
        <h4 className={styles['fontW600']}>{CONTACT_INFO_MODAL.HEADING}</h4>
        <div className={`${styles['bb-dashed']} ${styles['flex-center']} ${styles['pt-10']} ${styles['pb-10']}`}>
          <Col xs={12} md={3} className={`${styles['pl-0']} ${styles['pr-0']}`}>
            <span>{CONTACT_INFO_MODAL.EMAIL}</span>
          </Col>
          <Col xs={6} md={8} className={`${styles['flex-center']} ${styles['tickmark-part']}`}>
            <span className={styles['pr-20']}>{email}</span>
            <span className={email_verified !== 'NV' ? `${styles['showDiv']}` : `${styles['hideDiv']}`}>
              <span className={styles['flex']}><SVGComponent clsName={`${styles['tickmark-icon']}`} src="icons/common-icon/bg-tick-mark" /></span>
            </span>
          </Col>
          <Col xs={3} md={1} className={styles['pr-0']}>
            {/* <span className={`${styles['float-r']} ${styles['p-0']} ${styles['ml-5']}`}>
              <a onClick={this.handleShow(true, `email`)}>Edit</a>
            </span> */}
          </Col>
        </div>
        <div className={`${styles['flex-center']} ${styles['bb-dashed']} ${styles['pt-10']} ${styles['pb-10']}`}>
          <Col xs={12} md={3} className={`${styles['pl-0']} ${styles['pr-0']}`}>
            <span>{CONTACT_INFO_MODAL.PASSWORD}</span>
          </Col>
          <Col xs={6} md={8}>
            <span> {lastUpdated}</span>
          </Col>
          <Col xs={6} md={1} className={styles['pr-0']}>
            <span onClick={this.handleShow(true, `password`)} className={`${styles['float-r']} ${styles['flex']} ${styles['p-0']} ${styles['ml-5']}`}>
              <SVGComponent clsName={`${styles['edit-icon']}`} src="icons/common-icon/edit/edit-penc" />
            </span>
          </Col> 
        </div>
        <div className={`${styles['flex-center']} ${styles['pt-10']} ${styles['pb-10']}`}>
          <Col xs={12} md={3} className={`${styles['pl-0']} ${styles['pr-0']}`}>
            <span>{CONTACT_INFO_MODAL.PHONE_NUMBER}</span>
          </Col>
          <Col xs={6} md={8}>
            <span>{phoneNum}</span>
          </Col>
          <Col xs={6} md={1} className={styles['pr-0']}>
            {/* <span className={`${styles['float-r']} ${styles['p-0']} ${styles['ml-5']}`}>
              <a onClick={this.handleShow(true, `phone`)}>Edit</a>
            </span> */}
          </Col>
        </div>
        <div className={show ? `${styles['modalContainer']} ${styles['showDiv']}` : `${styles['modalContainer']} ${styles['hideDiv']}`}>
          <div className={`${styles['disabled']}`}>
          </div>
        </div>
        <div className={show ? `${styles['openModal']}` : `${styles['closeModal']}`}>
          <UpdateContactInfoModal
            handleShow={this.handleShow}
            show={show}
            element={element}
          />
        </div>
      </div>
    );
  }
}


ContactInfo.propTypes = {
  userInfo: PropTypes.object
};


const mapStateToProps = (store) => ({
  userInfo: selectors.getUserInfo(store)
});



export default connect(mapStateToProps)(ContactInfo);
