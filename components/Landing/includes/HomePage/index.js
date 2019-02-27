import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Slider from "react-slick";
import NoSSR from 'react-no-ssr';

import SVGComponent from '../../../common/SVGComponet';
import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Landing/includes/HomePage/homepage');

let sliderTBS, sliderTIE, sliderHAL;

//const tie = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const tbs = [{
  img: '/static/img/landing-home/guess-banner.jpg',
  title: 'GUESS'
},{
  img: '/static/img/landing-home/fendi.jpg',
  title: 'FENDI'
},{
  img: '/static/img/landing-home/morphy-richards.jpg',
  title: 'MORPHY RICHARDS'
},{
  img: '/static/img/landing-home/shirt.jpg',
  title: 'SHIRTS'
}]

const tie = [{
  img: '/static/img/landing-home/Mobiles.png',
  title: 'Mobiles'
},{
  img: '/static/img/landing-home/Laptops.png',
  title: 'Laptops'
},{
  img: '/static/img/landing-home/storage-devices.png',
  title: 'Storage Devices'
},{
  img: '/static/img/landing-home/cameras.png',
  title: 'Cameras'
},{
  img: '/static/img/landing-home/television.png',
  title: 'Television'
},{
  img: '/static/img/landing-home/home-appliances.png',
  title: 'Home Appliances'
}];

const hal = [{
  img: '/static/img/landing-home/womens-clothing.png',
  title: 'Womens Clothing'
},{
  img: '/static/img/landing-home/mens-clothing.png',
  title: 'Mens Clothing'
},{
  img: '/static/img/landing-home/jewellery.png',
  title: 'Jewellery'
},{
  img: '/static/img/landing-home/fashion-acessories.png',
  title: 'Fashion Accessories'
},{
  img: '/static/img/landing-home/watches.png',
  title: 'Watches'
},{
  img: '/static/img/landing-home/perfumes.png',
  title: 'Perfumes'
}];

const d_tie = [
  'static/img/landing-home/d-laptops.png',
  'static/img/landing-home/d-mobiles.png',
  'static/img/landing-home/d-cameras.png',
  'static/img/landing-home/d-kitchen.png',
  'static/img/landing-home/d-audio.png',
]

const d_tif = [
  'static/img/landing-home/kids-fashion.png',
  'static/img/landing-home/t-women-cloths.png',
  'static/img/landing-home/shoes.png',
  'static/img/landing-home/t-watches.png',
  'static/img/landing-home/t-mens-cloths.png',
]

const d_tihl = [
  'static/img/landing-home/kids-furniture.png',
  'static/img/landing-home/living-room-furniture.png',
  'static/img/landing-home/tables.png',
  'static/img/landing-home/cushions.png',
  'static/img/landing-home/lights.png',
]

const b_d_b = {"Mobiles":"https://storefront-stage.fptechscience.com/srp?search=Mobiles&language=en&isListed=false","Clothing":"https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=Clothing","Clothing Accessories":"https://storefront-stage.fptechscience.com/srp?search=Clothing&language=en&isListed=false","Laptops":"https://storefront-stage.fptechscience.com/srp/laptop-1173/?search=Laptops&language=en&isListed=false","Storage Devices":"https://storefront-stage.fptechscience.com/srp?search=Storage&language=en&isListed=false","Cameras":"https://storefront-stage.fptechscience.com/srp?search=Camera&language=en&isListed=false","Television":"https://storefront-stage.fptechscience.com/srp/Televisions-878?categoryTree=true&isListed=false","Home Appliances":"https://storefront-stage.fptechscience.com/srp?search=Home%20Appliances&language=en&isListed=false","Womens Clothing":"https://storefront-stage.fptechscience.com/srp/Clothing-910?categoryTree=true&isListed=false","Mens Clothing":"https://storefront-stage.fptechscience.com/srp/Clothing-899?categoryTree=true&isListed=false","Fashion Accessories":"https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=Fashion%20Accessories","Watches":"https://storefront-stage.fptechscience.com/srp/watches-1128/?isListed=false&language=en&search=Watch","Kitchen Appliances":"https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=Kitchen%20Appliances","Speakers":"https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=Speaker","Microwave Ovens":"https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=Microwave%20oven","Smart Watch":"https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=Smart%20Watch","Mobile Accessories":"https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=Mobile%20Accessories\t\t\t\t\t\t\t\t\t\t\t\t\t","Kid's Fashion":"https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=Kids","Footwear":"https://storefront-stage.fptechscience.com/srp/Footwear-921?categoryTree=true&isListed=false&language=en","Men's Footwear":"https://storefront-stage.fptechscience.com/srp/Footwear-921?categoryTree=true&isListed=false&language=en","Women Footwear":"https://storefront-stage.fptechscience.com/srp/Footwear-921?categoryTree=true&isListed=false&language=en","Bags":"https://storefront-stage.fptechscience.com/srp/Backpack-926?categoryTree=true&isListed=false&language=en","Eyewear":"https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=eyewear","Jewellery":"https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=Jewellery","GUESS":"https://storefront-stage.fptechscience.com/srp/womens-clothing-1056/?isListed=false&language=en&search=guess","FENDI":"https://storefront-stage.fptechscience.com/srp/watches-1128/?isListed=false&language=en&search=FENDI","MORPHY RICHARDS":"https://storefront-stage.fptechscience.com/srp/home-kitchen-appliances-1010/?isListed=false&language=en&search=morphy%20richards","SHIRTS":"https://storefront-stage.fptechscience.com/srp?search=shirts&language=en&isListed=false","Perfumes": "https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=FENDI", "Shoes": "https://storefront-stage.fptechscience.com/srp/footwear-1101/?isListed=false&language=en&search=Shoe", "Lights": "https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=Lights"}

