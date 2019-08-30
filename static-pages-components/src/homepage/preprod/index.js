let sliderTBS,
  sliderTIE,
  sliderHAL,
  sliderDODAY,
  sliderBS,
  sliderRV;

// const tie = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const tbs = [{
  img: `/static/img/landing-home/${lang === 'en' ? 'Apple' : 'Apple-AR'}.jpg`,
  title: `${lang === 'en' ? 'Apple' : 'ابل'}`,
  key: 'Apple',
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'Adidas' : 'Adidas - AR'}.jpg`,
  title: `${lang === 'en' ? 'Adidas' : 'أديداس'}`,
  key: 'Adidas',
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'AGATHA' : 'AGATHA- AR'}.jpg`,
  title: `${lang === 'en' ? 'Agatha' : 'أجاثا'}`,
  key: 'Agatha',
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'Sunglass - Michael Kors' : 'Michael kors- AR'}.jpg`,
  title: `${lang === 'en' ? 'Michael Kors' : 'مايكل كورس'}`,
  key: 'Michael Kors',
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'PHILIPS' : 'PHILIPS - AR'}.jpg`,
  title: 'Philips',
  title: `${lang === 'en' ? 'Philips' : 'فيليبس'}`,
  key: 'Philips',
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'Samsung' : 'Samsung - AR'}.jpg`,
  title: 'Samsung',
  title: `${lang === 'en' ? 'Samsung' : 'سامسونج'}`,
  key: 'Samsung',
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'Sunglass' : 'Sunglass - AR'}.jpg`,
  title: 'Rayban',
  title: `${lang === 'en' ? 'Ray-Ban' : 'راي بان'}`,
  key: 'Sunglasses_raybon',
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
  title: `${lang === 'en' ? 'Memory Devices' : 'أجهزة التخزين'}`,
  key: 'Memory',
}, {
  img: '/static/img/landing-home/cameras.png',
  title: `${lang === 'en' ? 'Cameras' : 'الكاميرات'}`,
  key: 'Cameras',
}, {
  img: '/static/img/landing-home/television.png',
  title: `${lang === 'en' ? 'Televisions' : 'التلفزيونات'}`,
  key: 'Televisions',
}, {
  img: '/static/img/landing-home/mobileaccess.png',
  title: `${lang === 'en' ? 'Mobile Accessories' : 'اكسسوارات الجوالات'}`,
  key: 'Mobile Accessories',
}, {
  img: '/static/img/landing-home/tablets.png',
  title: `${lang === 'en' ? 'Tablet & iPads' : 'اجهزة تابلت وايباد'}`,
  key: 'Tablets',
}, {
  img: '/static/img/landing-home/Kitchen-appliances.png',
  title: `${lang === 'en' ? 'Kitchen Appliances' : 'أجهزة المطبخ'}`,
  key: 'Kitchen Appliances',
}, {
  img: '/static/img/landing-home/smartwatch.png',
  title: `${lang === 'en' ? 'Smart Watches' : 'ساعات ذكية‎'}`,
  key: 'Smart Watch',
}, {
  img: '/static/img/landing-home/homeentertainment.png',
  title: `${lang === 'en' ? 'Home Entertainment' : 'أجهزة ترفيهية'}`,
  key: 'Home Entertainment',
}, {
  img: '/static/img/landing-home/routers.png',
  title: `${lang === 'en' ? 'Routers' : 'راوترات'}`,
  key: 'Routers',
}, {
  img: '/static/img/landing-home/computerperepherals.png',
  title: `${lang === 'en' ? 'Computer Peripherals' : 'ملحقات الكمبيوتر'}`,
  key: 'Computer Peripherals',
}, {
  img: '/static/img/landing-home/printers_home.png',
  title: `${lang === 'en' ? 'Printers' : 'طابعات'}`,
  key: 'Printers',
}, {
  img: '/static/img/landing-home/Home_appliances.png',
  title: `${lang === 'en' ? 'Home Appliances' : 'أجهزة المنزل'}`,
  key: 'Home Appliances',
}];

