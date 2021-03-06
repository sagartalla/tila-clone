import React from 'react';
import PropTypes from 'prop-types';
import { languageDefinations } from '../../../utils/lang';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../search_en.styl';
import styles_ar from '../search_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const { PDP_PAGE } = languageDefinations();

const RenderVariants = ({
  variantData, onSelectedVariant, isvisible, OncloseVariant,showOnHover
}) => {
  const selectProductSize = (listingId, index) => (e) => {
    e.stopPropagation();
    e.preventDefault();
    onSelectedVariant(listingId, index);
  };
  const getVariantData = (variantData) => {
    return variantData.map((data, index) => (
      <div
        key={`productSize_${index}`}
        onClick={data.productAvailable ? selectProductSize(data.listingId[0], index) : null}
        className={`${styles['product-sizebutton']} ${styles.pointer} ${styles['fs-12']} ${getActiveClass(data.addedToCart,data.productAvailable)}`}
      >{data.productSize[0] || data.productSize}
      </div>
      ))
  }
  const getActiveClass = (addedCart, productAvailable) => {
    const data = [`${!!addedCart}-${productAvailable}`]
    return {
      [`true-true`]:`${styles['active-selected']}`,
      ['false-false']:`${styles['product-strikebutton']}`,
      ['false-true']:''
    }[data]
  }

  if(showOnHover) {
    return (
      <div className={`${styles['productSizeContainer-hover']} ${styles['mt-5']} ${styles['flex']}`}>
        {getVariantData(variantData)}
      </div>
    )
  }
  return (
    <div className={`${styles['product-sizeDisplay']} ${isvisible ? styles['product-showsizeDisplay'] : ''}`} >
      <div className={`${styles['product-displayHeader']} ${styles['fs-14']} ${styles.flex} ${styles['justify-spacebetween']} ${styles['align-center']}`}>
        <h4>{PDP_PAGE.PLEASE_SELECT_PRODUCT_SIZE}</h4>
        <div className={`${styles['fs-22']} ${styles['mr-5']} ${styles.pointer}`} onClick={OncloseVariant}>x</div>
      </div>
      <div className={`${styles['product-sizeContainer']}`}>
        {getVariantData(variantData)}
      </div>
    </div>
  );
};
RenderVariants.propTypes = {
  showOnHover:PropTypes.bool
}
RenderVariants.defaultProps = {
  showOnHover: false
}
export default RenderVariants;
