import React from 'react';
import lang from '../../../utils/language';
import FourNotFour from './includes/404';
import Layout from '../../../layout/main';
import HeaderBar from '../../HeaderBar/index';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './error_en.styl';
import styles_ar from './error_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const getErrComp = (statusCode) => {
  switch (statusCode) {
    case 404:
      return (
        <Layout>
          <HeaderBar />
          <FourNotFour />
        </Layout>
      );
      break;
    default:
      return (
        <div className={`${styles['errors-main']}`}>
          <div className={`${styles['errors-main-inn']}`}>
            <div className={`${styles['erros-inn-img']}`}>
              <img className={styles['']} src={"/static/img/errors-img/404tila.png"} />
            </div>
            <span className={styles['label-not']}>SOMETHING WENT WRONG</span>
          </div>
        </div>
      );
  }
}
const Error = ({ statusCode, messege }) => {
  messege = messege || 'Something went wrong';
  return getErrComp(statusCode)

}

export default Error;
