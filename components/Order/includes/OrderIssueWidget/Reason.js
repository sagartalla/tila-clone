import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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


const { ORDER_PAGE, PAYMENT_PAGE } = languageDefinations();
class Reason extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMode: '',
      selectedVariant: [],
      displaySizeError: false,
      showError: true,
      agree_terms: false,
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
    const { query } = this.props;
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
      case 'CLAIMWARRANTY' :
        reasonType = 'claimWarranty'
        break;
      case 'DAMAGEWARRANTY' :
        reasonType = 'claimWarranty'
        break;
      default:
       reasonType = 'return'
    }

      reasonType === 'claimWarranty' ?
      this.props.getReasons(query.listingId,reasonType) : this.props.getReasons(orderId,reasonType);

      this.props.getExchangeVariants(orderId);
      this.props.getOrderDetails({ orderId:this.props.orderIssue.orderId });

  }

  componentWillReceiveProps(newProps) {
    this.setState({
      selectedMode: this.getSelectedMode(newProps.orderIssue.issueType),
    });
  }
  getSelectedMode(mode) {
    return {
      RETURN:'Refund',
      CANCEL:'Cancel',
      EXCHANGE:'Exchange',
      CLAIMWARRANTY:'Claim Warranty',
      DAMAGEWARRANTY:'Claim Warranty'
    }[mode]
  }
  onOptionChange = (e) => {
    this.setState({
      selectedMode: e.currentTarget.value,
    });
  };
  getReplaceData = (exchangeVariant) => {
    const { query } = this.props;
    const findData = exchangeVariant && exchangeVariant.filter(el =>
      el.listing !== null && (el && el.listing.variant_id === query.variantId &&
      el.listing.total_inventory_count > 0));

    if (findData.length > 0) {
      return [
        <div key='replace'>
          <input
            className={styles['radio-btn']}
            type="radio"
            value={ORDER_PAGE.REPLACE}
            checked={this.state.selectedMode === 'Replace'}
            onChange={this.onOptionChange}
          />
          <label className={styles['pl-10']}> {ORDER_PAGE.REPLACE}</label>
        </div>,
      ];
    }

    return [
      <div key='replace-disable'>
        <input type="radio" className={styles['radio-btn']} value={ORDER_PAGE.REPLACE} checked={false} disabled />
        <label className={styles['pl-10']}>{ORDER_PAGE.REPLACE}</label>
      </div>,
    ];
  };

  saveAndGoNext() {
    const { goToNextStep, setReason, query, orderIssue, orderDetails } = this.props;
    const { orderId, returnExchangeType, issueType, selectedItem} = orderIssue;
    const { reason, subReason, comment, selectedMode, selectedVariant } = this.state
    let listingObj = orderDetails && orderDetails.order_items && orderDetails.order_items.find((order) => order.order_item_ids[0] === selectedItem.id);
    const params = {
      orderId,
      issueType: issueType,
      step: STEPS.CHOOSE_ADDRESS,
      returnExchangeType
    };

    setReason(this.state);
    const warrantyReasonParams = {
      reason,
      comment,
      order_item_id: orderIssue.selectedItem.id,
      warranty_claim_type: issueType === 'CLAIMWARRANTY' ? 'NORMAL' : 'DAMAGED',
      address_id: orderDetails && orderDetails.address.address_id,

    }
    const reasonParams = {
      reason,
      sub_reason: subReason,
      comments: comment,
      order_item_id: orderIssue.selectedItem.id,
      address_id: orderDetails && orderDetails.address.address_id,
    }

    if (selectedMode === 'Refund') {
      const returnParam = Object.assign({}, params, { issueType: 'RETURN', returnExchangeType: 'RETURN' });
      this.props.setOrderIssueData(returnParam);
      this.props.setAddressData(reasonParams);
      this.props.refundOptions(orderIssue.selectedItem.id, ORDER_ISSUE_TYPES.RETURN);
      goToNextStep();
      } else if (selectedMode === 'Cancel') {
        this.props.setOrderIssueData(params);
        this.props.setAddressData(reasonParams);
        this.props.refundOptions(orderIssue.selectedItem.id, orderIssue.issueType);
        goToNextStep();
      }
      else if(selectedMode === 'Claim Warranty'){
        this.props.setAddressData(warrantyReasonParams);
        this.props.setOrderIssueData(params)
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
        const { listing_id, variant_id } = selectedVariant[0]
        this.props.setExchangeOrder({
          comments: comment,
          reason,
          sub_reason: subReason,
          new_listing_id: listing_id,
          variant_id: variant_id,
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
        new_listing_id: listingObj.listing_id,
        variant_id: listingObj.variant_id,
        order_item_id: query.orderItemId
      })
      goToNextStep();
    }

  }
  productNotAvailable(value) {
    this.setState({
      selectedMode: value ? 'Exchange' : 'Refund',
      selectedVariant: [],
      variantId: '',
      displaySizeError: false,
    });
  }
  selectedVariant(listing) {
    this.setState({
      selectedVariant: [listing],
      displaySizeError: false,
    });
  }
  selectReason(e) {
    this.setState({
      reason: e.target.value,
      showError: false,
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

  handleCheck = ({ target }) => {
    this.setState({
      [target.name]: target.checked,
    });
  }

  render() {
    const { orderIssue, loadingStatus, query } = this.props;
    const { selectedItem: itemData, reasons, returnExchangeType, issueType } = orderIssue;
    const { img, name } = itemData;
    const { selectedMode, displaySizeError, showError, agree_terms } = this.state;
    let reasonItems = (typeof reasons === 'object' && (!Array.isArray(reasons) && Object.keys(reasons).length > 0))  ? reasons.reasons  : reasons
    const selectedReason
     = reasonItems.filter(reason => reason.name === this.state.reason)[0]
    const issueType_small = issueType.toLowerCase();
    return (
      <div className={`${styles['reason-item-main']} ${styles['width100']}`}>
        <h4 className={`${styles['fs-20']} ${styles['fontW300']} ${styles['ml-20']} ${styles['mr-20']}`}>{(issueType === 'CLAIMWARRANTY' || issueType === 'DAMAGEWARRANTY') ? `${ORDER_PAGE.WHY_DO_YOU_WANT_TO} Claim Warranty` :  `${ORDER_PAGE.WHY_DO_YOU_WANT_TO} ${issueType_small} ${ORDER_PAGE.THIS_ITEM}`}</h4>
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
            {showError ? (issueType_small==='cancel' ? ORDER_PAGE.SELECT_CANCEL_REASON : (issueType_small==='return' ? ORDER_PAGE.SELECT_RETURN_REASON : ORDER_PAGE.SELECT_EXCHANGE_REASON)): ''}
          </span>
          <div className={`${styles['dd-cont']}`}>
            <div className={`${styles['ml-5']} ${styles['label-gry-clr']}`}>{ORDER_PAGE.SELECT_AN_OPTION}</div>
            <div className={`${styles.select} ${styles['mt-10']} ${styles['pb-10']}`}>
              <select
                className={styles['select-text']}
                required
                onChange={this.selectReason}
                defaultValue={"default"}
              >
                <option value="default" style={{ display: 'none' }}>
                  {loadingStatus
                    ? ORDER_PAGE.LOADING
                    : issueType_small==='cancel' ? ORDER_PAGE.SELECT_REASON_CANCEL : issueType_small==='return' ? ORDER_PAGE.SELECT_REASON_RETURN : ORDER_PAGE.SELECT_REASON_EXCHANGE}
                </option>
                {reasonItems.map((reason, index) => (
                  <option key={index} value={reason.name || reason}>
                    {reason.name || reason}
                  </option>
                ))}
              </select>
              <span className={styles['select-highlight']} />
              <span className={styles['select-bar']} />
            </div>
            { (this.state.reason && (selectedReason && selectedReason.sub_reasons))
               ? (
              <div
                className={`${styles.select} ${styles['mt-20']} ${
                  styles['mb-10']
                  }`}
              >
              { selectedReason.sub_reasons ?
                <select
                  className={styles['select-text']}
                  onChange={this.selectSubReason}
                  defaultValue={"default"}
                >
                  <option disabled value="default">
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
          {
            this.state.reason ?
            <div>
              {returnExchangeType === ORDER_ISSUE_TYPES.EXCHANGE
                && orderIssue.exchangeVariants &&
                orderIssue.exchangeVariants.length > 0 ? (
                  <ChooseVariant
                    variantId={query && query.variantId}
                    selectedVariant={this.selectedVariant}
                    productNotAvailable={this.productNotAvailable}
                  />
                ) : null}
              {displaySizeError ?
                <p className={`${styles['error-msg']}`}>{ORDER_PAGE.PLEASE_SELECT_SIZE_TO_CONTINUE}</p> : null

              }
              {
                ORDER_ISSUE_TYPES.RETURN === returnExchangeType
                || (issueType === 'CLAIMWARRANTY' || issueType === 'DAMAGEWARRANTY') ?
                  <div className={`${styles['comment-cont']} ${styles['mt-25']}`}>
                   <div className={`${styles['label-gry-clr']}`}>{ORDER_PAGE.ADD_COMMENT}</div>
                    {(issueType === 'CLAIMWARRANTY' || issueType === 'DAMAGEWARRANTY') &&
                      <span className={`${styles['fs-12']}`}>{ORDER_PAGE.WARRANTY_CLAIM_REASON}</span>
                    }
                    <textarea
                      className={`${styles.width100}`}
                      onChange={this.updateComment}
                    />
                  </div> : null
              }
              <>
              <div className={`${styles['flex']} ${styles['align-center']}`}>
                {ORDER_ISSUE_TYPES.RETURN === returnExchangeType ? (
                  <React.Fragment>
                    <div className={`${styles['pt-10']} ${styles['pb-10']} ${styles['pr-20']}`}>
                      <input
                        className={styles['radio-btn']}
                        type="radio"
                        value="Refund"
                        onChange={this.onOptionChange}
                        checked={
                          selectedMode === 'Refund'
                        }
                      />
                      <label className={styles['pl-10']}>{ORDER_PAGE.REFUND}</label>
                    </div>
                    {orderIssue.exchangeVariants &&
                      orderIssue.exchangeVariants.length > 0 ? (
                        <div>{this.getReplaceData(orderIssue.exchangeVariants)}</div>
                      ) : null}
                  </React.Fragment>
                ) : null}
              </div>
              {(selectedMode === 'Refund' || selectedMode === 'Replace' || selectedMode === 'Exchange') &&
              <React.Fragment>
              {/* <div className={`${styles['things-to-note']}`}>
              <div className={`${styles['fs-16']} ${styles.fontW600} ${styles['p-10']}`}>Things to Note</div>
              <div className={`${styles['fs-12']} ${styles['p-10']}`}>
              <div>
              • The products are in its original manufacturer box (retail packaging - sealed/closed box as applicable) and is not damaged or tampered in any condition. The seal of the product needs to be intact including all accessories / freebies received along with the order.
              </div>
              <div>
              • In case of Electronics Serial number should match
              </div>
              <div>
              • For clothing & other fashion products, the product needs to be unused placed in the original packaging with all the original tags/ labels attached to the product.
              </div>
              </div>
              </div> */}
              <div className={`${styles['pt-10']} ${styles['pb-10']}`}>
              <div className={`${styles['checkbox-material']} ${styles.flex} ${styles['p-0']}`}>
              <input id="deals-offers-reg" name="agree_terms" type="checkbox" onChange={this.handleCheck} checked={this.state.agree_terms} />
              <label htmlFor="deals-offers-reg">
                <span className={`${styles['light-gry-clr']} ${styles['fs-12']}`}><span>{PAYMENT_PAGE.AGREE_TO} <a href="/en/policy/user-terms" target="_blank" className={`${styles.fontW600}`}>{PAYMENT_PAGE.TERMS_AND_CONDITIONS}</a></span></span>
              </label>
            </div>
              </div>
              </React.Fragment>
              }
            <div
              className={`${styles['widget-footer']} ${styles['flex-center']} ${
                styles['justify-center']
                }`}
                >
              <button
                onClick={this.saveAndGoNext}
                className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['retun-btn-part']} ${styles['text-uppercase']}`}
                disabled={(selectedMode === 'Refund' || selectedMode === 'Replace' || selectedMode === 'Exchange') ? !agree_terms : (loadingStatus || !this.state.reason)}
              >
                {`${selectedMode}`}
              </button>
            </div>
            </>
          </div> : null
          }
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
      getOrderDetails:actionCreators.getOrderDetails,
      getWarrantyReason:actionCreators.getWarrantyReason,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Reason);
