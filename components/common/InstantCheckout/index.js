import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

// import { Modal } from "react-router-modal";
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { languageDefinations } from '../../../utils/lang/';
import { actionCreators, selectors } from '../../../store/common/instantCheckout';
import { selectors as paymentSelector } from '../../../store/payments'
import { actionCreators as addressActionCreators, selectors as addressSelectors } from '../../../store/cam/address';
import { actionCreators as vaultActionCreators, selectors as vaultSelectors } from '../../../store/cam/userVault';
import { actionCreators as camActionCreators, selectors as camSelectors } from '../../../store/cam/personalDetails';

import Button from '../CommonButton';
import ShippingAddress from '../../Cam/ShippingAddress';
import UserVault from '../../Cam/UserVault';
import { Modal } from 'react-bootstrap';
import Captcha from '../Captcha';
import CaptchaContent from '../Captcha/CaptchaContent';
import EditPhone from '../../Cam/PersonelDetails/UserData/EditPhone';
import AddrCard from './includes/AddrCard';
import VaultCard from './includes/VaultCard';
import CodCard from './includes/CodCard';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './instant_en.styl';
import styles_ar from './instant_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};


const { INSTANT_CHECKOUT, PAYMENT_PAGE, CONTACT_INFO_MODAL } = languageDefinations();

const cookies = new Cookies();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

