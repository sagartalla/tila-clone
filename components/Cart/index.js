import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Grid } from 'react-bootstrap';
import { Router } from '../../routes';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, selectors } from '../../store/cart';
import { actionCreators as wishlistActionCreators, selectors as wishlistSelectors } from '../../store/cam/wishlist';

import HeaderBar from '../HeaderBar/index';
import CartBody from './includes/CartBody';

import { mergeCss } from '../../utils/cssUtil';
const styles = mergeCss('components/Cart/cart');

class Cart extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showBlocker: false
    }

    this.checkoutBtnHandler = this.checkoutBtnHandler.bind(this);
    this.removeCartItem = this.removeCartItem.bind(this);
    this.increaseItemCnt = this.increaseItemCnt.bind(this);
    this.decreaseItemCnt = this.decreaseItemCnt.bind(this);
    this.addToWishlist = this.addToWishlist.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.results.ui.loader && nextProps.results.ui.loader == 'hide') {
      this.setState({ showBlocker: false });
    }
  }

  componentDidMount() {
    this.props.getCartResults();
  }

  checkoutBtnHandler() {
    Router.pushRoute('/payment');
  }

  removeCartItem(e) {
    this.props.removeCartItem(e.target.id);
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

  //TODO after add to cart, discuss with backend team whether to call cart item or not.
  addToWishlist(e) {
    const { results } = this.props;
    const listing_id = e.target.getAttribute('data-id');
    const item = results.items.filter(_item => listing_id == _item.item_id)[0];
    this.props.addToWishlist({
      "catalog_id": item.item_id,
      "product_id": item.product_id,
      "variant_id": item.variant_id
    });
  }

  render() {
    const { showBlocker } = this.state;
    const { results } = this.props;
    return (
      <div>
        <HeaderBar />
        <Grid>
          <CartBody
            data={results}
            showBlocker={showBlocker}
            checkoutBtnHandler={this.checkoutBtnHandler}
            removeCartItem={this.removeCartItem}
            increaseItemCnt={this.increaseItemCnt}
            decreaseItemCnt={this.decreaseItemCnt}
            addToWishlist={this.addToWishlist}
          />
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  results: selectors.getCartResults(store),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCartResults: actionCreators.getCartResults,
      removeCartItem: actionCreators.removeCartItem,
      cartItemCount: actionCreators.cartItemCount,
      addToWishlist: wishlistActionCreators.addToWishlist,
    },
    dispatch,
  );

Cart.propTypes = {
  results: PropTypes.object,
};

Cart.defaultProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
