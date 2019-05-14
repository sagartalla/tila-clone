import React, { Component } from 'react';
import NoSSR from 'react-no-ssr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, FormGroup, Col } from 'react-bootstrap';
import { Modal } from 'react-router-modal';

import SVGComponent from '../common/SVGComponet';
import { selectors, actionCreators } from '../../store/auth';
import constants from '../../constants';
import ForgotPassword from './ForgotPassword';
import SocialLogin from './SocialLogin';
import { languageDefinations } from '../../utils/lang';
import FormValidator from '../common/FormValidator';
import VerifyEmail from './VerifyEmail';

import lang from '../../utils/language';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './login_en.styl';
import styles_ar from './login_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};
const { LOGIN_PAGE } = languageDefinations();
class Login extends Component {
  constructor(props) {
    super(props);
    this.validations = new FormValidator([
      {
        field: 'email',
        method: this.validateEmail,
        message: 'Please enter valid email ID',
        validWhen: false,
      },
      {
        field: 'password',
        method: this.validateLengthPassword,
        message: 'Password must be atleast 8 characters',
        validWhen: false,
      },
    ]);

    this.state = {
      error: '',
      email: '',
      password: '',
      mode: props.mode || 'login',
      country: '',
      phone: '',
      forgotPassword: false,
      validation: this.validations.valid(),
      clicked: false,
      showVerifyScreen: props.showEmailScreen || false,
    };
    this.login = this.login.bind(this);
    this.onChangeField = this.onChangeField.bind(this);
    this.toggleLoginSignUp = this.toggleLoginSignUp.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    let { userCreds, error, showEmailScreen } = nextProps;
    userCreds = userCreds || this.props.userCreds;
    if (error) {
      this.props.track('SignIn', error);
      this.setState({
        error,
      });
      return;
    }
    if (userCreds) {
      this.setState({
        email: userCreds.username,
        password: userCreds.password,
      });
    }
    this.setState({
      showVerifyScreen: showEmailScreen,
    });
  }

  onChangeField(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  }

  onBackdropClick = () => {
    const { showVerifyScreen } = this.state;
    if(!window.sessionStorage.getItem('TILuservisitcount')) {
      window.sessionStorage.setItem('TILuservisitcount', 1)
    }
    this.props.onBackdropClick(showVerifyScreen);
  }

