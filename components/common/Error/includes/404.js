/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from './404error_en.styl';
import styles_ar from './404error_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };


// const fourNotImages = [{
//   img: '/static/img/errors-img/zpl.png',
//   title: 'Speakers',
//   key: 'speakers',
// }, {
//   img: '/static/img/errors-img/pendrive.png',
//   title: 'Pendrive',
//   key: 'pendrive',
// }, {
//   img: '/static/img/errors-img/shutterstock.png',
//   title: 'Mixer',
//   key: 'mixer',
// }, {
//   img: '/static/img/errors-img/makeup.png',
//   title: 'Makeup',
//   key: 'makeup',
// }, {
//   img: '/static/img/errors-img/microwave.png',
//   title: 'Microwave',
//   key: 'microwave',
// }, {
//   img: '/static/img/errors-img/shutterstock-dall.png',
//   title: 'Dall',
//   key: 'dall',
// }, {
//   img: '/static/img/errors-img/zym.png',
//   title: 'Zym',
//   key: 'zym',
// },
// {
//   img: '/static/img/errors-img/watch.png',
//   title: 'Watch',
//   key: 'watch',
// },
// {
//   img: '/static/img/errors-img/shoe.png',
//   title: 'Shoe',
//   key: 'shoe',
// },
// {
//   img: '/static/img/errors-img/sunglass.png',
//   title: 'Sunglass',
//   key: 'sunglass',
// },
// {
//   img: '/static/img/errors-img/football.png',
//   title: 'Football',
//   key: 'football',
// },
// {
//   img: '/static/img/errors-img/applewatch.png',
//   title: 'Applewatch',
//   key: 'applewatch',
// },
// {
//   img: '/static/img/errors-img/headphones.png',
//   title: 'Headphones',
//   key: 'headphones',
// },
// {
//   img: '/static/img/errors-img/laptop.png',
//   title: 'Laptop',
//   key: 'laptop',
// },
// {
//   img: '/static/img/errors-img/camara.png',
//   title: 'Camara',
//   key: 'camara',
// },
// {
//   img: '/static/img/errors-img/mobile.png',
//   title: 'Mobile',
//   key: 'mobile',
// },
// {
//   img: '/static/img/errors-img/fdress.png',
//   title: 'Ladies',
//   key: 'ladies',
// },
// {
//   img: '/static/img/errors-img/mdress.png',
//   title: 'Male',
//   key: 'male',
// },
// {
//   img: '/static/img/errors-img/fashion.png',
//   title: 'Fashion',
//   key: 'fashion',
// },
// {
//   img: '/static/img/errors-img/television.png',
//   title: 'Television',
//   key: 'television',
// },
// {
//   img: '/static/img/errors-img/tablet.png',
//   title: 'Tablet',
//   key: 'tablet',
// },

// ];

function FourNotFour() {
  return (
    <div className={`${styles['four-not-four-main']}`}>
      <div className={`${styles['four-not-four-inn']}`}>
        <div className={styles.flex}>
          <span className={styles['four-not-four-no']}>4</span>
          <div className={`${styles['fr-nt-fr-img']} ${styles.relative}`}>
            <span className={`${styles.absolute} ${styles['zp-img-main']} ${styles['fr-nt-fr-img-main']}`}><img src="/static/img/errors-img/zpl.png" /></span>
            <span className={`${styles.absolute} ${styles['pendrive-img-main']} ${styles['fr-nt-fr-img-main']}`}><img src="/static/img/errors-img/pendrive.png" /></span>
            <span className={`${styles.absolute} ${styles['mixer-img-main']} ${styles['fr-nt-fr-img-main']}`}><img src="/static/img/errors-img/shutterstock.png" /></span>
            <span className={`${styles.absolute} ${styles['makeup-img-main']} ${styles['fr-nt-fr-img-main']}`}><img src="/static/img/errors-img/makeup.png" /></span>
            <span className={`${styles.absolute} ${styles['microwave-img-main']} ${styles['fr-nt-fr-img-main']}`}><img src="/static/img/errors-img/microwave.png" /></span>
            <span className={`${styles.absolute} ${styles['mshutter-dall']} ${styles['fr-nt-fr-img-main']}`}><img src="/static/img/errors-img/shutterstock-dall.png" /></span>
            <span className={`${styles.absolute} ${styles['zym-main']} ${styles['fr-nt-fr-img-main']}`}><img src="/static/img/errors-img/zym.png" /></span>
            <span className={`${styles.absolute} ${styles['watch-img-main']} ${styles['fr-nt-fr-img-main']}`}><img src="/static/img/errors-img/watch.png" /></span>
            <span className={`${styles.absolute} ${styles['shoe-img-main']} ${styles['fr-nt-fr-img-main']}`}><img src="/static/img/errors-img/shoe.png" /></span>
            <span className={`${styles.absolute} ${styles['sunglass-img-main']} ${styles['fr-nt-fr-img-main']}`}><img src="/static/img/errors-img/sunglass.png" /></span>
            <span className={`${styles.absolute} ${styles['football-img-main']} ${styles['fr-nt-fr-img-main']}`}><img src="/static/img/errors-img/football.png" /></span>
            <span className={`${styles.absolute} ${styles['applewatch-img-main']} ${styles['fr-nt-fr-img-main']}`}><img src="/static/img/errors-img/applewatch.png" /></span>
            <span className={`${styles.absolute} ${styles['headphones-img-main']} ${styles['fr-nt-fr-img-main']}`}><img src="/static/img/errors-img/headphones.png" /></span>
            <span className={`${styles.absolute} ${styles['laptop-img-main']} ${styles['fr-nt-fr-img-main']}`}><img src="/static/img/errors-img/laptop.png" /></span>
            <span className={`${styles.absolute} ${styles['camara-img-main']} ${styles['fr-nt-fr-img-main']}`}><img src="/static/img/errors-img/camara.png" /></span>
            <span className={`${styles.absolute} ${styles['mobile-img-main']} ${styles['fr-nt-fr-img-main']}`}><img src="/static/img/errors-img/mobile.png" /></span>
            <span className={`${styles.absolute} ${styles['fdress-img-main']} ${styles['fr-nt-fr-img-main']}`}><img src="/static/img/errors-img/fdress.png" /></span>
            <span className={`${styles.absolute} ${styles['mdress-img-main']} ${styles['fr-nt-fr-img-main']}`}><img src="/static/img/errors-img/mdress.png" /></span>
            <span className={`${styles.absolute} ${styles['fashion-img-main']} ${styles['fr-nt-fr-img-main']}`}><img src="/static/img/errors-img/fashion.png" /></span>
            <span className={`${styles.absolute} ${styles['television-img-main']} ${styles['fr-nt-fr-img-main']}`}><img src="/static/img/errors-img/television.png" /></span>
            <span className={`${styles.absolute} ${styles['tablet-img-main']} ${styles['fr-nt-fr-img-main']}`}><img src="/static/img/errors-img/tablet.png" /></span>

          </div>
          <span className={styles['four-not-four-no']}>4</span>
        </div>
        <div className={`${styles['page-nt-found']} ${styles['t-c']}`}>
          <h4 className={`${styles['fs-30']}`}>PAGE NOT FOUND</h4>
          <p className={`${styles['fs-16']}`}>
            Oops, this page is not available. Please choose categories above
          </p>
          <p>
          or
          </p>
          <button className={`${styles['fp-btn']} ${styles['left-radius']} ${styles['fp-btn-primary']} ${styles['fs-18']} ${styles['text-uppercase']} ${styles['small-btn']}`}>Go to home page</button>
        </div>
      </div>

    </div>

  );
}

export default FourNotFour;
