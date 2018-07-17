import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NoSSR from 'react-no-ssr';

import Variants from './Variants';
import KeyFeatures from './KeyFeatures';
import SVGCompoent from '../../common/SVGComponet';
import Accordian from '../../common/Accordian';
import { mergeCss } from '../../../utils/cssUtil';
import { languageDefinations } from '../../../utils/lang';

const styles = mergeCss('components/Product/product');
const { PDP } = languageDefinations();

const ProductDetails =({details, keyfeatures}) => {
  return (
    <div className={`${styles['product-details-main']} ${styles['p-15']} ${styles['border-radius4']} ${styles['box']}`}>
      {
          details
          ?
          <div className={styles['border-b']}>
            <h4 className={`${styles['fs-12']} ${styles['fontW600']} ${styles['mb-5']} ${styles['mt-0']} ${styles['flx-space-bw']}`}>
              <span>{PDP.PRODUCT_DETAILS}</span>
              <SVGCompoent clsName={`${styles['expand-icon']}`} src="icons/common-icon/down-arrow-circle" />
            </h4>
            <p className={`${styles['fs-12']} ${styles['fontW300']} ${styles['sub-decryption']}`}>{details}</p>
          </div>
          :
          null
      }
      <NoSSR>
        <Variants />
      </NoSSR>
      <div className={`${styles['flex']} ${styles['pt-10']} ${styles['pb-10']} ${styles['border-b']}`}>
        <span className={`${styles['fontW600']} ${styles['pr-20']}`}>
          <span>Body type : </span>
          <span> Hourglass</span>
        </span>
        <span>
          <span>Know your </span>
          <span className={`${styles['fontW600']} ${styles['lgt-blue']}`}>body type</span>
        </span>
      </div>
      <div className={styles['pt-10']}>
        <Accordian
          head={
            <h4 className={`${styles['fs-12']} ${styles['fontW600']} ${styles['mb-5']} ${styles['mt-0']} ${styles['flx-space-bw']}`}>
              <span>SPECIFICATIONS</span>
              <SVGCompoent clsName={`${styles['expand-icon']}`} src="icons/common-icon/down-arrow-circle" />
            </h4>
          }
          body={
            <KeyFeatures features={keyfeatures} />
          }
        />
      </div>
    </div>
  );
}

export default ProductDetails;
