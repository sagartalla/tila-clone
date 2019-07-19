import React from 'react';
import Slider from 'react-slick';
import Cookies from 'universal-cookie';

import DT from './includes/DT';
import { Row, Col } from 'react-bootstrap';
import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './pageData_en.styl';
import styles_ar from './pageData_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const cookies = new Cookies();

const country = cookies.get('country') || 'SAU';

let sliderTBS = '';
let sliderTIE = '';
let sliderHAL = '';

const tie = [{
  img: '/static/img/landing-home/Mobiles.png',
  title: 'Mobiles',
  link: `/${country}/${lang}/srp/mobiles?categoryTree=true&isListed=false&sid=848,849`,
}, {
  img: '/static/img/landing-home/Laptops.png',
  title: 'Laptops',
  link: `/${country}/${lang}/srp/laptops?categoryTree=true&isListed=false&sid=848,864`,
}, {
  img: '/static/img/landing-home/storage-devices.png',
  title: 'Storage Devices',
  link: `/${country}/${lang}/search?q=Storage&&isListed=false`,
}, {
  img: '/static/img/landing-home/cameras.png',
  title: 'Cameras',
  link: `/${country}/${lang}/srp/camera?categoryTree=true&isListed=false&sid=848,882`,
}, {
  img: '/static/img/landing-home/television.png',
  title: 'Televisions',
  link: `/${country}/${lang}/srp/televisions?categoryTree=true&isListed=false&sid=848,878`,
}, {
  img: '/static/img/landing-home/home-appliances.png',
  title: 'Home Appliances',
  link: `/${country}/${lang}/srp/home-applaince?categoryTree=true&isListed=false&sid=932,935`,
}, {
  img: '/static/img/landing-home/storage-devices.png',
  title: 'Storage Devices',
  link: `/${country}/${lang}/search?q=Storage&&isListed=false`,
}];

const hal = [{
  img: '/static/img/landing-home/womens-clothing.png',
  title: 'Womens Clothing',
  link: `/${country}/${lang}/srp/clothing?categoryTree=true&isListed=false&sid=892,910`,
}, {
  img: '/static/img/landing-home/mens-clothing.png',
  title: 'Mens Clothing',
  link: `/${country}/${lang}/srp/clothing?categoryTree=true&isListed=false&sid=892,899`,
}, {
  img: '/static/img/landing-home/jewellery.png',
  title: 'Jewellery',
  link: `/${country}/${lang}/search?q=Jewellery&&isListed=false`,
}, {
  img: '/static/img/landing-home/fashion-acessories.png',
  title: 'Fashion Accessories',
  link: `/${country}/${lang}/srp/fashion-accessories?categoryTree=true&isListed=false&sid=892,923`,
}, {
  img: '/static/img/landing-home/watches.png',
  title: 'Watches',
  link: `/${country}/${lang}/srp/watch?categoryTree=true&isListed=false&sid=892,929`,
}, {
  img: '/static/img/landing-home/perfumes.png',
  title: 'Perfumes',
  link: `/${country}/${lang}/srp/fragrance?categoryTree=true&isListed=false&sid=932,958,964`,
}, {
  img: '/static/img/landing-home/jewellery.png',
  title: 'Jewellery',
  link: `/${country}/${lang}/search?q=Jewellery&&isListed=false`,
}];

class PageData extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  getContent = () => {
    const { content } = this.props;
    switch (content.layout_id) {
      case 'BT2':
        return (
          <div className={`${styles['mb-40']} top-banner-slider`}>
            <h3>{content.data[lang].title}</h3>
            <Slider
              dots
              autoplay
              asNavFor={sliderTBS}
              ref={(slider) => { sliderTBS = slider; }}
              lazyLoad={false}
              className={styles['ht-100per']}
              customPaging={i => <span className={`${styles['fs-10']}`}>{content.data[lang].banners[i].display_name}</span>}
            >
              {content.data[lang].banners.map(i => (
                <div key={i.display_name}>
                  <a href={i.link}>
                    <div className="item" key={i.display_name}>
                      <img src={i.img} width={i.config.width} height={i.config.height} alt={i.display_name} />
                    </div>
                  </a>
                </div>
              ))}
            </Slider>
          </div>
        );
      case 'BT9':
        return (
          <div className={styles['ff-t-i']}>
            <div className={`${styles.e} ${styles['mr-5']}`}>
              <span className={`${styles.title} ${styles['fs-20']}`}>TOP IN ELECTRONICS</span>
              <Slider
                asNavFor={sliderTIE}
                ref={slider => (sliderTIE = slider)}
                lazyLoad
                className={styles['ht-100per']}
                slidesToShow={6}
              >
                {tie.map(i => (
                  <div className={styles.item} key={i}>
                    <a href={i.link}>
                      <img src={i.img} alt={i.title} />
                    </a>
                    <span className={`${styles['fs-12']} ${styles['pt-10']} ${styles.flex} ${styles['justify-center']} ${styles['slider-elips']} ${styles['lne-ht1_2']}`}>{i.title}</span>
                  </div>
                ))}
              </Slider>
            </div>
            <div className={`${styles['h-a-l']} ${styles['ml-5']}`}>
              <span className={`${styles.title} ${styles['fs-20']}`}>TOP IN FASHION | LIFESTYLE</span>
              <Slider
                asNavFor={sliderHAL}
                ref={slider => (sliderHAL = slider)}
                lazyLoad
                className={styles['ht-100per']}
                slidesToShow={6}
              >
                {hal.map(i => (
                  <div className={styles.item} key={i}>
                    <a href={i.link}>
                      <img src={i.img} />
                    </a>
                    <span className={`${styles['fs-12']} ${styles['pt-10']} ${styles.flex} ${styles['justify-center']} ${styles['slider-elips']} ${styles['lne-ht1_2']}`}>{i.title}</span>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        );
      case 'BT7': {
        const { banners, title } = content.data[lang];
        return (
          <Row>
            {/* {title &&
              <Col xs={12} md={12} sm={12}><h2 className={`${styles['fs-20']} ${styles.fontW600} ${styles['text-uppercase']} ${styles['mb-5']} ${styles['m-0']}`}>{title}</h2></Col>} */}
            {banners.length > 0 &&
              banners.map(banner => (
                <Col xs={12 / banners.length} md={12 / banners.length} sm={12 / banners.length}>
                  <a href={banner.link} target="_blank">
                    <img src={banner.img} className={styles['border-radius4']} width={banner.config.width} height={banner.config.height} alt={banner.display_name} />
                  </a>
                </Col>
              ))}
          </Row>
        );
      }
      case 'DT1':
        return (
          <DT content={content} />
        );
      default: return null;
    }
  }

  render() {
    const { content } = this.props;

    if (!content.visible) return null;

    return this.getContent();
  }
}

export default PageData;
