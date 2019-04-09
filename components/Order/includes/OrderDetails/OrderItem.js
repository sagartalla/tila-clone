import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Cookies from 'universal-cookie';
import moment from 'moment';

import SVGComponent from '../../../common/SVGComponet';
import StatusWidget from '../StatusWidget';
import { Link, Router } from '../../../../routes';
import constants from '../../../../constants';
import { ORDER_ISSUE_TYPES, ORDER_ISSUE_STEPS } from '../../constants';
import { actionCreators } from '../../../../store/order';
import Warranty from '../../../../components/Product/includes/Warranty';

// import  styles from '../order.styl';
import { mergeCss } from '../../../../utils/cssUtil';
import { languageDefinations } from '../../../../utils/lang';

const { ORDER_PAGE } = languageDefinations();
const styles = mergeCss('components/Order/order');
const cookies = new Cookies();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

const RenderButton = ({ callbackMethod, refundType }) => {
  return (
    <div className={styles['ml-5']}>
      <button
        className={`${styles['mini-btn']} ${styles['link-text']} ${styles['fp-btn']} ${styles['fp-btn-default']} ${styles['text-uppercase']} ${styles['fs-12']}`}
        onClick={callbackMethod}
      >
        {refundType}
      </button>
    </div>
  )
}


class OrderItem extends Component {
  constructor() {
    super();
    this.state = {
      showToolTip: false,
    };
  }

  getDate = (estimates) => {
    const { orderItem } = this.props;
    const t = estimates.filter(state => state.status === orderItem.status);
    if (t.length > 0) {
      return t[0].actual_time ? moment(t[0].actual_time).format('Do, dddd') : '';
    } return '';
  }

  showToolTip = () => {
    this.setState({ showToolTip: true });
  }

  hideToolTip = () => {
    this.setState({ showToolTip: false });
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
    const { orderId, orderItem, variantId } = this.props;
    Router.pushRoute(`/${country}/${language}/cam/orders/${orderId}/issue/${OrderType}/item/${orderItem.id}/${variantId}`);
    // raiseOrderIssue({
    //   issueType: null,
    //   items: products,
    //   defaultStep: ORDER_ISSUE_STEPS.LIST,
    //   orderId,
    // });
  };

