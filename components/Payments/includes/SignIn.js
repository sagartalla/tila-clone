import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import styles from '../payment.styl';

const SignIn = props => (
  <div className={styles['box']}>
    <h3>Sign in</h3>
    <Row>
      <Col md={12} sm={12} xs={12}>
        <input placeholder="Email/username*" name="user_name" onChange={props.inputOnChange} value={props.login.user_name} className={styles.input} />
      </Col>
      <Col md={12} sm={12} xs={12}>
        <div><input type="checkbox" /> Checkout as Guest</div>
        <div><input type="checkbox" /> send me updates on the latest offers and deals</div>
        <div><input type="checkbox" /> I agree to the <a>T&C</a> and <a>Privacy Policy</a></div>
      </Col>
      <Col md={12} sm={12} xs={12}>
        <button className="btn btn-primary">Continue</button>
      </Col>
    </Row>
  </div>
);

export default SignIn;