  validateEmail = (fieldvalue, state) => {
    const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailReg.test(fieldvalue)) return false;
    return true;
  }

  validateLengthPassword = (fieldvalue, state) => {
    if (fieldvalue && fieldvalue.length >= 8) return false;
    return true;
  }

  // validatePassword = (fieldvalue, state) => {
  //   const passreg = /^([a-zA-Z0-9_-]){8,30}$/;
  //   if (passreg.test(fieldvalue)) return false;
  //   return true;
  // }

  acceptsOffers = (event) => {
    let { clicked } = this.state;
    if (event.target.checked) {
      clicked = true;
    } else {
      clicked = false;
    }
    this.setState({
      clicked,
    });
  }

  login(e) {
    e.preventDefault();
    const {
      email, password, phone, country, clicked,
    } = this.state;
    const validation = this.validations.validate(this.state);
    if (email === '') {
      this.fireCustomEventClick('emptylogin');
    }
    if (password === '') {
      this.fireCustomEventClick('emptypassword');
    }
    if (email && password === '') {
      this.fireCustomEventClick('forgotpassword');
    }

    if (validation.isValid) {
      if (this.state.mode === 'register') {
        const serverData = {
          channel: 'BASIC_REGISTER',
          metadata: {
            username: email,
            password,
            mobile_no: phone,
            mobile_country_code: country,
            promotional_notification: clicked ? true : false,
          },
          rememberMe: true,
        };
        this.props.userLogin(serverData, this.state.mode);
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
      this.props.track('SignIn', 'password length error');
    }
    this.setState({ validation });
  }

  fireCustomEventClick(type) {
    digitalData.login[type] = type;
    // var event = new CustomEvent('event-view-click');
    // document.dispatchEvent(event);
  }

  toggleLoginSignUp() {
    this.setState({
      ...this.state,
      mode: this.state.mode === 'login' ? 'register' : 'login',
      password: '',
      error: '',
      validation: this.validations.valid(),
    }, () => this.fireCustomEventClick(this.state.mode));
  }

  handleClick() {
    this.setState({forgotPassword: true});
  }

  render() {
    const { userCreds, loadingStatus } = this.props;
    const { mode, error, validation, clicked, showVerifyScreen } = this.state;
    return (
      <Modal className={`react-router-modal__modal ${styles['login-reg-modal']} ${styles['p-20']}`} onBackdropClick={this.onBackdropClick}>
        <Row className={`${styles['bg-white']} ${styles['m-0']}`}>
          { !this.state.forgotPassword ?
        <div className={`${styles.flex}`}>
          <Col md={6} xs={12} sm={6} className={`${styles['pl-0']} ${styles['m-hdn']}`}>
            <div className={styles['image-placeholder']}>
              <img className={styles['img-responsive']} src={`${constants.mediaDomain}/pim/15f45930-fecf-4f7b-a3d6-613d41196c20/workbench/image/a1ccb74a-1858-42dd-8c38-cfb103e85bb2/login-screen.jpeg`} />
            </div>
          </Col>
          {!showVerifyScreen ?
          <Col md={6} xs={12} sm={6}>
            <div className={`${styles.flex} ${styles['align-center']} ${styles['justify-between']} ${styles['flex-row']}`}>
            <div className={`${styles.flex} ${styles.pointer}`} onClick={this.onBackdropClick}><SVGComponent clsName={`${styles['cross-icon']}`} src="icons/common-icon/cross-button" /></div>
              <h3 className={`${styles['fs-26']} ${styles['mb-25']} ${styles['m-fs-20']}`}>
                <div>
                  <span className={`${styles['ff-b']} ${styles['pl-10']}`}>
                    {
                      mode === 'register'
                        ?
                        LOGIN_PAGE.REGISTER_WITH_TILA
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
                    <input onChange={this.onChangeField} className={styles['m-fs-16']} name="email" type="email" value={this.state.email} required />
                    <span className={styles.highlight} />
                    <span className={styles.bar} />
                    <label>{LOGIN_PAGE.EMAIL}</label>
                    {
                      validation.email.message
                        ?
                          <span className={`${styles['error-msg']}`}>{validation.email.message}</span>
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
                    <input onChange={this.onChangeField} className={styles['m-fs-16']} name="password" type="password" value={this.state.password} required />
                    <span className={styles.highlight} />
                    <span className={styles.bar} />
                    <label>{LOGIN_PAGE.PASSWORD}</label>
                    {
                      validation.password.message
                        ?
                          <span className={`${styles['error-msg']}`}>{validation.password.message}</span>
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
                        <div className={`${styles['checkbox-material']} ${styles.flex} ${styles['pb-15']}`}>
                            <input id="deals-offers-reg" type="checkbox" onChange={this.acceptsOffers} checked={clicked} />
                            <label htmlFor="deals-offers-reg">
                              {LOGIN_PAGE.I_WOULD_LIKE_TO_RECEIVE_OFFERS}
                            </label>
                        </div>
                      :
                      null
                  }
                </Col>
              </FormGroup>
              <FormGroup>
                <Col md={12}>
                  {/* <Button className={`${styles['sign-in-btn']} ${styles['fontW700']}`} onClick={this.login}>{this.state.mode === 'register' ? `${LOGIN_PAGE.SIGN_UP}` : `${LOGIN_PAGE.SIGN_IN}`}</Button>  */}
                  <input className={`${styles['sign-in-btn']} ${styles.fontW700}`} type="submit" value={this.state.mode === 'register' ? `${LOGIN_PAGE.SIGN_UP}` : `${LOGIN_PAGE.SIGN_IN}`} />
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
                <a className={`${styles['flex']} ${styles['pt-10']} ${styles['m-fs-14']} ${styles['m-justy-center']}`}>
                  <span onClick={this.handleClick}>
                    {this.state.mode !== 'register' && LOGIN_PAGE.FORGOT_PASSWORD}
                  </span>
                </a>
                <span className={`${styles['thick-gry-clr']} ${styles['pt-5']} ${styles['pb-5']} ${styles['flex']} ${styles['m-justy-center']} ${styles['m-fs-14']}`}>{LOGIN_PAGE.SIGN_UP_WITH}</span>
                <NoSSR>
                  <SocialLogin>
                    {([handleSocialLogin]) => {
                      return (
                        <NoSSR>
                          <div className={`${styles['flex']} ${styles['social-icons']}`}>
                            <a className={styles['flex']} onClick={handleSocialLogin('facebook')}><SVGComponent clsName={`${styles['bg-social-icon']} ${styles['mr-10']}`} src="icons/social-icons/bg-facebook" /></a>
                            <a className={styles['flex']} onClick={handleSocialLogin('google')}><SVGComponent clsName={`${styles['bg-social-icon']} ${styles['mr-10']}`} src="icons/social-icons/bg-google" /></a>
                            {/* <a className={styles['flex']} onClick={this.handleSocialLogin('twitter')}><SVGComponent clsName={`${styles['bg-social-icon']} ${styles['mr-10']}`} src="icons/social-icons/bg-twitter" /></a>
                            <a className={styles['flex']} onClick={this.handleSocialLogin('instagram')}><SVGComponent clsName={`${styles['bg-social-icon']}`} src="icons/social-icons/bg-instagram" /></a> */}
                          </div>
                        </NoSSR>
                      )
                    }}
                  </SocialLogin>
                </NoSSR>
              </div>
            </form>
            <div className={styles['pl-15']}>
              {
                this.state.mode === 'register'
                  ?
                    <h4 className={`${styles['ff-b']} ${styles['fs-14']} ${styles['m-fs-14']} ${styles['m-t-c']}`}>
                    <span>{LOGIN_PAGE.HAVE_ACCOUNT}&nbsp;</span>
                    <span className={styles['link-text']} onClick={this.toggleLoginSignUp}>{LOGIN_PAGE.SIGN_IN}</span>
                  </h4>
                  :
                  <h4 className={`${styles['ff-b']} ${styles['fs-14']} ${styles['m-fs-14']} ${styles['m-t-c']}`}>
                    <span>{LOGIN_PAGE.NO_ACCOUNT} &nbsp;</span>
                    <span className={styles['link-text']} onClick={this.toggleLoginSignUp}>{LOGIN_PAGE.SIGN_UP}</span>
                  </h4>
              }
            </div>
          </Col> :
          <Col md={6} xs={6} className={`${styles.flex}`}>
            <VerifyEmail
              email={userCreds && userCreds.username}
              onBackdropClick={this.onBackdropClick}
              loadingStatus={loadingStatus}
            />
          </Col>
          }
          </div>
          :
          <ForgotPassword
            enteredEmail={this.state.email}
          />
          }

        </Row>
      </Modal>
    );
  }
}

const mapStateToProps = store => ({
  error: selectors.getErrorMessege(store),
  userCreds: selectors.getUserCreds(store),
  showEmailScreen: selectors.showEmailVerificationScreen(store),
  loading: selectors.getLoginProgressStatus(store),
  loadingStatus: selectors.getLoadingStatus(store),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    userLogin: actionCreators.userLogin,
    getLoginInfo: actionCreators.getLoginInfo,
    resetLoginError: actionCreators.resetLoginError,
    track: actionCreators.track,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
