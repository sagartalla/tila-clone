import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { languageDefinations } from '../../../utils/lang/';
import SVGComponent from '../../common/SVGComponet';
import { actionCreators } from '../../../store/coupons';
import { selectors as instantCheckoutSelectors } from '../../../store/common/instantCheckout'
import InstantCheckout from '../../common/InstantCheckout';
import { actionCreators as cartActioncreators } from '../../../store/cart';

import CartStepper from '../../Cart/includes/CartStepper';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './sideBar_en.styl';
import styles_ar from './sideBar_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const { COUPON_OFFERS, CART_PAGE } = languageDefinations();


class CartAndPaymentSideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      iframe_url:''
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
  componentWillReceiveProps(nextProps) {
    if(nextProps.getInstantCheckoutdata && nextProps.getInstantCheckoutdata.iframe_url) {
      this.setState({ iframe_url:nextProps.getInstantCheckoutdata.iframe_url })
    }
  }
  render() {
    const {
      checkoutBtnHandler, showCheckoutBtn, showInstant,
      hideUpSell, showStepper, increaseItemCnt, decreaseItemCnt,
      insnt_item_listing_id, isPdp, couponData, getCartResults, data, hideCouponCode,
    } = this.props;

    const {
      items, total_price, total_offer_price, total_gift_charges,
      total_discount, total_shipping, tax, item_cnt, currency, total_tila_care_charges,
    } = data;
    const { iframe_url} = this.state;
    return (
      <div className={`${styles['right-bar']}`}>
        <div className={`${styles['coupon-code-main']}`}>
          <h4 className={`${styles['fs-12']} ${styles.fontW600} ${styles['m-0']} ${styles['p-0']} ${styles.flex} ${styles['justify-center']} ${styles['white-color']}`}>
            {/*<SVGComponent clsName={`${styles['buy-coupon-code']}`} src="icons/common-icon/buy-coupon" />
          <span className={styles['pl-5']}>{COUPON_OFFERS.BUY_AND_EARN}</span> */}
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
            <span className={`${styles['flex-center']} ${styles['justify-center']} ${styles['pt-5']} ${styles['pb-5']} ${styles['pr-10']} ${styles['pl-10']} ${styles.flex} ${styles['m-10']} ${styles['apply-coupon']} ${styles.pointer}`} onClick={this.props.openSlider}>
              {lang === 'en' ? <SVGComponent clsName={`${styles['coupon-code']}`} src="icons/common-icon/coupon-code-border" /> : <SVGComponent clsName={`${styles['coupon-code']}`} src="icons/common-icon/coupon-code-border-ar" /> }
              <div className={`${styles.noCoupon} ${styles['ml-5']}`}>
                <span className={`${styles['text-uppercase']} ${styles['pl-5']}`}>
                  <div className={`${styles['fs-14']} ${styles['coupon-text']}`}>{COUPON_OFFERS.APPLY_COUPON}</div>
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
              // isFromCart={isFromCart}
              totalPrice={total_price.display_value}
              moneyValue={total_price.money_value}
              currency={currency}
              isMounted={false}
            />
          </div>
          : null
      }

        {
        showCheckoutBtn ?
          <div className={`${styles['pt-10']} ${styles['pb-10']} ${styles['pr-20']} ${styles['pl-20']}`}>
            <button className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['right-radius']} ${styles['fp-btn-large']} ${styles['fs-18']} ${styles['flex-center']} ${styles['justify-center']}`} onClick={checkoutBtnHandler}>
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
      { !iframe_url ?
        <div className={styles['p-10-20']}>
          <ul className={`${styles['m-0']} ${styles['p-0']} ${styles['fs-12']}`}>
            <li>
              <h5 className={`${styles['mb-5']} ${styles['mt-5']} ${styles['fs-16']} ${styles.fontW600} ${styles['light-gry-clr']}`}>
                {CART_PAGE.ORDER_SUMMARY}
              </h5>
            </li>
            <li><span className={styles['thick-gry-clr']}>{CART_PAGE.PRICE} ({`${item_cnt} ${CART_PAGE.ITEMS}`})</span>
             <span>
               <span className={`${styles['fs-12']}`}>{total_offer_price.currency_code || currency}</span>&nbsp;
               <span className={`${styles['fs-14']}`}>{total_offer_price.display_value}</span>
               </span>
            </li>
            {showStepper ?
              <li>
                <span className={styles['thick-gry-clr']}>{CART_PAGE.QUANTITY}</span>
                <span>
                  <CartStepper
                    item={items[0]}
                    increaseItemCnt={increaseItemCnt}
                    decreaseItemCnt={decreaseItemCnt}
                  />
                </span>
              </li> : null
            }
            <li>
              <span className={styles['thick-gry-clr']}>{CART_PAGE.DELIVERY_CHARGES}</span>
              {total_shipping.money_value > 0 ?
                <span>
                <span className={`${styles['fs-12']}`}>{total_shipping.currency_code || currency}</span>&nbsp;
                <span className={`${styles['fs-14']}`}>{total_shipping.display_value || 0}</span>
                </span> :
                <span className={`${styles.flex}`}><SVGComponent clsName={styles['ship-icon']} src={lang === 'en' ? "icons/free-shipping" : "icons/Arabic-Freeshipping" }/></span>
              }
            </li>
            {total_gift_charges.display_value &&
            <li>
              <span className={styles['thick-gry-clr']}>{CART_PAGE.GIFT_CHARGES}</span>
              <span>
              <span className={`${styles['fs-12']}`}>{total_gift_charges.currency_code || currency}</span>&nbsp;
              <span className={`${styles['fs-14']}`}>{total_gift_charges.display_value}</span>
              </span>
            </li>}
            {
            tax !== 0 ?
              <li>
                <span className={styles['thick-gry-clr']}>{CART_PAGE.DELIVERY_CHARGES}</span>
                {total_shipping.money_value > 0 ?
                  <span>{total_shipping.currency_code || currency} {total_shipping.display_value || 0}</span> :
                  <span className={`${styles.flex}`}><SVGComponent clsName={styles['ship-icon']} src={lang === 'en' ? "icons/free-shipping" : "icons/Arabic-Freeshipping" }/></span>
                }
              </li> : null}
              {total_tila_care_charges !== null &&
              <li>
                <span className={styles['thick-gry-clr']}>{CART_PAGE.TILA_CARE_PROTECTION}</span>
                <span>
                  {total_tila_care_charges &&
                  <span>
                    <span className={`${styles['fs-12']}`}>{total_tila_care_charges.currency_code}</span>&nbsp;
                    <span className={`${styles['fs-14']}`}>{total_tila_care_charges.display_value}</span>
                    </span>
                    }
                </span>
              </li>
            }
            <li className={`${styles['mt-20']} ${styles['fs-16']} ${styles['light-gry-clr']}`}>
              <b>{CART_PAGE.TOTAL_AMOUNT}</b>
              <span className={`${styles.flex} ${styles['flex-colum']} ${styles['t-rt']}`}>
                <span className={styles.fontW600}>
                <span className={`${styles['fs-12']}`}>{total_price.currency_code || currency}</span>&nbsp;
                <span>{total_price.display_value}</span>
                </span>
              </span>
            </li>
            {total_discount.money_value > 0 ?
                  <span className={`${styles['fs-12']} ${styles['display-block']} ${styles['thick-red-clr']} ${styles['t-rt']}`}>{CART_PAGE.YOU_SAVED}&nbsp;
                  <span className={`${styles['fs-12']}`}>{total_discount.currency_code || currency}</span>&nbsp;
                  <span>{total_discount.display_value}</span></span>
                  : null
                }
          </ul>
        </div> : null}
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
const mapStateToProps = (store) => {
  return {
    getInstantCheckoutdata: instantCheckoutSelectors.getInstantCheckoutResData(store),
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCouponOffers: actionCreators.getCouponOffers,
      getCartResults: cartActioncreators.getCartResults,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(CartAndPaymentSideBar);
