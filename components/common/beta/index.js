import React, { Component } from 'react';

import { mergeCss } from '../../../utils/cssUtil';
import { languageDefinations } from '../../../utils/lang/';

const styles = mergeCss('components/common/beta/betalogo');
const { BETA } = languageDefinations();

const Betalogo = () => (
  <div className={`${styles['betalogo-container']}`}>
    <div className={`${styles['beta-bg']}`}>
      <span>{BETA.BETA}</span>
    </div>
  </div>
);

export default Betalogo;
