import React from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';

import HeaderBar from '../HeaderBar';
import PageData from '../common/PageData';
import FooterBar from '../Footer/index';
import { selectors } from '../../store/landing';
import lang from '../../utils/language';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './ftb_en.styl';
import styles_ar from './ftb_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

let sliderTIE = '';
let sliderHAL = '';

const hal = [{
  img: '/static/img/landing-home/womens-clothing.png',
  title: `${lang === 'en' ? 'Women\'s Clothing' : 'الملابس النسائية'}`,
  link: `/${lang}/clp/${lang === 'en' ? 'Women\'s Clothing' : 'ملابس نسائية'}`,
  key: 'Womens Clothing',
}, {
  img: '/static/img/landing-home/mens-clothing.png',
  title: `${lang === 'en' ? 'Men\'s Clothing' : 'الملابس الرجالية'}`,
  link: `/${lang}/clp/${lang === 'en' ? 'Men\'s Clothing' : 'ملابس رجالية'}`,
  key: 'Mens Clothing',
}, {
  img: '/static/img/landing-home/jewellery.png',
  title: `${lang === 'en' ? 'Jewellery' : 'المجوهرات'}`,
  link: `/${lang}/clp/${lang === 'en' ? 'Jewellery' : 'مجوهرات'}`,
  key: 'Jewellery',
}, {
  img: '/static/img/landing-home/watches.png',
  title: `${lang === 'en' ? 'Watches' : 'ساعات اليد'}`,
  link: `/${lang}/clp/${lang === 'en' ? 'Watches' : 'ساعات اليد'}`,
  key: 'Watches',
}, {
  img: '/static/img/landing-home/shoes_home.png',
  title: `${lang === 'en' ? 'Footwear' : 'أحذية'}`,
  link: `/${lang}/clp/${lang === 'en' ? 'Footwear' : 'أحذية'}`,
  key: 'Footwear',
}, {
  img: '/static/img/landing-home/sunglasse_home.png',
  title: `${lang === 'en' ? 'Sunglasses' : 'نظارات شمسية'}`,
  link: `/${lang}/clp/${lang === 'en' ? 'Sunglasses' : 'نظارات شمسية'}`,
  key: 'Sunglasses',
}, {
  img: '/static/img/landing-home/sports_home.png',
  title: `${lang === 'en' ? 'Sports & Outdoors' : 'الرياضات والخارج'}`,
  link: `/${lang}/clp/${lang === 'en' ? 'Sports & Outdoor' : 'الرياضات والخارج'}`,
  key: 'Sports & Outdoors',
}, {
  img: '/static/img/landing-home/fitness_home.png',
  title: `${lang === 'en' ? 'Exercise & Fitness' : ' تدريبات ولياقة'}`,
  link: `/${lang}/clp/${lang === 'en' ? 'Exercise & Fitness' : 'تدريبات ولياقة'}`,
  key: 'Exercise & Fitness',
}, {
  img: '/static/img/landing-home/toys_home.png',
  title: `${lang === 'en' ? 'Toys' : 'ألعاب'}`,
  link: `/${lang}/clp/${lang === 'en' ? 'Toys' : 'ألعاب'}`,
  key: 'Toys',
}, {
  img: '/static/img/landing-home/beauty_and_health.png',
  title: `${lang === 'en' ? 'Health & Beauty' : 'الصحة والجمال'}`,
  link: `/${lang}/clp/${lang === 'en' ? 'Health & Beauty' : 'الصحة والجمال'}`,
  key: 'Health & Beauty',
}, {
  img: '/static/img/landing-home/cushion_squilts.png',
  title: `${lang === 'en' ? 'Cushions & Covers' : 'اغطية وسادات'}`,
  link: `/${lang}/clp/${lang === 'en' ? 'Cushions & Covers' : 'اغطية وسادات'}`,
  key: 'Cushions & Covers',
}, {
  img: '/static/img/landing-home/home_sweet_home.png',
  title: `${lang === 'en' ? 'Door Mats' : 'دواسَّات للباب'}`,
  link: `/${lang}/clp/${lang === 'en' ? 'Door Mats' : 'دواسَّات للباب'}`,
  key: 'Door Mats',
}, {
  img: '/static/img/landing-home/car_freshners.png',
  title: `${lang === 'en' ? 'Car Freshener' : 'معطرات جو'}`,
  link: `/${lang}/clp/${lang === 'en' ? 'Car Freshener' : 'معطرات جو'}`,
  key: 'Car Freshener',
}, {
  img: '/static/img/landing-home/photo_frames.png',
  title: `${lang === 'en' ? 'Photo Frames' : 'إطارات صور'}`,
  link: `/${lang}/clp/${lang === 'en' ? 'Photo Frames' : 'اغطية وسادات'}`,
  key: 'Photo Frames',
}];

