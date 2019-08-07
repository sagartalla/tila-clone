import React from 'react';
import Slider from 'react-slick';
import { Row } from 'react-bootstrap';

import DT from './includes/DT';
import FT from './includes/FT';
import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './pageData_en.styl';
import styles_ar from './pageData_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

let sliderTBS = '';
// let sliderTIE = '';
// let sliderHAL = '';

// const tie = [{
//   img: '/static/img/landing-home/Mobiles.png',
//   title: 'Mobiles',
//   link: `/${lang}/srp/mobiles?categoryTree=true&isListed=false&sid=848,849`,
// }, {
//   img: '/static/img/landing-home/Laptops.png',
//   title: 'Laptops',
//   link: `/${lang}/srp/laptops?categoryTree=true&isListed=false&sid=848,864`,
// }, {
//   img: '/static/img/landing-home/storage-devices.png',
//   title: 'Storage Devices',
//   link: `/${lang}/search?q=Storage&&isListed=false`,
// }, {
//   img: '/static/img/landing-home/cameras.png',
//   title: 'Cameras',
//   link: `/${lang}/srp/camera?categoryTree=true&isListed=false&sid=848,882`,
// }, {
//   img: '/static/img/landing-home/television.png',
//   title: 'Televisions',
//   link: `/${lang}/srp/televisions?categoryTree=true&isListed=false&sid=848,878`,
// }, {
//   img: '/static/img/landing-home/home-appliances.png',
//   title: 'Home Appliances',
//   link: `/${lang}/srp/home-applaince?categoryTree=true&isListed=false&sid=932,935`,
// }, {
//   img: '/static/img/landing-home/storage-devices.png',
//   title: 'Storage Devices',
//   link: `/${lang}/search?q=Storage&&isListed=false`,
// }];

// const hal = [{
//   img: '/static/img/landing-home/womens-clothing.png',
//   title: 'Womens Clothing',
//   link: `/${lang}/srp/clothing?categoryTree=true&isListed=false&sid=892,910`,
// }, {
//   img: '/static/img/landing-home/mens-clothing.png',
//   title: 'Mens Clothing',
//   link: `/${lang}/srp/clothing?categoryTree=true&isListed=false&sid=892,899`,
// }, {
//   img: '/static/img/landing-home/jewellery.png',
//   title: 'Jewellery',
//   link: `/${lang}/search?q=Jewellery&&isListed=false`,
// }, {
//   img: '/static/img/landing-home/fashion-acessories.png',
//   title: 'Fashion Accessories',
//   link: `/${lang}/srp/fashion-accessories?categoryTree=true&isListed=false&sid=892,923`,
// }, {
//   img: '/static/img/landing-home/watches.png',
//   title: 'Watches',
//   link: `/${lang}/srp/watch?categoryTree=true&isListed=false&sid=892,929`,
// }, {
//   img: '/static/img/landing-home/perfumes.png',
//   title: 'Perfumes',
//   link: `/${lang}/srp/fragrance?categoryTree=true&isListed=false&sid=932,958,964`,
// }, {
//   img: '/static/img/landing-home/jewellery.png',
//   title: 'Jewellery',
//   link: `/${lang}/search?q=Jewellery&&isListed=false`,
// }];

