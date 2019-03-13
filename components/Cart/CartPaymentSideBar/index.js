import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Cookie from 'universal-cookie';
import SVGComponent from '../../common/SVGComponet';
import Blocker from '../../common/Blocker';
import { actionCreators } from '../../../store/cam/coupons';
import InstantCheckout from '../../common/InstantCheckout';
import { languageDefinations } from '../../../utils/lang/';
import { actionCreators as cartActioncreators } from '../../../store/cart';

import CartStepper from '../../Cart/includes/CartStepper';
import Slider from '../../common/slider';
import Coupon from '../CartPaymentSideBar/coupons/index';

import { mergeCss } from '../../../utils/cssUtil';

const cookies = new Cookie();

const styles = mergeCss('components/Cart/CartPaymentSideBar/sideBar');

const { CART_PAGE } = languageDefinations();
class CartAndPaymentSideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slider: false,
      showBlocker: false,
      hideCouponCode: props.hideCouponCode,
    };
  }
  openSlider = () => {
    let { showBlocker } = this.state;
    showBlocker = true;
    this.props.getCouponOffers(cookies.get('country')).then((res) => {
      if (res.value.status === 200 || res.value.status === 201 || res.value.status === 204) {
        this.setState({
          showBlocker: false,
        });
      }
    });
    this.setState({
      slider: true,
      showBlocker,
    });
  }
  closeSlider = () => {
    this.setState({
      slider: false,
    });
  }
  showOfferApplied = (data) => {
    this.setState({
      hideCouponCode: true,
      offerCode: data,
    });
  }
  render() {
    const {
      checkoutBtnHandler, showCheckoutBtn, showInstant,
      hideUpSell, showStepper, increaseItemCnt, decreaseItemCnt,
      insnt_item_listing_id, isPdp, couponData, getCartResults, viewData,
    } = this.props;
    const {
      items, total_price, total_offer_price,
      total_discount, total_shipping, tax, item_cnt, currency,
    } = this.props.data;
    const {
      slider, showBlocker, hideCouponCode, offerCode,
    } = this.state;
    return (
      <div className={`${styles['right-bar']}`}>
        <div className={`${styles['coupon-code-main']} ${styles['pb-10']}`}>
          <h4 className={`${styles['fs-16']} ${styles.fontW600} ${styles['m-0']} ${styles['p-10']} ${styles.flex} ${styles['justify-center']} ${styles['white-color']}`}>
            <SVGComponent clsName={`${styles['buy-coupon-code']}`} src="icons/common-icon/buy-coupon" />
            <span className={styles['pl-5']}>Buy & Earn 300 Reward Points</span>
          </h4>
          {
          hideCouponCode || viewData.coupon_code ?
            <span className={`${styles['p-10']} ${styles['m-20']} ${styles['applied-coupon']} ${styles.flex} ${styles['flex-center']}`}>
              <SVGComponent clsName={`${styles['coupon-code']}`} src="icons/common-icon/coupon-code" />
              <span className={`${styles['pl-5']} ${styles.flex} ${styles.width100} ${styles['flex-center']} ${styles['justify-between']} `}>
                <div>
                  <div className={`${styles.applied}`}>Offer Applied</div>
                  <div >{offerCode === '' || offerCode === undefined ? viewData.coupon_code : offerCode}</div>
                </div>
                <div className={`${styles.pointer} ${styles['lgt-blue']}`} onClick={this.openSlider}>Change</div>
              </span>
            </span>
          :
            <span className={`${styles['flex-center']} ${styles['justify-center']} ${styles['p-10']} ${styles.flex} ${styles['m-20']} ${styles['apply-coupon']}`}>
              <SVGComponent clsName={`${styles['coupon-code']}`} src="icons/common-icon/coupon-code" />
              <span className={`${styles['text-uppercase']} ${styles['pl-5']}`} onClick={this.openSlider}><div className={`${styles.pointer}`}>Apply Coupon Code</div></span>
            </span>
        }

        </div>
        {showBlocker ? <Blocker /> :
        slider &&
          <Slider
            closeSlider={this.closeSlider}
            isOpen={slider}
            label="Coupons"
          >
            <Coupon
              couponData={couponData}
              getCartResults={getCartResults}
              closeSlider={this.closeSlider}
              showOfferApplied={this.showOfferApplied}
            />
          </Slider>
        }
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

};

CartAndPaymentSideBar.defaultProps = {
  data: {},
  hideCouponCode: false,
  hideUpSell: false,
  showStepper: false,
  insnt_item_listing_id: '',
  getCouponOffers: f => f,
  applyTheCoupon: f => f,
};
const mapStateToProps = ({ couponOffersData, cartReducer }) => {
  // const { couponOffersData, cartReducer } = store;
  const {
    couponData,
  } = couponOffersData;
  const {
    data,
  } = cartReducer;
  return {
    couponData,
    viewData: data,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCouponOffers: actionCreators.getCouponOffers,
      getCartResults: cartActioncreators.getCartResults,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(CartAndPaymentSideBar);