import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { languageDefinations } from '../../../../utils/lang/';
import Button from '../../../common/CommonButton';
import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../wishlist_en.styl';
import styles_ar from '../wishlist_ar.styl';
import { Link } from '../../../../routes';
import SVGComponent from '../../../common/SVGComponet';
import constants from '../../../../constants';

const cookies = new Cookies();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const MiniWishlist = (props) => {
  const {
    addToCart,
    notifyMe,
  } = props;
  const { WISH_LIST_PAGE, HEADER_PAGE, PDP_PAGE, CART_PAGE } = languageDefinations();
  return (
    <div className={`${styles['mini-wishlist']}`}>
      <div className={`${styles['wishlist-container']} ${styles['border-t']}`}>
        <div>
          {
            props.items.splice(0, 2).map((item, index) => {
                const {
                    wishlist_id, listing_id, brand_name, name, img, price, cur, inventory_count,
                    wishlisted_price, mrp, variant_id, product_id, catalog_id, itemType, buttonValue,
                  } = item;
              return (
                <div key={wishlist_id} className={`${styles.flex} ${styles['pt-15']} ${styles['pb-15']} ${styles['border-b']} ${styles['min-items-list']}`}>
                  <Col md={2} sm={2} xs={2} className={`${styles['pl-0']} ${styles['pr-0']}`}>
                    <div className={`${styles['wishlist-container-img']} ${styles.flex} ${styles['justify-center']}`}>
                      <Link route={`/${country}/${language}/product?productId=${product_id}${variant_id ? `&variantId=${variant_id}` : ''}&catalogId=${catalog_id}&itemType=${itemType}`}>
                        <a className={`${styles.width100} ${styles['ht-100P']} ${styles['light-gry-clr']}`}>
                          <img className={styles.img} src={`${constants.mediaDomain}/${img}`} />
                        </a>
                      </Link>
                    </div>
                  </Col>
                  <Col md={10} sm={10} xs={10} className={`${styles['pr-0']} ${styles['wishlist-details-labels']} ${styles.flex} ${styles['justify-between']} ${styles['flex-colum']}`}>
                    <div className={`${styles['flx-space-bw']}`}>
                      <h6 className={`${styles['m-0']} ${styles['wishlist-details-name']} ${styles.flex}`}>
                        <Link route={`/${country}/${language}/product?productId=${product_id}${variant_id ? `&variantId=${variant_id}` : ''}&catalogId=${catalog_id}&itemType=${itemType}`}>
                          <a className={`${styles.width100} ${styles['ht-100P']} ${styles['fs-12']} ${styles['light-gry-clr']}`}>
                            {name}
                          </a>
                        </Link>
                        <span id={wishlist_id} className={`${styles.flex} ${styles.pointer}`} onClick={props.deleteItem}>
                          <SVGComponent clsName={`${styles['delete-icon']}`} src="icons/delete-icon/delete-icon" />
                        </span>
                      </h6>
                    </div>
                    <div>
                      <div className={`${styles.fontW600} ${styles['pt-10']} ${styles['fs-14']}`}>{price} {cur}</div>
                    </div>
                    <div className={`${styles['flex-center']} ${styles['pt-10']}`}>
                      {inventory_count > 0 ?
                        <button
                          id={listing_id}
                          data-cart-res
                          data-wish-id={wishlist_id}
                          className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['fs-12']} ${styles['mr-20']} ${styles['move-to-cart-btn']}`}
                          onClick={buttonValue ? addToCart : () => {}}
                        >
                          {buttonValue ? WISH_LIST_PAGE.ADD_TO_CART_BTN : PDP_PAGE.IN_CART}
                        </button>
                      :
                        <button
                          data-wish-id={wishlist_id}
                          className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['mr-20']} ${styles['fs-12']} ${styles['move-to-cart-btn']}`}
                          onClick={notifyMe}
                        >
                          {WISH_LIST_PAGE.NOTIFY_ME_BTN}
                        </button>}
                    </div>
                  </Col>
                </div>
              );
            })
          }

        </div>
      </div>
      {props.wishListCount && props.wishListCount > 0 ?
        <Col md={12} className={`${styles['wishlist-background']} ${styles['pb-15']}`}>
          <div className={`${styles['fs-14']} ${styles['p-10']} ${styles.fontW600} ${styles['t-c']}`}>
        {<a href={`/${country}/${language}/cam/wishlist`} className={`${styles['black-color']}`}>
        {props.wishListCount &&  props.wishListCount === 3 ? props.wishListCount - 2 + ' ' + HEADER_PAGE.MORE_ITEM : props.wishListCount > 2 ? props.wishListCount - 2 + ' ' + HEADER_PAGE.MORE_ITEMS : props.wishListCount < 3 && ''}</a>}</div>
          <Button
            className={`${styles.flex} ${styles.width100} ${styles['go-to-wishlist']} ${styles.fontW600} ${styles['fs-14']} ${styles['text-uppercase']}`}
            btnText={HEADER_PAGE.GO_TO_WISHLIST}
            onClick={props.moveToWishlist}
          />
        </Col>
        :
        <h5 className={`${styles['mt-0']} ${styles['pb-15']} ${styles['pl-15']} ${styles['fontW600']} ${styles['thick-gry-clr']} ${styles['mb-0']}`}>
            <span>{props.wishListCount} {CART_PAGE.ITEMS_IN_YOUR_WISHLIST}</span>
          </h5>}
    </div>
  );
};

MiniWishlist.propTypes = {
  moveToWishlist: PropTypes.func,
  addToCart: PropTypes.func,
};

MiniWishlist.defaultProps = {
  moveToWishlist: f => f,
  addToCart: f => f,
};

export default MiniWishlist;