class PageData extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  // breadcrums are pending...
  getContent = () => {
    const { content, index } = this.props;
    switch (content.layout_id) {
      case 'CT1a':
        return (
          <div className={`${styles['mb-20']} top-banner-slider slider-dots-part`}>
            {content.data[lang].title && <h3 className={styles['mt-0']}>{content.data[lang].title}</h3>}
            <Slider
              dots
              autoplay
              asNavFor={sliderTBS}
              ref={(slider) => { sliderTBS = slider; }}
              lazyLoad={false}
              className={`${styles['main-slider-part']} ${styles.flex} ${styles['flex-colum']}`}
              customPaging={i => <span className={`${styles['fs-10']}`}>{content.data[lang].banners[i].display_name}</span>}
            >
              {content.data[lang].banners.map(i => (
                <div key={i.display_name}>
                  <a href={i.link}>
                    <div className={`${styles.item} ${styles['slick-itm']}`} key={i.display_name}>
                      <img src={i.img} alt={i.display_name} />
                    </div>
                  </a>
                </div>
              ))}
            </Slider>
          </div>
        );
      case 'CT1':
        return (
          <div className={`${styles['mb-20']} top-banner-slider slider-dots-part`}>
            {content.data[lang].title && <h3 className={styles['mt-0']}>{content.data[lang].title}</h3>}
            <Slider
              dots
              autoplay
              asNavFor={sliderTBS}
              ref={(slider) => { sliderTBS = slider; }}
              lazyLoad={false}
              className={`${styles['main-slider-part']} ${styles.flex} ${styles['flex-colum']}`}
              customPaging={i => <span className={`${styles['fs-10']}`}>{content.data[lang].banners[i].display_name}</span>}
            >
              {content.data[lang].banners.map(i => (
                <div key={i.display_name}>
                  <a href={i.link}>
                    <div className={`${styles.item} ${styles['slick-itm']}`} key={i.display_name}>
                      <img src={i.img} alt={i.display_name} />
                    </div>
                  </a>
                </div>
              ))}
            </Slider>
          </div>
        );
      // case 'BT9':
      //   return (
      //     <div className={styles['ff-t-i']}>
      //       <div className={`${styles.e} ${styles['mr-5']}`}>
      //         <span className={`${styles.title} ${styles['fs-20']}`}>TOP IN ELECTRONICS</span>
      //         <Slider
      //           asNavFor={sliderTIE}
      //           ref={(slider) => { sliderTIE = slider; }}
      //           lazyLoad
      //           className={styles['ht-100per']}
      //           slidesToShow={6}
      //         >
      //           {tie.map(i => (
      //             <div className={styles.item} key={i}>
      //               <a href={i.link}>
      //                 <img src={i.img} alt={i.title} />
      //               </a>
      //               <span
      // className={`${styles['fs-12']} ${styles['pt-10']} ${styles.flex}
      // ${styles['justify-center']} ${styles['slider-elips']} ${styles['lne-ht1_2']}`}>
      // {i.title}</span>
      //             </div>
      //           ))}
      //         </Slider>
      //       </div>
      //       <div className={`${styles['h-a-l']} ${styles['ml-5']}`}>
      //         <span className={`${styles.title} ${styles['fs-20']}`}>
      // TOP IN FASHION | LIFESTYLE</span>
      //         <Slider
      //           asNavFor={sliderHAL}
      //           ref={(slider) => { sliderHAL = slider; }}
      //           lazyLoad
      //           className={styles['ht-100per']}
      //           slidesToShow={6}
      //         >
      //           {hal.map(i => (
      //             <div className={styles.item} key={i}>
      //               <a href={i.link}>
      //                 <img src={i.img} alt="" />
      //               </a>
      //               <span className={`${styles['fs-12']} ${styles['pt-10']} ${styles.flex}
      // ${styles['justify-center']} ${styles['slider-elips']} ${styles['lne-ht1_2']}`}>
      // {i.title}</span>
      //             </div>
      //           ))}
      //         </Slider>
      //       </div>
      //     </div>
      //   );
      case 'BT2':
      case 'BT3':
      case 'BT4':
      case 'BT7': {
        const { banners } = content.data[lang];
        return (
          <Row className={`${styles['banner-prt-main']} ${styles['m-0']}`}>
            {banners.length > 0 &&
              banners.map(banner => (
                <div className={styles['banner-inn-prt']} style={{ width: `${100 / banners.length}%` }}>
                  <div className={styles['sub-banr-img']}>
                    <a href={banner.link} rel="noopener noreferrer" target="_blank">
                      <img src={banner.img} className={`${styles['border-radius4']} ${styles['inside-bnr']}`} alt={banner.display_name} />
                    </a>
                  </div>
                </div>
              ))}
          </Row>
        );
      }
      case 'DT1':
        return (
          <DT content={content} index={`${content.layout_id}${index}`} />
        );
      case 'FT1': return <FT content={content} index={`${content.layout_id}${index}`} />;
      case 'CBT5b': {
        const { banners, breadcrumb, title } = content.data[lang];
        return (
          <div className={`${styles['display-t-i-f']}`}>
            <div className={`${styles['fs-20']} ${styles.title}`}>{title}</div>
            <div className={styles.d1}>
              <div>
                <a href={banners[0].link}>
                  <div className={styles.shadow}>
                    <img src={banners[0].img} width={banners[0].config.width} height={banners[0].config.height} alt="" className={styles['img-responsive']} />
                  </div>
                </a>
              </div>
              <div>
                <a href={banners[1].link}>
                  <div className={styles.shadow}>
                    <img src={banners[1].img} width={banners[1].config.width} height={banners[1].config.height} alt="" className={styles['img-responsive']} />
                  </div>
                </a>
              </div>
            </div>
            <div className={styles.d2}>
              <div>
                <a href={banners[2].link}>
                  <div className={styles.shadow}>
                    <img src={banners[2].img} width={banners[2].config.width} height={banners[2].config.height} alt="" className={styles['img-responsive']} />
                  </div>
                </a>
              </div>
              <div>
                <a href={banners[3].link}>
                  <div className={styles.shadow}>
                    <img src={banners[3].img} width={banners[3].config.width} height={banners[3].config.height} alt="" className={styles['img-responsive']} />
                  </div>
                </a>
              </div>
            </div>
            <div className={`${styles.d3} ${styles.right0}`}>
              <div>
                <a href={banners[4].link}>
                  <div className={styles.shadow}>
                    <img src={banners[4].img} width={banners[4].config.width} height={banners[4].config.height} alt="" className={styles['img-responsive']} />
                  </div>
                </a>
              </div>
            </div>
            <div className={`${styles['thick-gry-clr']} ${styles['fs-14']} ${styles['mt-10']} ${styles.pointer}`}>
              {breadcrumb.length > 0 &&
                breadcrumb.map((bc, idx) => (
                  <React.Fragment>
                    <a className={styles['thick-gry-clr']} href={bc.link}>
                      <span>{bc.display_name}</span>
                    </a>
                    {breadcrumb.length - 1 !== idx && <span className={`${styles['ml-5']} ${styles['mr-5']}`}>|</span>}
                  </React.Fragment>
                ))}
            </div>
          </div>
        );
      }
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
