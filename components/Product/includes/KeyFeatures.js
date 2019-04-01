import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Product/product');

const KeyFeatures = ({ features }) => {
  return (
    <div className={`${styles['pt-0']}`}>
      <ul className={`${styles['kf-list']} ${styles['flex']} ${styles['flex-wrp']} ${styles['fs-12']} ${styles['mb-0']} ${styles['pl-0']}`}>
        {
          features.map((feature) =>  <li key={feature} className={styles['pr-20']}><span>{feature}</span> </li>)
        }
      </ul>
    </div>
  );
}

KeyFeatures.propTypes = {
  features: PropTypes.array.isRequired
}

export default KeyFeatures;
