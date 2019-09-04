import React, { Component, Fragment, useState, useEffect } from 'react';
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
import dynamic from 'next/dynamic';
import ShippingAddress from '../../Cam/ShippingAddress';
import UserVault from '../../Cam/UserVault';
import { Modal } from 'react-bootstrap';
import Captcha from '../Captcha';
import CaptchaContent from '../Captcha/CaptchaContent';
//import EditPhone from '../../Cam/PersonelDetails/UserData/EditPhone';
import AddrCard from './includes/AddrCard';
import VaultCard from './includes/VaultCard';
import CodCard from './includes/CodCard';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './instant_en.styl';
import styles_ar from './instant_ar.styl';

const EditPhone = dynamic(import('../../Cam/PersonelDetails/UserData/EditPhone'));

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};


const { INSTANT_CHECKOUT, PAYMENT_PAGE, CONTACT_INFO_MODAL } = languageDefinations();

const cookies = new Cookies();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';
const TabPanel = ({value,index,children, ...other}) => {
  return (
    <div className={`${ value !== index ? `${styles['hideBlock']}` : `${styles['displayBlock']}`}`}>
      {children}
    </div>
  )
}
const Tab = ({ value, tabType, label,selected, name,onCallback }) => {
  const onInputChange = (e) => {
    if(onCallback) {
      onCallback(e, value)
    }
  }
  const renderTabType = () => {
    if(tabType === 'radioInput') {
      return (
        <div className={`${styles['fs-12']} ${styles['pr-30']}`}>
          <input
            type='radio'
            name={name}
            onChange={onInputChange}
            value={value}
            checked={selected}
            className={styles['radio-btn']}
          />
        <label>
          {label}
        </label>
        </div>
      )
    }
  }
  return (
    <div>
      {renderTabType()}
    </div>
  )
}
const Tabs = ({ children, onCallback,value }) => {
  let childIndex = 0;
  const childrenProp = React.Children.map(children, child => {
    if(!React.isValidElement(child)){
      return null
    }
    const childValue = child.props.value === undefined ? childIndex : child.props.value
    const selected = childValue === value

    childIndex += 1

    return React.cloneElement(child, {
      selected,
      onCallback,
      value:childValue
    })
  })
  return (
    <div className={`${styles['flex']} ${styles['pt-5']} ${styles['pb-5']}`}>
      {
        childrenProp
      }
    </div>
  )
}

