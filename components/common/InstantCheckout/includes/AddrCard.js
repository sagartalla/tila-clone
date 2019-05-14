import React, { Component } from 'react';
import PropTypes from 'prop-types';

import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../instant_en.styl';
import styles_ar from '../instant_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const AddrCard = props => {
  const { defaultAddr, toggleMiniAddress } = props;
  return (
    <div className={`${styles['p-10-20']}   ${styles['border-b']} ${styles['pointer']} ${styles['instant-check-list-inn']}`} onClick={toggleMiniAddress}>
      <h5 className={`${styles['mt-5']} ${styles['fontW600']} ${styles['mb-5']} ${styles['thick-gry-clr']}`}>{defaultAddr[0].first_name} {defaultAddr[0].last_name}</h5>
      <span className={`${styles['fs-12']} ${styles['label-gry-clr']}`}>
          {defaultAddr[0].address_line_1 + ', ' + defaultAddr[0].address_line_2 + ', ' + defaultAddr[0].city + ', ' + defaultAddr[0].country_name + ', ' + defaultAddr[0].postal_code}
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
