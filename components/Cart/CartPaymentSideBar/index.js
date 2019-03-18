import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { languageDefinations } from '../../../utils/lang/';
import SVGComponent from '../../common/SVGComponet';
import { actionCreators } from '../../../store/coupons';
import InstantCheckout from '../../common/InstantCheckout';
import { actionCreators as cartActioncreators } from '../../../store/cart';

import CartStepper from '../../Cart/includes/CartStepper';

import { mergeCss } from '../../../utils/cssUtil';

const { COUPON_OFFERS } = languageDefinations();

const styles = mergeCss('components/Cart/CartPaymentSideBar/sideBar');

const { CART_PAGE } = languageDefinations();
class CartAndPaymentSideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const {
      checkoutBtnHandler, showCheckoutBtn, showInstant,
      hideUpSell, showStepper, increaseItemCnt, decreaseItemCnt,
      insnt_item_listing_id, isPdp, couponData, getCartResults, data, hideCouponCode,
    } = this.props;
    const {
      items, total_price, total_offer_price,
      total_discount, total_shipping, tax, item_cnt, currency,
    } = this.props.data;
    return (
      <div className={`${styles['right-bar']}`}>
        <div className={`${styles['coupon-code-main']} ${styles['pb-10']}`}>
          <h4 className={`${styles['fs-16']} ${styles.fontW600} ${styles['m-0']} ${styles['p-10']} ${styles.flex} ${styles['justify-center']} ${styles['white-color']}`}>
            <SVGComponent clsName={`${styles['buy-coupon-code']}`} src="icons/common-icon/buy-coupon" />
            <span className={styles['pl-5']}>{COUPON_OFFERS.BUY_AND_EARN}</span>
          </h4>
          {
          hideCouponCode ? null : data.coupon_code ?
            <span className={`${styles['p-10']} ${styles['m-20']} ${styles['applied-coupon']} ${styles.flex} ${styles['flex-center']}`}>
              <SVGComponent clsName={`${styles['coupon-code']}`} src="icons/common-icon/coupon-code" />
              <span className={`${styles['pl-5']} ${styles.flex} ${styles.width100} ${styles['flex-center']} ${styles['justify-between']} `}>
                <div>
                  <div className={`${styles.applied}`}>{COUPON_OFFERS.OFFER_APPLIED}</div>
                  <div >{data.coupon_code}</div>
                </div>
                <div className={`${styles.pointer} ${styles['lgt-blue']}`} onClick={this.props.openSlider}>{COUPON_OFFERS.CHANGE}</div>
              </span>
            </span>
          :
            <span className={`${styles['flex-center']} ${styles['justify-center']} ${styles['p-10']} ${styles.flex} ${styles['m-20']} ${styles['apply-coupon']}`}>
              <SVGComponent clsName={`${styles['coupon-code']}`} src="icons/common-icon/coupon-code" />
              <div className={styles.noCoupon}>
              <span className={`${styles['text-uppercase']} ${styles['pl-5']}`} onClick={this.props.openSlider}>
              <div className={`${styles.pointer}`}>{COUPON_OFFERS.APPLY_COUPON}</div>
              </span>
              <div className={`${styles['light-gray']}`}>{'No Coupon Applied'}</div>
              </div>
            </span>
        }

        </div>
        {
        showInstant ?
          <div className={`${styles['p-10-20']}`}>
            <InstantCheckout
              insnt_item_listing_id={insnt_item_listing_id}
              isPdp={isPdp}
            />
          </div>
          : null
      }

        {
        showCheckoutBtn ?
          <div className={`${styles['p-10-20']}`}>
            <button className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['fp-btn-large']} ${styles['fs-18']} ${styles['flex-center']} ${styles['justify-center']}`} onClick={checkoutBtnHandler}>
              <SVGComponent clsName={`${styles['secure-checkout']}`} src="icons/common-icon/secure-checkout" />
              <span className={styles['pl-5']}>{CART_PAGE.SECURE_CHECKOUT}</span>
            </button>
          </div>
          : null
      }
        {
        hideUpSell ? null :
        <div className={`${styles['view-r-wishlist']} ${styles['p-10']} ${styles['border-radius4']} ${styles['border-radius4']}`}>
          <span className={`${styles['fs-12']}`}>Buy for 500 AED more and get 10% Off on your total purchase. <a className={styles['fs-14']}>View your wishlist</a></span>
        </div>
      }

        <div className={styles['p-20']}>
          <ul className={`${styles['m-0']} ${styles['p-0']} ${styles['fs-12']}`}>
            <li><h5 className={`${styles['mb-15']} ${styles['mt-5']} ${styles['fs-16']} ${styles.fontW600} ${styles['light-gry-clr']}`}>{CART_PAGE.ORDER_SUMMARY}</h5></li>
            <li>{CART_PAGE.PRICE} ({`${item_cnt} ${CART_PAGE.ITEMS}`})<span> {`${total_price} ${currency}`}</span></li>
            {
            showStepper ?
              <li>
                Quantity
                <span>
                  <CartStepper
                    item={items[0]}
                    increaseItemCnt={increaseItemCnt}
                    decreaseItemCnt={decreaseItemCnt}
                  />
                </span>
              </li> : null
          }
            <li>{CART_PAGE.DELIVERY_CHARGES} <span>{total_shipping} {currency}</span></li>
            {
            tax != 0 ? <li>{CART_PAGE.TAXES} <span>{currency}</span></li> : null
          }
            <li className={`${styles['mt-20']} ${styles['fs-16']} ${styles['light-gry-clr']} ${styles.flex} ${styles['flex-colum']}`}><b>{CART_PAGE.TOTAL_AMOUNT} <span>{`${total_offer_price} ${currency}`}</span></b>
              {
              total_discount > 0 ? <span className={`${styles['fs-12']} ${styles['thick-red']} ${styles['t-rt']}`}>You saved {total_discount} {currency}</span> : null
            }
            </li>

          </ul>
        </div>
      </div>
    );
  }
}

CartAndPaymentSideBar.propTypes = {
  data: PropTypes.object,
  getCouponOffers: PropTypes.func,
  applyTheCoupon: PropTypes.func,
  openSlider: PropTypes.func,

};

CartAndPaymentSideBar.defaultProps = {
  data: {},
  hideCouponCode: false,
  hideUpSell: false,
  showStepper: false,
  insnt_item_listing_id: '',
  getCouponOffers: f => f,
  applyTheCoupon: f => f,
  openSlider: f => f,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCouponOffers: actionCreators.getCouponOffers,
      getCartResults: cartActioncreators.getCartResults,
    },
    dispatch,
  );

export default connect(mapDispatchToProps)(CartAndPaymentSideBar);
