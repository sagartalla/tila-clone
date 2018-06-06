import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import Btn from '../../../common/Button';
import Input from '../../../common/Input';

import commonStyle from '../../cam.styl';

const UpdateContactInfo = props => {
  const { element, handleClose, show, handleValueChange, handleAuthValueChange, handleRePasswordChange, handleAction, handleForgotPassword, handleResendOtp, handleRePasswordBlur, error } = props;
  let { value, rePassword, authValue } = props;
  let title = "";
  let modalComponent = <div>Loading..</div>
  let errorComponent = null;
  if(error)
  { errorComponent= (
    <div className={`${commonStyle['text-center']} ${commonStyle['error-msg']}`}>
        <span>{error}</span>
    </div>);
  }
  if (element == "email") {
    title = "Change Email Address";
    modalComponent = (
      <div>
        <Row>
          <Col xs={4} md={4} />
          <Col xs={4} md={4}>
            <div/>
          </Col>
          <Col xs={4} md={4} />
        </Row>

        <Row className={`${commonStyle['m-5']} ${commonStyle['mt-20']}`}>
          <Col xs={12} md={12} className={`${commonStyle['box']}`}>
            <div>Email ID</div>
            <Input placeholder="Enter Email Id" type="email" val={value} onChange={event => handleValueChange(event.target.value)} />
          </Col>
          <Col xs={12} md={12} className={`${commonStyle['box']}`}>
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
          <Col xs={12} md={12} className={`${commonStyle['t-c']}`}>
            <Btn btnWidth="95%" backGround="#034e94" color="#fff" btnText="Save Email Id" BtnClickHandler={handleAction} />
          </Col>
        </Row>
      </div>
    );
  }
  else if (element == "password") {
    title = "Change Password";
    modalComponent = (
      <div>
        <Row>
          <Col xs={4} md={4} />
          <Col xs={4} md={4}>
            <div/>
          </Col>
          <Col xs={4} md={4} />
        </Row>
        <Row>
        {errorComponent}
        </Row>  
        <Row className={`${commonStyle['m-5']} ${commonStyle['mt-20']}`}>
          <Col xs={12} md={12} className={commonStyle['box']}>
            <div>Enter Old Password</div>
            <Input placeholder="Enter Old Password" type="password" val={value} onChange={event => handleValueChange(event.target.value)} />
          </Col>
          <Col xs={12} md={12} className={commonStyle['box']}>
            <Col xs={6} md={6} className={commonStyle['pl-0']}>
              <div>Enter New Password</div>
              <Input placeholder="Enter New Password" type="password" val={authValue} onChange={event => handleAuthValueChange(event.target.value)} />
            </Col>
            <Col xs={6} md={6} className={commonStyle['pl-0']}>
              <div>Re-enter New Password</div>
              <Input placeholder="Re enter Password" type="password" val={rePassword} onChange={event => handleRePasswordChange(event.target.value)} onBlur={event => handleRePasswordBlur(event.target.value)} />
            </Col>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12} className={`${commonStyle['t-c']}`}>
            <Btn btnWidth="95%" backGround="#034e94" color="#fff" btnText="Change Password" BtnClickHandler={handleAction} />
          </Col>
        </Row>
      </div>
    );
  }
  else if (element == "phone") {
    title = "Edit Phone Number";
    modalComponent = (
      <div>
        <Row>
          <Col xs={4} md={4} />
          <Col xs={4} md={4}>
            <div className={commonStyle['image-block-style']} />
          </Col>
          <Col xs={4} md={4} />
        </Row>
        <Row className={`${commonStyle['m-5']} ${commonStyle['mt-20']}`}>
          <Col xs={12} md={12} className={commonStyle['box']}>
            <div>Phone Number</div>
            <Input placeholder="Enter phone number" type="number" val={value} onChange={event => handleValueChange(event.target.value)} />
          </Col>
          <Col xs={12} md={12} className={commonStyle['box']}>
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
          <Col xs={12} md={12} className={`${commonStyle['t-c']}`}>
            <Btn btnWidth="95%" backGround="#034e94" color="#fff" btnText="Verify Mobile Number" BtnClickHandler={handleAction} />
          </Col>
        </Row>
      </div>
    );
  }
  

  return (
    <div>
      <div className={commonStyle['editProfileModal']}>
        <Row>
          <Col xs={11} md={11}>
          <h3>{title}</h3>
          </Col>
          <Col xs={1} md={1} onClick={handleClose}><a>
          X</a>
          </Col>
        </Row>
        {modalComponent}
      </div>
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
