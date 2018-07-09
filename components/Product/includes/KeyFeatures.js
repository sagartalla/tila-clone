import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Product/product');

const KeyFeatures = ({ features }) => {
  return (
    <div className={`${styles['pt-15']} ${styles['pb-15']} ${styles['border-b']}`}>
      <div className={`${styles['kf-title']} ${styles['pb-5']}`}>
        <span className={`${styles['ff-b']} ${styles['black-color']}`}>Key Features</span>
      </div>
      <ul className={`${styles['kf-list']} ${styles['flx-space-bw']} ${styles['flex-wrp']} ${styles['fs-12']} ${styles['mb-0']} ${styles['pl-0']}`}>
        {
          features.map((feature) =>  <li key={feature} className={`${styles['no-lst']} ${styles['width33']}`}>{feature}</li>)
        }
      </ul>
    </div>
  );
}

KeyFeatures.propTypes = {
  features: PropTypes.array.isRequired
}

export default KeyFeatures;
