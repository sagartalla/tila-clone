import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-bootstrap';
import { Modal } from 'react-router-modal';
import SVGComponent from '../common/SVGComponet';
import { selectors, actionCreators } from '../../store/auth';
// import { selectors as productSelectors } from '../../store/cam/personalDetails';
// import ForgotPassword from './ForgotPassword';
// import ForgotSecurityPage from './ForgotSecurityQuestions';
import { languageDefinations } from '../../utils/lang';
// import VerifyStatus from './VerifyStatus';
// import VerifyEmail from './VerifyEmail';
// import LoginPage from './LoginPage';
// import SignIn from './SignIn';
import ThankYou from './ThankYouPage';
// import ExistingSocialLogin from './ExistingSocialLogin';
// import ResetpasswordMain from './ResetpasswordMain';
import LoginFlow from './LoginFlow';

import lang from '../../utils/language';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './login_en.styl';
import styles_ar from './login_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };
const { LOGIN_PAGE } = languageDefinations();

class Login extends Component {
  // constructor(props) {
  //   super(props);
  //   this.validations = new FormValidator([
  //     {
  //       field: 'email',
  //       method: this.validateEmail,
  //       message: 'Please enter valid email ID',
  //       validWhen: false,
  //     },
  //     {
  //       field: 'password',
  //       method: this.validateLengthPassword,
  //       message: 'Password must be atleast 8 characters',
  //       validWhen: false,
  //     },
  //   ]);

  //   this.state = {
  //     // error: '',
  //     // email: '',
  //     // password: '',
  //     // mode: props.mode || 'login',
  //     // country: '',
  //     // phone: '',
  //     // forgotPassword: false,
  //     validation: this.validations.valid(),
  //     clicked: false,
  //     showVerifyScreen: props.showEmailScreen || false,
  //     hide: true,
  //   };
  //   // this.login = this.login.bind(this);
  //   // this.onChangeField = this.onChangeField.bind(this);
  // }

  // componentWillReceiveProps(nextProps) {
  //   let { userCreds, error, showEmailScreen, activeObj } = nextProps;
  //   let { showVerifyScreen, showThankyou } = this.state;
  //   userCreds = userCreds || this.props.userCreds;
  //   if (error) {
  //     this.props.track('SignIn', error);
  //     this.setState({
  //       error,
  //     });
  //     return;
  //   }
  //   if (userCreds) {
  //     this.setState({
  //       email: userCreds.username,
  //       password: userCreds.password,
  //     });
  //   }
  //   this.setState({
  //     showVerifyScreen: showEmailScreen,
  //   });
  // }

  // hideToggle = () => {
  //   this.setState({
  //     hide: !this.state.hide,
  //   });
  // }

  // onChangeField(e) {
  //   this.setState({
  //     ...this.state,
  //     [e.target.name]: e.target.value,
  //   });
  // }

  onBackdropClick = () => {
    if (!window.sessionStorage.getItem('TILuservisitcount')) {
      window.sessionStorage.setItem('TILuservisitcount', 1);
    }
    this.props.onBackdropClick();
  }

  // validateEmail = (fieldvalue) => {
  //   const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   if (emailReg.test(fieldvalue)) return false;
  //   return true;
  // }

  // validateLengthPassword = (fieldvalue) => {
  //   if (fieldvalue && fieldvalue.length >= 8) return false;
  //   return true;
  // }

  // validatePassword = (fieldvalue, state) => {
  //   const passreg = /^([a-zA-Z0-9_-]){8,30}$/;
  //   if (passreg.test(fieldvalue)) return false;
  //   return true;
  // }

  // acceptsOffers = (event) => {
  //   let { clicked } = this.state;
  //   if (event.target.checked) {
  //     clicked = true;
  //   } else {
  //     clicked = false;
  //   }
  //   this.setState({
  //     clicked,
  //   });
  // }

  // login(e) {
  //   e.preventDefault();
  //   const {
  //     email, password, phone, country, clicked,
  //   } = this.state;
  //   let { showVerifyScreen } = this.state;
  //   const validation = this.validations.validate(this.state);
  //   if (email === '') {
  //     this.fireCustomEventClick('emptylogin');
  //   }
  //   if (password === '') {
  //     this.fireCustomEventClick('emptypassword');
  //   }
  //   if (email && password === '') {
  //     this.fireCustomEventClick('forgotpassword');
  //   }

  //   if (validation.isValid) {
  //     if (this.state.mode === 'register') {
  //       const serverData = {
  //         channel: 'BASIC_REGISTER',
  //         metadata: {
  //           username: email,
  //           password,
  //           mobile_no: phone,
  //           mobile_country_code: country,
  //           promotional_notification: clicked ? true : false,
  //         },
  //         rememberMe: true,
  //       };
  //       this.props.userLogin(serverData, this.state.mode);
  //     } else {
  //       const serverData = {
  //         channel: 'BASIC_AUTH',
  //         metadata: {
  //           username: email,
  //           password: password,
  //         },
  //         rememberMe: true,
  //       }
  //       this.props.userLogin(serverData);
  //     }
  //     this.props.resetLoginError();
  //   } else {
  //     this.props.track('SignIn', 'password length error');
  //   }
  //   this.setState({ validation });
  // }

