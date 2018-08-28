import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/common/InstantCheckout/instant');

const VaultCard = props => {
  const { defaultCard, toggleMiniVault, updateCVV } = props;
  return (
    <div className={`${styles['p-10-20']} ${styles['border-b']} ${styles['instant-check-list-inn']}`} onClick={toggleMiniVault}>
      <h5 className={`${styles['mt-5']} ${styles['mb-5']}`}>{defaultCard[0].masked_number.replace(/(.{4})/g, '$1 ')}</h5>
      <div className={`${styles['flx-space-bw']} ${styles['fs-12']} ${styles['label-gry-clr']}`}>
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

