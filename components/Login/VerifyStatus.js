import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectors, actionCreators } from '../../store/auth';
import { languageDefinations } from '../../utils/lang';
import lang from '../../utils/language';
import Button from '../common/CommonButton';
import OTPInput from './OTPInput';
import SVGComponent from '../common/SVGComponet';
import Timer from '../common/Timer';
import FormValidator from '../common/FormValidator';
import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './login_en.styl';
import styles_ar from './login_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };


const { EMAIL_VERIFICATION, LOGIN_PAGE } = languageDefinations();
const resetEmailLink = EMAIL_VERIFICATION.RESET_PASSWORD_LINK_SENT;
const resetMobileLink = LOGIN_PAGE.OTP_SENT_TO_YOUR_REGISTERED_MAIL;

class VerifyStatus extends React.Component {
  constructor(props) {
    super(props);
    this.validations = new FormValidator([
      {
        field: 'otpValue',
        method: this.emptyValue,
        message: 'OTP should not be empty',
        validWhen: false,
        resendClicked: false,
      },
    ]);
    this.state = {
      seconds: 30 * 60,
      otpValue: '',
      validation: this.validations.valid(),
    };
    this.sendLink = this.sendLink.bind(this);
    this.sentOtpToReset = this.sentOtpToReset.bind(this);
  }

  getSeconds = (sec) => {
    if (sec === 0) {
      this.setState({
        seconds: sec,
      });
    }
  }
  sendLink(e) {
    const { selectedValue } = this.state;
    const { activeEmailId } = this.props;
    const value = e.target.getAttribute('data-id');
    const { userNameError, errorMsg } = this.state;
    const body = {
      email: activeEmailId,
    };
    this.setState({
      resendClicked: true,
    });
    if (value === 'email') {
      this.props.forgotPassword(body).then(() => {
        this.setState({
          seconds: 30 * 60,
        });
      });
    } else {
      this.props.getMobileOtp(activeEmailId);
    }
  }

  closeSuccessScreen = () => {
    this.props.onBackdropClick();
  }
  saveOtp = (otp) => {
    this.setState({
      otpValue: otp,
    });
  }


  emptyValue = fieldValue => fieldValue === '';

  otpValidation = (fieldValue) => {
    if (fieldValue && fieldValue.length < 4) return false;
    return true;
  }

  sentOtpToReset = type => () => {
    const { verifyResetOtp, activeEmailId, v2CurrentFlow } = this.props;
    const { otpValue } = this.state;
    const validation = this.validations.validate(this.state);
    if (validation.isValid) {
      const body = {
        email: activeEmailId,
        otp: Number(otpValue),
        verify_type: type,
      };
      verifyResetOtp(body).then((res) => {
        const data = { currentFlow: 'forgot_password_reset', nextPage: 'reset_screen' };
        if (res && res.value && res.value.status && res.value.status === 200) {
          v2CurrentFlow(data);
        }
      });
    }
    this.setState({
      validation,
    });
  }


