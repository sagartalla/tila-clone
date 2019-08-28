let sliderTBS,
  sliderTIE,
  sliderHAL,
  sliderDODAY,
  sliderBS,
  sliderRV;

// const tie = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const tbs = [{
  img: `/static/img/landing-home/${lang === 'en' ? 'home-decor' : 'home-decor-ar'}.jpg`,
  title: 'HOME DECOR',
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'laptops' : 'laptops-ar'}.jpg`,
  title: 'LAPTOPS',
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'mens-clothing' : 'mens-clothing-ar'}.jpg`,
  title: 'MENS CLOTHING',
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'mobile-accessories' : 'mobile-accessories-ar'}.jpg`,
  title: 'MOBILE ACCESSORIES',
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'perfumes-for-women' : 'perfumes-for-women-ar'}.jpg`,
  title: 'PERFUMES FOR WOMEN',
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'watches' : 'watches-ar'}.jpg`,
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
  link: '/en/search?q=footwear&isListed=false',
  title: 'Shoes',
}, {
  img: '/static/img/landing-home/ls2.jpg',
  link: '/en/search?q=LS2&isListed=false',
  title: 'LS2',
}, {
  img: '/static/img/landing-home/furniture.jpg',
  link: '/en/search?q=Furniture&isListed=false',
  title: 'Furniture',
}];

const b_y_l = [{
  img: '/static/img/landing-home/levis-m.jpg',
  brandImg: '/static/img/landing-home/levis.jpg',
  title: 'Levis',
  links: '/en/search?q=Levis&isListed=false'
}, {
  img: '/static/img/landing-home/guess-m.jpg',
  brandImg: '/static/img/landing-home/guess.jpg',
  title: 'Guess',
  links: '/en/search?q=Guess&isListed=false'
}, {
  img: '/static/img/landing-home/max-m.jpg',
  brandImg: '/static/img/landing-home/max.jpg',
  title: 'Max',
  links: '/en/search?q=Max&isListed=false'
}, {
  img: '/static/img/landing-home/gucci-m.jpg',
  brandImg: '/static/img/landing-home/gucci.jpg',
  title: 'Gucci',
  links: '/en/search?q=Gucci&isListed=false'
}, {
  img: '/static/img/landing-home/levis-m.jpg',
  brandImg: '/static/img/landing-home/levis.jpg',
  title: 'Levis',
  links: '/en/search?q=Levis&isListed=false'
}];

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="leftArrow"
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
      onClick={onClick}
    >
      <img src="/static/img/landing-home/c-right.svg" alt="right" />
    </div>
  );
}

const b_d_b = {
  Mobiles: '/en/srp/mobiles?categoryTree=true&isListed=false&sid=848,849',
  Clothing: '/en/search?q=Clothing&isListed=false',
  'Clothing Accessories': '/en/search?q=Clothing&isListed=false',
  Laptops: '/en/srp/laptops?categoryTree=true&isListed=false&sid=848,864',
  'Storage Devices': '/en/search?q=Storage&&isListed=false',
  Cameras: '/en/srp/camera?categoryTree=true&isListed=false&sid=848,882',
  Televisions: '/en/srp/televisions?categoryTree=true&isListed=false&sid=848,878',
  'Home Appliances': '/en/srp/home-applaince?categoryTree=true&isListed=false&sid=932,935',
  'Womens Clothing': '/en/srp/clothing?categoryTree=true&isListed=false&sid=892,910',
  'Mens Clothing': '/en/srp/clothing?categoryTree=true&isListed=false&sid=892,899',
  'Fashion Accessories': '/en/srp/fashion-accessories?categoryTree=true&isListed=false&sid=892,923',
  Watches: '/en/srp/watch?categoryTree=true&isListed=false&sid=892,929',
  'Kitchen Appliances': '/en/srp/kitchen-appliances?categoryTree=true&isListed=false&sid=932,945',
  Speakers: '/en/search?q=Speakers&&isListed=false',
  'Microwave Ovens': '/en/search?q=Microwave%20Ovens&&isListed=false',
  'Smart Watch': '/en/srp/smart-watches?categoryTree=true&isListed=false&sid=848,860,861',
  'Mobile Accessories': '/en/srp/mobile-accessories?categoryTree=true&isListed=false&sid=848,850',
  "Kid's Fashion": '/en/srp/kid%27s?categoryTree=true&isListed=false&sid=892,893',
  Footwear: '/en/search?q=Footwear&&isListed=false',
  "Men's Footwear": '/en/srp/footwear?categoryTree=true&isListed=false&sid=892,907',
  'Women Footwear': '/en/srp/footwear?categoryTree=true&isListed=false&sid=892,921',
  Bags: '/en/srp/backpack?categoryTree=true&isListed=false&sid=892,926',
  Eyewear: '/en/search?q=Eyewear&&isListed=false',
  Jewellery: '/en/search?q=Jewellery&&isListed=false',
  GUESS: '/en//search/womens-clothing-1056/?q=guess&isListed=false',
  FENDI: 'https://storefront-stage.tila.com/en/search/watches-1128/?q=FENDI&isListed=false',
  'MORPHY RICHARDS': '/en/search?q=MORPHY%20RICHARDS%20&disableSpellCheck=true&isListed=false',
  SHIRTS: '/en/search?q=SHIRTS&isListed=false',
  Perfumes: '/en/srp/fragrance?categoryTree=true&isListed=false&sid=932,958,964',
  Shoes: '/en/search?q=Shoes&&isListed=false',
  Lights: '/en/srp/light?categoryTree=true&isListed=false&sid=932,937,940',
  lamps: '/en/srp/lamp?categoryTree=true&isListed=false&sid=932,937,939',
  bedding: '/en/srp/bedding-set?categoryTree=true&isListed=false&sid=932,941,942',
  furniture: '/en/srp/home-furnishing?categoryTree=true&isListed=false&sid=932,941',
  'HOME DECOR': '/en/search?q=HOME%20DECOR&isListed=false',
  LAPTOPS: '/en/srp/laptops?categoryTree=true&isListed=false&sid=848,864',
  'MENS CLOTHING': '/en/srp/clothing?categoryTree=true&isListed=false&sid=892,899',
  'MOBILE ACCESSORIES': '/en/srp/mobile-accessories?categoryTree=true&isListed=false&sid=848,850',
  'PERFUMES FOR WOMEN': '/en/search?q=perfumes&categoryTree=true&isListed=false',
  WATCHES: '/en/srp/watch?categoryTree=true&isListed=false&sid=892,929',
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
          <span className={`title ${styles['fs-20']}`}>TOP IN ELECTRONICS</span>
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
                  <span className={`${styles['fs-12']} ${styles['pt-10']} ${styles['flex']} ${styles['justify-center']} ${styles['lne-ht1_2']}`}>{i.title}</span>
                </div>
              </div>
              ))}
          </Slider>
        </div>
        <div className="h-a-l">
          <span className={`title ${styles['fs-20']}`}>TOP IN FASHION | LIFESTYLE</span>
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
                    <span className={`${styles['fs-12']} ${styles['pt-10']} ${styles['flex']} ${styles['justify-center']} ${styles['lne-ht1_2']}`}>{i.title}</span>
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
            <span className={styles['fs-16']}><span className="lite">Kids Fashion</span></span>
            <a href={b_d_b["Kid's Fashion"]}>
              <div className="shadow">
                <img src={d_tif[0]} className="img-responsive" />
              </div>
            </a>
            <div className="btn">
              <span>SHOP NOW</span>
              
            </div>
          </div>
          <div>
            <span className={styles['fs-16']}><span className="lite">Women's Clothing</span></span>
            <a href={b_d_b['Womens Clothing']}>
              <div className="shadow">
                <img src={d_tif[1]} className="img-responsive" />
              </div>
            </a>
            <div className="btn">
              <span>SHOP NOW</span>
              
            </div>
          </div>
        </div>
        <div className="d2">
          <div>
            <span className={styles['fs-16']}><span className="lite">Shoes</span></span>
            <a href={b_d_b.Shoes}>
              <div className="shadow">
                <img src={d_tif[2]} className="img-responsive" />
              </div>
            </a>
            <div className="btn">
              <span>SHOP NOW</span>
              
            </div>
          </div>
          <div>
            <span className={styles['fs-16']}><span className="lite">Watches</span></span>
            <a href={b_d_b.Watches}>
              <div className="shadow">
                <img src={d_tif[3]} className="img-responsive" />
              </div>
            </a>
            <div className="btn">
              <span>SHOP NOW</span>
              
            </div>
          </div>
        </div>
        <div className={`d3 ${styles.right0}`}>
          <div>
            <span className={styles['fs-16']}><span className="lite">Men's Clothing</span></span>
            <a href={b_d_b['Mens Clothing']}>
              <div className="shadow">
                <img src={d_tif[4]} className="img-responsive" />
              </div>
            </a>
            <div className="btn">
              <span>SHOP NOW</span>
              
            </div>
          </div>
        </div>
        <div className={`${styles.breadcrums} ${styles['mt-10']} ${styles.pointer}`}>
          <a href="https://storefront-stage.fptechscience.com/en/landing/fashion">
            <span>Men's Clothing| Women's Clothing| Kids Clothing| Footwear| Jewellery| Eyewear & More…</span>
          </a>
        </div>
      </div>
      <Row className={`${styles['m-15']} ${styles['mt-40']} ${styles['mb-40']} brand-details-inn`}>
        {threeCols.map(col => (
          <Col md={4} xs={4} sm={4}>
            <a href={col.link} key={col.title}>
              <img src={col.img} alt={col.title} className="img-responsive-in" />
            </a>
          </Col>
        ))}
      </Row>
      <div className="display-t-i-hl">
        <div className={`${styles['fs-20']} title`}>BEST OF LIFESTYLE</div>
        <div className="d1">
          <div>
            <span className={styles['fs-16']}><span className="lite">Kids Furniture</span></span>
            <a href={b_d_b['furniture']}>
              <div className="shadow">
                <img src={d_tihl[0]} className="img-responsive" />
              </div>
            </a>
            <div className="btn">
              <span>SHOP NOW</span>
              
            </div>
          </div>
          <div>
            <span className={styles['fs-16']}><span className="lite">Living Room Furniture</span></span>
            <a href={b_d_b['furniture']}></a>
              <div className="shadow">
                <img src={d_tihl[1]} className="img-responsive" />
              </div>
            <div className="btn">
              <span>SHOP NOW</span>
              
            </div>
          </div>
        </div>
        <div className="d2">
          <div>
            <span className={styles['fs-16']}><span className="lite">Lamps</span></span>
            <a href={b_d_b['lamps']}>
              <div className="shadow">
                <img src={d_tihl[2]} className="img-responsive" />
              </div>
            </a>
            <div className="btn">
              <span>SHOP NOW</span>
              
            </div>
          </div>
          <div>
            <span className={styles['fs-16']}><span className="lite">Cushions</span></span>
            <a href={b_d_b['bedding']}>
              <div className="shadow">
                <img src={d_tihl[3]} className="img-responsive" />
              </div>
            </a>
            <div className="btn">
              <span>SHOP NOW</span>
              
            </div>
          </div>
        </div>
        <div className={`d3 ${styles.right0}`}>
          <div>
            <span className={styles['fs-16']}><span className="lite">Lights</span></span>
            <a href={b_d_b['Lights']}>
              <div className="shadow">
                <img src={d_tihl[4]} className="img-responsive" />
              </div>
            </a>
            <div className="btn">
              <span>SHOP NOW</span>
              
            </div>
          </div>
        </div>
        <div className={`${styles['breadcrums']} ${styles['mt-10']} ${styles['pointer']}`}>
          <a href="https://storefront-stage.fptechscience.com/en/landing/lifestyle">
            <span>Bedsheets  |  Furniture  |  Cushions  |  Wall Decor  |  Lights  |  Living Room Furniture  |  Photo Frames  |  Rugs & Mats  & more…</span>
          </a>
        </div>
      </div>
      <Row className={`${styles['m-15']} ${styles['mt-40']} ${styles['mb-40']} brand-details-inn`}>
        {twoCols.map(col => (
          <Col md={6} xs={6} sm={6} key={col.title}>
            <img src={col.img} alt={col.title} className="img-responsive-in" />
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
              <span className={styles['fs-16']}><span className="lite">Laptops</span></span>
              <a href={b_d_b.Laptops}>
                <div className="shadow">
                  <img src={d_tie[0]} className="img-responsive" />
                </div>
              </a>
              <div className="btn">
                <span>SHOP NOW</span>
                
              </div>
            </div>
            <div>
              <span className={styles['fs-16']}><span className="lite">Mobiles
                                                </span>
              </span>
              <a href={b_d_b.Mobiles}>
                <div className="shadow">
                  <img src={d_tie[1]} className="img-responsive" />
                </div>
              </a>
              <div className="btn">
                <span>SHOP NOW</span>
                
              </div>
            </div>
          </div>
          <div className="d2">
            <div>
              <span className={styles['fs-16']}><span className="lite">Camera</span></span>
              <a href={b_d_b.Cameras}>
                <div className="shadow">
                  <img src={d_tie[2]} className="img-responsive" />
                </div>
              </a>
              <div className="btn">
                <span>SHOP NOW</span>
                
              </div>
            </div>
            <div>
              <span className={styles['fs-16']}><span className="lite">Kitchen Appliances</span></span>
              <a href={b_d_b['Kitchen Appliances']}>
                <div className="shadow">
                  <img src={d_tie[3]} className="img-responsive" />
                </div>
              </a>
              <div className="btn">
                <span>SHOP NOW</span>
                
              </div>
            </div>
          </div>
          <div className={`d3 ${styles.right0}`}>
            <div>
              <span className={styles['fs-16']}><span className="lite">Audio Devices</span></span>
              <a href={b_d_b.Speakers}>
                <div className="shadow">
                  <img src={d_tie[4]} className="img-responsive" />
                </div>
              </a>
              <div className="btn">
                <span>SHOP NOW</span>
                
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.breadcrums} ${styles['mt-10']} ${styles.pointer}`}>
          <a href="https://storefront-stage.fptechscience.com/en/landing/electronics">
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
              <a href={i.links} key={i.title}>
                <div className="image">
                  <img src={i.img} alt={i.img} />
                </div>
                <div className="b_l">
                  <img src={i.brandImg} width="80" height="30" alt={i.brandImg} />
                  <SVGComponent clsName="arrow arrow-black " src="icons/common-icon/arrow" />
                </div>
              </a>
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
