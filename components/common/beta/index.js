import React, { Component } from 'react';

import { mergeCss } from '../../../utils/cssUtil';

const styles = mergeCss('components/common/beta/betalogo');

const Betalogo = () => (
  <div className={`${styles['betalogo-container']}`}>
    <div className={`${styles['beta-bg']}`}>
      <span>beta</span>
    </div>
  </div>
);

export default Betalogo;
