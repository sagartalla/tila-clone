let sliderTBS, sliderTIE, sliderHAL, sliderDODAY, sliderBS, sliderRV;

// const tie = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const tbs = [{
  img: `/static/img/landing-home/${lang === 'en' ? 'home-decor' : 'home-decor-ar'}.jpg`,
  title: 'HOME DECOR'
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'laptops' : 'laptops-ar'}.jpg`,
  title: 'LAPTOPS'
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'mens-clothing' : 'mens-clothing-ar'}.jpg`,
  title: 'MENS CLOTHING'
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'mobile-accessories' : 'mobile-accessories-ar'}.jpg`,
  title: 'MOBILE ACCESSORIES'
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'perfumes-for-women' : 'perfumes-for-women-ar'}.jpg`,
  title: 'PERFUMES FOR WOMEN'
}, {
  img: `/static/img/landing-home/${lang === 'en' ? 'watches' : 'watches-ar'}.jpg`,
  title: 'WATCHES'
}];

const tie = [{
  img: '/static/img/landing-home/Mobiles.png',
  title: 'Mobiles'
}, {
  img: '/static/img/landing-home/Laptops.png',
  title: 'Laptops'
}, {
  img: '/static/img/landing-home/storage-devices.png',
  title: 'Storage Devices'
}, {
  img: '/static/img/landing-home/cameras.png',
  title: 'Cameras'
}, {
  img: '/static/img/landing-home/television.png',
  title: 'Televisions'
}, {
  img: '/static/img/landing-home/home-appliances.png',
  title: 'Home Appliances'
}, {
  img: '/static/img/landing-home/storage-devices.png',
  title: 'Storage Devices'
}];

const hal = [{
  img: '/static/img/landing-home/womens-clothing.png',
  title: 'Womens Clothing'
}, {
  img: '/static/img/landing-home/mens-clothing.png',
  title: 'Mens Clothing'
}, {
  img: '/static/img/landing-home/jewellery.png',
  title: 'Jewellery'
}, {
  img: '/static/img/landing-home/fashion-acessories.png',
  title: 'Fashion Accessories'
}, {
  img: '/static/img/landing-home/watches.png',
  title: 'Watches'
}, {
  img: '/static/img/landing-home/perfumes.png',
  title: 'Perfumes'
}, {
  img: '/static/img/landing-home/jewellery.png',
  title: 'Jewellery'
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
  link: '/en/search?q=footwear&isListed=true',
  title: 'Shoes'
}, {
  img: '/static/img/landing-home/ls2.jpg',
  link: '/en/search?q=LS2&isListed=true',
  title: 'LS2'
}, {
  img: '/static/img/landing-home/furniture.jpg',
  link: '/en/search?q=Furniture&isListed=true',
  title: 'Furniture'
}];

