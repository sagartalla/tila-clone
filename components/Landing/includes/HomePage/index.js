import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Slider from 'react-slick';
import NoSSR from 'react-no-ssr';

import SVGComponent from '../../../common/SVGComponet';
import { mergeCss } from '../../../../utils/cssUtil';

const styles = mergeCss('components/Landing/includes/HomePage/homepage');

let sliderTBS,
  sliderTIE,
  sliderHAL,
  sliderDODAY;

// const tie = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const tbs = [{
  img: '/static/img/landing-home/guess-banner.jpg',
  title: 'GUESS',
}, {
  img: '/static/img/landing-home/fendi.jpg',
  title: 'FENDI',
}, {
  img: '/static/img/landing-home/morphy-richards.jpg',
  title: 'MORPHY RICHARDS',
}, {
  img: '/static/img/landing-home/shirt.jpg',
  title: 'SHIRTS',
}, {
  img: '/static/img/landing-home/mac.jpg',
  title: 'MAC',
}];

const tie = [{
  img: '/static/img/landing-home/Mobiles.png',
  title: 'Mobile',
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
  title: 'Television',
}, {
  img: '/static/img/landing-home/home-appliances.png',
  title: 'Home Appliances',
}, {
  img: '/static/img/landing-home/home-appliances.png',
  title: 'Home Appliances',
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
  img: '/static/img/landing-home/perfumes.png',
  title: 'Perfumes',
}];

const d_tie = [
  'static/img/landing-home/d-laptops.png',
  'static/img/landing-home/d-mobiles.png',
  'static/img/landing-home/d-cameras.png',
  'static/img/landing-home/d-kitchen.png',
  'static/img/landing-home/d-audio.png',
];

const d_tif = [
  'static/img/landing-home/kids-fashion.png',
  'static/img/landing-home/t-women-cloths.png',
  'static/img/landing-home/shoes.png',
  'static/img/landing-home/t-watches.png',
  'static/img/landing-home/t-mens-cloths.png',
];

const d_tihl = [
  'static/img/landing-home/kids-furniture.png',
  'static/img/landing-home/living-room-furniture.png',
  'static/img/landing-home/tables.png',
  'static/img/landing-home/cushions.png',
  'static/img/landing-home/lights.png',
];

const d_o_day = [{
  img: '/static/img/landing-home/samsung.png',
  title: 'Galaxy Note 8 Dual SIM - 64GB, 6GB RAM',
  brand: 'Samsung',
  currency: 'SAR',
  price: '1200.00',
  mrp: '2200.00',
}, {
  img: '/static/img/landing-home/casio.png',
  title: 'Edifice Pro',
  brand: 'Casio',
  currency: 'SAR',
  price: '790.00',
  mrp: '900.00',
}, {
  img: '/static/img/landing-home/sennheiser.png',
  title: 'Dual Pro 2.1 Surround',
  brand: 'Sennheiser',
  currency: 'SAR',
  price: '1000.00',
  mrp: '1600.00',
}, {
  img: '/static/img/landing-home/bean_bag.png',
  title: 'Bean Bag',
  brand: 'Omega',
  currency: 'SAR',
  price: '400.00',
  mrp: '600.00',
}, {
  img: '/static/img/landing-home/case.png',
  title: 'Case Cover',
  brand: 'Catapult',
  currency: 'SAR',
  price: '100.00',
  mrp: '150.00',
}, {
  img: '/static/img/landing-home/t_shirt.png',
  title: 'Mickey Minnie Mouse',
  brand: 'Firstcry',
  currency: 'SAR',
  price: '300.00',
  mrp: '400.00',
}, {
  img: '/static/img/landing-home/sennheiser.png',
  title: 'Dual Pro 2.1 Surround',
  brand: 'Sennheiser',
  currency: 'SAR',
  price: '1000.00',
  mrp: '1600.00',
}];

