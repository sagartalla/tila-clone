import React, { Component } from 'react';
import PropTypes from 'prop-types';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './blocker_en.styl';
import styles_ar from './blocker_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

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
