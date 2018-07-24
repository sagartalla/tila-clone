import React, { Component } from 'react';
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

  toggleMiniAddress() {
    this.setState({ showMiniAddress: !this.state.showMiniAddress });
  }

  toggleMiniVault() {
    this.setState({ showMiniValut: !this.state.showMiniValut });
  }

  doInstantCheckout() {
    const { creditDebitCard, cvv, cntryCode, phoneNumber } = this.state;
    const { defaultCard } = this.props;

    this.props.doInstantCheckout({
      "listing_ids": [],
      "payment_mode": creditDebitCard ? "SAVED_CARD" : 'COD',
      "card_token": defaultCard[0].card_token,
      "cvv": cvv,
      "phone_number": cntryCode + ' ' + phoneNumber
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
      <div className={`${styles['instant-checkout']} ${styles['p-10']}`}>
        <h4>Checkout with 1 click ?</h4>
        <p><small>With your preffered payment and delivery address</small></p>
        <div className={`${styles['flex']} ${styles['flx-space-bw']}`}>
          <span><input type="radio" name="pay_type" className={styles['radio-btn']} checked={creditDebitCard} onChange={this.creditCardClickHandler} /> Credit/ Debit Card</span>
          <span><input type="radio" name="pay_type" className={styles['radio-btn']} checked={cod} onChange={this.codClickHandler} /> COD</span>
        </div>
        <div className={`${styles['border']} ${styles['border-radius2']} ${styles['bg-white']} ${styles['mt-10']}`}>
          {
            defaultAddr.length > 0 ?
              <AddrCard
                defaultAddr={defaultAddr}
                toggleMiniAddress={this.toggleMiniAddress}
              />
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

          <div className={`${styles['p-10-20']}`}>
            <input type="checkbox" /> Don't call before delivery
          </div>
        </div>
        <div className={`${styles['flex']} ${styles['justify-center']}`}>
          <button className={`${styles['fp-btn']} ${styles['fp-btn-default']}`} style={{ width: '300px' }} onClick={this.doInstantCheckout}>INSTANT CHECKOUT</button>
        </div>

        {
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
        }

        {
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
        }

      </div >
    )
  }
}

const mapStateToProps = (store) => ({
  addressResults: addressSelectors.getShippingAddressResults(store),
  defaultAddr: addressSelectors.getDefaultAddress(store),
  // getAddrById: selectors.getAddrById(store),
  vaultResults: vaultSelectors.getCardResults(store),
  defaultCard: vaultSelectors.getDefaultCard(store),
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

