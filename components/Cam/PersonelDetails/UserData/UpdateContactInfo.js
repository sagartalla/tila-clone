import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import Btn from '../../../common/Button';
import Input from '../../../common/Input';

import commonStyle from '../../cam.styl';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, selectors } from '../../../../store/cam/personalDetails';



class UpdateContactInfo extends React.Component {

  state = {
    element: "",
    value: "",
    authValue: "",
    rePassword: "",
    error: "",
    show: false
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.contactInfo && Object.keys(nextProps.contactInfo).length > 0 && nextProps.element && this.state.element == "" && this.state.value == "") {
      this.setState({
        element: nextProps.element,
        value: nextProps.element == "email" ? nextProps.contactInfo.email : nextProps.element == "phone" ? nextProps.contactInfo.mobile_no : "",
        authValue: "",
        show: nextProps.show
      })
    }
    if (this.state.show == true && nextProps.errorMessege != this.state.error) {
      this.setState({
        error: nextProps.errorMessege
      });
    } 
    if (nextProps.passwordResetStatus != {} && nextProps.passwordResetStatus.hasOwnProperty('Response') && this.state.show == true) {
      if (nextProps.passwordResetStatus.Response == "SUCCESS") {
        this.setState({ error: "" });
        this.handleClose();
        alert("Your password is changed successfully!!");
      }
    }

  }

  handleClose = () => {
    this.setState({
      show: false,
      element: "",
      value: "",
      authValue: "",
      rePassword: "",
      error: ""
    });
    this.props.resetPasswordInfoStore();
    this.props.handleShow(false, '')();  
  }

  handleValueChange = () => (e) => {
    this.setState({ value: e.target.value });
    if (this.state.element == "password") {
      this.setState({ error: "" });
    }
  }

  handleRePasswordBlur = () => (e) => {
    if (e.target.value != this.state.authValue) {
      this.setState({ error: "Passwords must match" });
    }
    else if (e.target.value == this.state.authValue) {
      this.setState({ error: "" });
    }
  }

  handleAuthValueChange = () => (e) => {
    if (this.state.element == "password") {
      if (e.target.value != this.state.rePassword && this.state.rePassword.length > 0) {
        this.setState({
          error: "Passwords must match",
          authValue: e.target.value
        });
      }
      else if (this.state.rePassword.length > 0 && e.target.value.length == 0) {
        this.setState({
          error: "Passwords must match",
          authValue: e.target.value
        });
      }
      else {
        this.setState({
          error: "",
          authValue: e.target.value
        });
      }
    } else if (this.state.element == "email" || this.state.element == "phone")
      this.setState({ authValue: e.target.value });
  }

  handleRePasswordChange = () => (e) => {
    this.setState({
      rePassword: e.target.value
    });
  }

  handleForgotPassword = () => {
    console.log('handleForgotPassword');
  }

  handleResendOtp = () => {
    console.log('handleResendOtp');
  }

  handleAction = () => {
    if (this.state.element == 'email') {
      /**TODO : Change Email API call**/
    } else if (this.state.element == 'password') {
      this.props.resetPasswordInfoStore();
      if (this.state.authValue == this.state.rePassword && this.state.authValue.length > 0 && this.state.value.length > 0) {
        this.props.changePassword({
          "current_password": this.state.value,
          "new_password": this.state.authValue
        });
      } else {
        if (this.state.authValue.length == 0 || this.state.value.length == 0 || this.state.rePassword.length == 0)
          this.setState({ error: "Password cannot be empty" });
        else
          this.setState({ error: "Passwords must match" });
      }
    } else if (this.state.element == 'phone') {
      /**TODO : Change Phone number API call**/
    }
    /**TODO : Refresh the profile page once the data is changed**/
  }

  render() {
    let { value, rePassword, authValue, error, element } = this.state;
    let title = "";
    let modalComponent = <div>Loading..</div>
    let errorComponent = null;
    if (error) {
      errorComponent = (
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
              <div />
            </Col>
            <Col xs={4} md={4} />
          </Row>

          <Row className={`${commonStyle['m-5']} ${commonStyle['mt-20']}`}>
            <Col xs={12} md={12} className={`${commonStyle['box']}`}>
              <div>Email ID</div>
              <Input placeholder="Enter Email Id" type="email" val={value} onChange={this.handleValueChange()} />
            </Col>
            <Col xs={12} md={12} className={`${commonStyle['box']}`}>
              <div>Account Password</div>
              <Row>
                <Col xs={8} md={8}>
                  <Input placeholder="Enter Password" type="password" val={authValue} onChange={this.handleAuthValueChange()} />
                </Col>
                <Col xs={4} md={4}>
                  <span><a onClick={this.handleForgotPassword}>Forgot Password?</a></span>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12} className={`${commonStyle['t-c']}`}>
              <Btn btnWidth="95%" backGround="#034e94" color="#fff" btnText="Save Email Id" BtnClickHandler={this.handleAction} />
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
              <div />
            </Col>
            <Col xs={4} md={4} />
          </Row>
          <Row>
            {errorComponent}
          </Row>
          <Row className={`${commonStyle['m-5']} ${commonStyle['mt-20']}`}>
            <Col xs={12} md={12} className={commonStyle['box']}>
              <div>Enter Old Password</div>
              <Input placeholder="Enter Old Password" type="password" val={value} onChange={this.handleValueChange()} />
            </Col>
            <Col xs={12} md={12} className={commonStyle['box']}>
              <Col xs={6} md={6} className={commonStyle['pl-0']}>
                <div>Enter New Password</div>
                <Input placeholder="Enter New Password" type="password" val={authValue} onChange={this.handleAuthValueChange()} />
              </Col>
              <Col xs={6} md={6} className={commonStyle['pl-0']}>
                <div>Re-enter New Password</div>
                <Input placeholder="Re enter Password" type="password" val={rePassword} onChange={this.handleRePasswordChange()} onBlur={this.handleRePasswordBlur()} />
              </Col>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12} className={`${commonStyle['t-c']}`}>
              <Btn btnWidth="95%" backGround="#034e94" color="#fff" btnText="Change Password" BtnClickHandler={this.handleAction} />
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
              <Input placeholder="Enter phone number" type="number" val={value} onChange={this.handleValueChange()} />
            </Col>
            <Col xs={12} md={12} className={commonStyle['box']}>
              <div>Enter OTP</div>
              <Row>
                <Col xs={8} md={8}>
                  <Input placeholder="Enter OTP" val={authValue} onChange={this.handleAuthValueChange()} />
                </Col>
                <Col xs={4} md={4}>
                  <span><a onClick={this.handleResendOtp}>Resend OTP</a></span>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12} className={`${commonStyle['t-c']}`}>
              <Btn btnWidth="95%" backGround="#034e94" color="#fff" btnText="Verify Mobile Number" BtnClickHandler={this.handleAction} />
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
            <Col xs={1} md={1} onClick={this.handleClose}><a>
              X</a>
            </Col>
          </Row>
          {modalComponent}
        </div>
      </div>
    );

  }
}

const mapStateToProps = (store) => ({
  passwordResetStatus: selectors.getPasswordResetStatus(store),
  errorMessege: selectors.getErrorMessege(store),
  resetPasswordStatus: selectors.resetPasswordStatus(store)
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      changePassword: actionCreators.changePassword,
      resetPasswordInfoStore: actionCreators.resetPasswordInfoStore
    },
    dispatch,
  );

UpdateContactInfo.propTypes = {
  show: PropTypes.bool,
  handleShow: PropTypes.func.isRequired,
  contactInfo: PropTypes.object,
  element: PropTypes.string,
  passwordResetStatus: PropTypes.object,
  errorMessege: PropTypes.string,
  changePassword: PropTypes.func,
  resetPasswordInfoStore: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateContactInfo);