class InstantCheckout extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showMiniAddress: false,
      showMiniVault: false,
      creditDebitCard: true,
      showBlocker: false,
      cod: false,
      cvv: '',
      cntryCode: '',
      phoneNumber: '',
      checked: false,
      nextStep: 'captcha',
      btnLoader: false
    }

    this.updateCVV = this.updateCVV.bind(this);
    this.mobilehandler = this.mobilehandler.bind(this);
    this.codClickHandler = this.codClickHandler.bind(this);
    this.toggleMiniVault = this.toggleMiniVault.bind(this);
    this.cntryCodehandler = this.cntryCodehandler.bind(this);
    this.doInstantCheckout = this.doInstantCheckout.bind(this);
    this.toggleMiniAddress = this.toggleMiniAddress.bind(this);
    this.creditCardClickHandler = this.creditCardClickHandler.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.onCaptchaSuccess = this.onCaptchaSuccess.bind(this)
    this.afterSuccessOtpVerification = this.afterSuccessOtpVerification.bind(this)
    this.callInstantCheckout = this.callInstantCheckout.bind(this)
  }

  componentDidMount() {
    this.props.getShippingAddressResults();
    this.props.getCardResults();
    this.props.getUserProfileInfo();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.getInstantCheckoutdata && nextProps.getInstantCheckoutdata.redirect_url) {
      location.href = nextProps.getInstantCheckoutdata.redirect_url;
    }
  }
  closeModal() {
    this.setState({
      checked: false
    })
  }
  handleChange() {
    this.setState(prevstate => ({
      checked: !prevstate.checked
    }))
  }
  toggleMiniAddress() {
    this.setState({ showMiniAddress: !this.state.showMiniAddress, showMiniVault: false });
  }

  toggleMiniVault() {
    this.setState({ showMiniVault: !this.state.showMiniVault, showMiniAddress: false });
  }
  afterSuccessOtpVerification() {
    this.setState({
      nextStep: 'checkoutBtn'
    })
  }

  doInstantCheckout() {
    const {
      creditDebitCard, cntryCode, phoneNumber,
    } = this.state;
    const { defaultCard, insnt_item_listing_id, doInstantCheckout } = this.props;

    const params = {
      listing_ids: insnt_item_listing_id ? [insnt_item_listing_id] : [],
      payment_mode: creditDebitCard ? 'SAVED_CARD' : 'CASH_ON_DELIVERY',
      redirect_url: `${window.location.origin}/${country}/${language}`,
    };

    if (creditDebitCard) {
      params.card_token = defaultCard[0].card_token;
    } else params.phone_number = phoneNumber ? `${cntryCode} ${phoneNumber}` : '';

    this.setState({ showBlocker: true });
    doInstantCheckout(params);
  }

  creditCardClickHandler() {
    this.setState({ creditDebitCard: true, cod: false });
  }

  codClickHandler() {
    this.setState({ creditDebitCard: false, cod: true });
  }

  updateCVV(e) {
    this.setState({ cvv: e.target.value });
  }

  mobilehandler(e) {
    this.setState({ phoneNumber: e.target.value });
  }

  cntryCodehandler(e) {
    this.setState({ cntryCode: e.target.value });
  }
  onCaptchaSuccess({ captcha_request_id }) {
    const { profileInfo } = this.props;
    this.setState({
      nextStep: this.state.nextStep === 'captcha' ? 'mobileVerification' : 'captcha',
      captcha_request_id,
    }, () => {
      if (profileInfo.contactInfo.mobile_verified === 'V') {
        this.setState({
          nextStep: 'checkoutBtn',
        });
      }
    });
  }
  callInstantCheckout() {
    const { doInstantCheckout } = this.props
    const params = {
      listing_ids: [],
      payment_mode: 'CASH_ON_DELIVERY',
      redirect_url: `${window.location.origin}/${country}/${language}`,
      request_id: this.state.captcha_request_id
    };
    this.setState({
      btnLoader: true
    }, () => doInstantCheckout(params))

  }

  render() {
    const {
      addressResults,
      defaultAddr,
      vaultResults,
      defaultCard,
      isPdp,
      paymentModesData,
      totalPrice,
      currency,
      profileInfo,
      showLoading,
      isFromCart,
    } = this.props;
    const {
      showMiniAddress,
      showMiniVault,
      creditDebitCard,
      cod,
      showBlocker,
      btnLoader,
      checked,
      checkoutBtn,
    } = this.state;
    return (
      <div>
        {
          defaultAddr.length > 0 && defaultCard.length > 0 ?
            <div className={`${styles['instant-checkout']} ${styles['p-10']}`}>
              <div className={`${styles['pr-10']} ${styles['pl-10']}`}>
                {
                  showBlocker ?
                    <div className={styles['blocker']}>

                    </div>
                    : ''
                }
                <h4 className={`${styles['fontW600']} ${styles['mb-0']} ${styles['flex']}`}>
                  {INSTANT_CHECKOUT.CHECKOUT_WITH_ONE_CLICK}
                  {/* <span className={`${styles['checkout-quat']} ${styles['fs-12']} ${styles['flex-center']} ${styles['justify-around']}`}>?</span> */}
                </h4>
                <p className={`${styles['fs-10']} ${styles['thick-gry-clr']} ${styles['mb-5']}`}>{INSTANT_CHECKOUT.WITH_YOUR_PREFERRED_PAYMENT}</p>
                <div className={`${styles['flex']} ${styles['pt-5']} ${styles['pb-5']}`}>
                  <span className={`${styles['fs-12']} ${styles['pr-30']}`}><input type="radio" name="pay_type" className={styles['radio-btn']} checked={creditDebitCard} onChange={this.creditCardClickHandler} /> {INSTANT_CHECKOUT.CREDIT_DEDIT}</span>
                  <span className={styles['fs-12']}><input type="radio" name="pay_type" className={styles['radio-btn']} checked={cod} onChange={this.codClickHandler} /> {INSTANT_CHECKOUT.COD}</span>
                </div>
                <div className={`${styles['border']} ${styles['border-radius2']} ${styles['bg-white']} ${styles['relative']} ${styles['mt-10']}`}>
                  {
                    defaultAddr.length > 0 ?
                      <Fragment>
                        <AddrCard
                          defaultAddr={defaultAddr}
                          toggleMiniAddress={this.toggleMiniAddress}
                        />
                        {
                          showMiniAddress ?
                            <ShippingAddress
                              miniAddress={true}
                              isPdp={isPdp}
                              isFromCart={isFromCart}
                              toggleMiniAddress={this.toggleMiniAddress}
                            />
                            : null
                        }
                      </Fragment>
                      : null
                  }
                  {
                    defaultCard.length && creditDebitCard > 0 ?
                      <Fragment>
                        <VaultCard
                          defaultCard={defaultCard}
                          updateCVV={this.updateCVV}
                          toggleMiniVault={this.toggleMiniVault}
                        />
                        {
                          showMiniVault ?
                            <div>
                              <UserVault
                                miniVault={true}
                                toggleMiniVault={this.toggleMiniVault}
                              />
                            </div>
                            : null
                        }
                      </Fragment>
                      : null
                  }
                  {
                    cod ?
                      <div className={styles['p-10']}>
                        <input
                          id="pay-delivery"
                          type="checkbox"
                          onChange={this.handleChange}
                          checked={this.state.checked}
                        />
                        <label for="pay-delivery" className={`${styles['fs-12']} ${styles['fw300']} ${styles['pl-10']} ${styles['pr-10']}`}>{INSTANT_CHECKOUT.AGREE_CASH_ON_DELIVERY}</label>
                      </div>
                      : null
                  }
                  {
                    /* <div className={`${styles['p-10-20']}`}>
                    <div className={styles['checkbox-material']}>
                    <input id="checkout-label" type="checkbox" />
                    <label for="checkout-label" className={`${styles['thick-gry-clr']} ${styles['fontW300']}`}> Don't call before delivery </label>
                    </div>
                    </div>
                    */
                  }
                </div>
                {
                  !cod &&
                  <div
                    className={`${styles['flex']} ${styles['justify-center']}`}
                  >
                    <Button
                      className={`${styles['fp-btn']} ${styles['fp-btn-sucess']} ${styles['fontW600']} ${styles['instant-btn']}`}
                      onClick={this.doInstantCheckout}
                      btnText={INSTANT_CHECKOUT.INSTANT_CHECKOUT}
                      showImage="icons/common-icon/instant-checkout"
                      btnLoading={showLoading}
                    />
                  </div>
                }
              </div>
            </div>
            : null
        }
        <div>
          <Modal
            {...this.props}
            show={this.state.checked}
            onHide={this.closeModal}
            dialogClassName="custom-modal"
          >
            <Modal.Header
              closeButton
              className={`${styles['modal-headerStyl']}`}
            >
              <Modal.Title>Instant Checkout COD </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {
                checked
                  ?
                  {
                    captcha: <Captcha
                      onCaptchaSuccess={this.onCaptchaSuccess}
                      txnId={paymentModesData.transactionId}
                      render={([items, state, handleClick, handleDrop]) =>
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
                      />,
                    checkoutBtn:
                    <div>
                    <div className={`${styles['success-green']} ${styles['mb-25']}`}>{CONTACT_INFO_MODAL.PLEASE_CONFIRM_YOUR_ORDER}</div>
                      <div>
                        <Button
                          className={`${styles['fp-btn']} ${styles['fp-btn-sucess']} ${styles['fontW600']} ${styles['instant-btn']} ${styles.width45}`}
                          onClick={this.callInstantCheckout}
                          btnText={PAYMENT_PAGE.PAY + ' ' + totalPrice + ' ' + currency + ' ' + PAYMENT_PAGE.ON_DELIVERY}
                          disabled={btnLoader}
                          btnLoading={btnLoader}
                        />
                      </div>
                      </div>
                  }[this.state.nextStep]
                  :
                  null
              }
            </Modal.Body>
          </Modal>
        </div>
      </div>

    )
  }
}

