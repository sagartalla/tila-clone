import React from 'react';

import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../pageData_en.styl';
import styles_ar from '../pageData_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const CBT6c = ({content}) => {

  const returnBanner = (index, banners) => {
    return (
      <a href={banners[index].link}>
        <div className={`${styles['width100']}`}>
          <img src={banners[index].img} className={`${styles['width100']}`} />
        </div>
      </a>
    );
  }

    const { banners } = content.data[lang];
    return (
      <div className={`${styles.fashionBanners} ${styles.fashionBannerSpacing}`}>
        <div className={styles.fBanners1} style={{ display: 'flex' }}>
          <div className={styles.fb3} >
            {returnBanner(0, banners)}
          </div>
          <div className={styles.fb3} >
            {returnBanner(1, banners)}
          </div>
          <div className={styles.fb3}>
            {returnBanner(2, banners)}
          </div>
        </div>

        <div className={styles.fBanners2}>
          <div className={styles.fb2} >
            {returnBanner(3, banners)}
          </div>
          <div className={styles.fb1}>
            {returnBanner(4, banners)}
          </div>
          <div className={styles.fb2}>
            {returnBanner(5, banners)}
          </div>
        </div>
      </div>
    );
}

export default CBT6c;