import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';

import { mergeCss } from '../../utils/cssUtil';
const styles = mergeCss('components/common/blocker');

const Blocker = props => {
  return (
    <div className={`${styles['blocker-container']}`}>
      <div className={`${styles['content']} ${styles['flex-center']} ${styles['justify-center']}`}>
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

