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

const routeChange = (productId, catalogId, itemType) => {
  Router.pushRoute(`/${country}/${language}/product?productId=${productId}&catalogId=${catalogId}&itemType=${itemType}`);
}

const Card = ({ listing, isLoggedIn, addToCart }) => (
  <div key={listing.listingId} className={`${styles.flex}`} style={{ width: '20%' }}>
    <div
      className={`${styles.flex} ${styles['flex-colum']} ${styles.pointer} ${styles['m-5']} ${styles.relative} ${styles['l-item']}`}
      onClick={() => routeChange(listing.productId, listing.catalogId, listing.itemType)}
    >
      <div className={styles['l-img-container']}>
        <img src={`${constants.mediaDomain}/${listing.image}`} className={styles['l-img']} alt={listing.image} />
      </div>
      <div className={`${styles['mt-15']} ${styles['pl-10']} ${styles['pr-10']} ${styles['l-title']} ${styles.relative}`}><span className={`${styles.fontW600}`}>{listing.brand}</span> - {listing.name}</div>
      <div className={`${styles['flx-spacebw-alignc']} ${styles['pl-10']} ${styles['pr-10']} ${styles['pb-30']} ${styles['pt-15']}`}>
        <div>
          <div>
            {isLoggedIn ?
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
              {isLoggedIn && <span>{listing.mrp.currency_code}&nbsp;&nbsp;</span>}
              <span>{listing.mrp.display_value.split('.')[0]}.</span>
              <span>{listing.mrp.display_value.split('.')[1]}</span>
            </s>
          </div>
        </div>
        <div className={styles.flex} data-lId={listing.listingId} data-pId={listing.productId} onClick={addToCart}>
          <SVGComponent src={!listing.isAddedToCart ? 'icons/cart/blue-cart-icon' : 'icons/cart/added-cart-icon'} clsName={styles['img-icon']} />
        </div>
      </div>
    </div>
  </div>
);

export default Card;
