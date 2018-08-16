import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Grid } from 'react-bootstrap';
import { Router } from '../../routes';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, selectors } from '../../store/cart';
import { actionCreators as wishlistActionCreators, selectors as wishlistSelectors } from '../../store/cam/wishlist';

import HeaderBar from '../HeaderBar/index';
import CartBody from './includes/CartBody';
import MiniCartBody from './includes/MiniCartBody';
import FooterBar from '../Footer/index';
import { mergeCss } from '../../utils/cssUtil';
const styles = mergeCss('components/Cart/cart');

class Cart extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showBlocker: false
    }

    this.addToWishlist = this.addToWishlist.bind(this);
    this.removeCartItem = this.removeCartItem.bind(this);
    this.increaseItemCnt = this.increaseItemCnt.bind(this);
    this.decreaseItemCnt = this.decreaseItemCnt.bind(this);
    this.addOrRemoveGift = this.addOrRemoveGift.bind(this);
    this.checkoutBtnHandler = this.checkoutBtnHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cartData.ui.loader && nextProps.cartData.ui.loader == 'hide') {
      this.setState({ showBlocker: false });
    }
  }

  componentDidMount() {
    if (!this.props.showMiniCart)
      this.props.getCartResults();
  }

  checkoutBtnHandler() {
    const { cartData } = this.props;
    const newRes = cartData.items.filter(data => data.inventory == 0);

    if (newRes.length) {
      alert('There is some issue with cart items.');
    } else
      Router.pushRoute('/payment');
  }

  removeCartItem(e) {
    this.props.removeCartItem(e.currentTarget.id);
  }

  increaseItemCnt(e) {
    this.cartItemCount(e.target.getAttribute('data-id'), 'add');
  }

  decreaseItemCnt(e) {
    this.cartItemCount(e.target.getAttribute('data-id'), 'remove');
  }

  cartItemCount(id, typ) {
    this.setState({ showBlocker: true })
    this.props.cartItemCount(id, typ);
  }

  addToWishlist(e) {
    const { cartData } = this.props;
    const listing_id = e.currentTarget.getAttribute('data-id');
    const item = cartData.items.filter(_item => listing_id == _item.item_id)[0];
    this.props.addToWishlistAndFetch({
      "catalog_id": item.item_id,
      "product_id": item.product_id,
      "variant_id": item.variant_id
    });
    this.cartItemCount(listing_id, 'remove');
  }

  addOrRemoveGift(e) {
    this.props.addOrRemoveGift(e.currentTarget.getAttribute('data-id'), e.currentTarget.checked ? 'add' : 'remove');
  }

  render() {
    const { showBlocker } = this.state;
    const { cartData, editCartDetails, showCheckOutBtn } = this.props;
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
                  data={cartData}
                  showBlocker={showBlocker}
                  addToWishlist={this.addToWishlist}
                  removeCartItem={this.removeCartItem}
                  increaseItemCnt={this.increaseItemCnt}
                  decreaseItemCnt={this.decreaseItemCnt}
                  addOrRemoveGift={this.addOrRemoveGift}
                  checkoutBtnHandler={this.checkoutBtnHandler}
                />
              </Grid>
              <FooterBar />
            </Fragment>
        }
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  cartData: selectors.getCartResults(store),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCartResults: actionCreators.getCartResults,
      removeCartItem: actionCreators.removeCartItem,
      cartItemCount: actionCreators.cartItemCount,
      addOrRemoveGift: actionCreators.addOrRemoveGift,
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