  // fireCustomEventClick(type) {
  //   digitalData.login[type] = type;
  //   // var event = new CustomEvent('event-view-click');
  //   // document.dispatchEvent(event);
  // }

  // toggleLoginSignUp() {
  //   this.setState({
  //     ...this.state,
  //     mode: this.state.mode === 'login' ? 'register' : 'login',
  //     password: '',
  //     error: '',
  //     validation: this.validations.valid(),
  //   }, () => this.fireCustomEventClick(this.state.mode));
  // }

  // showForgotPassword = () => {
  //   this.setState({
  //     forgotPassword: true,
  //   })
  // }

  // loadPage = () => {
  //   const { activeObj, showEmailSuccess, showOtpSuccess } = this.props;
  //   switch (activeObj && activeObj.activePage && activeObj.activePage) {
  //     case 'password':
  //       return <SignIn mode="EXISTING_USER" />;
  //     case 'password_new':
  //       return <SignIn mode="NEW_USER" />;
  //     case 'social_login':
  //       return <SignIn mode="SOCIAL_LOGIN" />;
  //     case 'signin_page':
  //       return <LoginPage />;
  //     case 'security_page':
  //       return <ForgotSecurityPage />;
  //     case 'reset_type':
  //       return <ForgotPassword />;
  //     case 'success_screen':
  //       return <VerifyStatus showEmailSuccess={showEmailSuccess} showOtpSuccess={showOtpSuccess} onBackdropClick={this.onBackdropClick} />;
  //     case 'verify_email':
  //       return <VerifyEmail />;
  //     case 'personal_details':
  //       return <CompleteSignUp />;
  //     case 'existing_social_login':
  //       return <ExistingSocialLogin />;
  //     case 'reset_screen':
  //       return <ResetpasswordMain onBackdropClick={this.onBackdropClick} />;
  //     case 'shipping_to_page':
  //       return <CompleteSignUp />;
  //     default:
  //       return <LoginPage />;
  //   }
  // }

  render() {
    const {
      activeObj,
    } = this.props;
    return (
      <Modal className={activeObj && activeObj.activePage && activeObj.activePage === 'thank_you' ? `react-router-modal__modal ${styles['background-transparent']} ${styles['border-none']} ${styles['p-10']}` : `react-router-modal__modal ${styles['login-reg-modal']} ${styles['p-10']}`} onBackdropClick={this.onBackdropClick}>
        {activeObj && activeObj.activePage && activeObj.activePage === 'thank_you' ?
          <ThankYou /> :
          <Row className={`${styles['m-0']}`}>
            <div className={`${styles.flex}`}>
              <Col md={4} xs={12} sm={4} className={`${styles['pl-0']} ${styles['pr-10']} ${styles['m-hdn']}`}>
                <div className={`${styles.flex} ${styles['image-placeholder']}`}>
                  <img src={lang === 'en' ? '/static/img/icons/login-logo-en.png' : '/static/img/icons/login-logo-ar.png'} className={`${styles['img-responsive']}`} alt="" />
                </div>
              </Col>
              <Col md={8} xs={12} sm={8} className={`${styles['bg-white']} ${styles['border-radius4']}`}>
                <div className={`${styles.flex} ${styles['align-center']} ${styles['justify-between']} ${styles['flex-row']}`}>
                  <div className={`${styles.flex} ${styles['mt-10']} ${styles.pointer}`} onClick={this.onBackdropClick}>
                    <SVGComponent clsName={`${styles['cross-icon']}`} src="icons/common-icon/cross-button" />
                  </div>
                </div>
                <LoginFlow />
              </Col>
            </div>
          </Row>}
      </Modal>
    );
  }
}

const mapStateToProps = store => ({
  // error: selectors.getErrorMessege(store),
  userCreds: selectors.getUserCreds(store),
  // showEmailScreen: selectors.showEmailVerificationScreen(store),
  // loading: selectors.getLoginProgressStatus(store),
  // loadingStatus: selectors.getLoadingStatus(store),
  // userInfo: selectors.getUserInfo(store),
  activeObj: selectors.getActive(store),
  showEmailSuccess: selectors.showEmailSuccess(store),
  showOtpSuccess: selectors.showOtpSuccess(store),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    // userLogin: actionCreators.userLogin,
    // getLoginInfo: actionCreators.getLoginInfo,
    // resetLoginError: actionCreators.resetLoginError,
    // track: actionCreators.track,
  },
  dispatch,
);

// Login.defaultProps = {
//   activeObj: {
//     activePage: 'thank_you',
//   }
// };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
