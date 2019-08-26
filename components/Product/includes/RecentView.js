import React from 'react';
import Slider from 'react-slick';

import constants from '../../../constants';

import { languageDefinations } from '../../../utils/lang';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../product_en.styl';
import styles_ar from '../product_ar.styl';
import RecentlyViewItem from './RecentlyViewItem';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const { PDP_PAGE, HEADER_PAGE } = languageDefinations();

const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
};

const RecentView = (props) => {
  const { recentlyViewed, isLoggedIn } = props;
  if (recentlyViewed.length === 0) return null;
  return (
    <div className={`${styles['recentview-main']} ${styles['pb-25']}`}>
      <div className={`${styles['flx-spacebw-alignc']} ${styles['pb-10']} ${styles['pt-10']}`}>
        <h6 className={`${styles['fs-16']} ${styles['pt-15']} ${styles['pb-15']} ${styles['m-0']} ${styles.fontW600}`}>
          <span className={`${styles['pl-15']}`}>{PDP_PAGE.RECENTLY_VIEWED}</span>
        </h6>
        <a
          className={`${styles['r-viewall']} ${styles.fontW600} ${styles['mr-15']} ${styles['fp-btn']} ${styles['left-radius']} ${styles['fp-btn-default']} ${styles.ft_card_btn}`}
          href={`/${lang}/items-zone/recently-viewed`}
          target="_blank"
        >
          {HEADER_PAGE.VIEW_ALL}
        </a>
      </div>
      <div className={`${styles['border-b']} ${styles['border-t']}`}>
        <Slider {...settings}>
          {recentlyViewed.map(item => (
            <RecentlyViewItem item={item} isLoggedIn={isLoggedIn} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default RecentView;
