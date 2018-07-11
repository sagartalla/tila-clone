import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { mergeCss } from '../../utils/cssUtil';
const styles = mergeCss('components/Product/product');

/*
  brand: 'Apple',
  title: 'Iphone X Without Facetime Space Gray 64GB 4G LTE',
  rating: {
    rating: 4,
    count: 187
  },
  reviews: {
    count: 25
  },
  price: '1600.000 SAR',
  originalPrice: '1949.00 SAR',
  discountPercent: '-60%',
*/

const TitleInfo = ({ brand, title, rating, reviews, price, originalPrice, discountPercent }) => {
  return (
    <div className={styles['pb-15']}>
      <div className={`${styles['fontW300']} ${styles['lgt-blue']}`}>{brand}</div>
      <div className={`${styles['fs-26']} ${styles['fontW300']} ${styles['black-color']}`}>{title}</div>
      <div className={`${styles['flex']} ${styles['fs-12']} ${styles['pt-5']}`}>
        <div className={`${styles['ti-rating-wrap']} ${styles['pr-5']}`}>
          {rating.rating} {rating.count}
        </div>
        <div className={`${styles['ti-reviews-wrap']} ${styles['fs-12']}`}>
          <span className={`${styles['pr-5']} ${styles['pl-5']}`}>Read Expert Review</span>
          <span className={`${styles['pr-5']} ${styles['pl-5']}`}>Customer Review</span>
          <span className={`${styles['pr-5']} ${styles['pl-5']}`}>Ask Question</span>
        </div>
      </div>
      <div className={`${styles['flex-center']} ${styles['checkout-instantly']} ${styles['pt-15']}`}>
        <div className={`${styles['flex']}`}>
          <a className={`${styles['fp-btn']} ${styles['fp-btn-default']}`}>Checkout Instantly </a>
        </div>
        <div>
          <span className={`${styles['flex']} ${styles['fs-12']} ${styles['google-clr']} ${styles['fontW600']}`}>Only 2 left in stock!</span>
          <span className={`${styles['flex']} ${styles['fs-12']}`}>COD available</span>
        </div>
      </div>
      {/* <div className={`${styles['fs-18']} ${styles['fontW600']} ${styles['black-color']}`}>
        <div className={styles['ti-current-price']}>{price}</div>
        <div className={styles['ti-original-price']}>{originalPrice}</div>
        <div className={styles['ti-discount-percent']}>{discountPercent}</div>
      </div> */}
    </div>
  )
};

TitleInfo.propTypes = {
  brand: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  rating: PropTypes.object.isRequired,
  reviews: PropTypes.object.isRequired,
  price: PropTypes.string.isRequired,
  originalPrice: PropTypes.string.isRequired,
  discountPercent: PropTypes.string.isRequired,
}

export default TitleInfo;
