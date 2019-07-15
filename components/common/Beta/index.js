import React, { Component } from 'react';
import { languageDefinations } from '../../../utils/lang';

import lang from '../../../utils/language';

import styles_en from './betalogo_en.styl';
import styles_ar from './betalogo_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;
const { BETA } = languageDefinations();

const Betalogo = () => (
  <div className={`${styles['betalogo-container']}`}>
    <div className={`${styles['beta-bg']}`}>
      <span>{BETA.BETA}</span>
    </div>
  </div>
);

export default Betalogo;
