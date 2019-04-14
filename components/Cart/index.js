import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Router } from '../../routes';
import { Row, Col, Grid } from 'react-bootstrap';
import Cookie from 'universal-cookie';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import { languageDefinations } from '../../utils/lang/';
import { actionCreators, selectors } from '../../store/cart';
import { actionCreators as wishlistActionCreators, selectors as wishlistSelectors } from '../../store/cam/wishlist';
import HeaderBar from '../HeaderBar/index';
import CartBody from './includes/CartBody';
import MiniCartBody from './includes/MiniCartBody';
import FooterBar from '../Footer/index';
import Slider from '../common/slider';
import Coupon from '../Cart/CartPaymentSideBar/coupons';

const { CART_PAGE } = languageDefinations();

import lang from '../../utils/language';

import styles_en from './cart_en.styl';
import styles_ar from './cart_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;

const cookies = new Cookie();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showBlocker: false,
      count: '',
      showSlider: false,
    };

    this.addToWishlist = this.addToWishlist.bind(this);
    this.removeCartItem = this.removeCartItem.bind(this);
    this.increaseItemCnt = this.increaseItemCnt.bind(this);
    this.decreaseItemCnt = this.decreaseItemCnt.bind(this);
    this.addOrRemoveGift = this.addOrRemoveGift.bind(this);
    this.checkoutBtnHandler = this.checkoutBtnHandler.bind(this);
    this.cartStepperInputHandler = this.cartStepperInputHandler.bind(this);
  }

  componentDidMount() {
    if (!this.props.showMiniCart) {
      this.props.getCartResults();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cartData.ui.loader && nextProps.cartData.ui.loader == 'hide') {
      this.setState({ showBlocker: false });
    }
  }

  cartStepperInputHandler(e) {
    const { cartData } = this.props;
    const id = e.target.getAttribute('data-id');
    const count = e.target.value;
    const selelecItem = cartData.items.filter(item => item.item_id == id)[0];

    this.setState({ count: selelecItem.max_limit < count ? selelecItem.max_limit : count });
    this.props.cartItemInputCount(id, 'add', selelecItem.max_limit < count ? selelecItem.max_limit : count);
  }
  openSlider = () => {
    this.setState({
      showSlider: true,
    });
  }
  closeSlider = () => {
    this.setState({
      showSlider: false,
    });
  }

  checkoutBtnHandler() {
    const { cartData } = this.props;
    const newRes = cartData.items.filter(data => data.inventory == 0);
    if (newRes.length) {
      toast.warn(CART_PAGE.THERE_IS_SOME_ISSUE_WITH_CART_ITEMS);
    } else {
      Router.pushRoute(`/${country}/${language}/payment`);
    }
  }

  removeCartItem(e) {
    let productId = e.currentTarget.getAttribute('data-productId')
    digitalData.cart.item = digitalData.cart.item.filter((item) => {
      return item.productInfo.productID !== productId
    })
    this.props.removeCartItem(e.currentTarget.id, { showToast: true});
  }

  increaseItemCnt(e) {
    const productId = e.target.getAttribute('data-productid');
    digitalData.cart.item = digitalData.cart.item.map((item) => {
      if (item.productInfo.productID === productId) {
        item.quantity++;
      }

      return item;
    });
    this.cartItemCount(e.target.getAttribute('data-id'), 'add');
  }

  decreaseItemCnt(e) {
    const productId = e.target.getAttribute('data-productid');
    digitalData.cart.item.forEach((item) => {
      if (item.productInfo.productID === productId) {
        item.quantity--;
      }
    });
    this.cartItemCount(e.target.getAttribute('data-id'), 'remove');
  }

  cartItemCount(id, typ) {
    this.setState({ showBlocker: true });
    this.props.cartItemCount(id, typ);
  }

  addToWishlist(e) {
    const { cartData } = this.props;
    const listing_id = e.currentTarget.getAttribute('data-id');
    const item = cartData.items.filter(_item => listing_id == _item.item_id)[0];
    this.props.addToWishlistAndFetch({
      catalog_id: item.item_id,
      product_id: item.product_id,
      variant_id: item.variant_id,
      wishlisted_price: item.price,
      wishlisted_currency: item.cur,
    });
    this.props.removeCartItem(listing_id, {
      showToast: false,
    });
  }

  addOrRemoveGift(id, val, params) {
    this.props.addOrRemoveGift(id, val, params);
  }

  render() {
    const {
      showBlocker, count, showSlider,
    } = this.state;
    const {
      cartData, editCartDetails, showCheckOutBtn, isLoading, couponData, getCartResults,
    } = this.props;
    return (
      <div>
        {
          this.props.showMiniCart
            ?
              <div>
                <MiniCartBody
                  data={cartData}
                  showBlocker={showBlocker}
                  editCartDetails={editCartDetails}
                  showCheckOutBtn={showCheckOutBtn}
                  removeCartItem={this.removeCartItem}
                  increaseItemCnt={this.increaseItemCnt}
                  decreaseItemCnt={this.decreaseItemCnt}
                  checkoutBtnHandler={this.checkoutBtnHandler}
                />
              </div>
            :
              <Fragment>
                <HeaderBar />
                <Grid>
                  <CartBody
                    count={count}
                    data={cartData}
                    showBlocker={showBlocker}
                    isLoading={isLoading}
                    addToWishlist={this.addToWishlist}
                    openSlider={this.openSlider}
                    removeCartItem={this.removeCartItem}
                    increaseItemCnt={this.increaseItemCnt}
                    decreaseItemCnt={this.decreaseItemCnt}
                    addOrRemoveGift={this.addOrRemoveGift}
                    checkoutBtnHandler={this.checkoutBtnHandler}
                    cartStepperInputHandler={this.cartStepperInputHandler}
                    cartData={cartData}
                  />
                </Grid>
                <FooterBar />
              </Fragment>
        }
        {
        showSlider &&
          <Slider
            closeSlider={this.closeSlider}
            isOpen={showSlider}
            label={CART_PAGE.COUPONS}
          >
            <Coupon
              closeSlider={this.closeSlider}
              openSlider={this.openSlider}
            />
          </Slider>
        }
      </div>
    );
  }
}

const mapStateToProps = store => ({
  cartData: selectors.getCartResults(store),
  isLoading: store.cartReducer.ui.loading,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCartResults: actionCreators.getCartResults,
      removeCartItem: actionCreators.removeCartItem,
      cartItemCount: actionCreators.cartItemCount,
      addOrRemoveGift: actionCreators.addOrRemoveGift,
      cartItemInputCount: actionCreators.cartItemInputCount,
      addToWishlistAndFetch: wishlistActionCreators.addToWishlistAndFetch,
    },
    dispatch,
  );

Cart.propTypes = {
  cartData: PropTypes.object,
};

Cart.defaultProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
