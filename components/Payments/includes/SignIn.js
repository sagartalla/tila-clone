import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import NoSSR from 'react-no-ssr';
import Terms from '../../common/terms';
import { Modal } from 'react-router-modal';
import Privacy from '../../common/privacy';
import SVGComponent from '../../common/SVGComponet';
import { languageDefinations } from '../../../utils/lang/';
import SocialLogin from '../../Login/SocialLogin';
import ForgotPassword from '../../Login/ForgotPassword';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../payment_en.styl';
import styles_ar from '../payment_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };


const { PAYMENT_PAGE, CONTACT_INFO_MODAL, LOGIN_PAGE } = languageDefinations();

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTerms: false,
      showPrivacy: false,
      showFP: false,
    }

    this.tcToggle = this.tcToggle.bind(this);
    this.privacyToggle = this.privacyToggle.bind(this);
  }

  tcToggle() {
    this.setState({ showTerms: !this.state.showTerms });
  }

  privacyToggle() {
    this.setState({ showPrivacy: !this.state.showPrivacy });
  }

  toggleForgotPassword = () => {
    this.setState({ showFP: !this.state.showFP });
  }

  render() {
    const { props } = this;
    const { showTerms, showPrivacy, showFP } = this.state;
    return (
      <div className={`${styles.box} ${styles['mb-20']} ${styles.relative} ${styles['payment-signup']}`}>
        <SVGComponent clsName={`${styles.profile} ${props.configJson.done ? 'done' : ''} ${props.configJson.progress ? 'payment-active' : ''}`} src="icons/profile/profile" />
        <Row className={`${props.configJson.done ? '' : 'hide'} ${styles['flex-center']} ${styles.flex} ${styles['m-blk']}`}>
          <Col md={6} sm={12} xs={12}>
            <h4 className={`${styles['m-0']}`}>{`${PAYMENT_PAGE.REGISTER} or ${PAYMENT_PAGE.SIGN_IN}`}</h4>
            {props.login.username ?
            <small className={styles['thick-gry-clr']}>{PAYMENT_PAGE.YOU_ARE_SIGNED_IN_AS} {props.login.username}</small>
            :
            <small className={styles['thick-gry-clr']}>{PAYMENT_PAGE.SIGN_IN_SIGN_UP_TO_CONTINUE}</small>
            }
          </Col>
          {props.login.username ?
          <Col md={6} sm={12} xs={12} className={`${styles['t-rt']} ${styles['p-0']}`}>
            <span className={`${styles['light-gry-clr']} ${styles.fontW600} ${styles['pr-5']} ${styles['user-login-name']}`}>{props.login.username}&emsp;</span>
            <button className={`${styles['fp-btn']} ${styles['fp-btn-default']} ${styles['ml-15']} ${styles['left-radius']} ${styles['text-uppercase']}`} onClick={props.onClickEdit}>
              {CONTACT_INFO_MODAL.EDIT}
            </button>
          </Col> : null
          }
        </Row>
        <Row className={`${props.configJson.progress ? '' : 'hide'} ${styles['pb-5']} ${styles['pt-5']}`}>
          <Col md={4} sm={5} xs={12} className={styles['landscape-socail-part']}>
            <h4 className={`${styles['mb-20']} ${styles['mt-0']} ${styles['fontW600']} ${styles['light-gry-clr']}`}>{PAYMENT_PAGE.REGISTER}</h4>
            <div className={`${styles['thin-border-right']} ${styles['social-icons-list']}`}>
              <span className={`${styles['sub-title']} ${styles['fs-10']} ${styles['p-5']} ${styles['bg-white']}`}>{PAYMENT_PAGE.OR}</span>
              <NoSSR>
                <SocialLogin>
                  {([handleSocialLogin]) => {
                    return (
                      <React.Fragment>
                        <button onClick={handleSocialLogin('facebook')} className={`${styles['fp-btn']} ${styles['mb-20']} ${styles['fp-btn-primary']} ${styles['right-radius']} ${styles['facebook-btn']}`}>{PAYMENT_PAGE.SIGN_IN_WITH_FACEBOOK}</button>
                        <button onClick={handleSocialLogin('google')} className={`${styles['fp-btn']} ${styles['mb-20']} ${styles['fp-btn-danger']} ${styles['right-radius']} ${styles['google-btn']}`}>{PAYMENT_PAGE.SIGN_IN_WITH_GOOGLE}</button>
                      </React.Fragment>
                    );
                  }}
                </SocialLogin>
              </NoSSR>
              {/* <button className={`${styles['fp-btn']} ${styles['fp-btn-sucess']} ${styles['regist-btn']}`}>{PAYMENT_PAGE.REGISTER_WITH_US}</button> */}
            </div>
          </Col>
          <Col md={8} sm={6} xs={12} className={`${styles['landscape-login-part']}`}>
            <h4 className={`${styles['mb-20']} ${styles['mt-0']} ${styles['light-gry-clr']}`}>{PAYMENT_PAGE.SIGN_IN}</h4>
            <div className={styles['sign-part']}>
              <div className={`${styles['fp-input']}`}>
                <input type="text" name="username" onChange={props.inputOnChange} value={props.login.username} className={styles.input} required />
                <span className={styles.highlight} />
                <span className={styles.bar} />
                <label>{PAYMENT_PAGE.EMAIL_OR_USERNAME}</label>
                {props.validation.username.message
                  ?
                    <span className={`${styles['error-msg']}`}>{props.validation.username.message}</span>
                  :
                    null
                }
              </div>
              <div className={`${styles['fp-input']}`}>
                <input type="password" name="password" onChange={props.inputOnChange} value={props.login.password || ''} className={styles.input} required />
                <span className={styles['highlight']}></span>
                <span className={styles['bar']}></span>
                <label>{PAYMENT_PAGE.PASSWORD}</label>
                {
                  props.validation.password.message
                    ?
                      <span className={`${styles['error-msg']}`}>{props.validation.password.message}</span>
                    :
                    null
                }
              </div>
              <a className={`${styles.flex} ${styles['pt-10']} ${styles['m-fs-14']} ${styles['m-justy-center']}`}>
                <span onClick={this.toggleForgotPassword}>
                  {this.state.mode !== 'register' && LOGIN_PAGE.FORGOT_PASSWORD}
                </span>
              </a>
              <div className={`${styles['mt-10']} ${styles['mb-10']}`}>
                <input type="checkbox" defaultChecked="true" onChange={props.checkBoxChange} /> {PAYMENT_PAGE.AGREE_TO} <a onClick={this.tcToggle}>{PAYMENT_PAGE.TC}</a> {PAYMENT_PAGE.AND} <a onClick={this.privacyToggle}>{PAYMENT_PAGE.PRIVACY_POLICY}</a>
                <div className={`${styles['thick-red-clr']} ${styles['ml-15']}`}>{props.showError ? LOGIN_PAGE.PLEASE_ACCEPT_OUR_TERMS : ''}</div>
              </div>
              <button className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['fp-btn-large']} ${styles.fontW600} ${styles['text-uppercase']} ${styles['left-radius']}`} onClick={props.showAddressTab}>{PAYMENT_PAGE.CONTINUE}</button>
              {
                props.signInLoader ? <span> {PAYMENT_PAGE.PLEASE_WAIT}...</span> : null
              }
            </div>
          </Col>
        </Row>

        {
          showTerms ?
            <div>
              <Modal className={`react-router-modal__modal ${styles['p-20']}`} onBackdropClick={this.tcToggle}>
                <Terms />
                <button className={`${styles['fp-btn']} ${styles['fp-btn-default']}`} onClick={this.tcToggle}>{PAYMENT_PAGE.CLOSE}</button>
              </Modal>
            </div> : null
        }

        {
          showPrivacy ?
            <div>
              <Modal className={`react-router-modal__modal ${styles['p-20']}`} onBackdropClick={this.privacyToggle}>
                <Privacy />
                <button className={`${styles['fp-btn']} ${styles['fp-btn-default']}`} onClick={this.privacyToggle}>{PAYMENT_PAGE.CLOSE}</button>
              </Modal>
            </div>
            : null
        }
        {showFP &&
          <Modal className={`react-router-modal__modal ${styles['p-20']}`} onBackdropClick={this.toggleForgotPassword}>
            <ForgotPassword
              isCheckoutPage
              enteredEmail={props.login.username}
              toggleModal={this.toggleForgotPassword}
            />
          </Modal>
        }
      </div>
    );
  }
}

export default SignIn;
