import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import { Modal } from "react-router-modal";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators, selectors } from '../../../store/common/instantCheckout';
import { actionCreators as addressActionCreators, selectors as addressSelectors } from '../../../store/cam/address';
import { actionCreators as vaultActionCreators, selectors as vaultSelectors } from '../../../store/cam/userVault';

import ShippingAddress from '../../Cam/ShippingAddress';
import UserVault from '../../Cam/UserVault';

import AddrCard from './includes/AddrCard';
import VaultCard from './includes/VaultCard';
import CodCard from './includes/CodCard';

import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/common/InstantCheckout/instant');

class InstantCheckout extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showMiniAddress: false,
      showMiniValut: false,
      creditDebitCard: true,
      cod: false,
      cvv: '',
      cntryCode: '',
      phoneNumber: '',
    }

    this.updateCVV = this.updateCVV.bind(this);
    this.mobilehandler = this.mobilehandler.bind(this);
    this.codClickHandler = this.codClickHandler.bind(this);
    this.toggleMiniVault = this.toggleMiniVault.bind(this);
    this.cntryCodehandler = this.cntryCodehandler.bind(this);
    this.doInstantCheckout = this.doInstantCheckout.bind(this);
    this.toggleMiniAddress = this.toggleMiniAddress.bind(this);
    this.creditCardClickHandler = this.creditCardClickHandler.bind(this);
  }

  componentDidMount() {
    this.props.getShippingAddressResults();
    this.props.getCardResults();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.getInstantCheckoutdata && nextProps.getInstantCheckoutdata.redirect_url) {
      location.href = nextProps.getInstantCheckoutdata.redirect_url;
    }
  }

  toggleMiniAddress() {
    this.setState({ showMiniAddress: !this.state.showMiniAddress });
  }

  toggleMiniVault() {
    this.setState({ showMiniValut: !this.state.showMiniValut });
  }

  doInstantCheckout() {
    const { creditDebitCard, cvv, cntryCode, phoneNumber } = this.state;
    const { defaultCard, insnt_item_listing_id } = this.props;

    this.props.doInstantCheckout({
      "listing_ids": insnt_item_listing_id ? [insnt_item_listing_id] : [],
      "payment_mode": creditDebitCard ? "SAVED_CARD" : 'COD',
      "card_token": defaultCard[0].card_token,
      "cvv": cvv,
      "phone_number": phoneNumber ? cntryCode + ' ' + phoneNumber : ''
    });
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

  render() {
    const { addressResults, defaultAddr, vaultResults, defaultCard } = this.props;
    const { showMiniAddress, showMiniValut, creditDebitCard, cod } = this.state;
    return (
      <div>
        {
          addressResults.length > 0 && vaultResults.length > 0 ?
            <div className={`${styles['instant-checkout']} ${styles['p-10']}`}>
              <h4 className={`${styles['fontW600']} ${styles['mb-0']} ${styles['flex']}`}>Checkout with 1 click <span className={`${styles['checkout-quat']} ${styles['fs-12']} ${styles['flex-center']} ${styles['justify-around']}`}>?</span></h4>
              <p className={`${styles['fs-12']} ${styles['thick-gry-clr']}`}>With your preffered payment and delivery address</p>
              <div className={`${styles['flex']}`}>
                <span className={`${styles['fs-12']} ${styles['pr-30']}`}><input type="radio" name="pay_type" className={styles['radio-btn']} checked={creditDebitCard} onChange={this.creditCardClickHandler} /> Credit/ Debit Card</span>
                <span className={styles['fs-12']}><input type="radio" name="pay_type" className={styles['radio-btn']} checked={cod} onChange={this.codClickHandler} /> COD</span>
              </div>
              <div className={`${styles['border']} ${styles['border-radius2']} ${styles['bg-white']} ${styles['mt-10']}`}>
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
                          />
                          : null
                      }
                    </Fragment>
                    : null
                }
                {
                  defaultCard.length && creditDebitCard > 0 ?
                    <VaultCard
                      defaultCard={defaultCard}
                      updateCVV={this.updateCVV}
                      toggleMiniVault={this.toggleMiniVault}
                    />
                    : null
                }
                {
                  cod ?
                    <div className={`${styles['p-10-20']} ${styles['border-b']}`}>
                      <label>Mobile Number*</label>
                      <Row>
                        <Col md={4}>
                          <input type="text" placeholder="country code" onChange={this.cntryCodehandler} />
                        </Col>
                        <Col md={8}>
                          <input type="text" placeholder="Mobile No" onChange={this.mobilehandler} />
                        </Col>
                      </Row>
                    </div> : null
                }

                {/* <div className={`${styles['p-10-20']}`}>
                  <div className={styles['checkbox-material']}>
                    <input id="checkout-label" type="checkbox" />
                    <label for="checkout-label" className={`${styles['thick-gry-clr']} ${styles['fontW300']}`}> Don't call before delivery </label>
                  </div>
                </div> */}
              </div>
              <div className={`${styles['flex']} ${styles['justify-center']}`}>
                <button className={`${styles['fp-btn']} ${styles['fp-btn-sucess']} ${styles['fontW600']} ${styles['instant-btn']}`} onClick={this.doInstantCheckout}>INSTANT CHECKOUT</button>
              </div>

              {/* {
            showMiniAddress ?
              <Modal>
                <div>
                  <a onClick={this.toggleMiniAddress}>X</a>
                  <ShippingAddress
                    miniAddress={true}
                  />
                </div>
              </Modal>
              : null
          } */}

              {/* {
            showMiniValut ?
              <Modal>
                <div>
                  <a onClick={this.toggleMiniVault}>X</a>
                  <UserVault
                    miniVault={true}
                  />
                </div>
              </Modal>
              : null
          } */}

            </div >
            : null
        }
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
    },
    dispatch,
  );

InstantCheckout.propTypes = {

};

InstantCheckout.defaultProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(InstantCheckout);