const mapStateToProps = (store) => ({
  addressResults: addressSelectors.getShippingAddressResults(store),
  defaultAddr: addressSelectors.getDefaultAddress(store),
  // getAddrById: selectors.getAddrById(store),
  vaultResults: vaultSelectors.getCardResults(store),
  defaultCard: vaultSelectors.getDefaultCard(store),
  getInstantCheckoutdata: selectors.getInstantCheckoutResData(store),
  paymentModesData: paymentSelector.getPaymentModesData(store),
  profileInfo: camSelectors.getUserInfo(store),
  showLoading: selectors.showLoading(store),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      doInstantCheckout: actionCreators.doInstantCheckout,
      getShippingAddressResults: addressActionCreators.getShippingAddressResults,
      sendNewAddressDetails: addressActionCreators.sendNewAddressDetails,
      makeDefaultAddress: addressActionCreators.makeDefaultAddress,
      getCardResults: vaultActionCreators.getCardResults,
      addCard: vaultActionCreators.addCard,
      deleteCard: vaultActionCreators.deleteCard,
      makeCardDefault: vaultActionCreators.makeCardDefault,
      getUserProfileInfo: camActionCreators.getUserProfileInfo,
    },
    dispatch,
  );

InstantCheckout.propTypes = {

};

InstantCheckout.defaultProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(InstantCheckout);
