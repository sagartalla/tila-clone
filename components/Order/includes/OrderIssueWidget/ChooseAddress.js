import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { selectors, actionCreators } from '../../../../store/order';
import { selectors as addressSelectors, actionCreators as addressActionCreators } from '../../../../store/cam/address';
import { languageDefinations } from '../../../../utils/lang'

import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from './orderIssue_en.styl';
import styles_ar from './orderIssue_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};


const { ORDER_PAGE } = languageDefinations()
class ChooseAddress extends Component {
  constructor(props) {
    super(props)
    this.state = {};
    this.saveAndgoToNextStep = this.saveAndgoToNextStep.bind(this);
    this.chooseAddress = this.chooseAddress.bind(this);
  }

  componentDidMount() {
    this.props.getOrderDetails({ orderId:this.props.orderIssue.orderId });
  }

  componentWillReceiveProps(nextProps) {
    // const { addresses } = nextProps;
    // if (!this.state.choosenAddress && addresses.length) {
    //   this.setState({
    //     choosenAddress: addresses[0].id
    //   })
    // }
  }

  chooseAddress(e) {
    this.setState({
      choosenAddress: e.target.value
    })
  }

  saveAndgoToNextStep() {
    //selectAddressForReturnExchange,
    //addresses
    const { goToNextStep, orderIssue } = this.props;
    if(orderIssue.issueType === 'CLAIMWARRANTY' || orderIssue.issueType === 'DAMAGEWARRANTY') {
      this.props.submitClaimWarranty(orderIssue.selectedReasons)
    }
    // selectAddressForReturnExchange({
    //   addressId: this.state.choosenAddress || addresses[0].id
    // });
    goToNextStep();
  }

  render() {
    const { addresses,orderDetails,orderIssue } = this.props;
    const { choosenAddress } = this.state;

    return (
      <div>
        <h4 className={`${styles['fs-20']} ${styles['fontW400']} ${styles['pb-15']}`}>{ORDER_PAGE.ADDRESS_PICKUP}</h4>
        <div key={orderDetails.address.address_id} className={`${styles['generic-radio']} ${styles['pb-10']}`}>
          <h4 className={`${styles['fs-16']} ${styles['fontW600']} ${styles['m-0']}`}>{orderDetails.address.first_name} {orderDetails.address.last_name}</h4>
          <div className={`${styles['fs-12']} ${styles['light-gry-clr']} ${styles['fontW300']}`}>{orderDetails.address.address_line_1}</div>
          <span className={`${styles['fs-14']} ${styles['fontW400']} ${styles['thick-gry-clr']}`}>{orderDetails.address.account_mobile_number}</span>
        </div>
        <div className={`${styles['widget-footer']} ${styles['pt-15']}`}>
          <button onClick={this.saveAndgoToNextStep} className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['retun-btn-part']}`} >{(orderIssue.issueType === 'CLAIMWARRANTY' || orderIssue.issueType === 'DAMAGEWARRANTY') ? 'Claim Warranty' : ORDER_PAGE.CONTINUE}</button>
        </div>
      </div>
    );
  }
}

ChooseAddress.propTypes = {
  selectAddressForReturnExchange: PropTypes.func.isRequired,
  goToNextStep: PropTypes.func.isRequired,
  addresses: PropTypes.array.isRequired,
}

const mapStateToProps = (store) => {
  return ({
    addresses: addressSelectors.getAddressWithNameAndPhone(store),
    orderDetails: selectors.getOrderInfo(store),
    orderIssue: selectors.getOrderIssue(store)
  })
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getShippingAddressResults: addressActionCreators.getShippingAddressResults,
      selectAddressForReturnExchange: actionCreators.selectAddressForReturnExchange,
      getOrderDetails:actionCreators.getOrderDetails,
      submitClaimWarranty:actionCreators.submitClaimWarranty,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseAddress);



// <input onChange={this.chooseAddress} id="return-item" className={styles['radio-btn']} name="exch-retrn-add" type="radio" value={orderDetails.address.address_id} checked={choosenAddress === address.id} />
// <label for="return-item" className={styles['pl-10']}>
// </label>
