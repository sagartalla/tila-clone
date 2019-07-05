import React from 'react';
import Slider from 'react-slick';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './pageData_en.styl';
import styles_ar from './pageData_ar.styl';


const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

let sliderTBS = '';
let sliderTIE = '';
let sliderHAL = '';

const tie = [{
  img: '/static/img/landing-home/Mobiles.png',
  title: 'Mobiles',
}, {
  img: '/static/img/landing-home/Laptops.png',
  title: 'Laptops',
}, {
  img: '/static/img/landing-home/storage-devices.png',
  title: 'Storage Devices',
}, {
  img: '/static/img/landing-home/cameras.png',
  title: 'Cameras',
}, {
  img: '/static/img/landing-home/television.png',
  title: 'Televisions',
}, {
  img: '/static/img/landing-home/home-appliances.png',
  title: 'Home Appliances',
}, {
  img: '/static/img/landing-home/storage-devices.png',
  title: 'Storage Devices',
}];

const hal = [{
  img: '/static/img/landing-home/womens-clothing.png',
  title: 'Womens Clothing',
}, {
  img: '/static/img/landing-home/mens-clothing.png',
  title: 'Mens Clothing',
}, {
  img: '/static/img/landing-home/jewellery.png',
  title: 'Jewellery',
}, {
  img: '/static/img/landing-home/fashion-acessories.png',
  title: 'Fashion Accessories',
}, {
  img: '/static/img/landing-home/watches.png',
  title: 'Watches',
}, {
  img: '/static/img/landing-home/perfumes.png',
  title: 'Perfumes',
}, {
  img: '/static/img/landing-home/jewellery.png',
  title: 'Jewellery',
}];

const b_d_b = {
  Mobiles: 'SAU/en/srp/mobiles?categoryTree=true&isListed=false&sid=848,849',
  Clothing: '/SAU/en/srp?isListed=false&&search=Clothing',
  'Clothing Accessories': '/SAU/en/srp?search=Clothing&&isListed=false',
  Laptops: '/SAU/en/srp/laptops?categoryTree=true&isListed=false&sid=848,864',
  'Storage Devices': '/SAU/en/srp?search=Storage&&isListed=false',
  Cameras: '/SAU/en/srp/camera?categoryTree=true&isListed=false&sid=848,882',
  Televisions: '/SAU/en/srp/televisions?categoryTree=true&isListed=false&sid=848,878',
  'Home Appliances': '/SAU/en/srp/home-applaince?categoryTree=true&isListed=false&sid=932,935',
  'Womens Clothing': '/SAU/en/srp/clothing?categoryTree=true&isListed=false&sid=892,910',
  'Mens Clothing': '/SAU/en/srp/clothing?categoryTree=true&isListed=false&sid=892,899',
  'Fashion Accessories': '/SAU/en/srp/fashion-accessories?categoryTree=true&isListed=false&sid=892,923',
  Watches: '/SAU/en/srp/watch?categoryTree=true&isListed=false&sid=892,929',
  'Kitchen Appliances': '/SAU/en/srp/kitchen-appliances?categoryTree=true&isListed=false&sid=932,945',
  Speakers: '/SAU/en/srp?search=Speakers&&isListed=false',
  'Microwave Ovens': '/SAU/en/srp?search=Microwave%20Ovens&&isListed=false',
  'Smart Watch': '/SAU/en/srp/smart-watches?categoryTree=true&isListed=false&sid=848,860,861',
  'Mobile Accessories': '/SAU/en/srp/mobile-accessories?categoryTree=true&isListed=false&sid=848,850',
  "Kid's Fashion": '/SAU/en/srp/kid%27s?categoryTree=true&isListed=false&sid=892,893',
  Footwear: '/SAU/en/srp?search=Footwear&&isListed=false',
  "Men's Footwear": '/SAU/en/srp/footwear?categoryTree=true&isListed=false&sid=892,907',
  'Women Footwear': '/SAU/en/srp/footwear?categoryTree=true&isListed=false&sid=892,921',
  Bags: '/SAU/en/srp/backpack?categoryTree=true&isListed=false&sid=892,926',
  Eyewear: '/SAU/en/srp?search=Eyewear&&isListed=false',
  Jewellery: '/SAU/en/srp?search=Jewellery&&isListed=false',
  GUESS: '/SAU/en/srp/womens-clothing-1056/?isListed=false&&search=guess',
  FENDI: 'https://storefront-stage.fptechscience.com/SAU/en/srp/watches-1128/?isListed=false&&search=FENDI',
  'MORPHY RICHARDS': '/SAU/en/srp?search=MORPHY%20RICHARDS%20&disableSpellCheck=true&&isListed=false',
  SHIRTS: '/SAU/en/srp?search=SHIRTS&&isListed=false',
  Perfumes: '/SAU/en/srp/fragrance?categoryTree=true&isListed=false&sid=932,958,964',
  Shoes: '/SAU/en/srp?search=Shoes&&isListed=false',
  Lights: '/SAU/en/srp/light?categoryTree=true&isListed=false&sid=932,937,940',
  lamps: '/SAU/en/srp/lamp?categoryTree=true&isListed=false&sid=932,937,939',
  bedding: '/SAU/en/srp/bedding-set?categoryTree=true&isListed=false&sid=932,941,942',
  furniture: '/SAU/en/srp/home-furnishing?categoryTree=true&isListed=false&sid=932,941',
  'HOME DECOR': '/SAU/en/srp?search=HOME%20DECOR&isListed=false',
  LAPTOPS: '/SAU/en/srp/laptops?categoryTree=true&isListed=false&sid=848,864',
  'MENS CLOTHING': '/SAU/en/srp/clothing?categoryTree=true&isListed=false&sid=892,899',
  'MOBILE ACCESSORIES': '/SAU/en/srp/mobile-accessories?categoryTree=true&isListed=false&sid=848,850',
  'PERFUMES FOR WOMEN': '/SAU/en/srp?search=perfumes&categoryTree=true&isListed=false',
  WATCHES: '/SAU/en/srp/watch?categoryTree=true&isListed=false&sid=892,929',
};


