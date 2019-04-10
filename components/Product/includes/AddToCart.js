import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Cookie from 'universal-cookie';

import { selectors, actionCreators } from '../../../store/cart';
import { Router } from '../../../routes';
import { languageDefinations } from '../../../utils/lang';
import SVGCompoent from '../../common/SVGComponet';
import { mergeCss } from '../../../utils/cssUtil';
import Button from '../../common/CommonButton';

const styles = mergeCss('components/Product/product');

const cookies = new Cookie();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

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
    const { productData } =this.props
    this.props.addToCartAndFetch({
      listing_id: listingId,product_id: productData,
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
       Router.pushRoute(`/${country}/${language}/payment`);
    }
  }

  componentDidMount() {
    this.props.resetAddtoCart();
  }

  render () {
    const { isLoading, error, isAddedToCart, offerInfo, btnLoading } = this.props;
    const { price, listingAvailable, listingId, stockError, availabilityError } = offerInfo;
    return (availabilityError || stockError)
    ?
    null
    :
    (
      <div className={`${styles['pt-25']} ${styles['flx-space-bw']} ${styles['addto-cart']} ${styles['ipad-p-0']} ${styles['border-t']}`}>
        <Button
          className={`${styles['fs-16']} ${styles['ipad-fs-14']} ${styles['add-to-card-btn']} ${styles['flex']}`}
          disabled={isLoading || isAddedToCart}
          onClick={isAddedToCart === false && this.addToCart}
          btnLoading={btnLoading}
          btnText={isAddedToCart ? '' : 'Add To Cart'}
          showImage={isAddedToCart && 'icons/cart/added-cart-icon'}
        />
        <Button
          className={`${styles['fs-16']} ${styles['ipad-fs-14']} ${styles['buy-now-btn']}`}
          onClick={this.buyNow}
          btnText={PDP_PAGE.BUY_NOW}
          hoverClassName="hoverBlueBackground"
        />
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return ({
    btnLoading: selectors.getBtnLoaders(store),
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
