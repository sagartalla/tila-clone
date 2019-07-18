let sliderTBS,
  sliderTIE,
  sliderHAL,
  sliderDODAY,
  sliderBS,
  sliderRV;

// const tie = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const tbs = [{
  img: `/static/img/landing-home/${lang === 'en' ? 'main-Armani' : 'main-Armani-ar'}.png`,
  title: `${lang === 'en' ? 'Armani Sunglasses' : ' نظارات شمسية ارماني'}`,
  key: 'Armani Sunglasses',
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'main-Charger' : 'main-Charger-ar'}.png`,
  title: `${lang === 'en' ? 'Baseus Charger' : 'شاحن باسيوس '}`,
  key: 'Baseus Charger',
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'main-Joyroom' : 'main-Joyroom-ar'}.png`,
  title: 'Joyroom',
  title: `${lang === 'en' ? 'Joyroom' : 'جويرووم'}`,
  key: 'Joyroom',
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'main-LDNIO' : 'main-LDNIO-ar'}.jpg`,
  title: 'Ldnio',
  title: `${lang === 'en' ? 'Ldnio' : 'لدنيو'}`,
  key: 'Ldnio',
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'main-RAYBAN' : 'main-RAYBAN-ar'}.jpg`,
  title: 'Rayban',
  title: `${lang === 'en' ? 'Rayban' : 'راي بان'}`,
  key: 'Rayban',
}];

const tie = [{
  img: '/static/img/landing-home/Mobiles.png',
  title: `${lang === 'en' ? 'Mobiles' : 'الجوالات'}`,
  key: 'Mobiles',
}, {
  img: '/static/img/landing-home/Laptops.png',
  title: `${lang === 'en' ? 'Laptops' : 'اللاب توبات'}`,
  key: 'Laptops',
}, {
  img: '/static/img/landing-home/memory.png',
  title: `${lang === 'en' ? 'Memory' : 'اللاب توبات'}`,
  key: 'Laptops',
}, {
  img: '/static/img/landing-home/cameras.png',
  title: `${lang === 'en' ? 'Cameras' : 'كاميرات'}`,
  key: 'Cameras',
}, {
  img: '/static/img/landing-home/television.png',
  title: `${lang === 'en' ? 'TVs' : 'التلفزيونات'}`,
  key: 'Televisions',
}, {
  img: '/static/img/landing-home/mobileaccess.png',
  title: `${lang === 'en' ? 'Mobile Accessories' : 'أجهزة التخزين'}`,
  key: 'Mobile Accessories',
}, {
  img: '/static/img/landing-home/tablets.png',
  title: `${lang === 'en' ? 'Tablets' : 'أجهزة التخزين'}`,
  key: 'Tablets',
}, {
  img: '/static/img/landing-home/Kitchen-appliances.png',
  title: `${lang === 'en' ? 'Kitchen Appliances' : 'أجهزة التخزين'}`,
  key: 'Kitchen Appliances',
}, {
  img: '/static/img/landing-home/smartwatch.png',
  title: `${lang === 'en' ? 'Smart Watch' : 'أجهزة المنزل'}`,
  key: 'Smart Watch',
}, {
  img: '/static/img/landing-home/homeentertainment.png',
  title: `${lang === 'en' ? 'Home Entertainment' : 'أجهزة التخزين'}`,
  key: 'Home Entertainment',
}, {
  img: '/static/img/landing-home/routers.png',
  title: `${lang === 'en' ? 'Routers' : 'أجهزة التخزين'}`,
  key: 'Routers',
}, {
  img: '/static/img/landing-home/computerperepherals.png',
  title: `${lang === 'en' ? 'computer perepherals' : 'أجهزة التخزين'}`,
  key: 'computer perepherals',
}, {
  img: '/static/img/landing-home/printers_home.png',
  title: `${lang === 'en' ? 'Printers' : 'أجهزة التخزين'}`,
  key: 'Printers',
}, {
  img: '/static/img/landing-home/Home_appliances.png',
  title: `${lang === 'en' ? 'Home Appliances' : 'أجهزة التخزين'}`,
  key: 'Home Appliances',
}];

