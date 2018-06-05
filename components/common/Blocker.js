import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';

import styles from './blocker.styl';

const Blocker = props => {
  return (
    <div className={`${styles['blocker-container']}`}>
      <div className={styles['blocker']}></div>
      <div className={`${styles['content']} ${styles['flx-spacebw-alignc']}`}>
        {props.content ? props.content : 'updating...'}
      </div>
    </div>
  )
};

Blocker.propTypes = {
  content: PropTypes.element,
};

Blocker.defaultProps = {

};

export default Blocker;

