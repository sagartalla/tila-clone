import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SVGComponent from '../SVGComponet';

import InstantCheckout from '../InstantCheckout';
import { languageDefinations } from '../../../utils/lang/';

import CartStepper from '../../Cart/includes/CartStepper';

import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/common/CartPaymentSideBar/sideBar');

const { CART_PAGE } = languageDefinations();
const CartAndPaymentSideBar = props => {
  const { checkoutBtnHandler, showCheckoutBtn, showInstant, hideCouponCode, hideUpSell, showStepper, increaseItemCnt, decreaseItemCnt, insnt_item_listing_id } = props;
  const { items, total_price, total_offer_price, total_discount, total_shipping, tax, item_cnt, currency } = props.data;
  return (
    <div className={`${styles['right-bar']}`}>
      <div className={`${styles['coupon-code-main']} ${styles['pb-10']}`}>
        <h4 className={`${styles['fs-16']} ${styles['fontW600']} ${styles['m-0']} ${styles['p-10']} ${styles['flex']} ${styles['justify-center']} ${styles['white-color']}`}>
          <SVGComponent clsName={`${styles['buy-coupon-code']}`} src="icons/common-icon/buy-coupon" />
          <span className={styles['pl-5']}>Buy & Earn 300 Reward Points</span>
        </h4>
        {
          hideCouponCode ? null :
            <span className={`${styles['flex-center']} ${styles['justify-center']} ${styles['p-10']} ${styles['m-20']} ${styles['apply-coupon']}`}>
              <SVGComponent clsName={`${styles['coupon-code']}`} src="icons/common-icon/coupon-code" />
              <span className={`${styles['text-uppercase']} ${styles['pl-5']}`}>Apply Coupon Code</span>
            </span>
        }

      </div>

      {
        showInstant ?
          <div className={`${styles['p-10-20']}`}>
            <InstantCheckout insnt_item_listing_id={insnt_item_listing_id} />
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
          <li><h5 className={`${styles['mb-15']} ${styles['mt-5']} ${styles['fs-16']} ${styles['fontW600']} ${styles['light-gry-clr']}`}>{CART_PAGE.ORDER_SUMMARY}</h5></li>
          <li>{CART_PAGE.PRICE} ({item_cnt + ' ' + CART_PAGE.ITEMS})<span> {total_price + ' ' + currency}</span></li>
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
          <li className={`${styles['mt-20']} ${styles['fs-16']} ${styles['light-gry-clr']}`}><b>{CART_PAGE.TOTAL_AMOUNT} <span>{total_offer_price + ' ' + currency}</span></b>
            {
              total_discount > 0 ? <span className={`${styles['fs-12']} ${styles['thick-red']}`}>You saved {total_discount} {currency}</span> : null
            }
          </li>

        </ul>
      </div>
    </div>
  )
};

CartAndPaymentSideBar.propTypes = {
  data: PropTypes.object,
};

CartAndPaymentSideBar.defaultProps = {
  data: {},
  hideCouponCode: false,
  hideUpSell: false,
  showStepper: false,
  insnt_item_listing_id: ''
};

export default CartAndPaymentSideBar;
