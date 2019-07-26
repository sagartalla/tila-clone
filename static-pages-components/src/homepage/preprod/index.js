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
  img: `/static/img/landing-home/${lang === 'en' ? 'PHILIPS' : 'PHILIPS - AR'}.jpg`,
  title: 'Joyroom',
  title: `${lang === 'en' ? 'Philips' : 'فيليبس'}`,
  key: 'Philips',
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'Samsung' : 'Samsung - AR'}.jpg`,
  title: 'Ldnio',
  title: `${lang === 'en' ? 'Samsung' : 'سامسونج'}`,
  key: 'Samsung',
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'Sunglass' : 'Sunglass - AR'}.jpg`,
  title: 'Rayban',
  title: `${lang === 'en' ? 'Ray-Ban' : 'راي بان'}`,
  key: 'Sunglasses',
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
  title: `${lang === 'en' ? 'Memory' : 'أجهزة التخزين'}`,
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
  title: `${lang === 'en' ? 'Air Freshner' : 'معطرات جو'}`,
  key: 'Air Freshner',
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
  `/static/img/landing-home/${lang === 'en' ? 'Lifestyle - Banner small 01' : 'Lifestyle - Banner small 02_AR'}.jpg`,
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
  img: `/static/img/landing-home/${lang === 'en' ? 'Half Banners' : 'Half Banners-AR'}.jpg`,
  link: `/${lang}/search?q=Hauwei`,
  title: 'HAUWEI',
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'Half Banners 01' : 'Half Banners-AR01'}.jpg`,
  link: `/${lang}/search?q=Baseus`,
  title: 'BASEUS',
}];

const threeCols = [{
  img: `/static/img/landing-home/${lang === 'en' ? 'One third Banners' : 'One third Banners-AR'}.jpg`,
  link: `/${lang}/search?q=Laptop%20stand&language=en&isListed=false`,
  title: 'LAPTOP STAND',
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'One third Banners 01' : 'One third Banners-AR01'}.jpg`,
  link: `/${lang}/search?q=Smart%20Band&language=en&isListed=false`,
  title: 'SMART BAND',
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'One third Banners 02' : 'One third Banners-AR02'}.jpg`,
  link: `/${lang}/search?q=headphones&language=en&isListed=false`,
  title: 'HEADPHONE',
}];

const b_y_l = [{
  img: '/static/img/landing-home/huawei.jpg',
  title: 'huawei',
  links: `/${lang}/search?q=Joyroom&language=en&isListed=false`,
}, {
  img: '/static/img/landing-home/Ray_ban_new.jpg',
  title: 'Ray-Ban',
  links: `/${lang}/search?q=Rayban&language=en&isListed=false`,
}, {
  img: '/static/img/landing-home/Baseus.jpg',
  title: 'Baseus',
  links: `/${lang}/search?q=Baseus&language=en&isListed=false`,
}, {
  img: '/static/img/landing-home/canon.jpg',
  title: 'canon',
  links: `/${lang}/search?q=LDNIO&language=en&isListed=false`,
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
  Mobiles: `/${lang}/srp/${lang === 'en' ? 'mobiles' : 'الهواتف-النقالة'}/search?q=mobiles`,
  Clothing: `/${lang}/search?q=Clothing?isListed=false`,
  'Clothing Accessories': `/${lang}/search?q=Clothing&isListed=false`,
  Laptops: `/${lang}/srp/${lang === 'en' ? 'laptops' : 'أجهزة-الكمبيوتر-المحمولة'}/search?q=laptops`,
  Memory: `/${lang}/srp/${lang === 'en' ? 'Memory' : 'أجهزة التخزين'}/search?q=Storage Devices`,
  Cameras: `/${lang}/srp/${lang === 'en' ? 'camera' : 'الة-تصوير'}/search?q=camera`,
  Televisions: `/${lang}/srp/${lang === 'en' ? 'televisions' : 'التلفزيونات'}/search?q=Television`,
  'Mobile Accessories': `/${lang}/srp/${lang === 'en' ? 'mobile-accessories' : 'ملحقات-الهاتف-المحمول'}/search?q=mobile-accessories`,
  Tablets: `/${lang}/srp/${lang === 'en' ? 'Tablet & iPads' : 'اجهزة تابلت وايباد'}/search?q=tablets`,
  'Kitchen Appliances': `/${lang}/srp/${lang === 'en' ? 'kitchen-appliances' : 'أدوات-المطبخ'}/search?q=Kitchen Appliances`,
  'Home Entertainment': `/${lang}/srp/${lang === 'en' ? 'Home Entertainment' : 'أجهزة ترفيهية'}/search?q=home entertainment`,
  'Computer Peripherals': `/${lang}/srp/${lang === 'en' ? 'Computer Peripherals' : 'ملحقات الكمبيوتر'}/search?q=computer peripherals`,
  Printers: `/${lang}/srp/${lang === 'en' ? 'Printers' : 'طابعات'}/search?q=printers`,
  'Home Appliances': `/${lang}/srp/${lang === 'en' ? 'Home Appliances' : 'أجهزة المنزل'}/search?q=Home Appliances`,
  Routers: `/${lang}/srp/${lang === 'en' ? 'Routers' : 'راوترات'}/search?q=routers`,
  'Womens Clothing': `/${lang}/srp/${lang === 'en' ? 'Women\'s Clothing' : 'ملابس نسائية'}/search?q=Women's%20Clothing`,
  'Mens Clothing': `/${lang}/srp/${lang === 'en' ? 'Men\'s Clothing' : 'ملابس رجالية'}/search?q=Men's%20Clothing`,
  'Fashion Accessories': `/${lang}/srp/${lang === 'en' ? 'fashion-accessories' : 'الإكسسوارات'}?categoryTree=true&isListed=false&sid=892,923`,
  Watches: `/${lang}/srp/watches?categoryTree=true&isListed=false&sid=892,2446`,
  Speakers: `/${lang}/search?q=Speakers&&isListed=false`,
  'Microwave Ovens': `/${lang}/search?q=Microwave%20Ovens&&isListed=false`,
  'Smart Watch': `/${lang}/srp/${lang === 'en' ? 'Smart Watch' : 'ساعات ذكية'}/search?q=Men's%20Clothing`,
  "Kid's Fashion": `/${lang}/srp?search=Kid%27s%20Fashion&language=en&isListed=false`,
  Footwear: `/${lang}/srp/${lang === 'en' ? 'Footwear' : 'أحذية'}/search?q=Footwear`,
  "Men's Footwear": `/${lang}/srp/${lang === 'en' ? 'footwear' : 'حذاء'}?categoryTree=true&isListed=false&sid=892,907`,
  'Women Footwear': `/${lang}/srp/${lang === 'en' ? 'footwear' : 'حذاء'}?categoryTree=true&isListed=false&sid=892,921`,
  Bags: `/${lang}/search?q=BAGS&language=en&isListed=false`,
  Eyewear: `/${lang}/search?q=Eyewear&&isListed=false`,
  Jewellery: `/${lang}/srp/${lang === 'en' ? 'Jewellery' : 'مجوهرات'}/search?q=Jewellery`,
  Watches: `/${lang}/srp/${lang === 'en' ? 'Watches' : 'ساعات اليد'}/search?q=watches`,
  Sunglasses: `/${lang}/srp/${lang === 'en' ? 'Sunglasses' : 'نظارات شمسية'}/search?q=sunglasses`,
  Toys: `/${lang}/srp/${lang === 'en' ? 'Toys' : 'ألعاب'}/search?q=toys`,
  'Sports & Outdoors': `/${lang}/srp/${lang === 'en' ? 'Sports & Outdoor' : 'الرياضات والخارج'}/search?q=Sports`,
  'Exercise & Fitness': `/${lang}/srp/${lang === 'en' ? 'Exercise & Fitness' : 'تدريبات ولياقة'}/search?q=Fitness`,
  'Health & Beauty': `/${lang}/srp/${lang === 'en' ? 'Health & Beauty' : 'الصحة والجمال'}/search?q=Beauty%20&%20Health`,
  'Cushions & Covers': `/${lang}/srp/${lang === 'en' ? 'Cushions & Covers' : 'اغطية وسادات'}/search?q=Beauty%20&%20Health`,
  'Door Mats': `/${lang}/srp/${lang === 'en' ? 'Door Mats' : 'دواسَّات للباب'}/search?q=Door%20Mats`,
  'Air Freshner': `/${lang}/srp/${lang === 'en' ? 'Air Freshner' : 'معطرات جو'}/search?q=Car%20Freshener`,
  'Photo Frames': `/${lang}/srp/${lang === 'en' ? 'Photo Frames' : 'اغطية وسادات'}/search?q=Photo%20Frames`,
  GUESS: `/${lang}/search?q=GUESS&language=en&isListed=false`,
  FENDI: `/${lang}/search?q=FENDI&language=en&isListed=false`,
  'MORPHY RICHARDS': `/${lang}/search?q=MORPHY%20RICHARDS%20&disableSpellCheck=true&&isListed=false`,
  SHIRTS: `/${lang}/search?q=SHIRTS&&isListed=false`,
  Perfumes: `/${lang}/search?q=perfumes&language=en&isListed=false`,
  Shoes: `/${lang}/search?q=Shoes&&isListed=false`,
  Lights: `/${lang}/search?q=light&language=en&isListed=false`,
  lamps: `/${lang}/search?q=lamps&language=en&isListed=false`,
  bedding: `/${lang}/search?q=bedding&language=en&isListed=false`,
  furniture: `/${lang}/search?q=furniture&language=en&isListed=false`,
  'HOME DECOR': `/${lang}/search?q=HOME%20DECOR&isListed=false`,
  LAPTOPS: `/${lang}/srp/${lang === 'en' ? 'laptops' : 'أجهزة-الكمبيوتر-المحمولة'}?categoryTree=true&isListed=false&sid=848,2352`,
  'MENS CLOTHING': `/${lang}/srp/${lang === 'en' ? 'clothing' : 'ملابس'}?categoryTree=true&isListed=false&sid=892,899`,
  'MOBILE ACCESSORIES': `/${lang}/srp/${lang === 'en' ? 'mobile-accessories' : 'ملحقات-الهاتف-المحمول'}?categoryTree=true&isListed=false&sid=848,850`,
  'PERFUMES FOR WOMEN': `/${lang}/search?q=perfumes&language=en&isListed=false`,
  'Laptop stand': `/${lang}/search?q=Laptop%20stand&language=en&isListed=false`,
  Headphones: `/${lang}/search?q=headphones&language=en&isListed=false`,
  'Mobiles Cases': `/${lang}/search?q=Mobiles&language=en&isListed=false`,
  'Smart Band': `/${lang}/search?q=Smart%20Band&language=en&isListed=false`,
  'USB Hub': `/${lang}/search?q=USB%20Hub&language=en&isListed=false`,
  Ella: `/${lang}/search?q=Ella`,
  Guess_new: `/${lang}/sunglasses/?q=Guess`,
  Armani: `/${lang}/search/sunglasses/?q=Emporio%20Armani`,
  Summer: `/${lang}/search?q=Sunglasses`,
  Collections: `/${lang}/search?q=Designer%20Collections`,
  Philips: `/${lang}/srp/${lang === 'en' ? 'Philips' : 'فيليبس'}/search/home-kitchen-appliances/?q=Philips`,
  Sunglasses: `/${lang}/srp/${lang === 'en' ? 'Sunglasses' : 'راي بان'}/search?q=rayban`,
  Apple: `/${lang}/srp/${lang === 'en' ? 'Apple' : 'ابل'}/search?q=Apple`,
  Adidas: `/${lang}/srp/${lang === 'en' ? 'Adidas' : 'أديداس'}/search/?q=Adidas`,
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
          <span className={`title ${styles['fs-20']}`}>{lang === 'en' ? 'ELECTRONICS' : 'أفضل الإلكترونيات'}</span>
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
          <span className={`title ${styles['fs-20']}`}> {lang === 'en' ? 'FASHION' : 'أعلى في الموضة'} &amp; {lang === 'en' ? 'LIFESTYLE' : 'اللايف ستايل'}</span>
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
        <div className={`${styles['fs-20']} title`}>{lang === 'en' ? 'Fashion Picks' : 'أفضل الأزياء'}</div>
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
          <a href={`/${lang}/landing/fashion`}>
            <span className={`${styles['thick-gry-clr']}`}>{lang === 'en' ? 'Men\'s Clothing' : 'ملابس رجالية'} &nbsp; | &nbsp; {lang === 'en' ? 'Women\'s Clothing' : 'ملابس نسائية\نسائي'} &nbsp; | &nbsp; {lang === 'en' ? 'Kids Fashion' : 'ملابس أطفال\أطفال'} &nbsp; | &nbsp; {lang === 'en' ? 'Footwear' : 'أحذية'} &nbsp; | &nbsp; {lang === 'en' ? 'Jewellery' : 'مجوهرات'} &nbsp; | &nbsp; {lang === 'en' ? 'Eyewear' : 'نظارات'}</span>
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
          <a href={`/${lang}/landing/lifestyle`}>
            <span className={`${styles['thick-gry-clr']}`}> {lang === 'en' ? 'Bedsheets' : 'غطاء\شرشف السرير'} &nbsp; | &nbsp; {lang === 'en' ? 'Furniture' : 'الأثاث'} &nbsp;| &nbsp; {lang === 'en' ? 'Cushions' : 'وسائد'} &nbsp; | &nbsp; {lang === 'en' ? 'Wall Decor' : '  جدار ديكورت'} &nbsp; | &nbsp; {lang === 'en' ? 'Lights' : 'الأنوار'} &nbsp; | &nbsp; {lang === 'en' ? 'Living Room Furniture' : 'غرفة المعيشة الأثاث'} &nbsp; | &nbsp; {lang === 'en' ? 'Photo Frames' : 'إطارات صور'} </span>
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
        <div className={`${styles['fs-20']} title`}>{lang === 'en' ? 'TOP IN ELECTRONICS' : 'أفضل الإلكترونيات'}</div>
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
          <a href={`/${lang}/landing/electronics`}>
            <span className={`${styles['thick-gry-clr']}`}>{lang === 'en' ? 'Mobiles' : 'الجوالات'} &nbsp; | &nbsp; {lang === 'en' ? 'Laptops' : 'اللاب توبات'}  &nbsp; | &nbsp; {lang === 'en' ? 'Speakers' : 'مكبر الصوت'}  &nbsp; |  &nbsp; {lang === 'en' ? 'Cameras' : 'الكاميرات'} &nbsp; | &nbsp; {lang === 'en' ? 'Microwave Ovens' : 'ميكرويفات '} &nbsp; | &nbsp; {lang === 'en' ? 'Smartwatches' : 'ساعات يد ذكية'} </span>
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
