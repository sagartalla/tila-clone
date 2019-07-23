import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Cookie from 'universal-cookie';

import { selectors, actionCreators } from '../../../store/cart';
import { Router } from '../../../routes';
import { languageDefinations } from '../../../utils/lang';
import ProductPrice from '../includes/ProductPrice';

import Button from '../../common/CommonButton';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../product_en.styl';
import styles_ar from '../product_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};


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

  componentDidMount() {
    this.props.resetAddtoCart();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.buyNow == true && nextProps.isAddedToCart) {
      Router.pushRoute(`/${language}/payment`);
    }
  }

  addToCart() {
    const { listingId } = this.props.offerInfo
    const { productData } =this.props
    this.props.addToCartAndFetch({
      listing_id: listingId,
      product_id: productData,
    });
  }

  buyNow() {
    this.setState({
      buyNow: true
    }, () => {
      this.addToCart();
    });
  }

  render() {
    const {
      isLoading, error, isAddedToCart, offerInfo, btnLoading, shippingInfo, showLoading,
      isPreview, styling, top, userDetails, notifyEmail, notify, onChangeField, emailErr,
    } = this.props;
    const { price, listingAvailable, listingId, stockError, availabilityError } = offerInfo;
    return (
      <div id="cart-btn-cont" className={`${styles['addto-cart']} ${styles['addto-cart-lang']} ${styles[styling]}`} style={{top: `${top}px`}}>
        <React.Fragment>
          {!isPreview &&
            <ProductPrice
              notifyEmail={notifyEmail}
              isPreview={isPreview}
              shippingInfo={shippingInfo}
              offerInfo={offerInfo}
              notify={notify}
              emailErr={emailErr}
              showLoading={showLoading}
              onChangeField={onChangeField}
              userDetails={userDetails}
            />}
          {
          (availabilityError || stockError) && (shippingInfo === null || shippingInfo.shippable)
          ?
          null
          :
          (
            <div className={`${styles['pt-10']} ${styles['flx-space-bw']} ${styles['ipad-p-0']}`}>
              <Button
                className={`${styles['fs-16']} ${styles['ipad-fs-14']} ${styles['add-to-card-btn']} ${styles['text-uppercase']} ${styles['flex']}`}
                disabled={isLoading || isAddedToCart}
                onClick={isAddedToCart === false ? this.addToCart : undefined}
                btnLoading={btnLoading}
                btnText={isAddedToCart ? '' : PDP_PAGE.ADD_TO_CART}
                showImage={isAddedToCart && 'icons/cart/added-cart-icon'}
              />
              <Button
                className={`${styles['fs-16']} ${styles['ipad-fs-14']} ${styles['text-uppercase']} ${styles['buy-now-btn']}`}
                onClick={this.buyNow}
                btnText={PDP_PAGE.BUY_NOW}
                hoverClassName="hoverBlueBackground"
              />
            </div>
          )
          }
        </React.Fragment>
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
  });
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addToCartAndFetch: actionCreators.addToCartAndFetch,
      resetAddtoCart: actionCreators.resetAddtoCart,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);