const hal = [{
  img: '/static/img/landing-home/womens-clothing.png',
  title: `${lang === 'en' ? 'Women\'s Clothing' : 'الملابس النسائية'}`,
  key: 'Womens Clothing',
}, {
  img: '/static/img/landing-home/mens-clothing.png',
  title: `${lang === 'en' ? 'Men\'s Clothing' : 'الملابس الرجالية'}`,
  key: 'Mens Clothing',
}, {
  img: '/static/img/landing-home/jewellery.png',
  title: `${lang === 'en' ? 'Jewellery' : 'المجوهرات'}`,
  key: 'Jewellery',
}, {
  img: '/static/img/landing-home/watches.png',
  title: `${lang === 'en' ? 'Watches' : 'ساعات اليد'}`,
  key: 'Watches',
}, {
  img: '/static/img/landing-home/shoes_home.png',
  title: `${lang === 'en' ? 'Footwear' : 'أحذية'}`,
  key: 'Footwear',
}, {
  img: '/static/img/landing-home/sunglasse_home.png',
  title: `${lang === 'en' ? 'Sunglasses' : 'نظارات شمسية'}`,
  key: 'Sunglasses',
}, {
  img: '/static/img/landing-home/sports_home.png',
  title: `${lang === 'en' ? 'Sports & Outdoors' : 'الرياضات والخارج'}`,
  key: 'Sports & Outdoors',
}, {
  img: '/static/img/landing-home/fitness_home.png',
  title: `${lang === 'en' ? 'Exercise & Fitness' : ' تدريبات ولياقة'}`,
  key: 'Exercise & Fitness',
}, {
  img: '/static/img/landing-home/toys_home.png',
  title: `${lang === 'en' ? 'Toys' : 'ألعاب'}`,
  key: 'Toys',
}, {
  img: '/static/img/landing-home/beauty_and_health.png',
  title: `${lang === 'en' ? 'Health & Beauty' : 'الصحة والجمال'}`,
  key: 'Health & Beauty',
}, {
  img: '/static/img/landing-home/cushion_squilts.png',
  title: `${lang === 'en' ? 'Cushions & Covers' : 'اغطية وسادات'}`,
  key: 'Cushions & Covers',
}, {
  img: '/static/img/landing-home/home_sweet_home.png',
  title: `${lang === 'en' ? 'Door Mats' : 'دواسَّات للباب'}`,
  key: 'Door Mats',
}, {
  img: '/static/img/landing-home/car_freshners.png',
  title: `${lang === 'en' ? 'Car Freshener' : 'معطرات جو'}`,
  key: 'Car Freshener',
}, {
  img: '/static/img/landing-home/photo_frames.png',
  title: `${lang === 'en' ? 'Photo Frames' : 'إطارات صور'}`,
  key: 'Photo Frames',
}];


const d_tie = [
  `/static/img/landing-home/${lang === 'en' ? 'Electronics - Banner Small' : 'Electronics - Banner Small-AR'}.jpg`,
  `/static/img/landing-home/${lang === 'en' ? 'Electronics -  Banner Medium 01' : 'Electronics -  Banner Medium -AR 01'}.jpg`,
  `/static/img/landing-home/${lang === 'en' ? 'Electronics -  Banner Medium 02' : 'Electronics -  Banner Medium -AR02'}.jpg`,
  `/static/img/landing-home/${lang === 'en' ? 'Electronics - Banner Small 02' : 'Electronics - Banner Small -AR 02'}.jpg`,
  `/static/img/landing-home/${lang === 'en' ? 'Electronics -  Banner Large' : 'Electronics -  Banner Large-AR'}.jpg`,
];

