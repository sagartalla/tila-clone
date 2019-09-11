import React from 'react';
import lang from '../../../utils/language';
import FourNotFour from './includes/404';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './error_en.styl';
import styles_ar from './error_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const getMessage = (statusCode) => {
  switch (statusCode) {
    case 404:
      return 'PAGE NOT FOUND';
      break;
    default:
      return 'SOMETHING WENT WRONG';
  }
}

const Error = ({ statusCode, messege }) => {
  return <FourNotFour />;
}

export default Error;
