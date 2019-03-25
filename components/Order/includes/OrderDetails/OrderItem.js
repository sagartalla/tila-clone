import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { Router } from '../../../../routes';
import StatusWidget from '../StatusWidget';
import constants from '../../../../constants';
import { ORDER_ISSUE_TYPES, ORDER_ISSUE_STEPS } from '../../constants';
import { actionCreators } from '../../../../store/order';
import Cookies from 'universal-cookie';

// import  styles from '../order.styl';
import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Order/order');
const cookies = new Cookies();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

const RenderButton = ({callbackMethod,refundType}) => {
  return (
    <div className={styles['cancel-btn']}>
      <button
        className={`${styles['link-text']} ${styles['fp-btn']} ${styles['fp-btn-default']} ${styles['text-uppercase']} ${styles['fs-12']}`}
        onClick={callbackMethod}>{refundType}</button>
    </div>
  )
}

const OrderItem = ({
  payments=[{}],
  orderItem,
  raiseOrderIssue,
  isCancelable,
  isReturnable,
  isExchangable,
  orderId,
  showWidget,
  variantId,
  thankyouPage,
 }) => {
  const { products } = orderItem;

  const cancelOrder = () => {
    raiseOrderIssue({
      issueType: ORDER_ISSUE_TYPES.CANCEL,
      items: products,
      defaultStep: ORDER_ISSUE_STEPS.LIST,
      orderId,
    });
  };

  const exchangeReturnOrder = (OrderType) => () => {
      Router.pushRoute(`/${country}/${language}/cam/orders/${orderId}/issue/${OrderType}/item/${orderItem.id}/${variantId}`)
    // raiseOrderIssue({
    //   issueType: null,
    //   items: products,
    //   defaultStep: ORDER_ISSUE_STEPS.LIST,
    //   orderId,
    // });
  };

  const btnType = (() => {
    if (['DELIVERED', 'PLACED', 'PROCESSING'].indexOf(orderItem.status) !== -1) {
      return 'cancel';
    }
    if (orderItem.status === 'SHIPPED') {
      return 'return-exchange';
    }
    if (orderItem.status === 'CANCELLED') {
      return null;
    }
  })();
  return (
    <div className={`${styles['shipment-wrap']} ${styles['mb-20']} ${styles['mt-20']} ${styles['flex']}`}>
      <Col md={7} sm={7} className={`${styles['pl-0']} ${styles['pr-0']}`}>
        <div className={`${styles['products-wrap']} ${styles['flex']} ${styles['p-15']}`}>
          {
            orderItem.products.map((product) => (
              <div key={product.id} className={`${styles['product-item']} ${styles['flex']}`}>
                <Col md={2} className={styles['p-0']}>
                  <div className={`${styles['img-wrap']} ${styles['flex-center']} ${styles['justify-center']}`}>
                    <img className={`${styles['order-item-img']}`} src={`${constants.mediaDomain}/${product.img}`} alt={product.img} />
                  </div>
                </Col>
                <Col md={10} className={styles['ipad-pr-0']}>
                  <div className={`${styles['text-wrap']}`}>
                    <span className={`${styles['fontW600']}`}>{product.name}</span>
                    <div className={`${styles['flex-center']} ${styles['prod-sub-content']}`}>
                      <Col md={9} sm={9} className={styles['p-0']}>
                        <div className={`${styles['flex']} ${styles['pt-15']} ${styles['pb-15']} ${styles['ipad-tp-5']} ${styles['ipad-tb-5']} ${styles['fs-12']} ${styles['thick-gry-clr']}`}>
                          <span className={styles['pr-20']}>
                            <span></span>
                            <span></span>
                          </span>
                          <span>
                            <span>Quantity : </span>
                            <span>{product.orderIds.length}</span>
                          </span>
                        </div>
                        <div className={styles['prod-sub-content-inn']}>
                          {/* <span className={`${styles['coupon-code']} ${styles['fs-12']}`}></span> */}
                          <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pl-15']} ${styles['promo-code-label']} ${styles['ipad-tp-5']} ${styles['ipad-pl-0']}`}></span>
                        </div>
                      </Col>
                      <Col md={3} sm={3} className={styles['ipad-pr-0']}>
                        <span className={`${styles['fs-16']} ${styles['fontW600']}`}>{product.price} {product.currency_code}</span>
                      </Col>
                    </div>
                  </div>
                </Col>
              </div>
            ))
          }
        </div>
      </Col>
      <Col md={5} sm={5} className={styles['thick-border-left']}>
        {
          payments ?
            payments[0] && payments[0].transaction_status == 'FAILED' ?
              <div>Order Unsuccessful</div>
              :
              <div className={`${styles['p-15']} ${styles['ipad-pl-0']} ${styles['ipad-pr-0']}`}>
                <div className={`${styles['date-cont']} ${styles['flx-spacebw-alignc']}`}>
                  <div>
                    <div className={styles['fs-12']}>{btnType === 'cancel' ? 'Delivery by' : showWidget && !thankyouPage ? 'Canceled on' : 'Canceled'}</div>
                    <div className={`${styles['ff-t']} ${styles['fs-26']} ${styles['ipad-fs-20']}`}>
                      {btnType === 'cancel' ? moment(orderItem.products[0].promisedDeliveryDate).format('Do, dddd') : showWidget && !thankyouPage ? moment(orderItem.products[0].state_time_estimates.CANCELLED.time).format('Do, dddd') : null}
                    </div>
                  </div>
                  {isCancelable === 'TRUE' &&
                    <RenderButton callbackMethod={cancelOrder}
                      refundType = 'Cancel'
                   />}

                   {isReturnable === 'TRUE' &&
                   <RenderButton
                     callbackMethod={exchangeReturnOrder(ORDER_ISSUE_TYPES.RETURN)}
                     refundType='Return' />}
                  {isExchangable === 'TRUE' &&
                    <RenderButton
                      callbackMethod={exchangeReturnOrder(ORDER_ISSUE_TYPES.EXCHANGE)}
                      refundType='Exchange' />
                  }

                </div>
                <div className={`${styles['widget-wrap']} ${styles['pt-10']} ${styles['pb-10']}`}>
                  {
                    orderItem.status === 'DELIVERED' || !showWidget || thankyouPage
                      ?
                      null
                      :
                      <StatusWidget currentStatus={orderItem.products} />
                  }

                </div>
              </div>
          :
          null
        }
      </Col>
    </div>
  )
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { raiseOrderIssue: actionCreators.raiseOrderIssue },
    dispatch,
  );
}

OrderItem.propTypes = {
  orderItem: PropTypes.object.isRequired,
  raiseOrderIssue: PropTypes.func.isRequired,
  orderId: PropTypes.string.isRequired,
}

export default connect(null, mapDispatchToProps)(OrderItem);





// btnType ?
//   <div className={styles['cancel-btn']}>
//     <span
//       className={`${styles['link-text']} ${styles['fp-btn']} ${styles['fp-btn-default']} ${styles['text-uppercase']} ${styles['fs-12']}`}
//       onClick={btnType === 'cancel' ? cancelOrder : exchangeReturnOrder}> {btnType === 'cancel' ? 'Cancel' : 'Return/Exchange'}</span>
//   </div>
//   :
//   null