const tie = [{
  img: '/static/img/landing-home/Mobiles.png',
  title: `${lang === 'en' ? 'Mobiles' : 'الجوالات'}`,
  link: `/${lang}/clp/${lang === 'en' ? 'mobiles' : 'الهواتف-النقالة'}`,
  key: 'Mobiles',
}, {
  img: '/static/img/landing-home/Laptops.png',
  title: `${lang === 'en' ? 'Laptops' : 'اللاب توبات'}`,
  link: `/${lang}/clp/${lang === 'en' ? 'laptops' : 'أجهزة-الكمبيوتر-المحمولة'}`,
  key: 'Laptops',
}, {
  img: '/static/img/landing-home/memory.png',
  title: `${lang === 'en' ? 'Memory Devices' : 'أجهزة التخزين'}`,
  link: `/${lang}/clp/${lang === 'en' ? 'storage devices' : 'أجهزة التخزين'}`,
  key: 'Memory',
}, {
  img: '/static/img/landing-home/cameras.png',
  title: `${lang === 'en' ? 'Cameras' : 'الكاميرات'}`,
  link: `/${lang}/clp/${lang === 'en' ? 'camera' : 'الة-تصوير'}`,
  key: 'Cameras',
}, {
  img: '/static/img/landing-home/television.png',
  title: `${lang === 'en' ? 'Televisions' : 'التلفزيونات'}`,
  link: `/${lang}/clp/${lang === 'en' ? 'televisions' : 'التلفزيونات'}`,
  key: 'Televisions',
}, {
  img: '/static/img/landing-home/mobileaccess.png',
  title: `${lang === 'en' ? 'Mobile Accessories' : 'اكسسوارات الجوالات'}`,
  link: `/${lang}/clp/${lang === 'en' ? 'mobile-accessories' : 'ملحقات-الهاتف-المحمول'}`,
  key: 'Mobile Accessories',
}, {
  img: '/static/img/landing-home/tablets.png',
  title: `${lang === 'en' ? 'Tablet & iPads' : 'اجهزة تابلت وايباد'}`,
  link: `/${lang}/clp/${lang === 'en' ? 'Tablet & iPads' : 'اجهزة تابلت وايباد'}`,
  key: 'Tablets',
}, {
  img: '/static/img/landing-home/Kitchen-appliances.png',
  title: `${lang === 'en' ? 'Kitchen Appliances' : 'أجهزة المطبخ'}`,
  link: `/${lang}/clp/${lang === 'en' ? 'kitchen-appliances' : 'أدوات-المطبخ'}`,
  key: 'Kitchen Appliances',
}, {
  img: '/static/img/landing-home/smartwatch.png',
  title: `${lang === 'en' ? 'Smart Watches' : 'ساعات ذكية‎'}`,
  link: `/${lang}/clp/${lang === 'en' ? 'Smart Watch' : 'ساعات ذكية'}`,
  key: 'Smart Watch',
}, {
  img: '/static/img/landing-home/homeentertainment.png',
  title: `${lang === 'en' ? 'Home Entertainment' : 'أجهزة ترفيهية'}`,
  link: `/${lang}/clp/${lang === 'en' ? 'Home Entertainment' : 'أجهزة ترفيهية'}`,
  key: 'Home Entertainment',
}, {
  img: '/static/img/landing-home/routers.png',
  title: `${lang === 'en' ? 'Routers' : 'راوترات'}`,
  link: `/${lang}/clp/${lang === 'en' ? 'Routers' : 'راوترات'}`,
  key: 'Routers',
}, {
  img: '/static/img/landing-home/computerperepherals.png',
  title: `${lang === 'en' ? 'Computer Peripherals' : 'ملحقات الكمبيوتر'}`,
  link: `/${lang}/clp/${lang === 'en' ? 'Computer Peripherals' : 'ملحقات الكمبيوتر'}`,
  key: 'Computer Peripherals',
}, {
  img: '/static/img/landing-home/printers_home.png',
  title: `${lang === 'en' ? 'Printers' : 'طابعات'}`,
  link: `/${lang}/clp/${lang === 'en' ? 'Printers' : 'طابعات'}`,
  key: 'Printers',
}, {
  img: '/static/img/landing-home/Home_appliances.png',
  title: `${lang === 'en' ? 'Home Appliances' : 'أجهزة المنزل'}`,
  link: `/${lang}/clp/${lang === 'en' ? 'Home Appliances' : 'أجهزة المنزل'}`,
  key: 'Home Appliances',
}];

