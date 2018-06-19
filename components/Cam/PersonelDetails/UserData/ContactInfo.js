import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { selectors } from '../../../../store/cam/personalDetails';

import UpdateContactInfoModal from './UpdateContactInfoModal';

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Cam/cam');


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
    return (
      <div className={`${styles['ml-15']} ${styles['mt-1o']} ${styles['mb-10']}`}>
        <Row>
          <Col xs={12} md={12}>
            <h6>Contact Information</h6>
          </Col>
        </Row>
        <Row className={`${styles['bb-dashed']} ${styles['pb-5']} ${styles['pt-5']}`}>
          <Col xs={12} md={3} className={`${styles['pl-0']} ${styles['pr-0']} ${styles['m-5']}`}>
            <span>Email</span>
          </Col>
          <Col xs={12} md={8} className={`${styles['p-0']} ${styles['m-5']}`}>
            <Col xs={6} md={8}>
              <span>{mailId}</span>
            </Col>
            <Col xs={3} md={2}>
              {/* Add Not verified Image here*/}
              <a><span className={email_verified == 'NV' ? `${styles['showDiv']}` : `${styles['hideDiv']}`}>!!</span></a>
            </Col>
            <Col xs={3} md={2}>
              {/* <span className={`${styles['float-r']} ${styles['p-0']} ${styles['ml-5']}`}>
                <a onClick={this.handleShow(true, `email`)}>Edit</a>
              </span> */}
            </Col>
          </Col>
        </Row>
        <Row className={`${styles['bb-dashed']} ${styles['pb-5']} ${styles['pt-5']}`}>
          <Col xs={12} md={3} className={`${styles['pl-0']} ${styles['pr-0']} ${styles['m-5']}`}>
            <span>Password</span>
          </Col>
          <Col xs={12} md={8} className={`${styles['p-0']} ${styles['m-5']}`}>
            <Col xs={6} md={9}>
              <span> {lastUpdated}</span>
            </Col>
            <Col xs={6} md={3}>
              <span className={`${styles['float-r']} ${styles['p-0']} ${styles['ml-5']}`}>
                <a onClick={this.handleShow(true, `password`)}>Edit</a>
              </span>
            </Col>
          </Col>
        </Row>
        <Row className={`${styles['bb-dashed']} ${styles['pb-5']} ${styles['pt-5']}`}>
          <Col xs={12} md={3} className={`${styles['pl-0']} ${styles['pr-0']} ${styles['m-5']}`}>
            <span>Phone Number</span>
          </Col>
          <Col xs={12} md={8} className={`${styles['p-0']} ${styles['m-5']}`}>
            <Col xs={6} md={9}>
              <span>{phoneNum}</span>
            </Col>
            <Col xs={6} md={3}>
              {/* <span className={`${styles['float-r']} ${styles['p-0']} ${styles['ml-5']}`}>
                <a onClick={this.handleShow(true, `phone`)}>Edit</a>
              </span> */}
            </Col>
          </Col>

        </Row>

        <Row>
          <Col xs={12} md={12}><a>Deactivate account</a></Col>
        </Row>
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
