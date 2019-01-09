import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import SVGCompoent from '../../common/SVGComponet';
import { mergeCss } from '../../../utils/cssUtil';
import {languageDefinations} from '../../../utils/lang'
const styles = mergeCss('components/Product/product');
const {PDP_PAGE} = languageDefinations();
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
          <span className={`${styles['fs-12']} ${styles['pl-10']}`}>{PDP_PAGE.BUY_EARN} 300 {PDP_PAGE.REWARD_POINTS}</span>
        </div>
      </Fragment>
      :
      <h2>
        {
          availabilityError
          ?
            `${PDP_PAGE.PRODUCT_NOT_AVAILABLE}`
          :
            stockError
            ?
              `${PDP_PAGE.PRODUCT_OUT_OF_STOCK}`
            :
              null
        }
      </h2>
    }

  </div>
 );
}

export default ProductPrice;
