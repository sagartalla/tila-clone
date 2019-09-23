import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Cookies from 'universal-cookie';
import moment from 'moment-timezone';

import SVGComponent from '../../../common/SVGComponet';
import { selectors as personalDetailsSelectors } from '../../../../store/cam/personalDetails';
import StatusWidget from '../StatusWidget';
import { Link, Router } from '../../../../routes';
import constants from '../../../../constants';
import { actionCreators as orderActionCreators } from '../../../../store/cam/orders';
import { actionCreators as productActionCreators, selectors as productSelectors } from '../../../../store/product';
import { ORDER_ISSUE_TYPES, ORDER_ISSUE_STEPS } from '../../constants';
import { actionCreators } from '../../../../store/order';
import Warranty from '../../../../components/Product/includes/Warranty';
import OrderTracker from './OrderTracker';
import ReviewThankYou from '../../../Product/includes/ReviewThankYou';
import StarRating from '../../../common/StarRating';
import ReviewFeedBackModal from '../../../Product/includes/reviewFeedbackModal';

// import  styles from '../order.styl';

import { languageDefinations } from '../../../../utils/lang';

import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../../order_en.styl';
import styles_ar from '../../order_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

let warrantyData;

const { ORDER_PAGE, CART_PAGE, ORDERS } = languageDefinations();

const cookies = new Cookies();

const language = cookies.get('language') || 'ar';
const country = cookies.get('country') || 'SAU';

const RenderButton = ({ callbackMethod, refundType }) => {
  return (
    <div className={styles['ml-5']}>
      <button
        className={`${styles['mini-btn']} ${styles['link-text']} ${styles['fp-btn']} ${styles['fp-btn-default']} ${styles['text-uppercase']} ${styles['left-radius']} ${(refundType === 'DAMAGE PROTECTION' || 'CLAIM WARRANTY') ? styles['fs-10'] : styles['fs-12']}`}
        onClick={callbackMethod}
      >
        {ORDER_PAGE[refundType.toUpperCase().replace(' ', '_')]}
      </button>
    </div>
  );
};


class OrderItem extends Component {
  constructor() {
    super();
    this.state = {
      showToolTip: false,
      openModal: false,
      showReviews: false,
    };
    this.getCurrencyValue = this.getCurrencyValue.bind(this);
  }
  componentDidMount() {
    const { catalogObj, userInfo, orderItem, orderId } = this.props;
    const { catalog_id, product_id, item_type } = catalogObj;
    const paramsobj = {
      catalog_id,
      product_id,
      review_type: 'USER',
      user_id: userInfo.personalInfo.user_account_id,
    };
    this.props.getRatingsAndReviews(paramsobj, orderId, orderItem.id);
    document.getElementsByTagName('BODY')[0].style.overflow = 'auto';
  }

  getCurrencyValue(finalPrice) {
    const {isDamageProtectionAvailable,isWarrantyAvailable } = this.props
    return <span><span className={`${styles['fs-12']}`}>&nbsp;{finalPrice.currency_code}</span>&nbsp;<span>{finalPrice.display_value}</span></span>
  }
  getWarrantyDuration = (product) => {

    const {
      isDamageProtectionAvailable,
      isWarrantyAvailable,
      tilaPolicy,
      warranty_duration
    } = product;
    let warrantyInfo = warranty_duration;
    if (isDamageProtectionAvailable !== 'NA' || isWarrantyAvailable !== 'NA') {
      tilaPolicy.forEach((item) => {
        if (item.policy_type === 'EXTENDED' && item.valid_upto !== null) {
          warrantyInfo = moment(item.valid_upto).tz('Asia/Riyadh').format("MMM Do YY");
        }
      });
    }
    return warrantyInfo;
  }
  getWarranty = (product) => {
    const {
      tilaPolicy,
    } = product;
    if (tilaPolicy.length === 0) return null;
    const preferredPolicy = product.returnPolicy.preferred_policy; 
    tilaPolicy.length > 0 && tilaPolicy.forEach((item) => {
        if (item.policy_type === 'EXTENDED' && item.valid_upto !== null) {
          warrantyData = moment(item.valid_upto).tz('Asia/Riyadh').format("MMM Do 'YY");
        } else if(item.policy_type === 'NORMAL' && item.valid_upto !== null) {
          warrantyData = moment(item.valid_upto).tz('Asia/Riyadh').format("MMM Do 'YY");
        } else {
          warrantyData = 'Invalid'
        }
      });
      return (warrantyData !== 'Invalid' && warrantyData !== '') &&
      <React.Fragment>
      <div className={`${styles['flex']} ${styles['align-start']}`}>
      <SVGComponent clsName={`${styles['help-icon']}`} src="icons/common-icon/shield" />
      <div className={`${styles['ml-10']}`}>{ORDER_PAGE.WARRANTY_ENDS_ON} - {warrantyData}</div>
      </div>
      {product.returnPolicy && product.returnPolicy.policies && product.returnPolicy.policies[preferredPolicy] && product.returnPolicy.policies[preferredPolicy].valid_upto !== null &&
      <div className={`${styles['border-b']} ${styles['m-5']} ${styles['width63']}`}></div>}
      </React.Fragment>
  }

