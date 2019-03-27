import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from 'react-router-modal';

import RightSideBar from '../../Cart/CartPaymentSideBar';
import constants from '../../../constants';
import { actionCreators as cartActionCreators, selectors as cartSelectors } from '../../../store/listingCart';
import { actionCreators as compareActions } from '../../../store/compare/actions';
import { languageDefinations } from '../../../utils/lang';
import { mergeCss } from '../../../utils/cssUtil';

const styles = mergeCss('components/Product/product');
const { PDP_PAGE } = languageDefinations();

/*
  -- DON'T REMOVE

  brand: 'Apple',
  title: 'Iphone X Without Facetime Space Gray 64GB 4G LTE',
  rating: {
    rating: 4,
    count: 187
  },
  reviews: {
    count: 25
  },
  price: '1600.000 SAR',
  originalPrice: '1949.00 SAR',
  discountPercent: '-60%',
*/

class TitleInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCheckoutModal: false,
    };
    this.addToCart = this.addToCart.bind(this);
    this.addToCompare = this.addToCompare.bind(this);
    this.increaseItemCnt = this.increaseItemCnt.bind(this);
    this.decreaseItemCnt = this.decreaseItemCnt.bind(this);
    this.checkoutInstantHandler = this.checkoutInstantHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { showCheckoutModal } = this.state;
    if (nextProps && nextProps.listingCartData.ui.loader) {
      this.setState({ showCheckoutModal: true });
    }
    if (nextProps && nextProps.listingCartData.ui.hideLoader) {
      this.setState({ showCheckoutModal: false });
    }
  }

  addToCart() {
    const { showCheckoutModal } = this.state;
    const { listingId, getCartResults } = this.props;
    this.props.addToCart({
      listing_id: this.props.listingId,
    }, this.props.listingId);
  }

  addToCompare() {
    const {
      addToCompare, product_id, itemtype, media, title, categoryId,
    } = this.props;
    const src = `${constants.mediaDomain}/${media}`;
    this.props.addToCompare({
      itemtype,
      productId: product_id,
      src,
      displayName: title,
      categoryId,
    });
  }

  checkoutInstantHandler() {
    const { showCheckoutModal } = this.state;
    const { listingCartData, listingId, removeCartItem } = this.props;

    if (!showCheckoutModal) { // adding item to cart
      this.addToCart();
    } else { // removing item from cart.
      removeCartItem(listingCartData.items[0].cart_item_id);
    }
  }

  increaseItemCnt(e) {
    this.cartItemCount(e.target.getAttribute('data-id'), 'add');
  }

  decreaseItemCnt(e) {
    this.cartItemCount(e.target.getAttribute('data-id'), 'remove');
  }

  cartItemCount(id, typ) {
    this.props.cartItemCount(id, typ, this.props.listingId);
  }

  render() {
    const {
 brand, title, rating, reviews, price, originalPrice, discountPercent, totalInventoryCount, isPreview, listingId, listingCartData, comparable
} = this.props;
    const { showCheckoutModal } = this.state;
    return (
      <div className={styles['pb-10']}>
        <div className={`${styles.fontW300} ${styles['lgt-blue']} ${styles['flx-space-bw']}`}>
          <span>{brand}</span>
          {isPreview ? null : comparable ? <a className={`${styles['black-color']} ${styles.fontW700}`} href="javascript: void(0)" onClick={this.addToCompare}>{PDP_PAGE.ADD_TO_COMPARE}</a> : null}
        </div>
        <div className={`${styles['fs-20']} ${styles.fontW700} ${styles['black-color']}`}>{title}</div>
        {
          isPreview
            ?
            null
            :
            <div className={`${styles.flex} ${styles['fs-12']} ${styles['pt-5']}`}>
              <div className={`${styles['ti-rating-wrap']} ${styles['pr-5']}`}>
                {rating.rating} {rating.count}
              </div>
            </div>
        }
        {
          isPreview
            ?
            null
            :
            <div className={`${styles['flex-center']} ${styles['checkout-instantly']} ${styles['pt-10']}`}>
              <div className={`${styles.flex}`}>
                {totalInventoryCount > 0 &&
                  <a className={`${styles['fp-btn']} ${styles['fp-btn-default']} ${styles['small-btn']}`} onClick={this.checkoutInstantHandler}>{PDP_PAGE.CHECKOUT_INSTANT}</a>}
              </div>
              <div>
                {
                  totalInventoryCount < 5
                    ?
                      <span className={`${styles.flex} ${styles['fs-12']} ${styles['google-clr']} ${styles.fontW600}`}>{PDP_PAGE.ONLY} {totalInventoryCount} {PDP_PAGE.LEFT_IN_STOCK}</span>
                    :
                    null
                }

                <span className={`${styles.flex} ${styles['fs-12']}`}>{PDP_PAGE.COD_AVAILABLE}</span>
              </div>

              {showCheckoutModal ?
                <Modal className={`react-router-modal__modal ${styles['right-side-modal']}`} onBackdropClick={this.checkoutInstantHandler}>
                  <RightSideBar
                    data={listingCartData}
                    hideUpSell
                    showInstant
                    showStepper // only for PDP
                    isPdp
                    hideCouponCode
                    insnt_item_listing_id={listingCartData.items.length > 0 ? listingCartData.items[0].listing_id : ''}
                    increaseItemCnt={this.increaseItemCnt}
                    decreaseItemCnt={this.decreaseItemCnt}
                  />
                </Modal>
                : null
              }
            </div>
        }
        {/* <div className={`${styles['fs-18']} ${styles['fontW600']} ${styles['black-color']}`}>
          <div className={styles['ti-current-price']}>{price}</div>
          <div className={styles['ti-original-price']}>{originalPrice}</div>
          <div className={styles['ti-discount-percent']}>{discountPercent}</div>
        </div> */}
      </div>
    );
  }
}

TitleInfo.propTypes = {
  brand: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  rating: PropTypes.object.isRequired,
  reviews: PropTypes.object.isRequired,
  price: PropTypes.string.isRequired,
  originalPrice: PropTypes.string.isRequired,
  discountPercent: PropTypes.string.isRequired,
};

const mapStateToProps = store => ({
  listingCartData: cartSelectors.getListingCartResults(store),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    addToCart: cartActionCreators.addToCart,
    cartItemCount: cartActionCreators.cartItemCount,
    getListingCartResults: cartActionCreators.getListingCartResults,
    removeCartItem: cartActionCreators.removeCartItem,
    addToCompare: compareActions.addToCompare,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TitleInfo);

// export default TitleInfo;
