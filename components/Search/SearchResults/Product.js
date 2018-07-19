// params: { columnIndex, key, rowIndex, style }
import { Link } from '../../../routes';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Waypoint from 'react-waypoint';
import constants from '../../../constants';
import { Grid, Row, Col } from 'react-bootstrap';
import SVGCompoent from '../../common/SVGComponet';
import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Search/search');

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.setImg = this.setImg.bind(this);
  }

  setImg() {
    const { media = []} = this.props;
    this.setState({
      src: `${constants.mediaDomain}/${media[0]}`
    });
  }

  getOfferClassName(offer) {
    if(offer > 10 && offer < 20) {
      return 'green'
    }
    if(offer > 20 && offer < 40){
      return 'yellow'
    }
    if(offer > 40 && offer < 60){
      return 'orange';
    }
    if(offer > 60){
      return 'red';
    }
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
    } = this.props;
    return (
      <Link route={`/product?productId=${productId}${variantId ? `&variantId=${variantId}` : ''}&catalogId=${catalogId}&itemType=${itemtype}`}>
        <Col md={3} xs={6} className={`${styles['pr-0']} ${styles['pl-0']}`}>
          <div className={`${styles['product-items']} ${styles['relative']}`}>
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
                  <span className={`${styles['offer-tag']} ${styles['fontW600']} ${styles['absolute']}`}><span className={`${styles['down-arrow']} ${styles['absolute']} ${styles[this.getOfferClassName(offers[0])]}`}></span>{offers[0]} OFF</span>
                )
                :
                null
              }
              <span className={`${styles['variants-main']}`}></span>
              <span className={`${styles['fullfill-main']}`}></span>
            </div>
            <div className={styles['desc-cont']}>
              <div className={`${styles['pb-20']} ${styles['pl-20']}`}>
                <h5 className={`${styles['prdt-name']} ${styles['fontW600']} ${styles['pt-15']} ${styles['pb-5']}  ${styles['m-0']} ${styles['ellips']}`}>
                  {displayName}
                </h5>
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
              </div>
              {/* <div className={styles['variant-info']}>
                {
                  _.map(variants, (variantValues, key) => <div key={key}>{`${key} : ${variantValues.join(', ')}`}</div>)
                }
              </div> */}
            </div>
            <div className={`${styles['hover-show-date']} ${styles['pb-10']} ${styles['pb-10']} ${styles['absolute']}`}>
              <div className={`${styles['flex']} ${styles['justify-around']} ${styles['quick-view']} ${styles['border-radius4']}`}>
                <a>Quick View</a>
                <a>Full View</a>
              </div>
              <div className={`${styles['wish-list-part']} ${styles['flx-space-bw']}`}>
                <span className={styles['flex']}>
                  <a className={styles['flex-center']}>
                    <SVGCompoent clsName={`${styles['wish-list']}`} src="icons/wish-list/wish-list-icon" />
                    <span className={styles['pl-5']}>Add to Wishlist</span>
                  </a>
                </span>
                <span className={styles['flex']}>
                  <a className={styles['flex-center']}>
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
                <div>
                  <span className={`${styles['label-gry-clr']}`}>153 ratings </span>
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
}

Product.propTypes = {
  media: PropTypes.array.isRequired,
  displayName: PropTypes.array.isRequired,
  variants: PropTypes.object.isRequired,
}


export default Product;
