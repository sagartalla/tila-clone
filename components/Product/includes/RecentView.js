import React from 'react';
import { Col } from 'react-bootstrap';
import Slider from 'react-slick';
import constants from '../../../constants';

import { languageDefinations } from '../../../utils/lang';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../product_en.styl';
import styles_ar from '../product_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const { PDP_PAGE } = languageDefinations();

const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
};

const RecentView = (props) => {
  const { recentlyViewed } = props;
  if (recentlyViewed.length === 0) return null;
  return (
    <div className={`${styles['recentview-main']} ${styles['pb-25']}`}>
      <div className={`${styles['flx-spacebw-alignc']} ${styles['pb-10']} ${styles['pt-10']}`}>
        <h6 className={`${styles['fs-16']} ${styles['pt-15']} ${styles['pb-15']} ${styles['m-0']} ${styles.fontW600}`}>
          <span className={`${styles['pl-15']}`}>{PDP_PAGE.RECENTLY_VIEWED}</span>
        </h6>
        <button
          className={`${styles['r-viewall']} ${styles.fontW600} ${styles['fp-btn']} ${styles['left-radius']} ${styles['fp-btn-default']} ${styles.ft_card_btn}`}
        >
          View All
        </button>
      </div>
      <div className={`${styles['border-b']} ${styles['border-t']}`}>
        <Slider {...settings}>
          {
            recentlyViewed.map(item => (
              <Col md={2} className={`${styles['pl-0']} ${styles['pr-0']}`} key={item.id}>
                <a href={`/${lang}/pdp/${item.nm.replace(/\//g, '').split(' ').join('-').toLowerCase()}/${item.tuinId ? `${item.tuinId}/` : ''}${item.id ? `${item.id}/` : ''}?pid=${item.pid}&vid=${item.vid}&cid=${item.cid}`}>
                  <div className={`${styles['recentview-main-inn']} ${styles['border-r']}  ${styles['p-10-20']} ${styles.flex} ${styles['flex-colum']}`}>
                    <div className={styles['recentview-main-inn-img']}><img src={`${constants.mediaDomain}/${item.im}`} className="img-responsive" /></div>
                    <div>
                      <div className={`${styles['fs-12']} ${styles.flex} ${styles['justify-center']}`}>
                        {item.isAddedToCart &&
                        <span className={`${styles['pt-5']} ${styles['pb-5']} ${styles['pl-10']} ${styles['pr-10']} ${styles['bg-light-gray']} ${styles['black-color']}`}>
                          Item in Cart
                        </span>}
                        <span>&nbsp;</span>
                      </div>
                      <h6 className={`${styles['fs-12']} ${styles['mb-5']} ${styles['black-color']} ${styles.elipsis}`}><span className={styles.fontW600}>{item.br}</span> - {item.nm}</h6>
                      <span className={`${styles['fs-12']} ${styles['black-color']}`}><span>{item.cd}</span><span className={`${styles.fontW600} ${styles['fs-14']} ${styles['pl-5']}`}>{item.pr} </span></span>
                      <span className={`${styles['fs-12']} ${styles['thick-gry-clr']}`}><s><span className={`${styles.fontW600} ${styles['pl-5']}`}>{item.mrp} </span></s></span>
                    </div>
                  </div>
                </a>
              </Col>
            ))
          }
        </Slider>
      </div>
    </div>
  );
};

export default RecentView;
