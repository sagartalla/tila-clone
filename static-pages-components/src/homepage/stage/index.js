let sliderTBS,
  sliderTIE,
  sliderHAL,
  sliderDODAY,
  sliderBS,
  sliderRV;

// const tie = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const tbs = [{
  img: `/static/img/landing-home/${lang === 'en' ? 'home-decor.jpg' : 'home-decor-ar'}.jpg`,
  title: 'HOME DECOR',
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'laptops.jpg' : 'laptops-ar'}.jpg`,
  title: 'LAPTOPS',
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'mens-clothing.jpg' : 'mens-clothing-ar'}.jpg`,
  title: 'MENS CLOTHING',
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'mobile-accessories.jpg' : 'mobile-accessories-ar'}.jpg`,
  title: 'MOBILE ACCESSORIES',
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'perfumes-for-women.jpg' : 'perfumes-for-women-ar'}.jpg`,
  title: 'PERFUMES FOR WOMEN',
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'watches.jpg' : 'watches-ar'}.jpg`,
  title: 'WATCHES',
}];

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
  title: 'Women\'s Clothing',
}, {
  img: '/static/img/landing-home/mens-clothing.png',
  title: 'Men\'s Clothing',
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

const d_tie = [
  '/static/img/landing-home/d-laptops.png',
  '/static/img/landing-home/d-mobiles.png',
  '/static/img/landing-home/d-cameras.png',
  '/static/img/landing-home/d-kitchen.png',
  '/static/img/landing-home/d-audio.png',
];

const d_tif = [
  '/static/img/landing-home/kids-fashion.png',
  '/static/img/landing-home/t-women-cloths.png',
  '/static/img/landing-home/shoes.png',
  '/static/img/landing-home/t-watches.png',
  '/static/img/landing-home/t-mens-cloths.png',
];

const d_tihl = [
  '/static/img/landing-home/kids-furniture.png',
  '/static/img/landing-home/living-room-furniture.png',
  '/static/img/landing-home/tables.png',
  '/static/img/landing-home/cushions.png',
  '/static/img/landing-home/lights.png',
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

const responsive = [
  {
    breakpoint: 1441,
    settings: {
      slidesToShow: 5,
    },
  }, {
    breakpoint: 1300,
    settings: {
      slidesToShow: 4,
    },
  },
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 3,
    },
  }, {
    breakpoint: 768,
    settings: {
      slidesToShow: 2,
    },
  },
  {
    breakpoint: 480,
    settings: {
      slidesToShow: 1,
    },
  },
];

const twoCols = [{
  img: '/static/img/landing-home/ps4.jpg',
  title: 'PS4 Pro',
}, {
  img: '/static/img/landing-home/alien.jpg',
  title: 'Alienware',
}];

const threeCols = [{
  img: '/static/img/landing-home/shoes.jpg',
  link: '/SAU/en/srp?search=footwear&language=en&isListed=false',
  title: 'Shoes',
}, {
  img: '/static/img/landing-home/ls2.jpg',
  link: '/SAU/en/srp?search=LS2&language=en&isListed=false',
  title: 'LS2',
}, {
  img: '/static/img/landing-home/furniture.jpg',
  link: '/SAU/en/srp?search=Furniture&language=en&isListed=false',
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
      className="leftArrow"
      onMouseOver={onClick}
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
      className="rightArrow"
      onMouseOver={onClick}
      onClick={onClick}
    >
      <img src="/static/img/landing-home/c-right.svg" alt="right" />
    </div>
  );
}

const b_d_b = {
  Mobiles: '/SAU/en/srp?search=Mobiles&language=en&isListed=false',
  Clothing: '/SAU/en/srp?isListed=false&language=en&search=Clothing',
  'Clothing Accessories': '/SAU/en/srp?search=Clothing&language=en&isListed=false',
  Laptops: '/SAU/en/srp?search=Laptops&language=en&isListed=false',
  'Storage Devices': '/SAU/en/srp?search=Storage&language=en&isListed=false',
  Cameras: '/SAU/en/srp?search=Camera&language=en&isListed=false',
  Televisions: '/SAU/en/srp?search=Televisions&language=en&isListed=false',
  'Home Appliances': '/SAU/en/srp?search=Home%20Appliances&language=en&isListed=false',
  'Womens Clothing': '/SAU/en/srp?search=Womens%20Clothing&language=en&isListed=false',
  'Mens Clothing': '/SAU/en/srp?search=Mens%20Clothing&language=en&isListed=false',
  'Fashion Accessories': '/SAU/en/srp?search=Accessories&language=en&isListed=false',
  Watches: '/SAU/en/srp?search=Watches&language=en&isListed=false',
  'Kitchen Appliances': '/SAU/en/srp?search=kitchen%20appliances&language=en&isListed=false',
  Speakers: '/SAU/en/srp?search=Speakers&language=en&isListed=false',
  'Microwave Ovens': '/SAU/en/srp?search=Microwave%20Ovens&language=en&isListed=false',
  'Smart Watch': '/SAU/en/srp?search=Smart%20Watch&language=en&isListed=false',
  'Mobile Accessories': '/SAU/en/srp?search=Mobile%20Accessories&language=en&isListed=false',
  "Kid's Fashion": '/SAU/en/srp?search=Kid%27s%20Fashion&language=en&isListed=false',
  Footwear: '/SAU/en/srp?search=Footwear&language=en&isListed=false',
  "Men's Footwear": '/SAU/en/srp?search=Footwear&language=en&isListed=false',
  'Women Footwear': '/SAU/en/srp?search=Footwear&language=en&isListed=false',
  Bags: '/SAU/en/srp?search=Backpack&language=en&isListed=false',
  Eyewear: '/SAU/en/srp?search=Eyewear&language=en&isListed=false',
  Jewellery: '/SAU/en/srp?search=Jewellery&language=en&isListed=false',
  GUESS: '/SAU/en/srp/womens-clothing-1056/?isListed=false&language=en&search=guess',
  FENDI: 'https://storefront-stage.fptechscience.com/SAU/en/srp/watches-1128/?isListed=false&language=en&search=FENDI',
  'MORPHY RICHARDS': '/SAU/en/srp?search=MORPHY%20RICHARDS%20&disableSpellCheck=true&language=en&isListed=false',
  SHIRTS: '/SAU/en/srp?search=SHIRTS&language=en&isListed=false',
  Perfumes: '/SAU/en/srp?search=Perfumes&language=en&isListed=false',
  Shoes: '/SAU/en/srp?search=Shoes&language=en&isListed=false',
  Lights: '/SAU/en/srp?search=Lights&language=en&isListed=false',
  lamps: 'https://storefront-stage.fptechscience.com/SAU/en/srp?isListed=false&language=en&search=lamps',
  bedding: '/SAU/en/srp?search=bedding&language=en&isListed=false',
  furniture: '/SAU/en/srp?search=furniture&language=en&isListed=false',
}

const HomePage = () => (
  <NoSSR>
    <div className="home-style-main">
      <div className={`${styles['mb-40']} top-banner-slider`}>
        <Slider
          dots
          autoplay={true}
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
                <div className="item" key={i}>
                  <img src={i.img} />
                </div>
              </a>
            </div>
          ))}
        </Slider>
      </div>
      <div className="ff-t-i">
        <div className="e">
          <span className={`title ${styles['fs-18']}`}>TOP IN ELECTRONICS</span>
          <Slider
            asNavFor={sliderTIE}
            ref={slider => (sliderTIE = slider)}
            lazyLoad
            className={styles['ht-100per']}
            slidesToShow={6}
          >
            {tie.map(i => (
              <div>
                <div className="item" key={i}>
                  <a href={b_d_b[i.title]}>
                    <img src={i.img} alt={i.title} />
                  </a>
                  <span>{i.title}</span>
                </div>
              </div>
              ))}
          </Slider>
        </div>
        <div className="h-a-l">
          <span className={`title ${styles['fs-18']}`}>TOP IN FASHION | HOME & LIVING</span>
          <Slider
            asNavFor={sliderHAL}
            ref={slider => (sliderHAL = slider)}
            lazyLoad
            className={styles['ht-100per']}
            slidesToShow={6}
          >
            {hal.map((i) => (
                <div>
                  <div className='item' key={i}>
                    <a href={b_d_b[i.title]}>
                      <img src={i.img} />
                    </a>
                    <span>{i.title}</span>
                  </div>
                </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="display-t-i-f">
        <div className={`${styles['fs-20']} title`}>TOP IN FASHION</div>
        <div className="d1">
          <div>
            <span className={styles['fs-20']}><span className="lite">Kids Fashion</span><span className={styles.bold}>UP TO 50% OFF</span></span>
            <a href={b_d_b["Kid's Fashion"]}>
              <div className="shadow">
                <img src={d_tif[0]} className="img-responsive" />
              </div>
            </a>
            <div className="btn">
              <span>SHOP NOW</span>
              <SVGComponent clsName="arrow" src="icons/common-icon/arrow" />
            </div>
          </div>
          <div>
            <span className={styles['fs-20']}><span className="lite">Women's Clothing</span><span className={styles.bold}>UP TO 50% OFF</span></span>
            <a href={b_d_b['Womens Clothing']}>
              <div className="shadow">
                <img src={d_tif[1]} className="img-responsive" />
              </div>
            </a>
            <div className="btn">
              <span>SHOP NOW</span>
              <SVGComponent clsName="arrow" src="icons/common-icon/arrow" />
            </div>
          </div>
        </div>
        <div className="d2">
          <div>
            <span className={styles['fs-20']}><span className="lite">Shoes</span><span className={styles.bold}>UP TO 50% OFF</span></span>
            <a href={b_d_b.Shoes}>
              <div className="shadow">
                <img src={d_tif[2]} className="img-responsive" />
              </div>
            </a>
            <div className="btn">
              <span>SHOP NOW</span>
              <SVGComponent clsName="arrow" src="icons/common-icon/arrow" />
            </div>
          </div>
          <div>
            <span className={styles['fs-20']}><span className="lite">Watches</span><span className={styles.bold}>UP TO 50% OFF</span></span>
            <a href={b_d_b.Watches}>
              <div className="shadow">
                <img src={d_tif[3]} className="img-responsive" />
              </div>
            </a>
            <div className="btn">
              <span>SHOP NOW</span>
              <SVGComponent clsName="arrow" src="icons/common-icon/arrow" />
            </div>
          </div>
        </div>
        <div className={`d3 ${styles.right0}`}>
          <div>
            <span className={styles['fs-20']}><span className="lite">Men's Clothing</span><span className={styles.bold}>UP TO 50% OFF</span></span>
            <a href={b_d_b['Mens Clothing']}>
              <div className="shadow">
                <img src={d_tif[4]} className="img-responsive" />
              </div>
            </a>
            <div className="btn">
              <span>SHOP NOW</span>
              <SVGComponent clsName="arrow" src="icons/common-icon/arrow" />
            </div>
          </div>
        </div>
        <div className={`${styles.breadcrums} ${styles['mt-10']} ${styles.pointer}`}>
          <a href="https://storefront-stage.fptechscience.com/SAU/en/landing/fashion">
            <span>Men's Clothing| Women's Clothing| Kids Clothing| Footwear| Jewellery| Eyewear & More…</span>
          </a>
        </div>
      </div>
      <Row className={`${styles['m-15']} ${styles['mt-40']} ${styles['mb-40']}`}>
        {threeCols.map(col => (
          <Col md={4} xs={4} sm={4}>
            <a href={col.link}>
              <img className="resp-img-link" src={col.img} alt={col.title} />
            </a>
          </Col>
        ))}
      </Row>
      <div className="display-t-i-hl">
        <div className={`${styles['fs-20']} title`}>BEST OF HOME & LIVING</div>
        <div className="d1">
          <div>
            <span className={styles['fs-20']}><span className="lite">Kids Furniture</span><span className={styles.bold}>UP TO 50% OFF</span></span>
            <a href={b_d_b['furniture']}>
              <div className="shadow">
                <img src={d_tihl[0]} className="img-responsive" />
              </div>
            </a>
            <div className="btn">
              <span>SHOP NOW</span>
              <SVGComponent clsName="arrow" src="icons/common-icon/arrow" />
            </div>
          </div>
          <div>
            <span className={styles['fs-20']}><span className="lite">Living Room Furniture</span><span className={styles.bold}>FROM SAR 200</span></span>
            <a href={b_d_b['furniture']}></a>
              <div className="shadow">
                <img src={d_tihl[1]} className="img-responsive" />
              </div>
            <div className="btn">
              <span>SHOP NOW</span>
              <SVGComponent clsName="arrow" src="icons/common-icon/arrow" />
            </div>
          </div>
        </div>
        <div className="d2">
          <div>
            <span className={styles['fs-20']}><span className="lite">Lamps</span><span className={styles.bold}>UP TO 50% OFF</span></span>
            <a href={b_d_b['lamps']}>
              <div className="shadow">
                <img src={d_tihl[2]} className="img-responsive" />
              </div>
            </a>
            <div className="btn">
              <span>SHOP NOW</span>
              <SVGComponent clsName="arrow" src="icons/common-icon/arrow" />
            </div>
          </div>
          <div>
            <span className={styles['fs-20']}><span className="lite">Cushions</span><span className={styles.bold}>UP TO 50% OFF</span></span>
            <a href={b_d_b['bedding']}>
              <div className="shadow">
                <img src={d_tihl[3]} className="img-responsive" />
              </div>
            </a>
            <div className="btn">
              <span>SHOP NOW</span>
              <SVGComponent clsName="arrow" src="icons/common-icon/arrow" />
            </div>
          </div>
        </div>
        <div className={`d3 ${styles.right0}`}>
          <div>
            <span className={styles['fs-20']}><span className="lite">Lights</span><span className={styles.bold}>FROM SAR 200</span></span>
            <a href={b_d_b['Lights']}>
              <div className="shadow">
                <img src={d_tihl[4]} className="img-responsive" />
              </div>
            </a>
            <div className="btn">
              <span>SHOP NOW</span>
              <SVGComponent clsName="arrow" src="icons/common-icon/arrow" />
            </div>
          </div>
        </div>
        <div className={`${styles['breadcrums']} ${styles['mt-10']} ${styles['pointer']}`}>
          <a href="https://storefront-stage.fptechscience.com/SAU/en/landing/lifestyle?language=en">
            <span>Bedsheets  |  Furniture  |  Cushions  |  Wall Decor  |  Lights  |  Living Room Furniture  |  Photo Frames  |  Rugs & Mats  & more…</span>
          </a>
        </div>
      </div>
      <Row className={`${styles['m-15']} ${styles['mt-40']} ${styles['mb-40']}`}>
        {twoCols.map(col => (
          <Col md={6} xs={6} sm={6}>
            <img className="resp-img-link" src={col.img} alt={col.title} />
          </Col>
        ))}
      </Row>
      <div className="display-t-i-e">
        <div className={`${styles['fs-20']} title`}>TOP IN ELECTRONICS</div>
        {/* <div className={`${styles['']}`}>
          <span>See more</span><SVGComponent clsName={`${styles['arrow']}`} src="icons/common-icon/arrow" />
        </div>*/}
        <div>
          <div className="d1">
            <div>
              <span className={styles['fs-20']}><span className="lite">Laptops</span><span className={styles.bold}>UP TO 50% OFF</span></span>
              <a href={b_d_b.Laptops}>
                <div className="shadow">
                  <img src={d_tie[0]} className="img-responsive" />
                </div>
              </a>
              <div className="btn">
                <span>SHOP NOW</span>
                <SVGComponent clsName="arrow" src="icons/common-icon/arrow" />
              </div>
            </div>
            <div>
              <span className={styles['fs-20']}><span className="lite">Mobiles
                                                </span><span className={styles.bold}>UP TO 50% OFF</span>
              </span>
              <a href={b_d_b.Mobiles}>
                <div className="shadow">
                  <img src={d_tie[1]} className="img-responsive" />
                </div>
              </a>
              <div className="btn">
                <span>SHOP NOW</span>
                <SVGComponent clsName="arrow" src="icons/common-icon/arrow" />
              </div>
            </div>
          </div>
          <div className="d2">
            <div>
              <span className={styles['fs-20']}><span className="lite">Camera</span><span className={styles.bold}>UP TO 50% OFF</span></span>
              <a href={b_d_b.Cameras}>
                <div className="shadow">
                  <img src={d_tie[2]} className="img-responsive" />
                </div>
              </a>
              <div className="btn">
                <span>SHOP NOW</span>
                <SVGComponent clsName="arrow" src="icons/common-icon/arrow" />
              </div>
            </div>
            <div>
              <span className={styles['fs-20']}><span className="lite">Kitchen Appliances</span><span className={styles.bold}>UP TO 50% OFF</span></span>
              <a href={b_d_b['Kitchen Appliances']}>
                <div className="shadow">
                  <img src={d_tie[3]} className="img-responsive" />
                </div>
              </a>
              <div className="btn">
                <span>SHOP NOW</span>
                <SVGComponent clsName="arrow" src="icons/common-icon/arrow" />
              </div>
            </div>
          </div>
          <div className={`d3 ${styles.right0}`}>
            <div>
              <span className={styles['fs-20']}><span className="lite">Audio Devices</span><span className={styles.bold}>UP TO 50% OFF</span></span>
              <a href={b_d_b.Speakers}>
                <div className="shadow">
                  <img src={d_tie[4]} className="img-responsive" />
                </div>
              </a>
              <div className="btn">
                <span>SHOP NOW</span>
                <SVGComponent clsName="arrow" src="icons/common-icon/arrow" />
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.breadcrums} ${styles['mt-10']} ${styles.pointer}`}>
          <a href="https://storefront-stage.fptechscience.com/SAU/en/landing/electronics?language=en">
            <span>Mobiles  |  Laptops  |  Speakers  |  Cameras  |  Microwave Ovens  |  Smartwatches  |  Lights & Lamps  & more…</span>
          </a>
        </div>
      </div>

      <Row className="d_items" >
        <div>
          <span className={`title ${styles['fs-18']}`}>BRANDS YOU LOVE</span>
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
              <div className="image">
                <img className="resp-img-link" src={i.img} alt={i.img} />
              </div>
              <div className="b_l">
                <img src={i.brandImg} width="80" height="30" alt={i.brandImg} />
                <SVGComponent clsName="arrow arrow-black " src="icons/common-icon/arrow" />
              </div>
            </Col>
          ))}
        </Slider>
        <div className={`${styles.breadcrums} ${styles['mt-10']} ${styles.pointer}`}>
          <span>Zara  |  Guess  |  Max  |  Nike  |  Fossil  |  Levis  |  Wrangler  |  Shein  & more…</span>
        </div>
      </Row>
    </div>
  </NoSSR>
);