const InstaCheckoutDetails = ({ details, selectedAddr,addressResults,showMiniAddress,isPdp,...props }) => {
 const [value,setValue] = useState(details.payment_options_available.length === 1 && details.payment_options_available[0].type === 'VOUCHER' ? 'VOUCHER' : 'SAVED_CARD');
 const getCheckValue = (data) => {
   let filteredData = data.payment_options_available.filter((item) => item.type === 'VOUCHER')
   if(filteredData.length > 0) {
      return filteredData[0].selected
   }

   return false

 }

 const [checkValue,setCheckValue] = useState(getCheckValue(details))

 const checkTilaCreditValue = (e) => {
   props.selectedTilaCredit(e.target.checked);
   setValue(e.target.checked ? ( details.payment_options_available.length === 1 && details.payment_options_available[0].type === 'VOUCHER' ? 'VOUCHER' : 'SAVED_CARD' ) : 'SAVED_CARD');
   return setCheckValue(e.target.checked);
 }
 const getCurrentTabValue = (e,value) => {

   return setValue(value)
 }
 const getTabPanelData = (data) => {
   let filteredData = data.payment_options_available;
   let savedCards = data.payment_options_available.filter((item) => {
     return item.type === 'SAVED_CARD'
   })[0] || {};
   savedCards = savedCards.cards_list;
   if(filteredData.length > 0) {
     return filteredData.map((item,index) => {
       return (
         <TabPanel value={value} index={item.type}>
           <div
             className={
               `${styles['border']}
                ${styles['border-radius2']}
                ${styles['bg-white']}
                ${styles['relative']}
                ${styles['mt-10']}`}
              >
             {
               selectedAddr && selectedAddr.address_id ?
                 <Fragment>
                   <AddrCard
                     selectedAddr={selectedAddr}
                     addressResults={addressResults}
                     toggleMiniAddress={props.toggleMiniAddress}
                   />
                   {
                     showMiniAddress ?
                       <ShippingAddress
                         miniAddress
                         isPdp={isPdp}
                         // isFromCart={isFromCart}
                         toggleMiniAddress={props.toggleMiniAddress}
                       />
                       : null
                   }
                 </Fragment>
                 : null
             }
             {
               (item.type === 'SAVED_CARD' || item.type === 'VOUCHER') && savedCards && savedCards.length > 0 ?
                 <Fragment>
                   <VaultCard
                     defaultCard={props.getSelectedCard[0]}
                     updateCVV={props.updateCVV}
                     vaultResults={savedCards}
                     toggleMiniVault={props.toggleMiniVault}
                   />
                   {
                     props.showMiniVault ?
                       <div>
                         <UserVault
                           miniVault
                           toggleMiniVault={props.toggleMiniVault}
                           isInstantCheckout
                         />
                       </div>
                       : null
                   }
                 </Fragment>
                 : null
             }
             {
               item.type !== 'CASH_ON_DELIVERY' ?
               <div
                 className={`${styles['flex']} ${styles['justify-center']}`}
               >
                 <Button
                   className={`${styles['fp-btn']} ${styles['fp-btn-sucess']} ${styles['fontW600']} ${styles['instant-btn']}`}
                   onClick={props.doInstantCheckout}
                   btnText={INSTANT_CHECKOUT.INSTANT_CHECKOUT}
                   showImage="icons/common-icon/instant-checkout"
                 />
              </div> : null
             }
             {
               item.type === 'CASH_ON_DELIVERY' ?
                   <div className={styles['p-10']}>
                     <div className={styles['checkbox-material']}>
                       <input
                         id="pay-delivery"
                         type="checkbox"
                         onChange={props.handleChange}
                         checked={props.checked}
                       />
                       <label htmlFor="pay-delivery" className={`${styles['fs-12']} ${styles['fw300']} ${styles['pl-10']} ${styles['pr-10']}`}>{INSTANT_CHECKOUT.AGREE_CASH_ON_DELIVERY}</label>
                     </div>
                   </div>
                   : null
             }
           </div>

         </TabPanel>
       )
     })
   } else {
     return null;
   }

 }

 
 const getTilaCredit = (data) => {
   let filteredData = data.payment_options_available.filter((item) => {
     return item.type === 'VOUCHER'
   })

   if(filteredData.length > 0) {
     return (
       <div>
         <input
            type='checkbox'
            name={filteredData[0].display_name}
            value={filteredData[0].remaining_amount.display_value}
            checked={checkValue}
            onChange={checkTilaCreditValue}
          />
        <label>
          {`Wallet Balance Used (${filteredData[0].amount_to_pay.currency_code} ${filteredData[0].amount_to_pay.display_value})`}
        </label>
       </div>
     )
   }
 }
 const getCheckoutInformation = (data) => {
   let filteredData = data.payment_options_available.filter((item) => {
     return item.type !== 'VOUCHER'
   })
   if(filteredData.length > 0) {
     return (
       <Tabs value={value} onCallback={getCurrentTabValue}>
          {
              filteredData.map((item,index) => {
                return (
                  <Tab
                    label={`${item.type === 'SAVED_CARD' ? 'Credit/Debit Card' : 'COD'}`}
                    value={item.type}
                    name={item.type}
                    tabType={item.type === 'VOUCHER' ? 'checkbox' : 'radioInput'}
                  />
                )
              })
          }
       </Tabs>
     )
   } else {
     return null
   }

 }
  return (
    <div>
      {getTilaCredit(details)}
      {getCheckoutInformation(details)}
      <div>
        {getTabPanelData(details)}
      </div>
    </div>
  )
}


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
      btnLoader: false,
      iframe_url: '',
      isIframeLoaded:false,
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
    this.selectedTilaCredit = this.selectedTilaCredit.bind(this)
    this.hideIframe = this.hideIframe.bind(this)
  }

  componentDidMount() {
    this.props.getShippingAddressResults();
    //this.props.getCardResults();
    const { currency, moneyValue } = this.props;
    let params = {
      amount:{
        currency_code:currency,
        money_value:moneyValue
      },
      use_wallet:true
    }
    this.props.getCheckoutOptions(params)
    this.props.getUserProfileInfo();
  }
  hideIframe() {
    this.setState({
      isIframeLoaded:false
    })

  }
  selectedTilaCredit(value){
    const { currency, moneyValue,getCardDetails } = this.props;
    let params = {
      amount:{
        currency_code:currency,
        money_value:moneyValue
      },
      transaction_id:getCardDetails.transaction_id,
      use_wallet:value
    }
    this.props.getCheckoutOptions(params)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.getInstantCheckoutdata && nextProps.getInstantCheckoutdata.redirect_url) {
      location.href = nextProps.getInstantCheckoutdata.redirect_url;
    }
    if(nextProps.getInstantCheckoutdata && nextProps.getInstantCheckoutdata.iframe_url) {
      this.setState({ iframe_url:nextProps.getInstantCheckoutdata.iframe_url,isIframeLoaded: true })
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
    this.getNewFilteredResult();
  }
  toggleMiniAddress() {
    this.setState({ showMiniAddress: !this.state.showMiniAddress, showMiniVault: false });
    this.props.changeState();
  }

  toggleMiniVault() {
    this.setState({ showMiniVault: !this.state.showMiniVault, showMiniAddress: false });
  }
  afterSuccessOtpVerification() {
    this.setState({
      nextStep: 'checkoutBtn'
    })
  }

