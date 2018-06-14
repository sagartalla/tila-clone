import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, selectors } from '../../../store/cam/wishlist';
import WishlistBody from './includes/WishlistBody';

import { isAddedToCart } from '../../../store/cart/selectors';

import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Cam/Wishlist/wishlist');

class Wishlist extends Component {

  constructor(props) {
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    this.props.getWishlist();
  }

  deleteItem(e) {
    this.props.deleteWishlist(e.target.id)
  }

  addToCart(e) {
    this.props.addToCart({
      listing_id: e.target.id
    });
  }

  render() {
    const { results } = this.props;
    return (
      <div className={`${styles['wishlist']} ${styles['pl-20']}`}>
        <WishlistBody
          data={results}
          deleteItem={this.deleteItem}
          addToCart={this.addToCart}
        />
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
