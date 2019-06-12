import React from 'react';
import NoSSR from 'react-no-ssr';
import { Row, Col } from 'react-bootstrap';

import SocialLogin from './SocialLogin';
import SVGComponent from '../common/SVGComponet';
import lang from '../../utils/language';
import { languageDefinations } from '../../utils/lang';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './login_en.styl';
import styles_ar from './login_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};
const { LOGIN_PAGE } = languageDefinations();

class ExistingSocialLogin extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className={`${styles['login-form']} ${styles.flex} ${styles['flex-colum']}`}>
        <h1 className={`${styles['fs-18']} ${styles.fontW600} ${styles['light-gry-clr']} ${styles['m-0']}`}>{LOGIN_PAGE.SOCIAL_LOGIN_WELCOME}</h1>
        <div className={`${styles['fs-12']} ${styles['light-gry-clr']}`}>marcelpatoulachi@gmail.com</div>
        <p className={`${styles['fs-12']} ${styles['register-policy-gray']} ${styles['mt-30']}`}>{LOGIN_PAGE.SOCIAL_LOGIN_CONTINUE_MESSAGE}</p>
        <Row className={`${styles['mt-30']} ${styles['flex-colum']} ${styles['justify-center']}`}>
          <Col md={12} xs={12} sm={12}>
            <SocialLogin>
              {([handleSocialLogin]) => (
                <NoSSR>
                  <div onClick={handleSocialLogin('facebook')} className={`${styles['flex-center']}  ${styles.pointer} ${styles['border-lg']} ${styles['border-radius4']} ${styles['mb-10']} ${styles['p-5']}`}>
                    <a className={`${styles.flex} ${styles['ml-37P']}`}>
                      <SVGComponent clsName={`${styles['bg-fb-icon']} ${styles['mr-10']}`} src="icons/social-icons/bg-facebook" />
                    </a>
                    Facebook
                  </div>
                  <div onClick={handleSocialLogin('google')} className={`${styles['flex-center']} ${styles.pointer} ${styles['border-lg']} ${styles['border-radius4']} ${styles['mb-10']} ${styles['p-5']}`}>
                    <a className={`${styles.flex} ${styles['ml-37P']}`}>
                      <SVGComponent clsName={`${styles['bg-google-icon']} ${styles['mr-10']}`} src="icons/social-icons/bg-google" />
                    </a>
                    Google
                  </div>
                </NoSSR>
              )}
            </SocialLogin>
          </Col>
        </Row>
        <input className={`${styles['mt-50']} ${styles['sign-in-btn']} ${styles.fontW700} ${styles['text-uppercase']}`} type="button" value={LOGIN_PAGE.LOGIN} />
        <div className={`${styles['termes-label']} ${styles['mb-15']} ${styles['mt-10']} ${styles['fs-12']} ${styles['t-c']}`}>{LOGIN_PAGE.BY_LOGIN_I_AGREE_TO_TERMS} <a href="">{LOGIN_PAGE.T_AND_C}, {LOGIN_PAGE.PRIVACY} {LOGIN_PAGE.AND} {LOGIN_PAGE.COOKIE_POLICY}</a></div>
      </div>
    );
  }
}

export default ExistingSocialLogin;
