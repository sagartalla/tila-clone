import React, { Component } from 'react';
import PropTypes from 'prop-types';

import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../instant_en.styl';
import styles_ar from '../instant_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const CodCard = props => {
  return (
    <div>

    </div>
  )
};

CodCard.propTypes = {

};

CodCard.defaultProps = {

};

export default CodCard;
