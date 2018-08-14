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
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 6
    };
    return (
      <div className={`${styles['cart-wishlist-popup']} ${styles['mr-15']}`}>
        <Grid>
          <Slider {...settings}>
            {
              data.length > 0 && data.map((item, i) => {
                const { wishlist_id, listing_id, brand_name, name, img, price, cur } = item;
                return (
                  <div key={i} className={`${styles['item']}`}>
                    <img className={styles['img']} src={img} />
                    <h5 className={`${styles['lgt-gry-clr']} ${styles['light-gry-clr']}`}>{name}</h5>
                    <h4 className={`${styles['fontW600']} ${styles['light-gry-clr']} ${styles['mt-25']} ${styles['t-c']}`}>
                      <span className={styles['fs-20']}>{price}</span> <span clsName={styles['fs-14']}> {cur}</span>
                    </h4>
                    <button id={listing_id} data-wish-id={wishlist_id} data-cart-res={true} className={`${styles['fp-btn']} ${styles['fp-btn-primary']}`} onClick={addToCart}>{WISH_LIST_PAGE.ADD_TO_CART_BTN}</button>
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