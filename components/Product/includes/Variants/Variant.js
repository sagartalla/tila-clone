import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Product/includes/Variants/variants');

const Variant = ({ title, options, onSelectVariant }) => {
  return (
    <div>
      <div className={styles['v-title']}>{title}</div>
      <select onChange={onSelectVariant}>
        {
          options.map((option) => <option key={option} value={option}>{option}</option> )
        }
      </select>
    </div>
  );
}

Variant.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onSelectVariant: PropTypes.func.isRequired,
}

export default Variant;