const b_y_l = [{
  img: '/static/img/landing-home/levis-m.jpg',
  brandImg: '/static/img/landing-home/levis.jpg',
  title: 'Levis',
  links: '/en/search?q=Levis&isListed=true'
}, {
  img: '/static/img/landing-home/guess-m.jpg',
  brandImg: '/static/img/landing-home/guess.jpg',
  title: 'Guess',
  links: '/en/search?q=Guess&isListed=true'
}, {
  img: '/static/img/landing-home/max-m.jpg',
  brandImg: '/static/img/landing-home/max.jpg',
  title: 'Max',
  links: '/en/search?q=Max&isListed=true'
}, {
  img: '/static/img/landing-home/gucci-m.jpg',
  brandImg: '/static/img/landing-home/gucci.jpg',
  title: 'Gucci',
  links: '/en/search?q=Gucci&isListed=true'
}, {
  img: '/static/img/landing-home/levis-m.jpg',
  brandImg: '/static/img/landing-home/levis.jpg',
  title: 'Levis',
  links: '/en/search?q=Levis&isListed=true'
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
  Mobiles: '/en/srp/mobiles?categoryTree=true&isListed=true&sid=848,849',
  Clothing: '/en/search?q=Clothing&isListed=true',
  'Clothing Accessories': '/en/search?q=Clothing&isListed=true',
  Laptops: '/en/srp/laptops?categoryTree=true&isListed=true&sid=848,864',
  'Storage Devices': '/en/search?q=Storage&&isListed=true',
  Cameras: '/en/srp/camera?categoryTree=true&isListed=true&sid=848,882',
  Televisions: '/en/srp/televisions?categoryTree=true&isListed=true&sid=848,878',
  'Home Appliances': '/en/srp/home-applaince?categoryTree=true&isListed=true&sid=932,935',
  'Womens Clothing': '/en/srp/clothing?categoryTree=true&isListed=true&sid=892,910',
  'Mens Clothing': '/en/srp/clothing?categoryTree=true&isListed=true&sid=892,899',
  'Fashion Accessories': '/en/srp/fashion-accessories?categoryTree=true&isListed=true&sid=892,923',
  Watches: '/en/srp/watch?categoryTree=true&isListed=true&sid=892,929',
  'Kitchen Appliances': '/en/srp/kitchen-appliances?categoryTree=true&isListed=true&sid=932,945',
  Speakers: '/en/search?q=Speakers&&isListed=true',
  'Microwave Ovens': '/en/search?q=Microwave%20Ovens&&isListed=true',
  'Smart Watch': '/en/srp/smart-watches?categoryTree=true&isListed=true&sid=848,860,861',
  'Mobile Accessories': '/en/srp/mobile-accessories?categoryTree=true&isListed=true&sid=848,850',
  "Kid's Fashion": '/en/srp/kid%27s?categoryTree=true&isListed=true&sid=892,893',
  Footwear: '/en/search?q=Footwear&&isListed=true',
  "Men's Footwear": '/en/srp/footwear?categoryTree=true&isListed=true&sid=892,907',
  'Women Footwear': '/en/srp/footwear?categoryTree=true&isListed=true&sid=892,921',
  Bags: '/en/srp/backpack?categoryTree=true&isListed=true&sid=892,926',
  Eyewear: '/en/search?q=Eyewear&&isListed=true',
  Jewellery: '/en/search?q=Jewellery&&isListed=true',
  GUESS: '/en//search/womens-clothing-1056/?q=guess&isListed=true',
  FENDI: 'https://storefront-stage.tila.com/en/search/watches-1128/?q=FENDI&isListed=true',
  'MORPHY RICHARDS': '/en/search?q=MORPHY%20RICHARDS%20&disableSpellCheck=true&isListed=true',
  SHIRTS: '/en/search?q=SHIRTS&isListed=true',
  Perfumes: '/en/srp/fragrance?categoryTree=true&isListed=true&sid=932,958,964',
  Shoes: '/en/search?q=Shoes&&isListed=true',
  Lights: '/en/srp/light?categoryTree=true&isListed=true&sid=932,937,940',
  lamps: '/en/srp/lamp?categoryTree=true&isListed=true&sid=932,937,939',
  bedding: '/en/srp/bedding-set?categoryTree=true&isListed=true&sid=932,941,942',
  furniture: '/en/srp/home-furnishing?categoryTree=true&isListed=true&sid=932,941',
  'HOME DECOR': '/en/search?q=HOME%20DECOR&isListed=true',
  LAPTOPS: '/en/srp/laptops?categoryTree=true&isListed=true&sid=848,864',
  'MENS CLOTHING': '/en/srp/clothing?categoryTree=true&isListed=true&sid=892,899',
  'MOBILE ACCESSORIES': '/en/srp/mobile-accessories?categoryTree=true&isListed=true&sid=848,850',
  'PERFUMES FOR WOMEN': '/en/search?q=perfumes&categoryTree=true&isListed=true',
  WATCHES: '/en/srp/watch?categoryTree=true&isListed=true&sid=892,929'
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
          'TOP IN ELECTRONICS'
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
          'TOP IN FASHION | LIFESTYLE'
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
        'TOP IN FASHION'
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
              'Kids Fashion'
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
              'SHOP NOW'
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
              'Women\'s Clothing'
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
              'SHOP NOW'
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
              'Shoes'
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
              'SHOP NOW'
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
              'Watches'
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
              'SHOP NOW'
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
              'Men\'s Clothing'
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
              'SHOP NOW'
            )
          )
        )
      ),
      React.createElement(
        'div',
        { className: `${styles.breadcrums} ${styles['mt-10']} ${styles.pointer}` },
        React.createElement(
          'a',
          { href: 'https://storefront-stage.fptechscience.com/en/landing/fashion' },
          React.createElement(
            'span',
            null,
            'Men\'s Clothing| Women\'s Clothing| Kids Clothing| Footwear| Jewellery| Eyewear & More\u2026'
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
        'BEST OF LIFESTYLE'
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
              'Kids Furniture'
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
              'SHOP NOW'
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
              'Living Room Furniture'
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
              'SHOP NOW'
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
              'Lamps'
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
              'SHOP NOW'
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
              'Cushions'
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
              'SHOP NOW'
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
              'Lights'
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
              'SHOP NOW'
            )
          )
        )
      ),
      React.createElement(
        'div',
        { className: `${styles['breadcrums']} ${styles['mt-10']} ${styles['pointer']}` },
        React.createElement(
          'a',
          { href: 'https://storefront-stage.fptechscience.com/en/landing/lifestyle' },
          React.createElement(
            'span',
            null,
            'Bedsheets  |  Furniture  |  Cushions  |  Wall Decor  |  Lights  |  Living Room Furniture  |  Photo Frames  |  Rugs & Mats  & more\u2026'
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
        'TOP IN ELECTRONICS'
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
                'Laptops'
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
                'SHOP NOW'
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
                'Mobiles'
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
                'SHOP NOW'
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
                'Camera'
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
                'SHOP NOW'
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
                'Kitchen Appliances'
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
                'SHOP NOW'
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
                'Audio Devices'
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
                'SHOP NOW'
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
          { href: 'https://storefront-stage.fptechscience.com/en/landing/electronics' },
          React.createElement(
            'span',
            null,
            'Mobiles  |  Laptops  |  Speakers  |  Cameras  |  Microwave Ovens  |  Smartwatches  |  Lights & Lamps  & more\u2026'
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
          'BRANDS YOU LOVE'
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