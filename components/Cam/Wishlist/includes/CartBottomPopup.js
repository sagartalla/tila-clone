import React, { Component } from 'react';
import Slider from "react-slick";
import { Grid } from 'react-bootstrap';

import constants from '../../../../constants';
import { Link } from '../../../../routes';
import { languageDefinations } from '../../../../utils/lang/';
import Cookie from 'universal-cookie';
import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../wishlist_en.styl';
import styles_ar from '../wishlist_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const { WISH_LIST_PAGE, PDP_PAGE } = languageDefinations();
const cookies = new Cookie();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

class CartBottomPopup extends Component {
  render() {
    const { data, addToCart, showCartPageBtmPopup, notifyMe } = this.props;
    const settings = {
      arrows: true,
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 5,
    };
    return (
      <div className={`${styles['cart-wishlist-popup']} ${styles['mr-15']}`}>
        <Grid>
          <div className={`${styles['flx-space-bw']} ${styles['align-baseline']}`}>
            <div className={`${styles.width100}`}>
              <h4 className={`${styles['cart-wishlist-popup-title']} ${styles['fs-20']} ${styles['flex-center']} ${styles['justify-center']} ${styles['lgt-blue']} ${styles['mt-5']} ${styles['mb-15']} ${styles['fontW300']}`}>
                <span className={`${styles['bg-white']} ${styles['title-label']}`}>{WISH_LIST_PAGE.FROM_YOUR_WISHLIST} </span>
                <span className={styles['title-border']}></span>
              </h4>
            </div>
            <a onClick={showCartPageBtmPopup} className={`${styles['fs-24']} ${styles['lgt-blue']}`}>X</a>
          </div>
          <Slider {...settings} className={styles['cart-wishlist-popup-inn']}>
            {
              data.length > 0 && data.map((item, i) => {
                const { product_id, wishlist_id, listing_id, name, img, price, cur, inventory_count, buttonValue, variant_id, catalogId, itemType } = item;
                return (
                  <div key={i} className={`${styles['item']} ${styles['flex']} ${styles['flex-colum']}`}>
                  <Link route={`/${language}/product?productId=${product_id}${variant_id ? `&variantId=${variant_id}` : ''}&catalogId=${catalogId}&itemType=${itemType}`}>
                    <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['wish-pop-img']}`}><img className={styles['img']} src={`${constants.mediaDomain}/${img}`} /></div></Link>
                    <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']}`}>
                    <Link route={`/${language}/product?productId=${product_id}${variant_id ? `&variantId=${variant_id}` : ''}&catalogId=${catalogId}&itemType=${itemType}`}>
                      <h5 className={`${styles['label-gry-clr']} ${styles['fs-12']} ${styles['t-c']} ${styles['cart-wishlist-title']}`}>{name}</h5></Link>
                      <span className={`${styles['light-gry-clr']} ${styles['t-c']}`}>
                        <span className={styles['fs-20']}>{price}</span> <span className={styles['fs-14']}> {cur}</span>
                      </span>
                    </div>
                    <div className={`${styles['t-c']} ${styles['add-cart-btn']}`}>
                      {inventory_count > 0 ?
                        <button
                          id={listing_id}
                          data-wish-id={wishlist_id}
                          data-cart-res={true}
                          className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['small-btn']}`}
                          onClick={buttonValue ? addToCart : undefined}
                        >
                          {buttonValue ? WISH_LIST_PAGE.ADD_TO_CART_BTN : PDP_PAGE.IN_CART}
                        </button>
                        :
                        <button
                          data-product-id={product_id}
                          className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['text-uppercase']} ${styles['small-btn']}`}
                          onClick={notifyMe}
                        >
                          {WISH_LIST_PAGE.NOTIFY_ME_BTN}
                        </button>
                      }
                    </div>
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
