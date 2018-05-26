import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectors, actionCreators } from '../../store/auth';

import { Row, FormGroup, Col, Button, ControlLabel, Checkbox } from 'react-bootstrap';

import styles from './login.styl';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      email: '',
      password: '',
      mode: 'login',
      country: '',
      phone: '',
    };
    this.login = this.login.bind(this);
    this.onChangeField = this.onChangeField.bind(this);
    this.toggleLoginSignUp = this.toggleLoginSignUp.bind(this);
  }

  login() {
    const { email, password, phone, country } = this.state;
    if(this.state.mode === 'register') {
      this.props.userRegister({
        email,
        password: password,
        mobile_no: phone,
        mobile_country_code: country,
      });
    } else {
      this.props.userLogin({
        username: email,
        password: password
      });
    }
  }
  
  componentDidMount() {
    this.props.getLoginInfo();
  }

  componentWillReceiveProps(nextProps) {
    let { userCreds } = nextProps;
    userCreds = userCreds || this.props.userCreds 
    this.setState({
      error: nextProps.error,
      email: userCreds.username,
      password: userCreds.password,
    });
  }

  onChangeField(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  toggleLoginSignUp() {
    this.setState({
      ...this.state,
      mode: this.state.mode === 'login' ? 'register' : 'login'
    });
  }

  render() {
    const { userCreds } = this.props;
    return (
      <Row>
        <Col md={6}>
          <div className={styles['image-placeholder']}></div>
        </Col>
        <Col md={6}>
          <div className={`${styles['text-center']}`}>
            <h3>
              <div>
                <span className={styles['ff-b']}>lite.com</span>
                <span>&nbsp;Where</span>
              </div>
              <div>
                <span>Saudi Shops Online</span>
              </div>
            </h3>
            <div>
              <h4 className={styles['ff-b']}>Sign up for great offers & deals</h4>
            </div>
          </div>
          <form className={`${styles['login-form']}  ${styles['pt-32']}`}>
            <FormGroup controlId="formHorizontalEmail">
              <Col md={12}>
                <div className={styles['group']}>
                  <input onChange={this.onChangeField} name="email" type="email" value={this.state.email} required />
                  <span className={styles['highlight']}></span>
                  <span className={styles['bar']}></span>
                  <label>Name</label>
                </div>
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalPassword">
              <Col md={12}>
                <div className={styles['group']}>
                  <input onChange={this.onChangeField} name="password" type="password" value={this.state.password} required />
                  <span className={styles['highlight']}></span>
                  <span className={styles['bar']}></span>
                  <label>Password</label>
                </div>
              </Col>
            </FormGroup>
            {
              this.state.mode === 'register'
              ?
              <FormGroup controlId="formHorizontalCountry">
                <Col md={2}>
                  <div className={styles['group']}>
                    <input onChange={this.onChangeField} name="country" type="text" value={this.state.country} required />
                    <span className={styles['highlight']}></span>
                    <span className={styles['bar']}></span>
                    <label>+91</label>
                  </div>
                </Col>
              </FormGroup>
              :
              null
            }
            {
              this.state.mode === 'register'
              ?
                <FormGroup controlId="formHorizontalPhone">
                  <Col md={9} mdOffset={1}>
                    <div className={styles['group']}>
                      <input onChange={this.onChangeField} name="phone" type="text" value={this.state.phone} required />
                      <span className={styles['highlight']}></span>
                      <span className={styles['bar']}></span>
                      <label>Phone</label>
                    </div>
                  </Col>
                </FormGroup>
              :
              null
            }
            <FormGroup>
              <Col md={12}>
                <Button className={styles['sign-in-btn']} onClick={this.login}>Sign in</Button>
              </Col>
            </FormGroup>
            {
              this.state.error
              ?
              <div className={`${styles['text-center']} ${styles['error-msg']}`}>
                <span>{JSON.stringify(this.state.error)}</span>
              </div>
              :
              null 
            }
          </form>
          <div className={styles['text-center']}>
          {
            this.state.mode === 'register'
            ?
              <h4 className={styles['ff-b']}>
                <span>Already have an Accout &nbsp;</span>
                <span className={styles['link-text']} onClick={this.toggleLoginSignUp}>Sign in</span>
              </h4>
            :
            <h4 className={styles['ff-b']}>
              <span>Don't have an Accout &nbsp;</span>
              <span className={styles['link-text']} onClick={this.toggleLoginSignUp}>Sign up</span>
            </h4>
          }
          </div>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (store) => {
  return ({
    error: selectors.getErrorMessege(store),
    userCreds: selectors.getUserCreds(store)
  })
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { 
      userLogin: actionCreators.userLogin,
      userRegister: actionCreators.userRegister,
      getLoginInfo: actionCreators.getLoginInfo,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
