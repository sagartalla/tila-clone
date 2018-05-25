import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import styles from '../payment.styl';

const SignIn = props => (
  <div className={`${styles['p-24']} ${styles['box']} ${styles['mb-20']}`}>
    <Row className={`${props.configJson.done ? '' : 'hide'}`}>
      <Col md={8} sm={12} xs={12}>
        <h3 className={styles['m-0']}>Sign in</h3>
      </Col>
      <Col md={4} sm={12} xs={12}>
        {props.login.username}
      </Col>
      <Col md={2} sm={12} xs={12} className={'hide'}>
        <button className={`${styles['fp-btn']} ${styles['fp-btn-default']}`}>
          Edit
        </button>
      </Col>
    </Row>

    <Row className={`${props.configJson.progress ? '' : 'hide'}`}>
      <Col md={12} sm={12} xs={12}>
        <h3 className={styles['m-0']}>Sign in</h3>
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
      </Col>
      <Col md={12} sm={12} xs={12} className={styles['mt-10']}>
        <button className={`${styles['fp-btn']} ${styles['fp-btn-primary']}`} onClick={props.showAddress}>Continue</button>
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