class FTB extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { pageData } = this.props;
    if (pageData.device !== 'desktop') return null;
    return (
      <div>
        <HeaderBar />
        <div className={`${styles['p-0']} ${styles['land-page-mn-wdt']} container-fluid`}>
          {pageData && pageData.page_content.length > 0 &&
            pageData.page_content.map((content, index) => (
              <React.Fragment>
                {index === 1 && pageData.page_type === 'homePage' &&
                  <div className={styles['ff-t-i']}>
                    <div className={styles.e}>
                      <span className={`${styles.title} ${styles['fs-20']}`}>{lang === 'en' ? 'ELECTRONICS' : 'الكترونيات‎'}</span>
                      <div className="home-slider">
                        <Slider
                          asNavFor={sliderTIE}
                          ref={slider => (sliderTIE = slider)}
                          lazyLoad
                          className={`${styles['ht-100per']}`}
                          slidesToShow={10}
                        >
                          {tie.map(i => (
                            <div>
                              <div className={styles.item} key={i}>
                                <a href={i.link}>
                                  <img src={i.img} alt={i.title} />
                                </a>
                                <span className={`${styles['fs-10']} ${styles['pt-10']} ${styles.flex} ${styles['justify-center']} ${styles['slider-elips']} ${styles['lne-ht1_2']}`}>{i.title}</span>
                              </div>
                            </div>
                            ))}
                        </Slider>
                      </div>
                    </div>
                    <div className={styles['h-a-l']}>
                      <span className={`${styles.title} ${styles['fs-20']}`}> {lang === 'en' ? 'FASHION & LIFESTYLE' : 'أزياء و لايف ستايل'}</span>
                      <div className="home-slider">
                        <Slider
                          asNavFor={sliderHAL}
                          ref={slider => (sliderHAL = slider)}
                          lazyLoad
                          className={styles['ht-100per']}
                          slidesToShow={10}
                        >
                          {hal.map(i => (
                            <div>
                              <div className={styles.item} key={i}>
                                <a href={i.link}>
                                  <img src={i.img} />
                                </a>
                                <span className={`${styles['fs-10']} ${styles['pt-10']} ${styles['justify-center']} ${styles['slider-elips']} ${styles['lne-ht1_2']}`}>{i.title}</span>
                              </div>
                            </div>
                          ))}
                        </Slider>
                      </div>
                    </div>
                  </div>}
                <PageData key={content} index={index} content={content} />
              </React.Fragment>
            ))}
        </div>
        <FooterBar />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  pageData: selectors.getPage(store),
});

export default connect(mapStateToProps, null)(FTB);