const hal = [{
  img: '/static/img/landing-home/womens-clothing.png',
  title: `${lang === 'en' ? 'Women\'s Clothing' : 'ملابس نسائية\نسائي'}`,
  key: 'Womens Clothing',
}, {
  img: '/static/img/landing-home/mens-clothing.png',
  title: `${lang === 'en' ? 'Men\'s Clothing' : 'ملابس رجالية'}`,
  key: 'Mens Clothing',
}, {
  img: '/static/img/landing-home/jewellery.png',
  title: `${lang === 'en' ? 'Jewellery' : 'مجوهرات'}`,
  key: 'Jewellery',
}, {
  img: '/static/img/landing-home/watches.png',
  title: `${lang === 'en' ? 'Watches' : 'ساعات اليد'}`,
  key: 'Watches',
}, {
  img: '/static/img/landing-home/shoes_home.png',
  title: `${lang === 'en' ? 'Footwear' : 'أزياءمستلزمات'}`,
  key: 'Fashion Accessories',
}, {
  img: '/static/img/landing-home/sunglasse_home.png',
  title: `${lang === 'en' ? 'Sunglasses' : 'أزياءمستلزمات'}`,
  key: 'Footwear',
}, {
  img: '/static/img/landing-home/sports_home.png',
  title: `${lang === 'en' ? 'Sports' : 'أزياءمستلزمات'}`,
  key: 'Sports',
}, {
  img: '/static/img/landing-home/fitness_home.png',
  title: `${lang === 'en' ? 'Fitness' : 'عطور'}`,
  key: 'Fitness',
}, {
  img: '/static/img/landing-home/toys_home.png',
  title: `${lang === 'en' ? 'Toys' : 'عطور'}`,
  key: 'Toys',
}, {
  img: '/static/img/landing-home/beauty_and_health.png',
  title: `${lang === 'en' ? 'Beauty & Health' : 'مجوهرات'}`,
  key: 'Beauty & Health',
}, {
  img: '/static/img/landing-home/cushion_squilts.png',
  title: `${lang === 'en' ? 'Cushions & Quilts' : 'مجوهرات'}`,
  key: 'Cushions & Quilts',
}, {
  img: '/static/img/landing-home/home_sweet_home.png',
  title: `${lang === 'en' ? 'Door Mats' : 'مجوهرات'}`,
  key: 'Door Mats',
}, {
  img: '/static/img/landing-home/car_freshners.png',
  title: `${lang === 'en' ? 'Car Freshner' : 'مجوهرات'}`,
  key: 'Car Freshner',
}, {
  img: '/static/img/landing-home/photo_frames.png',
  title: `${lang === 'en' ? 'Photo Frames' : 'مجوهرات'}`,
  key: 'Photo Frames',
}];


const d_tie = [
  `/static/img/landing-home/${lang === 'en' ? 'laptop-stand' : 'laptop-stand-ar'}.jpg`,
  `/static/img/landing-home/${lang === 'en' ? 'headphones' : 'headphones-ar'}.jpg`,
  `/static/img/landing-home/${lang === 'en' ? 'mobile-case' : 'mobile-case-ar'}.jpg`,
  `/static/img/landing-home/${lang === 'en' ? 'smart-band' : 'smart-band-ar'}.jpg`,
  `/static/img/landing-home/${lang === 'en' ? 'USB-hub' : 'USB-hub-ar'}.jpg`,
];

const d_tif = [
  `/static/img/landing-home/${lang === 'en' ? 'fashion-Banner-Small' : 'fashion-Banner-Small-ar'}.png`,
  `/static/img/landing-home/${lang === 'en' ? 'fashion-Banner-Medium.png' : 'fashion-Banner-Medium-ar.jpg'}`,
  `/static/img/landing-home/${lang === 'en' ? 'fashion-Banner-Medium-2' : 'fashion-Banner-Medium-2-ar'}.png`,
  `/static/img/landing-home/${lang === 'en' ? 'fashion-Banner-Small-2' : 'fashion-Banner-Small-2-ar'}.png`,
  `/static/img/landing-home/${lang === 'en' ? 'fashion-banner-large' : 'fashion-banner-large-ar'}.png`,
];

