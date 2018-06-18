import React from 'react';
import SVGCompoent from '../../common/SVGComponet';
import { Grid, Row, Col } from 'react-bootstrap';

import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Payments/payment');

const SignIn = props => (
  <div className={`${styles['pb-15']} ${styles['pt-15']} ${styles['pl-34']} ${styles['pr-34']} ${styles['box']} ${styles['mb-20']} ${styles['relative']} ${styles['payment-signup']}`}>
    <SVGCompoent clsName={`${styles['profile']} ${props.configJson.done ? 'done' : ''} ${props.configJson.progress ? 'payment-active' : ''}`} src="icons/profile/profile" />
    <Row className={`${props.configJson.done ? '' : 'hide'} ${styles['flex-center']}`}>
      <Col md={8} sm={12} xs={12}>
        <h4 className={styles['m-0']}>Sign in</h4>
        <small>Sign in or sign up to continue</small>
      </Col>
      <Col md={4} sm={12} xs={12} className={styles['t-rt']}>
        <span className={`${styles['light-gry-clr']} ${styles['fontW600']}`}>{props.login.username}</span>
      </Col>
    </Row>

    <Row className={`${props.configJson.progress ? '' : 'hide'} ${styles['pb-5']} ${styles['pt-5']}`}>
      <Col md={4} sm={12} xs={12}>
        <h4 className={`${styles['mb-20']} ${styles['mt-0']} ${styles['light-gry-clr']}`}>Register</h4>
        <div className={`${styles['thin-border-right']} ${styles['social-icons-list']}`}>
          <span className={`${styles['sub-title']} ${styles['fs-10']} ${styles['p-5']} ${styles['bg-white']}`}>OR</span>
          <button className={`${styles['fp-btn']} ${styles['mb-20']} ${styles['fp-btn-primary']}`}>Sign in with Facebook</button>
          <button className={`${styles['fp-btn']} ${styles['mb-20']} ${styles['fp-btn-danger']}`}>Sign in with Google</button>
          <button className={`${styles['fp-btn']} ${styles['fp-btn-sucess']}`}>Register with us</button>
        </div>
      </Col>
      <Col md={8} sm={12} xs={12}>
        <h4 className={`${styles['mb-20']} ${styles['mt-0']} ${styles['light-gry-clr']}`}>Sign in</h4>
        <div className={styles['sign-part']}>
          <div className={`${styles['mb-20']} ${styles['mt-10']}`}>
            <input type="text" placeholder="Email / Username*" name="username" onChange={props.inputOnChange} value={props.login.username} className={styles.input} />
          </div>
          <div className={`${styles['mb-20']} ${styles['mt-10']}`}>
            <input type="password" placeholder="Password" name="password" onChange={props.inputOnChange} value={props.login.password} className={styles.input} />
          </div>
          <button className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['fp-btn-large']} ${styles['fontW600']} ${styles['text-uppercase']}`} onClick={props.showAddress}>Continue</button>
          {
            props.signInLoader ? <span> Please wait...</span> : null
          }
        </div>
      </Col>
      {/*<Col md={12} sm={12} xs={12}>
        <h4 className={styles['m-0']}>Sign in</h4>
      </Col>
      <Col md={12} sm={12} xs={12}>
        <div className={`${styles['mb-10']} ${styles['mt-10']}`}>
          <input type="text" placeholder="Email / Username*" name="username" onChange={props.inputOnChange} value={props.login.username} className={styles.input} />
        </div>
      </Col>
      <Col md={12} sm={12} xs={12}>
        <div className={`${styles['mb-10']} ${styles['mt-10']}`}>
          <input type="password" placeholder="Password" name="password" onChange={props.inputOnChange} value={props.login.password} className={styles.input} />
        </div>
      </Col>*/}
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
