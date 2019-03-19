import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectors, actionCreators } from '../../../../store/order'
import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Order/includes/OrderIssueWidget/orderIssue');

const RenderRadioInput = ({paymentType,value,onCallBack}) => {
    return (
      <div>
        <label>
          <input
            type="radio"
            value={value}
            checked={paymentType === value}
            onChange={onCallBack}
          />
        {value}
        </label>
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
      paymentType:props.orderDetails.payments[0].payment_mode === 'PAY_ONLINE' ?
      'Online' : 'Wallet'
    }
  }
  onOptionChange(e) {

  }
  saveAndGoNext() {
    const { paymentType } = this.state
    const { orderIssue } = this.props
    const { selectedReasons } = orderIssue
    var refundType = paymentType === 'Online' ? 'BACK_TO_SOURCE' : 'WALLET'
    const orderReturnParams = Object.assign({},selectedReasons,{refund_mode:refundType})
    this.props.submitReturnRequest(orderReturnParams)
  }
  getPaymentModes(payment) {
    const { paymentType } = this.state
    var data = [ <RenderRadioInput
        key={'radio_1'}
        value='Wallet'
        onCallBack={this.onOptionChange}
        paymentType={paymentType}
        />
    ]

    if(paymentType === 'Online') {
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
     const { orderDetails } = this.props;
     const { paymentType } = this.state
    return (
      <div>
        {this.getPaymentModes(orderDetails.payments)}

        <div>
          <button
            onClick={this.saveAndGoNext}
            className={`${styles['fp-btn']} ${styles['fp-btn-primary']}`}
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
    orderDetails:selectors.getOrderInfo(store)
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators (
    {
      setReturnOrder:actionCreators.setReturnOrder,
      submitReturnRequest: actionCreators.submitReturnRequest
    },
    dispatch
  )
}

export default connect(mapStateToProps,mapDispatchToProps)(ChoosePaymentMode)
