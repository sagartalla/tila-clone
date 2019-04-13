import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { languageDefinations } from '../../../../utils/lang/';
import SVGComponent from '../../../common/SVGComponet';
import { mergeCss } from '../../../../utils/cssUtil';
import { actionCreators, selectors } from '../../../../store/captcha';
import { actionCreators as paymentsActionCreators, selectors as paymentsSelectors } from '../../../../store/payments';
import { actionCreators as camActionCreators, selectors as camSelectors } from '../../../../store/cam/personalDetails';
import { bindActionCreators } from 'redux';
import { Router } from '../../../../routes';

import Captcha from '../../../common/Captcha';
import CaptchaContent from '../../../common/Captcha/CaptchaContent'

import EditPhone from '../../../Cam/PersonelDetails/UserData/EditPhone';
import Button from '../../../common/CommonButton';

const { PAYMENT_PAGE } = languageDefinations();
const styles = mergeCss('components/Payments/payment');

class CashOnDelivery extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false,
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
    this.setState({
      checked: !this.state.checked
    })
    this.props.disableAllOthers({
      except: data.type
    });
  }

  onCaptchaSuccess({captcha_request_id}) {
    this.setState({
      nextStep: this.state.nextStep === 'captcha' ? 'mobileVerification' : 'captcha',
      captcha_request_id,
      // showContinueButton: this.state.nextStep !== 'captcha'
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
    const { data, showLoading } = this.props;
    return <div>
        <div className={`${styles['cash-on-dly-points']}`}>
    <Row className={styles['pl-40']}>
      <Col md={12}>
        <h4 className={`${styles['fontW300']} ${styles['fs-20']} ${styles['lgt-blue']} ${styles['mt-0']} ${styles['pb-10']}`}>{PAYMENT_PAGE.PAY_ON_DELIVERY}</h4>
    {
      this.state.nextStep === 'captcha' && (
        <div className={styles['checkbox-material']}>
          <input id="pay-delivery" type="checkbox" onChange={ this.handleChange } checked={ this.state.checked }/>
          <label for="pay-delivery"> {PAYMENT_PAGE.I_AGREE_TO_PAY_COD} </label>
        </div>
      )
    }
    {
      this.state.checked
        ?
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
            mobileVerification: <EditPhone afterSuccessOtpVerification={this.afterSuccessOtpVerification}/>
          }[this.state.nextStep]
        :
          null
    }
    </Col>
    <Col md={6} sm={12} xs={12}>
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
                className={`${styles['fs-16']} ${styles['fontW600']} ${styles['new-card-btn']} ${styles['border-radius']} ${styles.width55} ${styles['ht-40']}`}
                onClick={this.proceedToPayment}
                btnText={PAYMENT_PAGE.PAY + ' ' + data.amount_to_pay + ' ' + data.currency_code}
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
