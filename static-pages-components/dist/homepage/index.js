let sliderTBS, sliderTIE, sliderHAL, sliderDODAY, sliderBS, sliderRV;

// const tie = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const tbs = [{
  img: '/static/img/landing-home/guess-banner.jpg',
  title: 'GUESS'
}, {
  img: '/static/img/landing-home/fendi.jpg',
  title: 'FENDI'
}, {
  img: '/static/img/landing-home/morphy-richards.jpg',
  title: 'MORPHY RICHARDS'
}, {
  img: '/static/img/landing-home/shirt.jpg',
  title: 'SHIRTS'
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

const d_tie = ['static/img/landing-home/d-laptops.png', 'static/img/landing-home/d-mobiles.png', 'static/img/landing-home/d-cameras.png', 'static/img/landing-home/d-kitchen.png', 'static/img/landing-home/d-audio.png'];

const d_tif = ['static/img/landing-home/kids-fashion.png', 'static/img/landing-home/t-women-cloths.png', 'static/img/landing-home/shoes.png', 'static/img/landing-home/t-watches.png', 'static/img/landing-home/t-mens-cloths.png'];

const d_tihl = ['static/img/landing-home/kids-furniture.png', 'static/img/landing-home/living-room-furniture.png', 'static/img/landing-home/tables.png', 'static/img/landing-home/cushions.png', 'static/img/landing-home/lights.png'];

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
  link: 'https://storefront-stage.fptechscience.com/srp/footwear-1101/?isListed=false&language=en&search=Shoe',
  title: 'Shoes'
}, {
  img: '/static/img/landing-home/ls2.jpg',
  link: 'https://storefront-stage.fptechscience.com/srp?disableSpellCheck=true&isListed=false&language=en&search=helmet',
  title: 'LS2'
}, {
  img: '/static/img/landing-home/furniture.jpg',
  link: 'https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=Furniture',
  title: 'Furniture'
}];

