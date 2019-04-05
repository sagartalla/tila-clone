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
    if (nextProps.processData && nextProps.processData.redirect_url) {
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
    const { props } = this;
    const { voucherData, isOnlyVocuher } = props;
    const { balance, total_amount, amount_to_pay, currency_code, remaining_amount } = voucherData;
    return (
      <div className={`${styles['voucher']} ${styles['p-10']}`}>
        <h3 className={`${styles['lgt-blue']} ${styles['fs-20']} ${styles['pb-10']} ${styles['fontW300']} ${styles['m-0']}`}>Tila Credit Used</h3>
        {
          isOnlyVocuher
            ?
            <div>All other payment methods have been disabled as you have enough tila credit in your Wallet to purchace this item. Enjoy your purchase :)</div>
            :
            null
        }
        <div className={`${styles.flex} ${styles['justify-between']}`}>
          <div className={`${styles.paymentBorder}`}>
            <span className={`${styles['success-green']} ${styles['fs-12']}`}>Total Amount To Pay</span>
            <b className={`${styles['pt-5']} ${styles['fs-16']}`}>{total_amount} {currency_code}</b>
          </div>
          <div className={`${styles.flex} ${styles['align-center']} ${styles['thick-red-clr']}`}>
            <span>-</span>
          </div>
          <div className={`${styles.paymentBorder}`}>
            <span className={balance < amount_to_pay ? `${styles['thick-red-clr']} ${styles['fs-12']}` : `${styles['success-green']} ${styles['fs-12']}`}>Money in Wallet</span>
            <b className={`${styles['pt-5']} ${styles['fs-16']}`}>{balance} {currency_code}</b>
          </div>
          <div className={`${styles.flex} ${styles['align-center']}`}>
            <span>=</span>
          </div>
          <div className={`${styles.paymentBorder}`}>
            <span className={balance >= amount_to_pay ? `${styles['success-green']} ${styles['fs-12']}` : `${styles['thick-red-clr']} ${styles['fs-12']}`}>Remaining amount to pay</span>
            <b className={`${styles['pt-5']} ${styles['fs-16']}`}>{remaining_amount} {currency_code}</b>
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