getNewFilteredResult = () => {
  const { getCardDetails } = this.props;
  let newFilteredData = getCardDetails.payment_options_available.filter((item) => item.type === 'VOUCHER');
  this.setState({
    newFilteredData: newFilteredData[0].amount_to_pay,
    walletSelected: newFilteredData[0].selected,
  })
 }

  doInstantCheckout() {
    const {
      creditDebitCard, cntryCode, phoneNumber,
    } = this.state;
    const { defaultCard, insnt_item_listing_id, doInstantCheckout, getCardDetails, getSelectedCard, details } = this.props;
    const { transaction_id, payment_options_available } = getCardDetails;

    const params = {
      listing_ids: insnt_item_listing_id ? [insnt_item_listing_id] : [],
      payment_mode: (payment_options_available.length === 1 && payment_options_available[0].type === 'VOUCHER') ? 'VOUCHER' : (creditDebitCard ? 'SAVED_CARD' : 'CASH_ON_DELIVERY'),
      redirect_url: `${window.location.origin}/${language}`,
      transaction_id
    };

    if (!(payment_options_available.length === 1 && payment_options_available[0].type === 'VOUCHER') && creditDebitCard) {
      params.card_token = getSelectedCard[0].card_token;
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
    const { doInstantCheckout, insnt_item_listing_id,getCardDetails } = this.props
    const { transaction_id } = getCardDetails;
    const params = {
      listing_ids: insnt_item_listing_id ? [insnt_item_listing_id] : [],
      payment_mode: 'CASH_ON_DELIVERY',
      redirect_url: `${window.location.origin}/${language}`,
      request_id: this.state.captcha_request_id,
      transaction_id,
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
      // isFromCart,
      selectedAddr,
      moneyValue,
      getCardDetails,
      getSelectedCard,
      details,
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
      iframe_url,
      newFilteredData,
      walletSelected,
    } = this.state;

    return (
      <div className={`${styles['instant-checkout']} ${styles['p-10']}`}>
        {
          iframe_url ? 
            {
              true:<iframe sandbox="allow-forms allow-modals allow-popups-to-escape-sandbox allow-popups allow-scripts allow-top-navigation allow-same-origin" src={iframe_url} style={{ height: '426px', width: '500px', border: '0' }} class="h-200 desktop:h-376 w-full"></iframe>,
              false:<Modal
                show={this.state.isIframeLoaded}
                onHide={this.hideIframe}
                dialogClassName="custom-modal"
              >
              <Modal.Body>
                <iframe sandbox="allow-forms allow-modals allow-popups-to-escape-sandbox allow-popups allow-scripts allow-top-navigation allow-same-origin" src={iframe_url} style={{ height: '426px', width: '500px', border: '0' }} class="h-200 desktop:h-376 w-full"></iframe>
              </Modal.Body>
            </Modal>,
            }[isPdp]
          :
          <div className={`${styles['pr-10']} ${styles['pl-10']}`}>
             {
               showBlocker ?
                 <div className={styles['blocker']}>

                 </div>
                 : ''
             }
             {
               Object.keys(getCardDetails).length > 0 ?
               <InstaCheckoutDetails
                 details={getCardDetails}
                 selectedAddr={selectedAddr}
                 toggleMiniAddress={this.toggleMiniAddress}
                 showMiniAddress={showMiniAddress}
                 isPdp={isPdp}
                 updateCVV={this.updateCVV}
                 vaultResults={vaultResults}
                 toggleMiniVault={this.toggleMiniVault}
                 showMiniVault={showMiniVault}
                 doInstantCheckout={this.doInstantCheckout}
                 addressResults={addressResults}
                 checked={checked}
                 handleChange={this.handleChange}
                 selectedTilaCredit={this.selectedTilaCredit}
                 getSelectedCard={getSelectedCard}
               /> : null
             }
           </div>

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
                      txnId={getCardDetails.transaction_id}
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
                          btnText={walletSelected ? PAYMENT_PAGE.PAY + ' ' + (totalPrice - newFilteredData.display_value) + ' ' + currency + ' ' + PAYMENT_PAGE.ON_DELIVERY : PAYMENT_PAGE.PAY + ' ' + totalPrice + ' ' + currency + ' ' + PAYMENT_PAGE.ON_DELIVERY}
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
  selectedAddr: addressSelectors.getSelectedAddress(store),
  // getAddrById: selectors.getAddrById(store),
  vaultResults: vaultSelectors.getCardResults(store),
  defaultCard: vaultSelectors.getDefaultCard(store),
  getInstantCheckoutdata: selectors.getInstantCheckoutResData(store),
  paymentModesData: paymentSelector.getPaymentModesData(store),
  profileInfo: camSelectors.getUserInfo(store),
  showLoading: selectors.showLoading(store),
  getCardDetails: vaultSelectors.getCardDetails(store),
  getSelectedCard:vaultSelectors.getSelectedCard(store),
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
      getCheckoutOptions:vaultActionCreators.getCheckoutOptions,
      makeCardDefault: vaultActionCreators.makeCardDefault,
      getUserProfileInfo: camActionCreators.getUserProfileInfo,
      changeState: addressActionCreators.changeState,
    },
    dispatch,
  );

InstantCheckout.propTypes = {

};

InstantCheckout.defaultProps = {
  isPdp:false
};

export default connect(mapStateToProps, mapDispatchToProps)(InstantCheckout);


// {
//   selectedAddr && selectedAddr.address_id && defaultCard.length > 0 ?
//     <div className={`${styles['instant-checkout']} ${styles['p-10']}`}>
//       <div className={`${styles['pr-10']} ${styles['pl-10']}`}>
//         {
//           showBlocker ?
//             <div className={styles['blocker']}>
//
//             </div>
//             : ''
//         }
//         <React.Fragment>
//         <h4 className={`${styles['fontW600']} ${styles['mb-0']} ${styles['flex']}`}>
//           {INSTANT_CHECKOUT.CHECKOUT_WITH_ONE_CLICK}
//           {/* <span className={`${styles['checkout-quat']} ${styles['fs-12']} ${styles['flex-center']} ${styles['justify-around']}`}>?</span> */}
//         </h4>
//         <p className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['mb-5']}`}>{INSTANT_CHECKOUT.WITH_YOUR_PREFERRED_PAYMENT}</p>
//         <div className={`${styles['flex']} ${styles['pt-5']} ${styles['pb-5']}`}>
//           <span className={`${styles['fs-12']} ${styles['pr-30']}`}><input type="radio" name="pay_type" className={styles['radio-btn']} checked={creditDebitCard} onChange={this.creditCardClickHandler} /> {INSTANT_CHECKOUT.CREDIT_DEDIT}</span>
//           <span className={styles['fs-12']}><input type="radio" name="pay_type" className={styles['radio-btn']} checked={cod} onChange={this.codClickHandler} /> {INSTANT_CHECKOUT.COD}</span>
//         </div>
//         </React.Fragment>
//         <div className={`${styles['border']} ${styles['border-radius2']} ${styles['bg-white']} ${styles['relative']} ${styles['mt-10']}`}>
//           {
//             selectedAddr && selectedAddr.address_id ?
//               <Fragment>
//                 <AddrCard
//                   selectedAddr={selectedAddr}
//                   addressResults={addressResults}
//                   toggleMiniAddress={this.toggleMiniAddress}
//                 />
//                 {
//                   showMiniAddress ?
//                     <ShippingAddress
//                       miniAddress={true}
//                       isPdp={isPdp}
//                       // isFromCart={isFromCart}
//                       toggleMiniAddress={this.toggleMiniAddress}
//                     />
//                     : null
//                 }
//               </Fragment>
//               : null
//           }
//           {
//             defaultCard.length && creditDebitCard > 0 ?
//               <Fragment>
//                 <VaultCard
//                   defaultCard={defaultCard}
//                   updateCVV={this.updateCVV}
//                   vaultResults={vaultResults}
//                   toggleMiniVault={this.toggleMiniVault}
//                 />
//                 {
//                   showMiniVault ?
//                     <div>
//                       <UserVault
//                         miniVault={true}
//                         toggleMiniVault={this.toggleMiniVault}
//                       />
//                     </div>
//                     : null
//                 }
//               </Fragment>
//               : null
//           }
//           {
//             cod ?
//               <div className={styles['p-10']}>
//                 <div className={styles['checkbox-material']}>
//                   <input
//                     id="pay-delivery"
//                     type="checkbox"
//                     onChange={this.handleChange}
//                     checked={this.state.checked}
//                   />
//                   <label htmlFor="pay-delivery" className={`${styles['fs-12']} ${styles['fw300']} ${styles['pl-10']} ${styles['pr-10']}`}>{INSTANT_CHECKOUT.AGREE_CASH_ON_DELIVERY}</label>
//                 </div>
//               </div>
//               : null
//           }
//           {
//             /* <div className={`${styles['p-10-20']}`}>
//             <div className={styles['checkbox-material']}>
//             <input id="checkout-label" type="checkbox" />
//             <label for="checkout-label" className={`${styles['thick-gry-clr']} ${styles['fontW300']}`}> Don't call before delivery </label>
//             </div>
//             </div>
//             */
//           }
//         </div>
//         {!cod &&
//           <div
//             className={`${styles['flex']} ${styles['justify-center']}`}
//           >
//             <Button
//               className={`${styles['fp-btn']} ${styles['fp-btn-sucess']} ${styles['fontW600']} ${styles['instant-btn']}`}
//               onClick={this.doInstantCheckout}
//               btnText={INSTANT_CHECKOUT.INSTANT_CHECKOUT}
//               showImage="icons/common-icon/instant-checkout"
//               btnLoading={showLoading}
//             />
//           </div>}
//       </div>
//     </div>
//      : null
// }
