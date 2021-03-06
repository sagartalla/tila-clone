import React from 'react';
import NoSSR from 'react-no-ssr';
import { Row, FormGroup, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SocialLogin from './SocialLogin';
import { selectors, actionCreators } from '../../store/auth';
import SVGComponent from '../common/SVGComponet';
import Button from '../common/CommonButton';
import FormValidator from '../common/FormValidator';
import lang from '../../utils/language';
import { languageDefinations } from '../../utils/lang';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './login_en.styl';
import styles_ar from './login_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };
const { LOGIN_PAGE, ORDER_PAGE, PAYMENT_PAGE } = languageDefinations();

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.validations = new FormValidator([
      {
        field: 'email',
        method: this.emptyValue,
        message: LOGIN_PAGE.EMAIL_ERROR,
        validWhen: false,
      },
      {
        field: 'email',
        method: this.checkEmailValidation,
        validWhen: false,
        message: LOGIN_PAGE.VALID_EMAIL,
      },
    ]);
    this.state = {
      email: props.activeEmailId || '',
    };
  }

  onChangeField = ({ target }) => {
    this.setState({
      email: target.value,
    });
  }

  handleValidation = ({ target }) => {
    const validation = this.validations.validateOnBlur({ [target.name]: target.value });
    this.setState({ validation });
  }
  
  emptyValue = fieldValue => fieldValue === '';


  checkEmailValidation = (fieldValue) => {
    const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailReg.test(fieldValue)) return false;
    return true;
  }

  submit = (e) => {
    const validation = this.validations.validate(this.state);    
    e.preventDefault();
    const { email } = this.state;
    const { userLogin } = this.props;
    if (validation.isValid) {
      userLogin(email);
    }
    this.setState({ validation });
  }

  render() {
    const { loadingStatus, activeEmailId } = this.props;
    const { email, validation } = this.state;
    return (
      <div className={`${styles['login-form']} ${styles['flx-space-bw']} ${styles['flex-colum']}`}>
        <div>
          <Row>
            <Col md={12} xs={12} sm={12}>
              <h2 className={`${styles['fs-18']} ${styles['t-c']} ${styles.fontW600}`}>{LOGIN_PAGE.LOGIN_SIGNUP}</h2>
            </Col>
            {/* <Col md={7} xs={12} sm={7}>
              <h2 className={`${styles['fs-18']} ${styles.fontW600}`}>{LOGIN_PAGE.LOGIN_ENTER_EMAIL}</h2>
            </Col> */}
          </Row>
          <Row className={`${styles['pt-30']} ${styles.flex}`}>
            <Col md={5} xs={6} sm={6} className={`${styles.relative} ${styles.flex} ${styles['flex-colum']} ${styles['justify-center']} ${styles['pr-30']} ${styles['border-rt']}`}>
              <SocialLogin>
                {([handleSocialLogin]) => (
                  <NoSSR>
                    <div onClick={handleSocialLogin('google')} className={`${styles['flex-center']} ${styles.pointer} ${styles['border-lg']} ${styles['border-radius4']} ${styles['mb-5']} ${styles['p-5']}`}>
                      <a className={`${styles.flex} ${styles['ml-15']}`}>
                        <SVGComponent clsName={`${styles['bg-GOOGLE-icon']} ${styles['mr-10']}`} src="icons/social-icons/bg-google" />
                      </a>
                      {LOGIN_PAGE.GOOGLE}
                    </div>
                    <div onClick={handleSocialLogin('instagram')} className={`${styles['flex-center']} ${styles.pointer} ${styles['border-lg']} ${styles['border-radius4']} ${styles['mb-5']} ${styles['p-5']}`}>
                      <a className={`${styles.flex} ${styles['ml-15']} ${styles['pr-10']}`}>
                        <img clsName={`${styles['bg-GOOGLE-icon']} ${styles['mr-10']}`} src="/static/img/bg-img/instagram.png" />
                      </a>
                      {LOGIN_PAGE.INSTAGRAM}
                    </div>
                    <div onClick={handleSocialLogin('facebook')} className={`${styles['flex-center']} ${styles.pointer} ${styles['border-lg']} ${styles['border-radius4']} ${styles['mb-5']} ${styles['p-5']}`}>
                      <a className={`${styles.flex} ${styles['ml-15']}`}>
                        <SVGComponent clsName={`${styles['bg-FB-icon']} ${styles['mr-10']}`} src="icons/social-icons/bg-facebook" />
                      </a>
                      {LOGIN_PAGE.FACEBOOK}
                    </div>
                  </NoSSR>
                )}
              </SocialLogin>
              <span className={`${styles.absolute} ${styles['bg-white']} ${styles.right0} ${styles['p-5']} ${styles['fs-10']} ${styles['border-lg']} ${styles['or-tag']} ${styles['t-c']}`} >{PAYMENT_PAGE.OR}</span>
            </Col>
            <Col md={7} xs={6} sm={6} className={`${styles['pl-30']}`}>
              <form onSubmit={this.submit}>
                <div className={`${styles['fp-input']} ${styles['pb-10']}`}>
                  <input
                    type="text"
                    name="email"
                    value={email}
                    autoComplete="off"
                    className={styles['m-fs-16']}
                    onChange={this.onChangeField}
                    onBlur={this.handleValidation}
                    required
                  />
                  <span className={styles.highlight} />
                  <span className={styles.bar} />
                  <label>{LOGIN_PAGE.LOGIN_INPUT_EMAIL_ENTER}</label>
                  {
                    validation && validation.email && validation.email.isInValid ?
                      <div>
                        <span className={`${styles['error-msg']}`}>{validation.email.message}</span>
                      </div> : null
                  }
                </div>
                <Button
                  className={`${styles['flex-center']} ${styles['sign-in-btn']} ${styles.fontW700} ${styles.width100} ${styles['fs-14']} ${styles['text-uppercase']}`}
                  onClick={this.submit}
                  btnLoading={loadingStatus}
                  btnText={ORDER_PAGE.CONTINUE}
                />
              </form>
            </Col>
          </Row>
        </div>
        <span className={`${styles['m-20']} ${styles['mt-0']} ${styles['t-c']} ${styles['fs-12']} ${styles['register-policy-gray']}`}>{LOGIN_PAGE.BY_SIGNUP_IN_I_AGREE_TO_TERMS } <span className={`${styles['text-blue']} ${styles.fontW600}`}><a href="/en/policy/user-terms" target="_blank">{LOGIN_PAGE.T_AND_C}</a></span>, <span className={`${styles['text-blue']} ${styles.fontW600}`}><a href="/en/policy/privacy-policy" target="_blank">{LOGIN_PAGE.PRIVACY}</a></span> {LOGIN_PAGE.AND} <span className={`${styles['text-blue']} ${styles.fontW600}`}><a href="/en/policy/cookie-policy" target="_blank">{LOGIN_PAGE.COOKIE_POLICY}</a></span> {LOGIN_PAGE.NAME_TILA} {lang === 'ar' ? LOGIN_PAGE.I_HAVE_TILA : ''}</span>
      </div>
    );
  }
}


const mapStateToProps = store => ({
  loadingStatus: selectors.getLoadingStatus(store),
  activeEmailId: selectors.getActiveEmailId(store),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    userLogin: actionCreators.v2UserLogin,
    v2CurrentFlow: actionCreators.v2CurrentFlow,
    // getLoginInfo: actionCreators.getLoginInfo,
    // resetLoginError: actionCreators.resetLoginError,
    // track: actionCreators.track,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
