import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectors, actionCreators } from '../../../../store/order';
import { languageDefinations } from '../../../../utils/lang';

import lang from '../../../../utils/language';

import styles_en from './orderIssue_en.styl';
import styles_ar from './orderIssue_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;


const { ORDER_PAGE } = languageDefinations();

const RenderRadioInput = ({ paymentType, value, onCallBack }) => {
  return (
    <div className={styles['pb-15']}>
      <input
        className={styles['radio-btn']}
        type="radio"
        value={value}
        checked={paymentType === value}
        onChange={onCallBack}
      />
      <label className={styles['pl-10']}>{value}</label>
    </div>
  )
}
class ChoosePaymentMode extends Component {
  constructor(props) {
    super(props)

    this.getPaymentModes = this.getPaymentModes.bind(this)
    this.onOptionChange = this.onOptionChange.bind(this)
    this.saveAndGoNext = this.saveAndGoNext.bind(this)
    this.state = {
      paymentType: Object.keys(props.orderIssue.refundOptions).length > 0 &&
                    props.orderIssue.refundOptions['RETURN'].indexOf("BACK_TO_SOURCE") !== -1
                    ? 'Online' : 'Wallet'
    }
  }
  onOptionChange(e) {
    this.setState({
      paymentType:e.currentTarget.value
    })
  }
  saveAndGoNext() {
    const { paymentType } = this.state
    const { orderIssue,goToNextStep } = this.props
    const { issueType } = orderIssue
    const { selectedReasons } = orderIssue
    var refundType = paymentType === 'Online' ? 'BACK_TO_SOURCE' : 'WALLET'
    const orderReturnParams = Object.assign({}, selectedReasons, { refund_mode: refundType })
    if(issueType === 'RETURN') {
      this.props.submitReturnRequest(orderReturnParams)
    }

    goToNextStep()
  }
  getPaymentModes(payment) {
    const { paymentType } = this.state
    const { orderIssue } = this.props;
    const { refundOptions } = orderIssue
    var data = [<RenderRadioInput
      key={'radio_1'}
      value='Wallet'
      onCallBack={this.onOptionChange}
      paymentType={paymentType}
    />
    ]

    if (Object.keys(refundOptions).length > 0
        && refundOptions['RETURN'].indexOf("BACK_TO_SOURCE") !== -1) {
      data.push(
        <RenderRadioInput
          key={'radio_2'}
          value='Online'
          onCallBack={this.onOptionChange}
          paymentType={paymentType}
        />
      )
    }

    return data;
  }
  render() {
    const { orderDetails, orderIssue } = this.props;
    console.log('orderdata',orderIssue);
    const { paymentType } = this.state;
    return (
      <div>
        <h4 className={`${styles['fs-20']} ${styles['fontW400']} ${styles['pb-15']}`}>{ORDER_PAGE.CHOOSE_YOUR_MODE_OF_PAYMENT}</h4>
        <div>
          {this.getPaymentModes(orderDetails.payments)}
        </div>
        <div>
          <button
            onClick={this.saveAndGoNext}
            className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['retun-btn-part']}`}
          >
            {`${paymentType} Transfer`}
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return ({
    orderIssue: selectors.getOrderIssue(store),
    orderDetails: selectors.getOrderInfo(store)
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setReturnOrder: actionCreators.setReturnOrder,
      submitReturnRequest: actionCreators.submitReturnRequest
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoosePaymentMode)
