import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SVGCompoent from '../../common/SVGComponet';
import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Product/product');

const ProductPrice = ({pricedetails}) => {
 return(
  <div className={`${styles['box']} ${styles['p-15']} ${styles['border-radius4']}`}>
    <div className={styles['flex']}>
      <span className={`${styles['fs-30']} ${styles['fontW600']} ${styles['pr-5']}`}>120.45</span>
      <span>AED</span>
    </div>
    <span className={styles['flex']}>
      <SVGCompoent clsName={`${styles['buy-coupon']}`} src="icons/common-icon/bg-tick-mark" />
      <span className={styles['fs-12']}>Buy & Earn 300 Reward Points</span>
    </span>
  </div>
 );
}

export default ProductPrice;
