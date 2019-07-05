import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-bootstrap';
import { Modal } from 'react-router-modal';
import SVGComponent from '../common/SVGComponet';
import { selectors, actionCreators } from '../../store/auth';
// import { selectors as productSelectors } from '../../store/cam/personalDetails';
import ForgotPassword from './ForgotPassword';
import ForgotSecurityPage from './ForgotSecurityQuestions';
import { languageDefinations } from '../../utils/lang';
import VerifyStatus from './VerifyStatus';
import VerifyEmail from './VerifyEmail';
import LoginPage from './LoginPage';
import SignIn from './SignIn';
import ThankYou from './ThankYouPage';
import CompleteSignUp from './CompleteSignUp';
import ExistingSocialLogin from './ExistingSocialLogin';
import ResetpasswordMain from './ResetpasswordMain';

import lang from '../../utils/language';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './login_en.styl';
import styles_ar from './login_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };
const { LOGIN_PAGE } = languageDefinations();

class LoginFlow extends Component {


  onBackdropClick = () => {
    if (!window.sessionStorage.getItem('TILuservisitcount')) {
      window.sessionStorage.setItem('TILuservisitcount', 1);
    }
    this.props.onBackdropClick();
  }

  loadPage = () => {
    const { activeObj, showEmailSuccess, showOtpSuccess } = this.props;
    switch (activeObj && activeObj.activePage && activeObj.activePage) {
      case 'password':
        return <SignIn mode="EXISTING_USER" />;
      case 'password_new':
        return <SignIn mode="NEW_USER" />;
      case 'social_login':
        return <SignIn mode="SOCIAL_LOGIN" />;
      case 'signin_page':
        return <LoginPage />;
      case 'security_page':
        return <ForgotSecurityPage />;
      case 'reset_type':
        return <ForgotPassword />;
      case 'success_screen':
        return <VerifyStatus showEmailSuccess={showEmailSuccess} showOtpSuccess={showOtpSuccess} onBackdropClick={this.onBackdropClick} />;
      case 'verify_email':
        return <VerifyEmail />;
      case 'personal_details':
        return <CompleteSignUp />;
      case 'existing_social_login':
        return <ExistingSocialLogin />;
      case 'reset_screen':
        return <ResetpasswordMain onBackdropClick={this.onBackdropClick} />;
      case 'shipping_to_page':
        return <CompleteSignUp />;
      default:
        return <LoginPage />;
    }
  }

  render() {
    return (
      <div className={`${styles['pl-40']} ${styles['pr-40']}`}>
        {this.loadPage()}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  activeObj: selectors.getActive(store),
  showEmailSuccess: selectors.showEmailSuccess(store),
  showOtpSuccess: selectors.showOtpSuccess(store),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {

  },
  dispatch,
);


export default connect(mapStateToProps, mapDispatchToProps)(LoginFlow);
