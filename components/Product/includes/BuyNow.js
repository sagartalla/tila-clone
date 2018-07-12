import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Product/product');

const AddToCart = ({addtocart}) => {
  return(
    <div className={`${styles['pt-25']} ${styles['flx-space-bw']} ${styles['addto-cart']} ${styles['border-t']}`}>
      <a className={`${styles['fp-btn']} ${styles['fp-btn-default']} ${styles['fp-btn-x-large']}`}>ADD TO CART</a>
      <a className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['fp-btn-x-large']}`}>BUY NOW</a>
    </div>
  );
}

export default AddToCart;
