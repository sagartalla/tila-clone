import React from 'react';
import PropTypes from 'prop-types';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../product_en.styl';
import styles_ar from '../product_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const KeyFeatures = ({ features }) => (
  <div className={`${styles['pt-0']}`}>
    <ul className={`${styles['kf-list']} ${styles.flex} ${styles['flex-wrp']} ${styles['fs-12']} ${styles['mb-0']} ${styles['pl-0']}`}>
      {features && features.attribute_values && features.attribute_values.length > 0 &&
        features.attribute_values.map(feature => <li key={feature.value} className={`${styles['pr-20']}`}><span>{feature.value}</span> </li>)}
    </ul>
  </div>
);

KeyFeatures.propTypes = {
  features: PropTypes.object.isRequired,
};

export default KeyFeatures;