const HomePage = () => (
  <NoSSR>
    <div className={styles['home-style-main']}>
      <div className={`${styles['mb-40']} top-banner-slider`}>
        <Slider
          dots={true}
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
          {tbs.map((i) => {
            return (
              <div>
                <a href={b_d_b[i.title]}>
                  <div className={styles['item']} key={i}>
                    <img src={i.img} />
                  </div>
                </a>
              </div>
            )
          })}
        </Slider>
      </div>
      <div className={styles['ff-t-i']}>
        <div className={styles['e']}>
          <span className={`${styles['title']} ${styles['fs-18']}`}>TOP IN ELECTRONICS</span>
          <Slider
            asNavFor={sliderTIE}
            ref={slider => (sliderTIE = slider)}
            lazyLoad={true}
            className={styles['ht-100per']}
            slidesToShow={6}
          >
            {tie.map((i) => {
              return (
                <div>
                  <div className={styles['item']} key={i}>
                    <a href={b_d_b[i.title]}>
                      <img src={i.img} />
                    </a>
                    <span>{i.title}</span>
                  </div>
                </div>
              )
            })}
          </Slider>
        </div>
        <div className={styles['h-a-l']}>
          <span className={`${styles['title']} ${styles['fs-18']}`}>TOP IN FASHION AND HOME & LIVING</span>
          <Slider
            asNavFor={sliderHAL}
            ref={slider => (sliderHAL = slider)}
            lazyLoad={true}
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
              )
            })}
          </Slider>
        </div>
      </div>
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
        <div className={`${styles['breadcrums']} ${styles['mt-10']} ${styles['pointer']}`}>
          <span>Mobiles  |  Laptops  |  Speakers  |  Cameras  |  Microwave Ovens  |  Smartwatch  |  Lights & Lamps  & more…</span>
        </div>
      </div>
      <div className={styles['display-t-i-f']}>
        <div className={`${styles['fs-20']} ${styles['title']}`}>TOP IN FASHION</div>
        <div className={styles['d1']}>
          <div>
            <span className={styles['fs-20']}><span className={styles['lite']}>Kids Fashion</span><span className={styles['bold']}>UP TO 50% OFF</span></span>
            <a href={b_d_b["Kid's Fashion"]}>
              <div className={styles['shadow']}>
                  <img src={d_tif[0]} className={styles['img-responsive']} />
              </div>
            </a>
            <div className={styles['btn']}>
              <span>SHOP NOW</span>
              <SVGComponent clsName={`${styles['arrow']}`} src="icons/common-icon/arrow" />
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
              <SVGComponent clsName={`${styles['arrow']}`} src="icons/common-icon/arrow" />
            </div>
          </div>
        </div>
        <div className={styles['d2']}>
          <div>
            <span className={styles['fs-20']}><span className={styles['lite']}>Shoes</span><span className={styles['bold']}>UP TO 50% OFF</span></span>
            <a href={b_d_b['Shoes']}>
              <div className={styles['shadow']}>
                <img src={d_tif[2]} className={styles['img-responsive']} />
              </div>
            </a>
            <div className={styles['btn']}>
              <span>SHOP NOW</span>
              <SVGComponent clsName={`${styles['arrow']}`} src="icons/common-icon/arrow" />
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
              <SVGComponent clsName={`${styles['arrow']}`} src="icons/common-icon/arrow" />
            </div>
          </div>
        </div>
        <div className={styles['d3']}>
          <div>
            <span className={styles['fs-20']}><span className={styles['lite']}>Men Clothing</span><span className={styles['bold']}>UP TO 50% OFF</span></span>
            <a href={b_d_b['Mens Clothing']}>
              <div className={styles['shadow']}>
                  <img src={d_tif[4]} className={styles['img-responsive']} />
              </div>
            </a>
            <div className={styles['btn']}>
              <span>SHOP NOW</span>
              <SVGComponent clsName={`${styles['arrow']}`} src="icons/common-icon/arrow" />
            </div>
          </div>
        </div>
        <div className={`${styles['breadcrums']} ${styles['mt-10']} ${styles['pointer']}`}>
          <span>Mobiles  |  Laptops  |  Speakers  |  Cameras  |  Microwave Ovens  |  Smartwatch  |  Lights & Lamps  & more…</span>
        </div>
      </div>
      <div className={styles['display-t-i-hl']}>
        <div className={`${styles['fs-20']} ${styles['title']}`}>BEAST OF HOME & LIVING</div>
        <div className={styles['d1']}>
          <div>
            <span className={styles['fs-20']}><span className={styles['lite']}>Kids Fashion</span><span className={styles['bold']}>UP TO 50% OFF</span></span>
            <div className={styles['shadow']}><img src={d_tihl[0]} className={styles['img-responsive']} /></div>
            <div className={styles['btn']}>
              <span>SHOP NOW</span>
              <SVGComponent clsName={`${styles['arrow']}`} src="icons/common-icon/arrow" />
            </div>
          </div>
          <div>
            <span className={styles['fs-20']}><span className={styles['lite']}>Women Clothing</span><span className={styles['bold']}>UP TO 50% OFF</span></span>
            <div className={styles['shadow']}><img src={d_tihl[1]} className={styles['img-responsive']} /></div>
            <div className={styles['btn']}>
              <span>SHOP NOW</span>
              <SVGComponent clsName={`${styles['arrow']}`} src="icons/common-icon/arrow" />
            </div>
          </div>
        </div>
        <div className={styles['d2']}>
          <div>
            <span className={styles['fs-20']}><span className={styles['lite']}>Shoes</span><span className={styles['bold']}>UP TO 50% OFF</span></span>
            <div className={styles['shadow']}><img src={d_tihl[2]} className={styles['img-responsive']} /></div>
            <div className={styles['btn']}>
              <span>SHOP NOW</span>
              <SVGComponent clsName={`${styles['arrow']}`} src="icons/common-icon/arrow" />
            </div>
          </div>
          <div>
            <span className={styles['fs-20']}><span className={styles['lite']}>Watches</span><span className={styles['bold']}>UP TO 50% OFF</span></span>
            <div className={styles['shadow']}><img src={d_tihl[3]} className={styles['img-responsive']} /></div>
            <div className={styles['btn']}>
              <span>SHOP NOW</span>
              <SVGComponent clsName={`${styles['arrow']}`} src="icons/common-icon/arrow" />
            </div>
          </div>
        </div>
        <div className={styles['d3']}>
          <div>
            <span className={styles['fs-20']}><span className={styles['lite']}>Men Clothing</span><span className={styles['bold']}>UP TO 50% OFF</span></span>
            <div className={styles['shadow']}><img src={d_tihl[4]} className={styles['img-responsive']} /></div>
            <div className={styles['btn']}>
              <span>SHOP NOW</span>
              <SVGComponent clsName={`${styles['arrow']}`} src="icons/common-icon/arrow" />
            </div>
          </div>
        </div>
        <div className={`${styles['breadcrums']} ${styles['mt-10']} ${styles['pointer']}`}>
          <a href="https://storefront-stage.fptechscience.com/landing/lifestyle?language=en"><span>Besheets  |  Furniture  |  Cushions  |  Wall Decor  |  Lights  |  Living Room Furniture  |  Photo Frames  |  Rugs & Mats  & more…</span></a>
        </div>
      </div>
    </div>
  </NoSSR>
);

export default HomePage;
