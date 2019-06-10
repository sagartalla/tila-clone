import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Button from '../common/CommonButton';
import { languageDefinations } from '../../utils/lang';
import { selectors, actionCreators } from '../../store/cam/personalDetails';
import { actionCreators as authActionCreators } from '../../store/auth';
import VerifyStatus from './VerifyStatus';

import lang from '../../utils/language';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './login_en.styl';
import styles_ar from './login_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const { LOGIN_PAGE } = languageDefinations();

/* eslint- disable */
const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.enteredEmail || '',
      showInput: '',
      userNameError: false,
      errorMsg: '',
      radioValue: '',
      showModesToSelect: false,
      showSecurityQuestions: true,
    };
    this.sendLink = this.sendLink.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.switchState = this.switchState.bind(this);
    this.validatePassKey = this.validatePassKey.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.forgotPasswordStatus === 'SUCCESS') {
      this.setState({ showInput: true });
    } else {
      this.setState({ showInput: false });
    }
  }

  sendLink() {
    const { email } = this.state;
    let { userNameError, errorMsg } = this.state;
    const body = {
      email,
    };
    if (email === '') {
      userNameError = true;
      errorMsg = 'Please enter email id';
    } else if (!emailPattern.test(email)) {
      userNameError = true;
      errorMsg = 'Entered email is invalid';
    } else {
      this.props.forgotPassword(body).then((res) => {
        if (res && res.value && res.value.Response === 'SUCCESS') {
          this.setState({ showInput: true });
        } else {
          this.setState({ showInput: false });
        }
      });
    }
    this.setState({
      userNameError,
      errorMsg,
    });
  }

  handleChange(e) {
    let { userNameError, errorMsg } = this.state;
    if (!emailPattern.test(e.target.value)) {
      userNameError = true;
      errorMsg = 'Entered email is invalid';
    } else {
      userNameError = false;
      errorMsg = '';
    }
    this.setState({
      email: e.target.value,
      userNameError,
      errorMsg,
    });
  }

  switchState() {
    this.setState({
      showInput: '',
    });
  }

  resetShowLogin = () => {
    const { isCheckoutPage, resetShowLogin, toggleModal } = this.props;
    if (isCheckoutPage) {
      toggleModal();
    } else resetShowLogin();
  }

  handleChange = (e) => {
    const value = e.target.getAttribute('data-id');
    this.setState({
      radioValue: value,
    });
  }

  validatePassKey(e) {
    const key = e.target.getAttribute('id');
  }
  showModesToSelect = () => {
    this.setState({
      showModesToSelect: true,
      showSecurityQuestions: false,
    });
  }
  handleForgotPassword = () => {
    this.setState({
      showInput: true, // just example change state
    });
  }

  render() {
    const {
      showInput, radioValue, showModesToSelect, showSecurityQuestions,
    } = this.state;
    const { userInfo } = this.props;
    return (
      <div className={`${styles['forgot-password']} ${styles.flex} ${styles['flex-colum']} ${styles['justify-around']}`}>
        <div>
          <h3 className={`${styles['fs-22']} ${styles['mt-0']} ${styles['mb-10']} ${styles['ff-b']}`}>{LOGIN_PAGE.FORGOT_PASSWORD}</h3>
          {showSecurityQuestions && <div className={`${styles['text-clr']}`}>Please answer the security questions below to reset the password</div>}
        </div>
        {showSecurityQuestions &&
        <>
          <div>
            <label className={`${styles['label-light-grey']}`}>What is your Birth place?*</label>
            <input name="input" type="text" autoComplete="off" />
            <label className={`${styles['mt-40']} ${styles['label-light-grey']}`}>What i your mothers maiden name?*</label>
            <input name="input" type="text" autoComplete="off" />
          </div>
          <Button
            className={`${styles['flex-center']}  ${styles.width100} ${styles['fs-14']} ${styles['text-uppercase']} ${styles['button-radius']}`}
            btnText="Next"
            onClick={this.showModesToSelect}
          />
       </>}
        {showModesToSelect && showInput === '' ?
      <>
        <span className={`${styles['radio-buttons']} ${styles.flex} ${styles['flex-colum']} ${styles['justify-around']}`}>
          <div className={`${styles.flex}`}>
            <input name="addr_checkbox" type="radio" className={`${styles['radio-btn']} ${styles['radio-margin']}`} data-id="email" onChange={this.handleChange} />
            <span>
              <div className={radioValue === 'email' && `${styles['ff-b']}`}>Reset Password by Email:</div>
              <div className={radioValue === 'email' && `${styles['fs-14']} ${styles['ff-b']}`}>{userInfo.email || 'susmitha@gmail.com'}</div>
            </span>
          </div>
          <div className={`${styles.border}`} />
          <span>
            <div className={`${styles.flex}`}>
              <input name="addr_checkbox" type="radio" className={`${styles['radio-btn']} ${styles['radio-margin']}`} data-id="otp" onChange={this.handleChange} />
              <span>
                <div className={radioValue === 'otp' && `${styles['fs-14']} ${styles['ff-b']}`}>Reset by Mobile OTP:</div>
                <div className={radioValue === 'otp' && `${styles['fs-14']} ${styles['ff-b']}`}>{userInfo.mobile_number || '121212112'}</div>
              </span>
            </div>
          </span>
        </span>
        <Button
          className={`${styles['flex-center']}  ${styles.width100} ${styles['fs-14']} ${styles['text-uppercase']} ${styles['button-radius']}`}
          disabled={radioValue === ''}
          onClick={this.handleForgotPassword}
          btnText="Next"
        />
      </> :
      <VerifyStatus
        resetLogin={this.resetShowLogin}
        switchState={this.switchState}
        showInput={showInput}
        radioValue={radioValue}
        forgotPasswordStatus={this.props.forgotPasswordStatus}
        sendLink={this.sendLink}
        validatePassKey={this.validatePassKey}
      />
        }
      </div>
    );
  }
}

const mapStateToProps = store => ({
  forgotPasswordStatus: selectors.forgotPasswordStatus(store),
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    forgotPassword: actionCreators.forgotPassword,
    resetShowLogin: authActionCreators.resetShowLogin,
  },
  dispatch,
);

ForgotPassword.propTypes = {
  enteredEmail: PropTypes.string,
  forgotPassword: PropTypes.func,
  forgotPasswordStatus: PropTypes.string,
};

ForgotPassword.defaultProps = {
  enteredEmail: '',
  forgotPassword: f => f,
  forgotPasswordStatus: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
