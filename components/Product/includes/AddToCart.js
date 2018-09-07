import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectors, actionCreators } from '../../../store/cart';
import { Router } from '../../../routes';
import { languageDefinations } from '../../../utils/lang';
import SVGCompoent from '../../common/SVGComponet';
import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Product/product');

const { PDP_PAGE } = languageDefinations();
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
    this.props.addToCartAndFetch({
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
    if(this.state.buyNow == true && nextProps.isAddedToCart){
       Router.pushRoute('/payment');
    }
  }

  componentDidMount() {
    this.props.resetAddtoCart();
  }

  render () {
    const { isLoading, error, isAddedToCart, offerInfo } = this.props;
    const { price, listingAvailable, listingId, stockError, availabilityError } = offerInfo;
    return (availabilityError || stockError)
    ?
    null
    :
    (
      <div className={`${styles['pt-25']} ${styles['flx-space-bw']} ${styles['addto-cart']} ${styles['ipad-p-0']} ${styles['border-t']}`}>
        <button className={`${styles['fp-btn']} ${styles['fp-btn-default']} ${styles['fs-18']} ${styles['ipad-fs-14']} ${styles['add-to-card-btn']} ${styles['flex']}`} onClick={this.addToCart} disabled={isLoading || isAddedToCart} >{isAddedToCart ? <SVGCompoent clsName={`${styles['added-cart-icon']}`} src="icons/cart/added-cart-icon" /> : PDP_PAGE.ADD_TO_CART}</button>
        <button className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['fs-18']} ${styles['ipad-fs-14']} ${styles['buy-now-btn']}`} onClick={this.buyNow}>{PDP_PAGE.BUY_NOW}</button>
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
    {
      addToCartAndFetch: actionCreators.addToCartAndFetch,
      resetAddtoCart: actionCreators.resetAddtoCart,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);
