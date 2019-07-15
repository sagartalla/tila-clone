import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.styl'

const Input = props => (
  <div
    className={
        `${styles.input}`
      }
    style={props.style}

  />
);

Input.propTypes = {
  style: PropTypes.object,
};

Input.defaultProps = {
  style: {},
};

export default Input;
