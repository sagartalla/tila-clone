import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col } from 'react-bootstrap';

import Button from '../common/CommonButton';
import { languageDefinations } from '../../utils/lang';
import ShowHidePassword from './ShowHidePassword';
import { selectors, actionCreators } from '../../store/auth';

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
    const password = localStorage.getItem('remember') ? JSON.parse(localStorage.getItem('remember')).password : '';
    this.state = {
      hide: true,
      password,
      passwordErr: false,
      promotional_notification: false,
      rememberMe: !!localStorage.getItem('remember'),
    };
  }

  handleOnChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
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
    const { activeObj } = this.props;
    console.log('activeObj', activeObj);
    const data = 'security_page';
    const { showNextPage } = this.props;
    showNextPage(data);
  }

  login = () => {
    const {
      first_name, last_name, password, rememberMe, promotional_notification,
    } = this.state;
    const {
      activeEmailId, userLogin, mode, newUserRegister,
    } = this.props;
    if (mode === 'EXISTING_USER') {
      if (password) {
        const serverData = {
          channel: 'BASIC_AUTH',
          metadata: {
            username: activeEmailId,
            password,
          },
          rememberMe,
        };
        if (rememberMe) {
          localStorage.setItem('remember', JSON.stringify({ email: activeEmailId, password }));
        } else {
          localStorage.removeItem('remember');
        }
        userLogin(serverData);
      } else {
        this.setState({
          passwordErr: true,
        });
      }
    } else if (mode === 'NEW_USER') {
      if (password && first_name && last_name) {
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
          rememberMe,
        };
        userLogin(serverData, 'register');
      } else {
        this.setState({
          passwordErr: true,
        });
      }
    }
  }

  // handling three cases
  // 1. New user
  // 2. existing user
  // 3. User signup through social login
  render() {
    const {
      hide, promotional_notification, password, rememberMe, passwordErr, first_name, last_name,
    } = this.state;
    const { showForgotPassword, mode, activeEmailId } = this.props;
    return (
      <div className={`${styles['main-signin']} ${styles.flex} ${styles['flex-colum']} ${styles['justify-evenly']}`}>
        <div className={`${styles['mb-10']}`}>
          <h3 className={`${styles['fs-18']} ${styles['mt-0']} ${styles['mb-0']} ${styles['ff-b']}`}>
            {mode === 'EXISTING_USER' ?
              'Hi, Welcome Back!' :
              mode === 'NEW_USER' ? 'Hi, New to Tila?' : 'Glad to have you here.' }
          </h3>
          <div className={`${styles['light-gry-clr']} ${styles['fs-12']}`}>{mode === 'SOCIAL_LOGIN' ? 'Pls provide email ID to receive registration confirmation.' : activeEmailId}</div>
        </div>
        <div className={mode === 'EXISTING_USER' ? `${styles['login-show']}` : `${styles['signup-show']}`}>
          <div className={`${styles['fp-input']} ${styles['mt-30']}`}>
            <input
              name="password"
              type={hide ? 'password' : 'text'}
              className={`${styles.width100}`}
              onChange={this.handleOnChange}
              autoComplete="off"
              value={password}
              required
            />
            <label className={`${styles['label-light-grey']}`}>
              {mode === 'NEW_USER' ? LOGIN_PAGE.SET_PASSWORD : mode === 'EXISTING_USER' ? LOGIN_PAGE.ENTER_PASSWORD : LOGIN_PAGE.ENTER_YOUR_EMAIL_ID}
            </label>
            {passwordErr &&
              <span className={`${styles['error-msg']}`}>Required</span>}
            {mode !== 'SOCIAL_LOGIN' && <ShowHidePassword hide={hide} hideToggle={this.hideToggle} />}
          </div>
        </div>
        {mode !== 'EXISTING_USER' &&
        <React.Fragment>
          <div className={`${styles['fp-input']} ${styles['pb-10']}`}>
            <input
              type="text"
              name="first_name"
              autoComplete="off"
              className={`${styles.width100}`}
              onChange={this.handleOnChange}
              value={first_name}
              required
            />
            <label className={`${styles['label-light-grey']}`}>{LOGIN_PAGE.FIRST_NAME}</label>
          </div>
          <div className={`${styles['fp-input']} ${styles['pb-10']}`}>
            <input
              type="text"
              name="last_name"
              autoComplete="off"
              className={`${styles.width100}`}
              onChange={this.handleOnChange}
              value={last_name}
              required
            />
            <label className={`${styles['label-light-grey']}`}>{LOGIN_PAGE.LAST_NAME}</label>
          </div>
        </React.Fragment>
        }
        {mode === 'EXISTING_USER' &&
        <Col md={12} className={`${styles['p-0']} ${styles['fs-12']} ${styles.flex} ${styles['justify-between']}`}>
          <div className={`${styles['checkbox-material']} ${styles.flex} ${styles['p-0']}`}>
            <input id="remember_me" name="rememberMe" type="checkbox" onChange={this.handleCheck} checked={rememberMe} />
            <label htmlFor="remember_me">
              <span className={`${styles['register-policy-gray']}`}>{LOGIN_PAGE.REMEMBER_ME}</span>
            </label>
          </div>
          <div className={`${styles['text-blue']} ${styles.pointer}`} onClick={this.showForgotPassword}>
            {LOGIN_PAGE.FORGOT_PASSWORD}
          </div>
        </Col>}
        {mode !== 'SOCIAL_LOGIN' &&
        <Col md={12} className={`${styles['p-0']} ${styles['mt-40']}  ${styles['mb-10']}`}>
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
          btnText={HEADER_PAGE.LOGIN}
          onClick={this.login}
        />
        <span className={`${styles['m-20']} ${styles['t-c']} ${styles['fs-12']} ${styles['register-policy-gray']}`}>{LOGIN_PAGE.BY_LOGIN_I_AGREE_TO_TERMS} <span className={`${styles['text-blue']}`}>{LOGIN_PAGE.T_AND_C}, {LOGIN_PAGE.PRIVACY} {LOGIN_PAGE.AND} {LOGIN_PAGE.COOKIE_POLICY}</span></span>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  activeEmailId: selectors.getActiveEmailId(store),
  activeObj: selectors.getActive(store),  
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    showNextPage: actionCreators.showNextPage,
    userLogin: actionCreators.userLogin,
    newUserRegister: actionCreators.v2NextPage,
  },
  dispatch,
);

SignIn.propTypes = {
};

SignIn.defaultProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
