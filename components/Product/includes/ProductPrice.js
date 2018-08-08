import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import SVGCompoent from '../../common/SVGComponet';
import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Product/product');

const ProductPrice = ({offerInfo}) => {
  const { price, listingAvailable, listingId, stockError, availabilityError } = offerInfo;
 return(
  <div className={`${styles['p-15']} ${styles['product-price-bg']} ${styles['border-radius4']}`}>
    {
      listingAvailable
      ?
      <Fragment>
        <div className={styles['flex']}>
          <span className={`${styles['fs-30']} ${styles['fontW600']} ${styles['pr-5']}`}>{offerInfo.price}</span>
          {/* <span>AED</span> */}
        </div>
        <div className={styles['flex']}>
          <SVGCompoent clsName={`${styles['buy-coupon']}`} src="icons/common-icon/bg-tick-mark" />
          <span className={`${styles['fs-12']} ${styles['pl-10']}`}>Buy & Earn 300 Reward Points</span>
        </div>
      </Fragment>
      :
      <h2>
        {
          availabilityError
          ?
            'Product not available in your country'
          :
            stockError
            ?
              'Product out of stock'
            :
              null
        }
      </h2>
    }

  </div>
 );
}

export default ProductPrice;