const twoCols = [{
  img: '/static/img/landing-home/ps4.jpg',
  title: 'PS4 Pro',
}, {
  img: '/static/img/landing-home/alien.jpg',
  title: 'Alienware',
}];

const threeCols = [{
  img: '/static/img/landing-home/shoes.jpg',
  title: 'Shoes',
}, {
  img: '/static/img/landing-home/ls2.jpg',
  title: 'LS2',
}, {
  img: '/static/img/landing-home/furniture.jpg',
  title: 'Furniture',
}];

const b_y_l = [{
  img: '/static/img/landing-home/levis-m.jpg',
  brandImg: '/static/img/landing-home/levis.jpg',
  title: 'Levis',
}, {
  img: '/static/img/landing-home/guess-m.jpg',
  brandImg: '/static/img/landing-home/guess.jpg',
  title: 'Guess',
}, {
  img: '/static/img/landing-home/max-m.jpg',
  brandImg: '/static/img/landing-home/max.jpg',
  title: 'Max',
}, {
  img: '/static/img/landing-home/gucci-m.jpg',
  brandImg: '/static/img/landing-home/gucci.jpg',
  title: 'Gucci',
}, {
  img: '/static/img/landing-home/levis-m.jpg',
  brandImg: '/static/img/landing-home/levis.jpg',
  title: 'Levis',
}];

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className={styles['leftArrow']}
      onClick={onClick}
    >
      <img src="/static/img/landing-home/c-left.svg" alt="left" />
    </div>
  );
}

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className={styles['rightArrow']}
      onClick={onClick}
    >
      <img src="/static/img/landing-home/c-right.svg" alt="right" />
    </div>
  );
}

const b_d_b = {"Mobiles":"https://storefront-stage.fptechscience.com/srp?search=Mobiles&language=en&isListed=false","Clothing":"https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=Clothing","Clothing Accessories":"https://storefront-stage.fptechscience.com/srp?search=Clothing&language=en&isListed=false","Laptops":"https://storefront-stage.fptechscience.com/srp/laptop-1173/?search=Laptops&language=en&isListed=false","Storage Devices":"https://storefront-stage.fptechscience.com/srp?search=Storage&language=en&isListed=false","Cameras":"https://storefront-stage.fptechscience.com/srp?search=Camera&language=en&isListed=false","Television":"https://storefront-stage.fptechscience.com/srp/Televisions-878?categoryTree=true&isListed=false","Home Appliances":"https://storefront-stage.fptechscience.com/srp?search=Home%20Appliances&language=en&isListed=false","Womens Clothing":"https://storefront-stage.fptechscience.com/srp/Clothing-910?categoryTree=true&isListed=false","Mens Clothing":"https://storefront-stage.fptechscience.com/srp/Clothing-899?categoryTree=true&isListed=false","Fashion Accessories":"https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=Fashion%20Accessories","Watches":"https://storefront-stage.fptechscience.com/srp/watches-1128/?isListed=false&language=en&search=Watch","Kitchen Appliances":"https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=Kitchen%20Appliances","Speakers":"https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=Speaker","Microwave Ovens":"https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=Microwave%20oven","Smart Watch":"https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=Smart%20Watch","Mobile Accessories":"https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=Mobile%20Accessories\t\t\t\t\t\t\t\t\t\t\t\t\t","Kid's Fashion":"https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=Kids","Footwear":"https://storefront-stage.fptechscience.com/srp/Footwear-921?categoryTree=true&isListed=false&language=en","Men's Footwear":"https://storefront-stage.fptechscience.com/srp/Footwear-921?categoryTree=true&isListed=false&language=en","Women Footwear":"https://storefront-stage.fptechscience.com/srp/Footwear-921?categoryTree=true&isListed=false&language=en","Bags":"https://storefront-stage.fptechscience.com/srp/Backpack-926?categoryTree=true&isListed=false&language=en","Eyewear":"https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=eyewear","Jewellery":"https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=Jewellery","GUESS":"https://storefront-stage.fptechscience.com/srp/womens-clothing-1056/?isListed=false&language=en&search=guess","FENDI":"https://storefront-stage.fptechscience.com/srp/watches-1128/?isListed=false&language=en&search=FENDI","MORPHY RICHARDS":"https://storefront-stage.fptechscience.com/srp/home-kitchen-appliances-1010/?isListed=false&language=en&search=morphy%20richards","SHIRTS":"https://storefront-stage.fptechscience.com/srp?search=shirts&language=en&isListed=false","Perfumes": "https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=FENDI", "Shoes": "https://storefront-stage.fptechscience.com/srp/footwear-1101/?isListed=false&language=en&search=Shoe", "Lights": "https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=Lights"}

