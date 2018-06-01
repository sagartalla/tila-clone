import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, selectors } from '../../../../store/cam/personalDetails';

import UpdateContactInfo from './UpdateContactInfo';
import Input from '../../Common/Input';

import CommonStyle from '../../cam.styl';


class ContactInfo extends React.Component {
  constructor() {
    super();
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleAuthValueChange = this.handleAuthValueChange.bind(this);
    this.handleRePasswordChange = this.handleRePasswordChange.bind(this);
    this.handleAction = this.handleAction.bind(this);
    this.handleForgotPassword = this.handleForgotPassword.bind(this);
    this.handleResendOtp = this.handleResendOtp.bind(this);
    this.handleRePasswordBlur = this.handleRePasswordBlur.bind(this);
    this.state = {
      show: false,
      element: "",
      value: "",
      authValue: "",
      rePassword: "",
      error: ""
    };
  }

  componentWillReceiveProps(nextProps) {
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

  handleClose() {
    this.setState({
      show: false,
      element: "",
      value: "",
      authValue: "",
      rePassword: "",
      error: ""
    });
  }

  handleShow(elem, val) {
    this.setState({
      element: elem,
      value: val,
      show: true
    });
  }

  handleValueChange(val) {
    this.setState({ value: val });
    if (this.state.element == "password") {
      this.setState({ error: "" });
    }
  }

  handleRePasswordBlur(val){
    if (val != this.state.authValue) {
      this.setState({ error: "Passwords must match" });
    }
    else if(val == this.state.authValue){
      this.setState({ error: "" });
    }
  }

  handleAuthValueChange(val) {
    if (this.state.element == "password") {
      if (val != this.state.rePassword && this.state.rePassword.length > 0) {
        this.setState({
          error: "Passwords must match",
          authValue: val
        });
      }
      else if (this.state.rePassword.length > 0 && val.length == 0) {
        this.setState({
          error: "Passwords must match",
          authValue: val
        });
      }
      else 
      {
      this.setState({ error: "",
      authValue: val });
      }
    } else if (this.state.element == "email" || this.state.element == "phone")
      this.setState({ authValue: val });
  }

  handleRePasswordChange(val) {
      this.setState({
        rePassword: val
      });
  }

  handleForgotPassword() {
    console.log('handleForgotPassword');
  }

  handleResendOtp() {
    console.log('handleResendOtp');
  }

  handleAction() {
    if (this.state.element == 'email') {
      /**TODO : Change Email API call**/
    } else if (this.state.element == 'password') {
      if(this.state.authValue == this.state.rePassword && this.state.authValue.length>0 && this.state.value.length>0)
      {
      this.props.changePassword({
        "current_password": this.state.value,
        "new_password": this.state.authValue
      });
    }else {
      if(this.state.authValue.length==0 || this.state.value.length==0 || this.state.rePassword.length==0)
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
    const { email, mobile_no, lastUpdated } = this.props.contactInfo ? this.props.contactInfo : { email: "", mobile_no: "", lastUpdated: "not available" };
    const { element, value, show, authValue, rePassword, error } = this.state;
    return (
      <div className={CommonStyle['base-padding']}>
        <Row>
          <Col xs={12} md={12}>
            <h6>Contact Information</h6>
          </Col>
        </Row>
        <Row className={`${CommonStyle['bb-dashed']} ${CommonStyle['pb-5']} ${CommonStyle['pt-5']}`}>
          <Col xs={12} md={3} className={`${CommonStyle['pl-15']} ${CommonStyle['pr-0']} ${CommonStyle['m-5']}`}>
            <span>Email</span>
          </Col>
          <Col xs={12} md={8} className={`${CommonStyle['p-0']} ${CommonStyle['m-5']}`}>
            <Col xs={6} md={9}>
              <span>{email}</span>
            </Col>
            <Col xs={6} md={3}>
              <span className={`${CommonStyle['float-right']} ${CommonStyle['p-0']} ${CommonStyle['ml-5']}`}>
                <a onClick={() => { this.handleShow(`email`, email) }}>Edit</a>
              </span>
            </Col>
          </Col>
        </Row>
        <Row className={`${CommonStyle['bb-dashed']} ${CommonStyle['pb-5']} ${CommonStyle['pt-5']}`}>
          <Col xs={12} md={3} className={`${CommonStyle['pl-15']} ${CommonStyle['pr-0']} ${CommonStyle['m-5']}`}>
            <span>Password</span>
          </Col>
          <Col xs={12} md={8} className={`${CommonStyle['p-0']} ${CommonStyle['m-5']}`}>
            <Col xs={6} md={9}>
              <span>Last updated {lastUpdated}</span>
            </Col>
            <Col xs={6} md={3}>
              <span className={`${CommonStyle['float-right']} ${CommonStyle['p-0']} ${CommonStyle['ml-5']}`}>
                <a onClick={() => { this.handleShow(`password`, ``) }}>Edit</a>
              </span>
            </Col>
          </Col>
        </Row>
        <Row className={`${CommonStyle['bb-dashed']} ${CommonStyle['pb-5']} ${CommonStyle['pt-5']}`}>
          <Col xs={12} md={3} className={`${CommonStyle['pl-15']} ${CommonStyle['pr-0']} ${CommonStyle['m-5']}`}>
            <span>Phone Number</span>
          </Col>
          <Col xs={12} md={8} className={`${CommonStyle['p-0']} ${CommonStyle['m-5']}`}>
            <Col xs={6} md={9}>
              <span>{mobile_no}</span>
            </Col>
            <Col xs={6} md={3}>
              <span className={`${CommonStyle['float-right']} ${CommonStyle['p-0']} ${CommonStyle['ml-5']}`}>
                <a onClick={() => { this.handleShow(`phone`, mobile_no) }}>Edit</a>
              </span>
            </Col>
          </Col>

        </Row>
        <Row>
          <Col md={8} />
          <Col md={4} xs={12}>
            <UpdateContactInfo
              show={show}
              handleClose={this.handleClose}
              element={element}
              value={value}
              authValue={authValue}
              rePassword={rePassword}
              error={error}
              handleValueChange={this.handleValueChange}
              handleAuthValueChange={this.handleAuthValueChange}
              handleRePasswordChange={this.handleRePasswordChange}
              handleAction={this.handleAction}
              handleForgotPassword={this.handleForgotPassword}
              handleResendOtp={this.handleResendOtp}
              handleRePasswordBlur= {this.handleRePasswordBlur}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12} className={CommonStyle['base-margin']}><a>Deactivate account</a></Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  passwordResetStatus: selectors.getPasswordResetStatus(store),
  errorMessege: selectors.getErrorMessege(store)
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      changePassword: actionCreators.changePassword
    },
    dispatch,
  );

ContactInfo.propTypes = {
  contactInfo: PropTypes.object,
  passwordResetStatus: PropTypes.object,
  getUserProfileInfo: PropTypes.func,
  errorMessege: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactInfo);
