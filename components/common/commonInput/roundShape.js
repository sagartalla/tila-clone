import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.styl'

const Round = props => (
  <div
    className={
        `${styles.round}`
      }
    style={props.style}
  />
);

Round.propTypes = {
  style: PropTypes.object,
};

Round.defaultProps = {
  style: {},
};

export default Round;
