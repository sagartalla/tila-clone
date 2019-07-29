import React from 'react';
import Cookies from 'universal-cookie';

import constants from '../../../../constants';
import SVGComponent from '../../../common/SVGComponet';
import { Router } from '../../../../routes';

import lang from '../../../../utils/language';
import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../pageData_en.styl';
import styles_ar from '../pageData_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const cookies = new Cookies();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

const routeChange = (product_id, catalog_id, name, listing_id='', variant_id='') => {
  Router.pushRoute(`/${language}/pdp/${name ? name.split(' ').join('-').toLowerCase(): ''}/c/${catalog_id}/p/${product_id}/l/${listing_id}/v/${variant_id ? `${variant_id}` : ''}`);
}

const Card = ({ listing, isLoggedIn, addToCart }) => (
  <div key={listing.listingId} className={`${styles.flex}`} style={{ width: '20%' }}>
    <div
      className={`${styles.flex} ${styles['flex-colum']} ${styles.pointer} ${styles['m-5']} ${styles.relative} ${styles['l-item']}`}
      onClick={() => routeChange(listing.productId, listing.catalogId, listing.name, listing.listingId, listing.variant_id)}
    >
      <div className={styles['l-img-container']}>
        <img src={`${constants.mediaDomain}/${listing.image}`} className={styles['l-img']} alt={listing.image} />
      </div>
      <div className={`${styles['mt-15']} ${styles['pl-10']} ${styles['pr-10']} ${styles['l-title']} ${styles.relative}`}><span className={`${styles.fontW600}`}>{listing.brand}</span> - {listing.name}</div>
      <div className={`${styles['flx-spacebw-alignc']} ${styles['pl-10']} ${styles['pr-10']} ${styles['pb-30']} ${styles['pt-15']}`}>
        <div>
          <div>
            {isLoggedIn && listing.sellingPrice.money_value === 0 ?
              <span className={`${styles.fontW600} ${styles['fs-14']}`}>FREE</span>
              :
              <React.Fragment>
                <span className={`${styles['fs-12']} ${styles['pr-5']}`}>{listing.sellingPrice.currency_code}</span>
                <span className={`${styles['fs-18']} ${styles.fontW600}`}>{listing.sellingPrice.display_value.split('.')[0]}.</span>
                <span className={`${styles['fs-12']} ${styles.fontW600}`}>{listing.sellingPrice.display_value.split('.')[1]}</span>
              </React.Fragment>}
          </div>
          <div className={`${styles['fs-12']} ${styles['dark-gray']}`}>
            <s>
              {listing.sellingPrice.money_value === 0 && <span>{listing.mrp.currency_code}&nbsp;&nbsp;</span>}
              <span>{listing.mrp.display_value.split('.')[0]}.</span>
              <span>{listing.mrp.display_value.split('.')[1]}</span>
            </s>
          </div>
        </div>
        <div className={styles.flex} data-lId={listing.listingId} data-isAddedToCart={listing.isAddedToCart} data-pId={listing.productId} onClick={addToCart}>
          <SVGComponent src={!listing.isAddedToCart ? 'icons/cart/blue-cart-icon' : 'icons/cart/added-cart-icon'} clsName={styles['img-icon']} />
        </div>
      </div>
      {listing.discountPerMrp > 0 &&
        <div className={`${styles.absolute} ${styles['pr-10']} ${styles['pl-10']} ${styles['pt-5']} ${styles['pb-5']} ${styles['google-bg-clr']} ${styles['white-color']} ${styles['border-bt-right-radius']}`}>
          {listing.discountPerMrp === 100 ? 'FREE' : `-${listing.discountPerMrp}%`}
        </div>}
    </div>
  </div>
);

export default Card;
