import React from 'react';

import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../instant_en.styl';
import styles_ar from '../instant_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const VaultCard = (props) => {
  const { defaultCard, toggleMiniVault, updateCVV, vaultResults } = props;
  return (
    <div className={`${styles['p-10-20']} ${styles['border-b']} ${styles.relative} ${vaultResults.length > 1 && styles['instant-check-list-inn']}`} onClick={toggleMiniVault}>
      <h5 className={`${styles['mt-5']} ${styles['mb-5']} ${styles['card-number']}`}>{defaultCard.masked_number.replace(/(.{4})/g, '$1 ')}</h5>
      <div className={`${styles['flx-space-bw']} ${styles['fs-12']} ${styles['thick-gry-clr']}`}>
        <span>{defaultCard.holder_name}</span> <span>{defaultCard.expiry_month}/{defaultCard.expiry_year}</span>
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
