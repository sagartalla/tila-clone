import React, { Component } from 'react';
import PropTypes from 'prop-types';

import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../instant_en.styl';
import styles_ar from '../instant_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const AddrCard = props => {
  const { selectedAddr, toggleMiniAddress } = props;
  return (
    <div className={`${styles['p-10-20']} ${styles['border-b']} ${styles['pointer']} ${styles['instant-check-list-inn']}`} onClick={toggleMiniAddress}>
      <h5 className={`${styles['mt-5']} ${styles['fontW600']} ${styles['mb-5']} ${styles['thick-gry-clr']}`}>{selectedAddr.first_name} {selectedAddr.last_name}</h5>
      <span className={`${styles['fs-12']} ${styles['label-gry-clr']}`}>
          {selectedAddr.address_line_1 + ', ' + selectedAddr.address_line_2 + ', ' + selectedAddr.city + ', ' + selectedAddr.country_name + ', ' + selectedAddr.postal_code}
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
