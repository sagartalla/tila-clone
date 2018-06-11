import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import UpdateContactInfo from './UpdateContactInfo';
import commonStyle from '../../cam.styl';


class ContactInfo extends React.Component {
  state = {
    show: false,
    element: "",
    contactInfo: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.contactInfo) {
      this.setState({
        contactInfo: nextProps.contactInfo
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
    const { mailId, email, mobile_no, lastUpdated, phoneNum, email_verified } = this.props.contactInfo ? this.props.contactInfo : { email: "", mobile_no: "", lastUpdated: "not available" };
    const { element, show, contactInfo } = this.state;
    return (
      <div className={`${commonStyle['ml-15']} ${commonStyle['mt-1o']} ${commonStyle['mb-10']}`}>
        <Row>
          <Col xs={12} md={12}>
            <h6>Contact Information</h6>
          </Col>
        </Row>
        <Row className={`${commonStyle['bb-dashed']} ${commonStyle['pb-5']} ${commonStyle['pt-5']}`}>
          <Col xs={12} md={3} className={`${commonStyle['pl-0']} ${commonStyle['pr-0']} ${commonStyle['m-5']}`}>
            <span>Email</span>
          </Col>
          <Col xs={12} md={8} className={`${commonStyle['p-0']} ${commonStyle['m-5']}`}>
            <Col xs={6} md={8}>
              <span>{mailId}</span>
            </Col>
            <Col xs={3} md={2}>
              {/* Add Not verified Image here*/}
              <a><span className={email_verified == 'NV' ? `${commonStyle['showDiv']}` : `${commonStyle['hideDiv']}`}>!!</span></a>
            </Col>
            <Col xs={3} md={2}>
              {/* <span className={`${commonStyle['float-r']} ${commonStyle['p-0']} ${commonStyle['ml-5']}`}>
                <a onClick={this.handleShow(true, `email`)}>Edit</a>
              </span> */}
            </Col>
          </Col>
        </Row>
        <Row className={`${commonStyle['bb-dashed']} ${commonStyle['pb-5']} ${commonStyle['pt-5']}`}>
          <Col xs={12} md={3} className={`${commonStyle['pl-0']} ${commonStyle['pr-0']} ${commonStyle['m-5']}`}>
            <span>Password</span>
          </Col>
          <Col xs={12} md={8} className={`${commonStyle['p-0']} ${commonStyle['m-5']}`}>
            <Col xs={6} md={9}>
              <span> {lastUpdated}</span>
            </Col>
            <Col xs={6} md={3}>
              <span className={`${commonStyle['float-r']} ${commonStyle['p-0']} ${commonStyle['ml-5']}`}>
                <a onClick={this.handleShow(true, `password`)}>Edit</a>
              </span>
            </Col>
          </Col>
        </Row>
        <Row className={`${commonStyle['bb-dashed']} ${commonStyle['pb-5']} ${commonStyle['pt-5']}`}>
          <Col xs={12} md={3} className={`${commonStyle['pl-0']} ${commonStyle['pr-0']} ${commonStyle['m-5']}`}>
            <span>Phone Number</span>
          </Col>
          <Col xs={12} md={8} className={`${commonStyle['p-0']} ${commonStyle['m-5']}`}>
            <Col xs={6} md={9}>
              <span>{phoneNum}</span>
            </Col>
            <Col xs={6} md={3}>
              {/* <span className={`${commonStyle['float-r']} ${commonStyle['p-0']} ${commonStyle['ml-5']}`}>
                <a onClick={this.handleShow(true, `phone`)}>Edit</a>
              </span> */}
            </Col>
          </Col>

        </Row>

        <Row>
          <Col xs={12} md={12}><a>Deactivate account</a></Col>
        </Row>
        <div className={show ? `${commonStyle['modalContainer']} ${commonStyle['showDiv']}` : `${commonStyle['modalContainer']} ${commonStyle['hideDiv']}`}>
          <div className={`${commonStyle['disabled']}`}>
          </div>
        </div>
        <div className={show ? `${commonStyle['openModal']}` : `${commonStyle['closeModal']}`}>
          <UpdateContactInfo
            contactInfo={contactInfo}
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
  contactInfo: PropTypes.object
};

export default ContactInfo;