  render() {
    const {
      payments = [{}], orderItem, orderId, thankyouPage, isCancelable, isReturnable, isExchangable,
    } = this.props;
    const { showToolTip } = this.state;
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
        return 'Delivery by';
      } else if (orderItem.status === 'DELIVERED') {
        return 'Delivered on';
      } else if (orderItem.status === 'CANCELLED') {
        return 'Cancelled On';
      } else if (orderItem.status === 'RETURN_IN_PROGRESS') {
        return 'Return in progress';
      } return '';
    };
    return (
      <div className={`${styles['shipment-wrap']} ${styles['mb-20']} ${styles['mt-20']} ${styles.flex}`}>
        <Col md={7} sm={7} className={`${styles['pl-0']} ${styles['pr-0']}`}>
          {orderItem.products.map(product => (
            <React.Fragment>
              <div className={`${styles['products-wrap']} ${styles.flex} ${styles['p-15']}`}>
                <div key={product.id} className={`${styles['product-item']} ${styles.width100} ${styles.flex}`}>
                  <Col md={2} className={styles['p-0']}>
                    <div className={`${styles['img-wrap']} ${styles['flex-center']} ${styles['justify-center']}`}>
                      <Link route={`/${country}/${language}/product?productId=${product.productId}${product.variantId ? `&variantId=${product.variantId}` : ''}&catalogId=${product.catalogId}&itemType=${product.itemType}`}>
                        <a className={`${styles['width100']} ${styles['ht-100P']} ${styles['light-gry-clr']}`}>
                          <img className={`${styles['order-item-img']}`} src={`${constants.mediaDomain}/${product.img}`} alt={product.img} />
                        </a>
                      </Link>
                    </div>
                    {product.order_type === 'EXCHANGE' && product.order_item_type === 'DELIVERY' &&
                    <div className={`${styles.flex} ${styles['justify-center']} ${styles['mt-15']}`}>
                      <span className={styles['green-label']}>Exchange</span>
                    </div>}
                  </Col>
                  <Col md={10} className={styles['ipad-pr-0']}>
                    <div className={`${styles['text-wrap']}`}>
                      <Link route={`/${country}/${language}/product?productId=${product.productId}${product.variantId ? `&variantId=${product.variantId}` : ''}&catalogId=${product.catalogId}&itemType=${product.itemType}`}>
                        <a className={`${styles['width100']} ${styles['ht-100P']} ${styles['light-gry-clr']}`}>
                          <span className={`${styles.fontW600}`}>{product.name}</span>
                        </a>
                      </Link>
                      <div className={`${styles['flex-center']} ${styles['prod-sub-content']}`}>
                        <Col md={8} sm={8} className={styles['p-0']}>
                          <div className={`${styles.flex} ${styles['pt-15']} ${styles['pb-15']} ${styles['ipad-tp-5']} ${styles['ipad-tb-5']} ${styles['fs-12']} ${styles['thick-gry-clr']}`}>
                            {product.sizeInfo &&
                            <span className={styles['pr-20']}>
                              <span>{product.sizeInfo.display_string} : </span>
                              <span>{product.sizeInfo.attribute_values[0].value}</span>
                            </span>}
                            <span>
                              <span>Quantity : </span>
                              <span>{product.orderIds.length}</span>
                            </span>
                          </div>
                          <div className={styles['prod-sub-content-inn']}>
                            {/* <span className={`${styles['coupon-code']} ${styles['fs-12']}`}></span> */}
                            <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pl-15']} ${styles['promo-code-label']} ${styles['ipad-tp-5']} ${styles['ipad-pl-0']}`} />
                          </div>
                        </Col>
                        <Col md={4} sm={4} className={styles['ipad-pr-0']}>
                          {product.price &&
                          <span className={`${styles['justify-end']} ${styles['flex-center']} ${styles['fs-16']} ${styles.fontW600}`}>
                            {product.orderIds.length} x {product.price.final_price} {product.currency_code}
                            <span onMouseOver={this.showToolTip} onMouseLeave={this.hideToolTip} className={`${styles.relative} ${styles['tool-tip-parent']} ${styles['checkout-quat']} ${styles['fs-12']} ${styles['flex-center']} ${styles['justify-around']}`}>
                              {'?'}
                              {showToolTip &&
                              <div className={styles['tool-tip']}>
                                <ul>
                                  <li className={styles['flx-space-bw']}><span className={styles['thick-gry-clr']}>{ORDER_PAGE.MRP} : </span><span> {product.price.mrp} {product.currency_code}</span></li>
                                  {product.offers.length > 0 ?
                                    product.offers.map(offer => <li className={styles['flx-space-bw']}><span className={styles['thick-gry-clr']}>{offer.coupon_code ? offer.coupon_code : offer.description} : </span><span>{'(-)'} {offer.discount} {product.currency_code}</span></li>)
                                    :
                                    <li className={styles['flx-space-bw']}><span className={styles['thick-gry-clr']}>{ORDER_PAGE.DISCOUNT} :</span><span>{'(-)'} {product.price.mrp - product.price.offer_price} {product.currency_code}</span></li>
                                  }
                                  <li className={`${styles['flx-space-bw']} ${styles['b-t']}`}><span className={styles['thick-gry-clr']}>{ORDER_PAGE.PRICE} :</span><span> {product.price.offer_price} {product.currency_code}</span></li>
                                  <li className={styles['flx-space-bw']}><span className={styles['thick-gry-clr']}>{ORDER_PAGE.SHIPPING} : </span><span>{product.price.shipping_fees ? `(+) ${product.price.shipping_fees} ${product.currency_code}` : 'FREE'}</span></li>
                                  {product.gift_info &&
                                    <li className={styles['flx-space-bw']}><span className={styles['thick-gry-clr']}>{ORDER_PAGE.GIFT_CHARGES} : </span><span>{product.price.gift_charge ? `(+) ${product.price.gift_charge} ${product.currency_code}` : 'FREE'}</span></li>}
                                  <li className={styles['flx-space-bw']}><span className={styles['thick-gry-clr']}>{ORDER_PAGE.TOTAL} : </span><span className={styles.fontW600}> {product.price.final_price} {product.currency_code}</span></li>
                                </ul>
                              </div>}
                            </span>
                          </span>}
                        </Col>
                      </div>
                      {product.warranty_duration ?
                        <p className={`${styles['mb-0']} ${styles['fs-12']} ${styles.flex}`}>
                          <span className={`${styles.flex} ${styles['p-10']} ${styles.lable}`}>
                            <span>Warranty : </span>
                            <span className={`${styles['pl-10']} ${styles['pr-10']}`}><Warranty warranty={product.warranty_duration} /></span>
                          </span>
                        </p>
                        : null}
                    </div>
                  </Col>
                </div>
              </div>
              {product.order_type === 'EXCHANGE' && product.order_item_type === 'DELIVERY' &&
                <div className={`${styles['pt-5']} ${styles['pb-5']} ${styles['pl-15']} ${styles['thick-border-top']}`}>
                  This is an exchange order on the item you have requested for exchange.
                  {/* To view the parent order please <a>Click here</a> */}
                </div>}
              {product.order_status === 'RETURN_REQUESTED' &&
                <div className={`${styles['pt-15']} ${styles['pb-5']} ${styles['pl-15']} ${styles['thick-border-top']} ${styles.relative}`}>
                  <div className={`${styles['bg-white']} ${styles['fs-12']} ${styles.absolute} ${styles['p-5']} ${styles['border-lg']} ${styles['refund-label']}`}>Refund Status</div>
                  Refund Initiated.
                </div>}
              {product.gift_info &&
                <div className={`${styles['fs-12']} ${styles.absolute} ${styles['p-5']} ${styles.right0} ${styles.top0} ${styles['thick-gry-clr']} ${styles['bg-light-gray']}`}>
                  This order contains gift. <a>View details</a>
                </div>}
            </React.Fragment>
          ))}
          <span className={`${styles['help-position']} ${styles.absolute} ${styles['thick-blue']} ${styles['p-5']} ${styles['flex-center']} ${styles['ml-10']} ${styles.border} ${styles['border-radius4']}`}>
            <SVGComponent clsName={`${styles['help-icon']}`} src="icons/help-icon/help" />
            &nbsp;&nbsp;Need Help?
          </span>
        </Col>
        <Col md={5} sm={5} className={styles['thick-border-left']}>
          {payments && payments.length > 0 && payments[0].transaction_status === 'FAILED' ?
            <div>Order Unsuccessful</div>
            :
            <React.Fragment>
              <div className={`${styles['p-15']} ${styles['ipad-pl-0']} ${styles['ipad-pr-0']} ${styles['flx-space-bw']}`}>
                <div className={`${styles['date-cont']} ${styles['flx-spacebw-alignc']}`}>
                  <div>
                    <div className={styles['fs-12']}>{displayText()}</div>
                    <div className={`${styles['ff-t']} ${styles['fs-24']} ${styles['ipad-fs-20']}`}>
                      {btnType === 'cancel' ? moment(orderItem.products[0].promisedDeliveryDate).format('Do, dddd') : !thankyouPage ? this.getDate(orderItem.products[0].state_time_estimates) : null}
                    </div>
                  </div>
                </div>
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
                </div>
              </div>
              <div className={`${styles['widget-wrap']} ${styles['pb-10']}`}>
                {thankyouPage ?
                  null
                  :
                  <StatusWidget currentStatus={orderItem.products} />
                }
              </div>
            </React.Fragment>
          }
        </Col>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  raiseOrderIssue: actionCreators.raiseOrderIssue,
}, dispatch);

OrderItem.propTypes = {
  orderItem: PropTypes.object.isRequired,
  raiseOrderIssue: PropTypes.func.isRequired,
  orderId: PropTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(OrderItem);


// btnType ?
//   <div className={styles['cancel-btn']}>
//     <span
//       className={`${styles['link-text']} ${styles['fp-btn']} ${styles['fp-btn-default']} ${styles['text-uppercase']} ${styles['fs-12']}`}
//       onClick={btnType === 'cancel' ? cancelOrder : exchangeReturnOrder}> {btnType === 'cancel' ? 'Cancel' : 'Return/Exchange'}</span>
//   </div>
//   :
//   null
