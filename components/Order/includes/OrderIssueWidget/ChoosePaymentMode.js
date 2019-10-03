import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectors, actionCreators } from '../../../../store/order';
import { languageDefinations } from '../../../../utils/lang';

import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from './orderIssue_en.styl';
import styles_ar from './orderIssue_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};


const { ORDER_PAGE } = languageDefinations();

const RenderRadioInput = ({ paymentType, value, onCallBack, name }) => {
  return (
    <div className={styles['pb-15']}>
      <input
        className={styles['radio-btn']}
        type="radio"
        name={name}
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
    super(props);
    const { orderIssue } = props;
    this.getPaymentModes = this.getPaymentModes.bind(this);
    this.onOptionChange = this.onOptionChange.bind(this);
    this.saveAndGoNext = this.saveAndGoNext.bind(this);
    this.state = {
      paymentType: (orderIssue && orderIssue.refundOptions && orderIssue.refundOptions.refund_modes) ? orderIssue.refundOptions.refund_modes[0].display_name : '',
      paymentMode: (orderIssue && orderIssue.refundOptions && orderIssue.refundOptions.refund_modes) ? orderIssue.refundOptions.refund_modes[0].name : '',
    }
  }
  componentWillReceiveProps(nextProps) {
    const { orderIssue } = nextProps;
    let { paymentType } = this.state;
    if (orderIssue && orderIssue.refundOptions.refund_modes && orderIssue.refundOptions.refund_modes[0]) {
      this.setState({
        paymentType: orderIssue.refundOptions.refund_modes[0].display_name,
        paymentMode: orderIssue.refundOptions.refund_modes[0].name,
      });
    }
  }
  onOptionChange(e) {
    this.setState({
      paymentType: e.currentTarget.value,
      paymentMode: e.currentTarget.name,
    })
  }
  saveAndGoNext() {
    const { paymentMode } = this.state
    const { orderIssue,goToNextStep } = this.props
    const { issueType } = orderIssue
    const { selectedReasons } = orderIssue
    let refundType = paymentMode;
    const orderReturnParams = Object.assign({}, selectedReasons, { refund_mode: refundType })
    issueType === 'RETURN' ? this.props.submitReturnRequest(orderReturnParams) :
                              this.props.setCancelRefundMode(refundType)

    goToNextStep()
  }
  getPaymentModes(payment) {
    const { paymentType } = this.state;
    let data = [];
    const { orderIssue } = this.props;
    const { refundOptions } = orderIssue;
      refundOptions && refundOptions.refund_modes && refundOptions.refund_modes.length > 0 && refundOptions.refund_modes.map(options =>
        data.push(<RenderRadioInput
          key={'radio_1'}
          name={options.name}
          value={options.display_name}
          onCallBack={this.onOptionChange}
          paymentType={paymentType}
        />)
      )
      return data;
}
  render() {
    const { orderDetails, orderIssue, goToNextStep } = this.props;
    const { paymentType } = this.state;
    if (!(orderIssue &&  Object.keys(orderIssue.refundOptions).length > 0)) {
      return <div>{ORDER_PAGE.LOADING}</div>
    }
    if (!(orderIssue && orderIssue.refundOptions.refund_eligible) || (orderIssue && orderIssue.refundOptions && orderIssue.refundOptions.refund_modes && orderIssue.refundOptions.refund_modes[0] === 'NIL')) {
        goToNextStep();
        return null;
     }
    return (
      <div>
        <h4 className={`${styles['fs-20']} ${styles['fontW400']} ${styles['pb-15']}`}>{ORDER_PAGE.CHOOSE_YOUR_MODE_OF_PAYMENT}</h4>
        <div>
          {this.getPaymentModes(orderDetails.payments)}
        </div>
        <div>
          <button
            onClick={this.saveAndGoNext}
            className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['retun-btn-part']} ${styles['text-uppercase']}`}
          >
            {`${paymentType} ${ORDER_PAGE.TRANSFER}`}
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
      submitReturnRequest: actionCreators.submitReturnRequest,
      setCancelRefundMode:actionCreators.setCancelRefundMode
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoosePaymentMode)
