import React from 'react';
import NoSSR from 'react-no-ssr';
import { Row, FormGroup, Col } from 'react-bootstrap';

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

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className={`${styles['flx-space-bw']} ${styles['mh-350']} ${styles['flex-colum']}`}>
        <div>
          <Row>
            <Col md={5} xs={12} sm={5}>
              <h2 className={`${styles['fs-18']} ${styles.fontW600}`}>Login</h2>
            </Col>
            <Col md={7} xs={12} sm={7}>
              <h2 className={`${styles['fs-18']} ${styles.fontW600}`}>Enter Email</h2>
            </Col>
          </Row>
          <Row className={`${styles['pt-30']} ${styles.flex}`}>
            <Col md={5} xs={12} sm={5} className={`${styles.relative} ${styles.flex} ${styles['flex-colum']} ${styles['justify-center']} ${styles['pr-20']} ${styles['border-rt']}`}>
              <SocialLogin>
                {([handleSocialLogin]) => (
                  <NoSSR>
                    <div onClick={handleSocialLogin('facebook')} className={`${styles['flex-center']} ${styles.pointer} ${styles['border-lg']} ${styles['border-radius4']} ${styles['mb-5']} ${styles['p-5']}`}>
                      <a className={`${styles.flex} ${styles['ml-15']}`}>
                        <SVGComponent clsName={`${styles['bg-fb-icon']} ${styles['mr-10']}`} src="icons/social-icons/bg-facebook" />
                      </a>
                      Facebook
                    </div>
                    <div onClick={handleSocialLogin('google')} className={`${styles['flex-center']} ${styles.pointer} ${styles['border-lg']} ${styles['border-radius4']} ${styles['mb-5']} ${styles['p-5']}`}>
                      <a className={`${styles.flex} ${styles['ml-15']}`}>
                        <SVGComponent clsName={`${styles['bg-google-icon']} ${styles['mr-10']}`} src="icons/social-icons/bg-google" />
                      </a>
                      Gmail
                    </div>
                  </NoSSR>
                )}
              </SocialLogin>
              <span className={`${styles.absolute} ${styles['bg-white']} ${styles.right0} ${styles['p-5']} ${styles['fs-10']} ${styles['border-lg']} ${styles['or-tag']}`} >OR</span>
            </Col>
            <Col md={7} xs={12} sm={7} className={`${styles['pl-30']}`}>
              <div className={`${styles['fp-input']} ${styles['pb-10']}`}>
                <input onChange={this.onChangeField} className={styles['m-fs-16']} name="email" type="email" value={this.state.email} required />
                <span className={styles.highlight} />
                <span className={styles.bar} />
                <label>{LOGIN_PAGE.EMAIL}</label>
                {/* {
                  validation.email.message
                    ?
                      <span className={`${styles['error-msg']}`}>{validation.email.message}</span>
                    :
                    null
                } */}
              </div>
              <input className={`${styles['sign-in-btn']} ${styles.fontW700} ${styles['text-uppercase']}`} type="submit" value="Continue" />
            </Col>
          </Row>
        </div>
        <div className={`${styles['termes-label']} ${styles['fs-12']} ${styles['t-c']}`}>By signing up I understand and agree to tila <a href="">T&C, Privacy and Cookie policy</a></div>
      </div>
    );
  }
}

export default LoginPage;
