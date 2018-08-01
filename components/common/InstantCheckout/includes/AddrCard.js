import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/common/InstantCheckout/instant');

const AddrCard = props => {
  const { defaultAddr, toggleMiniAddress } = props;
  return (
    <div className={`${styles['p-10-20']} ${styles['border-b']} ${styles['pointer']}`} onClick={toggleMiniAddress}>
      <h6 className={`${styles['mt-5']} ${styles['mb-5']} ${styles['fs-14']}`}>{defaultAddr[0].first_name} {defaultAddr[0].last_name}</h6>
      <span className={styles['fs-12']}>
          {defaultAddr[0].address_line_1 + ', ' + defaultAddr[0].address_line_2 + ', ' + defaultAddr[0].city + ', ' + defaultAddr[0].state}
      </span>
    </div>

  ) 
}; 

AddrCard.propTypes = {
  content: PropTypes.element,
};

AddrCard.defaultProps = {

};

export default AddrCard;
