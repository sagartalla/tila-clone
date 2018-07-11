import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SVGCompoent from '../common/SVGComponet';
import { mergeCss } from '../../utils/cssUtil';
const styles = mergeCss('components/Product/product');

const ProductDetails =({details}) => {
  return (
    <div className={`${styles['product-details-main']} ${styles['p-15']} ${styles['border-radius4']} ${styles['box']}`}>
      <div className={styles['border-b']}>
        <h4 className={`${styles['fs-12']} ${styles['fontW600']} ${styles['mb-5']} ${styles['mt-0']} ${styles['flx-space-bw']}`}>
          <span>PRODUCT DETAILS</span>
          <SVGCompoent clsName={`${styles['expand-icon']}`} src="icons/common-icon/down-arrow-circle" />
        </h4>
        <p className={`${styles['fs-12']} ${styles['fontW300']} ${styles['sub-decryption']}`}>For over 20 years, Calypso St. Barth has been the luxurious go-to for the women who visit its namesake home. Purveyors of effortless apparel, spirited home goods and lush fragrances, they offer globally sourced treasures as unique and evocative as the island itself. Here, Caribbean scents transport you to the soft-sand beaches and palm-spotted groves that inspired each essence.</p>
      </div>
      <div className={`${styles['flex-center']} ${styles['pt-10']} ${styles['pb-10']} ${styles['border-b']}`}>
        <span className={`${styles['fs-12']} ${styles['fontW600']} ${styles['pr-20']}`}>COLOR</span>
        <div className={`${styles['flex-center']} ${styles['color-btn-main']}`}>
          <span className={styles['mr-5']}>
            <input type="radio"  id="pink" name="radio-btn" className={styles['color-btn']} value="Red"/>
            <label className={styles['pink']} htmlFor="pink"></label>
          </span>
          <span className={styles['mr-5']}>
            <input type="radio"  id="blue" name="radio-btn" className={styles['color-btn']} value="Blue"/>
            <label className={styles['blue']} htmlFor="blue"></label>
          </span>
          <span className={styles['mr-5']}>
            <input type="radio"  id="green" name="radio-btn" className={styles['color-btn']} value="Green"/>
            <label className={styles['green']} htmlFor="green"></label>
          </span>
          <span className={styles['mr-5']}>
            <input type="radio"  id="gray" name="radio-btn" className={styles['color-btn']} value="Gray"/>
            <label className={styles['gray']} htmlFor="gray"></label>
          </span>
        </div>
      </div>
      <div className={`${styles['pt-10']} ${styles['pb-10']} ${styles['border-b']}`}>
        <div className={`${styles['flex-center']}`}>
          <span className={`${styles['fs-12']} ${styles['fontW600']} ${styles['pr-20']}`}>SIZE</span>
          <div className={`${styles['flex-center']} ${styles['size-btn-main']}`}>
            <span className={styles['mr-5']}>
              <input type="radio"  id="xtrsmall" name="radio-btn" className={styles['size-btn']} value="XS"/>
              <label className={`${styles['fs-12']} ${styles['fontW600']} ${styles['flex-center']} ${styles['justify-center']}`} htmlFor="xtrsmall">XS</label>
            </span>
            <span className={styles['mr-5']}>
              <input type="radio"  id="small" name="radio-btn" className={styles['size-btn']} value="S"/>
              <label className={`${styles['fs-12']} ${styles['fontW600']} ${styles['flex-center']} ${styles['justify-center']}`} htmlFor="small">S</label>
            </span>
            <span className={styles['mr-5']}>
              <input type="radio"  id="medium" name="radio-btn" className={styles['size-btn']} value="M"/>
              <label className={`${styles['fs-12']} ${styles['fontW600']} ${styles['flex-center']} ${styles['justify-center']}`} htmlFor="medium">M</label>
            </span>
            <span className={styles['mr-5']}>
              <input type="radio"  id="large" name="radio-btn" className={styles['size-btn']} value="L"/>
              <label className={`${styles['fs-12']} ${styles['fontW600']} ${styles['flex-center']} ${styles['justify-center']}`} htmlFor="large">L</label>
            </span>
            <span className={styles['mr-5']}>
              <input type="radio"  id="xtrlarge" name="radio-btn" className={styles['size-btn']} value="XL"/>
              <label className={`${styles['fs-12']} ${styles['fontW600']} ${styles['flex-center']} ${styles['justify-center']} `} htmlFor="xtrlarge">XL</label>
            </span>
          </div>
        </div>
        <div className={`${styles['flex-center']} ${styles['fs-12']} ${styles['pt-10']}`}>
          <span className={`${styles['pr-5']}`}>Have confusion about size?</span>
          <span className={`${styles['pr-5']}`}>Try new </span>
          <span className={`${styles['fontW600']} ${styles['lgt-blue']}`}>Size Finder  </span>
        </div>
      </div>
      <div className={`${styles['flex']} ${styles['pt-10']} ${styles['pb-10']} ${styles['border-b']}`}>
        <span className={`${styles['fontW600']} ${styles['pr-20']}`}>
          <span>Body type : </span>
          <span> Hourglass</span>
        </span>
        <span>
          <span>Know your </span>
          <span className={`${styles['fontW600']} ${styles['lgt-blue']}`}>body type </span>
        </span>
      </div>
      <div className={styles['pt-10']}>
        <h4 className={`${styles['fs-12']} ${styles['fontW600']} ${styles['mb-5']} ${styles['mt-0']} ${styles['flx-space-bw']}`}>
          <span>SPECIFICATIONS</span>
          <SVGCompoent clsName={`${styles['expand-icon']}`} src="icons/common-icon/down-arrow-circle" />
        </h4>
      </div>
    </div>
  );
}

export default ProductDetails;