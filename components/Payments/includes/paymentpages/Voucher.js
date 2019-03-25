import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators, selectors } from '../../../../store/payments';

import { languageDefinations } from '../../../../utils/lang/';

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Payments/payment');
const { PAYMENT_PAGE } = languageDefinations();


class Voucher extends Component {
  constructor(props) {
    super(props);
    this.proceedToPayment = this.proceedToPayment.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.processData && nextProps.processData.redirect_url) {
        window.location = nextProps.processData.redirect_url;
    }
  }

  proceedToPayment() {
    const { voucherData, makeProcessRequest } = this.props;
    makeProcessRequest({
      payment_details: [{
        payment_mode: voucherData.type,
      }]
    });
  }

  render() {
    const {props} = this;
    const { voucherData, isOnlyVocuher } = props;
    const { balance, amount_to_pay, currency_code, remaining_amount } = voucherData;
    return (
      <div className={`${styles['voucher']} ${styles['p-10']}`}>
        <div className={`${styles['lgt-blue']} ${styles['fs-16']} ${styles['p-5']}`}>Tila Credit Used</div>
        {
          isOnlyVocuher
            ?
              <div>All other payment methods have been disabled as you have enough tila credit in your Wallet to purchace this item. Enjoy your purchase :)</div>
            :
              null
        }
        <div className={`${styles.flex} ${styles['justify-between']}`}>
         <div className={`${styles.paymentBorder}`}>
            <div className={`${styles['success-green']}`}>Total Amount To Pay</div>
            <b>{amount_to_pay} {currency_code}</b>
          </div>
          <div className={`${styles.flex} ${styles['align-center']} ${styles['thick-red-clr']}`}>
            <span>-</span>
          </div>
          <div className={`${styles.paymentBorder}`}>
        <div className={balance < amount_to_pay ? `${styles['thick-red-clr']}` : `${styles['success-green']}`}>Money in Wallet</div>
            <b>{balance} {currency_code}</b>
          </div>
          <div className={`${styles.flex} ${styles['align-center']}`}>
            <span>=</span>
          </div>
          <div className={`${styles.paymentBorder}`}>
            <div className={balance >= amount_to_pay ? `${styles['success-green']}` : `${styles['thick-red-clr']}`}>Remaining amount to pay</div>
            <b>{remaining_amount} {currency_code}</b>
          </div>
         
        </div>
        {
          isOnlyVocuher
            ?
              <div>
                <button onClick={this.proceedToPayment} className={`${styles['fp-btn-primary']} ${styles['fp-btn']} ${styles['border-radius']}`}>PAY USING TILA CREDIT</button>
              </div>
            :
             null
        }

      </div>
    )
  }
}

const mapStateToprops = (store) => ({
  processData: selectors.getProcessData(store)
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      makeProcessRequest: actionCreators.makeProcessRequest
    },
    dispatch,
  );


export default connect(mapStateToprops, mapDispatchToProps)(Voucher);