const d_tif = [
  `/static/img/landing-home/${lang === 'en' ? 'Fashion - Banner small 01' : 'Fashion - Banner small 01_AR'}.jpg`,
  `/static/img/landing-home/${lang === 'en' ? 'Fashion - Banner Medium 01' : 'Fashion - Banner Medium 01_AR'}.jpg`,
  `/static/img/landing-home/${lang === 'en' ? 'Fashion - Banner Medium 02' : 'Fashion - Banner Medium 02_AR'}.jpg`,
  `/static/img/landing-home/${lang === 'en' ? 'Fashion - Banner small 02' : 'Fashion - Banner small 02_AR'}.jpg`,
  `/static/img/landing-home/${lang === 'en' ? 'Fashion - Banner large_' : 'Fashion - Banner large_AR'}.jpg`,
];

const d_tihl = [
  `/static/img/landing-home/${lang === 'en' ? 'Lifestyle - Banner small 01' : 'Lifestyle - Banner small 01_AR'}.jpg`,
  `/static/img/landing-home/${lang === 'en' ? 'Lifestyle - Banner Medium 01' : 'Lifestyle - Banner Medium 01_AR'}.jpg`,
  `/static/img/landing-home/${lang === 'en' ? 'Lifestyle - Banner Medium 02' : 'Lifestyle - Banner Medium 02_AR'}.jpg`,
  `/static/img/landing-home/${lang === 'en' ? 'Lifestyle - Banner small 02' : 'Lifestyle - Banner small 02_AR'}.jpg`,
  `/static/img/landing-home/${lang === 'en' ? 'Lifestyle - Banner Large' : 'Lifestyle - Banner Large_AR'}.jpg`,
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
  img: `/static/img/landing-home/${lang === 'en' ? 'Half Banners' : 'Half Banners_AR_01'}.jpg`,
  link: `/${lang}/search?q=Huawei%20Y5%20Lite`,
  title: 'HAUWEI',
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'Half Banners 01' : 'Half Banners_AR_02'}.jpg`,
  link: `/${lang}/search?q=Baseus`,
  title: 'BASEUS',
}];

const threeCols = [{
  img: `/static/img/landing-home/${lang === 'en' ? 'One third Banners' : 'One third Banners_AR_01'}.jpg`,
  link: `/${lang}/search?q=Best%20Life%20Laptop%20Bag`,
  title: 'BEST LIFE',
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'One third Banners 01' : 'One third Banners_AR_02'}.jpg`,
  link: `/${lang}/search?q=Wiwu%20laptop%20Sleeve`,
  title: 'WIWU',
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'One third Banners 02' : 'One third Banners_AR_03'}.jpg`,
  link: `/${lang}/search/?q=MICROPACK`,
  title: 'MICROPACK',
}];

const b_y_l = [{
  img: '/static/img/landing-home/huawei.jpg',
  title: 'huawei',
  links: `/${lang}/search?q=Huawei`,
}, {
  img: '/static/img/landing-home/Ray_ban_new.jpg',
  title: 'Ray-Ban',
  links: `/${lang}/search?q=Rayban&isListed=false`,
}, {
  img: '/static/img/landing-home/Baseus.jpg',
  title: 'Baseus',
  links: `/${lang}/search?q=Baseus&isListed=false`,
}, {
  img: '/static/img/landing-home/canon.jpg',
  title: 'canon',
  links: `/${lang}/search/?q=CANON`,
}];
// {
//   img: '/static/img/landing-home/levis-m.jpg',
//   brandImg: '/static/img/landing-home/levis.jpg',
//   title: 'Levis',
//   links: `/${lang}/srp?search=Levis&isListed=false`,
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
  Mobiles: `/${lang}/${lang === 'en' ? 'mobiles' : 'الهواتف-النقالة'}/clp`,
  Clothing: `/${lang}/search?q=Clothing?isListed=false`,
  'Clothing Accessories': `/${lang}/search?q=Clothing&isListed=false`,
  Laptops: `/${lang}/${lang === 'en' ? 'laptops' : 'أجهزة-الكمبيوتر-المحمولة'}/clp`,
  Memory: `/${lang}/${lang === 'en' ? 'storage devices' : 'أجهزة التخزين'}/clp`,
  Cameras: `/${lang}/${lang === 'en' ? 'camera' : 'الة-تصوير'}/clp`,
  Televisions: `/${lang}/${lang === 'en' ? 'televisions' : 'التلفزيونات'}/clp`,
  'Mobile Accessories': `/${lang}/${lang === 'en' ? 'mobile-accessories' : 'ملحقات-الهاتف-المحمول'}/clp`,
  Tablets: `/${lang}/${lang === 'en' ? 'Tablet & iPads' : 'اجهزة تابلت وايباد'}/clp`,
  'Kitchen Appliances': `/${lang}/${lang === 'en' ? 'kitchen-appliances' : 'أدوات-المطبخ'}/clp`,
  'Home Entertainment': `/${lang}/${lang === 'en' ? 'Home Entertainment' : 'أجهزة ترفيهية'}/clp`,
  'Computer Peripherals': `/${lang}/${lang === 'en' ? 'Computer Peripherals' : 'ملحقات الكمبيوتر'}/clp`,
  Printers: `/${lang}/${lang === 'en' ? 'Printers' : 'طابعات'}/clp`,
  'Home Appliances': `/${lang}/${lang === 'en' ? 'Home Appliances' : 'أجهزة المنزل'}/clp`,
  Routers: `/${lang}/${lang === 'en' ? 'Routers' : 'راوترات'}/clp`,
  'Womens Clothing': `/${lang}/${lang === 'en' ? 'Women\'s Clothing' : 'ملابس نسائية'}/clp`,
  'Mens Clothing': `/${lang}/${lang === 'en' ? 'Men\'s Clothing' : 'ملابس رجالية'}/clp`,
  'Fashion Accessories': `/${lang}/srp/${lang === 'en' ? 'fashion-accessories' : 'الإكسسوارات'}?categoryTree=true&isListed=false&sid=892,923`,
  Watches: `/${lang}/srp/watches?categoryTree=true&isListed=false&sid=892,2446`,
  Speakers: `/${lang}/search?q=Speakers&&isListed=false`,
  'Microwave Ovens': `/${lang}/search?q=Microwave%20Ovens&&isListed=false`,
  'Smart Watch': `/${lang}/${lang === 'en' ? 'Smart Watch' : 'ساعات ذكية'}/clp`,
  "Kid's Fashion": `/${lang}/srp?search=Kid%27s%20Fashion&isListed=false`,
  Footwear: `/${lang}/${lang === 'en' ? 'Footwear' : 'أحذية'}/clp`,
  "Men's Footwear": `/${lang}/srp/${lang === 'en' ? 'footwear' : 'حذاء'}?categoryTree=true&isListed=false&sid=892,907`,
  'Women Footwear': `/${lang}/srp/${lang === 'en' ? 'footwear' : 'حذاء'}?categoryTree=true&isListed=false&sid=892,921`,
  Bags: `/${lang}/search?q=BAGS&isListed=false`,
  Eyewear: `/${lang}/search?q=Eyewear&&isListed=false`,
  Jewellery: `/${lang}/${lang === 'en' ? 'Jewellery' : 'مجوهرات'}/clp`,
  Watches: `/${lang}/${lang === 'en' ? 'Watches' : 'ساعات اليد'}/clp`,
  Sunglasses: `/${lang}/${lang === 'en' ? 'Sunglasses' : 'نظارات شمسية'}/clp`,
  Toys: `/${lang}/${lang === 'en' ? 'Toys' : 'ألعاب'}/clp`,
  'Sports & Outdoors': `/${lang}/${lang === 'en' ? 'Sports & Outdoor' : 'الرياضات والخارج'}/clp`,
  'Exercise & Fitness': `/${lang}/${lang === 'en' ? 'Exercise & Fitness' : 'تدريبات ولياقة'}/clp`,
  'Health & Beauty': `/${lang}/${lang === 'en' ? 'Health & Beauty' : 'الصحة والجمال'}/clp`,
  'Cushions & Covers': `/${lang}/${lang === 'en' ? 'Cushions & Covers' : 'اغطية وسادات'}/clp`,
  'Door Mats': `/${lang}/${lang === 'en' ? 'Door Mats' : 'دواسَّات للباب'}/clp`,
  'Car Freshener': `/${lang}/${lang === 'en' ? 'Car Freshener' : 'معطرات جو'}/clp`,
  'Photo Frames': `/${lang}/${lang === 'en' ? 'Photo Frames' : 'اغطية وسادات'}/clp`,
  GUESS: `/${lang}/search?q=GUESS&isListed=false`,
  FENDI: `/${lang}/search?q=FENDI&isListed=false`,
  'MORPHY RICHARDS': `/${lang}/search?q=MORPHY%20RICHARDS%20&disableSpellCheck=true&&isListed=false`,
  SHIRTS: `/${lang}/search?q=SHIRTS&&isListed=false`,
  Perfumes: `/${lang}/search?q=perfumes&isListed=false`,
  Shoes: `/${lang}/search?q=Shoes&&isListed=false`,
  Lights: `/${lang}/search?q=Sports%20Essentials`,
  lamps: `/${lang}/search?q=Health%20Beauty`,
  bedding: `/${lang}/search?q=baby%20care`,
  furniture: `/${lang}/search?q=Home%20Furnishing`,
  'HOME DECOR': `/${lang}/search?q=HOME%20DECOR&isListed=false`,
  LAPTOPS: `/${lang}/srp/${lang === 'en' ? 'laptops' : 'أجهزة-الكمبيوتر-المحمولة'}?categoryTree=true&isListed=false&sid=848,2352`,
  'MENS CLOTHING': `/${lang}/srp/${lang === 'en' ? 'clothing' : 'ملابس'}?categoryTree=true&isListed=false&sid=892,899`,
  'MOBILE ACCESSORIES': `/${lang}/srp/${lang === 'en' ? 'mobile-accessories' : 'ملحقات-الهاتف-المحمول'}?categoryTree=true&isListed=false&sid=848,850`,
  'PERFUMES FOR WOMEN': `/${lang}/search?q=perfumes&isListed=false`,
  'Go Smart': `/${lang}/search?q=go%20smart`,
  Headphones: `/${lang}/search?q=yison`,
  BASUES: `/${lang}/search?q=Baseus`,
  CANON: `/${lang}/search/?q=Canon`,
  LDNIO: `/${lang}/search/?q=ldnio`,
  Ella: `/${lang}/search?q=Ella`,
  Guess_new: `/${lang}/search?q=Guess%20sunglasses `,
  Armani: `/${lang}/search/sunglasses/?q=Emporio%20Armani sunglasses`,
  Summer: `/${lang}/search?q=Sunglasses`,
  Collections: `/${lang}/search?q=Designer%20Collections`,
  Philips: `/${lang}/srp/${lang === 'en' ? 'Philips' : 'فيليبس'}/search/?q=kitchen-appliances%20Philips`,
  Sunglasses_raybon: `/${lang}/srp/${lang === 'en' ? 'Sunglasses' : 'راي بان'}/search?q=rayban`,
  Apple: `/${lang}/srp/${lang === 'en' ? 'Apple' : 'ابل'}/search?q=Apple`,
  Adidas: `/${lang}/srp/${lang === 'en' ? 'Adidas' : 'أديداس'}/search/?q=Adidas`,
  Agatha: `/${lang}/srp/${lang === 'en' ? 'Agatha' : 'أجاثا'}/search/?q=Agatha`,
  'Michael Kors': `/${lang}/srp/${lang === 'en' ? 'Michael Kors' : 'مايكل كورس'}/search/?q=Michael%20Kors`,
  Samsung: `/${lang}/srp/${lang === 'en' ? 'Samsung' : 'سامسونج'}/search?q=Samsung%20Galaxy%20Note`,
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
          <span className={`title ${styles['fs-20']}`}>{lang === 'en' ? 'ELECTRONICS' : 'الكترونيات‎'}</span>
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
                <div className="item" key={i}>
                  <a href={b_d_b[i.key]}>
                    <img src={i.img} alt={i.title} />
                  </a>
                  <span className={`${styles['fs-10']} ${styles['pt-10']} ${styles.flex} ${styles['justify-center']} slider-elips ${styles['lne-ht1_2']}`}>{i.title}</span>
                </div>
              </div>
              ))}
          </Slider>
          </div>
        </div>
        <div className="h-a-l">
          <span className={`title ${styles['fs-20']}`}> {lang === 'en' ? 'FASHION & LIFESTYLE' : 'أزياء و لايف ستايل'}</span>
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
                  <div className="item" key={i}>
                    <a href={b_d_b[i.key]}>
                      <img src={i.img} />
                    </a>
                    <span className={`${styles['fs-10']} ${styles['pt-10']} ${styles['justify-center']} slider-elips ${styles['lne-ht1_2']}`}>{i.title}</span>
                  </div>
                </div>
            ))}
          </Slider>
          </div>
        </div>
      </div>
      <div className="display-t-i-f">
        <div className={`${styles['fs-20']} title`}>{lang === 'en' ? 'FASHION PICKS' : 'أفضل الأزياء'}</div>
        <div className="d1">
          <div>
            {/* <span className={styles['fs-16']}><span className="lite"> {lang === 'en' ? 'Kids Fashion' : 'ملابس أطفال\أطفال'}</span></span> */}
            <a href={b_d_b.Ella}>
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
            <a href={b_d_b.Guess_new}>
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
            <a href={b_d_b['Armani']}>
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
            <a href={b_d_b.Summer}>
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
            <a href={b_d_b.Collections}>
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
          <div className={`${styles['thick-gry-clr']}`}>
            <span><a href={`/${lang}/${lang === 'en' ? 'Men\'s Clothing' : 'ملابس رجالية'}/clp`}>{lang === 'en' ? 'Men\'s Clothing' : 'ملابس رجالية'}</a></span> &nbsp; | &nbsp;
            <span><a href={`/${lang}/${lang === 'en' ? 'Women\'s Clothing' : 'ملابس نسائية\نسائي'}/clp`}>{lang === 'en' ? 'Women\'s Clothing' : 'ملابس نسائية\نسائي'}</a></span> &nbsp; | &nbsp;
            <span><a href={`/${lang}/${lang === 'en' ? 'Kids Fashion' : 'ملابس أطفال\أطفال'}/clp`}>{lang === 'en' ? 'Kids Fashion' : 'ملابس أطفال\أطفال'}</a></span> &nbsp; | &nbsp; 
            <span><a href={`/${lang}/${lang === 'en' ? 'Footwear' : 'أحذية'}/clp`}>{lang === 'en' ? 'Footwear' : 'أحذية'}</a></span> &nbsp; | &nbsp; 
            <span><a href={`/${lang}/${lang === 'en' ? 'Jewellery' : 'مجوهرات'}/clp`}>{lang === 'en' ? 'Jewellery' : 'مجوهرات'}</a></span> &nbsp; | &nbsp; 
            <span><a href={`/${lang}/${lang === 'en' ? 'Eyewear' : 'نظارات'}/clp`}>{lang === 'en' ? 'Eyewear' : 'نظارات'}</a></span>
          </div>
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
        <div className={`${styles['fs-20']} title`}> {lang === 'en' ? 'Lifestyle Picks' : 'أفضل مختارات اللايف ستايل'}</div>
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
          <div className={`${styles['thick-gry-clr']}`}>
            <span><a href={`/${lang}/${lang === 'en' ? 'Bedsheets' : 'غطاء\شرشف السرير'}/clp`}>{lang === 'en' ? 'Bedsheets' : 'غطاء\شرشف السرير'}</a></span> &nbsp; | &nbsp;
            <span><a href={`/${lang}/${lang === 'en' ? 'Furniture' : 'الأثاث'}/clp`}>{lang === 'en' ? 'Furniture' : 'الأثاث'}</a></span> &nbsp; | &nbsp;
            <span><a href={`/${lang}/${lang === 'en' ? 'Cushions' : 'وسائد'}/clp`}>{lang === 'en' ? 'Cushions' : 'وسائد'}</a></span> &nbsp; | &nbsp; 
            <span><a href={`/${lang}/${lang === 'en' ? 'Wall Decor' : '  جدار ديكورت'}/clp`}>{lang === 'en' ? 'Wall Decor' : '  جدار ديكورت'}</a></span> &nbsp; | &nbsp; 
            <span><a href={`/${lang}/${lang === 'en' ? 'Lights' : 'الأنوار'}/clp`}>{lang === 'en' ? 'Lights' : 'الأنوار'}</a></span> &nbsp; | &nbsp; 
            <span><a href={`/${lang}/${lang === 'en' ? 'Living Room Furniture' : 'غرفة المعيشة الأثاث'}/clp`}>{lang === 'en' ? 'Living Room Furniture' : 'غرفة المعيشة الأثاث'}</a></span> &nbsp; | &nbsp; 
            <span><a href={`/${lang}/${lang === 'en' ? 'Photo Frames' : 'إطارات صور'}/clp`}>{lang === 'en' ? 'Photo Frames' : 'إطارات صور'}</a></span>
          </div>
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
        <div className={`${styles['fs-20']} title`}>{lang === 'en' ? 'TOP IN ELECTRONICS' : 'أفضل الإلكترونيات'}</div>
        {/* <div className={`${styles['']}`}>
          <span>See more</span><SVGComponent clsName={`${styles['arrow']}`} src="icons/common-icon/arrow" />
        </div> */}
        <div>
          <div className="d1">
            <div>
              {/* <span className={styles['fs-16']}><span className="lite">{lang === 'en' ? 'Laptops' : 'اللاب توبات'} </span></span> */}
              <a href={b_d_b['Go Smart']}>
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
              <a href={b_d_b['CANON']}>
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
              <a href={b_d_b['LDNIO']}>
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
              <a href={b_d_b['BASUES']}>
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
          <div className={`${styles['thick-gry-clr']}`}>
            <span><a href={`/${lang}/${lang === 'en' ? 'Mobiles' : 'الجوالات'}/clp`}>{lang === 'en' ? 'Mobiles' : 'الجوالات'}</a></span> &nbsp; | &nbsp;
            <span><a href={`/${lang}/${lang === 'en' ? 'Laptops' : 'اللاب توبات'}/clp`}>{lang === 'en' ? 'Laptops' : 'اللاب توبات'}</a></span> &nbsp; | &nbsp;
            <span><a href={`/${lang}/${lang === 'en' ? 'Speakers' : 'مكبر الصوت'}/clp`}>{lang === 'en' ? 'Speakers' : 'مكبر الصوت'}</a></span> &nbsp; | &nbsp; 
            <span><a href={`/${lang}/${lang === 'en' ? 'Cameras' : 'الكاميرات'}/clp`}>{lang === 'en' ? 'Cameras' : 'الكاميرات'}</a></span> &nbsp; | &nbsp; 
            <span><a href={`/${lang}/${lang === 'en' ? 'Microwave Ovens' : 'ميكرويفات '}/clp`}>{lang === 'en' ? 'Microwave Ovens' : 'ميكرويفات '}</a></span> &nbsp; | &nbsp; 
            <span><a href={`/${lang}/${lang === 'en' ? 'Smartwatches' : 'ساعات يد ذكية'}/clp`}>{lang === 'en' ? 'Smartwatches' : 'ساعات يد ذكية'}</a></span>
          </div>
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
      <Row className={`${styles['m-15']} ${styles['mt-20']} ${styles['mb-40']} brand-details-inn`}>
        <h4 className={`${styles['fontW600']} ${styles['ml-10']} ${styles['mb-20']} ${styles['text-uppercase']}`}><span className={`populat-cat-title ${styles['bdr-btm-black-color']}`}>Brands </span>  you love</h4>
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