const b_y_l = [{
  img: '/static/img/landing-home/levis-m.jpg',
  brandImg: '/static/img/landing-home/levis.jpg',
  title: 'Levis'
}, {
  img: '/static/img/landing-home/guess-m.jpg',
  brandImg: '/static/img/landing-home/guess.jpg',
  title: 'Guess'
}, {
  img: '/static/img/landing-home/max-m.jpg',
  brandImg: '/static/img/landing-home/max.jpg',
  title: 'Max'
}, {
  img: '/static/img/landing-home/gucci-m.jpg',
  brandImg: '/static/img/landing-home/gucci.jpg',
  title: 'Gucci'
}, {
  img: '/static/img/landing-home/levis-m.jpg',
  brandImg: '/static/img/landing-home/levis.jpg',
  title: 'Levis'
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
  Mobiles: 'https://storefront-stage.fptechscience.com/srp?search=Mobiles&language=en&isListed=false',
  Clothing: 'https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=Clothing',
  'Clothing Accessories': 'https://storefront-stage.fptechscience.com/srp?search=Clothing&language=en&isListed=false',
  Laptops: 'https://storefront-stage.fptechscience.com/srp/laptop-1173/?search=Laptops&language=en&isListed=false',
  'Storage Devices': 'https://storefront-stage.fptechscience.com/srp?search=Storage&language=en&isListed=false',
  Cameras: 'https://storefront-stage.fptechscience.com/srp?search=Camera&language=en&isListed=false',
  Televisions: 'https://storefront-stage.fptechscience.com/srp/Televisions-878?categoryTree=true&isListed=false',
  'Home Appliances': 'https://storefront-stage.fptechscience.com/srp?search=Home%20Appliances&language=en&isListed=false',
  'Womens Clothing': 'https://storefront-stage.fptechscience.com/srp/Clothing-910?categoryTree=true&isListed=false',
  'Mens Clothing': 'https://storefront-stage.fptechscience.com/srp/Clothing-899?categoryTree=true&isListed=false',
  'Fashion Accessories': 'https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=Fashion%20Accessories',
  Watches: 'https://storefront-stage.fptechscience.com/srp/watches-1128/?isListed=false&language=en&search=Watch',
  'Kitchen Appliances': 'https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=Kitchen%20Appliances',
  Speakers: 'https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=Speaker',
  'Microwave Ovens': 'https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=Microwave%20oven',
  'Smart Watch': 'https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=Smart%20Watch',
  'Mobile Accessories': 'https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=Mobile%20Accessories\t\t\t\t\t\t\t\t\t\t\t\t\t',
  "Kid's Fashion": 'https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=Kids',
  Footwear: 'https://storefront-stage.fptechscience.com/srp/Footwear-921?categoryTree=true&isListed=false&language=en',
  "Men's Footwear": 'https://storefront-stage.fptechscience.com/srp/Footwear-921?categoryTree=true&isListed=false&language=en',
  'Women Footwear': 'https://storefront-stage.fptechscience.com/srp/Footwear-921?categoryTree=true&isListed=false&language=en',
  Bags: 'https://storefront-stage.fptechscience.com/srp/Backpack-926?categoryTree=true&isListed=false&language=en',
  Eyewear: 'https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=eyewear',
  Jewellery: 'https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=Jewellery',
  GUESS: 'https://storefront-stage.fptechscience.com/srp/womens-clothing-1056/?isListed=false&language=en&search=guess',
  FENDI: 'https://storefront-stage.fptechscience.com/srp/watches-1128/?isListed=false&language=en&search=FENDI',
  'MORPHY RICHARDS': 'https://storefront-stage.fptechscience.com/srp/home-kitchen-appliances-1010/?isListed=false&language=en&search=morphy%20richards',
  SHIRTS: 'https://storefront-stage.fptechscience.com/srp?search=shirts&language=en&isListed=false',
  Perfumes: 'https://storefront-stage.fptechscience.com/srp?disableSpellCheck=true&isListed=false&language=en&search=perfume',
  Shoes: 'https://storefront-stage.fptechscience.com/srp/footwear-1101/?isListed=false&language=en&search=Shoe',
  Lights: 'https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=Lights',
  lamps: 'https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=lamps',
  bedding: 'https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=Bedding%20Set',
  furniture: 'https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=Furniture'
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
          { className: `title ${styles['fs-18']}` },
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
                null,
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
          { className: `title ${styles['fs-18']}` },
          'TOP IN FASHION AND HOME & LIVING'
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
                null,
                i.title
              )
            )
          ))
        )
      )
    ),
    React.createElement(
      Row,
      { className: 'd_items' },
      React.createElement(
        'div',
        { className: `${styles['flex-center']} ${styles['mb-15']}` },
        React.createElement(
          'span',
          { className: `title ${styles['fs-18']}` },
          'DEALS OF THE DAY'
        ),
        React.createElement(
          'span',
          { className: `timer ${styles['flex-center']}` },
          React.createElement(SVGComponent, { clsName: 'time', src: 'icons/common-icon/timer' }),
          React.createElement(
            'span',
            { className: `${styles['fs-12']}` },
            React.createElement(
              'span',
              { className: styles.fontW600 },
              'ENDS IN:'
            ),
            '  17 : 16 : 50'
          )
        )
      ),
      React.createElement(
        Slider,
        {
          asNavFor: sliderDODAY,
          ref: slider => sliderDODAY = slider,
          lazyLoad: true,
          centerMode: true,
          className: styles['ht-100per'],
          slidesToShow: 6,
          responsive: responsive,
          nextArrow: React.createElement(SampleNextArrow, null),
          prevArrow: React.createElement(SamplePrevArrow, null)
        },
        d_o_day.map(i => React.createElement(
          'div',
          { className: styles.relative },
          React.createElement(
            'div',
            { className: 'd_item', key: i },
            React.createElement(
              'div',
              { className: 'image' },
              React.createElement('img', { src: i.img, alt: i.title })
            ),
            React.createElement(
              'div',
              { className: 't_n_p' },
              React.createElement(
                'div',
                null,
                React.createElement(
                  'span',
                  { className: styles.fontW600 },
                  i.brand
                ),
                ' ',
                '-',
                ' ',
                React.createElement(
                  'span',
                  null,
                  i.title
                )
              ),
              React.createElement(
                'div',
                null,
                React.createElement(
                  'span',
                  { className: `${styles.fontW600} ${styles['fs-12']}` },
                  i.currency
                ),
                '\xA0',
                React.createElement(
                  'span',
                  { className: `${styles.fontW600} ${styles['fs-18']}` },
                  i.price
                ),
                '\xA0\xA0',
                React.createElement(
                  'span',
                  { className: styles['light-gray'] },
                  React.createElement(
                    's',
                    null,
                    i.mrp
                  )
                )
              )
            ),
            React.createElement(
              'div',
              { className: 'b_n_c' },
              React.createElement(
                'button',
                { className: `${styles['fp-btn']} ${styles['fp-btn-primary']} buy_now` },
                'BUY NOW'
              ),
              React.createElement(
                'button',
                { className: `${styles['fp-btn']} add_to_cart` },
                'ADD TO CART'
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'discount' },
            Math.round((i.price - i.mrp) / i.mrp * 100),
            '%'
          )
        ))
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
            { className: styles['fs-20'] },
            React.createElement(
              'span',
              { className: 'lite' },
              'Kids Fashion'
            ),
            React.createElement(
              'span',
              { className: styles.bold },
              'UP TO 50% OFF'
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
            ),
            React.createElement(SVGComponent, { clsName: 'arrow', src: 'icons/common-icon/arrow' })
          )
        ),
        React.createElement(
          'div',
          null,
          React.createElement(
            'span',
            { className: styles['fs-20'] },
            React.createElement(
              'span',
              { className: 'lite' },
              'Women Clothing'
            ),
            React.createElement(
              'span',
              { className: styles.bold },
              'UP TO 50% OFF'
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
            ),
            React.createElement(SVGComponent, { clsName: 'arrow', src: 'icons/common-icon/arrow' })
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
            { className: styles['fs-20'] },
            React.createElement(
              'span',
              { className: 'lite' },
              'Shoes'
            ),
            React.createElement(
              'span',
              { className: styles.bold },
              'UP TO 50% OFF'
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
            ),
            React.createElement(SVGComponent, { clsName: 'arrow', src: 'icons/common-icon/arrow' })
          )
        ),
        React.createElement(
          'div',
          null,
          React.createElement(
            'span',
            { className: styles['fs-20'] },
            React.createElement(
              'span',
              { className: 'lite' },
              'Watches'
            ),
            React.createElement(
              'span',
              { className: styles.bold },
              'UP TO 50% OFF'
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
            ),
            React.createElement(SVGComponent, { clsName: 'arrow', src: 'icons/common-icon/arrow' })
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'd3' },
        React.createElement(
          'div',
          null,
          React.createElement(
            'span',
            { className: styles['fs-20'] },
            React.createElement(
              'span',
              { className: 'lite' },
              'Men Clothing'
            ),
            React.createElement(
              'span',
              { className: styles.bold },
              'UP TO 50% OFF'
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
            ),
            React.createElement(SVGComponent, { clsName: 'arrow', src: 'icons/common-icon/arrow' })
          )
        )
      ),
      React.createElement(
        'div',
        { className: `${styles.breadcrums} ${styles['mt-10']} ${styles.pointer}` },
        React.createElement(
          'a',
          { href: 'https://storefront-stage.fptechscience.com/landing/fashion' },
          React.createElement(
            'span',
            null,
            'Men\'s Clothing| Women\'s Clothing| Kid\'s Clothing| Footwear| Jewellery| Eyewear & More\u2026'
          )
        )
      )
    ),
    React.createElement(
      Row,
      { className: `${styles['m-15']} ${styles['mt-40']} ${styles['mb-40']}` },
      threeCols.map(col => React.createElement(
        Col,
        { md: 4, xs: 4, sm: 4 },
        React.createElement(
          'a',
          { href: col.link },
          React.createElement('img', { src: col.img, alt: col.title })
        )
      ))
    ),
    React.createElement(
      'div',
      { className: 'display-t-i-hl' },
      React.createElement(
        'div',
        { className: `${styles['fs-20']} title` },
        'BEST OF HOME & LIVING'
      ),
      React.createElement(
        'div',
        { className: 'd1' },
        React.createElement(
          'div',
          null,
          React.createElement(
            'span',
            { className: styles['fs-20'] },
            React.createElement(
              'span',
              { className: 'lite' },
              'Kids Furniture'
            ),
            React.createElement(
              'span',
              { className: styles.bold },
              'UP TO 50% OFF'
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
            ),
            React.createElement(SVGComponent, { clsName: 'arrow', src: 'icons/common-icon/arrow' })
          )
        ),
        React.createElement(
          'div',
          null,
          React.createElement(
            'span',
            { className: styles['fs-20'] },
            React.createElement(
              'span',
              { className: 'lite' },
              'Living Room Furniture'
            ),
            React.createElement(
              'span',
              { className: styles.bold },
              'FROM SAR 200'
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
            ),
            React.createElement(SVGComponent, { clsName: 'arrow', src: 'icons/common-icon/arrow' })
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
            { className: styles['fs-20'] },
            React.createElement(
              'span',
              { className: 'lite' },
              'Lamps'
            ),
            React.createElement(
              'span',
              { className: styles.bold },
              'UP TO 50% OFF'
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
            ),
            React.createElement(SVGComponent, { clsName: 'arrow', src: 'icons/common-icon/arrow' })
          )
        ),
        React.createElement(
          'div',
          null,
          React.createElement(
            'span',
            { className: styles['fs-20'] },
            React.createElement(
              'span',
              { className: 'lite' },
              'Cushions'
            ),
            React.createElement(
              'span',
              { className: styles.bold },
              'UP TO 50% OFF'
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
            ),
            React.createElement(SVGComponent, { clsName: 'arrow', src: 'icons/common-icon/arrow' })
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'd3' },
        React.createElement(
          'div',
          null,
          React.createElement(
            'span',
            { className: styles['fs-20'] },
            React.createElement(
              'span',
              { className: 'lite' },
              'Lights'
            ),
            React.createElement(
              'span',
              { className: styles.bold },
              'FROM SAR 200'
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
            ),
            React.createElement(SVGComponent, { clsName: 'arrow', src: 'icons/common-icon/arrow' })
          )
        )
      ),
      React.createElement(
        'div',
        { className: `${styles['breadcrums']} ${styles['mt-10']} ${styles['pointer']}` },
        React.createElement(
          'a',
          { href: 'https://storefront-stage.fptechscience.com/landing/lifestyle?language=en' },
          React.createElement(
            'span',
            null,
            'Besheets  |  Furniture  |  Cushions  |  Wall Decor  |  Lights  |  Living Room Furniture  |  Photo Frames  |  Rugs & Mats  & more\u2026'
          )
        )
      )
    ),
    React.createElement(
      Row,
      { className: `${styles['m-15']} ${styles['mt-40']} ${styles['mb-40']}` },
      twoCols.map(col => React.createElement(
        Col,
        { md: 6, xs: 6, sm: 6 },
        React.createElement('img', { src: col.img, alt: col.title })
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
              { className: styles['fs-20'] },
              React.createElement(
                'span',
                { className: 'lite' },
                'Laptops'
              ),
              React.createElement(
                'span',
                { className: styles.bold },
                'UP TO 50% OFF'
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
              ),
              React.createElement(SVGComponent, { clsName: 'arrow', src: 'icons/common-icon/arrow' })
            )
          ),
          React.createElement(
            'div',
            null,
            React.createElement(
              'span',
              { className: styles['fs-20'] },
              React.createElement(
                'span',
                { className: 'lite' },
                'Mobiles'
              ),
              React.createElement(
                'span',
                { className: styles.bold },
                'UP TO 50% OFF'
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
              ),
              React.createElement(SVGComponent, { clsName: 'arrow', src: 'icons/common-icon/arrow' })
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
              { className: styles['fs-20'] },
              React.createElement(
                'span',
                { className: 'lite' },
                'Camara'
              ),
              React.createElement(
                'span',
                { className: styles.bold },
                'UP TO 50% OFF'
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
              ),
              React.createElement(SVGComponent, { clsName: 'arrow', src: 'icons/common-icon/arrow' })
            )
          ),
          React.createElement(
            'div',
            null,
            React.createElement(
              'span',
              { className: styles['fs-20'] },
              React.createElement(
                'span',
                { className: 'lite' },
                'Kitchen Appliances'
              ),
              React.createElement(
                'span',
                { className: styles.bold },
                'UP TO 50% OFF'
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
              ),
              React.createElement(SVGComponent, { clsName: 'arrow', src: 'icons/common-icon/arrow' })
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'd3' },
          React.createElement(
            'div',
            null,
            React.createElement(
              'span',
              { className: styles['fs-20'] },
              React.createElement(
                'span',
                { className: 'lite' },
                'Audio Devices'
              ),
              React.createElement(
                'span',
                { className: styles.bold },
                'UP TO 50% OFF'
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
              ),
              React.createElement(SVGComponent, { clsName: 'arrow', src: 'icons/common-icon/arrow' })
            )
          )
        )
      ),
      React.createElement(
        'div',
        { className: `${styles.breadcrums} ${styles['mt-10']} ${styles.pointer}` },
        React.createElement(
          'a',
          { href: 'https://storefront-stage.fptechscience.com/landing/electronics?language=en' },
          React.createElement(
            'span',
            null,
            'Mobiles  |  Laptops  |  Speakers  |  Cameras  |  Microwave Ovens  |  Smartwatch  |  Lights & Lamps  & more\u2026'
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
          'BEST SELLING'
        )
      ),
      React.createElement(
        Slider,
        {
          asNavFor: sliderBS,
          ref: slider => sliderBS = slider,
          lazyLoad: true,
          className: styles['ht-100per'],
          centerMode: true,
          slidesToShow: 6,
          responsive: responsive,
          nextArrow: React.createElement(SampleNextArrow, null),
          prevArrow: React.createElement(SamplePrevArrow, null)
        },
        d_o_day.map(i => React.createElement(
          'div',
          { className: styles.relative },
          React.createElement(
            'div',
            { className: 'd_item', key: i },
            React.createElement(
              'div',
              { className: 'image' },
              React.createElement('img', { src: i.img, alt: i.title })
            ),
            React.createElement(
              'div',
              { className: 't_n_p' },
              React.createElement(
                'div',
                null,
                React.createElement(
                  'span',
                  { className: styles.fontW600 },
                  i.brand
                ),
                ' ',
                '-',
                ' ',
                React.createElement(
                  'span',
                  null,
                  i.title
                )
              ),
              React.createElement(
                'div',
                null,
                React.createElement(
                  'span',
                  { className: `${styles.fontW600} ${styles['fs-12']}` },
                  i.currency
                ),
                '\xA0',
                React.createElement(
                  'span',
                  { className: `${styles.fontW600} ${styles['fs-18']}` },
                  i.price
                ),
                '\xA0\xA0',
                React.createElement(
                  'span',
                  { className: styles['light-gray'] },
                  React.createElement(
                    's',
                    null,
                    i.mrp
                  )
                )
              )
            ),
            React.createElement(
              'div',
              { className: 'b_n_c' },
              React.createElement(
                'button',
                { className: `${styles['fp-btn']} ${styles['fp-btn-primary']} buy_now` },
                'BUY NOW'
              ),
              React.createElement(
                'button',
                { className: `${styles['fp-btn']} add_to_cart` },
                'ADD TO CART'
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'sold' },
            Math.round(Math.random() * 100),
            '+ Sold'
          )
        ))
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
          'RECENTLY VIEWED'
        )
      ),
      React.createElement(
        Slider,
        {
          asNavFor: sliderRV,
          ref: slider => sliderRV = slider,
          lazyLoad: true,
          className: styles['ht-100per'],
          centerMode: true,
          slidesToShow: 6,
          responsive: responsive,
          nextArrow: React.createElement(SampleNextArrow, null),
          prevArrow: React.createElement(SamplePrevArrow, null)
        },
        d_o_day.map(i => React.createElement(
          'div',
          { className: styles.relative },
          React.createElement(
            'div',
            { className: 'd_item', key: i },
            React.createElement(
              'div',
              { className: 'image' },
              React.createElement('img', { src: i.img, alt: i.title })
            ),
            React.createElement(
              'div',
              { className: 't_n_p' },
              React.createElement(
                'div',
                null,
                React.createElement(
                  'span',
                  { className: styles.fontW600 },
                  i.brand
                ),
                ' ',
                '-',
                ' ',
                React.createElement(
                  'span',
                  null,
                  i.title
                )
              ),
              React.createElement(
                'div',
                null,
                React.createElement(
                  'span',
                  { className: `${styles.fontW600} ${styles['fs-12']}` },
                  i.currency
                ),
                '\xA0',
                React.createElement(
                  'span',
                  { className: `${styles.fontW600} ${styles['fs-18']}` },
                  i.price
                ),
                '\xA0\xA0',
                React.createElement(
                  'span',
                  { className: styles['light-gray'] },
                  React.createElement(
                    's',
                    null,
                    i.mrp
                  )
                )
              )
            ),
            React.createElement(
              'div',
              { className: 'b_n_c' },
              React.createElement(
                'button',
                { className: `${styles['fp-btn']} ${styles['fp-btn-primary']} buy_now` },
                'BUY NOW'
              ),
              React.createElement(
                'button',
                { className: `${styles['fp-btn']} add_to_cart` },
                'ADD TO CART'
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'discount' },
            Math.round((i.price - i.mrp) / i.mrp * 100),
            '%'
          )
        ))
      )
    )
  )
);