const d_tihl = [
  `/static/img/landing-home/${lang === 'en' ? 'kids-furniture' : 'kids-furniture-ar'}.jpg`,
  `/static/img/landing-home/${lang === 'en' ? 'living-room-furniture' : 'living-room-furniture-ar'}.jpg`,
  `/static/img/landing-home/${lang === 'en' ? 'tables' : 'tables-ar'}.jpg`,
  `/static/img/landing-home/${lang === 'en' ? 'cushions' : 'cushions-ar'}.jpg`,
  `/static/img/landing-home/${lang === 'en' ? 'lights' : 'lights-ar'}.jpg`,
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
  img: `/static/img/landing-home/${lang === 'en' ? 'halfban_baseus_eng' : 'halfban_baseus_ara'}.jpg`,
  link: `/SAU/${lang}/srp?search=Baseus&language=en&isListed=false`,
  title: 'Baseus',
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'halfban_ldnio_eng' : 'halfban_ldnio_ara'}.jpg`,
  link: `/SAU/${lang}/srp?search=LDNIO&language=en&isListed=false`,
  title: 'LDNIO',
}];

const threeCols = [{
  img: `/static/img/landing-home/${lang === 'en' ? 'THIRD-LAPTOP-STAND' : 'THIRD-LAPTOP-STAND-ar'}.jpg`,
  link: `/SAU/${lang}/srp?search=Laptop%20stand&language=en&isListed=false`,
  title: 'LAPTOP STAND',
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'THIRD-SMART-BAND' : 'THIRD-SMART-BAND-ar'}.jpg`,
  link: `/SAU/${lang}/srp?search=Smart%20Band&language=en&isListed=false`,
  title: 'SMART BAND',
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'third-HEADPHONE' : 'third-HEADPHONE-ar'}.jpg`,
  link: `/SAU/${lang}/srp?search=headphones&language=en&isListed=false`,
  title: 'HEADPHONE',
}];

const b_y_l = [{
  img: '/static/img/landing-home/Joyroom.jpg',
  title: 'Joyroom',
  links: `/SAU/${lang}/srp?search=Joyroom&language=en&isListed=false`,
}, {
  img: '/static/img/landing-home/LDNIO.jpg',
  title: 'LDNIO',
  links: `/SAU/${lang}/srp?search=LDNIO&language=en&isListed=false`,
}, {
  img: '/static/img/landing-home/Ray-Ban.jpg',
  title: 'Ray-Ban',
  links: `/SAU/${lang}/srp?search=Rayban&language=en&isListed=false`,
}, {
  img: '/static/img/landing-home/Baseus.jpg',
  title: 'Baseus',
  links: `/SAU/${lang}/srp?search=Baseus&language=en&isListed=false`,
}];
// {
//   img: '/static/img/landing-home/levis-m.jpg',
//   brandImg: '/static/img/landing-home/levis.jpg',
//   title: 'Levis',
//   links: `/SAU/${lang}/srp?search=Levis&isListed=false`,
// }];

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
  Mobiles: `/SAU/${lang}/srp/${lang === 'en' ? 'mobiles' : 'الهواتف-النقالة'}?categoryTree=true&isListed=false&sid=848,2349`,
  Clothing: `/SAU/${lang}/srp?isListed=false&&search=Clothing`,
  'Clothing Accessories': `/SAU/${lang}/srp?search=Clothing&&isListed=false`,
  Laptops: `/SAU/${lang}/srp/${lang === 'en' ? 'laptops' : 'أجهزة-الكمبيوتر-المحمولة'}?categoryTree=true&isListed=false&sid=848,2352`,
  'Storage Devices': `/SAU/${lang}/srp?search=storage%20devices&language=en&isListed=false`,
  Cameras: `/SAU/${lang}/srp/${lang === 'en' ? 'camera' : 'الة-تصوير'}?categoryTree=true&isListed=false&sid=848,882`,
  Televisions: `/SAU/${lang}/srp/${lang === 'en' ? 'televisions' : 'التلفزيونات'}?categoryTree=true&isListed=false&sid=848,2351`,
  'Home Appliances': `/SAU/${lang}/srp/${lang === 'en' ? 'home-applaince' : 'الأجهزة-المنزلية'}?categoryTree=true&isListed=false&sid=932,935`,
  'Womens Clothing': `/SAU/${lang}/srp/women%27s-clothing?categoryTree=true&isListed=false&sid=892,2465`,
  'Mens Clothing': `/SAU/${lang}/srp/${lang === 'en' ? 'clothing' : 'ملابس'}?categoryTree=true&isListed=false&sid=892,898`,
  'Fashion Accessories': `/SAU/${lang}/srp/${lang === 'en' ? 'fashion-accessories' : 'الإكسسوارات'}?categoryTree=true&isListed=false&sid=892,923`,
  Watches: `/SAU/${lang}/srp/watches?categoryTree=true&isListed=false&sid=892,2446`,
  'Kitchen Appliances': `/SAU/${lang}/srp/${lang === 'en' ? 'kitchen-appliances' : 'أدوات-المطبخ'}?categoryTree=true&isListed=false&sid=932,945`,
  Speakers: `/SAU/${lang}/srp?search=Speakers&&isListed=false`,
  'Microwave Ovens': `/SAU/${lang}/srp?search=Microwave%20Ovens&&isListed=false`,
  'Smart Watch': `/SAU/${lang}/srp?search=Smart%20Watches&language=en&isListed=false`,
  'Mobile Accessories': `/SAU/${lang}/srp/${lang === 'en' ? 'mobile-accessories' : 'ملحقات-الهاتف-المحمول'}?categoryTree=true&isListed=false&sid=848,850`,
  "Kid's Fashion": `/SAU/${lang}/srp?search=Kid%27s%20Fashion&language=en&isListed=false`,
  Footwear: `/SAU/${lang}/srp?search=Footwear&&isListed=false`,
  "Men's Footwear": `/SAU/${lang}/srp/${lang === 'en' ? 'footwear' : 'حذاء'}?categoryTree=true&isListed=false&sid=892,907`,
  'Women Footwear': `/SAU/${lang}/srp/${lang === 'en' ? 'footwear' : 'حذاء'}?categoryTree=true&isListed=false&sid=892,921`,
  Bags: `/SAU/${lang}/srp?search=BAGS&language=en&isListed=false`,
  Eyewear: `/SAU/${lang}/srp?search=Eyewear&&isListed=false`,
  Jewellery: `/SAU/${lang}/srp?search=Jewellery&&isListed=false`,
  GUESS: `/SAU/${lang}/srp?search=GUESS&language=en&isListed=false`,
  FENDI: `/SAU/${lang}/srp?search=FENDI&language=en&isListed=false`,
  'MORPHY RICHARDS': `/SAU/${lang}/srp?search=MORPHY%20RICHARDS%20&disableSpellCheck=true&&isListed=false`,
  SHIRTS: `/SAU/${lang}/srp?search=SHIRTS&&isListed=false`,
  Perfumes: `/SAU/${lang}/srp?search=perfumes&language=en&isListed=false`,
  Shoes: `/SAU/${lang}/srp?search=Shoes&&isListed=false`,
  Lights: `/SAU/${lang}/srp?search=light&language=en&isListed=false`,
  lamps: `/SAU/${lang}/srp?search=lamps&language=en&isListed=false`,
  bedding: `/SAU/${lang}/srp?search=bedding&language=en&isListed=false`,
  furniture: `/SAU/${lang}/srp?search=furniture&language=en&isListed=false`,
  'HOME DECOR': `/SAU/${lang}/srp?search=HOME%20DECOR&isListed=false`,
  LAPTOPS: `/SAU/${lang}/srp/${lang === 'en' ? 'laptops' : 'أجهزة-الكمبيوتر-المحمولة'}?categoryTree=true&isListed=false&sid=848,2352`,
  'MENS CLOTHING': `/SAU/${lang}/srp/${lang === 'en' ? 'clothing' : 'ملابس'}?categoryTree=true&isListed=false&sid=892,899`,
  'MOBILE ACCESSORIES': `/SAU/${lang}/srp/${lang === 'en' ? 'mobile-accessories' : 'ملحقات-الهاتف-المحمول'}?categoryTree=true&isListed=false&sid=848,850`,
  'PERFUMES FOR WOMEN': `/SAU/${lang}/srp?search=perfumes&language=en&isListed=false`,
  WATCHES: `/SAU/${lang}/srp/watches?categoryTree=true&isListed=false&sid=892,2446`,
  'Laptop stand': `/SAU/${lang}/srp?search=Laptop%20stand&language=en&isListed=false`,
  Headphones: `/SAU/${lang}/srp?search=headphones&language=en&isListed=false`,
  'Mobiles Cases': `/SAU/${lang}/srp?search=Mobiles&language=en&isListed=false`,
  'Smart Band': `/SAU/${lang}/srp?search=Smart%20Band&language=en&isListed=false`,
  'USB Hub': `/SAU/${lang}/srp?search=USB%20Hub&language=en&isListed=false`,
  Burberry: `/SAU/${lang}/srp?search=burberry&language=en&isListed=false`,
  VERSACE: `/SAU/${lang}/srp?search=VERSACE&language=en&isListed=false`,
  'Armani Exchange': `/SAU/${lang}/srp?search=Armani%20Exchange&language=en&isListed=false`,
  Vogue: `/SAU/${lang}/srp?search=vogue&language=en&isListed=false`,
  BVLGARI: `/SAU/${lang}/srp?search=BVLGARI&language=en&isListed=false`,
  Ldnio: `/SAU/${lang}/srp?search=LDNIO&language=en&isListed=false`,
  Rayban: `/SAU/${lang}/srp?search=Rayban&language=en&isListed=false`,
  'Armani Sunglasses': `/SAU/${lang}/srp/sunglasses/?search=Armani&language=en&isListed=false&sid=1480&categoryFacet=true`,
  'Baseus Charger': `/SAU/${lang}/srp?search=Baseus%20charger&language=en&isListed=false`,
  Joyroom: `/SAU/${lang}/srp?search=Joyroom&language=en&isListed=false`,
};

const HomePage = () => (
  <NoSSR>
    <div className="home-style-main">
      <div className={`${styles['mb-40']} top-banner-slider`}>
        <Slider
          dots
          autoplay
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
              <a href={b_d_b[i.key]}>
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
          <span className={`title ${styles['fs-20']}`}>{lang === 'en' ? 'TOP IN ELECTRONICS' : 'أعلى في الالكترونيات'}</span>
          <Slider
            asNavFor={sliderTIE}
            ref={slider => (sliderTIE = slider)}
            lazyLoad
            className={styles['ht-100per']}
            slidesToShow={10}
          >
            {tie.map(i => (
              <div>
                <div className="item" key={i}>
                  <a href={b_d_b[i.key]}>
                    <img src={i.img} alt={i.title} />
                  </a>
                  <span className={`${styles['fs-12']} ${styles['pt-10']} ${styles.flex} ${styles['justify-center']} slider-elips ${styles['lne-ht1_2']}`}>{i.title}</span>
                </div>
              </div>
              ))}
          </Slider>
        </div>
        <div className="h-a-l">
          <span className={`title ${styles['fs-20']}`}> {lang === 'en' ? 'TOP IN FASHION' : 'أعلى في الموضة'} | {lang === 'en' ? 'LIFESTYLE' : 'لايف ستايل'}</span>
          <Slider
            asNavFor={sliderHAL}
            ref={slider => (sliderHAL = slider)}
            lazyLoad
            className={styles['ht-100per']}
            slidesToShow={10}
          >
            {hal.map(i => (
              <div>
                  <div className="item" key={i}>
                    <a href={b_d_b[i.key]}>
                      <img src={i.img} />
                    </a>
                    <span className={`${styles['fs-12']} ${styles['pt-10']} ${styles['justify-center']} slider-elips ${styles['lne-ht1_2']}`}>{i.title}</span>
                  </div>
                </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="display-t-i-f">
        <div className={`${styles['fs-20']} title`}>{lang === 'en' ? 'TOP IN FASHION' : 'أعلى في الموضة'}</div>
        <div className="d1">
          <div>
            {/* <span className={styles['fs-16']}><span className="lite"> {lang === 'en' ? 'Kids Fashion' : 'ملابس أطفال\أطفال'}</span></span> */}
            <a href={b_d_b.Burberry}>
              <div className="d-sub">
                <img src={d_tif[0]} className="img-responsive" />
              </div>
            </a>
            {/* <div className="btn">
              <span>{lang === 'en' ? 'SHOP NOW' : 'تسوق الآن'}</span>
            </div> */}
          </div>
          <div>
            {/* <span className={styles['fs-16']}><span className="lite"> {lang === 'en' ? 'Women\'s Clothing' : 'ملابس نسائية\نسائي'}</span></span> */}
            <a href={b_d_b.VERSACE}>
              <div className="d-sub">
                <img src={d_tif[1]} className="img-responsive" />
              </div>
            </a>
            {/* <div className="btn">
              <span>{lang === 'en' ? 'SHOP NOW' : 'تسوق الآن'}</span>
            </div> */}
          </div>
        </div>
        <div className="d2">
          <div>
            {/* <span className={styles['fs-16']}><span className="lite">{lang === 'en' ? 'Shoes' : 'أحذية'}</span></span> */}
            <a href={b_d_b['Armani Exchange']}>
              <div className="d-sub">
                <img src={d_tif[2]} className="img-responsive" />
              </div>
            </a>
            {/* <div className="btn">
              <span>{lang === 'en' ? 'SHOP NOW' : 'تسوق الآن'}</span>
            </div> */}
          </div>
          <div>
            {/* <span className={styles['fs-16']}><span className="lite"> {lang === 'en' ? 'Watches' : 'ساعات اليد'}</span></span> */}
            <a href={b_d_b.Vogue}>
              <div className="d-sub">
                <img src={d_tif[3]} className="img-responsive" />
              </div>
            </a>
            {/* <div className="btn">
              <span>{lang === 'en' ? 'SHOP NOW' : 'تسوق الآن'}</span>
            </div> */}
          </div>
        </div>
        <div className={`d3 ${styles.right0}`}>
          <div>
            {/* <span className={styles['fs-16']}><span className="lite"> {lang === 'en' ? 'Men\'s Clothing' : 'ملابس رجالية'}</span></span> */}
            <a href={b_d_b.BVLGARI}>
              <div className="d3-sub">
                <img src={d_tif[4]} className="img-responsive" />
              </div>
            </a>
            {/* <div className="btn">
              <span>{lang === 'en' ? 'SHOP NOW' : 'تسوق الآن'}</span>
            </div> */}
          </div>
        </div>
        <div className={`${styles.breadcrums} ${styles['mt-10']} ${styles.pointer} bredcrums-part`}>
          <a href={`/SAU/${lang}/landing/fashion`}>
            <span>{lang === 'en' ? 'Men\'s Clothing' : 'ملابس رجالية'} | {lang === 'en' ? 'Women\'s Clothing' : 'ملابس نسائية\نسائي'} | {lang === 'en' ? 'Kids Fashion' : 'ملابس أطفال\أطفال'} | {lang === 'en' ? 'Footwear' : 'أحذية'} | {lang === 'en' ? 'Jewellery' : 'مجوهرات'} | {lang === 'en' ? 'Eyewear' : 'نظارات'}</span>
          </a>
        </div>
      </div>
      <Row className={`${styles['m-15']} ${styles['mt-40']} ${styles['mb-40']} brand-details-inn`}>
        {threeCols.map(col => (
          <Col md={4} xs={4} sm={4} className={`${styles['pl-10']} ${styles['pr-10']}`}>
            <a href={col.link} key={col.title}>
              <img src={col.img} alt={col.title} className="img-responsive-in" />
            </a>
          </Col>
        ))}
      </Row>
      <div className="display-t-i-hl">
        <div className={`${styles['fs-20']} title`}> {lang === 'en' ? 'BEST OF LIFESTYLE' : 'أفضل من لايف ستايل'}</div>
        <div className="d1">
          <div>
            {/* <span className={styles['fs-16']}><span className="lite">{lang === 'en' ? 'Kids Furniture' : 'أثاث الأطفال'}</span></span> */}
            <a href={b_d_b.furniture}>
              {/* <div className="shadow"> */}
                <img src={d_tihl[0]} className="img-responsive" />
              {/* </div> */}
            </a>
            {/* <div className="btn">
              <span>{lang === 'en' ? 'SHOP NOW' : 'تسوق الآن'}</span>
            </div> */}
          </div>
          <div>
            {/* <span className={styles['fs-16']}><span className="lite">{lang === 'en' ? 'Living Room Furniture' : 'غرفة المعيشة الأثاث'}</span></span> */}
            <a href={b_d_b.furniture}>
              {/* <div className="shadow"> */}
                <img src={d_tihl[1]} className="img-responsive" />
              {/* </div> */}
            </a>
            {/* <div className="btn">
              <span>{lang === 'en' ? 'SHOP NOW' : 'تسوق الآن'}</span>
            </div> */}
          </div>
        </div>
        <div className="d2">
          <div>
            {/* <span className={styles['fs-16']}><span className="lite">{lang === 'en' ? 'Lamps' : 'مصباح'} </span></span> */}
            <a href={b_d_b.lamps}>
              {/* <div className="shadow"> */}
                <img src={d_tihl[2]} className="img-responsive" />
              {/* </div> */}
            </a>
            {/* <div className="btn">
              <span>{lang === 'en' ? 'SHOP NOW' : 'تسوق الآن'}</span>
            </div> */}
          </div>
          <div>
            {/* <span className={styles['fs-16']}><span className="lite">{lang === 'en' ? 'Cushions' : 'وسائد'}</span></span> */}
            <a href={b_d_b.bedding}>
              {/* <div className="shadow"> */}
                <img src={d_tihl[3]} className="img-responsive" />
              {/* </div> */}
            </a>
            {/* <div className="btn">
              <span>{lang === 'en' ? 'SHOP NOW' : 'تسوق الآن'}</span>
            </div> */}
          </div>
        </div>
        <div className={`d3 ${styles.right0}`}>
          <div>
            {/* <span className={styles['fs-16']}><span className="lite">{lang === 'en' ? 'Lights' : 'الأنوار'}</span></span> */}
            <a href={b_d_b.Lights}>
              {/* <div className="shadow"> */}
                <img src={d_tihl[4]} className="img-responsive" />
              {/* </div> */}
            </a>
            {/* <div className="btn">
              <span>{lang === 'en' ? 'SHOP NOW' : 'تسوق الآن'}</span>
            </div> */}
          </div>
        </div>
        <div className={`${styles.breadcrums} ${styles['mt-10']} ${styles.pointer} bredcrums-part`}>
          <a href={`/SAU/${lang}/landing/lifestyle`}>
            <span> {lang === 'en' ? 'Bedsheets' : 'غطاء\شرشف السرير'} | {lang === 'en' ? 'Furniture' : 'الأثاث'} | {lang === 'en' ? 'Cushions' : 'وسائد'} | {lang === 'en' ? 'Wall Decor' : '  جدار ديكورت'} | {lang === 'en' ? 'Lights' : 'الأنوار'} | {lang === 'en' ? 'Living Room Furniture' : 'غرفة المعيشة الأثاث'} | {lang === 'en' ? 'Photo Frames' : 'إطارات صور'} </span>
          </a>
        </div>
      </div>
      <Row className={`${styles['m-15']} ${styles['mt-40']} ${styles['mb-40']} brand-details-inn home-two-nammers`}>
        {twoCols.map(col => (
          <Col md={6} xs={6} sm={6} key={col.title}>
            <a href={col.link}>
              <img src={col.img} alt={col.title} className="img-responsive-in" />
            </a>
          </Col>
        ))}
      </Row>
      <div className="display-t-i-e">
        <div className={`${styles['fs-20']} title`}>{lang === 'en' ? 'TOP IN ELECTRONICS' : 'أعلى في الالكترونيات'}</div>
        {/* <div className={`${styles['']}`}>
          <span>See more</span><SVGComponent clsName={`${styles['arrow']}`} src="icons/common-icon/arrow" />
        </div> */}
        <div>
          <div className="d1">
            <div>
              {/* <span className={styles['fs-16']}><span className="lite">{lang === 'en' ? 'Laptops' : 'اللاب توبات'} </span></span> */}
              <a href={b_d_b['Laptop stand']}>
                <div className="d-sub">
                  <img src={d_tie[0]} className="img-responsive" />
                </div>
              </a>
              {/* <div className="btn">
                <span>{lang === 'en' ? 'SHOP NOW' : 'تسوق الآن'}</span>
              </div> */}
            </div>
            <div>
              {/* <span className={styles['fs-16']}><span className="lite">{lang === 'en' ? 'Mobiles' : 'الجوالات'}
              </span>
              </span> */}
              <a href={b_d_b.Headphones}>
                <div className="d-sub">
                  <img src={d_tie[1]} className="img-responsive" />
                </div>
              </a>
              {/* <div className="btn">
                <span>{lang === 'en' ? 'SHOP NOW' : 'تسوق الآن'}</span>
              </div> */}
            </div>
          </div>
          <div className="d2">
            <div>
              {/* <span className={styles['fs-16']}><span className="lite">{lang === 'en' ? 'Cameras' : 'كاميرات'}</span></span> */}
              <a href={b_d_b['Mobiles Cases']}>
                <div className="d-sub">
                  <img src={d_tie[2]} className="img-responsive" />
                </div>
              </a>
              {/* <div className="btn">
                <span>{lang === 'en' ? 'SHOP NOW' : 'تسوق الآن'}</span>
              </div> */}
            </div>
            <div>
              {/* <span className={styles['fs-16']}><span className="lite">{lang === 'en' ? 'Kitchen Appliances' : ' أجهزة المطبخ'}</span></span> */}
              <a href={b_d_b['Smart Band']}>
                <div className="d-sub">
                  <img src={d_tie[3]} className="img-responsive" />
                </div>
              </a>
              {/* <div className="btn">
                <span>{lang === 'en' ? 'SHOP NOW' : 'تسوق الآن'}</span>
              </div> */}
            </div>
          </div>
          <div className={`d3 ${styles.right0}`}>
            <div>
              {/* <span className={styles['fs-16']}><span className="lite">{lang === 'en' ? 'Audio Devices' : 'أثاث الأطفال'}</span></span> */}
              <a href={b_d_b['USB Hub']}>
                <div className="d3-sub">
                  <img src={d_tie[4]} className="img-responsive" />
                </div>
              </a>
              {/* <div className="btn">
                <span>{lang === 'en' ? 'SHOP NOW' : 'تسوق الآن'}</span>
              </div> */}
            </div>
          </div>
        </div>
        <div className={`${styles.breadcrums} ${styles['mt-10']} ${styles.pointer} bredcrums-part`}>
          <a href={`/SAU/${lang}/landing/electronics`}>
            <span>{lang === 'en' ? 'Mobiles' : 'الجوالات'} | {lang === 'en' ? 'Laptops' : 'اللاب توبات'}  | {lang === 'en' ? 'Speakers' : 'مكبر الصوت'}  |  {lang === 'en' ? 'Cameras' : 'كاميرات'} | {lang === 'en' ? 'Microwave Ovens' : 'ميكرويفات '} | {lang === 'en' ? 'Smartwatches' : 'ساعات يد ذكية'} </span>
          </a>
        </div>
      </div>
      {/*<Row className="d_items" >
        <div>
          <span className={`title ${styles['fs-18']}`}>{lang === 'en' ? 'BRANDS YOU LOVE' : 'الماركات التي تحبها'}</span>
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
            <Col key={i} md={3} xs={3} sm={3} className={`${styles['pl-5']} brand-love-inn`}>
              <a href={i.links} key={i.title}>
                <div className="image">
                  <img src={i.img} alt={i.img} />
                </div>
              </a>
            </Col>
          ))}
        </Slider>
        <div className={`${styles.breadcrums} ${styles['mt-20']} ${styles.pointer} bredcrums-part`}>
          <span>Zara  |  Guess  |  Max  |  Nike  |  Fossil  |  Levis  |  Wrangler  |  Shein  & more…</span>
        </div>
      </Row>*/}
      <Row className={`${styles['m-15']} ${styles['mt-40']} ${styles['mb-40']} brand-details-inn`}>
        {b_y_l.map(col => (
          <Col md={3} xs={3} sm={3} key={col.title} className={styles['pl-10']}>
            <a href={col.links}>
              <img src={col.img} alt={col.title} className="img-responsive-in" />
            </a>
          </Col>
        ))}
      </Row>
    </div>
  </NoSSR>
);
