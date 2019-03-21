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
    const { data, makeProcessRequest } = this.props;
    makeProcessRequest({
      payment_details: [{
        payment_mode: data.type,
      }]
    });
  }

  render() {
    const {props} = this;
    const { voucherData, isOnlyVocuher } = props;
    const { balance, amount_to_pay, currency_code, remaining_amount } = voucherData;
    return (
      <div className={`${styles['voucher']} ${styles['p-10']}`}>
        <div>Tila Credit Used</div>
        {
          isOnlyVocuher
            ?
              <div>All other payment methods have been disabled as you have enough tila credit in your Wallet to purchace this item. Enjoy your purchase :)</div>
            :
              null
        }
        <div className={`${styles['flex']} ${styles['justify-between']}`}> 
          <div>
            <div>Money in Wallet</div>
            <div>{balance} {currency_code}</div>
          </div>
          <div>
            <span>-</span>
          </div>
          <div>
            <div>Total Amount To Pay</div>
            <div>{amount_to_pay} {currency_code}</div>
          </div>
          <div>
            <span>=</span>
          </div>
          <div>
            <div>Remaining amount to pay</div>
            <div>{remaining_amount} {currency_code}</div>
          </div>
        </div>
        {
          isOnlyVocuher
            ?
              <div>
                <button onClick={this.proceedToPayment} className={`${styles['fp-btn-primary']} ${styles['fp-btn']}`}>PAY USING TILA CREDIT</button>
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
