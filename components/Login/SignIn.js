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

const { LOGIN_PAGE, HEADER_PAGE, CONTACT_INFO_MODAL } = languageDefinations();

/* eslint- disable */
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.validations = new FormValidator([
      {
        field: 'password',
        method: props.mode === 'NEW_USER' || props.mode === 'EXISTING_USER' ? this.emptyValue : () => false,
        message: LOGIN_PAGE.PLEASE_ENTER_PASSWORD,
        validWhen: false,
      },
      {
        field: 'password',
        method: props.mode === 'NEW_USER' ? this.passwordValidation : () => false,
        validWhen: false,
        message: LOGIN_PAGE.PASSWORD_MUST_BE_ATLEASE_EIGHT_CHARACTERS_LONG,
      },
      {
        field: 'email',
        method: props.mode === 'SOCIAL_LOGIN' ? this.emptyValue : () => false,
        message: LOGIN_PAGE.EMAIL_ERROR,
        validWhen: false,
      },
      {
        field: 'email',
        method: props.mode === 'SOCIAL_LOGIN' ? this.checkEmailValidation : () => false,
        message: LOGIN_PAGE.VALID_EMAIL,
        validWhen: false,
      },
      {
        field: 'first_name',
        method: props.mode === 'NEW_USER' || props.mode === 'SOCIAL_LOGIN' ? this.emptyValue : () => false,
        message: LOGIN_PAGE.PLEASE_ENTER_FIRST_NAME,
        validWhen: false,
      },
      {
        field: 'first_name',
        method: props.mode === 'NEW_USER' || props.mode === 'SOCIAL_LOGIN' ? this.checkNameValidation : () => false,
        validWhen: false,
        message: LOGIN_PAGE.FIRST_NAME_SHOULD_NOT_EXCEED_THIRTY_CHARACTERS,
      },
      {
        field: 'last_name',
        method: props.mode === 'NEW_USER' || props.mode === 'SOCIAL_LOGIN' ? this.emptyValue : () => false,
        message: LOGIN_PAGE.PLEASE_ENTER_LAST_NAME,
        validWhen: false,
      },
      {
        field: 'last_name',
        method: props.mode === 'NEW_USER' || props.mode === 'SOCIAL_LOGIN' ? this.checkNameValidation : () => false,
        validWhen: false,
        message: LOGIN_PAGE.LAST_NAME_SHOULD_NOT_EXCEED_THIRTY_CHARACTERS,
      },
    ]);
    this.state = {
      hide: true,
      password: '',
      email: '',
      first_name: props && props.loginResponse && props.loginResponse.data ? props.loginResponse.data.first_name : '',
      last_name: props && props.loginResponse && props.loginResponse.data ? props.loginResponse.data.last_name : '',
      opted_for_deals: false,
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

  login = (e) => {
    e.preventDefault();
    const {
      first_name, last_name, password, rememberMe, opted_for_deals, email,
    } = this.state;
    const {
      activeEmailId, userLogin, mode, v2NextPage, loginResponse,
    } = this.props;

    const validation = this.validations.validate(this.state);
    if (mode === 'EXISTING_USER') {
      if (validation.isValid) {
        const serverData = {
          channel: 'BASIC_AUTH',
          metadata: {
            username: activeEmailId,
            password,
            opted_for_deals,
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
            opted_for_deals,
          },
          rememberMe: false,
        };
        userLogin(serverData, 'register');
      }
    } else if (mode === 'SOCIAL_LOGIN') {
      if (validation.isValid) {
        const serverData = {
          channel: 'SOCIAL_REGISTER',
          metadata: {
            email,
            first_name,
            last_name,
            social_token: loginResponse.data.social_token,
          },
        };
        userLogin(serverData, 'register');
      }
    }
    this.setState({ validation });
  }

  // handling three cases
  // 1. New user
  // 2. existing user
  // 3. User signup through social login
  render() {
    const {
      hide, opted_for_deals, password, rememberMe, passwordErr, first_name, last_name, validation, email,
    } = this.state;
    const { showForgotPassword, mode, activeEmailId, loadingStatus, getActiveUser, loginResponse } = this.props;
    return (
      <div className={`${styles['main-signin']} ${styles.flex} ${styles['flex-colum']} ${styles['justify-evenly']}`}>
        <div className={`${styles['mb-10']}`}>
        <div>
          <h3 className={`${styles['fs-18']} ${styles['mt-0']} ${styles['mb-0']} ${styles['ff-b']}`}>
            {mode === 'EXISTING_USER' ?
              LOGIN_PAGE.SOCIAL_LOGIN_WELCOME :
              mode === 'NEW_USER' ? LOGIN_PAGE.NEW_TO_TILA : LOGIN_PAGE.GLAD_TO_HAVE_YOU_HERE }
          </h3>
          </div>   
          <div className={`${styles.flex} ${styles['mt-5']}`}>
          <div className={mode === 'SOCIAL_LOGIN' ? `${styles['light-gry-clr']} ${styles['pr-10']} ${styles['fs-12']}` : `${styles['light-gry-clr']} ${styles['edit-button']}  ${styles['pr-10']} ${styles['fs-12']}`}>{mode === 'SOCIAL_LOGIN' ? LOGIN_PAGE.PLEASE_PROVIDE_EMAIL_ID_FOR_REGISTRATION : activeEmailId}</div>
          {mode !== 'SOCIAL_LOGIN' && <div className={`${styles['fs-12']} ${styles['pl-10']} ${styles['border-radius2']} ${styles['text-blue']} ${styles.pointer}`} onClick={this.goToPreviousPage}>{LOGIN_PAGE.NOT_YOU}</div>}
          </div>          
        </div>
        {mode !== 'SOCIAL_LOGIN' &&
        <div className={mode === 'EXISTING_USER' ? `${styles['login-show']}` : `${styles['signup-show']}`}>
        <form onSubmit={this.login}>
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
          </form>
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
              <input id="deals-offers-reg" name="opted_for_deals" type="checkbox" onChange={this.handleCheck} checked={opted_for_deals} />
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
        <span className={`${styles['m-20']} ${styles['t-c']} ${styles['fs-12']} ${styles['register-policy-gray']}`}>{mode === 'EXISTING_USER' ? LOGIN_PAGE.BY_LOGIN_I_AGREE_TO_TERMS : LOGIN_PAGE.BY_SIGNUP_I_AGREE_TO_TERMS } <span className={`${styles['text-blue']} ${styles.fontW600}`}><a href="/en/policy/user-terms" target="_blank">{LOGIN_PAGE.T_AND_C}</a></span>, <span className={`${styles['text-blue']} ${styles.fontW600}`}><a href="/en/policy/privacy-policy" target="_blank">{LOGIN_PAGE.PRIVACY}</a></span> {LOGIN_PAGE.AND} <span className={`${styles['text-blue']} ${styles.fontW600}`}><a href="/en/policy/cookie-policy" target="_blank">{LOGIN_PAGE.COOKIE_POLICY}</a></span> {LOGIN_PAGE.NAME_TILA} {lang === 'ar' ? LOGIN_PAGE.I_HAVE_TILA : ''}</span>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  activeEmailId: selectors.getActiveEmailId(store),
  activeObj: selectors.getActive(store),
  loadingStatus: selectors.getLoadingStatus(store),
  getActiveUser: selectors.getActiveUser(store),
  loginResponse: selectors.loginResponse(store),
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