const HomePage = () => (
  <NoSSR>
    <div className={styles['home-style-main']}>
      <div className={`${styles['mb-40']} top-banner-slider`}>
        <Slider
          dots
          asNavFor={sliderTBS}
          ref={slider => (sliderTBS = slider)}
          lazyLoad={false}
          className={styles['ht-100per']}
          customPaging={function (i) {
            return (
              <span className={`${styles['fs-10']}`}>{tbs[i].title}</span>
            );
          }}
        >
          {tbs.map(i => (
            <div>
              <a href={b_d_b[i.title]}>
                <div className={styles['item']} key={i}>
                  <img src={i.img} />
                </div>
              </a>
            </div>
          ))}
        </Slider>
      </div>
      <div className={styles['ff-t-i']}>
        <div className={styles.e}>
          <span className={`${styles.title} ${styles['fs-18']}`}>TOP IN ELECTRONICS</span>
          <Slider
            asNavFor={sliderTIE}
            ref={slider => (sliderTIE = slider)}
            lazyLoad
            className={styles['ht-100per']}
            slidesToShow={6}
          >
            {tie.map(i => (
              <div>
                <div className={styles.item} key={i}>
                  <a href={b_d_b[i.title]}>
                    <img src={i.img} alt={i.title} />
                  </a>
                  <span>{i.title}</span>
                </div>
              </div>
              ))}
          </Slider>
        </div>
        <div className={styles['h-a-l']}>
          <span className={`${styles.title} ${styles['fs-18']}`}>TOP IN FASHION AND HOME & LIVING</span>
          <Slider
            asNavFor={sliderHAL}
            ref={slider => (sliderHAL = slider)}
            lazyLoad
            className={styles['ht-100per']}
            slidesToShow={6}
          >
            {hal.map((i) => {
              return (
                <div>
                  <div className={styles['item']} key={i}>
                    <a href={b_d_b[i.title]}>
                      <img src={i.img} />
                    </a>
                    <span>{i.title}</span>
                  </div>
                </div>
            )})}
          </Slider>
        </div>
      </div>
      <Row className={styles['d_items']}>
        <div className={`${styles['flex-center']} ${styles['mb-15']}`}>
          <span className={`${styles.title} ${styles['fs-18']}`}>DEALS OF THE DAY</span>
          <span className={`${styles.timer} ${styles['flex-center']}`}>
            <SVGComponent clsName={styles.time} src="icons/common-icon/timer" />
            <span className={`${styles['fs-12']} ${styles['pl-25']}`}>
              <span className={styles.fontW600}>ENDS IN:</span>  17 : 16 : 50
            </span>
          </span>
        </div>
        <Slider
          asNavFor={sliderDODAY}
          ref={slider => (sliderDODAY = slider)}
          lazyLoad
          className={styles['ht-100per']}
          slidesToShow={6}
          nextArrow={<SampleNextArrow />}
          prevArrow={<SamplePrevArrow />}
        >
          {d_o_day.map(i => (
            <div className={styles.relative}>
              <div className={styles.d_item} key={i}>
                <div className={styles.image}>
                  <img src={i.img} alt={i.title} />
                </div>
                <div className={styles['t_n_p']}>
                  <div>
                    <span className={styles['fontW600']}>{i.brand}</span>{' '}-{' '}
                    <span>{i.title}</span>
                  </div>
                  <div>
                    <span className={`${styles['fontW600']} ${styles['fs-12']}`}>{i.currency}</span>&nbsp;
                    <span className={`${styles['fontW600']} ${styles['fs-18']}`}>{i.price}</span>&nbsp;&nbsp;
                    <span className={styles['light-gray']}><s>{i.mrp}</s></span>
                  </div>
                </div>
                <div className={styles['b_n_c']}>
                  <button className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['buy_now']}`}>BUY NOW</button>
                  <button className={`${styles['fp-btn']} ${styles['add_to_cart']}`}>ADD TO CART</button>
                </div>
              </div>
              <div className={styles['discount']}>
                {Math.round(((i.price - i.mrp) / i.mrp) * 100)}%
              </div>
            </div>
            ))}
        </Slider>
      </Row>
      <div className={styles['display-t-i-f']}>
        <div className={`${styles['fs-20']} ${styles.title}`}>TOP IN FASHION</div>
        <div className={styles.d1}>
          <div>
            <span className={styles['fs-20']}><span className={styles['lite']}>Kids Fashion</span><span className={styles['bold']}>UP TO 50% OFF</span></span>
            <a href={b_d_b["Kid's Fashion"]}>
              <div className={styles['shadow']}>
                  <img src={d_tif[0]} className={styles['img-responsive']} />
              </div>
            </a>
            <div className={styles['btn']}>
              <span>SHOP NOW</span>
              <SVGComponent clsName={`${styles.arrow}`} src="icons/common-icon/arrow" />
            </div>
          </div>
          <div>
            <span className={styles['fs-20']}><span className={styles['lite']}>Women Clothing</span><span className={styles['bold']}>UP TO 50% OFF</span></span>
            <a href={b_d_b['Womens Clothing']}>
              <div className={styles['shadow']}>
                  <img src={d_tif[1]} className={styles['img-responsive']} />
              </div>
            </a>
            <div className={styles['btn']}>
              <span>SHOP NOW</span>
              <SVGComponent clsName={`${styles.arrow}`} src="icons/common-icon/arrow" />
            </div>
          </div>
        </div>
        <div className={styles.d2}>
          <div>
            <span className={styles['fs-20']}><span className={styles['lite']}>Shoes</span><span className={styles['bold']}>UP TO 50% OFF</span></span>
            <a href={b_d_b['Shoes']}>
              <div className={styles['shadow']}>
                <img src={d_tif[2]} className={styles['img-responsive']} />
              </div>
            </a>
            <div className={styles['btn']}>
              <span>SHOP NOW</span>
              <SVGComponent clsName={`${styles.arrow}`} src="icons/common-icon/arrow" />
            </div>
          </div>
          <div>
            <span className={styles['fs-20']}><span className={styles['lite']}>Watches</span><span className={styles['bold']}>UP TO 50% OFF</span></span>
            <a href={b_d_b['Watches']}>
              <div className={styles['shadow']}>
                <img src={d_tif[3]} className={styles['img-responsive']} />
              </div>
            </a>
            <div className={styles['btn']}>
              <span>SHOP NOW</span>
              <SVGComponent clsName={`${styles.arrow}`} src="icons/common-icon/arrow" />
            </div>
          </div>
        </div>
        <div className={styles.d3}>
          <div>
            <span className={styles['fs-20']}><span className={styles['lite']}>Men Clothing</span><span className={styles['bold']}>UP TO 50% OFF</span></span>
            <a href={b_d_b['Mens Clothing']}>
              <div className={styles['shadow']}>
                  <img src={d_tif[4]} className={styles['img-responsive']} />
              </div>
            </a>
            <div className={styles['btn']}>
              <span>SHOP NOW</span>
              <SVGComponent clsName={`${styles.arrow}`} src="icons/common-icon/arrow" />
            </div>
          </div>
        </div>
        <div className={`${styles.breadcrums} ${styles['mt-10']} ${styles.pointer}`}>
          <span>Mobiles  |  Laptops  |  Speakers  |  Cameras  |  Microwave Ovens  |  Smartwatch  |  Lights & Lamps  & more…</span>
        </div>
      </div>
      <Row className={`${styles['m-15']} ${styles['mt-40']} ${styles['mb-40']}`}>
        {threeCols.map(col => (
          <Col md={4} xs={4} sm={4}>
            <img src={col.img} alt={col.title} />
          </Col>
        ))}
      </Row>
      <div className={styles['display-t-i-hl']}>
        <div className={`${styles['fs-20']} ${styles.title}`}>BEAST OF HOME & LIVING</div>
        <div className={styles.d1}>
          <div>
            <span className={styles['fs-20']}><span className={styles.lite}>Kids Fashion</span><span className={styles.bold}>UP TO 50% OFF</span></span>
            <div className={styles.shadow}><img src={d_tihl[0]} className={styles['img-responsive']} /></div>
            <div className={styles.btn}>
              <span>SHOP NOW</span>
              <SVGComponent clsName={`${styles.arrow}`} src="icons/common-icon/arrow" />
            </div>
          </div>
          <div>
            <span className={styles['fs-20']}><span className={styles.lite}>Women Clothing</span><span className={styles.bold}>UP TO 50% OFF</span></span>
            <div className={styles.shadow}><img src={d_tihl[1]} className={styles['img-responsive']} /></div>
            <div className={styles.btn}>
              <span>SHOP NOW</span>
              <SVGComponent clsName={`${styles.arrow}`} src="icons/common-icon/arrow" />
            </div>
          </div>
        </div>
        <div className={styles.d2}>
          <div>
            <span className={styles['fs-20']}><span className={styles.lite}>Shoes</span><span className={styles.bold}>UP TO 50% OFF</span></span>
            <div className={styles.shadow}><img src={d_tihl[2]} className={styles['img-responsive']} /></div>
            <div className={styles.btn}>
              <span>SHOP NOW</span>
              <SVGComponent clsName={`${styles.arrow}`} src="icons/common-icon/arrow" />
            </div>
          </div>
          <div>
            <span className={styles['fs-20']}><span className={styles.lite}>Watches</span><span className={styles.bold}>UP TO 50% OFF</span></span>
            <div className={styles.shadow}><img src={d_tihl[3]} className={styles['img-responsive']} /></div>
            <div className={styles.btn}>
              <span>SHOP NOW</span>
              <SVGComponent clsName={`${styles.arrow}`} src="icons/common-icon/arrow" />
            </div>
          </div>
        </div>
        <div className={styles.d3}>
          <div>
            <span className={styles['fs-20']}><span className={styles.lite}>Men Clothing</span><span className={styles.bold}>UP TO 50% OFF</span></span>
            <div className={styles.shadow}><img src={d_tihl[4]} className={styles['img-responsive']} /></div>
            <div className={styles.btn}>
              <span>SHOP NOW</span>
              <SVGComponent clsName={`${styles.arrow}`} src="icons/common-icon/arrow" />
            </div>
          </div>
        </div>
        <div className={`${styles['breadcrums']} ${styles['mt-10']} ${styles['pointer']}`}>
          <a href="https://storefront-stage.fptechscience.com/landing/lifestyle?language=en"><span>Besheets  |  Furniture  |  Cushions  |  Wall Decor  |  Lights  |  Living Room Furniture  |  Photo Frames  |  Rugs & Mats  & more…</span></a>
        </div>
      </div>
      <Row className={`${styles['m-15']} ${styles['mt-40']} ${styles['mb-40']}`}>
        {twoCols.map(col => (
          <Col md={6} xs={6} sm={6}>
            <img src={col.img} alt={col.title} />
          </Col>
        ))}
      </Row>
      <div className={styles['display-t-i-e']}>
        <div className={`${styles['fs-20']} ${styles['title']}`}>TOP IN ELECTRONICS</div>
        {/*<div className={`${styles['']}`}>
          <span>See more</span><SVGComponent clsName={`${styles['arrow']}`} src="icons/common-icon/arrow" />
        </div>*/}
        <div>
          <div className={styles['d1']}>
            <div>
              <span className={styles['fs-20']}><span className={styles['lite']}>Laptops</span><span className={styles['bold']}>UP TO 50% OFF</span></span>
              <a href={b_d_b['Laptops']}>
                <div className={styles['shadow']}>
                    <img src={d_tie[0]} className={styles['img-responsive']} />
                </div>
              </a>
              <div className={styles['btn']}>
                <span>SHOP NOW</span>
                <SVGComponent clsName={`${styles['arrow']}`} src="icons/common-icon/arrow" />
              </div>
            </div>
            <div>
              <span className={styles['fs-20']}><span className={styles['lite']}>Mobiles</span><span className={styles['bold']}>UP TO 50% OFF</span></span>
              <a href={b_d_b['Mobiles']}>
                <div className={styles['shadow']}>
                  <img src={d_tie[1]} className={styles['img-responsive']} />
                </div>
              </a>
              <div className={styles['btn']}>
                <span>SHOP NOW</span>
                <SVGComponent clsName={`${styles['arrow']}`} src="icons/common-icon/arrow" />
              </div>
            </div>
          </div>
          <div className={styles['d2']}>
            <div>
              <span className={styles['fs-20']}><span className={styles['lite']}>Camara</span><span className={styles['bold']}>UP TO 50% OFF</span></span>
              <a href={b_d_b['Cameras']}>
                <div className={styles['shadow']}>
                  <img src={d_tie[2]} className={styles['img-responsive']} />
                </div>
              </a>
              <div className={styles['btn']}>
                <span>SHOP NOW</span>
                <SVGComponent clsName={`${styles['arrow']}`} src="icons/common-icon/arrow" />
              </div>
            </div>
            <div>
              <span className={styles['fs-20']}><span className={styles['lite']}>Kitchen Appliances</span><span className={styles['bold']}>UP TO 50% OFF</span></span>
              <a href={b_d_b['Kitchen Appliances']}>
                <div className={styles['shadow']}>
                    <img src={d_tie[3]} className={styles['img-responsive']} />
                </div>
              </a>
              <div className={styles['btn']}>
                <span>SHOP NOW</span>
                <SVGComponent clsName={`${styles['arrow']}`} src="icons/common-icon/arrow" />
              </div>
            </div>
          </div>
          <div className={styles['d3']}>
            <div>
              <span className={styles['fs-20']}><span className={styles['lite']}>Audio Devices</span><span className={styles['bold']}>UP TO 50% OFF</span></span>
              <a href={b_d_b['Speakers']}>
                <div className={styles['shadow']}>
                    <img src={d_tie[4]} className={styles['img-responsive']} />
                </div>
              </a>
              <div className={styles['btn']}>
                <span>SHOP NOW</span>
                <SVGComponent clsName={`${styles['arrow']}`} src="icons/common-icon/arrow" />
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.breadcrums} ${styles['mt-10']} ${styles.pointer}`}>
          <span>Mobiles  |  Laptops  |  Speakers  |  Cameras  |  Microwave Ovens  |  Smartwatch  |  Lights & Lamps  & more…</span>
        </div>
      </div>

      <Row className={styles['d_items']}>
        <div>
          <span className={`${styles.title} ${styles['fs-18']}`}>BRANDS YOU LOVE</span>
        </div>
        <Slider
          asNavFor={sliderDODAY}
          ref={slider => (sliderDODAY = slider)}
          lazyLoad
          className={styles['ht-100per']}
          slidesToShow={4}
          nextArrow={<SampleNextArrow />}
          prevArrow={<SamplePrevArrow />}
        >
          {b_y_l.map(i => (
            <Col key={i} md={3} xs={3} sm={3}>
              <div className={styles.image}>
                <img src={i.img} alt={i.img} />
              </div>
              <div className={styles['b_l']}>
                <img src={i.brandImg} width="80" height="30" alt={i.brandImg} />
                <SVGComponent clsName={`${styles.arrow} arrow-black `} src="icons/common-icon/arrow" />
              </div>
            </Col>
          ))}
        </Slider>
        <div className={`${styles.breadcrums} ${styles['mt-10']} ${styles.pointer}`}>
          <span>Zara  |  Guess  |  Max  |  Nike  |  Fossil  |  Levis  |  Wrangler  |  Shein  & more…</span>
        </div>
      </Row>

      <Row className={styles['d_items']}>
        <div>
          <span className={`${styles.title} ${styles['fs-18']}`}>BEST SELLING</span>
        </div>
        <Slider
          asNavFor={sliderDODAY}
          ref={slider => (sliderDODAY = slider)}
          lazyLoad
          className={styles['ht-100per']}
          slidesToShow={6}
          nextArrow={<SampleNextArrow />}
          prevArrow={<SamplePrevArrow />}
        >
          {d_o_day.map(i => (
            <div className={styles.relative}>
              <div className={styles.d_item} key={i}>
                <div className={styles.image}>
                  <img src={i.img} alt={i.title} />
                </div>
                <div className={styles['t_n_p']}>
                  <div>
                    <span className={styles['fontW600']}>{i.brand}</span>{' '}-{' '}
                    <span>{i.title}</span>
                  </div>
                  <div>
                    <span className={`${styles['fontW600']} ${styles['fs-12']}`}>{i.currency}</span>&nbsp;
                    <span className={`${styles['fontW600']} ${styles['fs-18']}`}>{i.price}</span>&nbsp;&nbsp;
                    <span className={styles['light-gray']}><s>{i.mrp}</s></span>
                  </div>
                </div>
                <div className={styles['b_n_c']}>
                  <button className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['buy_now']}`}>BUY NOW</button>
                  <button className={`${styles['fp-btn']} ${styles['add_to_cart']}`}>ADD TO CART</button>
                </div>
              </div>
              <div className={styles['sold']}>
                {Math.round(Math.random() * 100)}+ Sold
              </div>
            </div>
            ))}
        </Slider>
      </Row>
      <Row className={styles['d_items']}>
        <div>
          <span className={`${styles.title} ${styles['fs-18']}`}>RECENTLY VIEWED</span>
        </div>
        <Slider
          asNavFor={sliderDODAY}
          ref={slider => (sliderDODAY = slider)}
          lazyLoad
          className={styles['ht-100per']}
          slidesToShow={6}
          nextArrow={<SampleNextArrow />}
          prevArrow={<SamplePrevArrow />}
        >
          {d_o_day.map(i => (
            <div className={styles.relative}>
              <div className={styles.d_item} key={i}>
                <div className={styles.image}>
                  <img src={i.img} alt={i.title} />
                </div>
                <div className={styles['t_n_p']}>
                  <div>
                    <span className={styles['fontW600']}>{i.brand}</span>{' '}-{' '}
                    <span>{i.title}</span>
                  </div>
                  <div>
                    <span className={`${styles['fontW600']} ${styles['fs-12']}`}>{i.currency}</span>&nbsp;
                    <span className={`${styles['fontW600']} ${styles['fs-18']}`}>{i.price}</span>&nbsp;&nbsp;
                    <span className={styles['light-gray']}><s>{i.mrp}</s></span>
                  </div>
                </div>
                <div className={styles['b_n_c']}>
                  <button className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['buy_now']}`}>BUY NOW</button>
                  <button className={`${styles['fp-btn']} ${styles['add_to_cart']}`}>ADD TO CART</button>
                </div>
              </div>
              <div className={styles['discount']}>
                {Math.round(((i.price - i.mrp) / i.mrp) * 100)}%
              </div>
            </div>
            ))}
        </Slider>
      </Row>
    </div>
  </NoSSR>
);

export default HomePage;
