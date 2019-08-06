import React from 'react';
import NoSSR from 'react-no-ssr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-bootstrap';

import SocialLogin from './SocialLogin';
import SVGComponent from '../common/SVGComponet';
import lang from '../../utils/language';
import { languageDefinations } from '../../utils/lang';
import { actionCreators, selectors } from '../../store/auth';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './login_en.styl';
import styles_ar from './login_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };
const { LOGIN_PAGE, CONTACT_INFO_MODAL } = languageDefinations();

const fullName = {
  FB: {
    value: 'facebook',
    text: 'Facebook',
  },
  GOOGLE: {
    value: 'google',
    text: 'Google',
  },
  LKD: {
    value: 'linkedIn',
    text: 'Linked In',
  },
  TWITTER: {
    value: 'twitter',
    text: 'Twitter',
  },
  INSTAGRAM: {
    value: 'instagram',
    text: 'Instagram',
  },
};

class ExistingSocialLogin extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  goToPreviousPage = () => {
    const { v2PreviousPage } = this.props;
    v2PreviousPage();
  }

  render() {
    const { lastLogin, activeEmailId } = this.props;
    return (
      <div className={`${styles['login-form']} ${styles.flex} ${styles['flex-colum']} ${styles['justify-between']}`}>
        <div>
          <div>
            <h1 className={`${styles['fs-18']} ${styles.fontW600} ${styles['light-gry-clr']} ${styles['m-0']}`}>{LOGIN_PAGE.SOCIAL_LOGIN_WELCOME}</h1>
          </div>
          <div className={`${styles.flex} ${styles['mt-5']}`}>
            <div className={`${styles['fs-12']} ${styles['pr-10']} ${styles['edit-button']} ${styles['light-gry-clr']}`}>{activeEmailId}</div>
            <div className={`${styles['flex-center']} ${styles['fs-12']} ${styles['pl-10']} ${styles['text-blue']} ${styles['border-radius2']} ${styles.pointer}`} onClick={this.goToPreviousPage}>{LOGIN_PAGE.NOT_YOU}</div>
          </div>
        </div>
        <div>
          <p className={`${styles['fs-12']} ${styles['register-policy-gray']}`}>{LOGIN_PAGE.SOCIAL_LOGIN_CONTINUE_MESSAGE}</p>
          <Row className={`${styles['flex-colum']} ${styles['justify-center']}`}>
          <Col md={12} xs={12} sm={12}>
            <SocialLogin>
              {([handleSocialLogin]) => (
                <NoSSR>
                  {lastLogin && lastLogin.length > 0 &&
                  lastLogin.map(ll => (
                    <div onClick={handleSocialLogin(fullName[ll].value)} className={`${styles['flex-center']} ${styles.pointer} ${styles['border-lg']} ${styles['mt-20']} ${styles['border-radius4']} ${styles['mb-10']} ${styles['p-5']}`}>
                      <a className={`${styles.flex} ${styles['ml-37P']}`}>
                        <SVGComponent clsName={`${styles[`bg-${ll}-icon`]} ${styles['mr-10']}`} src={`icons/social-icons/bg-${fullName[ll].value}`} />
                      </a>
                      {fullName[ll].text}
                    </div>
                  ))}
                  {/* <div onClick={handleSocialLogin('google')} className={`${styles['flex-center']} ${styles.pointer} ${styles['border-lg']} ${styles['border-radius4']} ${styles['mb-10']} ${styles['p-5']}`}>
                    <a className={`${styles.flex} ${styles['ml-37P']}`}>
                      <SVGComponent clsName={`${styles['bg-google-icon']} ${styles['mr-10']}`} src="icons/social-icons/bg-google" />
                    </a>
                    Google
                  </div> */}
                </NoSSR>
              )}
            </SocialLogin>
          </Col>
        </Row>
        </div>
        {/* <input className={`${styles['mt-50']} ${styles['sign-in-btn']} ${styles.fontW700} ${styles['text-uppercase']}`} type="button" value={LOGIN_PAGE.LOGIN} /> */}
        <span className={`${styles['m-20']} ${styles['t-c']} ${styles['fs-12']} ${styles['register-policy-gray']}`}>{LOGIN_PAGE.BY_LOGIN_I_AGREE_TO_TERMS } <span className={`${styles['text-blue']} ${styles.fontW600}`}><a href="/en/policy/user-terms-and-conditions" target="_blank">{LOGIN_PAGE.T_AND_C}</a></span>, <span className={`${styles['text-blue']} ${styles.fontW600}`}><a href="/en/policy/privacy-policy" target="_blank">{LOGIN_PAGE.PRIVACY}</a></span> {LOGIN_PAGE.AND} <span className={`${styles['text-blue']} ${styles.fontW600}`}><a href="/en/policy/cookie-policy" target="_blank">{LOGIN_PAGE.COOKIE_POLICY}</a></span> {LOGIN_PAGE.NAME_TILA}</span>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  activeEmailId: selectors.getActiveEmailId(store),
  lastLogin: selectors.getLastLogin(store),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    v2PreviousPage: actionCreators.v2PreviousPage,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(ExistingSocialLogin);
