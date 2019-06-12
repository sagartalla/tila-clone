import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Btn from '../common/Button';
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

const VerifyStatus = (props) => {
  const resetEmailLink = EMAIL_VERIFICATION.RESET_PASSWORD_LINK_SENT;
  const resetMobileLink = LOGIN_PAGE.OTP_SENT_TO_YOUR_REGISTERED_MAIL;
  return (
    <>
      {props.showInput && props.radioValue === 'email' ?
        <React.Fragment>
          <div className={styles['reset-link']}>
          <Row className={`${styles.flex}`}>
            <Col md={8} className={`${styles['fs-16']}`}>{resetEmailLink}</Col>
            <Col md={4} className={`${styles.flex}`}><SVGComponent clsName={`${styles['email-success-icon']}`} src="icons/common-icon/email-sent" /></Col>
            </Row>
            <div className={`${styles['text-blue']} ${styles.pointer}`} onClick={props.sendLink}>{EMAIL_VERIFICATION.RESEND_THE_LINK}</div>   
            <div className={`${styles.border}`} />
            <div className={`${styles['fs-16']}`}>{EMAIL_VERIFICATION.PLEASE_CLICK_ON_EMAIL_LINK}</div>
            <span className={styles['bg-light-gray']}>
              <small>
                {EMAIL_VERIFICATION.IF_YOU_DO_NOT_RECEIVE_YOUR_EMAIL}
                <br />
                {EMAIL_VERIFICATION.CHECK_YOUR_SPAM_FOLDER}
              </small>
            </span>
          </div>
          <Button
            className={`${styles['flex-center']}  ${styles.width100} ${styles['fs-14']} ${styles['text-uppercase']} ${styles['button-radius']}`}
            btnText={LOGIN_PAGE.NEXT}
            onClick={props.resetLogin}
          />
        </React.Fragment>
        :
        props.showInput && props.radioValue === 'otp' ?
        <React.Fragment>
           <div className={styles['reset-link-mobile']}> 
            <Row className={`${styles.flex}`}>
            <Col md={8} className={`${styles['fs-16']}`}>{resetMobileLink}</Col>
            <Col md={4} className={`${styles.flex}`}><SVGComponent clsName={`${styles['email-success-icon']}`} src="icons/common-icon/otp-sent" /></Col>
            </Row>
            <div className={`${styles['text-blue']} ${styles['mt-10']} ${styles.pointer}`} onClick={props.sendLink}>{LOGIN_PAGE.RESEND_OTP}</div>
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
            onClick={props.resetLogin}
          />
        </React.Fragment> 
        :
        props.showInput === false &&
          <>
            <div className={styles['invalid-email']}>
              {props.forgotPasswordStatus}
            </div>
            <Button
            className={`${styles['flex-center']}  ${styles.width100} ${styles['fs-14']} ${styles['text-uppercase']} ${styles['button-radius']}`}
            btnText={LOGIN_PAGE.NEXT}
            onClick={props.switchState}
          />
          </>
      }
    </>
  );
};

export default VerifyStatus;
