import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RightSideBar from '../../Cart/CartPaymentSideBar';
import constants from '../../../constants';
import { actionCreators as cartActionCreators, selectors as cartSelectors } from '../../../store/listingCart';
import { actionCreators as compareActions, selectors } from '../../../store/compare';
import { selectors as authSelectors } from '../../../store/auth';
import { languageDefinations } from '../../../utils/lang';
import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../product_en.styl';
import styles_ar from '../product_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

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

  componentDidMount() {
    this.props.getCompareCount();
  }

  componentWillReceiveProps(nextProps) {
    let { showCheckoutModal } = this.state;
    if (nextProps && nextProps.listingCartData.ui.loader) {
      showCheckoutModal = true;
    }
    if (nextProps && nextProps.listingCartData.ui.hideLoader) {
      showCheckoutModal = false;
    }
    this.setState({ showCheckoutModal });
  }

  addToCart() {
    const { listingId, getCartResults } = this.props;
    this.props.addToCart({
      listing_id: listingId,
    }, listingId).then(() => {
      document.getElementsByTagName('BODY')[0].style.overflow = 'hidden';
    });
  }

  addToCompare({ target }) {
    const {
      addToCompare, product_id, itemtype, media, title, categoryId, removeCompareData, catalogObj,
    } = this.props;
    const src = `${constants.mediaDomain}/${media}`;
    if (target.checked) {
      addToCompare({
        itemtype,
        productId: product_id,
        src,
        displayName: title.attribute_values[0].value,
        categoryId,
        catalogObj,
      });
    } else removeCompareData(product_id);
  }

  checkoutInstantHandler() {
    const { showCheckoutModal } = this.state;
    const { listingCartData, removeCartItem } = this.props;

    if (!showCheckoutModal) { // adding item to cart
      this.addToCart();
    } else { // removing item from cart.
      document.getElementsByTagName('BODY')[0].style.overflow = 'auto';
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
      brand, title, rating, product_id,
      totalInventoryCount, isPreview, listingCartData, comparable, cmpData, isLoggedIn,
    } = this.props;
    const { showCheckoutModal } = this.state;
    return (
      <div className={styles['pb-10']}>
        <div className={`${styles.fontW300} ${styles['lgt-blue']} ${styles['flx-space-bw']}`}>
          <span>{brand.attribute_values[0].value}</span>
          {/* eslint-disable-next-line no-nested-ternary */}
          {isPreview ? null : comparable ?
            <div className={`${styles['checkbox-material']} ${styles['add-to-compare']}`}>
              <input
                id="add-to-compare"
                type="checkbox"
                onChange={this.addToCompare}
                checked={cmpData.products &&
                  _.findIndex(cmpData.products, o => o.productId === product_id) > -1}
              />
              <label htmlFor="add-to-compare"> {PDP_PAGE.ADD_TO_COMPARE}</label>
            </div>
            :
            null
          }
          {/* {
            cmpData.map(childFitler => (
              <div className={styles['checkbox-material']}>
                <input id="add-to-compare" type="checkbox" onChange={this.addToCompare} />
                <label for="add-to-compare"> {PDP_PAGE.ADD_TO_COMPARE} </label>
              </div>
            ))
          } */}
        </div>
        <h1 className={`${styles['fs-18']} ${styles.fontW700} ${styles['black-color']} ${styles['mt-0']} ${styles['mb-0']} ${!title.translation ? styles['direction-ir'] : ''}`}>{title.attribute_values[0].value}</h1>
        {
          isPreview
            ?
            null
            :
            <div className={`${styles.flex} ${styles['fs-12']}`}>
              <div className={`${styles['ti-rating-wrap']} ${styles['pr-5']}`}>
                <span className={styles['pt-5']}>{rating.rating} {rating.count}</span>
              </div>
            </div>
        }
        {
          isPreview
            ?
            null
            :
            <div className={`${styles['flex-center']} ${styles['checkout-instantly']} ${styles['pt-5']}`}>
              <div className={`${styles.flex}`}>
                {totalInventoryCount > 0 && isLoggedIn &&
                  <a className={`${styles['fp-btn']} ${styles['fp-btn-default']} ${styles['fs-14']} ${styles['mr-10']} ${styles['small-btn']} ${styles['checkout-instant-btn']}`} onClick={this.checkoutInstantHandler}>{PDP_PAGE.CHECKOUT_INSTANT}</a>}
              </div>
              <div className={styles['flex']}>
                {
                  totalInventoryCount < 5
                    ?
                    <span className={`${styles.flex} ${styles['fs-12']} ${styles['google-clr']} ${styles['pr-10']} ${styles.fontW600}`}>
                      {
                        totalInventoryCount === 0
                          ?
                            PDP_PAGE.PRODUCT_OUT_OF_STOCK
                          :
                            `${PDP_PAGE.ONLY} ${totalInventoryCount} ${PDP_PAGE.LEFT_IN_STOCK}`
                        }
                    </span>
                    :
                    null
                }
                <span className={`${styles.flex} ${styles['fs-12']}`}>{PDP_PAGE.COD_AVAILABLE}</span>
              </div>
              <React.Fragment>
                <div className={showCheckoutModal ? `${styles['modalContainer']} ${styles['showDiv']}` : `${styles['modalContainer']} ${styles['hideDiv']}`}>
                  <div className={`${styles['disabled']}`} onClick={this.checkoutInstantHandler}></div>
                </div>
                <div className={`${styles['modal']} ${showCheckoutModal ? styles['showModal'] : styles['hideModal']}`}>
                  <div className={styles['modalFill']}>
                    {showCheckoutModal &&
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
                      />}
                  </div>
                </div>
              </React.Fragment>
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
  isLoggedIn: authSelectors.getLoggedInStatus(store),
  cmpData: selectors.getCmpData(store),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addToCart: cartActionCreators.addToCart,
  cartItemCount: cartActionCreators.cartItemCount,
  getListingCartResults: cartActionCreators.getListingCartResults,
  removeCartItem: cartActionCreators.removeCartItem,
  addToCompare: compareActions.addToCompare,
  getCompareCount: compareActions.getCompareCount,
  removeCompareData: compareActions.removeCompareData,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TitleInfo);

// export default TitleInfo;
