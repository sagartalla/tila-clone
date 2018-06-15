import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Btn from '../../../common/Button';
import Input from '../../../common/Input';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, selectors } from '../../../../store/cam/personalDetails';

import styles from '../../cam.styl';


class EditPhone  extends React.Component {
  state = {
    phoneNumber: "",
    otp: "",
    error: "",
    show: false
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userInfo.contactInfo && Object.keys(nextProps.userInfo.contactInfo).length > 0 && nextProps.element && this.state.element == "" && this.state.phoneNumber == "") {
      this.setState({
        phoneNumber: nextProps.userInfo.contactInfo.mobile_no,
        otp: "",
        show: nextProps.show
      })
    }
    if (this.state.show == true && nextProps.errorMessege != this.state.error) {
      this.setState({
        error: nextProps.errorMessege
      });
    }
  }

  handleClose = () => {
    this.setState({
      show: false,
      phoneNumber: "",
      otp: "",
      error: ""
    });
    this.props.handleShow(false, '')();
  }

  handlePhoneNumberChange = (e) => {
    this.setState({ phoneNumber: e.target.value });
  }

  handleOTPChange = (e) => {
      this.setState({ otp: e.target.value });
  }

  handleResendOtp = () => {
    // TODO: handle action for OTP 
    console.log('handleResendOtp');
  }

  handleSubmit = () => {
    // TODO : handle action for phone number edit
    console.log('submit');
  }

  render(){
  const {phoneNumber, error, otp} = this.state;  
  return (
    <div className={styles['editProfileModal']}>
    <Row>
      <Col xs={11} md={11}>
        <h3>Edit Phone Number</h3>
      </Col>
      <Col xs={1} md={1} onClick={this.handleClose}><a>
        X</a>
      </Col>
    </Row>
    <div>
    <Row>
      <Col xs={4} md={4} />
      <Col xs={4} md={4}>
        <div className={styles['image-block-style']} />
      </Col>
      <Col xs={4} md={4} />
    </Row>
    <Row className={`${styles['m-5']} ${styles['mt-20']}`}>
      <Col xs={12} md={12} className={styles['box']}>
        <div>Phone Number</div>
        <Input placeholder="Enter phone number" type="number" val={phoneNumber} onChange={this.handlePhoneNumberChange} />
      </Col>
      <Col xs={12} md={12} className={styles['box']}>
        <div>Enter OTP</div>
        <Row>
          <Col xs={8} md={8}>
            <Input placeholder="Enter OTP" val={otp} onChange={this.handleOTPChange} />
          </Col>
          <Col xs={4} md={4}>
            <span><a onClick={this.handleResendOtp}>Resend OTP</a></span>
          </Col>
        </Row>
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={12} className={`${styles['t-c']}`}>
        <Btn btnWidth="95%" backGround="#034e94" color="#fff" btnText="Verify Mobile Number" BtnClickHandler={this.handleSubmit} />
      </Col>
    </Row>
  </div>
  </div>
  );
}
}

const mapStateToProps = (store) => ({
  errorMessege: selectors.getErrorMessege(store),
  userInfo: selectors.getUserInfo(store)
});

EditPhone.propTypes = {
  show: PropTypes.bool,
  handleShow: PropTypes.func.isRequired,
  errorMessege: PropTypes.string,
  userInfo: PropTypes.object
};

export default connect(mapStateToProps)(EditPhone);
