import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import NoSSR from 'react-no-ssr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
    };

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
    console.log('showCheckoutLogin', props.showCheckoutLogin);
    return (
      <div className={`${styles.box} ${styles['mb-20']} ${styles.relative} ${styles['payment-signup']}`}>
        <SVGComponent clsName={`${styles.profile} ${props.configJson.done ? 'done' : ''} ${props.configJson.progress ? 'payment-active' : ''}`} src="icons/profile/profile" />
        {
       !props.showCheckoutLogin && props.login.username && !props.showLogout &&
       <Row>
          <Col md={8} sm={12} xs={12}>
            <h4 className={styles['m-0']}>{`${PAYMENT_PAGE.YOU_ARE_SIGNED_IN_AS}`}</h4>
            {props.login.username &&
            <small>{props.login.username}</small>
            }
          </Col>
          {props.login.username &&
          <Col md={4} sm={12} xs={12} className={styles['t-rt']}>
            <span className={`${styles['light-gry-clr']} ${styles.fontW600}`}>{props.login.username}&emsp;</span>
            <button className={`${styles['fp-btn']} ${styles['fp-btn-default']} ${styles['left-radius']} ${styles.pointer}`} onClick={props.onClickEdit}>
              {PAYMENT_PAGE.CHANGE}
            </button>
          </Col>
          }
        </Row>}
        <Row >
          <Col md={8} sm={5} xs={12} className={styles['landscape-socail-part']}>
            {props.showLogout && !props.showCheckoutLogin &&
            <div className={`${styles['continue-checkout']} ${styles['m-10']}`}>
              <div>
                <div>Logged in as</div>
                <div>{props.login.username}</div>
              </div>
              <Button
                className={`${styles['flex-center']} ${styles.width35} ${styles['fs-14']} ${styles['text-uppercase']} ${styles['button-radius']}`}
                onClick={props.continueCheckout}
                btnText="Continue To Checkout"
              />
              <div className={`${styles['text-blue']} ${styles.pointer}`} onClick={props.logoutClicked}>Logout &amp; Signin as different User</div>
            </div>}
            {props.showCheckoutLogin &&
            <LoginFlow />}
          </Col>
        </Row>
      </div>
    );
  }
}
const mapStateToProps = store => ({
  showLoginPage: selectors.showLogin(store),
  activeEmailId: selectors.getActiveEmailId(store),
  showCheckoutLogin: selectors.showCheckoutLogin(store),
  showLoginPage: selectors.showLogin(store),
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
  },
  dispatch,
);


export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
