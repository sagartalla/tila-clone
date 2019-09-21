/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from './404error_en.styl';
import styles_ar from './404error_ar.styl';


import { languageDefinations } from '../../../../utils/lang';
const { PAGE_NOT_FOUND } = languageDefinations();

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };


const fourNotImages = [{
  img: '/static/img/errors-img/zpl.png',
  title: `${lang === 'en' ? 'Home entertainment' : 'أجهزة ترفيهية'}`,
  key: 'Home-entertainment',
  links: `https://www.tila.com/${lang}/home%20entertainment/clp`,
}, {
  img: '/static/img/errors-img/pendrive.png',
  title: 'Memory',
  key: 'Memory',
  links: `https://www.tila.com/${lang}/storage%20devices/clp`,
}, {
  img: '/static/img/errors-img/shutterstock.png',
  title: `${lang === 'en' ? 'Home entertainment' : 'أدوات المطبخ'}`,
  key: 'Kitchen-Appliances',
  links: `https://www.tila.com/${lang}/kitchen-appliances/clp`,
}, {
  img: '/static/img/errors-img/makeup.png',
  title: `${lang === 'en' ? 'Makeup' : 'مكياج'}`,
  key: 'Makeup',
  links: `https://www.tila.com/${lang}/makeup/clp`,
}, {
  img: '/static/img/errors-img/frame-mr.png',
  title: `${lang === 'en' ? 'Photo Frames' : 'إطارات صور'}`,
  key: 'Photo-Frames',
  links: `https://www.tila.com/${lang}/photo%20frames/clp`,
}, {
  img: '/static/img/errors-img/shutterstock-dall.png',
  title: `${lang === 'en' ? 'Toys & Accessories' : 'الألعاب ومستلزماتها'}`,
  key: 'Toys-Accessories',
  links: `https://www.tila.com/${lang}/toys%20&%20accessories/clp`,
}, {
  img: '/static/img/errors-img/zym.png',
  title: `${lang === 'en' ? 'Exercise & Fitness' : 'تدريبات ولياقة'}`,
  key: 'Exercise-Fitness',
  links: `https://www.tila.com/${lang}/exercise%20&%20fitness/clp`,
},
{
  img: '/static/img/errors-img/watch.png',
  title: `${lang === 'en' ? 'Watches' : 'ساعات اليد'}`,
  key: 'Watches',
  links: `https://www.tila.com/${lang}/watches/clp`,
},
{
  img: '/static/img/errors-img/shoe.png',
  title: `${lang === 'en' ? 'Footwear' : 'أحذية'}`,
  key: 'Footwear',
  links: `https://www.tila.com/${lang}/footwear/clp`,
},
{
  img: '/static/img/errors-img/sunglass.png',
  title: `${lang === 'en' ? 'Sunglasses' : 'نظارات شمسية'}`,
  key: 'Sunglasses',
  links: `https://www.tila.com/${lang}/sunglasses/clp`,
},
{
  img: '/static/img/errors-img/football.png',
  title: `${lang === 'en' ? 'Sports & Outdoor' : 'الرياضات والخارج'}`,
  key: 'Sports-Outdoor',
  links: `https://www.tila.com/${lang}/sports%20&%20outdoor/clp`,
},
{
  img: '/static/img/errors-img/applewatch.png',
  title: `${lang === 'en' ? 'Smart Watch' : 'ساعات يد ذكية'}`,
  key: 'Smart-Watch',
  links: `https://www.tila.com/${lang}/smart%20watch/clp`,
},
{
  img: '/static/img/errors-img/headphones.png',
  title: `${lang === 'en' ? 'Mobile Accessories' : 'اكسسوارات الجوالات'}`,
  key: 'Mobile-Accessories',
  links: `https://www.tila.com/${lang}/mobile-accessories/clp`,
},
{
  img: '/static/img/errors-img/laptop.png',
  title: `${lang === 'en' ? 'Laptops' : 'اللاب توبات'}`,
  key: 'Laptops',
  links: `https://www.tila.com/${lang}/laptops/clp`,
},
{
  img: '/static/img/errors-img/camara.png',
  title: `${lang === 'en' ? 'Cameras' : 'كاميرات'}`,
  key: 'Cameras',
  links: `https://www.tila.com/${lang}/cameras/clp`,
},
{
  img: '/static/img/errors-img/mobile.png',
  title: `${lang === 'en' ? 'Mobile' : 'الجوالات'}`,
  key: 'mobile',
  links: `https://www.tila.com/${lang}/mobiles/clp`,
},
{
  img: '/static/img/errors-img/fdress.png',
  title: `${lang === 'en' ? 'Womens Clothing' : 'ملابس نسائية'}`,
  key: 'Women-clothing',
  links: `https://www.tila.com/${lang}/womens%20Clothing/clp`,
},
{
  img: '/static/img/errors-img/mdress.png',
  title: `${lang === 'en' ? 'Mens Clothing' : 'ملابس رجالية'}`,
  key: 'Men-Clothing',
  links: `https://www.tila.com/${lang}/men%20Clothing/clp`,
},
{
  img: '/static/img/errors-img/fashion.png',
  title: `${lang === 'en' ? 'Jewellery' : 'المجوهرات'}`,
  key: 'Jewellery',
  links: `https://www.tila.com/${lang}/jewellery/clp`,
},
{
  img: '/static/img/errors-img/television.png',
  title: `${lang === 'en' ? 'Televisions' : 'التلفزيونات'}`,
  key: 'Televisions',
  links: `https://www.tila.com/${lang}/televisions/clp`,
},
{
  img: '/static/img/errors-img/tablet.png',
  title: `${lang === 'en' ? 'Tablets & Ipads' : 'اجهزة تابلت وايباد'}`,
  key: 'Tablets-Ipads',
  links: `https://www.tila.com/${lang}/tablet%20&%20ipads/clp`,
},

];


function FourNotFour() {
  return (
    <div className={`${styles['four-not-four-main']}`}>
      <div className={`${styles['four-not-four-inn']}`}>
        <div className={styles.flex}>
          <span className={styles['four-not-four-no']}>4</span>
          <div className={`${styles['fr-nt-fr-img']} ${styles.relative}`}>
            {fourNotImages.map(i => (
              <span className={`${styles.absolute} ${styles[i.key]} ${styles['fr-nt-fr-img-main']}`} key={i}>
                <OverlayTrigger triggerType="hover" overlay={<Tooltip id={i.title} placement="top" > {i.title} </Tooltip>} placement="top">
                  <a href={i.links}>
                    <img src={i.img} />
                  </a>
                </OverlayTrigger>
              </span>
            ))}
          </div>
          <span className={styles['four-not-four-no']}>4</span>
        </div>
        <div className={`${styles['page-nt-found']} ${styles['t-c']}`}>
          <h4 className={`${styles['fs-30']}`}>{PAGE_NOT_FOUND.PAGENOTFOUND}</h4>
          <p className={`${styles['fs-16']}`}>
            {PAGE_NOT_FOUND.OOPS}
          </p>
          <p>
            {PAGE_NOT_FOUND.OR}
          </p>
          <a href="/" className={`${styles['landing-page-btn']} ${styles['fp-btn']} ${styles['left-radius']} ${styles['fp-btn-primary']} ${styles['fs-18']} ${styles['text-uppercase']} ${styles['small-btn']}`}>{PAGE_NOT_FOUND.GO_TO_HOMEPAGE}</a>
        </div>
      </div>

    </div>

  );
}

export default FourNotFour;
