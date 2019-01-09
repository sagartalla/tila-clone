import React, { Component } from 'react';
import Slider from "react-slick";
import PropTypes from 'prop-types';
import { Grid, Col } from 'react-bootstrap';

import { languageDefinations } from '../../../../utils/lang/';

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Cam/Wishlist/wishlist');

const { WISH_LIST_PAGE } = languageDefinations();


class CartBottomPopup extends Component {

  render() {
    const { data, addToCart } = this.props;
    const settings = {
      arrows: true,
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 6
    };
    return (
      <div className={`${styles['cart-wishlist-popup']} ${styles['mr-15']}`}>
        <Grid>
          <h4 className={`${styles['cart-wishlist-popup-title']} ${styles['fs-30']} ${styles['flex-center']} ${styles['justify-center']} ${styles['lgt-blue']} ${styles['mt-5']} ${styles['mb-15']} ${styles['fontW300']}`}><span className={`${styles['bg-white']} ${styles['title-label']}`}>From Your Wishlist </span><span className={styles['title-border']}></span></h4>
          <Slider {...settings} className={styles['cart-wishlist-popup-inn']}>
            {
              data.length > 0 && data.map((item, i) => {
                const { wishlist_id, listing_id, brand_name, name, img, price, cur } = item;
                return (
                  <div key={i} className={`${styles['item']} ${styles['flex']} ${styles['flex-colum']}`}>
                    <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['wish-pop-img']}`}><img className={styles['img']} src={img} /></div>
                    <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']}`}>
                      <h5 className={`${styles['label-gry-clr']} ${styles['fs-12']} ${styles['t-c']}`}>{name}</h5>
                      <span className={`${styles['light-gry-clr']} ${styles['t-c']}`}>
                        <span className={styles['fs-20']}>{price}</span> <span clsName={styles['fs-14']}> {cur}</span>
                      </span>
                    </div>
                    <div className={`${styles['t-c']} ${styles['add-cart-btn']}`}><button id={listing_id} data-wish-id={wishlist_id} data-cart-res={true} className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['small-btn']}`} onClick={addToCart}>{WISH_LIST_PAGE.ADD_TO_CART_BTN}</button></div>
                  </div>
                )
              })
            }
          </Slider>
        </Grid>
      </div>
    )
  }
}

export default CartBottomPopup;