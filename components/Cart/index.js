import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Grid } from 'react-bootstrap';
import { Router } from '../../routes';
import { actionCreators, selectors } from '../../store/cart';
import { actionCreators as wishlistActionCreators, selectors as wishlistSelectors } from '../../store/cam/wishlist';

import HeaderBar from '../HeaderBar/index';
import CartBody from './includes/CartBody';
import MiniCartBody from './includes/MiniCartBody';
import FooterBar from '../Footer/index';
import { mergeCss } from '../../utils/cssUtil';
import Slider from '../common/slider';
import Coupon from '../Cart/CartPaymentSideBar/coupons';


const styles = mergeCss('components/Cart/cart');

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showBlocker: false,
      count: '',
      showSlider: false,
      newError: '',
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
    if (this.props.isError !== nextProps.isError && nextProps.isError !== '') {
      this.setState({
        newError: nextProps.isError,
        showSlider: true,
      });
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
      alert('There is some issue with cart items.');
    } else { Router.pushRoute('/payment'); }
  }

  removeCartItem(e) {
    const productId = e.currentTarget.getAttribute('data-productid');
    digitalData.cart.item = digitalData.cart.item.filter(item => item.productInfo.productID !== productId);
    this.props.removeCartItem(e.currentTarget.id);
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
    this.props.removeCartItem(listing_id);
  }

  addOrRemoveGift(e) {
    this.props.addOrRemoveGift(e.currentTarget.getAttribute('data-id'), e.currentTarget.checked ? 'add' : 'remove');
  }

  render() {
    const {
      showBlocker, count, showSlider, newError,
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
            label="Coupons"
          >
            <Coupon
              closeSlider={this.closeSlider}
              isError={newError}
              openSlider={this.openSlider}
              newData={cartData && cartData.coupon_code}
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
  isError: store.cartReducer.error,
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
  isError: PropTypes.string,
};

Cart.defaultProps = {
  isError: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
