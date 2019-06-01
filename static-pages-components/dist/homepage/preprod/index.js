let sliderTBS, sliderTIE, sliderHAL, sliderDODAY, sliderBS, sliderRV;

// const tie = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const tbs = [{
  img: `/static/img/landing-home/${lang === 'en' ? 'home-decor' : 'home-decor-ar'}.jpg`,
  title: `${lang === 'en' ? 'HOME DECOR' : 'ديكورت البيت'}`
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'laptops' : 'laptops-ar'}.jpg`,
  title: `${lang === 'en' ? 'LAPTOPS' : 'اللاب توبات'}`
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'mens-clothing' : 'mens-clothing-ar'}.jpg`,
  title: `${lang === 'en' ? 'MENS CLOTHING' : 'ملابس رجالية'}`
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'mobile-accessories' : 'mobile-accessories-ar'}.jpg`,
  title: `${lang === 'en' ? 'MOBILE ACCESSORIES' : 'مستلزمات \إكسسورات الجوال'}`
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'perfumes-for-women' : 'perfumes-for-women-ar'}.jpg`,
  title: `${lang === 'en' ? 'PERFUMES FOR WOMEN' : 'عطور للنساء'}`
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'watches' : 'watches-ar'}.jpg`,
  title: `${lang === 'en' ? 'WATCHES' : 'ساعات اليد'}`
}];

const tie = [{
  img: '/static/img/landing-home/Mobiles.png',
  title: `${lang === 'en' ? 'Mobiles' : 'الجوالات'}`
}, {
  img: '/static/img/landing-home/Laptops.png',
  title: `${lang === 'en' ? 'Laptops' : 'اللاب توبات'}`
}, {
  img: '/static/img/landing-home/storage-devices.png',
  title: `${lang === 'en' ? 'Storage Devices' : 'أجهزة التخزين'}`
}, {
  img: '/static/img/landing-home/cameras.png',
  title: `${lang === 'en' ? 'Cameras' : 'كاميرات'}`
}, {
  img: '/static/img/landing-home/television.png',
  title: `${lang === 'en' ? 'Televisions' : 'التلفزيونات'}`
}, {
  img: '/static/img/landing-home/home-appliances.png',
  title: `${lang === 'en' ? 'Home Appliances' : 'أجهزة المنزل'}`
}, {
  img: '/static/img/landing-home/storage-devices.png',
  title: `${lang === 'en' ? 'Storage Devices' : 'أجهزة التخزين'}`
}];

const hal = [{
  img: '/static/img/landing-home/womens-clothing.png',
  title: `${lang === 'en' ? 'Women\'s Clothing' : 'ملابس نسائية\نسائي'}`
}, {
  img: '/static/img/landing-home/mens-clothing.png',
  title: `${lang === 'en' ? 'Men\'s Clothing' : 'ملابس رجالية'}`
}, {
  img: '/static/img/landing-home/jewellery.png',
  title: `${lang === 'en' ? 'Jewellery' : 'مجوهرات'}`
}, {
  img: '/static/img/landing-home/fashion-acessories.png',
  title: `${lang === 'en' ? 'Fashion Acc..' : 'أزياءمستلزمات'}`
}, {
  img: '/static/img/landing-home/watches.png',
  title: `${lang === 'en' ? 'Watches' : 'ساعات اليد'}`
}, {
  img: '/static/img/landing-home/perfumes.png',
  title: `${lang === 'en' ? 'Perfumes' : 'عطور'}`
}, {
  img: '/static/img/landing-home/jewellery.png',
  title: `${lang === 'en' ? 'Jewellery' : 'مجوهرات'}`
}];

const d_tie = ['/static/img/landing-home/d-laptops.png', '/static/img/landing-home/d-mobiles.png', '/static/img/landing-home/d-cameras.png', '/static/img/landing-home/d-kitchen.png', '/static/img/landing-home/d-audio.png'];

const d_tif = ['/static/img/landing-home/kids-fashion.png', '/static/img/landing-home/t-women-cloths.png', '/static/img/landing-home/shoes.png', '/static/img/landing-home/t-watches.png', '/static/img/landing-home/t-mens-cloths.png'];

const d_tihl = ['/static/img/landing-home/kids-furniture.png', '/static/img/landing-home/living-room-furniture.png', '/static/img/landing-home/tables.png', '/static/img/landing-home/cushions.png', '/static/img/landing-home/lights.png'];

const d_o_day = [{
  img: '/static/img/landing-home/samsung.png',
  title: 'Galaxy Note 8 Dual SIM - 64GB, 6GB RAM',
  brand: 'Samsung',
  currency: 'SAR',
  price: '1200.00',
  mrp: '2200.00'
}, {
  img: '/static/img/landing-home/casio.png',
  title: 'Edifice Pro',
  brand: 'Casio',
  currency: 'SAR',
  price: '790.00',
  mrp: '900.00'
}, {
  img: '/static/img/landing-home/sennheiser.png',
  title: 'Dual Pro 2.1 Surround',
  brand: 'Sennheiser',
  currency: 'SAR',
  price: '1000.00',
  mrp: '1600.00'
}, {
  img: '/static/img/landing-home/bean_bag.png',
  title: 'Bean Bag',
  brand: 'Omega',
  currency: 'SAR',
  price: '400.00',
  mrp: '600.00'
}, {
  img: '/static/img/landing-home/case.png',
  title: 'Case Cover',
  brand: 'Catapult',
  currency: 'SAR',
  price: '100.00',
  mrp: '150.00'
}, {
  img: '/static/img/landing-home/t_shirt.png',
  title: 'Mickey Minnie Mouse',
  brand: 'Firstcry',
  currency: 'SAR',
  price: '300.00',
  mrp: '400.00'
}, {
  img: '/static/img/landing-home/sennheiser.png',
  title: 'Dual Pro 2.1 Surround',
  brand: 'Sennheiser',
  currency: 'SAR',
  price: '1000.00',
  mrp: '1600.00'
}];

const responsive = [{
  breakpoint: 1441,
  settings: {
    slidesToShow: 5
  }
}, {
  breakpoint: 1300,
  settings: {
    slidesToShow: 4
  }
}, {
  breakpoint: 1024,
  settings: {
    slidesToShow: 3
  }
}, {
  breakpoint: 768,
  settings: {
    slidesToShow: 2
  }
}, {
  breakpoint: 480,
  settings: {
    slidesToShow: 1
  }
}];

const twoCols = [{
  img: '/static/img/landing-home/ps4.jpg',
  title: 'PS4 Pro'
}, {
  img: '/static/img/landing-home/alien.jpg',
  title: 'Alienware'
}];

const threeCols = [{
  img: '/static/img/landing-home/shoes.jpg',
  link: '/SAU/en/srp?search=footwear&isListed=false',
  title: 'Shoes'
}, {
  img: '/static/img/landing-home/ls2.jpg',
  link: '/SAU/en/srp?search=LS2&isListed=false',
  title: 'LS2'
}, {
  img: '/static/img/landing-home/furniture.jpg',
  link: '/SAU/en/srp?search=Furniture&isListed=false',
  title: 'Furniture'
}];

const b_y_l = [{
  img: '/static/img/landing-home/levis-m.jpg',
  brandImg: '/static/img/landing-home/levis.jpg',
  title: 'Levis',
  links: '/SAU/en/srp?search=Levis&isListed=false'
}, {
  img: '/static/img/landing-home/guess-m.jpg',
  brandImg: '/static/img/landing-home/guess.jpg',
  title: 'Guess',
  links: 'SAU/en/srp?search=Guess&isListed=false'
}, {
  img: '/static/img/landing-home/max-m.jpg',
  brandImg: '/static/img/landing-home/max.jpg',
  title: 'Max',
  links: 'SAU/en/srp?search=Max&isListed=false'
}, {
  img: '/static/img/landing-home/gucci-m.jpg',
  brandImg: '/static/img/landing-home/gucci.jpg',
  title: 'Gucci',
  links: '/SAU/en/srp?search=Gucci&isListed=false'
}, {
  img: '/static/img/landing-home/levis-m.jpg',
  brandImg: '/static/img/landing-home/levis.jpg',
  title: 'Levis',
  links: '/SAU/en/srp?search=Levis&isListed=false'
}];

function SamplePrevArrow(props) {
  const { onClick } = props;
  return React.createElement(
    'div',
    {
      className: 'leftArrow',
      onClick: onClick
    },
    React.createElement('img', { src: '/static/img/landing-home/c-left.svg', alt: 'left' })
  );
}

function SampleNextArrow(props) {
  const { onClick } = props;
  return React.createElement(
    'div',
    {
      className: 'rightArrow',
      onClick: onClick
    },
    React.createElement('img', { src: '/static/img/landing-home/c-right.svg', alt: 'right' })
  );
}

const b_d_b = {
  Mobiles: '/SAU/en/srp/mobiles?categoryTree=true&isListed=false&sid=848,2349',
  Clothing: '/SAU/en/srp?isListed=false&&search=Clothing',
  'Clothing Accessories': '/SAU/en/srp?search=Clothing&&isListed=false',
  Laptops: '/SAU/en/srp/laptops?categoryTree=true&isListed=false&sid=848,2352',
  'Storage Devices': '/SAU/en/srp?search=Storage&&isListed=false',
  Cameras: '/SAU/en/srp/camera?categoryTree=true&isListed=false&sid=848,882',
  Televisions: '/SAU/en/srp/televisions?categoryTree=true&isListed=false&sid=848,2351',
  'Home Appliances': '/SAU/en/srp/home-applaince?categoryTree=true&isListed=false&sid=932,935',
  "Women's Clothing": '/SAU/en/srp/clothing?categoryTree=true&isListed=false&sid=892,910',
  "Men's Clothing": '/SAU/en/srp/clothing?categoryTree=true&isListed=false&sid=892,899',
  'Fashion Acc..': '/SAU/en/srp/fashion-accessories?categoryTree=true&isListed=false&sid=892,923',
  Watches: '/SAU/en/srp/watch?categoryTree=true&isListed=false&sid=892,929',
  'Kitchen Appliances': '/SAU/en/srp/kitchen-appliances?categoryTree=true&isListed=false&sid=932,945',
  Speakers: '/SAU/en/srp?search=Speakers&&isListed=false',
  'Microwave Ovens': '/SAU/en/srp?search=Microwave%20Ovens&&isListed=false',
  'Smart Watch': '/SAU/en/srp?search=Smart%20Watches&language=en&isListed=false',
  'Mobile Accessories': '/SAU/en/srp/mobile-accessories?categoryTree=true&isListed=false&sid=848,850',
  "Kid's Fashion": '/SAU/en/srp?search=Kid%27s%20Fashion&language=en&isListed=false',
  Footwear: '/SAU/en/srp?search=Footwear&&isListed=false',
  "Men's Footwear": '/SAU/en/srp/footwear?categoryTree=true&isListed=false&sid=892,907',
  'Women Footwear': '/SAU/en/srp/footwear?categoryTree=true&isListed=false&sid=892,921',
  Bags: '/SAU/en/srp?search=BAGS&language=en&isListed=false',
  Eyewear: '/SAU/en/srp?search=Eyewear&&isListed=false',
  Jewellery: '/SAU/en/srp?search=Jewellery&&isListed=false',
  GUESS: '/SAU/en/srp?search=GUESS&language=en&isListed=false',
  FENDI: '/SAU/en/srp?search=FENDI&language=en&isListed=false',
  'MORPHY RICHARDS': '/SAU/en/srp?search=MORPHY%20RICHARDS%20&disableSpellCheck=true&&isListed=false',
  SHIRTS: '/SAU/en/srp?search=SHIRTS&&isListed=false',
  Perfumes: '/SAU/en/srp/fragrance?categoryTree=true&isListed=false&sid=932,958,964',
  Shoes: '/SAU/en/srp?search=Shoes&&isListed=false',
  Lights: '/SAU/en/srp?search=lights&language=en&isListed=false',
  lamps: '/SAU/en/srp?search=lamps&language=en&isListed=false',
  bedding: '/SAU/en/srp?search=bedding&language=en&isListed=false',
  furniture: '/SAU/en/srp?search=furniture&language=en&isListed=false',
  'HOME DECOR': '/SAU/en/srp?search=HOME%20DECOR&isListed=false',
  LAPTOPS: '/SAU/en/srp/laptops?categoryTree=true&isListed=false&sid=848,2352',
  'MENS CLOTHING': '/SAU/en/srp/clothing?categoryTree=true&isListed=false&sid=892,899',
  'MOBILE ACCESSORIES': '/SAU/en/srp/mobile-accessories?categoryTree=true&isListed=false&sid=848,850',
  'PERFUMES FOR WOMEN': '/SAU/en/srp?search=perfumes&categoryTree=true&isListed=false',
  WATCHES: '/SAU/en/srp/watch?categoryTree=true&isListed=false&sid=892,929'
};

const HomePage = () => React.createElement(
  NoSSR,
  null,
  React.createElement(
    'div',
    { className: 'home-style-main' },
    React.createElement(
      'div',
      { className: `${styles['mb-40']} top-banner-slider` },
      React.createElement(
        Slider,
        {
          dots: true,
          autoplay: true,
          asNavFor: sliderTBS,
          ref: slider => sliderTBS = slider,
          lazyLoad: false,
          className: styles['ht-100per'],
          customPaging: function (i) {
            return React.createElement(
              'span',
              { className: `${styles['fs-10']}` },
              tbs[i].title
            );
          }
        },
        tbs.map(i => React.createElement(
          'div',
          null,
          React.createElement(
            'a',
            { href: b_d_b[i.title] },
            React.createElement(
              'div',
              { className: 'item', key: i },
              React.createElement('img', { src: i.img })
            )
          )
        ))
      )
    ),
    React.createElement(
      'div',
      { className: 'ff-t-i' },
      React.createElement(
        'div',
        { className: 'e' },
        React.createElement(
          'span',
          { className: `title ${styles['fs-20']}` },
          lang === 'en' ? 'TOP IN ELECTRONICS' : 'أعلى في الالكترونيات'
        ),
        React.createElement(
          Slider,
          {
            asNavFor: sliderTIE,
            ref: slider => sliderTIE = slider,
            lazyLoad: true,
            className: styles['ht-100per'],
            slidesToShow: 6
          },
          tie.map(i => React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              { className: 'item', key: i },
              React.createElement(
                'a',
                { href: b_d_b[i.title] },
                React.createElement('img', { src: i.img, alt: i.title })
              ),
              React.createElement(
                'span',
                { className: `${styles['fs-12']} ${styles['pt-10']} ${styles['flex']} ${styles['justify-center']} ${styles['lne-ht1_2']}` },
                i.title
              )
            )
          ))
        )
      ),
      React.createElement(
        'div',
        { className: 'h-a-l' },
        React.createElement(
          'span',
          { className: `title ${styles['fs-20']}` },
          ' ',
          lang === 'en' ? 'TOP IN FASHION' : 'أعلى في الموضة',
          ' | ',
          lang === 'en' ? 'LIFESTYLE' : 'لايف ستايل'
        ),
        React.createElement(
          Slider,
          {
            asNavFor: sliderHAL,
            ref: slider => sliderHAL = slider,
            lazyLoad: true,
            className: styles['ht-100per'],
            slidesToShow: 6
          },
          hal.map(i => React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              { className: 'item', key: i },
              React.createElement(
                'a',
                { href: b_d_b[i.title] },
                React.createElement('img', { src: i.img })
              ),
              React.createElement(
                'span',
                { className: `${styles['fs-12']} ${styles['pt-10']} ${styles['flex']} ${styles['justify-center']} ${styles['lne-ht1_2']}` },
                i.title
              )
            )
          ))
        )
      )
    ),
    React.createElement(
      'div',
      { className: 'display-t-i-f' },
      React.createElement(
        'div',
        { className: `${styles['fs-20']} title` },
        lang === 'en' ? 'TOP IN FASHION' : 'أعلى في الموضة'
      ),
      React.createElement(
        'div',
        { className: 'd1' },
        React.createElement(
          'div',
          null,
          React.createElement(
            'span',
            { className: styles['fs-16'] },
            React.createElement(
              'span',
              { className: 'lite' },
              ' ',
              lang === 'en' ? 'Kids Fashion' : 'ملابس أطفال\أطفال'
            )
          ),
          React.createElement(
            'a',
            { href: b_d_b["Kid's Fashion"] },
            React.createElement(
              'div',
              { className: 'shadow' },
              React.createElement('img', { src: d_tif[0], className: 'img-responsive' })
            )
          ),
          React.createElement(
            'div',
            { className: 'btn' },
            React.createElement(
              'span',
              null,
              lang === 'en' ? 'SHOP NOW' : 'تسوق الآن'
            )
          )
        ),
        React.createElement(
          'div',
          null,
          React.createElement(
            'span',
            { className: styles['fs-16'] },
            React.createElement(
              'span',
              { className: 'lite' },
              ' ',
              lang === 'en' ? 'Women\'s Clothing' : 'ملابس نسائية\نسائي'
            )
          ),
          React.createElement(
            'a',
            { href: b_d_b['Womens Clothing'] },
            React.createElement(
              'div',
              { className: 'shadow' },
              React.createElement('img', { src: d_tif[1], className: 'img-responsive' })
            )
          ),
          React.createElement(
            'div',
            { className: 'btn' },
            React.createElement(
              'span',
              null,
              lang === 'en' ? 'SHOP NOW' : 'تسوق الآن'
            )
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'd2' },
        React.createElement(
          'div',
          null,
          React.createElement(
            'span',
            { className: styles['fs-16'] },
            React.createElement(
              'span',
              { className: 'lite' },
              lang === 'en' ? 'Shoes' : 'أحذية'
            )
          ),
          React.createElement(
            'a',
            { href: b_d_b.Shoes },
            React.createElement(
              'div',
              { className: 'shadow' },
              React.createElement('img', { src: d_tif[2], className: 'img-responsive' })
            )
          ),
          React.createElement(
            'div',
            { className: 'btn' },
            React.createElement(
              'span',
              null,
              lang === 'en' ? 'SHOP NOW' : 'تسوق الآن'
            )
          )
        ),
        React.createElement(
          'div',
          null,
          React.createElement(
            'span',
            { className: styles['fs-16'] },
            React.createElement(
              'span',
              { className: 'lite' },
              ' ',
              lang === 'en' ? 'Watches' : 'ساعات اليد'
            )
          ),
          React.createElement(
            'a',
            { href: b_d_b.Watches },
            React.createElement(
              'div',
              { className: 'shadow' },
              React.createElement('img', { src: d_tif[3], className: 'img-responsive' })
            )
          ),
          React.createElement(
            'div',
            { className: 'btn' },
            React.createElement(
              'span',
              null,
              lang === 'en' ? 'SHOP NOW' : 'تسوق الآن'
            )
          )
        )
      ),
      React.createElement(
        'div',
        { className: `d3 ${styles.right0}` },
        React.createElement(
          'div',
          null,
          React.createElement(
            'span',
            { className: styles['fs-16'] },
            React.createElement(
              'span',
              { className: 'lite' },
              ' ',
              lang === 'en' ? 'Men\'s Clothing' : 'ملابس رجالية'
            )
          ),
          React.createElement(
            'a',
            { href: b_d_b['Mens Clothing'] },
            React.createElement(
              'div',
              { className: 'shadow' },
              React.createElement('img', { src: d_tif[4], className: 'img-responsive' })
            )
          ),
          React.createElement(
            'div',
            { className: 'btn' },
            React.createElement(
              'span',
              null,
              lang === 'en' ? 'SHOP NOW' : 'تسوق الآن'
            )
          )
        )
      ),
      React.createElement(
        'div',
        { className: `${styles.breadcrums} ${styles['mt-10']} ${styles.pointer}` },
        React.createElement(
          'a',
          { href: 'https://storefront-stage.fptechscience.com/SAU/en/landing/fashion' },
          React.createElement(
            'span',
            null,
            lang === 'en' ? 'Men\'s Clothing' : 'ملابس رجالية',
            ' | ',
            lang === 'en' ? 'Women\'s Clothing' : 'ملابس نسائية\نسائي',
            ' | ',
            lang === 'en' ? 'Kids Fashion' : 'ملابس أطفال\أطفال',
            ' | ',
            lang === 'en' ? 'Footwear' : 'أحذية',
            ' | ',
            lang === 'en' ? 'Jewellery' : 'مجوهرات',
            ' | ',
            lang === 'en' ? 'Eyewear' : 'نظارات'
          )
        )
      )
    ),
    React.createElement(
      Row,
      { className: `${styles['m-15']} ${styles['mt-40']} ${styles['mb-40']} brand-details-inn` },
      threeCols.map(col => React.createElement(
        Col,
        { md: 4, xs: 4, sm: 4 },
        React.createElement(
          'a',
          { href: col.link, key: col.title },
          React.createElement('img', { src: col.img, alt: col.title, className: 'img-responsive-in' })
        )
      ))
    ),
    React.createElement(
      'div',
      { className: 'display-t-i-hl' },
      React.createElement(
        'div',
        { className: `${styles['fs-20']} title` },
        ' ',
        lang === 'en' ? 'BEST OF LIFESTYLE' : 'أفضل من لايف ستايل'
      ),
      React.createElement(
        'div',
        { className: 'd1' },
        React.createElement(
          'div',
          null,
          React.createElement(
            'span',
            { className: styles['fs-16'] },
            React.createElement(
              'span',
              { className: 'lite' },
              lang === 'en' ? 'Kids Furniture' : 'أثاث الأطفال'
            )
          ),
          React.createElement(
            'a',
            { href: b_d_b['furniture'] },
            React.createElement(
              'div',
              { className: 'shadow' },
              React.createElement('img', { src: d_tihl[0], className: 'img-responsive' })
            )
          ),
          React.createElement(
            'div',
            { className: 'btn' },
            React.createElement(
              'span',
              null,
              lang === 'en' ? 'SHOP NOW' : 'تسوق الآن'
            )
          )
        ),
        React.createElement(
          'div',
          null,
          React.createElement(
            'span',
            { className: styles['fs-16'] },
            React.createElement(
              'span',
              { className: 'lite' },
              lang === 'en' ? 'Living Room Furniture' : 'غرفة المعيشة الأثاث'
            )
          ),
          React.createElement('a', { href: b_d_b['furniture'] }),
          React.createElement(
            'div',
            { className: 'shadow' },
            React.createElement('img', { src: d_tihl[1], className: 'img-responsive' })
          ),
          React.createElement(
            'div',
            { className: 'btn' },
            React.createElement(
              'span',
              null,
              lang === 'en' ? 'SHOP NOW' : 'تسوق الآن'
            )
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'd2' },
        React.createElement(
          'div',
          null,
          React.createElement(
            'span',
            { className: styles['fs-16'] },
            React.createElement(
              'span',
              { className: 'lite' },
              lang === 'en' ? 'Lamps' : 'مصباح',
              ' '
            )
          ),
          React.createElement(
            'a',
            { href: b_d_b['lamps'] },
            React.createElement(
              'div',
              { className: 'shadow' },
              React.createElement('img', { src: d_tihl[2], className: 'img-responsive' })
            )
          ),
          React.createElement(
            'div',
            { className: 'btn' },
            React.createElement(
              'span',
              null,
              lang === 'en' ? 'SHOP NOW' : 'تسوق الآن'
            )
          )
        ),
        React.createElement(
          'div',
          null,
          React.createElement(
            'span',
            { className: styles['fs-16'] },
            React.createElement(
              'span',
              { className: 'lite' },
              lang === 'en' ? 'Cushions' : 'وسائد'
            )
          ),
          React.createElement(
            'a',
            { href: b_d_b['bedding'] },
            React.createElement(
              'div',
              { className: 'shadow' },
              React.createElement('img', { src: d_tihl[3], className: 'img-responsive' })
            )
          ),
          React.createElement(
            'div',
            { className: 'btn' },
            React.createElement(
              'span',
              null,
              lang === 'en' ? 'SHOP NOW' : 'تسوق الآن'
            )
          )
        )
      ),
      React.createElement(
        'div',
        { className: `d3 ${styles.right0}` },
        React.createElement(
          'div',
          null,
          React.createElement(
            'span',
            { className: styles['fs-16'] },
            React.createElement(
              'span',
              { className: 'lite' },
              lang === 'en' ? 'Lights' : 'الأنوار'
            )
          ),
          React.createElement(
            'a',
            { href: b_d_b['Lights'] },
            React.createElement(
              'div',
              { className: 'shadow' },
              React.createElement('img', { src: d_tihl[4], className: 'img-responsive' })
            )
          ),
          React.createElement(
            'div',
            { className: 'btn' },
            React.createElement(
              'span',
              null,
              lang === 'en' ? 'SHOP NOW' : 'تسوق الآن'
            )
          )
        )
      ),
      React.createElement(
        'div',
        { className: `${styles['breadcrums']} ${styles['mt-10']} ${styles['pointer']}` },
        React.createElement(
          'a',
          { href: 'https://storefront-stage.fptechscience.com/SAU/en/landing/lifestyle' },
          React.createElement(
            'span',
            null,
            ' ',
            lang === 'en' ? 'Bedsheets' : 'غطاء\شرشف السرير',
            ' | ',
            lang === 'en' ? 'Furniture' : 'الأثاث',
            ' | ',
            lang === 'en' ? 'Cushions' : 'وسائد',
            ' | ',
            lang === 'en' ? 'Wall Decor' : '  جدار ديكورت',
            ' | ',
            lang === 'en' ? 'Lights' : 'الأنوار',
            ' | ',
            lang === 'en' ? 'Living Room Furniture' : 'غرفة المعيشة الأثاث',
            ' | ',
            lang === 'en' ? 'Photo Frames' : 'إطارات صور',
            ' '
          )
        )
      )
    ),
    React.createElement(
      Row,
      { className: `${styles['m-15']} ${styles['mt-40']} ${styles['mb-40']} brand-details-inn` },
      twoCols.map(col => React.createElement(
        Col,
        { md: 6, xs: 6, sm: 6, key: col.title },
        React.createElement('img', { src: col.img, alt: col.title, className: 'img-responsive-in' })
      ))
    ),
    React.createElement(
      'div',
      { className: 'display-t-i-e' },
      React.createElement(
        'div',
        { className: `${styles['fs-20']} title` },
        lang === 'en' ? 'TOP IN ELECTRONICS' : 'أعلى في الالكترونيات'
      ),
      React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { className: 'd1' },
          React.createElement(
            'div',
            null,
            React.createElement(
              'span',
              { className: styles['fs-16'] },
              React.createElement(
                'span',
                { className: 'lite' },
                lang === 'en' ? 'Laptops' : 'اللاب توبات',
                ' '
              )
            ),
            React.createElement(
              'a',
              { href: b_d_b.Laptops },
              React.createElement(
                'div',
                { className: 'shadow' },
                React.createElement('img', { src: d_tie[0], className: 'img-responsive' })
              )
            ),
            React.createElement(
              'div',
              { className: 'btn' },
              React.createElement(
                'span',
                null,
                lang === 'en' ? 'SHOP NOW' : 'تسوق الآن'
              )
            )
          ),
          React.createElement(
            'div',
            null,
            React.createElement(
              'span',
              { className: styles['fs-16'] },
              React.createElement(
                'span',
                { className: 'lite' },
                lang === 'en' ? 'Mobiles' : 'الجوالات'
              )
            ),
            React.createElement(
              'a',
              { href: b_d_b.Mobiles },
              React.createElement(
                'div',
                { className: 'shadow' },
                React.createElement('img', { src: d_tie[1], className: 'img-responsive' })
              )
            ),
            React.createElement(
              'div',
              { className: 'btn' },
              React.createElement(
                'span',
                null,
                lang === 'en' ? 'SHOP NOW' : 'تسوق الآن'
              )
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'd2' },
          React.createElement(
            'div',
            null,
            React.createElement(
              'span',
              { className: styles['fs-16'] },
              React.createElement(
                'span',
                { className: 'lite' },
                lang === 'en' ? 'Cameras' : 'كاميرات'
              )
            ),
            React.createElement(
              'a',
              { href: b_d_b.Cameras },
              React.createElement(
                'div',
                { className: 'shadow' },
                React.createElement('img', { src: d_tie[2], className: 'img-responsive' })
              )
            ),
            React.createElement(
              'div',
              { className: 'btn' },
              React.createElement(
                'span',
                null,
                lang === 'en' ? 'SHOP NOW' : 'تسوق الآن'
              )
            )
          ),
          React.createElement(
            'div',
            null,
            React.createElement(
              'span',
              { className: styles['fs-16'] },
              React.createElement(
                'span',
                { className: 'lite' },
                lang === 'en' ? 'Kitchen Appliances' : ' أجهزة المطبخ'
              )
            ),
            React.createElement(
              'a',
              { href: b_d_b['Kitchen Appliances'] },
              React.createElement(
                'div',
                { className: 'shadow' },
                React.createElement('img', { src: d_tie[3], className: 'img-responsive' })
              )
            ),
            React.createElement(
              'div',
              { className: 'btn' },
              React.createElement(
                'span',
                null,
                lang === 'en' ? 'SHOP NOW' : 'تسوق الآن'
              )
            )
          )
        ),
        React.createElement(
          'div',
          { className: `d3 ${styles.right0}` },
          React.createElement(
            'div',
            null,
            React.createElement(
              'span',
              { className: styles['fs-16'] },
              React.createElement(
                'span',
                { className: 'lite' },
                lang === 'en' ? 'Audio Devices' : 'أثاث الأطفال'
              )
            ),
            React.createElement(
              'a',
              { href: b_d_b.Speakers },
              React.createElement(
                'div',
                { className: 'shadow' },
                React.createElement('img', { src: d_tie[4], className: 'img-responsive' })
              )
            ),
            React.createElement(
              'div',
              { className: 'btn' },
              React.createElement(
                'span',
                null,
                lang === 'en' ? 'SHOP NOW' : 'تسوق الآن'
              )
            )
          )
        )
      ),
      React.createElement(
        'div',
        { className: `${styles.breadcrums} ${styles['mt-10']} ${styles.pointer}` },
        React.createElement(
          'a',
          { href: 'https://storefront-stage.fptechscience.com/SAU/en/landing/electronics' },
          React.createElement(
            'span',
            null,
            lang === 'en' ? 'Mobiles' : 'الجوالات',
            ' | ',
            lang === 'en' ? 'Laptops' : 'اللاب توبات',
            '  | ',
            lang === 'en' ? 'Speakers' : 'مكبر الصوت',
            '  |  ',
            lang === 'en' ? 'Cameras' : 'كاميرات',
            ' | ',
            lang === 'en' ? 'Microwave Ovens' : 'ميكرويفات ',
            ' | ',
            lang === 'en' ? 'Smartwatches' : 'ساعات يد ذكية',
            ' '
          )
        )
      )
    ),
    React.createElement(
      Row,
      { className: 'd_items' },
      React.createElement(
        'div',
        null,
        React.createElement(
          'span',
          { className: `title ${styles['fs-18']}` },
          lang === 'en' ? 'BRANDS YOU LOVE' : 'الماركات التي تحبها'
        )
      ),
      React.createElement(
        Slider,
        {
          asNavFor: sliderDODAY,
          ref: slider => sliderDODAY = slider,
          lazyLoad: true,
          className: styles['ht-100per'],
          slidesToShow: 4,
          nextArrow: React.createElement(SampleNextArrow, null),
          prevArrow: React.createElement(SamplePrevArrow, null)
        },
        b_y_l.map(i => React.createElement(
          Col,
          { key: i, md: 3, xs: 3, sm: 3 },
          React.createElement(
            'a',
            { href: i.links, key: i.title },
            React.createElement(
              'div',
              { className: 'image' },
              React.createElement('img', { src: i.img, alt: i.img })
            ),
            React.createElement(
              'div',
              { className: 'b_l' },
              React.createElement('img', { src: i.brandImg, width: '80', height: '30', alt: i.brandImg }),
              React.createElement(SVGComponent, { clsName: 'arrow arrow-black ', src: 'icons/common-icon/arrow' })
            )
          )
        ))
      ),
      React.createElement(
        'div',
        { className: `${styles.breadcrums} ${styles['mt-10']} ${styles.pointer}` },
        React.createElement(
          'span',
          null,
          'Zara  |  Guess  |  Max  |  Nike  |  Fossil  |  Levis  |  Wrangler  |  Shein  & more\u2026'
        )
      )
    )
  )
);