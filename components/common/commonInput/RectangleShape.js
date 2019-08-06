import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.styl'

const Rectangle = props => (
  <div
    className={
        `${styles.Rectangle}`
      }
    style={props.style}
  />
);

Rectangle.propTypes = {
  style: PropTypes.object,
};

Rectangle.defaultProps = {
  style: {},
};

export default Rectangle;
