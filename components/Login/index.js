import React, { Component } from 'react';
import NoSSR from 'react-no-ssr';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SVGComponent from '../common/SVGComponet';
import { selectors, actionCreators } from '../../store/auth';
import constants from '../../constants';
import { Row, FormGroup, Col, Button, ControlLabel, Checkbox } from 'react-bootstrap';
import SocialLogin from './SocialLogin';

import { mergeCss } from '../../utils/cssUtil';
const styles = mergeCss('components/Login/login');
import { languageDefinations } from '../../utils/lang';
const { LOGIN_PAGE } = languageDefinations()


const errSchema = {
  email: '',
  password: '',
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      errObj: { ...errSchema },
      email: '',
      password: '',
      mode: props.mode || 'login',
      country: '',
      phone: '',
    };
    this.login = this.login.bind(this);
    this.onChangeField = this.onChangeField.bind(this);
    this.toggleLoginSignUp = this.toggleLoginSignUp.bind(this);
  }

  componentDidMount() {
    this.props.getLoginInfo();
  }

  componentWillReceiveProps(nextProps) {
    let { userCreds, error } = nextProps;
    userCreds = userCreds || this.props.userCreds
    if (error) {
      this.setState({
        error
      });
      return;
    }
    this.setState({
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

  onLoginFieldValidations = () => {
    const { email, password, errObj } = this.state;
    const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passreg = /^([a-zA-Z0-9_-]){8,30}$/;
    if (!passreg.test(password) || !emailReg.test(email)) {
      if (!passreg.test(password)) {
        errObj.password = 'Your password must be at least 8 characters long.';
      }
      if (!emailReg.test(email)) {
        errObj.email = 'Enter valid emailid';
      }
      this.setState({
        errObj,
      });
      return false;
    }
    return true;
  }

  login(e) {
    e.preventDefault();
    const { email, password, phone, country } = this.state;
    if (email === '') {
      this.fireCustomEventClick('emptylogin');
    }
    if (password === '') {
      this.fireCustomEventClick('emptypassword');
    }
    if (email && password === '') {
      this.fireCustomEventClick('forgotpassword');
    }

    if (this.onLoginFieldValidations()) {
      if (this.state.mode === 'register') {
        const serverData = {
          channel: 'BASIC_REGISTER',
          metadata:{
            username: email,
            password,
            mobile_no: phone,
            mobile_country_code: country,
          },
          rememberMe: true
        };
        this.props.userLogin(serverData)
      } else {
        const serverData = {
          channel: 'BASIC_AUTH',
          metadata: {
            username: email,
            password: password,
          },
          rememberMe: true,
        }
        this.props.userLogin(serverData);
      }
      this.props.resetLoginError();
    } else {
      console.log('password Error');
    }
  }

  // loginFromSubmit() {
  //   this.login();
  // }

  fireCustomEventClick(type) {
    digitalData.login[type] = type;
    // var event = new CustomEvent('event-view-click');
    // document.dispatchEvent(event);
  }

  toggleLoginSignUp() {
    this.setState({
      ...this.state,
      mode: this.state.mode === 'login' ? 'register' : 'login',
      error: '',
      errObj: { ...errSchema },
    }, () => this.fireCustomEventClick(this.state.mode));
  }

  render() {
    const { userCreds } = this.props;
    const { errObj, mode, error } = this.state;
    return (
      <Row className={`${styles['bg-white']} ${styles['m-0']}`}>
        <Col md={6} xs={6} className={styles['pl-0']}>
          <div className={styles['image-placeholder']}>
            <img className={styles['img-responsive']} src={`${constants.mediaDomain}/pim/15f45930-fecf-4f7b-a3d6-613d41196c20/workbench/image/a1ccb74a-1858-42dd-8c38-cfb103e85bb2/login-screen.jpeg`} />
          </div>
        </Col>
        <Col md={6} xs={6}>
          <div>
            <h3 className={`${styles['fs-26']} ${styles['mb-25']}`}>
              <div>
                <span className={`${styles['ff-b']} ${styles['pl-10']}`}>
                  {
                    mode === 'register'
                      ?
                      'Register with tila.com'
                      :
                      LOGIN_PAGE.TILA_COM
                  }

                </span>
              </div>
            </h3>
          </div>
          {
            error
              ?
              <div className={`${styles['text-center']} ${styles['error-msg']}`}>
                <span>{error}</span>
              </div>
              :
              null
          }
          <form className={`${styles['login-form']}`} onSubmit={this.login}>
            <FormGroup controlId="formHorizontalEmail">
              <Col md={12}>
                {/* <div className={styles['group']}>
                  <input onChange={this.onChangeField} name="email" type="email" value={this.state.email} required />
                  <span className={styles['highlight']}></span>
                  <span className={styles['bar']}></span>
                  <label>{LOGIN_PAGE.EMAIL}</label>
                </div> */}
                <div className={`${styles['fp-input']} ${styles['pb-10']}`}>
                  <input onChange={this.onChangeField} name="email" type="email" value={this.state.email} required />
                  <span className={styles['highlight']}></span>
                  <span className={styles['bar']}></span>
                  <label>{LOGIN_PAGE.EMAIL}</label>
                  {
                    errObj.email
                      ?
                      <span className={`${styles['error-msg']}`}>{errObj.email}</span>
                      :
                      null
                  }
                </div>
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalPassword">
              <Col md={12}>
                {/* <div className={styles['group']}>
                  <input onChange={this.onChangeField} name="password" type="password" value={this.state.password} required />
                  <span className={styles['highlight']}></span>
                  <span className={styles['bar']}></span>
                  <label>{LOGIN_PAGE.PASSWORD}</label>
                </div> */}
                <div className={`${styles['fp-input']} ${styles['pb-10']}`}>
                  <input onChange={this.onChangeField} name="password" type="password" value={this.state.password} required />
                  <span className={styles['highlight']}></span>
                  <span className={styles['bar']}></span>
                  <label>{LOGIN_PAGE.PASSWORD}</label>
                  {
                    errObj.password
                      ?
                        <span className={`${styles['error-msg']}`}>{errObj.password}</span>
                      :
                      null
                  }
                </div>

              </Col>
            </FormGroup>
            {/* <FormGroup controlId="formHorizontalCountry">
                <Col md={2} xs={2} className={styles['pr-0']}>
            {
              this.state.mode === 'register'
              ?

                  <div className={`${styles['fp-input']} ${styles['pb-10']}`}>
                    <input onChange={this.onChangeField} name="country" type="text" value={this.state.country} required />
                    <span className={styles['highlight']}></span>
                    <span className={styles['bar']}></span>
                    <label>+91</label>
                  </div>

              :
              null
            }
                 </Col>
            {
              this.state.mode === 'register'
              ?

                  <Col md={9} xs={10} mdOffset={1}>
                    <div className={`${styles['fp-input']} ${styles['pb-10']}`}>
                      <input onChange={this.onChangeField} name="phone" type="text" value={this.state.phone} required />
                      <span className={styles['highlight']}></span>
                      <span className={styles['bar']}></span>
                      <label>{LOGIN_PAGE.PHONE}</label>
                    </div>
                  </Col>

              :
              null
            }
             </FormGroup> */}
            <FormGroup>
              <Col md={12}>
                {
                  this.state.mode === 'register'
                    ?
                    <div className={`${styles['checkbox-material']} ${styles['flex']} ${styles['pb-15']}`}>
                      <input id="deals-offers-reg" type="checkbox" />
                      <label for="deals-offers-reg">I would like to receive deals and offers.</label>
                    </div>
                    :
                    null
                }
              </Col>
            </FormGroup>
            <FormGroup>
              <Col md={12}>
                {/* <Button className={`${styles['sign-in-btn']} ${styles['fontW700']}`} onClick={this.login}>{this.state.mode === 'register' ? `${LOGIN_PAGE.SIGN_UP}` : `${LOGIN_PAGE.SIGN_IN}`}</Button>  */}
                <input className={`${styles['sign-in-btn']} ${styles['fontW700']}`} type="submit" value={this.state.mode === 'register' ? `${LOGIN_PAGE.SIGN_UP}` : `${LOGIN_PAGE.SIGN_IN}`} />
              </Col>
              <Col md={12}>
                {
                  this.state.mode === 'register'
                    ?
                    <p className={`${styles['fs-12']} ${styles['termes-label']} ${styles['pt-10']} ${styles['mb-0']}`}>By signing up, you agree to our terms and conditions.</p>
                    :
                    null
                }
              </Col>
            </FormGroup>
            <div className={`${styles['login-social-icon']} ${styles['pl-15']}`}>
              <span className={`${styles['thick-gry-clr']} ${styles['pt-10']} ${styles['pb-10']} ${styles['flex']}`}>{LOGIN_PAGE.SIGN_UP_WITH}</span>
              <NoSSR>
                <SocialLogin />
              </NoSSR>
            </div>
          </form>
          <div className={styles['pl-15']}>
            {
              this.state.mode === 'register'
                ?
                <h4 className={`${styles['ff-b']} ${styles['fs-14']}`}>
                  <span>{LOGIN_PAGE.HAVE_ACCOUNT}&nbsp;</span>
                  <span className={styles['link-text']} onClick={this.toggleLoginSignUp}>{LOGIN_PAGE.SIGN_IN}</span>
                </h4>
                :
                <h4 className={`${styles['ff-b']} ${styles['fs-14']}`}>
                  <span>{LOGIN_PAGE.NO_ACCOUNT} &nbsp;</span>
                  <span className={styles['link-text']} onClick={this.toggleLoginSignUp}>{LOGIN_PAGE.SIGN_UP}</span>
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
      resetLoginError: actionCreators.resetLoginError,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
