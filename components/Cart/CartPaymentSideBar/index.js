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

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const { COUPON_OFFERS, CART_PAGE } = languageDefinations();


class CartAndPaymentSideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      iframe_url: '',
      codStatus: props.getCODStatus || false,
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
    if (nextProps.getInstantCheckoutdata && nextProps.getInstantCheckoutdata.iframe_url) {
      this.setState({ iframe_url: nextProps.getInstantCheckoutdata.iframe_url })
    }
    if (nextProps.getCODStatus!==undefined && nextProps.getCODStatus !== this.props.getCODStatus) {
      this.setState({
        codStatus: nextProps.getCODStatus,
      })
    }
  }


  render() {
    const {
      checkoutBtnHandler, showCheckoutBtn, showInstant, showStepper, increaseItemCnt, decreaseItemCnt,
      insnt_item_listing_id, isPdp, data, hideCouponCode,
    } = this.props;
    const {
      items, total_price, total_offer_price, total_gift_charges, total_vat,
      total_discount, payment_options_response, total_shipping, item_cnt, currency, total_tila_care_charges,
    } = data;
    const { iframe_url, codStatus } = this.state;
    const voucher = payment_options_response && payment_options_response.payment_options_available && payment_options_response.payment_options_available.filter((paymentMode) => paymentMode.type === 'VOUCHER')[0];
    const saved_card = payment_options_response && payment_options_response.payment_options_available && payment_options_response.payment_options_available.filter((paymentMode) => paymentMode.type === 'SAVED_CARD')[0];
    const cash_on_delivery = payment_options_response && payment_options_response.payment_options_available && payment_options_response.payment_options_available.filter((paymentMode) => paymentMode.type === 'CASH_ON_DELIVERY')[0];
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
                  <div className={`${styles.pointer} ${styles['lgt-blue']} ${styles['fs-12']}`} onClick={this.removeCoupon}>X</div>
                </span>
              </span>
              :
              <span className={`${styles['flex-center']} ${styles['justify-center']} ${styles['pt-5']} ${styles['pb-5']} ${styles['pr-10']} ${styles['pl-10']} ${styles.flex} ${styles['m-10']} ${styles['apply-coupon']} ${styles.pointer}`} onClick={this.props.openSlider}>
                {lang === 'en' ?
                  <img src="/static/img/icons/common-icon/coupon-layout-en.png" className={styles['coupon-code-blank']} />
                  : <SVGComponent clsName={`${styles['coupon-code-blank']}`} src="icons/common-icon/coupon-code-border-ar" />}
                <div className={`${styles.noCoupon} ${styles['ml-5']}`}>
                  <span className={`${styles['text-uppercase']} ${styles['pl-5']}`}>
                    <div className={`${styles['fs-14']}`}>{COUPON_OFFERS.APPLY_COUPON}</div>
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
                totalPrice={cash_on_delivery && cash_on_delivery && cash_on_delivery.amount_to_pay && cash_on_delivery.amount_to_pay.display_value} 
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
              <button className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['right-radius']} ${styles['fp-btn-large']} ${styles['fs-14']} ${styles['flex-center']} ${styles['justify-center']}`} onClick={checkoutBtnHandler}>
                <SVGComponent clsName={`${styles['secure-checkout']}`} src="icons/common-icon/secure-checkout" />
                <span className={`${styles['pl-5']} ${styles['text-uppercase']}`}>{CART_PAGE.SECURE_CHECKOUT}</span>
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
        {!iframe_url ?
          <div className={styles['p-10-20']}>
            <ul className={`${styles['m-0']} ${styles['p-0']} ${styles['fs-12']}`}>
              <li>
                <h5 className={`${styles['mb-5']} ${styles['mt-5']} ${styles['fs-16']} ${styles.fontW600} ${styles['light-gry-clr']}`}>
                  {CART_PAGE.ORDER_SUMMARY}
                </h5>
              </li>
              <li><span className={styles['thick-gry-clr']}>{CART_PAGE.PRICE} ({`${item_cnt} ${item_cnt === 1 ? CART_PAGE.ITEM : CART_PAGE.ITEMS}`})</span>
                <span>
                  <span className={`${styles['fs-10']}`}>{total_offer_price.currency_code || currency}</span>&nbsp;
               <span className={`${styles['fs-12']}`}>{total_offer_price.display_value}</span>
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
                    <span className={`${styles['fs-10']}`}>{total_shipping.currency_code || currency}</span>&nbsp;
                <span className={`${styles['fs-12']}`}>{total_shipping.display_value || 0}</span>
                  </span> :
                  <span className={`${styles.flex}`}><SVGComponent clsName={styles['ship-icon']} src={lang === 'en' ? "icons/free-shipping" : "icons/Arabic-Freeshipping"} /></span>
                }
              </li>
              {(total_gift_charges && total_gift_charges.display_value) ?
                <li>
                  <span className={styles['thick-gry-clr']}>{CART_PAGE.GIFT_CHARGES}</span>
                  <span>
                    <span className={`${styles['fs-10']}`}>{total_gift_charges.currency_code || currency}</span>&nbsp;
                    <span className={`${styles['fs-12']}`}>{total_gift_charges && total_gift_charges.display_value}</span>
                  </span>
                </li> : null}
              {
                total_vat && total_vat.display_value !== 0 ?
                  <li>
                    <span className={styles['thick-gry-clr']}>{CART_PAGE.ESTIMATED_VAT}</span>
                    {/* <span>{total_vat.currency_code || currency} {total_vat.display_value}</span>  */}
                    <span>
                      <span className={`${styles['fs-10']}`}>{total_vat.currency_code || currency}</span>&nbsp;
                        <span className={`${styles['fs-12']}`}>{total_vat.display_value}</span>
                    </span>
                  </li> : null}
              {total_tila_care_charges !== null &&
                <li>
                  <span className={styles['thick-gry-clr']}>{CART_PAGE.TILA_CARE_PROTECTION}</span>
                  <span>
                    {total_tila_care_charges &&
                      <span>
                        <span className={`${styles['fs-10']}`}>{total_tila_care_charges.currency_code}</span>&nbsp;
                    <span className={`${styles['fs-12']}`}>{total_tila_care_charges.display_value}</span>
                      </span>
                    }
                  </span>
                </li>
              }
              <hr />
              <li>
                <b>{CART_PAGE.CART_VALUE}</b>
                <span>
                  <span className={`${styles.flex} ${styles['flex-colum']} ${styles['t-rt']}`}>
                    <span className={styles.fontW600}>
                      <span className={`${styles['fs-10']}`}>{total_price.currency_code || currency}</span>&nbsp;
                <span>{total_price.display_value}</span>
                    </span>
                  </span>
                </span>
              </li>
              <li>
                <span className={styles['thick-gry-clr']}>{CART_PAGE.TILA_GIFT}</span>
                <span>
                  {voucher && voucher.amount_to_pay &&
                    <span>
                      <span className={`${styles['fs-12']}`}>{voucher.amount_to_pay.display_value}</span>
                    </span>
                  }
                </span>
              </li>
              {codStatus &&
                <li>
                  <span className={styles['thick-gry-clr']}>{CART_PAGE.COD_CHARGES}</span>
                  <span>
                    <span>
                      <span className={`${styles['fs-10']}`}>{cash_on_delivery.cod_charges.currency_code}</span>&nbsp;
                  <span className={`${styles['fs-12']}`}>{cash_on_delivery.cod_charges.display_value}</span>
                    </span>
                  </span>
                </li>
              }
              <hr />
              <li className={`${styles['mt-20']} ${styles['fs-16']} ${styles['light-gry-clr']}`}>
                <b>{CART_PAGE.AMOUNT_PAYABLE}</b>
                <span className={`${styles.flex} ${styles['flex-colum']} ${styles['t-rt']}`}>
                  <span className={styles.fontW600}>
                    <span className={`${styles['fs-12']}`}>{cash_on_delivery && cash_on_delivery && cash_on_delivery.amount_to_pay && cash_on_delivery.amount_to_pay.currency_code || currency}</span>&nbsp;
                <span>{codStatus ? (cash_on_delivery && cash_on_delivery && cash_on_delivery.amount_to_pay && cash_on_delivery.amount_to_pay.display_value) : (saved_card && saved_card.amount_to_pay.display_value)}</span>
                  </span>
                </span>
              </li>
              {total_discount && total_discount.money_value > 0 ?
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
    getCODStatus: instantCheckoutSelectors.getCODStatus(store),
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
