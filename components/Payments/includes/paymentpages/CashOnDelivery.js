import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { languageDefinations } from '../../../../utils/lang/';
import SVGComponent from '../../../common/SVGComponet';
import { actionCreators, selectors } from '../../../../store/captcha';
import { actionCreators as paymentsActionCreators, selectors as paymentsSelectors } from '../../../../store/payments';
import { actionCreators as camActionCreators, selectors as camSelectors } from '../../../../store/cam/personalDetails';
import { bindActionCreators } from 'redux';
import { Router } from '../../../../routes';

import Captcha from '../../../common/Captcha';
import CaptchaContent from '../../../common/Captcha/CaptchaContent'
import dynamic from 'next/dynamic';
//import EditPhone from '../../../Cam/PersonelDetails/UserData/EditPhone';
import Button from '../../../common/CommonButton';

const { PAYMENT_PAGE } = languageDefinations();

import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../../payment_en.styl';
import styles_ar from '../../payment_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};
const EditPhone = dynamic(import('../../../Cam/PersonelDetails/UserData/EditPhone'));

class CashOnDelivery extends React.Component {
  constructor() {
    super();
    this.state = {
      showContinueButton: false,
      showPayBtn: false,
      nextStep: 'captcha',
    };
    this.handleChange = this.handleChange.bind(this);
    this.onCaptchaSuccess = this.onCaptchaSuccess.bind(this);
    this.onContinueHandle = this.onContinueHandle.bind(this);
    this.afterSuccessOtpVerification = this.afterSuccessOtpVerification.bind(this);
    this.proceedToPayment = this.proceedToPayment.bind(this);
  }

  componentDidMount() {
    this.props.getUserProfileInfo();
  }
  handleChange() {
    const {data} = this.props;
    this.props.disableAllOthers({
      except: data.type
    });
  }

  onCaptchaSuccess({captcha_request_id}) {
    const { profileInfo } = this.props;
    this.setState({
      nextStep: this.state.nextStep === 'captcha' ? 'mobileVerification' : 'captcha',
      captcha_request_id,
      // showContinueButton: this.state.nextStep !== 'captcha'
    }, () => {
      if (profileInfo.contactInfo.mobile_verified === 'V') {
        this.setState({
          showPayBtn: true,
        });
      }
    });
    // this.setState({
    //   showContinueButton: true,
    //   captcha_request_id,
    // });
  }

  onContinueHandle() {
    this.setState({
      nextStep: this.state.nextStep === 'captcha' ? 'mobileVerification' : 'captcha',
      showContinueButton: this.state.nextStep !== 'captcha'
    });
  }

  afterSuccessOtpVerification() {
    this.setState({
        showPayBtn: true,
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.processData && nextProps.processData.redirect_url) {
      window.location = nextProps.processData.redirect_url;
    }
  }

  proceedToPayment() {
    const { data, makeProcessRequest } = this.props;
    makeProcessRequest({
      payment_details: [{
        payment_mode: data.type,
        request_id: this.state.captcha_request_id,
      }]
    });
  }
  render() {
    const { data, showLoading, profileInfo } = this.props;
    return <div>
        <div className={`${styles['cash-on-dly-points']} ${styles['pt-25']} ${styles['pb-15']}`}>
    <Row className={styles['pl-40']}>
      <Col md={12}>
        <h4 className={`${styles['fontW300']} ${styles['fs-20']} ${styles['lgt-blue']} ${styles['mt-0']} ${styles['pb-10']}`}>{PAYMENT_PAGE.PAY_ON_DELIVERY}</h4>
    {
          {
            captcha:  <Captcha
              onCaptchaSuccess={this.onCaptchaSuccess}
              txnId={this.props.transactionId}
              render={([items,state,handleClick,handleDrop]) =>
                <CaptchaContent
                  items={items}
                  state={state}
                  handleClick={handleClick}
                  handleDrop={handleDrop}
                />
              }
              />,
            mobileVerification:
            <EditPhone
            afterSuccessOtpVerification={this.afterSuccessOtpVerification}
            mobileVerified = {profileInfo.contactInfo.mobile_verified === 'V'}
            userData = {profileInfo.contactInfo}
            />
          }[this.state.nextStep]
    }
    </Col>
    <Col md={10} sm={12} xs={12}>
      {
        this.state.showContinueButton &&
           (
           <Button
              className={`${styles['fs-16']} ${styles['fontW600']} ${styles.width55} ${styles['new-card-btn']}`}
              onClick={this.onContinueHandle}
              btnText={PAYMENT_PAGE.CONTINUE}
              hoverClassName="hoverBlueBackground"

           />
          )
      }
      {
        this.state.showPayBtn &&
            (
              <Button
                className={`${styles['fs-16']} ${styles['fontW600']} ${styles['new-card-btn']} ${styles['border-radius']} ${styles['ht-40']} ${styles.width70}`}
                onClick={this.proceedToPayment}
                btnText={PAYMENT_PAGE.PAY + ' ' + data.amount_to_pay.display_value + ' ' + data.amount_to_pay.currency_code + ' ' + PAYMENT_PAGE.ON_DELIVERY}
                hoverClassName="hoverBlueBackground"
                btnLoading={showLoading}

              />
          )
      }
    </Col>
    </Row>
  </div>
  </div>;
  }
}

CashOnDelivery.propTypes = {
  makePayment: PropTypes.func.isRequired,
}


const mapStateToProps = store => ({
  getCaptcha: selectors.getCaptcha(store),
  getVerification: selectors.getVerification(store),
  processData: paymentsSelectors.getProcessData(store),
  profileInfo: camSelectors.getUserInfo(store),
  showLoading: paymentsSelectors.getLoader(store),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    verifyCaptcha: actionCreators.verifyCaptcha,
    captchaQuestion: actionCreators.captchaQuestion,
    makeProcessRequest: paymentsActionCreators.makeProcessRequest,
    getUserProfileInfo: camActionCreators.getUserProfileInfo,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CashOnDelivery);