  getDate = (estimates) => {
    const { orderItem } = this.props;
    const t = estimates.filter(state => state.status === orderItem.status);
    if (t.length > 0) {
      return t[0].actual_time ? moment(t[0].actual_time).tz('Asia/Riyadh').format('ddd, MMM Do') : '';
    } return '';
  }
  showToolTip = () => {
    this.setState({ showToolTip: true });
  }

  hideToolTip = () => {
    this.setState({ showToolTip: false });
  }
  fetchpolicyDetails = (policyData) => {
    const data = [];
    const { isOrderDetailsPage } = this.props;
    if(isOrderDetailsPage) {
      policyData.forEach((item) => {
        if (item.policy_type !== 'NORMAL') {
          data.push(
            <div className={`${styles['warranty-block']}   ${styles['m-10']}`}>
              <div className={`${styles['flex']} ${styles['align-end']}`}>
                <div className={`${styles['warranty-sub-block']}`}>{`${item.policy_type == 'EXTENDED' ? 'Extended Warranty' : 'Damage Protection' }` }</div>
                <div className={`${styles['width22']} ${styles['font-weight600']}`}>
                <span className={`${styles['fs-12']}`}>{item.cost.currency_code}</span>&nbsp;
                {item.cost.display_value}
                </div>
              </div>
              <div className={`${styles['fs-12']} ${styles['ml-10']} ${styles['lgt-black']}`}>{`Duration: ${item.duration}`}</div>
            </div>);
        }
      });
    } else {
      policyData.forEach((item) => {
        if(item.policy_type !== 'NORMAL') {
          data.push(
            <div className={`${styles['warranty-block']} ${styles['m-10']} ${styles['inline-flex']} ${styles['p-3']}`}>
              <span className={`${styles['fs-12']} ${styles['font-weight600']}`}>{item.duration} ,</span>
              <span className={`${styles['fs-12']} ${styles['lgt-black']} ${styles['pl-4']}`}>
                {`${item.policy_type == 'EXTENDED' ? 'Extended Warranty' : 'Damage Protection' }` }
              </span>
            </div>
          )
        }
      })
    }

    return data;
  }
  cancelOrder = () => {
    const { raiseOrderIssue, orderItem, orderId } = this.props;
    const { products } = orderItem;
    raiseOrderIssue({
      issueType: ORDER_ISSUE_TYPES.CANCEL,
      items: products,
      defaultStep: ORDER_ISSUE_STEPS.LIST,
      orderId,
    });
  }

  exchangeReturnOrder = OrderType => () => {
    const {
      orderId, orderItem, variantId, getOrderDetails, listingId, tuinId
    } = this.props;
    getOrderDetails({ orderId });
    Router.pushRoute(`/${language}/customer/orders/${orderId}/issue/${OrderType}/item/${orderItem.id}/${variantId}/${listingId}`);
    // raiseOrderIssue({
    //   issueType: null,
    //   items: products,
    //   defaultStep: ORDER_ISSUE_STEPS.LIST,
    //   orderId,
    // });
  };

