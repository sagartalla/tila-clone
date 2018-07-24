import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectors, actionCreators } from '../../../store/cart';
import { Router } from '../../../routes';
import { languageDefinations } from '../../../utils/lang';

import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Product/product');

const { PDP } = languageDefinations();
//
// const AddToCart = ({addtocart}) => {
//   return(
//     <div className={`${styles['pt-25']} ${styles['flx-space-bw']} ${styles['addto-cart']} ${styles['border-t']}`}>
//       <a className={`${styles['fp-btn']} ${styles['fp-btn-default']} ${styles['fp-btn-x-large']}`}>ADD TO CART</a>
//       <a className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['fp-btn-x-large']}`}>BUY NOW</a>
//     </div>
//   );
// }

class AddToCart extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.addToCart = this.addToCart.bind(this);
    this.buyNow = this.buyNow.bind(this);
  }

  addToCart() {
    const { listingId } = this.props.offerInfo
    this.props.addToCart({
      listing_id: listingId
    });
  }

  buyNow() {
    this.setState({
      buyNow: true
    }, () => {
      this.addToCart();
    });
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.buyNow == true && (nextProps.isAddedToCart && !this.props.isAddedToCart)){
       Router.pushRoute('/cart');
    }
  }

  render () {
    const { isLoading, error, isAddedToCart, offerInfo } = this.props;
    const { price, listingAvailable, listingId, stockError, availabilityError } = offerInfo;
    return(
      <div className={`${styles['pt-25']} ${styles['flx-space-bw']} ${styles['addto-cart']} ${styles['border-t']}`}>
        <button className={`${styles['fp-btn']} ${styles['fp-btn-default']} ${styles['fp-btn-x-large']}`} onClick={this.addToCart} disabled={isLoading || isAddedToCart} >{PDP.ADD_TO_CART}</button>
        <button className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['fp-btn-x-large']}`} onClick={this.buyNow} disabled={isLoading || isAddedToCart} >{PDP.BUY_NOW}</button>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return ({
    isLoading: selectors.getLoadingStatus(store),
    error: selectors.getErrorMessege(store),
    isAddedToCart: selectors.isAddedToCart(store)
  })
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { addToCart: actionCreators.addToCart },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);
