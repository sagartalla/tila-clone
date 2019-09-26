import React from 'react';

import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../pageData_en.styl';
import styles_ar from '../pageData_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const BT_23467 = ({content}) => {
  const { banners } = content.data[lang];
  return (
    <div className={`${styles['display-banner-i']} `}>
      {content.data[lang].title &&
        <h3 className={`${styles['thick-gry-clr']} ${styles['fs-20']} ${styles['mt-0']} ${styles['pl-10']} ${styles['pr-10']}`}>{content.data[lang].title}</h3>}
      <div className={`${styles['banner-prt-main']}`}>
        {banners.length > 0 &&
          banners.map(banner => (
            <div className={styles['banner-inn-prt']} style={{ width: `${100 / banners.length}%` }}>
              <div className={styles['sub-banr-img']}>
                <a href={banner.link} rel="noopener noreferrer">
                  <img src={banner.img} className={`${styles['inside-bnr']}`} alt={banner.display_name} />
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default BT_23467;