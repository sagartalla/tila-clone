import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import NoSSR from 'react-no-ssr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Cookies from 'universal-cookie';
import Terms from '../../common/terms';
import { Modal } from 'react-router-modal';
import Privacy from '../../common/privacy';
import SVGComponent from '../../common/SVGComponet';
import { languageDefinations } from '../../../utils/lang/';
import Button from '../../common/CommonButton';
import SocialLogin from '../../Login/SocialLogin';
import ForgotPassword from '../../Login/ForgotPassword';
import LoginFlow from '../../Login/LoginFlow';
import { selectors, actionCreators } from '../../../store/auth';
import { selectors as paymentSelectors } from '../../../store/payments';
import { actionCreators as personalActionCreators, selectors as camSelectors } from '../../../store/cam/personalDetails';



import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../payment_en.styl';
import styles_ar from '../payment_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };


const { PAYMENT_PAGE, HEADER_PAGE } = languageDefinations();

const cookies = new Cookies();
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTerms: false,
      showPrivacy: false,
      showFP: false,
    };

    this.tcToggle = this.tcToggle.bind(this);
    this.privacyToggle = this.privacyToggle.bind(this);
  }
  componentDidMount() {
    const { userInfoData, isLoggedIn } = this.props;
    console.log('userInfoData', userInfoData);
    if (isLoggedIn && userInfoData && userInfoData.email_verified === 'NV') {
      const data = { currentFlow: 'existing_user_login', nextPage: 'verify_email' };
      const { v2CurrentFlow } = this.props;
      v2CurrentFlow(data);
    }
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
        {
       !props.showCheckoutLogin && (props.userInfoData && props.userInfoData.email) && !props.showLogout && props.isLoggedIn &&
       <Row>
          <Col md={6} sm={12} xs={12}>
            <h4 className={styles['m-0']}>{`${PAYMENT_PAGE.YOU_ARE_SIGNED_IN_AS}`}</h4>
            <small>{(props.userInfoData && props.userInfoData.email)}</small>
          </Col>
          {(props.userInfoData && props.userInfoData.email) &&
          <Col md={6} sm={12} xs={12} className={styles['t-rt']}>
            <span className={`${styles['light-gry-clr']} ${styles['user-login-name']} ${styles.fontW600}`}>{(props.userInfoData && props.userInfoData.email)}&emsp;</span>
            <button className={`${styles['fp-btn']} ${styles['fp-btn-default']} ${styles['ml-15']} ${styles['left-radius']} ${styles.pointer}`} onClick={props.onClickEdit}>
              {PAYMENT_PAGE.CHANGE}
            </button>
          </Col>
          }
        </Row>}
        <Row >
          <Col md={7} sm={5} xs={12} className={`${styles['landscape-socail-part']}`}>
            {props.showLogout && !props.showCheckoutLogin && props.isLoggedIn &&
            <div className={`${styles['continue-checkout']} ${styles['m-20']}`}>
              <div>
                <div className={`${styles['fs-16']}`}>{PAYMENT_PAGE.YOU_ARE_SIGNED_IN_AS}</div>
                <div className={`${styles.fontW600} ${styles['mt-5']}`}>{props.userInfoData && props.userInfoData.email}</div>
              </div>
              <div>
              <Button
                className={`${styles['flex-center']} ${styles.width50} ${styles['fs-14']} ${styles['text-uppercase']} ${styles['button-radius']}`}
                onClick={props.continueCheckout}
                btnText={PAYMENT_PAGE.CONTINUE_TO_CHECKOUt}
              />
              <div className={`${styles['text-blue']} ${styles['m-30']} ${styles.pointer}`} onClick={props.logoutClicked}>{HEADER_PAGE.LOGOUT} &amp; {PAYMENT_PAGE.SIGN_IN_AS_DIFF_USER}</div>
              </div>
            </div>}
            {(props.showCheckoutLogin || !props.isLoggedIn) &&
            <LoginFlow />}
          </Col>
        </Row>
      </div>
    );
  }
}
const mapStateToProps = store => ({
  showLoginPage: selectors.showLogin(store),
  showCheckoutLogin: selectors.showCheckoutLogin(store),
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    v2CurrentFlow: actionCreators.v2CurrentFlow,
  },
  dispatch,
);


export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
