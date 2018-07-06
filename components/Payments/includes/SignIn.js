import React from 'react';
import SVGComponent from '../../common/SVGComponet';
import { Grid, Row, Col } from 'react-bootstrap';
import { languageDefinations } from '../../../utils/lang/';
import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Payments/payment');
const { PAYMENT_PAGE } = languageDefinations();

const SignIn = props => (
  <div className={`${styles['pb-15']} ${styles['pt-15']} ${styles['pl-35']} ${styles['pr-35']} ${styles['box']} ${styles['mb-20']} ${styles['relative']} ${styles['payment-signup']}`}>
    <SVGComponent clsName={`${styles['profile']} ${props.configJson.done ? 'done' : ''} ${props.configJson.progress ? 'payment-active' : ''}`} src="icons/profile/profile" />
    <Row className={`${props.configJson.done ? '' : 'hide'} ${styles['flex-center']}`}>
      <Col md={8} sm={12} xs={12}>
        <h4 className={styles['m-0']}>{PAYMENT_PAGE.SIGN_IN}</h4>
        <small>{PAYMENT_PAGE.SIGN_IN_SIGN_UP_TO_CONTINUE}</small>
      </Col>
      <Col md={4} sm={12} xs={12} className={styles['t-rt']}>
        <span className={`${styles['light-gry-clr']} ${styles['fontW600']}`}>{props.login.username}</span>
      </Col>
    </Row>

    <Row className={`${props.configJson.progress ? '' : 'hide'} ${styles['pb-5']} ${styles['pt-5']}`}>
      <Col md={4} sm={12} xs={12}>
        <h4 className={`${styles['mb-20']} ${styles['mt-0']} ${styles['light-gry-clr']}`}>{PAYMENT_PAGE.REGISTER}</h4>
        <div className={`${styles['thin-border-right']} ${styles['social-icons-list']}`}>
          <span className={`${styles['sub-title']} ${styles['fs-10']} ${styles['p-5']} ${styles['bg-white']}`}>{PAYMENT_PAGE.OR}</span>
          <button className={`${styles['fp-btn']} ${styles['mb-20']} ${styles['fp-btn-primary']}`}>{PAYMENT_PAGE.SIGN_IN_WITH_FACEBOOK}</button>
          <button className={`${styles['fp-btn']} ${styles['mb-20']} ${styles['fp-btn-danger']}`}>{PAYMENT_PAGE.SIGN_IN_WITH_GOOGLE}</button>
          <button className={`${styles['fp-btn']} ${styles['fp-btn-sucess']}`}>{PAYMENT_PAGE.REGISTER_WITH_US}</button>
        </div>
      </Col>
      <Col md={8} sm={12} xs={12}>
        <h4 className={`${styles['mb-20']} ${styles['mt-0']} ${styles['light-gry-clr']}`}>{PAYMENT_PAGE.SIGN_IN}</h4>
        <div className={styles['sign-part']}>
          <div className={`${styles['fp-input']}`}> 
            <input type="text" name="username" onChange={props.inputOnChange} value={props.login.username} className={styles.input} required />
            <span className={styles['highlight']}></span>
            <span className={styles['bar']}></span>
            <label>{PAYMENT_PAGE.EMAIL_OR_USERNAME}</label>
          </div> 
          <div className={`${styles['fp-input']}`}> 
            <input type="password" name="password" onChange={props.inputOnChange} value={props.login.password} className={styles.input} required/>
            <span className={styles['highlight']}></span>
            <span className={styles['bar']}></span>
            <label>{PAYMENT_PAGE.PASSWORD}</label>
          </div> 
          <button className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['fp-btn-large']} ${styles['fontW600']} ${styles['text-uppercase']}`} onClick={props.showAddress}>{PAYMENT_PAGE.CONTINUE}</button>
          {
            props.signInLoader ? <span> {PAYMENT_PAGE.PLEASE_WAIT}...</span> : null
          }
        </div>
      </Col>
    </Row>
  </div>
);

export default SignIn;


{/* <Col md={12} sm={12} xs={12}>
        <div className={styles['mt-10']}>
          <input type="checkbox" /> Send me updates on the latest offers and deals
        </div>
        <div className={styles['mt-10']}>
          <input type="checkbox" defaultChecked="true" /> I agree to the <a>T&C</a> and <a>Privacy Policy</a>
        </div>
      </Col> */}
