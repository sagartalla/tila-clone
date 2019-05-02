import React from 'react';
import SVGComponent from '../../common/SVGComponet';
import { languageDefinations } from '../../../utils/lang';


import lang from '../../../utils/language';

import styles_en from './Footer_en.styl';
import styles_ar from './Footer_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;

const { MOBILE_FOOTER } = languageDefinations();


const FooterMobile = () => (
  <div className={`${styles.flex} ${styles['justify-around']} ${styles['flex-center']} ${styles['mt-5']}`}>
    <div className={`${styles.flex} ${styles['flex-colum']} ${styles['flex-center']} ${styles.pointer}`}>
      <SVGComponent clsName={`${styles['icon-style']}`} src="icons/common-icon/home-icon-selected" />
      <div className={`${styles['fs-30']}`}>{MOBILE_FOOTER.HOME}</div>
    </div>
    <div className={`${styles.flex} ${styles['flex-colum']} ${styles['flex-center']} ${styles.pointer}`}>
      <SVGComponent clsName={`${styles['icon-style']}`} src="icons/common-icon/category-icon" />
      <div className={`${styles['fs-30']}`}>{MOBILE_FOOTER.CATEGORIES}</div>
    </div>
    <div className={`${styles.flex} ${styles['flex-colum']} ${styles['flex-center']} ${styles.pointer}`}>
      <SVGComponent clsName={`${styles['icon-style']}`} src="icons/wish-list/wish-list-icon" />
      <div className={`${styles['fs-30']}`}>{MOBILE_FOOTER.WISHLIST}</div>
    </div>
    <div className={`${styles.flex} ${styles['flex-colum']} ${styles['flex-center']} ${styles.pointer}`}>
      <SVGComponent clsName={`${styles['icon-style']}`} src="icons/common-icon/account-icon" />
      <div className={`${styles['fs-30']}`}>{MOBILE_FOOTER.ACCOUNT}</div>
    </div>
    <div className={`${styles.flex} ${styles['flex-colum']} ${styles['flex-center']} ${styles.pointer}`}>
      <SVGComponent clsName={`${styles['icon-style']}`} src="icons/cart/cart-icon" />
      <div className={`${styles['fs-30']}`}>{MOBILE_FOOTER.CART}</div>
    </div>
  </div>
);

FooterMobile.propTypes = {

};

FooterMobile.defaultProps = {

};

export default FooterMobile;