  render() {
    const { validation, seconds, resendClicked } = this.state;
    const {
      showEmailSuccess, showOtpSuccess, loadingStatus, userData, activeEmailId,
    } = this.props;
    return (
      <div className={`${styles['forgot-password']} ${styles.flex} ${styles['flex-colum']} ${styles['justify-around']}`}>
        <div>
          <h3 className={`${styles['fs-22']} ${styles['m-0']} ${styles['ff-b']}`}>{LOGIN_PAGE.FORGOT_PASSWORD}</h3>
        </div>
        <React.Fragment>
          {showEmailSuccess ?
            <React.Fragment>
              <div className={`${styles['reset-link']} ${styles.relative}`}>
                <Row className={`${styles.flex}`}>
                  <Col md={9} className={`${styles['fs-14']}`}><span className={`${styles.flex} ${styles['t-l']} ${styles['flex-colum']}`}><span>{resetEmailLink}&nbsp;<span className={`${styles['ff-b']}`}>{userData && userData.email}</span></span></span></Col>
                  <Col md={3} className={`${styles.flex}`}><SVGComponent clsName={`${styles['email-success-icon']}`} src="icons/common-icon/email-sent" /></Col>
                </Row>
                <a className={`${styles['text-blue']} ${styles['fs-12']} ${styles['mt-10']} ${styles.pointer} ${styles.fontW600}`} data-id="email" onClick={this.sendLink}>{EMAIL_VERIFICATION.RESEND_THE_LINK}</a>
                <div className={`${styles.border} ${styles['mt-10']} ${styles['mb-10']}`} />
                <div className={`${styles['fs-14']} ${styles['t-l']}`}>{EMAIL_VERIFICATION.PLEASE_CLICK_ON_EMAIL_LINK}</div>
                {/* <span className={styles['bg-light-gray']}>
                <div className={`${styles['fs-12']} ${styles['t-l']}`}>
                  {EMAIL_VERIFICATION.IF_YOU_DO_NOT_RECEIVE_YOUR_EMAIL}
                  &nbsp;{EMAIL_VERIFICATION.CHECK_YOUR_SPAM_FOLDER}
                </div>
              </span> */}
              </div>
              <div className={`${styles['fs-14']} ${styles['pl-10']}`}>{LOGIN_PAGE.ENTER_FOUR_DIGIT_OTP}</div>
              {/* <div className={`${styles['flex-center']}`}>
                  <span className={`${styles['otp-expire']} ${styles['fs-12']}`}>{LOGIN_PAGE.OTP_EXPIRE_IN}&nbsp;</span>
                  {seconds !== '' && <span className={styles['black-color']}><Timer time={1} getSeconds={this.getSeconds} /></span>}
                </div> */}
            </React.Fragment> :
            showOtpSuccess &&
            <React.Fragment>
              <div className={`${styles['reset-link']} ${styles.relative}`}>
                <Row className={`${styles.flex}`}>
                  <Col md={9} className={`${styles['fs-14']} ${styles['t-l']}`}><span>{resetMobileLink}&nbsp;<span className={`${styles['ff-b']}`}>{userData && userData.mobile_no}</span></span></Col>
                  <Col md={3} className={`${styles.flex}`}><SVGComponent clsName={`${styles['email-success-icon']}`} src="icons/common-icon/otp-sent" /></Col>
                </Row>
                <div className={`${styles['text-blue']} ${styles['fs-12']} ${styles['mt-10']} ${styles.pointer} ${styles.fontW600}`} data-id="otp" onClick={this.sendLink}>{LOGIN_PAGE.RESEND_OTP}</div>
              </div>
              <div>
                <div className={`${styles['pl-10']}`}>{LOGIN_PAGE.PLEASE_ENTER_FOUR_DIGIT_OTP}</div>
                {/* <div className={`${styles['flex-center']}`}>
                  <span className={`${styles['otp-expire']} ${styles['fs-12']}`}>{LOGIN_PAGE.OTP_EXPIRE_IN}&nbsp;</span>
                  <span className={styles['black-color']}><Timer time={1} /></span>
                </div> */}
              </div>
            </React.Fragment>}
          <div className={`${styles['flex-center']}`}>
<<<<<<< components/Login/VerifyStatus.js
              <span className={`${styles['otp-expire']} ${styles['fs-12']} ${styles['pl-10']}`}>{seconds === 0 ? <div>{EMAIL_VERIFICATION.OTP_HAS} <span className={`${styles['thick-red']}`}>{EMAIL_VERIFICATION.OTP_EXPIRED}</span>, {EMAIL_VERIFICATION.CLICK_LINK_ABOVE}</div> : LOGIN_PAGE.OTP_EXPIRE_IN}&nbsp;</span>
              {seconds !== 0 && <span className={styles['black-color']}><Timer time={seconds} getSeconds={this.getSeconds} /><span className={`${styles['otp-expire']} ${styles['fs-12']} ${styles['pl-5']}`}>{LOGIN_PAGE.HURRY}</span></span>}
=======
              <span className={`${styles['otp-expire']} ${styles['fs-12']} ${styles['pl-10']}`}>{seconds === 0 ? <div>OTP has <span className={`${styles['thick-red']}`}>Expired</span>, Please click on the resend link above</div> : LOGIN_PAGE.OTP_EXPIRE_IN}&nbsp;</span>
              {seconds !== 0 && <span className={styles['black-color']}><Timer time={seconds} getSeconds={this.getSeconds} resendClicked={resendClicked}/><span className={`${styles['otp-expire']} ${styles['fs-12']} ${styles['pl-5']}`}>{LOGIN_PAGE.HURRY}</span></span>}
>>>>>>> components/Login/VerifyStatus.js
            </div>
          <div className={`${styles['flex-center']} ${styles['mb-5']} ${styles['flex-colum']}`}>
            <OTPInput
              containerStyle={`${styles['justify-center']}`}
              separator={<span>&nbsp;&nbsp;</span>}
              onChange={otp => this.saveOtp(otp)}
            />
            {
                    validation.otpValue && validation.otpValue.isInValid ?
                      <div className={`${styles['mt-10']}`}>
                        <span className={`${styles['error-msg']}`}>{validation.otpValue.message}</span>
                      </div> : null
                   }
          </div>
          <Button
            className={`${styles['flex-center']}  ${styles.width100} ${styles['fs-14']} ${styles['text-uppercase']} ${styles['button-radius']}`}
            btnText={LOGIN_PAGE.NEXT}
            onClick={this.sentOtpToReset(showEmailSuccess ? 'EMAIL' : 'MOBILE')}
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
  userData: selectors.userData(store),
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    forgotPassword: actionCreators.forgotPassword,
    showNextPage: actionCreators.showNextPage,
    verifyResetOtp: actionCreators.verifyResetOtp,
    getMobileOtp: actionCreators.getMobileOtp,
    v2CurrentFlow: actionCreators.v2CurrentFlow,
  },
  dispatch,
);

VerifyStatus.propTypes = {
  forgotPasswordStatus: PropTypes.string,
};

VerifyStatus.defaultProps = {

  forgotPasswordStatus: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyStatus);
