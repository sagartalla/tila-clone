import React from 'react';
import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './captcha_en.styl';
import styles_ar from './captcha_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const TcContent = () => {
    return (
        <div className={`${styles['terms']} ${styles['fs-12']}`}>
          <b>Terms and Conditions</b><br/><br/>
          <div className={`${styles['terms-content']} ${styles['fs-12']}`}>
            Cash on Delivery will not be available if your order value exceeds 3000 SAR<br/><br/>

            You are authorized Tila or its partners to collect, process, facilitate and remit payments and / or the Transaction Price electronically or through Cash on Delivery<br/><br/>

            Cash on Delivery refunds will be processed to Tila Credit
          </div>
        </div>
    );
}

export default TcContent;