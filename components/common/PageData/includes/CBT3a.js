import React from 'react';

import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../pageData_en.styl';
import styles_ar from '../pageData_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const CBT3a = ({content}) => {
  
  const returnBanner = (index, banners) => {
    return (
      <a href={banners[index].link} className={styles.width100}>
        <div>
          <img src={banners[index].img} className={`${styles['width100']}`} />
        </div>
      </a>
    )
  }

    const { banners, title, description } = content.data[lang];
    return(
        <div className={` ${styles['fashionBannerSpacing']}`} >
            <div className={`${styles['fs-20']} ${styles.title}`}>
              <div className={`${styles.pdL} ${styles['t-c']}`}>
                {title && <h1 className={styles.fHeading}>{title}</h1>}
                {description && <span>{description}</span>}
              </div>
            </div>
           <div className={`${styles['flex-prop']}`}>
            <div className = {styles.cbt3a}>
              <div className={styles.wrapper}>
                <div className={styles.img1}>
                  {returnBanner(0, banners)}
                </div>
                <div className={styles.img2}>
                  {returnBanner(1, banners)}
                </div>
                <div className={styles.img3}>
                  {returnBanner(2, banners)}
                </div>
              </div>
            </div>
            </div>
          </div>
  );
}

export default CBT3a;