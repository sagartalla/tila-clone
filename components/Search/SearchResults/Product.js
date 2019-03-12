// params: { columnIndex, key, rowIndex, style }
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import Waypoint from 'react-waypoint';

import { Router } from '../../../routes';
import constants from '../../../constants';
import { actionCreators } from '../../../store/cam/wishlist';
import { actionCreators as compareActions  } from '../../../store/compare/actions';
import SVGCompoent from '../../common/SVGComponet';
import { mergeCss } from '../../../utils/cssUtil';
import { languageDefinations } from '../../../utils/lang';
import { Modal } from 'react-bootstrap';
import NotifyMe from '../../common/NotifyMe/NotifyMe';

import RenderVariants from './renderVariants'
const styles = mergeCss('components/Search/search');
const { PDP_PAGE } = languageDefinations()

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNotify: false,
      src:'',
      selectedIndex:0,
      showLoader:false
    };
    this.setImg = this.setImg.bind(this);
    this.addToWishlist = this.addToWishlist.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.buyNow = this.buyNow.bind(this);
    this.addToCompare = this.addToCompare.bind(this);
    this.notify = this.notify.bind(this);
    this.closeNotify = this.closeNotify.bind(this);
    this.selectedVariant = this.selectedVariant.bind(this);
    this.closeVariantTab = this.closeVariantTab.bind(this);
  }

  setImg() {
    const { media = [] } = this.props;
    this.setState({
      src: `${constants.mediaDomain}/${media[0]}`,
    });
  }

  addToWishlist(e) {
    e.stopPropagation();
    const {
      productId: product_id, catalogId: catalog_id, variants, priceRange, currency, addToWishlistAndFetch,
    } = this.props;
    addToWishlistAndFetch({
      catalog_id,
      product_id,
      wishlisted_price: priceRange,
      wishlisted_currency: currency,
    });
  }

  buyNow(e) {
    e.stopPropagation();
    const { variants } = this.props;
    this.props.buyNow(variants.listingId[0]);
  }



  notify(e) {
    e.stopPropagation();
    const { userDetails, productId, notifyMe } = this.props;
    if (userDetails.isLoggedIn) {
      notifyMe({
        product_id: productId,
        email: userDetails.userCreds && userDetails.userCreds.username,
      });
    } else {
      this.setState({
        showNotify: true,
      });
    }
  }

  closeNotify() {
    this.setState({
      showNotify: false,
    });
  }

  addToCart(e) {
    e.stopPropagation();
    const {
      productId,
      productName,
      brand,
      media,
      variants,
      itemtype,
      currency,
      addToCart
    } = this.props;

    if(variants.length <= 1) {
      this.props.addToCart(variants[0].listingId[0])
    } else {
      let id = [productId]
      this.props.selectedProduct(id)
    }
    // digitalData.cart.item.push({
    //   productInfo:{
    //     productID:productId,
    //     productName:productName,
    //     manufacturer:brand,
    //     productImage:media[0]
    //   },
    //   category:{
    //     primaryCategory:itemtype
    //   },
    //   price:{
    //     basePrice:variants.sellingPrice[0],
    //     currency
    //   },
    //   quantity:1
    // })
  }
  componentWillReceiveProps() {
    this.setState({showLoader:false})
  }
  getOfferClassName(offer) {
    if (offer > 10 && offer < 20) {
      return 'green'
    }
    if (offer > 20 && offer < 40) {
      return 'yellow'
    }
    if (offer > 40 && offer < 60) {
      return 'orange';
    }
    if (offer > 60) {
      return 'red';
    }
  }
  closeVariantTab(e) {
    e.stopPropagation();
    this.props.selectedProduct([])
  }
  selectedVariant(listingId,index) {
    const { addToCart } = this.props
    this.setState({
      selectedIndex:index,
      showLoader:true
    },() =>{
      this.props.addToCart(listingId);
    })
  }
  itemNumberClick = (index,pageNum) => {
    let productInfo = {
      pageFragmentation:pageNum,
      itemPosition:index
    }
    digitalData.product.push(productInfo)
    var event = new CustomEvent('event-pageItem-click');
    document.dispatchEvent(event);
  }
  routeChange(productId,variantId,catalogId,itemtype,index,pageNum) {
    this.itemNumberClick(index,pageNum)
    Router.pushRoute(`/product?productId=${productId}${variantId ? `&variantId=${variantId}` : ''}&catalogId=${catalogId}&itemType=${itemtype}`)
  }

  addToCompare(e) {
    e.stopPropagation();
    const {
      productId, itemtype, media, displayName, categoryId,
    } = this.props;
    console.log('categoryId', categoryId);
    const src = `${constants.mediaDomain}/${media[0]}`;
    this.props.addToCompare({
      itemtype,
      productId,
      src,
      displayName,
      categoryId,
    });
  }

  render() {
    const {
      media = [],
      displayName,
      variants,
      productId,
      variantId,
      catalogId,
      itemtype,
      priceRange,
      currency,
      offers,
      addedToCart,
      addedToWishlist,
      brand,
      index,
      pageNum,
      userDetails,
      selectedID,
      flags
    } = this.props;
    const { showNotify,selectedIndex,showLoader } = this.state;
    const selectedProduct = selectedID.length > 0 && selectedID.includes(productId)
    return (
      <Fragment>
        <div
          className=
          {
            `${styles['product-items-main']} ${selectedProduct ? styles['active-product'] : ''}`}
            onClick = {() => this.routeChange(productId,variantId,catalogId,itemtype,index,pageNum)}>
          <div className={`${styles['product-items']}`}>
            {
              showLoader ? <div className={styles['loader-div']}>
                <SVGCompoent clsName={`${styles['loader-styl']}`} src="icons/common-icon/circleLoader" />
              </div> : null
            }

            <div className={`${styles['img-cont']} ${styles['border-radius4']} ${styles['relative']}`}>
              <div className={styles['image-div']}>
                <Waypoint onEnter={this.setImg}>
                  <img src={this.state.src} />
                </Waypoint>
              </div>

              <span className={`${styles['variants-main']}`}></span>
              <span className={styles['full-and-globe-main']}>
                <span className={`${styles['fullfill-main']} ${styles['flex-center']}`}>
                  <span className={styles['fulfill-img']}></span>
                  <span className={`${styles['fs-12']} ${styles['fontW600']} ${styles['pl-10']} ${styles['fullfilled-label']}`}>{PDP_PAGE.FULLFILLED_BY_TILA}</span>
                </span>
              </span>
            </div>
            <div className={styles['desc-cont']}>
              <div className={`${styles['pb-20']} ${styles['pl-20']} ${styles['flex']} ${styles['flex-colum']}`}>
                <h5 className={`${styles['prdt-name']} ${styles['pt-15']} ${styles['pb-5']}  ${styles['m-0']} ${styles['ellips']}`}>
                  <span className={`${styles['fontW600']}`}>{brand}</span> <span className={`${styles['thick-gry-clr']} ${styles['fontW300']}`}>{displayName.replace(brand, '').trim()}</span>
                </h5>
                <span>
                  <span className={`${styles['pr-5']} ${styles['fs-12']} ${styles['fontW600']}`}>{currency}</span>
                  {
                    variants.length > 0  &&
                    <span
                    className={`${styles['fs-16']} ${styles['fontW700']}`}>{variants[selectedIndex].sellingPrice[0]}
                   </span>

                }
                </span>
              </div>
              {/* <div className={styles['variant-info']}>
                {
                  _.map(variants, (variantValues, key) => <div key={key}>{`${key} : ${variantValues.join(', ')}`}</div>)
                }
              </div> */}
            </div>
            <div className={
                `${selectedProduct ? `${styles['display-buttons']} ${styles['active-product']}`: ''}  ${styles['hover-show-date']} ${styles['pb-10']} ${styles['relative']}
                 ${styles['pb-10']}`}
                >
              {
                variants.length > 0 ?
                <div className={`${styles['flex']} ${styles['justify-around']} ${styles['quick-view']} ${styles['border-radius4']}`}>
                  <a className={`${styles['flex']} ${styles['add-to-crt']}`} onClick={this.addToCart}>
                    {/* <SVGCompoent clsName={`${styles['cart-list']}`} src="icons/cart/blue-cart-icon" /> */}
                    <span>
                      <span className={styles['flex']}><SVGCompoent clsName={styles['cart-list']} src="icons/cart/blue-cart-icon" />{PDP_PAGE.ADD_TO_CART}</span>
                    </span>
                  </a>
                  <a className={`${styles['flex-center']} ${styles['buy-now-btn']}`} onClick={this.buyNow}>
                    <SVGCompoent clsName={`${styles['cart-list']}`} src="icons/cart/buy-icon" />
                    <span className={styles['pl-5']}>{PDP_PAGE.BUY_NOW}</span>
                  </a>
                </div>
                :
                <div className={`${styles['flex']} ${styles['justify-around']} ${styles['quick-view']} ${styles['border-radius4']}`}>
                  <a className={`${styles['flex-center']} ${styles['buy-now-btn']}`} onClick={this.notify}>
                    <span className={styles['pl-5']}>{PDP_PAGE.NOTIFY_ME}</span>
                  </a>
                </div>
              }
              <div className={`${styles['wish-list-part']} ${styles['flx-space-bw']}`}>
                <span className={styles['flex']}>
                  <a className={styles['flex-center']} onClick={this.addToWishlist}>
                    <SVGCompoent clsName={`${styles['wish-list']}`} src={addedToWishlist ? "icons/wish-list/wish-list-icon-red" : "icons/wish-list/wish-list-icon"} />
                    <span className={`${styles['pl-5']} ${styles['fs-12']}`} disabled={addedToWishlist}>{addedToWishlist ? `${PDP_PAGE.ADDED_TO_WISHLIST}` : `${PDP_PAGE.ADD_TO_WISHLIST}`}</span>
                  </a>
                </span>
                {flags.comparable &&
                <span className={styles['flex']}>
                  <a className={styles['flex-center']} onClick={this.addToCompare}>
                    <SVGCompoent clsName={`${styles['wish-list']}`} src="icons/cam/cam-icon" />
                    <span className={`${styles['pl-5']} ${styles['fs-12']}`}>{PDP_PAGE.ADD_TO_COMPARE}</span>
                  </a>
                </span>}
              </div>
              <div className={styles['brand-price-details']}>
                {/* <div> */}
                  {/* <h5 className={`${styles['prdt-name']}  ${styles['pb-5']} ${styles['m-0']}`}>
                    <span className={`${styles['fontW600']}`}>{brand}</span> <span className={`${styles['thick-gry-clr']} ${styles['fontW300']}`}>{displayName.replace(brand, '').trim()}</span>
                  </h5> */}
                  {/* <span className={`${styles['fs-12']} ${styles['label-gry-clr']}`}>Denim shirt with baseball shirt stiff collar and formal tie</span> */}
                {/* </div> */}
                <span className={`${styles['pr-5']} ${styles['fs-12']} ${styles['fontW600']}`}>{currency}</span>
                {variants.length > 0 && <span className={`${styles['fs-16']} ${styles['fontW700']}`}>{variants[selectedIndex].sellingPrice[0]}</span>}
                <div className={`${styles['flex']} ${styles['pt-5']}`}>
                  <span className={styles['flex']}>
                    <SVGCompoent clsName={`${styles['star-raing']}`} src="icons/common-icon/star-full-yellow" />
                    <SVGCompoent clsName={`${styles['star-raing']}`} src="icons/common-icon/star-full-yellow" />
                    <SVGCompoent clsName={`${styles['star-raing']}`} src="icons/common-icon/star-full-yellow" />
                    <SVGCompoent clsName={`${styles['star-raing']}`} src="icons/common-icon/star-full-yellow" />
                    <SVGCompoent clsName={`${styles['star-raing']}`} src="icons/common-icon/star-full-yellow" />
                  </span>
                  <span className={`${styles['label-gry-clr']} ${styles['pl-5']}`}>(153) </span>
                </div>
              </div>
              {/* <div className={styles['desc-cont']}>
                <div className={`${styles['prdt-name']} ${styles['fs-12']} ${styles['pt-15']} ${styles['pb-5']}`}><a href="#">{displayName}</a></div>
                <div>{priceRange}</div>
                <div className={styles['variant-info']}>
                  {
                    _.map(variants, (variantValues, key) => <div key={key}>{`${key} : ${variantValues.join(', ')}`}</div>)
                  }
                </div>
              </div> */}
            </div>
            {
              variants.length > 1 &&
                <RenderVariants
                  variantData={variants}
                  onSelectedVariant={this.selectedVariant}
                  isvisible={selectedProduct}
                  OncloseVariant={this.closeVariantTab}
                />
            }
          </div>
        </div>
        <Modal show={showNotify} onHide={this.closeNotify}>
          <Modal.Header closeButton>
            <Modal.Title>Notify Me</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NotifyMe
              pId={productId}
              closeNotify={this.closeNotify}
            />
          </Modal.Body>
        </Modal>
      </Fragment>
    );
  }
};

Product.propTypes = {
  media: PropTypes.array.isRequired,
  displayName: PropTypes.string.isRequired,
  variants: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addToWishlistAndFetch: actionCreators.addToWishlistAndFetch,
      addToCompare: compareActions.addToCompare,
    },
    dispatch,
  );
};

export default connect(null, mapDispatchToProps)(Product);



  // variants[selectedIndex].addedToCart ? <span className={styles['flex']}><SVGCompoent clsName={styles['cart-list']} src="icons/cart/added-cart-icon" />{PDP_PAGE.ADDED_TO_CART}</span> :
