// params: { columnIndex, key, rowIndex, style }
import { Link } from '../../../routes';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import Waypoint from 'react-waypoint';
import constants from '../../../constants';
import { actionCreators } from '../../../store/cam/wishlist';
import { Grid, Row, Col } from 'react-bootstrap';
import SVGCompoent from '../../common/SVGComponet';
import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Search/search');

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.setImg = this.setImg.bind(this);
    this.addToWishlist = this.addToWishlist.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.buyNow = this.buyNow.bind(this);
  }

  setImg() {
    const { media = [] } = this.props;
    this.setState({
      src: `${constants.mediaDomain}/${media[0]}`
    });
  }

  addToWishlist(e) {
    e.stopPropagation();
    const { productId: product_id, catalogId: catalog_id, variants } = this.props;
    this.props.addToWishlistAndFetch({
      catalog_id,
      product_id,
    });
  }

  buyNow(e) {
    e.stopPropagation();
    const { variants } = this.props;
    this.props.buyNow(variants.listingId[0]);
  }

  addToCart(e) {
    e.stopPropagation();
    const { variants } = this.props;
    this.props.addToCart(variants.listingId[0]);
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

  addToCompare(e) {
    const { itemType, productId } = e.currentTarget;
    this.props.addToCompare({
      itemType,
      productId,
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
      offers,
      addedToCart,
      addedToWishlist,
    } = this.props;
    return (
      <Link route={`/product?productId=${productId}${variantId ? `&variantId=${variantId}` : ''}&catalogId=${catalogId}&itemType=${itemtype}`}>
        <Col md={3} xs={6} className={`${styles['pr-0']} ${styles['pl-0']}`}>
          <div className={`${styles['product-items']}`}>
            <div className={`${styles['img-cont']} ${styles['border-radius4']} ${styles['relative']}`}>
              <div className={styles['image-div']}>
                <Waypoint onEnter={this.setImg}>
                  <img src={this.state.src} />
                </Waypoint>
              </div>
              {
                (offers.length > 0)
                  ?
                  (
                    offers.length > 1 && (offers[0] <= 10 && offers[0] > 0)
                      ?
                      <span className={`${styles['tag-main']} ${styles['absolute']}`}></span>
                      :
                      <span className={`${styles['offer-tag']} ${styles['white-color']} ${styles['fs-12']} ${styles['absolute']} ${styles[this.getOfferClassName(offers[0])]}`}>{offers[0]} OFF</span>
                  )
                  :
                  null
              }
              <span className={`${styles['variants-main']}`}></span>
              <span className={`${styles['fullfill-main']} ${styles['flex-center']}`}><span className={styles['fulfill-img']}></span><span className={`${styles['fs-12']} ${styles['fontW600']} ${styles['pl-10']} ${styles['fullfilled-label']}`}>Fulfilled by Tila</span></span>
            </div>
            <div className={styles['desc-cont']}>
              <div className={`${styles['pb-20']} ${styles['pl-20']} ${styles['flex']} ${styles['flex-colum']}`}>
                <h5 className={`${styles['prdt-name']} ${styles['fontW600']} ${styles['pt-15']} ${styles['pb-5']}  ${styles['m-0']} ${styles['ellips']}`}>
                  {displayName}
                </h5>
                <span>
                  <span className={`${styles['pr-10']} ${styles['fs-16']} ${styles['fontW600']}`}>{priceRange}</span>
                  <span className={`${styles['offers-label-color']} ${styles['fontW600']} ${styles['fs-12']}`}>
                    {
                      offers.length > 1
                        ?
                        `${offers} Offers`
                        :
                        offers.length > 0 && (offers[0] <= 10 && offers[0] > 0)
                          ?
                          `${offers[0]} OFF`
                          :
                          null
                    }
                  </span>
                </span>
              </div>
            </div>
            <div className={`${styles['hover-show-date']} ${styles['pb-10']} ${styles['pb-10']} ${styles['relative']}`}>
              <div className={`${styles['flex']} ${styles['justify-around']} ${styles['quick-view']} ${styles['border-radius4']}`}>
                <a className={`${styles['flex']} ${styles['add-to-crt']} ${styles['justify-center']}`} onClick={this.addToCart}>
                  <SVGCompoent clsName={`${styles['cart-list']}`} src="icons/cart/blue-cart-icon" />
                  <span className={styles['pl-5']} disabled={addedToCart}>{ addedToCart ? 'Added to Cart' : 'Add to Cart'}</span>
                </a>
                <a className={`${styles['flex']} ${styles['buy-now-btn']} ${styles['justify-center']}`} onClick={this.buyNow}>
                  <SVGCompoent clsName={`${styles['cart-list']}`} src="icons/cart/buy-icon" />
                  <span className={styles['pl-5']}>Buy Now</span>
                </a>
              </div>
              <div className={`${styles['wish-list-part']} ${styles['flx-space-bw']}`}>
                <span className={styles['flex']}>
                  <a className={styles['flex-center']} onClick={this.addToWishlist}>
                    <SVGCompoent clsName={`${styles['wish-list']}`} src={addedToWishlist ? "icons/wish-list/wish-list-icon-red" : "icons/wish-list/wish-list-icon"} />
                    <span className={styles['pl-5']} disabled={addedToWishlist}>{addedToWishlist ? 'Added to Wishlist': 'Add to Wishlist'}</span>
                  </a>
                </span>
                <span className={styles['flex']}>
                  <a className={styles['flex-center']} onClick={this.addToCompare}>
                    <SVGCompoent clsName={`${styles['wish-list']}`} src="icons/cam/cam-icon" />
                    <span className={styles['pl-5']}>Add to Compare</span>
                  </a>
                </span>
              </div>
              <div className={styles['brand-price-details']}>
                <div>
                  <h5 className={`${styles['prdt-name']} ${styles['fontW600']} ${styles['pb-5']}  ${styles['m-0']}`}>
                    {displayName}
                  </h5>
                  <span className={`${styles['fs-12']} ${styles['label-gry-clr']}`}>Denim shirt with baseball shirt stiff collar and formal tie</span>
                </div>
                <span>{priceRange}</span>
                <div className={styles['flex']}>
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
              <div className={styles['desc-cont']}>
                <div className={`${styles['prdt-name']} ${styles['fs-12']} ${styles['pt-15']} ${styles['pb-5']}`}><a href="#">{displayName}</a></div>
                <div>{priceRange}</div>
                <div className={styles['variant-info']}>
                  {
                    _.map(variants, (variantValues, key) => <div key={key}>{`${key} : ${variantValues.join(', ')}`}</div>)
                  }
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Link>
    );
  }
};

Product.propTypes = {
  media: PropTypes.array.isRequired,
  displayName: PropTypes.array.isRequired,
  variants: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addToWishlistAndFetch: actionCreators.addToWishlistAndFetch,
    },
    dispatch,
  );
};

export default connect(null, mapDispatchToProps)(Product);
