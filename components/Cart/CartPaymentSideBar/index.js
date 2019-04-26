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

const { COUPON_OFFERS, CART_PAGE } = languageDefinations();

import lang from '../../../utils/language';

import styles_en from './sideBar_en.styl';
import styles_ar from './sideBar_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;


class CartAndPaymentSideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }
  removeCoupon = () => {
    const {
      getCartResults,
    } = this.props;
    getCartResults({
      remove_coupon: true,
    });
  }
  render() {
    const {
      checkoutBtnHandler, showCheckoutBtn, showInstant,
      hideUpSell, showStepper, increaseItemCnt, decreaseItemCnt,
      insnt_item_listing_id, isPdp, couponData, getCartResults, data, hideCouponCode,
    } = this.props;

    console.log('showinstant', showInstant);
    const {
      items, total_price, total_offer_price, total_gift_charges,
      total_discount, total_shipping, tax, item_cnt, currency,
    } = this.props.data;
    return (
      <div className={`${styles['right-bar']}`}>
        <div className={`${styles['coupon-code-main']}`}>
          <h4 className={`${styles['fs-12']} ${styles.fontW600} ${styles['m-0']} ${styles['p-0']} ${styles.flex} ${styles['justify-center']} ${styles['white-color']}`}>
            {/*<SVGComponent clsName={`${styles['buy-coupon-code']}`} src="icons/common-icon/buy-coupon" />
          <span className={styles['pl-5']}>{COUPON_OFFERS.BUY_AND_EARN}</span>*/}
          </h4>
          {
          hideCouponCode ? null : data.coupon_code ?
            <span className={`${styles['pt-5']} ${styles['pb-5']} ${styles['pr-10']} ${styles['pl-10']} ${styles['m-20']} ${styles['applied-coupon']} ${styles.flex} ${styles['flex-center']}`}>
              <SVGComponent clsName={`${styles['coupon-code']}`} src="icons/common-icon/coupon-code" />
              <span className={`${styles['pl-5']} ${styles.flex} ${styles.width100} ${styles['flex-center']} ${styles['justify-between']} `}>
                <div>
                  <div className={`${styles.applied} ${styles['fs-10']}`}>{COUPON_OFFERS.OFFER_APPLIED}</div>
                  <div className={styles['fs-12']}>{data.coupon_code}</div>
                </div>
                <div className={`${styles.pointer} ${styles['lgt-blue']} ${styles['fs-12']}`} onClick={this.removeCoupon}>{COUPON_OFFERS.REMOVE}</div>
              </span>
            </span>
          :
            <span className={`${styles['flex-center']} ${styles['justify-center']} ${styles['pt-5']} ${styles['pb-5']} ${styles['pr-10']} ${styles['pl-10']} ${styles.flex} ${styles['m-20']} ${styles['apply-coupon']} ${styles.pointer}`} onClick={this.props.openSlider}>
              <SVGComponent clsName={`${styles['coupon-code']}`} src="icons/common-icon/coupon-code" />
              <div className={styles.noCoupon}>
              <span className={`${styles['text-uppercase']} ${styles['pl-5']}`}>
              <div className={styles['fs-12']}>{COUPON_OFFERS.APPLY_COUPON}</div>
              </span>
              </div>
            </span>
        }

        </div>
        {
        showInstant ?
          <div className={`${styles['p-10-0']}`}>
            <InstantCheckout
              insnt_item_listing_id={insnt_item_listing_id}
              isPdp={isPdp}
              totalPrice={total_price}
              currency={currency}
              isMounted={false}
            />
          </div>
          : null
      }

        {
        showCheckoutBtn ?
          <div className={`${styles['pt-10']} ${styles['pb-10']} ${styles['pr-20']} ${styles['pl-20']}`}>
            <button className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['fp-btn-large']} ${styles['fs-18']} ${styles['flex-center']} ${styles['justify-center']}`} onClick={checkoutBtnHandler}>
              <SVGComponent clsName={`${styles['secure-checkout']}`} src="icons/common-icon/secure-checkout" />
              <span className={styles['pl-5']}>{CART_PAGE.SECURE_CHECKOUT}</span>
            </button>
          </div>
          : null
      }
        {/*
        hideUpSell ? null :
        <div className={`${styles['view-r-wishlist']} ${styles['p-10']} ${styles['border-radius4']} ${styles['border-radius4']}`}>
          <span className={`${styles['fs-12']}`}>Buy for 500 AED more and get 10% Off on your total purchase. <a className={styles['fs-14']}>View your wishlist</a></span>
        </div>
      */}

        <div className={styles['p-20']}>
          <ul className={`${styles['m-0']} ${styles['p-0']} ${styles['fs-12']}`}>
            <li><h5 className={`${styles['mb-15']} ${styles['mt-5']} ${styles['fs-16']} ${styles.fontW600} ${styles['light-gry-clr']}`}>{CART_PAGE.ORDER_SUMMARY}</h5></li>
            <li><span>{CART_PAGE.PRICE} ({`${item_cnt} ${CART_PAGE.ITEMS}`})</span><span> {`${total_offer_price} ${currency}`}</span></li>
            {
            showStepper ?
              <li>
                <span>{CART_PAGE.QUANTITY}</span>
                <span>
                  <CartStepper
                    item={items[0]}
                    increaseItemCnt={increaseItemCnt}
                    decreaseItemCnt={decreaseItemCnt}
                  />
                </span>
              </li> : null
          }
            <li><span>{CART_PAGE.DELIVERY_CHARGES} </span><span>{total_shipping} {currency}</span></li>
            <li><span>{CART_PAGE.GIFT_CHARGES} </span><span>{total_gift_charges} {currency}</span></li>
            {
            tax !== 0 ? <li><span>{CART_PAGE.TAXES}</span> <span>{currency}</span></li> : null
          }
            <li className={`${styles['mt-20']} ${styles['fs-16']} ${styles['light-gry-clr']}`}><b>{CART_PAGE.TOTAL_AMOUNT}</b>
            <span className={`${styles.flex} ${styles['flex-colum']} ${styles['t-rt']}`}><span className={styles['fontW600']}>{`${total_price} ${currency}`}</span>
              {
                total_discount > 0 ?
                  <span className={`${styles['fs-12']} ${styles['thick-red']} ${styles['t-rt']}`}>{CART_PAGE.YOU_SAVED} {total_discount} {currency}</span>
                : null
              }
              </span>
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
  getCartResults: PropTypes.func,

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
  getCartResults: f => f,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCouponOffers: actionCreators.getCouponOffers,
      getCartResults: cartActioncreators.getCartResults,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(CartAndPaymentSideBar);
