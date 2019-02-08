import React, { Component, Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, selectors } from '../../../store/cam/wishlist';

import WishlistBody from './includes/WishlistBody';
import CartBottomPopup from './includes/CartBottomPopup';
import CartMiniWishList from './includes/CartMiniWishList';

// import { isAddedToCart } from '../../../store/cart/selectors';
import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Cam/Wishlist/wishlist');

class Wishlist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showCartPageBtmPopup: false
    }
    this.deleteItem = this.deleteItem.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.showCartPageBtmPopup = this.showCartPageBtmPopup.bind(this);
  }

  componentDidMount() {
    this.props.getWishlist();
  }

  deleteItem(e) {
    this.props.deleteWishlist(e.currentTarget.id)
  }

  showCartPageBtmPopup() {
    this.setState({
      showCartPageBtmPopup: !this.state.showCartPageBtmPopup
    });
  }

  addToCart(e) {
    this.props.addToCart({
      listing_id: e.target.id
    }, e.target.getAttribute('data-wish-id'), e.target.getAttribute('data-cart-res'));
  }

  render() {
    const { results, cartMiniWishList } = this.props;
    const { showCartPageBtmPopup } = this.state;
    return (
      <div className={`${styles['wishlist']} ${styles['pl-5']}`}>
        {
          cartMiniWishList ?
            <Fragment>
              <CartMiniWishList
                data={results}
                showCartPageBtmPopup={this.showCartPageBtmPopup}
              />
              {
                showCartPageBtmPopup ?
                  <CartBottomPopup
                    data={results}
                    addToCart={this.addToCart}
                    showCartPageBtmPopup={this.showCartPageBtmPopup}
                  />
                  : null
              }
            </Fragment>
            :
            <WishlistBody
              data={results}
              deleteItem={this.deleteItem}
              addToCart={this.addToCart}
            />
        }

      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  results: selectors.getWishListResults(store)
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getWishlist: actionCreators.getWishlist,
      deleteWishlist: actionCreators.deleteWishlist,
      addToCart: actionCreators.addToCart,
    },
    dispatch,
  );

Wishlist.propTypes = {
  results: PropTypes.array,
};

Wishlist.defaultProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
