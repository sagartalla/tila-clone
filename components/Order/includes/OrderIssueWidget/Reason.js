import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SVGComponent from '../../../common/SVGComponet';
import { selectors, actionCreators } from '../../../../store/order';
import constants from '../../../../constants';

import ChooseVariant from './ChooseVariant';
import { languageDefinations } from '../../../../utils/lang';

import { ORDER_ISSUE_TYPES, ORDER_ISSUE_STEPS as STEPS } from '../../constants';

import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from './orderIssue_en.styl';
import styles_ar from './orderIssue_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};


const { ORDER_PAGE } = languageDefinations();
class Reason extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMode: ORDER_ISSUE_TYPES.RETURN === props.orderIssue.returnExchangeType ?
        'Return' : ORDER_ISSUE_TYPES.EXCHANGE ===  props.orderIssue.returnExchangeType ? 'Exchange' : 'Cancel',
      selectedVariant: [],
      displaySizeError: false
    };
    this.selectReason = this.selectReason.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.saveAndGoNext = this.saveAndGoNext.bind(this);
    this.selectSubReason = this.selectSubReason.bind(this);
    this.onOptionChange = this.onOptionChange.bind(this);
    this.selectedVariant = this.selectedVariant.bind(this);
    this.productNotAvailable = this.productNotAvailable.bind(this);
  }

  componentDidMount() {
    const orderId = {
      orderItemId: this.props.orderIssue.selectedItem.id,
    };
    let reasonType;
    switch(this.props.orderIssue.issueType) {
      case 'RETURN' :
        reasonType = 'return'
        break;
      case 'CANCEL' :
        reasonType = 'cancel'
        break;
      case 'EXCHANGE' :
        reasonType = 'exchange'
        break;
      default:
       reasonType = 'return'
    }
    this.props.getReasons(orderId,reasonType);
    this.props.getExchangeVariants(orderId);
    this.props.getOrderDetails({ orderId:this.props.orderIssue.orderId });
  }
  onOptionChange = (e) => {
    this.setState({
      selectedMode: e.currentTarget.value,
    });
  };
  getReplaceData = (exchangeVariant) => {
    const { query } = this.props;
    const findData = exchangeVariant.filter(el =>
      el.listing.variant_id === query.variantId &&
      el.listing.total_inventory_count > 0);

    if (findData.length > 0) {
      return [
        <div key='replace'>
          <input
            className={styles['radio-btn']}
            type="radio"
            value="Replace"
            checked={this.state.selectedMode === 'Replace'}
            onChange={this.onOptionChange}
          />
          <label className={styles['pl-10']}> Replace</label>
        </div>,
      ];
    }

    return [
      <div key='replace-disable'>
        <input type="radio" className={styles['radio-btn']} value="Replace" checked={false} disabled />
        <label className={styles['pl-10']}>Replace</label>
      </div>,
    ];
  };

  saveAndGoNext() {
    const { goToNextStep, setReason, query, orderIssue, orderDetails } = this.props;
    const { orderId, returnExchangeType, issueType } = orderIssue;
    const { reason, subReason, selectedVariant, comment, variantId, selectedMode } = this.state
    const params = {
      orderId,
      issueType: issueType,
      step: STEPS.CHOOSE_ADDRESS,
      returnExchangeType
    };

    setReason(this.state);

    const reasonParams = {
      reason,
      sub_reason: subReason,
      comments: comment,
      order_item_id: orderIssue.selectedItem.id,
      address_id: orderDetails.address.address_id
    }

    if (
      (selectedMode === 'Return' || selectedMode === 'Cancel')
    ) {
      this.props.setOrderIssueData(params);
      this.props.setAddressData(reasonParams)
      this.props.refundOptions(orderIssue.selectedItem.id)
      goToNextStep();
    }
    else if (
      this.state.selectedMode === 'Exchange'
    ) {
      if (this.state.selectedVariant.length <= 0) {
        this.setState({
          displaySizeError: true
        })
      }
      else {
        this.props.setExchangeOrder({
          comments: comment,
          reason,
          sub_reason: subReason,
          new_listing_id: selectedVariant[0].listing_id,
          variant_id: selectedVariant[0].variant_id,
          order_item_id: query.orderItemId
        })
        goToNextStep();
      }
    }
    else {
      let paramObject = Object.assign({},params,{issueType:'REPLACE'})
      this.props.setOrderIssueData(paramObject)
      this.props.setExchangeOrder({
        comments: comment,
        reason,
        sub_reason: subReason,
        new_listing_id: orderDetails.order_items[0].listing_id,
        variant_id: orderDetails.order_items[0].variant_id,
        order_item_id: query.orderItemId
      })
      goToNextStep();
    }

  }
  productNotAvailable() {
    this.setState({
      selectedMode: 'Return',
      selectedVariant: [],
      variantId: '',
      displaySizeError: false
    })
  }
  selectedVariant(listing) {
    this.setState({
      selectedVariant: [listing],
      displaySizeError: false
    })
  }
  selectReason(e) {
    this.setState({
      reason: e.target.value,
    });
  }

  selectSubReason(e) {
    this.setState({
      subReason: e.target.value,
    });
  }

  updateComment(e) {
    this.setState({
      comment: e.target.value,
    });
  }

  render() {
    const { orderIssue, loadingStatus, query } = this.props;
    const { selectedItem: itemData, reasons, returnExchangeType, issueType } = orderIssue;
    const { img, name } = itemData;
    const { selectedMode, displaySizeError } = this.state;
    const selectedReason = reasons.filter(reason => reason.name === this.state.reason)[0]
    const issueType_small = issueType.toLowerCase();
    console.log(issueType_small);
    return (
      <div className={`${styles['reason-item-main']} ${styles['width100']}`}>
        <h4 className={`${styles['fs-20']} ${styles['fontW300']} ${styles['ml-20']} ${styles['mr-20']}`}>{ORDER_PAGE.WHY_DO_YOU_WANT_TO} {issueType_small} {ORDER_PAGE.THIS_ITEM}</h4>
        {returnExchangeType ? null : (
          <div
            className={`${styles['flx-spacebw-alignc']} ${styles['pb-20']} ${
              styles['pt-20']
              } ${styles['ml-20']} ${styles['mr-20']} ${
              styles['reasons-item-wrap']
              }`}
          >
            <div
              className={`${styles['img-cont']} ${styles['flex-center']} ${
                styles['justify-center']
                }`}
            >
              <img src={`${constants.mediaDomain}/${img}`} />
            </div>
            <div className={styles['title-cont']}>
              <span>{name}</span>
            </div>
          </div>
        )}
        <div className={`${styles['reason-cont']} ${styles['pb-15']} ${styles['ml-20']} ${styles['mr-20']}`}>
          <span className={`${styles['instruction-txt']} ${styles['pb-20']} ${styles['pt-20']} ${styles['flex']} ${styles['fs-12']} ${styles['google-clr']}`}>
            {issueType_small==='cancel' ? ORDER_PAGE.SELECT_CANCEL_REASON : (issueType_small==='return' ? ORDER_PAGE.SELECT_RETURN_REASON : ORDER_PAGE.SELECT_EXCHANGE_REASON)}
          </span>
          <div className={`${styles['dd-cont']}`}>
            <div className={`${styles.select} ${styles['mt-10']} ${styles['pb-10']}`}>
              <select
                className={styles['select-text']}
                required
                onChange={this.selectReason}
              >
                <option disabled selected>
                  {loadingStatus
                    ? ORDER_PAGE.LOADING
                    : ORDER_PAGE.SELECT_REASON}
                </option>
                {reasons.map(reason => (
                  <option key={reason.id} value={reason.name}>
                    {reason.name}
                  </option>
                ))}
              </select>
              <span className={styles['select-highlight']} />
              <span className={styles['select-bar']} />
            </div>
            {this.state.reason ? (
              <div
                className={`${styles.select} ${styles['mt-20']} ${
                  styles['mb-10']
                  }`}
              >
              { selectedReason.sub_reasons ?
                <select
                  className={styles['select-text']}
                  onChange={this.selectSubReason}
                >
                  <option disabled selected>
                    {loadingStatus
                      ? ORDER_PAGE.LOADING
                      : ORDER_PAGE.SELECT_SUB_REASON}
                  </option>
                  {_.map(
                    selectedReason.sub_reasons,
                    subReason => (
                      <option key={subReason.id} value={subReason.name}>
                        {subReason.name}
                      </option>
                    ),
                  )}
                </select>
                :
                null}
              </div>
            ) : null}
          </div>
          {returnExchangeType === ORDER_ISSUE_TYPES.EXCHANGE
            && orderIssue.exchangeVariants &&
            orderIssue.exchangeVariants.length > 0 ? (
              <ChooseVariant
                variantId={query.variantId}
                selectedVariant={this.selectedVariant}
                productNotAvailable={this.productNotAvailable}
              />
            ) : null}
          {displaySizeError ?
            <p>{ORDER_PAGE.PLEASE_SELECT_SIZE_TO_CONTINUE}</p> : null

          }
          {
            ORDER_ISSUE_TYPES.RETURN === returnExchangeType ?
              <div className={styles['comment-cont']}>
                <textarea
                  style={{ width: '410px' }}
                  onChange={this.updateComment}
                />
              </div> : null
          }
          <div className={`${styles['flex']} ${styles['align-center']}`}>
            {ORDER_ISSUE_TYPES.RETURN === returnExchangeType ? (
              <React.Fragment>
                <div className={`${styles['pt-10']} ${styles['pb-10']} ${styles['pr-20']}`}>
                  <input
                    className={styles['radio-btn']}
                    type="radio"
                    value="Return"
                    onChange={this.onOptionChange}
                    checked={
                      selectedMode === 'Return'
                    }
                  />
                  <label className={styles['pl-10']}>{ORDER_PAGE.RETURN}</label>
                </div>
                {orderIssue.exchangeVariants &&
                  orderIssue.exchangeVariants.length > 0 ? (
                    <div>{this.getReplaceData(orderIssue.exchangeVariants)}</div>
                  ) : null}
              </React.Fragment>
            ) : null}
          </div>
        </div>
        <div
          className={`${styles['widget-footer']} ${styles['flex-center']} ${
            styles['justify-center']
            }`}
        >
          <button
            onClick={this.saveAndGoNext}
            className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['retun-btn-part']}`}
            disabled={loadingStatus || !this.state.reason}
          >
            {`${selectedMode}`}
          </button>
        </div>
      </div>
    );
  }
}

Reason.propTypes = {
  orderIssue: PropTypes.object.isRequired,
  goToNextStep: PropTypes.func.isRequired,
  loadingStatus: PropTypes.bool.isRequired,
  setReason: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  orderIssue: selectors.getOrderIssue(store),
  loadingStatus: selectors.getLoadingStatus(store),
  orderDetails: selectors.getOrderInfo(store)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getReasons: actionCreators.getReasons,
      setReason: actionCreators.setReason,
      getExchangeVariants: actionCreators.getExchangeVariants,
      setOrderIssueData: actionCreators.setOrderIssueData,
      setExchangeOrder: actionCreators.setExchangeOrder,
      setAddressData: actionCreators.setAddressData,
      refundOptions:actionCreators.getRefundOptions,
      getOrderDetails:actionCreators.getOrderDetails
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Reason);
