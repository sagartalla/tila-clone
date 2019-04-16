import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import Cookies from 'universal-cookie';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Link } from '../../../routes';
import { Grid, Row, Col } from 'react-bootstrap';
import constants from '../../../constants';
import SVGComponent from '../../common/SVGComponet';
// import userAgent from '../../../utils/user-agent';

import { actionCreators } from '../../../store/cam/wishlist';

import lang from '../../../utils/language';

import styles_en from '../product_en.styl';
import styles_ar from '../product_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;


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

  getUrl = crum => `/${country}/${language}/srp/${crum.display_name_en.toLowerCase().split(' ').join('-')}?search=${crum.display_name_en}&isListed=false&sid=${crum.id}`

  addToWishlist(e) {
    e.stopPropagation();
    e.preventDefault();
    console.log(this.props, 'fowihefion');
    const {
      product_id, catalog_id, addToWishlistAndFetch, offerPricing,
    } = this.props;
    addToWishlistAndFetch({
      catalog_id,
      product_id,
      wishlisted_price: offerPricing.showPrise,
      wishlisted_currency: offerPricing.currency,
    });
  }

  render() {
    const {
      imgs, extraOffers, breadcrums, isWishlisted,
    } = this.props;
    return (
      <div className={`${styles['ht-100per']} ${styles['mobile-slide-part']}`}>
        {breadcrums.length > 0 &&
          <div className={`${styles['breadcrums-part']} ${styles['fs-12']}`}>
            {breadcrums.map((crum, index) => (
              <span>
                <Link route={this.getUrl(crum)}>{crum.display_name_en}</Link>
                {breadcrums.length - 1 !== index &&
                  <span className={`${styles['label-gry-clr']}`}>&nbsp;&nbsp;{'>'}&nbsp;&nbsp;</span>}
              </span>
            ))}
          </div>
        }
        <div className={`${styles['display-item-wrap']} ${styles.relative}`}>
          <a onClick={this.addToWishlist}><SVGComponent clsName={`${styles['wishlist-icon']}`} src={isWishlisted ? 'icons/wish-list/wish-list-icon-red' : 'icons/wish-list/wish-list-icon'} /></a>
          <Slider
            asNavFor={this.state.nav2}
            ref={slider => (this.slider1 = slider)}
            lazyLoad
            className={`${styles['ht-100per']} ${styles.slick}`}
          >
            {imgs.map(({ url }) => (
              <div className={styles['selected-item-wrap']} key={url}>
                  <img src={`${constants.mediaDomain}/${url}`} />
                </div>
              ))}
          </Slider>
        </div>
        <div className={`${styles['bottom-slider']} ${styles.flex} ${styles['border-t']}`}>
          <Col md={4} sm={4}>
            <Slider
              asNavFor={this.state.nav1}
              ref={slider => (this.slider2 = slider)}
              slidesToShow={imgs.length > 4 ? 4 : imgs.length}
              swipeToSlide
              focusOnSelect
              lazyLoad
              className={`${styles['sub-slider']} ${styles.slick}`}
            >
              {
                imgs.map(({ url }, index) => (
                  <div className={styles['carousel-item-wrap']} key={url}>
                      <img src={`${constants.mediaDomain}/${url}`} />
                    </div>
                  ))
              }
            </Slider>
          </Col>
          {
            extraOffers && extraOffers.length
              ?
                <Fragment>
                  {
                  extraOffers[0]
                    ?
                      <Col md={4} sm={4}>
                        <div className={`${styles['thick-gry-clr']} ${styles['copon-code']} ${styles['pl-15']}`}>
                        <h5 className={`${styles['mb-5']} ${styles.fontW600}`}>{extraOffers[0]}</h5>
                        {/* <span className={styles['fs-12']}>Buy fashion for AED 1000/- and get 10% Extra Discount</span> */}
                      </div>
                      </Col>
                    :
                    null
                }
                  {
                  extraOffers[1]
                    ?
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

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    addToWishlistAndFetch: actionCreators.addToWishlistAndFetch,
  },
  dispatch,
);

export default connect(null, mapDispatchToProps)(Display);
