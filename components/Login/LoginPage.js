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
const { LOGIN_PAGE, ORDER_PAGE } = languageDefinations();

class LoginPage extends React.Component {
  constructor() {
    super();
    const email = localStorage.getItem('remember') ? JSON.parse(localStorage.getItem('remember')).email : '';
    this.validations = new FormValidator([
      {
        field: 'email',
        method: this.emptyEmail,
        message: 'Please fill the email',
        validWhen: false,
      },
      {
        field: 'email',
        method: this.checkValidation,
        args: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        validWhen: true,
        message: 'Please enter valid email ID',
      },
    ]);
    this.state = {
      email,
      validation: this.validations.valid(),
    };
  }

  onChangeField = ({ target }) => {
    this.setState({
      email: target.value,
    });
  }


  emptyEmail = (fieldValue) => {
    if (fieldValue === '') {
      return true;
    }
    return false;
  }

  checkValidation = (fieldValue, state, args) => args.test(fieldValue)
  
  handleValidation = () => {
    const { email } = this.state;
    const validation = this.validations.validateOnBlur({ email });

    this.setState({ validation });
  }

  submit = (e) => {
    e.preventDefault();
    const { email } = this.state;
    const validation = this.validations.validate(this.state);
    const { userLogin } = this.props;
    if (validation.isValid) {
      userLogin(email);
    }
    this.setState({ validation });
  }

  render() {
    const { loadingStatus } = this.props;
    const { email, validation } = this.state;
    return (
      <div className={`${styles['login-form']} ${styles['flx-space-bw']} ${styles['flex-colum']}`}>
        <div>
          <Row>
            <Col md={5} xs={12} sm={5}>
              <h2 className={`${styles['fs-18']} ${styles.fontW600}`}>{LOGIN_PAGE.LOGIN}</h2>
            </Col>
            <Col md={7} xs={12} sm={7}>
              <h2 className={`${styles['fs-18']} ${styles.fontW600}`}>{LOGIN_PAGE.LOGIN_ENTER_EMAIL}</h2>
            </Col>
          </Row>
          <Row className={`${styles['pt-30']} ${styles.flex}`}>
            <Col md={5} xs={12} sm={5} className={`${styles.relative} ${styles.flex} ${styles['flex-colum']} ${styles['justify-center']} ${styles['pr-20']} ${styles['border-rt']}`}>
              <SocialLogin v2CurrentFlow={this.props.v2CurrentFlow}>
                {([handleSocialLogin]) => (
                  <NoSSR>
                    <div onClick={handleSocialLogin('facebook')} className={`${styles['flex-center']} ${styles.pointer} ${styles['border-lg']} ${styles['border-radius4']} ${styles['mb-5']} ${styles['p-5']}`}>
                      <a className={`${styles.flex} ${styles['ml-15']}`}>
                        <SVGComponent clsName={`${styles['bg-FB-icon']} ${styles['mr-10']}`} src="icons/social-icons/bg-facebook" />
                      </a>
                      {LOGIN_PAGE.FACEBOOK}
                    </div>
                    <div onClick={handleSocialLogin('google')} className={`${styles['flex-center']} ${styles.pointer} ${styles['border-lg']} ${styles['border-radius4']} ${styles['mb-5']} ${styles['p-5']}`}>
                      <a className={`${styles.flex} ${styles['ml-15']}`}>
                        <SVGComponent clsName={`${styles['bg-GOOGLE-icon']} ${styles['mr-10']}`} src="icons/social-icons/bg-google" />
                      </a>
                      {LOGIN_PAGE.GOOGLE}
                    </div>
                  </NoSSR>
                )}
              </SocialLogin>
              <span className={`${styles.absolute} ${styles['bg-white']} ${styles.right0} ${styles['p-5']} ${styles['fs-10']} ${styles['border-lg']} ${styles['or-tag']}`} >OR</span>
            </Col>
            <Col md={7} xs={12} sm={7} className={`${styles['pl-30']}`}>
              <form onSubmit={this.submit}>
                <div className={`${styles['fp-input']} ${styles['pb-10']}`}>
                  <input
                    type="text"
                    value={email}
                    autoComplete={false}
                    className={styles['m-fs-16']}
                    onChange={this.onChangeField}
                    onBlur={this.handleValidation}
                    required
                  />
                  <span className={styles.highlight} />
                  <span className={styles.bar} />
                  <label>{LOGIN_PAGE.LOGIN_INPUT_EMAIL_ENTER}</label>
                  {
                    validation.email && validation.email.isInValid ?
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
        <span className={`${styles['m-20']} ${styles['mt-0']} ${styles['t-c']} ${styles['fs-12']} ${styles['register-policy-gray']}`}>{LOGIN_PAGE.BY_SIGNUP_I_AGREE_TO_TERMS } <span className={`${styles['text-blue']}`}><a href="/SAU/en/policy/tc" target="_blank">{LOGIN_PAGE.T_AND_C}</a>, <a href="/SAU/en/policy/pp" >{LOGIN_PAGE.PRIVACY}</a> {LOGIN_PAGE.AND} <a href="/SAU/en/policy/pp" >{LOGIN_PAGE.COOKIE_POLICY}</a></span></span>
      </div>
    );
  }
}


const mapStateToProps = store => ({
  loadingStatus: selectors.getLoadingStatus(store),
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
