import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col } from 'react-bootstrap';
import Button from '../common/CommonButton';
import { languageDefinations } from '../../utils/lang';
import ShowHidePassword from './ShowHidePassword';

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
      clicked: false,
    };
  }


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

  hideToggle = () => {
    this.setState({
      hide: !this.state.hide,
    });
  }

  // handling three cases
  // 1. New user
  // 2. existing user
  // 3. User signup through social login
  render() {
    const {
      hide, clicked,
    } = this.state;
    const { showForgotPassword, mode } = this.props;
    return (
      <div className={`${styles['main-signin']} ${styles.flex} ${styles['flex-colum']} ${styles['justify-evenly']}`}>
        <div className={`${styles['mb-10']}`}>
          <h3 className={`${styles['fs-22']} ${styles['mt-0']} ${styles['ff-b']}`}>{mode === 'ExistingUser' ? 'Hi, Welcome Back!' : 'Glad to have you here.' }</h3>
          <div>{mode === 'social media' ? 'Pls provide email ID to receive registration confirmation.' : 'aaa@gmail.com'}</div>
        </div>
        <div className={mode === 'ExistingUser' ? `${styles['login-show']}` : `${styles['signup-show']}`}>
          <div className={`${styles['fp-input']} ${styles['pb-10']}`}>
            <input
              name="email"
              type={hide ? 'password' : 'text'}
              className={`${styles.width100}`}
              onChange={this.onChange}
              autoComplete="off"
              required
            />
            <label className={`${styles['label-light-grey']}`}>{mode === 'NewUser' ? LOGIN_PAGE.SET_PASSWORD : mode === 'ExistingUser' ? LOGIN_PAGE.ENTER_PASSWORD : LOGIN_PAGE.ENTER_YOUR_EMAIL_ID}</label>
          </div>
          {mode !== 'SocialLogin' && <ShowHidePassword hide={hide} hideToggle={this.hideToggle} />}
        </div>
        {mode !== 'ExistingUser' &&
        <React.Fragment>
          <div className={`${styles['fp-input']} ${styles['pb-10']}`}>
            <input
              type="text"
              name="firstname"
              autoComplete="off"
              className={`${styles.width100}`}
              onChange={this.onChange}
              required
            />
            <label className={`${styles['label-light-grey']}`}>{LOGIN_PAGE.FIRST_NAME}</label>
          </div>
          <div className={`${styles['fp-input']} ${styles['pb-10']}`}>
            <input
              type="text"
              name="firstname"
              autoComplete="off"
              className={`${styles.width100}`}
              onChange={this.onChange}
              required
            />
            <label className={`${styles['label-light-grey']}`}>{LOGIN_PAGE.LAST_NAME}</label>
          </div>
        </React.Fragment>
        }
        {mode === 'ExistingUser' &&
        <Col md={12} className={`${styles['p-0']} ${styles.flex} ${styles['justify-between']}`}>
          <div className={`${styles['checkbox-material']} ${styles.flex} ${styles['p-0']}`}>
            <input id="deals-offers-reg" type="checkbox" onChange={this.acceptsOffers} checked={clicked} />
            <label htmlFor="deals-offers-reg">
              <span className={`${styles['register-policy-gray']}`}>{LOGIN_PAGE.REMEMBER_ME}</span>
            </label>
          </div>
          <div className={`${styles['text-blue']} ${styles.pointer}`} onClick={showForgotPassword}>
            {LOGIN_PAGE.FORGOT_PASSWORD}
          </div>
        </Col>}
        {mode !== 'SocialLogin' &&
        <Col md={12} className={`${styles['p-0']}`}>
          {
            <div className={`${styles['checkbox-material']} ${styles.flex} ${styles['p-0']}`}>
              <input id="deals-offers-reg" type="checkbox" onChange={this.acceptsOffers} checked={clicked} />
              <label htmlFor="deals-offers-reg">
                <span><span>{LOGIN_PAGE.I_WOULD_LIKE_TO_RECEIVE}</span><span className={`${styles['yellow-clr']}`}>&nbsp;{LOGIN_PAGE.DEALS_OFFERS}</span></span>
              </label>
            </div>
                  }
        </Col>}
        <Button
          className={`${styles['flex-center']} ${styles.width100} ${styles['fs-14']} ${styles['mt-20']} ${styles['text-uppercase']} ${styles['button-radius']}`}
          btnText={HEADER_PAGE.LOGIN}
        />
        <span className={`${styles['m-20']} ${styles['t-c']} ${styles['fs-12']} ${styles['register-policy-gray']}`}>{LOGIN_PAGE.BY_LOGIN_I_AGREE_TO_TERMS} <span className={`${styles['text-blue']}`}>{LOGIN_PAGE.T_AND_C}, {LOGIN_PAGE.PRIVACY} {LOGIN_PAGE.AND} {LOGIN_PAGE.COOKIE_POLICY}</span></span>
      </div>
    );
  }
}

const mapStateToProps = store => ({

});
const mapDispatchToProps = dispatch => bindActionCreators(
  {

  },
  dispatch,
);

SignIn.propTypes = {
};

SignIn.defaultProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
