import React from 'react';
import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './error_en.styl';
import styles_ar from './error_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const getMessage = (statusCode) => {
    switch(statusCode) {
        case 404:
        return 'PAGE NOT FOUND';
        break;
        default:
    }
}
const ErrorsPart = ({ statusCode, messege}) => {
    return (
        <div className={`${styles['errors-main']}`}>
            <div className={`${styles['errors-main-inn']}`}>
                <div className={`${styles['erros-inn-img']}`}>
                    <img className={styles['']} src={"/static/img/errors-img/404tila.png"} />
                </div>
                {/* <div className={`${styles['errors-label']}`}>
                    <img className={styles['']} src={"/static/img/errors-img/404img.png"} />
                </div> */}
                <span className={styles['label-not']}>{ messege ? messege : getMessage(statusCode)}</span>
            </div>
        </div>
    );
}
export default ErrorsPart;
