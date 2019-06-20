import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col } from 'react-bootstrap';

import Button from '../common/CommonButton';
import { languageDefinations } from '../../utils/lang';
import ShowHidePassword from './ShowHidePassword';
import { selectors, actionCreators } from '../../store/auth';
import FormValidator from '../common/FormValidator';

import lang from '../../utils/language';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './login_en.styl';
import styles_ar from './login_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const { LOGIN_PAGE, HEADER_PAGE } = languageDefinations();

/* eslint- disable */
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.validations = new FormValidator([
      {
        field: 'password',
        method: props.mode === 'NEW_USER' || props.mode === 'EXISTING_USER' ? this.emptyValue : () => false,
        message: props.mode === 'NEW_USER' ? 'Please enter password' : 'Please enter your password',
        validWhen: false,
      },
      {
        field: 'password',
        method: props.mode === 'NEW_USER' ? this.passwordValidation : () => false,
        validWhen: false,
        message: 'Please enter valid password',
      },
      {
        field: 'email',
        method: props.mode === 'SOCIAL_LOGIN' ? this.emptyValue : () => false,
        message: 'Please enter email Id',
        validWhen: false,
      },
      {
        field: 'email',
        method: props.mode === 'SOCIAL_LOGIN' ? this.checkEmailValidation : () => false,
        message: 'Please enter correct email Id',
        validWhen: false,
      },
      {
        field: 'first_name',
        method: props.mode === 'NEW_USER' || props.mode === 'SOCIAL_LOGIN' ? this.emptyValue : () => false,
        message: 'Please enter first name',
        validWhen: false,
      },
      {
        field: 'first_name',
        method: props.mode === 'NEW_USER' || props.mode === 'SOCIAL_LOGIN' ? this.checkNameValidation : () => false,
        validWhen: false,
        message: 'First name should not exceed 30 characteristics',
      },
      {
        field: 'last_name',
        method: props.mode === 'NEW_USER' || props.mode === 'SOCIAL_LOGIN' ? this.emptyValue : () => false,
        message: 'Please enter last name',
        validWhen: false,
      },
      {
        field: 'last_name',
        method: props.mode === 'NEW_USER' || props.mode === 'SOCIAL_LOGIN' ? this.checkNameValidation : () => false,
        validWhen: false,
        message: 'Last name should not exceed 30 characteristics',
      },
    ]);
    this.state = {
      hide: true,
      password: '',
      email: '',
      first_name: '',
      last_name: '',
      promotional_notification: false,
      // rememberMe: !!localStorage.getItem('remember'),
      validation: this.validations.valid(),
    };
  }

  handleOnChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  }

  handleValidation = ({ target }) => {
    const validation = this.validations.validateOnBlur({ [target.name]: target.value });
    this.setState({ validation });
  }
  
  emptyValue = fieldValue => fieldValue === '';

  passwordValidation = (fieldValue) => {
    if (fieldValue && fieldValue.length >= 8) return false;
    return true;
  }

  checkNameValidation = (fieldValue) => {
    if (fieldValue && fieldValue.length >= 30) return false;
    return false;
  }

  checkEmailValidation = (fieldValue) => {
    const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailReg.test(fieldValue)) return false;
    return true;
  }

  handleCheck = ({ target }) => {
    this.setState({
      [target.name]: target.checked,
    });
  }

  hideToggle = () => {
    this.setState({
      hide: !this.state.hide,
    });
  }

  showForgotPassword = () => {
    const { showUserInfo, activeEmailId, v2CurrentFlow } = this.props;
    showUserInfo(activeEmailId).then((res) => {
      if (res.value.status === 200) {
        const data = { currentFlow: 'forgot_password', nextPage: 'reset_type' };
        const { v2NextPage } = this.props;
        v2CurrentFlow(data);
      }
    });
    // const data = { currentFlow: 'forgot_password', nextPage: 'reset_type' };
    // const { v2CurrentFlow } = this.props;
    // v2CurrentFlow(data);
  }
  goToPreviousPage = () => {
    const { v2PreviousPage } = this.props;
    v2PreviousPage();
  }

  login = () => {
    const {
      first_name, last_name, password, rememberMe, promotional_notification, email,
    } = this.state;
    const {
      activeEmailId, userLogin, mode, v2NextPage,
    } = this.props;

    const validation = this.validations.validate(this.state);
    if (mode === 'EXISTING_USER') {
      if (validation.isValid) {
        const serverData = {
          channel: 'BASIC_AUTH',
          metadata: {
            username: activeEmailId,
            password,
          },
          rememberMe: false,
        };
        // if (rememberMe) {
        //   localStorage.setItem('remember', JSON.stringify({ email: activeEmailId, password }));
        // } else {
        //   localStorage.removeItem('remember');
        // }
        userLogin(serverData);
      }
    } else if (mode === 'NEW_USER') {
      if (validation.isValid) {
        const serverData = {
          channel: 'BASIC_REGISTER',
          metadata: {
            username: activeEmailId,
            password,
            first_name,
            last_name,
            mobile_no: '',
            mobile_country_code: '',
            promotional_notification,
          },
          rememberMe: false,
        };
        userLogin(serverData, 'register');
      }
    } else if (mode === 'SOCIAL_LOGIN') {
      // if (validation.isValid) {
      //   const serverData = {
      //     channel: 'SOCIAL_LOGIN_REGISTER',
      //     metadata: {
      //       username: email,
      //       first_name,
      //       last_name,
      //     },
      //   };
      //   userLogin(serverData, 'register').then(() => {
          v2NextPage();
        // });
      // }
    }
    this.setState({ validation });
  }

  // handling three cases
  // 1. New user
  // 2. existing user
  // 3. User signup through social login
  render() {
    const {
      hide, promotional_notification, password, rememberMe, passwordErr, first_name, last_name, validation, email,
    } = this.state;
    const { showForgotPassword, mode, activeEmailId, loadingStatus, getActiveUser } = this.props;
    return (
      <div className={`${styles['main-signin']} ${styles.flex} ${styles['flex-colum']} ${styles['justify-evenly']}`}>
        <div className={`${styles['mb-10']}`}>
        <div className={`${styles.flex}`}>
          <h3 className={`${styles['fs-18']} ${styles['mt-0']} ${styles['mb-0']} ${styles['ff-b']}`}>
            {mode === 'EXISTING_USER' ?
              'Hi, Welcome Back!' :
              mode === 'NEW_USER' ? 'Hi, New to Tila?' : 'Glad to have you here.' }
          </h3>
          {mode !== 'SOCIAL_LOGIN' && <div className={`${styles['ml-20']} ${styles['fs-12']} ${styles['pl-10']} ${styles['pr-10']} ${styles.fontW600} ${styles['edit-button']} ${styles['border-radius2']} ${styles.pointer}`} onClick={this.goToPreviousPage}>EDIT</div>}
          </div>       
          <div className={`${styles['light-gry-clr']} ${styles['fs-12']}`}>{mode === 'SOCIAL_LOGIN' ? 'Pls provide email ID to receive registration confirmation.' : activeEmailId}</div>
        </div>
        {mode !== 'SOCIAL_LOGIN' &&
        <div className={mode === 'EXISTING_USER' ? `${styles['login-show']}` : `${styles['signup-show']}`}>
          <div className={`${styles['fp-input']} ${styles['mt-30']}`}>
            <input
              name="password"
              type={hide ? 'password' : 'text'}
              className={`${styles.width100}`}
              autoComplete="off"
              value={password}
              onChange={this.handleOnChange}
              onBlur={this.handleValidation}
              required
            />
            <label className={`${styles['label-light-grey']}`}>
              {mode === 'NEW_USER' ? LOGIN_PAGE.SET_PASSWORD : mode === 'EXISTING_USER' ? LOGIN_PAGE.ENTER_PASSWORD : LOGIN_PAGE.ENTER_YOUR_EMAIL_ID}
            </label>
            {
              validation.password && validation.password.isInValid ?
                <div>
                  <span className={`${styles['error-msg']}`}>{validation.password.message}</span>
                </div> : null
            }
            <ShowHidePassword hide={hide} hideToggle={this.hideToggle} />
          </div>
        </div>}
        {mode === 'SOCIAL_LOGIN' &&
          <div className={`${styles['fp-input']} ${styles['mt-30']}`}>
            <input
              name="email"
              type="text"
              className={`${styles.width100}`}
              autoComplete="off"
              value={email}
              onChange={this.handleOnChange}
              onBlur={this.handleValidation}
              required
            />
            <label className={`${styles['label-light-grey']}`}>
              {LOGIN_PAGE.ENTER_YOUR_EMAIL_ID}
            </label>
            {
              validation.email && validation.email.isInValid ?
                <div>
                  <span className={`${styles['error-msg']}`}>{validation.email.message}</span>
                </div> : null
            }
          </div>}
        {mode !== 'EXISTING_USER' &&
        <React.Fragment>
          <div className={`${styles['fp-input']} ${styles['pb-10']} ${styles['mt-10']}`}>
            <input
              type="text"
              name="first_name"
              autoComplete="off"
              className={`${styles.width100}`}
              onChange={this.handleOnChange}
              onBlur={this.handleValidation}
              value={first_name}
              required
            />
            <label className={`${styles['label-light-grey']}`}>{LOGIN_PAGE.FIRST_NAME}</label>
            {
              validation.first_name && validation.first_name.isInValid ?
                <div>
                  <span className={`${styles['error-msg']}`}>{validation.first_name.message}</span>
                </div> : null
            }
          </div>
          <div className={`${styles['fp-input']} ${styles['pb-10']}`}>
            <input
              type="text"
              name="last_name"
              autoComplete="off"
              className={`${styles.width100}`}
              onChange={this.handleOnChange}
              onBlur={this.handleValidation}
              value={last_name}
              required
            />
            <label className={`${styles['label-light-grey']}`}>{LOGIN_PAGE.LAST_NAME}</label>
            {
              validation.last_name && validation.last_name.isInValid ?
                <div>
                  <span className={`${styles['error-msg']}`}>{validation.last_name.message}</span>
                </div> : null
            }
          </div>
        </React.Fragment>
        }
        {mode === 'EXISTING_USER' &&
        <Col md={12} className={`${styles['p-0']} ${styles['fs-12']} ${styles.flex} ${styles['justify-end']}`}>
          {/* <div className={`${styles['checkbox-material']} ${styles.flex} ${styles['p-0']}`}>
            <input id="remember_me" name="rememberMe" type="checkbox" onChange={this.handleCheck} checked={rememberMe} />
            <label htmlFor="remember_me">
              <span className={`${styles['register-policy-gray']}`}>{LOGIN_PAGE.REMEMBER_ME}</span>
            </label>
          </div> */}
          <div className={`${styles['text-blue']} ${styles['mb-10']} ${styles.pointer}`} onClick={this.showForgotPassword}>
            {LOGIN_PAGE.FORGOT_PASSWORD}
          </div>
        </Col>}
        {mode !== 'SOCIAL_LOGIN' && !getActiveUser.opted_for_deals &&
        <Col md={12} className={`${styles['p-0']} ${styles['mt-20']}  ${styles['mb-10']}`}>
          {
            <div className={`${styles['checkbox-material']} ${styles.flex} ${styles['p-0']}`}>
              <input id="deals-offers-reg" name="promotional_notification" type="checkbox" onChange={this.handleCheck} checked={promotional_notification} />
              <label htmlFor="deals-offers-reg">
                <span className={`${styles['light-gry-clr']} ${styles['fs-12']}`}><span>{LOGIN_PAGE.I_WOULD_LIKE_TO_RECEIVE}</span><span className={`${styles['yellow-clr']}`}>&nbsp;{LOGIN_PAGE.DEALS_OFFERS}</span></span>
              </label>
            </div>
                  }
        </Col>}
        <Button
          className={`${styles['sign-in-btn']} ${styles['text-uppercase']}`}
          btnText={mode === 'EXISTING_USER' ? HEADER_PAGE.LOGIN : LOGIN_PAGE.SIGNUP}
          btnLoading={loadingStatus}
          onClick={this.login}
        />
        <span className={`${styles['m-20']} ${styles['t-c']} ${styles['fs-12']} ${styles['register-policy-gray']}`}>{mode === 'EXISTING_USER' ? LOGIN_PAGE.BY_LOGIN_I_AGREE_TO_TERMS : LOGIN_PAGE.BY_SIGNUP_I_AGREE_TO_TERMS } <span className={`${styles['text-blue']}`}><a href="/SAU/en/policy/tc" target="_blank">{LOGIN_PAGE.T_AND_C}</a>, <a href="/SAU/en/policy/pp" >{LOGIN_PAGE.PRIVACY}</a> {LOGIN_PAGE.AND} <a href="/SAU/en/policy/pp" >{LOGIN_PAGE.COOKIE_POLICY}</a></span></span>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  activeEmailId: selectors.getActiveEmailId(store),
  activeObj: selectors.getActive(store),
  loadingStatus: selectors.getLoadingStatus(store),
  getActiveUser: selectors.getActiveUser(store),
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    v2CurrentFlow: actionCreators.v2CurrentFlow,
    userLogin: actionCreators.userLogin,
    v2NextPage: actionCreators.v2NextPage,
    showUserInfo: actionCreators.showUserInfo,
    v2PreviousPage: actionCreators.v2PreviousPage,
  },
  dispatch,
);

SignIn.propTypes = {
};

SignIn.defaultProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
