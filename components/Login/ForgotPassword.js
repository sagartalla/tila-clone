import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Button from '../common/CommonButton';
import { languageDefinations } from '../../utils/lang';
import { selectors, actionCreators } from '../../store/auth';

import lang from '../../utils/language';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './login_en.styl';
import styles_ar from './login_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const { LOGIN_PAGE } = languageDefinations();

/* eslint- disable */

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userNameError: false,
      errorMsg: '',
      radioValue: '',
    };
    this.sendLink = this.sendLink.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.switchState = this.switchState.bind(this);
  }


  sendLink() {

    const { selectedValue, userNameError, errorMsg, radioValue } = this.state;
    const { activeEmailId } = this.props;

    const body = {
      email: activeEmailId,
    };
    this.props.forgotPassword(body).then((res) => {
      if (res && res.value && res.value.Response === 'SUCCESS') {
        this.setState({ showInput: true });
      } else {
        this.setState({ showInput: false });
      }
    });
    this.setState({
      userNameError,
      errorMsg,
    });
  }

  switchState() {
    this.setState({
      showInput: '',
    });
  }

  handleChange = (e) => {
    const key = e.target.getAttribute('data-id');
    this.setState({
      radioValue: key,
    });
  }

  resetShowLogin = () => {
    const { resetShowLogin } = this.props;
    resetShowLogin();
  }
  render() {
    const {
      radioValue,
    } = this.state;

    const { loadingStatus, activeEmailId } = this.props;

    return (
      <div className={`${styles['forgot-password']} ${styles.flex} ${styles['flex-colum']} ${styles['justify-around']}`}>
        <div>
          <h3 className={`${styles['fs-22']} ${styles['m-0']} ${styles['ff-b']}`}>{LOGIN_PAGE.FORGOT_PASSWORD}</h3>
          {showSecurityQuestions && <div className={`${styles['light-gry-clr']} ${styles['mt-5']}`}>Please answer the security questions below to reset the password</div>}
        </div>
        <React.Fragment>
          <span className={`${styles['radio-buttons']} ${styles.flex} ${styles['flex-colum']} ${styles['justify-around']}`}>
            <div className={`${styles.flex}`}>
              <input name="addr_checkbox" type="radio" className={`${styles['radio-btn']} ${styles['radio-margin']}`} data-id="email" onChange={this.handleChange} />
              <span className={`${styles['ml-10']}`}>
                <div className={radioValue === 'email' ? `${styles['fs-12']} ${styles.fontW600}` : `${styles['fs-12']}`}>Reset Password by Email:</div>
                <div className={radioValue === 'email' ? `${styles['fs-14']} ${styles.fontW600}` : `${styles['fs-12']}`}>{activeEmailId}</div>
              </span>
            </div>
            <div className={`${styles.border}`} />
            <span>
              <div className={`${styles.flex}`}>
                <input name="addr_checkbox" type="radio" className={`${styles['radio-btn']}`} data-id="otp" onChange={this.handleChange} />
                <span className={`${styles['ml-10']}`}>
                  <div className={radioValue === 'otp' ? `${styles['fs-12']} ${styles.fontW600}` : `${styles['fs-12']}`}>Reset by Mobile OTP:</div>
                  <div className={radioValue === 'otp' ? `${styles['fs-14']} ${styles.fontW600}` : `${styles['fs-12']}`}>121212112</div>
                </span>
              </div>
            </span>
          </span>
          <Button
            className={`${styles['flex-center']}  ${styles.width100} ${styles['fs-14']} ${styles['text-uppercase']} ${styles['button-radius']}`}
            disabled={radioValue === ''}
            onClick={this.sendLink}
            btnLoading={loadingStatus}
            btnText="Next"
          />
        </React.Fragment>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  forgotPasswordStatus: selectors.forgotPasswordStatus(store),
  activeObj: selectors.getActive(store),
  activeEmailId: selectors.getActiveEmailId(store),
  loadingStatus: selectors.getLoadingStatus(store),

});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    forgotPassword: actionCreators.forgotPassword,
    resetShowLogin: actionCreators.resetShowLogin,
  },
  dispatch,
);

ForgotPassword.propTypes = {
  activeEmailId: PropTypes.string,
  forgotPassword: PropTypes.func,
  forgotPasswordStatus: PropTypes.string,
};

ForgotPassword.defaultProps = {
  activeEmailId: '',
  forgotPassword: f => f,
  forgotPasswordStatus: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
