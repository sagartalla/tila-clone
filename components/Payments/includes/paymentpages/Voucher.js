import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators, selectors } from '../../../../store/payments';

import { languageDefinations } from '../../../../utils/lang/';

import lang from '../../../../utils/language';
import { Router } from '../../../../routes';
import Button from '../../../common/CommonButton';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../../payment_en.styl';
import styles_ar from '../../payment_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const { PAYMENT_PAGE } = languageDefinations();


class Voucher extends Component {
  constructor(props) {
    super(props);
    this.proceedToPayment = this.proceedToPayment.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.processData && nextProps.processData.redirect_url) {
      Router.pushRoute(nextProps.processData.redirect_url);
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
    const { voucherData, isOnlyVocuher, btnLoading } = props;
    const { balance, total_amount, amount_to_pay, currency_code, remaining_amount } = voucherData;
    return (
      <div className={`${styles['voucher']} ${styles['p-10']}`}>
        <h3 className={`${styles['lgt-blue']} ${styles['fs-20']} ${styles['pb-10']} ${styles['fontW300']} ${styles['m-0']}`}>{PAYMENT_PAGE.TILA_CREDIT_USED}</h3>
        {
          isOnlyVocuher
            ?
            <div className={`${styles['pb-15']} ${styles['fs-14']}`}>{PAYMENT_PAGE.ALL_OTHER_PAYMENT_METHODS_ARE_DISABLED} :)</div>
            :
            null
        }
        <div className={`${styles.flex} ${styles['justify-between']}`}>
          <div className={`${styles.paymentBorder}`}>
            <span className={`${styles['success-green']} ${styles['fs-12']}`}>{PAYMENT_PAGE.TOTAL_AMOUNT_TO_PAY}</span>
            <b className={`${styles['pt-5']} ${styles['fs-16']}`}>{total_amount.display_value} {total_amount.currency_code}</b>
          </div>
          <div className={`${styles.flex} ${styles['align-center']} ${styles['thick-red-clr']}`}>
            <span>-</span>
          </div>
          <div className={`${styles.paymentBorder}`}>
            <span className={balance.money_value < amount_to_pay.money_value ? `${styles['thick-red-clr']} ${styles['fs-12']}` : `${styles['success-green']} ${styles['fs-12']}`}>{PAYMENT_PAGE.MONEY_IN_WALLET}</span>
            <b className={`${styles['pt-5']} ${styles['fs-16']}`}>{balance.display_value} {balance.currency_code}</b>
          </div>
          <div className={`${styles.flex} ${styles['align-center']}`}>
            <span>=</span>
          </div>
          <div className={`${styles.paymentBorder}`}>
            <span className={balance.money_value >= amount_to_pay.money_value ? `${styles['success-green']} ${styles['fs-12']}` : `${styles['thick-red-clr']} ${styles['fs-12']}`}>{PAYMENT_PAGE.REMAINING_AMOUNT_TO_PAY}</span>
            <b className={`${styles['pt-5']} ${styles['fs-16']}`}>{remaining_amount.display_value} {remaining_amount.currency_code}</b>
          </div>

        </div>
        {
          isOnlyVocuher
            ?
            <div className={styles['mt-20']}>
            <Button
                className={`${styles.flex} ${styles.width33} ${styles['border-radius']} ${styles.fontW600} ${styles['text-uppercase']}`}
                onClick={this.proceedToPayment}
                btnLoading={btnLoading}
                btnText={PAYMENT_PAGE.PAY_USING_TILA_CREDIT}
            />
            </div>
            :
            null
        }

      </div>
    )
  }
}

const mapStateToprops = (store) => ({
  processData: selectors.getProcessData(store),
  btnLoading: selectors.getLoader(store),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      makeProcessRequest: actionCreators.makeProcessRequest
    },
    dispatch,
  );


export default connect(mapStateToprops, mapDispatchToProps)(Voucher);
