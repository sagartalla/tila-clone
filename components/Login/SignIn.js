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
    this.state = {
      hide: false,
      password: '',
      passwordErr: false,
      promotional_notification: false,
      rememberMe: false,
    };
  }


  handleOnChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  }

  acceptsOffers = ({ target }) => {
    let { promotional_notification } = this.state;
    if (target.checked) {
      promotional_notification = true;
    } else {
      promotional_notification = false;
    }
    this.setState({
      promotional_notification,
    });
  }

  remember_me = ({ target }) => {
    let { rememberMe } = this.state;
    if (target.checked) {
      rememberMe = true;
    } else {
      rememberMe = false;
    }
    this.setState({
      rememberMe,
    });
  }

  hideToggle = () => {
    this.setState({
      hide: !this.state.hide,
    });
  }

  login = () => {
    const { password, rememberMe } = this.state;
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
        userLogin(serverData);
      } else {
        this.setState({
          passwordErr: true,
        });
      }
    } else if (mode === 'NEW_USER') {
      newUserRegister();
    }
  }

  // handling three cases
  // 1. New user
  // 2. existing user
  // 3. User signup through social login
  render() {
    const {
      hide, promotional_notification, password, rememberMe, passwordErr, firstname, lastname,
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
          <div className={`${styles['fp-input']} ${styles['pb-10']} ${styles['mt-30']}`}>
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
              name="firstname"
              autoComplete="off"
              className={`${styles.width100}`}
              onChange={this.handleOnChange}
              value={firstname}
              required
            />
            <label className={`${styles['label-light-grey']}`}>{LOGIN_PAGE.FIRST_NAME}</label>
          </div>
          <div className={`${styles['fp-input']} ${styles['pb-10']}`}>
            <input
              type="text"
              name="lastname"
              autoComplete="off"
              className={`${styles.width100}`}
              onChange={this.handleOnChange}
              value={lastname}
              required
            />
            <label className={`${styles['label-light-grey']}`}>{LOGIN_PAGE.LAST_NAME}</label>
          </div>
        </React.Fragment>
        }
        {mode === 'EXISTING_USER' &&
        <Col md={12} className={`${styles['p-0']} ${styles['fs-12']} ${styles.flex} ${styles['justify-between']}`}>
          <div className={`${styles['checkbox-material']} ${styles.flex} ${styles['p-0']}`}>
            <input id="remember_me" type="checkbox" onChange={this.remember_me} checked={rememberMe} />
            <label htmlFor="remember_me">
              <span className={`${styles['register-policy-gray']}`}>{LOGIN_PAGE.REMEMBER_ME}</span>
            </label>
          </div>
          <div className={`${styles['text-blue']} ${styles.pointer}`} onClick={showForgotPassword}>
            {LOGIN_PAGE.FORGOT_PASSWORD}
          </div>
        </Col>}
        {mode !== 'SOCIAL_LOGIN' &&
        <Col md={12} className={`${styles['p-0']} ${styles['mt-40']}  ${styles['mb-10']}`}>
          {
            <div className={`${styles['checkbox-material']} ${styles.flex} ${styles['p-0']}`}>
              <input id="deals-offers-reg" type="checkbox" onChange={this.acceptsOffers} checked={promotional_notification} />
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
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    userLogin: actionCreators.userLogin,
    newUserRegister: actionCreators.v2NewUserRegister,
  },
  dispatch,
);

SignIn.propTypes = {
};

SignIn.defaultProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
