import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { mergeCss } from '../../utils/cssUtil';
import { actionCreators } from '../../store/auth';
import Input from '../common/Input';
import Button from '../common/CommonButton';
import SVGComponent from '../common/SVGComponet';
import { languageDefinations } from '../../utils/lang';

const styles = mergeCss('components/Login/login');
const { EMAIL_VERIFICATION } = languageDefinations();

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      otpError: false,
    };
  }

  enterOtp = (e) => {
    let { otpError, value } = this.state;
    if (e.target.value) {
      otpError = false;
      value = e.target.value;
    } else {
      otpError = true;
      value = '';
    }
    this.setState({
      otpError,
      value,
    });
  }

  verifyEmail = () => {
    const { value } = this.state;
    if (value === '') {
      this.setState({
        otpError: true,
      });
      return;
    }
    const { verifyEmailId } = this.props;
    const body = {
      "otp": Number(value),
    };
    verifyEmailId(body);
  }

  sendOtpToEmailId = () => {
    const { sendOtpToEmailId } = this.props;
    sendOtpToEmailId();
  }
  render() {
    const { email, onBackdropClick, loadingStatus } = this.props;
    const { value, otpError } = this.state;
    return (
      <div>
        <div className={`${styles.flex} ${styles['align-center']} ${styles['justify-between']}  ${styles['mt-15']}`}>
          <div className={`${styles['ff-b']} ${styles['fs-20']}`}>{EMAIL_VERIFICATION.VERIFY_YOUR_EMAIL}</div>
          <div className={`${styles.flex} ${styles.pointer}`} onClick={onBackdropClick}><SVGComponent clsName={`${styles['cross-icon']}`} src="icons/common-icon/cross-button" /></div>
        </div>
        <div className={`${styles.flex} ${styles['justify-between']} ${styles['flex-col']} ${styles['email-form']} ${styles['mt-20']}`}>
          <div className={`${styles['verify-email']} ${styles['p-10']}`}>
            <div className={`${styles.flex} ${styles['align-center']}`}>
              <SVGComponent clsName={`${styles['tickmark-icon']}`} src="icons/common-icon/blue-tick" />
              <div className={`${styles['ml-10']}`}>{EMAIL_VERIFICATION.OTP_SENT}</div>
            </div>
            <div className={`${styles['ff-b']} ${styles['fs-16']} ${styles['ml-25']}`}>{email}</div>
          </div>
          <div className={`${styles.flex} ${styles['align-center']} ${styles['flex-col']}`}>
            <div>{EMAIL_VERIFICATION.ENTER_OTP}</div>
            <Input
              type="text"
              autoFocus
              style={{ border: '1px solid lightgray', width: '50%', margin: '15px' }}
              val={value}
              onChange={this.enterOtp}
            />
            {otpError ? <div className={`${styles['thick-red-clr']}`}>Please enter OTP sent to your mail id</div> : ''}
            <div className={`${styles.flex}`}><div className={`${styles['otp-expire']}`}>{EMAIL_VERIFICATION.OTP_EXPIRE_IN}&nbsp;</div><div className={`${styles['black-color']}`}>{EMAIL_VERIFICATION.TWENTY_FOUR_HOURS}</div>
              <span
                className={`${styles['lgt-blue']} ${styles.pointer}`}
                onClick={this.sendOtpToEmailId}
              >&nbsp;{EMAIL_VERIFICATION.RESEND}
              </span>
            </div>
          </div>
          <Button
            className={`${styles['flex-center']} ${styles['fs-14']} ${styles['text-uppercase']} ${styles['button-radius']}`}
            onClick={this.verifyEmail}
            btnText={EMAIL_VERIFICATION.VERIFY}
            hoverClassName="hoverBlueBackground"
            btnLoading={loadingStatus}
          />
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    verifyEmailId: actionCreators.verifyEmailId,
    sendOtpToEmailId: actionCreators.sendOtpToEmailId,
  },
  dispatch,
);

VerifyEmail.propTypes = {
  verifyEmailId: PropTypes.func,
  sendOtpToEmailId: PropTypes.func,
  email: PropTypes.string,
  onBackdropClick: PropTypes.func,
  loadingStatus: PropTypes.bool,
};
VerifyEmail.defaultProps = {
  verifyEmailId: f => f,
  sendOtpToEmailId: f => f,
  email: '',
  onBackdropClick: f => f,
  loadingStatus: false,
};

export default connect(null, mapDispatchToProps)(VerifyEmail);
