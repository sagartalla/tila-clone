import React, { Component }  from 'react';
import lang from '../../../utils/language';
import FourNotFour from './includes/404';
import Layout from '../../../layout/main';
import HeaderBar from '../../HeaderBar/index';
import { languageDefinations } from '../../../utils/lang';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './error_en.styl';
import styles_ar from './error_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const { SOMETHING_WENT_WRONG } = languageDefinations();


const getErrComp = (statusCode) => {
  switch (statusCode) {
    case 404:
      return null
      break;
    default:
      return (
        <div className={`${styles['errors-main']}`}>
          <div className={`${styles['errors-main-inn']}`}>
            <div className={`${styles['erros-inn-img']}`}>
              <img className={styles['']} src={"/static/img/errors-img/404tila.png"} />
            </div>
            <span className={styles['label-not']}>{SOMETHING_WENT_WRONG.SOMETHING_WENT_WRONG}</span>
          </div>
        </div>
      );
  }
}

class Error extends Component {
  componentDidMount() {
    if(this.props.statusCode == 404) {
      window.location.replace(`/${lang}/404`);
    }
  }
  render() {
    let { statusCode, messege } = this.props;
    messege = messege || SOMETHING_WENT_WRONG.SOMETHING_WRONG;
    return getErrComp(statusCode)
  }
}

export default Error;
