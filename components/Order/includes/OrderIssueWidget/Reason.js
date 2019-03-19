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

import { mergeCss } from '../../../../utils/cssUtil';

const styles = mergeCss('components/Order/includes/OrderIssueWidget/orderIssue');
const { ORDER_PAGE } = languageDefinations();
class Reason extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMode: ORDER_ISSUE_TYPES.RETURN === props.orderIssue.returnExchangeType ?
      'Return' : 'Exchange',
      selectedVariant:[],
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
    this.props.getReasons(orderId);
    this.props.getExchangeVariants(orderId);
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
        <div>
          <label>
            <input
              type="radio"
              value="Replace"
              checked={this.state.selectedMode === 'Replace'}
              onChange={this.onOptionChange}
            />
            Replace
          </label>
        </div>,
      ];
    }

    return [
      <div>
        <label>
          <input type="radio" value="Replace" checked={false} disabled />
          Replace
        </label>
      </div>,
    ];
  };

  saveAndGoNext() {
    const { goToNextStep, setReason, query, orderDetails } = this.props;
    const { orderId, returnExchangeType } = query;
    const {reason,subReason,selectedVariant,comment,variantId} = this.state
    const params = {
      orderId,
      issueType: ORDER_ISSUE_TYPES.RETURN,
      step: STEPS.CHOOSE_ADDRESS,
      returnExchangeType
    };

    setReason(this.state);

    const reasonParams = {
      reason,
      sub_reason:subReason,
      comments:comment,
      order_item_id:query.orderItemId,
      address_id:orderDetails.address.address_id
    }

    if (
      this.state.selectedMode === 'Return' &&
      (ORDER_ISSUE_TYPES.RETURN === 'RETURN' ||
      ORDER_ISSUE_TYPES.EXCHANGE === 'EXCHANGE')
    ) {
      this.props.setOrderIssueData(params);
      this.props.setAddressData(reasonParams)
      goToNextStep();
    }
    else if (
      this.state.selectedMode === 'Exchange' &&
      ORDER_ISSUE_TYPES.EXCHANGE === 'EXCHANGE'
    ) {
      if(this.state.selectedVariant.length <= 0){
        this.setState({
          displaySizeError:true
        })
      }
      else {
        this.props.setExchangeOrder({
          comments:comment,
          reason,
          sub_reason : subReason,
          new_listing_id:selectedVariant[0].listing_id,
          variant_id:selectedVariant[0].variant_id,
          order_item_id:query.orderItemId
        })
        goToNextStep();
      }
    }
    else {
      goToNextStep();
    }

  }
  productNotAvailable() {
    this.setState({
      selectedMode:'Return',
      selectedVariant:[],
      variantId:'',
      displaySizeError:false
    })
  }
  selectedVariant(listing) {
    this.setState({
      selectedVariant:[listing],
      displaySizeError:false
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
    const { orderIssue, loadingStatus,query } = this.props;
    const { selectedItem: itemData, reasons, returnExchangeType } = orderIssue;
    const { img, name } = itemData;
    const { selectedMode,displaySizeError } = this.state;
    return (
      <div className={styles['reason-item-main']}>
        {returnExchangeType ? null : (
          <div
            className={`${styles['flx-spacebw-alignc']} ${styles['pb-20']} ${
              styles['pt-20']
            } ${styles['ml-20']} ${styles['mr-20']} ${
              styles['reasons-item-wrap']
            }`}
          >
            <span
              className={`${styles['back-btn']} ${styles['flex-center']} ${
                styles['justify-center']
              }`}
            >
              <SVGComponent
                clsName={`${styles['down-arrow-icon']}`}
                src="icons/common-icon/down-arrow-circle"
              />
            </span>
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
        <div className={`${styles['reason-cont']} ${styles['p-20']}`}>
          <div className={`${styles['instruction-txt']} ${styles['pb-15']}`}>
            <span className={styles['fs-12']}>
              {ORDER_PAGE.SELECT_CANCEL_REASON}
            </span>
          </div>
          <div className={`${styles['dd-cont']} ${styles['pb-15']}`}>
            <div className={styles.select}>
              <select
                className={styles['select-text']}
                required
                onChange={this.selectReason}
              >
                <option>
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
                <select
                  className={styles['select-text']}
                  onChange={this.selectSubReason}
                >
                  <option>
                    {loadingStatus
                      ? ORDER_PAGE.LOADING
                      : ORDER_PAGE.SELECT_SUB_REASON}
                  </option>
                  {_.map(
                    reasons.filter(reason => reason.name === this.state.reason)[0].sub_reasons,
                    subReason => (
                      <option key={subReason.id} value={subReason.name}>
                        {subReason.name}
                      </option>
                    ),
                  )}
                </select>
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
            <p>Please Select The Size To continue</p>: null

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
          <div>
            {ORDER_ISSUE_TYPES.RETURN === returnExchangeType ? (
              <React.Fragment>
                <div>
                  <label>
                    <input
                      type="radio"
                      value="Return"
                      onChange={this.onOptionChange}
                      checked={
                        selectedMode === 'Return'
                      }
                    />
                    Return
                  </label>
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
          } ${styles.box}`}
        >
          <button
            onClick={this.saveAndGoNext}
            className={`${styles['fp-btn']} ${styles['fp-btn-primary']}`}
            disabled={loadingStatus || !this.state.reason}
          >
            {`${selectedMode} Type`}
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
  orderDetails:selectors.getOrderInfo(store)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getReasons: actionCreators.getReasons,
      setReason: actionCreators.setReason,
      getExchangeVariants: actionCreators.getExchangeVariants,
      setOrderIssueData: actionCreators.setOrderIssueData,
      setExchangeOrder:actionCreators.setExchangeOrder,
      setAddressData:actionCreators.setAddressData
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Reason);
