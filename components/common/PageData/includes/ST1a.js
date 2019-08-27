import React from 'react';
import Slider from 'react-slick';
import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../pageData_en.styl';
import styles_ar from '../pageData_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const sliderFTBS = '';

const ST1a = ({ content }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: false,
  };
  return (
    <div className={`${styles.fashionBannerSpacing}`} >
      <Slider
        {...settings}
        asNavFor={sliderFTBS}
        lazyLoad={false}
        className={`${styles.flex} ${styles['fashion-main-slider']} ${styles['flex-colum']} fashion-slick-slider`}
        customPaging={i => <span className={`${styles['fs-10']}`}>{content.data[lang].banners[i].display_name}</span>}
      >
        {content.data[lang].banners.map(i => (
          <div className={styles.fSlider} key={i.display_name}>
            <a href={i.link}>
              <div className={`${styles.item} ${styles['slick-itm']} ${styles.width100}`} key={i.display_name}>
                <img src={i.img} alt={i.display_name} className={`${styles.width100} ${styles.imageRounded}`} />
              </div>
            </a>
            <span className={`${styles['fs-12']} ${styles['pt-10']} ${styles['justify-center']} ${styles['slider-elips']} ${styles['lne-ht1_2']}`} style={{ textAlign: 'center', display: 'inline-block' }} >{i.display_name}</span>
          </div>
            ))}
      </Slider>
    </div>
  );
};

export default ST1a;