class PageData extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  getContent = () => {
    const { content } = this.props;
    console.log('dfeced', content);
    switch (content.layout_id) {
      case 'BT2':
        return (
          <div className={`${styles['mb-40']} top-banner-slider`}>
            <Slider
              dots
              autoplay
              asNavFor={sliderTBS}
              ref={(slider) => { sliderTBS = slider; }}
              lazyLoad={false}
              className={styles['ht-100per']}
              customPaging={i => <span className={`${styles['fs-10']}`}>{content.data[lang].banners[i].display_name}</span>}
            >
              {
                content.data[lang].banners.map(i => (
                  <div key={i.display_name}>
                    <a href={i.link}>
                      <div className="item" key={i.display_name}>
                        <img src={i.img} />
                      </div>
                    </a>
                  </div>
                ))
              }
            </Slider>
          </div>
        );
      case 'BT9':
        return (
          <div className={styles['ff-t-i']}>
            <div className={styles.e}>
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
                    <a href={b_d_b[i.title]}>
                      <img src={i.img} alt={i.title} />
                    </a>
                    <span className={`${styles['fs-12']} ${styles['pt-10']} ${styles.flex} ${styles['justify-center']} ${styles['slider-elips']} ${styles['lne-ht1_2']}`}>{i.title}</span>
                  </div>
                ))}
              </Slider>
            </div>
            <div className={styles['h-a-l']}>
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
                    <a href={b_d_b[i.title]}>
                      <img src={i.img} />
                    </a>
                    <span className={`${styles['fs-12']} ${styles['pt-10']} ${styles.flex} ${styles['justify-center']} ${styles['slider-elips']} ${styles['lne-ht1_2']}`}>{i.title}</span>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        );
      case 'DT1':
        return (
          <div>APBD</div>
        );
      default: return null;
    }
  }

  render() {
    return (
      <div>{this.getContent()}</div>
    );
  }
}

export default PageData;
