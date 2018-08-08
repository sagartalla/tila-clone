import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/common/InstantCheckout/instant');

const VaultCard = props => {
  const { defaultCard, toggleMiniVault, updateCVV } = props;
  return (
    <div className={`${styles['p-10-20']} ${styles['border-b']}`} onClick={toggleMiniVault}>
      <h6>{defaultCard[0].masked_number.replace(/(.{4})/g, '$1 ')}</h6>
      <div className={`${styles['flx-space-bw']}`}>
        <span>{defaultCard[0].holder_name}</span> <span>{defaultCard[0].expiry_month}/{defaultCard[0].expiry_year}</span>
      </div>
      {/* <div><input type="password" placeholder="Enter CVV" onChange={updateCVV} style={{ width: '100px' }} /></div> */}
    </div>
  )
};

VaultCard.propTypes = {

};

VaultCard.defaultProps = {

};

export default VaultCard;

