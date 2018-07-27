import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/common/Blocker/blocker');

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

