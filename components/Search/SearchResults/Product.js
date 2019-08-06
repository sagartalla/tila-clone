// params: { columnIndex, key, rowIndex, style }
import React, { Component, Fragment } from 'react';
import Cookie from 'universal-cookie';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { Link } from '../../../routes';
import Waypoint from 'react-waypoint';
import { OverlayTrigger, Modal, Popover } from 'react-bootstrap';
import constants from '../../../constants';
import { actionCreators } from '../../../store/cam/wishlist';
import { actionCreators as authActionCreators } from '../../../store/auth';
import { actionCreators as compareActions } from '../../../store/compare/actions';
import SVGCompoent from '../../common/SVGComponet';
import { languageDefinations } from '../../../utils/lang';
import NotifyMe from '../../common/NotifyMe/NotifyMe';
import Button from '../../common/CommonButton';
import { selectors as cartSelector } from '../../../store/cart';
import { selectors as compareSelectors } from '../../../store/compare';
import { ShowPriceFormat, StrickedPriceFormat } from '../../common/PriceFormat';
import RenderVariants from './renderVariants';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../search_en.styl';
import styles_ar from '../search_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const { PDP_PAGE } = languageDefinations();

const cookies = new Cookie();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNotify: false,
      src: `${constants.mediaDomain}/${props.media[0]}` || '',
      selectedIndex: 0,
      showLoader: false,
      btnType: '',
    };
    this.setImg = this.setImg.bind(this);
    this.addToWishlist = this.addToWishlist.bind(this);
    // this.addToCart = this.addToCart.bind(this);
    // this.buyNow = this.buyNow.bind(this);
    this.addToCompare = this.addToCompare.bind(this);
    this.notify = this.notify.bind(this);
    this.closeNotify = this.closeNotify.bind(this);
    this.selectedVariant = this.selectedVariant.bind(this);
    this.closeVariantTab = this.closeVariantTab.bind(this);
    this.showVariants = this.showVariants.bind(this);
    this.preventDefaultClick = this.preventDefaultClick.bind(this);
    this.renderQuickView = this.renderQuickView.bind(this)
    this.leaveImg = this.leaveImg.bind(this);
  }
  componentWillReceiveProps() {
    this.setState({ showLoader: false });
  }

  getOfferClassName = (offer) => {
    if (offer >= 5 && offer < 20) {
      return 'green';
    }
    if (offer >= 20 && offer < 40) {
      return 'yellow';
    }
    if (offer >= 40 && offer < 60) {
      return 'orange';
    }
    if (offer >= 60) {
      return 'red';
    }
    return '';
  }

  setImg() {
    this.setState({
      src: '',
    });
  }

  leaveImg() {
    const { media = [] } = this.props;
    this.setState({
      src: `${constants.mediaDomain}/${media[0]}`,
    });
  }

  addToWishlist(e) {
    e.stopPropagation();
    e.preventDefault();
    const {
      productId: product_id, catalogId: catalog_id,
      variants, currency, addToWishlistAndFetch, wishlistId, deleteWishlist, userDetails,
    } = this.props;
    const { selectedIndex } = this.state;
    if (!userDetails.isLoggedIn) {
      this.props.showLoginScreen();
    } else if (wishlistId) {
      deleteWishlist(wishlistId);
    } else {
      addToWishlistAndFetch({
        catalog_id,
        product_id,
        variant_id: (variants && variants.length > 0 && variants[selectedIndex].variantId) || '',
        wishlisted_price: variants && variants[selectedIndex] && variants[selectedIndex].sellingPrice && variants[selectedIndex].sellingPrice[0],
        wishlisted_currency: currency,
      });
    }
  }

  notify(e) {
    e.stopPropagation();
    e.preventDefault();
    const { userDetails, productId, notifyMe, variantId } = this.props;
    if (userDetails.isLoggedIn) {
      notifyMe({
        product_id: productId,
        variant_id: variantId,
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

  showVariants(btnType) {
    return (e) => {
      e.stopPropagation();
      e.preventDefault();
      const { selectedIndex } = this.state;
      const {
        variants,
        productId,
        buyNow,
        addToCart,
        selectedProduct,
      } = this.props;

      if (variants.length <= 1) {
        (btnType === 'BUY_NOW' ? buyNow : addToCart)(variants[selectedIndex].listingId[0], this.props.productId);
      } else {
        const id = [productId];
        this.setState({ btnType }, () => {
          selectedProduct(id);
        });
      }
    };
  }

  closeVariantTab(e) {
    e.stopPropagation();
    e.preventDefault();
    this.props.selectedProduct([]);
  }

  selectedVariant(listingId, index) {
    const { addToCart, buyNow } = this.props;
    const { btnType } = this.state;
    this.setState({
      selectedIndex: index,
      showLoader: true,
    }, () => {
      if (btnType === 'BUY_NOW') {
        buyNow(listingId);
      } else addToCart(listingId);
    });
  }

  itemNumberClick = (index, pageNum) => {
    let productInfo = {
      pageFragmentation: pageNum,
      itemPosition: index
    };
    digitalData.product.push(productInfo);
    var event = new CustomEvent('event-pageItem-click');
    document.dispatchEvent(event);
  }

  routeChange(productId, variantId, catalogId, itemtype, index, pageNum) {
    this.itemNumberClick(index, pageNum);
    // Router.pushRoute(`/${language}/pdp/${displayName.replace(/\//g, '').split(' ').join('-').toLowerCase()}/c/${catalogId}/p/${productId}/l/${listing_id}/v/${variants.length > 0 && variants[selectedIndex].variantId ? `${variants[selectedIndex].variantId}` : ''}`)
  }

  preventDefaultClick(e) {
    if (e.target.nodeName === 'LABEL') {
      e.preventDefault();
      this.addToCompare(e.target.previousSibling.checked);
    }
  }
  renderQuickView(e) {
    e.preventDefault();
    const { selectedIndex } = this.state
    const { row, itemNum, showQuickView, variants } = this.props
    let vId = (variants.length > 0 && variants[selectedIndex].variantId)
    showQuickView(itemNum, row, vId)
  }
  addToCompare(checked) {
    const {
      productId, itemtype, media, displayName, categoryId, addToCompare, removeCompareData, catalogId: catalog_id, variants,
    } = this.props;
    const { selectedIndex } = this.state;    
    const src = `${constants.mediaDomain}/${media[0]}`;
    if (!checked) {
      addToCompare({
        itemtype,
        productId,
        src,
        displayName,
        categoryId,
        catalogObj: {
          product_id: productId,
          catalog_id,
          variant_id: (variants && variants.length > 0 && variants[selectedIndex].variantId) || '',
        },
      });
    } else removeCompareData(productId);
  }

  loaderClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
  }

  render() {
    const {
      displayName,
      variants,
      productId,
      variantId='',
      catalogId,
      itemtype,
      currency,
      brand,
      index,
      pageNum,
      selectedID,
      flags,
      addedToWishlist,
      cartButtonLoaders,
      btnLoading,
      cmpData,
      wishlistId,
      row,
      itemNum,
      media,
      isQuickView,
      listing_id
    } = this.props;
    const { src } = this.state;
    const { showNotify, selectedIndex, showLoader } = this.state;
    const selectedProduct = selectedID.length > 0 && selectedID.includes(productId);
    const discountValue = variants.length > 0 &&
      variants[selectedIndex].discount && Math.floor(variants[selectedIndex].discount[0]);
    const popover = (
      <Popover id={productId}>
        {variants.length > 0 && variants[selectedIndex].offersApplied &&
          variants[selectedIndex].offersApplied.map((offer, index) => <div key={`${offer}${index}`}>{offer}</div>)}
      </Popover>
    );

    const getPriceAndOffer = () => (
      <span>
        <span className={`${styles['fs-10']} ${styles['black-color']}`}>{currency}</span>&nbsp;
        <span
          className={`${styles['fs-16']} ${styles.fontW600} ${styles['black-color']}`}
        >
          <ShowPriceFormat showPrice={variants[selectedIndex].sellingPrice[0].toString()} strickedPrice={variants[selectedIndex].mrp[0].toString()} />
        </span>
        {discountValue > 5 &&
          <React.Fragment>
            <span className={`${styles['ml-5']} ${styles['label-gry-clr']} ${styles['fs-12']}`}>
              <s><StrickedPriceFormat showPrice={variants[selectedIndex].sellingPrice[0].toString()} strickedPrice={variants[selectedIndex].mrp[0].toString()}/></s>
            </span>
            {variants[selectedIndex].offersApplied &&
              variants[selectedIndex].offersApplied.length > 0 &&
              <OverlayTrigger
                placement="bottom"
                overlay={popover}
              >
                <span className={`${styles['success-green']} ${styles['ml-5']} ${styles.pointer}`}>
                  {variants[selectedIndex].offersApplied.length} offers
                </span>
              </OverlayTrigger>
            }
          </React.Fragment>}
      </span>
    );
    return (
      <Fragment>
        <div
          className={`${styles['product-items-main']} ${styles.relative} ${styles['p-0']} ${selectedProduct ? styles['active-product'] : ''}`}
          onClick={() => this.routeChange(productId, variantId, catalogId, itemtype, index, pageNum)}
        >
          <Link route={`/${language}/pdp/${displayName.replace(/\//g, '').split(' ').join('-').toLowerCase()}/c/${catalogId}/p/${productId}/l/${listing_id}/v/${variants.length > 0 && variants[selectedIndex].variantId ? `${variants[selectedIndex].variantId}` : ''}`}>
            <a target="_blank">
              <div className={`${styles['product-items']}`} onMouseEnter={this.setImg} onMouseLeave={this.leaveImg}>
                {showLoader ?
                  <div className={styles['loader-div']}>
                    <SVGCompoent clsName={`${styles['loader-styl']}`} src="icons/common-icon/circleLoader" />
                  </div> : null
                }
                {variants.length === 0 &&
                  <div className={styles['notify-me-part']}>
                    <h4 className={`${styles['fs-10']} ${styles['m-5']} ${styles['pr-5']} ${styles['black-color']}`}>{PDP_PAGE.OUT_OF_STOCK}</h4>
                    {/* <a className={`${styles['flex-center']} ${styles['notify-part-inn']} ${styles['white-color']} ${styles['fp-btn']} ${styles['right-radius']} ${styles['fp-btn-primary']}`} onClick={this.notify}>
                      <span className={styles['pl-5']}>{PDP_PAGE.NOTIFY_ME}</span>
                    </a> */}
                  </div>
                }
                <div className={`${styles['img-cont']} ${styles['border-radius4']} ${styles.relative}`}>
                  <div className={`${styles['image-div']} srp-slider`}>
                    {src ?
                      <img src={src} alt="imageURL" />
                      :
                      <Slider
                        className={`${styles['ht-100per']}`}
                        autoplay
                        arrows={false}
                        dots
                        autoplaySpeed={750}
                        pauseOnHover={false}
                      >
                        {media && media.slice(0, 5).map((image, index) => (
                          <div key={index}>
                            <img src={`${constants.mediaDomain}/${image}`} alt="imageURL" key={index} />
                          </div>
                        ))}
                      </Slider>
                    }
                  </div>
                  {/* <span className={`${styles['variants-main']}`}></span> */}
                  {/* <span className={styles['full-and-globe-main']}>
                    <span className={`${styles['fullfill-main']} ${styles['flex-center']}`}>
                      <span className={styles['fulfill-img']}></span>
                      <span className={`${styles['fs-12']} ${styles['fontW600']} ${styles['pl-10']} ${styles['fullfilled-label']}`}>{PDP_PAGE.FULLFILLED_BY_TILA}</span>
                    </span>
                  </span> */}
                  {discountValue >= 5 &&
                    <span className={`${styles.absolute} ${styles['offer-tag']} ${styles[this.getOfferClassName(discountValue)]}`}>
                      <span>{discountValue}% {PDP_PAGE.OFF}</span>
                    </span>}
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
                <div className={styles['desc-cont']}>
                  <div className={`${styles['pb-20']} ${styles['pl-20']} ${styles['pr-20']} ${styles.flex} ${styles['flex-colum']}`}>
                    <h5 className={`${styles['prdt-name']} ${styles['pt-15']} ${styles['pb-5']}  ${styles['m-0']}`}>
                      <span className={`${styles.fontW600} ${styles['black-color']}`}>{brand}</span> <span className={`${styles['thick-gry-clr']} ${styles.fontW300}`}>{displayName.replace(brand, '').substr(0, 55).trim()}</span>
                    </h5>
                    <span>
                      <span className={`${styles['pr-5']}`}>{variants.length > 0 && variants[selectedIndex].sellingPrice && getPriceAndOffer()}</span>
                      {/* <span className={`${styles['fs-12']} ${styles['black-color']}`}>{currency}</span> */}
                    </span>
                  </div>
                </div>
                <div className={`${selectedProduct ? `${styles['display-buttons']} ${styles['active-product']}` : ''}  ${styles['hover-show-date']} ${styles['pb-10']} ${styles.relative}`}>
                  {
                    variants.length > 0 ?
                      <div className={`${styles.flex} ${styles['justify-around']} ${styles['quick-view']} ${styles['border-radius4']}`}>
                        <Button
                          className={`${styles.flex} ${styles['add-to-crt']} ${styles.fontW600} ${styles['fs-10']} ${styles['text-uppercase']}`}
                          onClick={this.showVariants('ADD_TO_CART')}
                          disabled={btnLoading}
                          btnText={PDP_PAGE.ADD_TO_CART}
                          showImage="icons/cart/blue-cart-icon"
                          btnLoading={variants[selectedIndex].listingId && cartButtonLoaders[variants[selectedIndex].listingId[0]]}
                        />
                        <Button
                          className={`${styles['flex-center']} ${styles['buy-now-btn']} ${styles.fontW600} ${styles['fs-10']} ${styles['text-uppercase']}`}
                          onClick={this.showVariants('BUY_NOW')}
                          btnText={PDP_PAGE.BUY_NOW}
                          showImage="icons/cart/buy-icon"
                          hoverClassName="hoverBlueBackground"
                          btnLoading={false}
                        />
                      </div>
                      :
                      <a className={`${styles['flex-center']} ${styles['notify-part-inn']} ${styles['white-color']} ${styles['fp-btn']} ${styles['left-radius']} ${styles['fp-btn-primary']}`} onClick={this.notify}>
                        <span className={styles['pl-5']}>{PDP_PAGE.NOTIFY_ME}</span>
                      </a>
                      // <div className={`${styles['flex']} ${styles['justify-around']} ${styles['quick-view']} ${styles['border-radius4']}`}>
                      //   <a className={`${styles['flex-center']} ${styles['buy-now-btn']} ${styles['notifyBackground']}`} onClick={this.notify}>
                      //     <span className={styles['pl-5']}>{PDP_PAGE.NOTIFY_ME}</span>
                      //   </a>
                      // </div>
                  }
                  <div className={`${styles['wish-list-part']} ${styles['flx-space-bw']}`}>
                    <span className={styles.flex}>
                      <a className={styles['flex-center']} onClick={this.addToWishlist}>
                        <SVGCompoent clsName={`${styles['wish-list']}`} src={addedToWishlist ? "icons/wish-list/wish-list-icon-red" : "icons/wish-list/wish-list-icon"} />
                        <span className={`${styles['pl-5']} ${styles['fs-12']}`} disabled={addedToWishlist}>{addedToWishlist ? `${PDP_PAGE.ADDED_TO_WISHLIST}` : `${PDP_PAGE.ADD_TO_WISHLIST}`}</span>
                      </a>
                    </span>
                    {(flags && flags.comparable) &&
                      <div
                        className={`${styles['checkbox-material']} ${styles.flex} ${styles['add-to-compare']}`}
                        onClick={this.preventDefaultClick}
                      >
                        <input
                          id="add-to-compare-srp"
                          type="checkbox"
                          onChange={this.addToCompare}
                          checked={cmpData.products &&
                            _.findIndex(cmpData.products, o => o.productId === productId) > -1}
                        />
                        <label htmlFor="add-to-compare-srp" className={`${styles['fs-12']}`}> {PDP_PAGE.ADD_TO_COMPARE}</label>
                      </div>
                      }
                  </div>
                  <div className={`${styles['brand-price-details']} ${styles['black-color']}`}>
                    <span className={`${styles['pr-5']}`}>{variants.length > 0 && variants[selectedIndex].sellingPrice &&
                      getPriceAndOffer()}
                    </span>
                    {/* <span className={`${styles['fs-12']} ${styles['black-color']}`}>{currency}</span> */}
                    {/* <div className={`${styles['flex']} ${styles['pt-5']}`}>
                      <span className={styles['flex']}>
                        <SVGCompoent clsName={`${styles['star-raing']}`} src="icons/common-icon/star-full-yellow" />
                        <SVGCompoent clsName={`${styles['star-raing']}`} src="icons/common-icon/star-full-yellow" />
                        <SVGCompoent clsName={`${styles['star-raing']}`} src="icons/common-icon/star-full-yellow" />
                        <SVGCompoent clsName={`${styles['star-raing']}`} src="icons/common-icon/star-full-yellow" />
                        <SVGCompoent clsName={`${styles['star-raing']}`} src="icons/common-icon/star-full-yellow" />
                      </span>
                      <span className={`${styles['label-gry-clr']} ${styles['pl-5']}`}>(153) </span>
                    </div> */}
                  </div>
                  {/* <div className={styles['desc-cont']}>
                <div className={`${styles['prdt-name']} ${styles['fs-12']} ${styles['pt-15']} ${styles['pb-5']}`}>
                  <a href="#">{displayName}</a>
                </div>
                <div>{priceRange}</div>
                <div className={styles['variant-info']}>
                  {
                    _.map(variants, (variantValues, key) => <div key={key}>{`${key} : ${variantValues.join(', ')}`}</div>)
                  }
                </div>
              </div> */}
                </div>
              </div>
            </a>
          </Link>
          {isQuickView &&
            <div className={`${styles.absolute} ${styles.indication}`} />
          }
        </div>
        <Modal show={showNotify} onHide={this.closeNotify}>
          <Modal.Header closeButton>
            <Modal.Title>Notify Me</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NotifyMe
              pId={productId}
              closeNotify={this.closeNotify}
              variantId={variantId}
            />
          </Modal.Body>
        </Modal>
      </Fragment>
    );
  }
}

Product.propTypes = {
  media: PropTypes.array.isRequired,
  displayName: PropTypes.string.isRequired,
};

Product.defaultProps = {
};


const mapStateToProps = (store) => {
  return ({
    btnLoading: cartSelector.getBtnLoaders(store),
    cmpData: compareSelectors.getCmpData(store),
  });
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addToWishlistAndFetch: actionCreators.addToWishlistAndFetch,
      addToCompare: compareActions.addToCompare,
      removeCompareData: compareActions.removeCompareData,
      deleteWishlist: actionCreators.deleteWishlist,
      showLoginScreen: authActionCreators.showLoginScreen,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);



  // variants[selectedIndex].addedToCart ? <span className={styles['flex']}><SVGCompoent clsName={styles['cart-list']} src="icons/cart/added-cart-icon" />{PDP_PAGE.ADDED_TO_CART}</span> :
