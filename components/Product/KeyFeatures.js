import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './product.styl';

const KeyFeatures = ({ features }) => {
  return (
    <div>
      <div className={styles['kf-title']}>
        <span>Key Features</span>
      </div>
      <ul className={styles['kf-list']}>
        {
          features.map((feature) =>  <li key={feature}>{feature}</li>)
        }
      </ul>
    </div>
  );
}

KeyFeatures.propTypes = {
  features: PropTypes.array.isRequired
}

export default KeyFeatures;

