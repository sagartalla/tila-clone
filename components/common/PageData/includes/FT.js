import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row } from 'react-bootstrap';
import Slider from 'react-slick';

import { Router, Link } from '../../../../routes';
import constants from '../../../../constants';
import lang from '../../../../utils/language';
import { ftbSkeletonLoader } from '../../../common/Loader/skeletonPlaceHolder';
import { actionCreators, selectors } from '../../../../store/landing';
import { actionCreators as authActionCreators, selectors as authSelectors } from '../../../../store/auth';
import { actionCreators as cartActionCreators } from '../../../../store/cart';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../pageData_en.styl';
import styles_ar from '../pageData_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

let sliderTIE = '';

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className={`${styles.leftArrow}`}
      onClick={onClick}
    >
      <img src="/static/img/landing-home/c-left.svg" alt="left" />
    </div>
  );
}

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className={`${styles.rightArrow}`}
      onClick={onClick}
    >
      <img src="/static/img/landing-home/c-right.svg" alt="right" />
    </div>
  );
}

class FT extends React.Component {
  constructor() {
    super();
    this.state = {
      buyNow: false,
    };
  }

  componentDidMount() {
    const { content, index, getListings } = this.props;
    if (content.data && content.data[lang] && content.data[lang].banners) {
      getListings(content.data[lang].banners.map(b => ({
        listing_id: b.listing_id,
      })), index);
    }
  }

  componentWillReceiveProps() {
    if (this.state.buyNow) {
      Router.pushRoute(`/${lang}/payment`);
    }
  }

  addToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const isAddedToCart = e.currentTarget.getAttribute('data-added');
    if (isAddedToCart === 'false') {
      this.addToCartAndFetchIt(e);
    }
  }

  addToCartAndFetchIt = (e) => {
    const { addToCartAndFetch } = this.props;
    const pId = e.currentTarget.getAttribute('data-pId');
    const lId = e.currentTarget.getAttribute('data-lId');
    addToCartAndFetch({
      listing_id: lId,
      product_id: pId,
    });
  }

  buyNow = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const { currentTarget } = e;
    this.setState({
      buyNow: true,
    }, () => {
      this.addToCartAndFetchIt({
        currentTarget,
      });
    });
  }

  render() {
    const {
      listingsData = [], content, isLoggedIn, showLoginScreen, isListingLoading,
    } = this.props;
    const { data } = content;
    return (
      <div className={styles['mt-20']}>
        {isListingLoading && listingsData.length === 0 ? ftbSkeletonLoader : ''}
        <Row className={styles['m-5']}>
          <h3 className={`${styles['fs-20']} ${styles.fontW600}`}>{data[lang].title}</h3>
          <Slider
            asNavFor={sliderTIE}
            ref={slider => (sliderTIE = slider)}
            lazyLoad
            className={styles['ht-100per']}
            slidesToShow={6}
            nextArrow={<SampleNextArrow />}
            prevArrow={<SamplePrevArrow />}
          >
            {listingsData.length > 0 && listingsData.map(listing => (
              //This Link route has to change, once tuin is available in this component's reducer.
              <Link route={`/${lang}/pdp/${listing.name.replace(/\//g, '').split(' ').join('-').toLowerCase()}/c/${listing.catalogId}/p/${listing.productId}/l/${listing.listingId}/v/${listing.variantId ? `${listing.variantId}` : ''}`}>
                <div className={styles.ft_card} key={listing.listingId}>
                  <div className={`${styles.flex} ${styles['flex-colum']} ${styles.width100}`}>
                    <div className={`${styles.flex} ${styles.ft_card_img}`}>
                      <img src={`${constants.mediaDomain}/${listing.image}`} alt={listing.name} />
                    </div>
                    <div className={`${styles['p-10']} ${styles.ft_card_title}`}>
                      <div className={`${styles['deals-title']}`}>
                        <span className={styles.fontW600}>{listing.brand}</span> - 
                        <span className={`${styles['slider-elips']} ${styles['lne-ht1_2']}`}>{listing.name}</span>
                      </div>
                      <div>
                        <span className={`${styles['fs-12']} ${styles['mr-5']}`}>{listing.sellingPrice.currency_code}</span>
                        <span className={styles['fs-18']}>{listing.sellingPrice.display_value.split('.')[0]}.</span>
                        <span className={styles['fs-12']}>{listing.sellingPrice.display_value.split('.')[1]}</span>
                        <s className={`${styles['pl-10']} ${styles['fs-12']} ${styles['thick-gry-clr']}`}>{listing.mrp.display_value}</s>
                      </div>
                    </div>
                    <div className={`${styles['p-5']} ${styles.ft_card_btns} ${styles['flex-center']} ${styles['flex-colum']} ${styles['justify-center']}`}>
                      <button
                        className={`${styles['fp-btn']} ${styles['left-radius']} ${styles['fp-btn-primary']} ${styles.ft_card_btn} ${styles['mb-5']}`}
                        data-pId={listing.productId}
                        data-lId={listing.listingId}
                        data-added={listing.isAddedToCart}
                        onClick={this.buyNow}
                      >
                        BUY NOW
                      </button>
                      <button
                        className={`${styles['fp-btn']} ${styles['left-radius']} ${styles['fp-btn-default']} ${styles.ft_card_btn}`}
                        data-pId={listing.productId}
                        data-lId={listing.listingId}
                        data-added={listing.isAddedToCart}
                        onClick={this.addToCart}
                      >
                        {!listing.isAddedToCart ? 'ADD TO CART' : 'In Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </Slider>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (store, ownProps) => ({
  listingsData: selectors.getListings(store, ownProps),
  isListingLoading: selectors.getIsListingLoading(store),
  isLoggedIn: authSelectors.getLoggedInStatus(store),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getListings: actionCreators.getListings,
    addToCartAndFetch: cartActionCreators.addToCartAndFetch,
    showLoginScreen: authActionCreators.showLoginScreen,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(FT);
