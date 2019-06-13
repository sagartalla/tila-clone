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
import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './login_en.styl';
import styles_ar from './login_ar.styl';
import SVGComponent from '../common/SVGComponet';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };
/* eslint-disable */

const { EMAIL_VERIFICATION, LOGIN_PAGE } = languageDefinations();
const resetEmailLink = EMAIL_VERIFICATION.RESET_PASSWORD_LINK_SENT;
const resetMobileLink = LOGIN_PAGE.OTP_SENT_TO_YOUR_REGISTERED_MAIL;

class VerifyStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: 'susmithaCAM1@gmail.com',
    };
    this.sendLink = this.sendLink.bind(this);
  }

  sendLink() {
    const { selectedValue } = this.state;
    const { userNameError, errorMsg } = this.state;
    const body = {
      email: selectedValue,
    };
    this.props.forgotPassword(body);
  }

  resetShowLogin = () => {
    const { resetShowLogin } = this.props;
    resetShowLogin();
  }

  closeSuccessScreen = () => {
    const { activeObj } = this.props; 
    const { showEmailSuccess } = this.props;
    const data = { currentFlow: 'forgot_password', activeTab: 'close_screen' };
    const { showNextPage } = this.props;
    showNextPage(data);
  }

  render() {
    const { showInput } =this.state;
    const { showEmailSuccess } = this.props;
    return (
    <div className={`${styles['forgot-password']} ${styles.flex} ${styles['flex-colum']} ${styles['justify-around']}`}>
       <div>
          <h3 className={`${styles['fs-22']} ${styles['m-0']} ${styles['ff-b']}`}>{LOGIN_PAGE.FORGOT_PASSWORD}</h3>
        </div>
      {showEmailSuccess ?
        <React.Fragment>
          <div className={styles['reset-link']}>
          <Row className={`${styles.flex}`}>
            <Col md={8} className={`${styles['fs-14']}`}>{resetEmailLink}</Col>
            <Col md={4} className={`${styles.flex}`}><SVGComponent clsName={`${styles['email-success-icon']}`} src="icons/common-icon/email-sent" /></Col>
            </Row>
            <div className={`${styles['text-blue']} ${styles['fs-12']} ${styles.pointer}`} onClick={this.sendLink}>{EMAIL_VERIFICATION.RESEND_THE_LINK}</div>   
            <div className={`${styles.border} ${styles['m-10']}`} />
            <div className={`${styles['fs-14']}`}>{EMAIL_VERIFICATION.PLEASE_CLICK_ON_EMAIL_LINK}</div>
            <span className={styles['bg-light-gray']}>
              <div className={`${styles['fs-12']}`}>
                {EMAIL_VERIFICATION.IF_YOU_DO_NOT_RECEIVE_YOUR_EMAIL}
                {EMAIL_VERIFICATION.CHECK_YOUR_SPAM_FOLDER}
              </div>
            </span>
          </div>
          <Button
            className={`${styles['flex-center']}  ${styles.width100} ${styles['fs-14']} ${styles['text-uppercase']} ${styles['button-radius']}`}
            btnText="OK"
            onClick={this.closeSuccessScreen}
          />
        </React.Fragment>
        :
        <React.Fragment>
           <div className={styles['reset-link-mobile']}> 
            <Row className={`${styles.flex}`}>
            <Col md={8} className={`${styles['fs-14']}`}>{resetMobileLink}</Col>
            <Col md={4} className={`${styles.flex}`}><SVGComponent clsName={`${styles['email-success-icon']}`} src="icons/common-icon/otp-sent" /></Col>
            </Row>
            <div className={`${styles['text-blue']} ${styles['fs-12']} ${styles['mt-10']} ${styles.pointer}`} onClick={this.sendLink}>{LOGIN_PAGE.RESEND_OTP}</div>
          </div>
          <div>
            <div>{LOGIN_PAGE.PLEASE_ENTER_FOUR_DIGIT_OTP}</div>
            <div className={`${styles['flex-center']}`}>
            <span className={`${styles['otp-expire']} ${styles['fs-12']}`}>{LOGIN_PAGE.OTP_EXPIRE_IN}</span>
            <span>&nbsp;30 Mins</span>
            </div>
          </div>
          <div className={`${styles.flex} ${styles['mb-5']}`}>
            <OTPInput
              containerStyle={`${styles['justify-center']}`}
              inputStyle={`${styles['border-none']} ${styles['border-b']}`}
              separator={<span>&nbsp;&nbsp;</span>}
              onChange={otp => console.log(otp)}
            />
          </div>
          <Button
            className={`${styles['flex-center']}  ${styles.width100} ${styles['fs-14']} ${styles['text-uppercase']} ${styles['button-radius']}`}
            btnText={LOGIN_PAGE.NEXT}
            onClick={this.resetShowLogin}
          />
        </React.Fragment>
      }
    </div>
  );
};
}


const mapStateToProps = store => ({
  forgotPasswordStatus: selectors.forgotPasswordStatus(store),
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    forgotPassword: actionCreators.forgotPassword,   
    showNextPage: actionCreators.showNextPage,  
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
