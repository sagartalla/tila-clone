import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import Cookies from 'universal-cookie';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Link } from '../../../routes';
import { Col } from 'react-bootstrap';
import constants from '../../../constants';
import SVGComponent from '../../common/SVGComponet';
// import userAgent from '../../../utils/user-agent';

import { selectors, actionCreators } from '../../../store/cam/wishlist';
import { selectors as authSelectors, actionCreators as authActionCreators } from '../../../store/auth';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../product_en.styl';
import styles_ar from '../product_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const cookies = new Cookies();
const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';
// const maxImages = userAgent.isiPad ? 3 : 4;

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null,
    };
    this.addToWishlist = this.addToWishlist.bind(this);
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });
  }

  getUrl = crum => `/${language}/search/${crum.display_name_en.toLowerCase().replace(/\//g, '').split(' ').join('-')}?q=${crum.display_name_en}&isListed=false&sid=${crum.id}`

  addToWishlist(e) {
    e.stopPropagation();
    e.preventDefault();
    const {
      product_id, catalogObj, addToWishlistAndFetch,
      offerPricing, wishlistId, deleteWishlist, loader, isLoggedIn,
    } = this.props;
    if (!loader) {
      if (!isLoggedIn) {
        this.props.showLoginScreen();
      } else if (wishlistId) {
        deleteWishlist(wishlistId);
      } else {
        addToWishlistAndFetch({
          catalog_id: catalogObj.catalog_id,
          variant_id: catalogObj.variant_id,
          product_id,
          wishlisted_price: offerPricing.showPrise ? offerPricing.showPrise.display_value : null,
          wishlisted_currency: offerPricing.showPrise ? offerPricing.showPrise.currency_code : offerPricing.currency,
        });
      }
    }
  }

  render() {
    const {
      imgs, extraOffers, breadcrums, isWishlisted, product_id,
    } = this.props;
    return (
      <div className={`${styles['ht-100per']} ${styles['mobile-slide-part']}`}>
        {breadcrums && breadcrums.length > 0 &&
          <div className={`${styles['breadcrums-part']} ${styles['fs-12']}`}>
            {breadcrums.map((crum, index) => (
              <span key={crum.id}>
                <Link route={this.getUrl(crum)}>
                  <a>{crum.display_name_en}</a>
                </Link>
                {breadcrums.length - 1 !== index &&
                  <span className={`${styles['label-gry-clr']}`}>&nbsp;&nbsp;{'>'}&nbsp;&nbsp;</span>}
              </span>
            ))}
          </div>
        }
        <div className={`${styles['display-item-wrap']} ${styles.relative}`}>
          <a onClick={this.addToWishlist}>
            <SVGComponent clsName={`${styles['wishlist-icon']}`} src={isWishlisted ? 'icons/wish-list/wish-list-icon-red' : 'icons/wish-list/wish-list-icon'} />
          </a>
          <Slider
            asNavFor={this.state.nav2}
            ref={slider => (this.slider1 = slider)}
            lazyLoad
            className={`${styles['ht-100per']} ${styles.slick}`}
          >
            {imgs && imgs.map(({ url, type }) => (
              <div className={styles['selected-item-wrap']} key={url}>
                {type === 'VIDEO' ?
                  <iframe
                    title={product_id}
                    width="100%"
                    height="100%"
                    src={url}
                  />
                  :
                  <img src={`${constants.mediaDomain}/${url}`} alt="" />
                }
              </div>
            ))}
          </Slider>
        </div>
        <div className={`${styles['bottom-slider']} ${styles.flex} ${styles['border-t']}`}>
          <Col md={4} sm={4}>
            <Slider
              asNavFor={this.state.nav1}
              ref={slider => (this.slider2 = slider)}
              slidesToShow={imgs && (imgs.length > 4 ? 4 : imgs.length)}
              swipeToSlide
              focusOnSelect
              lazyLoad
              className={`${styles['sub-slider']} ${styles.slick}`}
            >
              {imgs && imgs.map(({ url, type }) => (
                <div className={styles['carousel-item-wrap']} key={url}>
                  {type !== 'VIDEO' ?
                    <img src={`${constants.mediaDomain}/${url}`} alt="" /> :
                    <SVGComponent src="icons/play_video" />
                  }
                </div>
              ))
              }
            </Slider>
          </Col>
          {extraOffers && extraOffers.length ?
            <Fragment>
              {extraOffers[0] ?
                <Col md={4} sm={4}>
                  <div className={`${styles['thick-gry-clr']} ${styles['copon-code']} ${styles['pl-15']}`}>
                    <h5 className={`${styles['mb-5']} ${styles.fontW600}`}>{extraOffers[0]}</h5>
                    {/* <span className={styles['fs-12']}>Buy fashion for AED 1000/- and get 10% Extra Discount</span> */}
                  </div>
                </Col>
                :
                null
              }
              {extraOffers[1] ?
                <Col md={4} sm={4}>
                  <div className={`${styles['thick-gry-clr']} ${styles['copon-code']} ${styles['pl-15']}`}>
                    <h5 className={`${styles['mb-5']} ${styles.fontW600}`}>{extraOffers[1]}</h5>
                    {/* <span className={styles['fs-12']}>Buy fashion for AED 1000/- and get 10% Extra Discount</span> */}
                  </div>
                </Col>
                :
                null
              }
            </Fragment>
            :
            null
          }
        </div>
      </div>
    );
  }
}

Display.propTypes = {
  imgs: PropTypes.array.isRequired,
};

const mapStateToProps = store => ({
  loader: selectors.getLoader(store),
  isLoggedIn: authSelectors.getLoggedInStatus(store),
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    deleteWishlist: actionCreators.deleteWishlist,
    addToWishlistAndFetch: actionCreators.addToWishlistAndFetch,
    showLoginScreen: authActionCreators.showLoginScreen,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(Display);
