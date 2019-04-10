import React from 'react';
import SVGComponent from '../../common/SVGComponet';
import { mergeCss } from '../../../utils/cssUtil';
import { languageDefinations } from '../../../utils/lang';

const styles = mergeCss('components/MobileComponents/Footer/Footer');
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
