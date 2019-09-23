import React from 'react';
import lang from '../../../utils/language';
import { languageDefinations } from '../../../utils/lang';
import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './captcha_en.styl';
import styles_ar from './captcha_ar.styl';

const { PAYMENT_PAGE } = languageDefinations();


const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const TcContent = () => {
    return (
        <div className={`${styles['terms']} ${styles['fs-12']}`}>
          <b>{PAYMENT_PAGE.TERMS_AND_CONDITIONS_FOR_COD}</b><br/><br/>
          <div className={`${styles['terms-content']} ${styles['fs-12']}`}>
            {/* Cash on Delivery will not be available if your order value exceeds 3000 SAR<br/><br/> */}

            {PAYMENT_PAGE.BY_CHOOSING_COD}<br/><br/>

            {PAYMENT_PAGE.CASH_ON_DELIVERY_REFUNDS}
          </div>
        </div>
    );
}

export default TcContent;