  toggleReviewModal = () => {
    const { openModal } = this.state;
    const { isLoggedIn, userInfoData, v2CurrentFlow, userInfo } = this.props;
      this.setState(prevState => ({
        openModal: !prevState.openModal,
        showReviews: true,
      }), () => {
        if (!openModal) {
          document.getElementsByTagName('BODY')[0].style.overflow = 'hidden';
        } else {
          document.getElementsByTagName('BODY')[0].style.overflow = 'auto';
        }
      });
  }

  submituserreview = (reviewObj) => {
    const { userInfo } = this.props;
    this.props.submitUserReview({
      ...reviewObj,
      reviewer_name: userInfo.personalInfo.user_name,
    }).then(() => {
      this.setState({
        showReviews: false,
      });
    });
  }

  renderReviewDetails = (reviewData) => {
    return (
          <div className={`${styles['pl-10']} ${styles['thick-gry-clr']} ${styles.flex} ${styles['review-start-inn']}`}>
              <StarRating
                interactive={false}
                count={5}
                rating={reviewData.ratings}
                clsStyl={{ width: '15px', marginRight: '5px' }}
              />
          </div>
  )}

  render() {
    const {
      payments = [{}], orderItem, orderId, thankyouPage, isCancelable,
      isReturnable, isExchangable, needHelp, showPriceInfo, isDamageProtectionAvailable,
      isWarrantyAvailable, tilaPolicy, tuinId, reviewsData, catalogObj, getReviewRatings, getReviewsData,
    } = this.props;
    console.log('getReviewsData', getReviewsData);
    const { showToolTip, openModal, showReviews } = this.state;
    const btnType = (() => {
      if (['PLACED', 'SHIPPED', 'PROCESSING'].indexOf(orderItem.status) !== -1) {
        return 'cancel';
      }
      if (orderItem.status === 'SHIPPED') {
        return 'return-exchange';
      }
      return null;
    })();
    const displayText = () => {
      if (['SHIPPED', 'PLACED', 'PROCESSING'].indexOf(orderItem.status) !== -1) {
        return ORDERS.DELIVERY_BY;
      } else if (orderItem.status === 'DELIVERED') {
        return ORDERS.DELIVERED_ON;
      } else if (orderItem.status === 'CANCELLED') {
        return ORDERS.CANCEL_ON;
      } else if (orderItem.status === 'RETURN_IN_PROGRESS') {
        return ORDERS.RETURN_IN_PROGRESS;
      } else if (orderItem.status === 'EXCHANGE_IN_PROGRESS') {
        return ORDERS.EXCHANGE_IN_PROGRESS;
      } else if (orderItem.status === 'REPLACEMENT_IN_PROGRESS') {
        return ORDERS.REPLACE_IN_PROGRESS;
      } return '';
    };

    const showMsgAndDate = () => (
      <div className={`${styles['date-cont']} ${styles['flx-spacebw-alignc']}`}>
        <div>
          <div className={`${styles['fs-14']} ${styles.fontW600}`}>{displayText()}</div>
          <div className={`${styles['ff-t']} ${styles['fs-24']} ${styles['ipad-fs-20']}`}>
            {btnType === 'cancel' ? moment(orderItem.products[0].promisedDeliveryDate).tz('Asia/Riyadh').format('ddd, MMM Do') : this.getDate(orderItem.products[0].state_time_estimates)}
          </div>
        </div>
      </div>
    );

    const refundStatus = refund => (
      <span className={`${refund.status === 'COMPLETED' ? styles['success-th'] : styles['progress-th']} ${styles['ml-10']} ${styles['mr-10']} ${styles['pl-10']} ${styles['pr-10']} ${styles['border-radius4']}`}>
        {refund.status === 'COMPLETED' ? ORDER_PAGE.COMPLETED : ORDER_PAGE.IN_PROGRESS}
      </span>
    );

    return (
      <div className={`${styles['shipment-wrap']} ${styles['mb-20']} ${styles['mt-20']} ${styles.flex}`}>
        <Col md={7} sm={7} className={`${styles['pl-0']} ${styles['pr-0']} ${styles.flex} ${styles['flex-colum']}`}>
          {orderItem.products.map((product) => {
            const { catalogId: catalog_id, name, productId: product_id, variantId, listing_id='oos'} = product;
            const {
              final_price = {}, gift_charge = {}, mrp = {}, offer_price = {}, shipping_fees = {}, discount = {},
            } = product.price;
            const preferredPolicy = product.returnPolicy.preferred_policy;
            return (
              <React.Fragment key={product.id}>
                <div className={`${styles.relative} ${styles['ht-100P']} ${styles['products-wrap']} ${styles.flex} ${styles['p-15']}`}>
                  <div key={product.id} className={`${styles['product-item']} ${styles.width100} ${styles.flex}`}>
                    <Col md={2} className={styles['p-0']}>
                      <div className={`${styles['img-wrap']} ${styles['flex-center']} ${styles['justify-center']}`}>
                        <Link route={`/${language}/pdp/${encodeURI(name.replace(/\s+/g, '-').replace(/-+/g, '-').toLowerCase())}/${tuinId ? `${tuinId}/`: '' }${listing_id}?pid=${product_id}&vid=${variantId}&cid=${catalog_id}`}>
                            <a target="_blank" className={`${styles.width100} ${styles['ht-100P']} ${styles['light-gry-clr']}`}>
                            <img className={`${styles['order-item-img']}`} src={`${constants.mediaDomain}/${product.img}`} alt={product.img} />
                          </a>
                          </Link>
                      </div>
                      {product.order_type === 'EXCHANGE' && product.order_item_type === 'DELIVERY' &&
                        <div className={`${styles.flex} ${styles['justify-center']} ${styles['mt-15']}`}>
                          <span className={styles['green-label']}>{ORDER_PAGE.EXCHANGE}</span>
                        </div>}
                        {product.order_type === 'REPLACEMENT' && product.order_item_type === 'DELIVERY' &&
                        <div className={`${styles.flex} ${styles['justify-center']} ${styles['mt-15']}`}>
                          <span className={styles['green-label']}>{ORDER_PAGE.REPLACEMENT}</span>
                        </div>}
                    </Col>
                    <Col md={10} className={`${styles['ipad-pr-0']} ${styles['pt-15']}`}>
                      <div className={`${styles['text-wrap']}`}>
                        <Link route={`/${language}/pdp/${encodeURI(name.replace(/\s+/g, '-').replace(/-+/g, '-').toLowerCase())}/${tuinId ? `${tuinId}/`: '' }${listing_id}?pid=${product_id}&vid=${variantId}&cid=${catalog_id}`}>
                          <a target="_blank" className={`${styles.width100} ${styles['fs-14']} ${styles['ht-100P']} ${styles['light-gry-clr']}`}>
                            <span className={`${styles.fontW600}`}>{product.name}</span>
                          </a>
                        </Link>
                        <div className={`${styles['flex-center']} ${styles['prod-sub-content']}`}>
                          <Col md={7} sm={7} className={styles['p-0']}>
                            <div className={`${styles.flex} ${styles['pt-15']} ${styles['pb-15']} ${styles['ipad-tp-5']} ${styles['ipad-tb-5']} ${styles['fs-12']} ${styles['thick-gry-clr']}`}>
                              {product.variantAttributes.length > 0 &&
                                product.variantAttributes.map((attr, index) => (
                                  <span className={styles['pr-20']} key={index}>
                                    <span>{attr.display_string} : </span>
                                    <span>{attr.attribute_values[0].value}</span>
                                  </span>
                                ))}
                              <span>
                                <span>{CART_PAGE.QUANTITY} : </span>
                                <span>{product.orderIds.length}</span>
                              </span>
                            </div>
                            <div className={styles['prod-sub-content-inn']}>
                              {/* <span className={`${styles['coupon-code']} ${styles['fs-12']}`}></span> */}
                              <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pl-15']} ${styles['promo-code-label']} ${styles['ipad-tp-5']} ${styles['ipad-pl-0']}`} />
                            </div>
                          </Col>
                          {
                            showPriceInfo &&
                            <Col md={5} sm={5} className={`${styles['ipad-pr-0']}`}>
                              {product.price &&
                              <span className={`${styles['direction-ir']} ${styles['justify-end']} ${styles['flex-center']} ${styles['fs-16']} ${styles.fontW600}`}>
                                {product.orderIds.length} x {this.getCurrencyValue(final_price)}
                                <span onMouseOver={this.showToolTip} onMouseLeave={this.hideToolTip} className={`${styles.relative} ${styles['tool-tip-parent']} ${styles['checkout-quat']} ${styles['fs-12']} ${styles['flex-center']} ${styles['justify-around']}`}>
                                  <span className={`${lang === 'en' ? '' : styles['flip-questionmark']}`}>?</span>
                                  {showToolTip &&
                                  <div className={styles['tool-tip']}>
                                    <ul>
                                      <li className={styles['flx-space-bw']}><span className={styles['thick-gry-clr']}>{ORDER_PAGE.MRP} : </span><span> {product.currency_code} {mrp.display_value}</span></li>
                                      {product && product.offers && product.offers.length > 0 ?
                                        product.offers.map(offer => <li className={styles['flx-space-bw']}><span className={styles['thick-gry-clr']}>{offer.coupon_code ? offer.coupon_code : offer.description} : </span><span>{'(-)'} {offer.discount.display_value} {offer.discount.currency_code}</span></li>)
                                        :
                                        <li className={styles['flx-space-bw']}><span className={styles['thick-gry-clr']}>{ORDER_PAGE.DISCOUNT} :</span><span>{'(-)'} {discount.currency_code} {discount.display_value}</span></li>
                                      }
                                      {offer_price &&
                                      <li className={`${styles['flx-space-bw']}`}><span className={styles['thick-gry-clr']}>{ORDER_PAGE.PRICE} :</span><span> {offer_price.currency_code} {offer_price.display_value}</span></li>}
                                      {product.gift_info && gift_charge &&
                                        <li className={styles['flx-space-bw']}><span className={styles['thick-gry-clr']}>{ORDER_PAGE.GIFT_CHARGES} : </span><span>{gift_charge.display_value ? `(+) ${gift_charge.currency_code} ${gift_charge.display_value}` : 'FREE'}</span></li>}
                                      <li className={styles['flx-space-bw']}>
                                        <span className={styles['thick-gry-clr']}>{ORDER_PAGE.SHIPPING} : </span><span className={styles.fontW600}> {shipping_fees.display_value ? `(+) ${shipping_fees.currency_code} ${shipping_fees.display_value}` :
                                        <SVGComponent clsName={`${styles['ship-icon']}`} src={lang === 'en' ? 'icons/free-shipping' : 'icons/Arabic-Freeshipping'} />}</span>
                                      </li>
                                      {final_price &&
                                      <li className={styles['flx-space-bw']}><span className={styles['thick-gry-clr']}>{ORDER_PAGE.TOTAL} : </span><span className={styles.fontW600}> {final_price.currency_code} {final_price.display_value}</span></li>}

                                    </ul>
                                  </div>}
                                </span>
                              </span>}
                            </Col>
                          }
                        </div>
                        {product.warranty_duration && Object.keys(product.warranty_duration).length > 0 ?
                          <div className={`${styles['mb-0']} ${styles['fs-12']} ${styles.flex}`}>
                            <span className={`${styles.flex} ${styles['p-10']} ${styles.lable}`}>
                              <span>{CART_PAGE.WARRENTY} : </span>
                              <span className={`${styles['pl-10']} ${styles['pr-10']}`}><Warranty warranty={this.getWarrantyDuration(product)} /></span>
                            </span>
                          </div>
                          : null}
                          <div className={`${styles['mt-10']}`}>
                          {this.getWarranty(product)}
                          {product.returnPolicy && product.returnPolicy.policies && product.returnPolicy.policies[preferredPolicy] && product.returnPolicy.policies[preferredPolicy].valid_upto &&
                          <React.Fragment>
                          <div className={`${styles['flex']} ${styles['align-start']}`}>
                          <SVGComponent clsName={`${styles['help-icon']}`} src="icons/common-icon/order-return" />
                          {product.returnPolicy ? <div className={`${styles['ml-10']}`}>{ORDER_PAGE.RETURN_WINDOW_CLOSED_ON} - {moment(product.returnPolicy.policies[preferredPolicy].valid_upto).tz('Asia/Riyadh').format("MMM Do 'YY")}</div> : ''}
                          </div>
                          </React.Fragment>
                          }
                          </div>                    
                      </div>
                    </Col>
                  </div>
                  {needHelp &&
                    <a href={`/${language}/help/answers/orders#${orderId}`}>
                      <span className={`${styles['help-position']} ${styles.absolute} ${styles['black-color']} ${styles['p-5']} ${styles['flex-center']} ${styles['ml-10']} ${styles.border} ${styles['border-radius4']}`}>
                        <SVGComponent clsName={`${styles['help-icon']}`} src="icons/help-icon/help" />
                        &nbsp;&nbsp;{ORDERS.NEED_HELP}
                      </span>
                    </a>
                  }
                </div>
                {product.order_type === 'EXCHANGE' && product.order_item_type === 'DELIVERY' &&
                  <div className={`${styles['pt-5']} ${styles['pb-5']} ${styles['pl-15']} ${styles['border-t']}`}>
                    {ORDER_PAGE.THERE_IS_AN_EXCHANGE_ORDER}
                    {/* To view the parent order please <a>Click here</a> */}
                  </div>}
                  {product.order_type === 'REPLACEMENT' && product.order_item_type === 'DELIVERY' &&
                  <div className={`${styles['pt-5']} ${styles['pb-5']} ${styles['pl-15']} ${styles['border-t']}`}>
                    {ORDER_PAGE.THERE_IS_AN_REPLACE_ORDER}
                  </div>}
                {product.refunds && product.refunds.length > 0 &&
                  <div className={`${styles['pt-15']} ${styles['pb-5']} ${styles['pl-15']} ${styles['border-t']} ${styles.relative}`}>
                    <div className={`${styles['bg-white']} ${styles['fs-12']} ${styles.absolute} ${styles['p-5']} ${styles['border-lg']} ${styles['refund-label']}`}>{ORDER_PAGE.REFUND_STATUS}</div>
                    {product.refunds.map(refund => (
                      <div className={`${styles['flex-center']} ${styles['fs-12']}`}>
                        <span className={`${styles['thick-gry-clr']} ${styles.flex}`}>{ORDER_PAGE.REFUND_TO}:
                        <span className={`${styles['black-color']} ${styles['ml-10']} ${styles['ml-10']}`}>
                        {refund && refund.refund_payment_info && refund.refund_payment_info.length > 0 && refund.refund_payment_info.map(refundVal => (
                          <div>{refundVal.payment_mode_display_name}</div>
                        ))}
                        </span>
                        </span>
                        {refundStatus(refund)}
                        <span>{refund.amount.display_value} {refund.amount.currency_code}</span>
                      </div>
                    ))}
                  </div>}
                {product.gift_info &&
                  <div className={`${styles.flex} ${styles['fs-12']} ${styles.absolute} ${styles['p-5']} ${styles.right0} ${styles.top0} ${styles['thick-gry-clr']} ${styles['bg-light-gray']}`}>
                    <SVGComponent clsName={`${styles['help-icon']}`} src="icons/gift-blue" />
                    <span className={`${styles['ml-5']} ${styles.flex}`}>
                      {ORDER_PAGE.THIS_ORDER_CONTAINS_A_GIFT}
                    </span>
                  </div>}
                {(product.isDamageProtectionAvailable !== 'NA' || product.isWarrantyAvailable !== 'NA') &&
                  <div>
                    <Col md={2}></Col>
                    <Col md={10}>
                      <div>{this.fetchpolicyDetails(product.tilaPolicy)}</div>
                    </Col>
                  </div>}
              </React.Fragment>
            );
          })}
        </Col>
        <Col md={5} sm={5} className={`${styles['thick-border-left']} ${styles['p-0']}`}>
          {payments && payments.length > 0 && payments[0] && payments[0].transaction_status && payments[0].transaction_status === 'FAILED' ?
            <div className={`${styles['unsuccessful-mesg']}`}>{ORDER_PAGE.ORDER_UNSUCCESSFUL}</div>
            :
            <React.Fragment>
              <div className={`${styles['pt-15']} ${styles['pl-15']} ${styles['pr-15']} ${styles['pb-0']} ${styles['ipad-pl-0']} ${styles['ipad-pr-0']} ${styles['flx-space-bw']}`}>
                {showMsgAndDate()}
                <div className={styles.flex}>
                  {isCancelable === 'TRUE' &&
                    <RenderButton
                      callbackMethod={this.cancelOrder}
                      refundType="Cancel"
                    />}
                  {isReturnable === 'TRUE' &&
                    <RenderButton
                      callbackMethod={this.exchangeReturnOrder(ORDER_ISSUE_TYPES.RETURN)}
                      refundType="Return"
                    />}
                  {isExchangable === 'TRUE' &&
                    <RenderButton
                      callbackMethod={this.exchangeReturnOrder(ORDER_ISSUE_TYPES.EXCHANGE)}
                      refundType="Exchange"
                    />
                  }
                  {
                    isDamageProtectionAvailable === 'VALID' &&
                      <RenderButton
                        callbackMethod={this.exchangeReturnOrder(ORDER_ISSUE_TYPES.DAMAGEWARRANTY)}
                        refundType="DAMAGE PROTECTION"
                      />
                  }
                  {
                    isWarrantyAvailable === 'VALID' &&
                      <RenderButton
                        callbackMethod={this.exchangeReturnOrder(ORDER_ISSUE_TYPES.CLAIMWARRANTY)}
                        refundType="CLAIM WARRANTY"
                      />
                  }
                </div>
              </div>
              <div className={`${styles['widget-wrap']} ${styles['p-20']} ${styles['mb-30']}`}>
                {thankyouPage ?
                  null
                  :
                  <StatusWidget currentStatus={orderItem.products} />
                }
              </div>
              {orderItem.ratingApplicable &&
              <div className={`${styles['flex-center']} ${styles['justify-end']} ${styles['mr-25']} ${styles['rate-product-style']}`}>
              <img src="/static/img/icons/common-icon/rate-product.png" alt="" className={`${styles['rate-product-icon']} ${styles['ml-5']}`} />
              {Object.keys(getReviewsData).map(id => {
                if (id === orderId) {
                  return Object.keys(getReviewsData[id]).map((itemId, index) => {
                    if (itemId === orderItem.id) {
                      return getReviewsData[id] && getReviewsData[id][itemId] && getReviewsData[id][itemId][0] && getReviewsData[id][itemId][0].ratings > 0 ? <div>{this.renderReviewDetails(getReviewsData[id][itemId][0])}</div> : <div onClick={this.toggleReviewModal} className={`${styles['m-5']} ${styles['fs-12']} ${styles['m-5']} ${styles.pointer}`}>{ORDER_PAGE.RATE_PRODUCT}</div>
                    }
                  })
                }
              })
              }
              </div>}
            </React.Fragment>
          }
          {orderItem.products[0].trackingId && <OrderTracker orderItem={orderItem.products[0]} showMsgAndDate={showMsgAndDate()} />}
        </Col>
        <div>
                {openModal ?
                  <React.Fragment>
                    <div onClick={this.closeSlider} className={openModal ? `${styles.modalContainer} ${styles.showDiv}` : `${styles.modalContainer} ${styles.hideDiv}`}>
                      <div className={`${styles.disabled}`} />
                    </div>
                    <div className={`${styles['overflow-y-auto']} ${styles['p-30']} ${openModal ? `${styles.openModal}` : `${styles.closeModal}`}`}>
                      <div className={styles['p-40']}>
                        <h4 className={`${styles.flex} ${styles['justify-flex-end']} ${styles['m-0']} ${styles['mb-20']}`}>
                          <a onClick={this.toggleReviewModal} className={`${styles['fs-22']} ${styles['black-color']}`}>X</a>
                        </h4>
                        <div>
                          {showReviews ?
                            <ReviewFeedBackModal
                              catalogObj={catalogObj}
                              titleInfo={reviewsData}
                              feedbackSubmit={this.submituserreview}
                            />
                            :
                            <ReviewThankYou toggleReviewModal={this.toggleReviewModal} />
                          }
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                  : null
                }
              </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  userInfo: personalDetailsSelectors.getUserInfo(store),
  getReviewRatings: productSelectors.getReviewRatings(store),
  getReviewsData: productSelectors.getReviewsData(store),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  raiseOrderIssue: actionCreators.raiseOrderIssue,
  getOrderDetails: actionCreators.getOrderDetails,
  submitUserReview: productActionCreators.submitUserReview,
  getRatingsAndReviews: productActionCreators.getRatingsAndReviews,
  getOrderHistory: orderActionCreators.getOrderHistory,
  getWarrantyHistory: orderActionCreators.getWarrantyHistory,
}, dispatch);

OrderItem.propTypes = {
  orderItem: PropTypes.object.isRequired,
  raiseOrderIssue: PropTypes.func.isRequired,
  orderId: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderItem);


// btnType ?
//   <div className={styles['cancel-btn']}>
//     <span
//       className={`${styles['link-text']} ${styles['fp-btn']} ${styles['fp-btn-default']} ${styles['text-uppercase']} ${styles['fs-12']}`}
//       onClick={btnType === 'cancel' ? cancelOrder : exchangeReturnOrder}> {btnType === 'cancel' ? 'Cancel' : 'Return/Exchange'}</span>
//   </div>
//   :
//   null


// {shipping_fees &&
//   <div>
//     <Col md={2}></Col>
//     <Col md={10}>
//       <div className=
//         {`
//           ${styles['warranty-block']}
//           ${styles.flex}
//           ${styles['align-end']}
//           ${styles['padding-all']}
//           ${styles[`mb-0`]}
//           ${styles[`mt-10`]}
//           ${styles[`mr-10`]}
//           ${styles[`ml-10`]}
//           `
//         }
//       >
//         <div className={`${styles.width78} ${styles['font-weight600']}`}>{ORDER_PAGE.SHIPPING}</div>
//         <div className={`${styles.width22} ${styles['font-weight600']}`}>
//           {shipping_fees.display_value ? `(+) ${shipping_fees.currency_code} ${shipping_fees.display_value}` :
//           <SVGComponent clsName={`${styles['ship-icon']}`} src={lang === 'en' ? 'icons/free-shipping' : 'icons/Arabic-Freeshipping'} />}
//         </div>
//       </div>
//     </Col>
//   </div>
//   }

// {<div>
//     <Col md={2}></Col>
//     <Col md={10}>
//       <div
//         className={`
//           ${styles['warranty-block']}
//           ${styles.flex}
//           ${styles['align-end']}
//           ${styles['padding-all']}
//           ${styles[`mt-0`]}
//           ${styles[`mb-10`]}
//           ${styles[`mr-10`]}
//           ${styles[`ml-10`]}
//           `}
//       >
//         <div className={`${styles.width78} ${styles['font-weight600']}`}>Total:</div>
//         <div className={`${styles['width22']} ${styles['font-weight600']}`}>
//            <span>{final_price.currency_code}</span>&nbsp;
//            <span>{final_price.display_value}</span>
//         </div>
//       </div>
//     </Col>
//   </div>
//   }
