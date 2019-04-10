import React from 'react';
import SVGComponent from '../../common/SVGComponet';
import { mergeCss } from '../../../utils/cssUtil';

const styles = mergeCss('components/MobileComponents/Footer/Footer');


const FooterMobile = () => (
  <div className={`${styles.flex} ${styles['justify-around']} ${styles['flex-center']} ${styles['mt-5']}`}>
    <div className={`${styles.flex} ${styles['flex-colum']} ${styles['flex-center']} ${styles.pointer}`}>
      <SVGComponent clsName={`${styles['icon-style']}`} src="icons/common-icon/home-icon-selected" />
      <div className={`${styles['fs-30']}`}>home</div>
    </div>
    <div className={`${styles.flex} ${styles['flex-colum']} ${styles['flex-center']} ${styles.pointer}`}>
      <SVGComponent clsName={`${styles['icon-style']}`} src="icons/common-icon/category-icon" />
      <div className={`${styles['fs-30']}`}>categories</div>
    </div>
    <div className={`${styles.flex} ${styles['flex-colum']} ${styles['flex-center']} ${styles.pointer}`}>
      <SVGComponent clsName={`${styles['icon-style']}`} src="icons/wish-list/wish-list-icon" />
      <div className={`${styles['fs-30']}`}>wishlist</div>
    </div>
    <div className={`${styles.flex} ${styles['flex-colum']} ${styles['flex-center']} ${styles.pointer}`}>
      <SVGComponent clsName={`${styles['icon-style']}`} src="icons/common-icon/account-icon" />
      <div className={`${styles['fs-30']}`}>account</div>
    </div>
    <div className={`${styles.flex} ${styles['flex-colum']} ${styles['flex-center']} ${styles.pointer}`}>
      <SVGComponent clsName={`${styles['icon-style']}`} src="icons/cart/cart-icon" />
      <div className={`${styles['fs-30']}`}>cart</div>
    </div>
  </div>
);

FooterMobile.propTypes = {

};

FooterMobile.defaultProps = {

};

export default FooterMobile;
