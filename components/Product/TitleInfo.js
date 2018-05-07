import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './product.styl';

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
    <div>
      <div className={styles['ti-brand']}>{brand}</div>
      <div className={styles['ti-title']}>{title}</div>
      <div className={styles['ti-info-wrapper']}>
        <div className={styles['ti-rating-wrap']}>
          ({rating.rating}) {rating.count}
        </div>
        <div className={styles['ti-reviews-wrap']}>
          {reviews.count} Reviews
        </div>
      </div>
      <div className={styles['ti-price-wrapper']}>
        <div className={styles['ti-current-price']}>{price}</div>
        <div className={styles['ti-original-price']}>{originalPrice}</div>
        <div className={styles['ti-discount-percent']}>{discountPercent}</div>
      </div>
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
