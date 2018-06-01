import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Row, Col } from 'react-bootstrap';

import Toggle from '../../Common/Toggle';
import Btn from '../../Common/Button';
import Input from '../../Common/Input';

import CommonStyle from '../../cam.styl';

const UpdateContactInfo = props => {
  const { element, handleClose, show, handleValueChange, handleAuthValueChange, handleRePasswordChange, handleAction, handleForgotPassword, handleResendOtp, handleRePasswordBlur, error } = props;
  let { value, rePassword, authValue } = props;
  let title = "";
  let modalComponent = <div>Loading..</div>
  let errorComponent = null;
  if(error)
  { errorComponent= (
    <div className={`${CommonStyle['text-center']} ${CommonStyle['error-msg']}`}>
        <span>{error}</span>
    </div>);
  }
  if (element == "email") {
    title = "Change Email Address";
    modalComponent = (
      <Modal.Body>
        <Row>
          <Col xs={4} md={4} />
          <Col xs={4} md={4}>
            <div className={CommonStyle['image-block-style']} />
          </Col>
          <Col xs={4} md={4} />
        </Row>

        <Row className={`${CommonStyle['m-5']} ${CommonStyle['mt-20']}`}>
          <Col xs={12} md={12} className={`${CommonStyle['box-shadow']}`}>
            <div>Email ID</div>
            <Input placeholder="Enter Email Id" type="email" val={value} onChange={event => handleValueChange(event.target.value)} />
          </Col>
          <Col xs={12} md={12} className={`${CommonStyle['box-shadow']}`}>
            <div>Account Password</div>
            <Row>
              <Col xs={8} md={8}>
                <Input placeholder="Enter Password" type="password" val={authValue} onChange={event => handleAuthValueChange(event.target.value)} />
              </Col>
              <Col xs={4} md={4}>
                <span><a onClick={handleForgotPassword}>Forgot Password?</a></span>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12} className={`${CommonStyle['text-align-center']} ${CommonStyle['base-margin']}`}>
            <Btn btnWidth="95%" backGround="#034e94" color="#fff" btnText="Save Email Id" BtnClickHandler={handleAction} />
          </Col>
        </Row>
      </Modal.Body>
    );
  }
  else if (element == "password") {
    title = "Change Password";
    modalComponent = (
      <Modal.Body>
        <Row>
          <Col xs={4} md={4} />
          <Col xs={4} md={4}>
            <div className={CommonStyle['image-block-style']} />
          </Col>
          <Col xs={4} md={4} />
        </Row>
        <Row>
        {errorComponent}
        </Row>  
        <Row className={`${CommonStyle['m-5']} ${CommonStyle['mt-20']}`}>
          <Col xs={12} md={12} className={CommonStyle['box-shadow']}>
            <div>Enter Old Password</div>
            <Input placeholder="Enter Old Password" type="password" val={value} onChange={event => handleValueChange(event.target.value)} />
          </Col>
          <Col xs={12} md={12} className={CommonStyle['box-shadow']}>
            <Col xs={6} md={6} className={CommonStyle['pl-0']}>
              <div>Enter New Password</div>
              <Input placeholder="Enter New Password" type="password" val={authValue} onChange={event => handleAuthValueChange(event.target.value)} />
            </Col>
            <Col xs={6} md={6} className={CommonStyle['pl-0']}>
              <div>Re-enter New Password</div>
              <Input placeholder="Re enter Password" type="password" val={rePassword} onChange={event => handleRePasswordChange(event.target.value)} onBlur={event => handleRePasswordBlur(event.target.value)} />
            </Col>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12} className={`${CommonStyle['text-align-center']} ${CommonStyle['base-margin']}`}>
            <Btn btnWidth="95%" backGround="#034e94" color="#fff" btnText="Change Password" BtnClickHandler={handleAction} />
          </Col>
        </Row>
      </Modal.Body>
    );
  }
  else if (element == "phone") {
    title = "Edit Phone Number";
    modalComponent = (
      <Modal.Body>
        <Row>
          <Col xs={4} md={4} />
          <Col xs={4} md={4}>
            <div className={CommonStyle['image-block-style']} />
          </Col>
          <Col xs={4} md={4} />
        </Row>
        <Row className={`${CommonStyle['m-5']} ${CommonStyle['mt-20']}`}>
          <Col xs={12} md={12} className={CommonStyle['box-shadow']}>
            <div>Phone Number</div>
            <Input placeholder="Enter phone number" type="number" val={value} onChange={event => handleValueChange(event.target.value)} />
          </Col>
          <Col xs={12} md={12} className={CommonStyle['box-shadow']}>
            <div>Enter OTP</div>
            <Row>
              <Col xs={8} md={8}>
                <Input placeholder="Enter OTP" val={authValue} onChange={event => handleAuthValueChange(event.target.value)} />
              </Col>
              <Col xs={4} md={4}>
                <span><a onClick={handleResendOtp}>Resend OTP</a></span>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12} className={`${CommonStyle['text-align-center']} ${CommonStyle['base-margin']}`}>
            <Btn btnWidth="95%" backGround="#034e94" color="#fff" btnText="Verify Mobile Number" BtnClickHandler={handleAction} />
          </Col>
        </Row>
      </Modal.Body>
    );
  }
  

  return (
    <div className="hello">
      <Modal show={show} onHide={handleClose} className={CommonStyle['editProfileModal']}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        {modalComponent}
      </Modal>
    </div>
  );

}

UpdateContactInfo.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  element: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  rePassword: PropTypes.string.isRequired,
  authValue: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  handleValueChange: PropTypes.func.isRequired,
  handleAuthValueChange: PropTypes.func.isRequired,
  handleRePasswordChange: PropTypes.func.isRequired,
  handleAction: PropTypes.func.isRequired,
  handleResendOtp: PropTypes.func.isRequired,
  handleForgotPassword: PropTypes.func.isRequired,
  handleRePasswordBlur: PropTypes.func.isRequired
};

export default UpdateContactInfo;
