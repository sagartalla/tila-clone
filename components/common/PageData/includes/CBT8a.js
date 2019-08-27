import React from 'react';

import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../pageData_en.styl';
import styles_ar from '../pageData_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };


const CBT8a = ({ content }) => {
  const returnBanner = (index, banners) => (
    <a href={banners[index].link} className={styles.width100}>
      <div className={`${styles.width100}`}>
        <img src={banners[index].img} className={`${styles.width100}`} />
      </div>
    </a>
  );

  const { banners } = content.data[lang];
  return (
    <div className={`${styles['flex-prop']} ${styles.bannerSpacing}`} >
      <div className={`${styles.flex} ${styles.width50}`} >
        <div className={styles.d11}>
          {returnBanner(0, banners)}
        </div>

        <div className={styles.d12}>
          {returnBanner(1, banners)}
        </div>
      </div>

      <div className={styles.rightBanner}>
        <div className={styles.d13}>
          <div>
            {returnBanner(2, banners)}
          </div>
          <div >
            {returnBanner(3, banners)}
          </div>
          <div >
            {returnBanner(4, banners)}
          </div>
        </div>

        <div className={styles.d14}>
          <div >
            {returnBanner(5, banners)}
          </div>
          <div >
            {returnBanner(6, banners)}
          </div>
          <div >
            {returnBanner(7, banners)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CBT8a;
