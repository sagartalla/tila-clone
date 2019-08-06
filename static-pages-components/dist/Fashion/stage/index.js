
const Fashion = () => React.createElement(
  'div',
  { className: 'fashion-main-part' },
  React.createElement(
    Grid,
    { fluid: true, className: styles['p-0'] },
    React.createElement(
      'div',
      { className: `${styles['flex']} fashion-banner-main ${styles['relative']}` },
      React.createElement(
        'a',
        { href: '/en/search?q=dress&isListed=false' },
        React.createElement('img', { src: `/static/img/landing-page-fashion/${lang === 'en' ? 'womens-clothing' : 'womens-clothing-ar'}.jpg`, className: 'img-responsive' })
      )
    )
  ),
  React.createElement(
    Grid,
    null,
    React.createElement(
      'div',
      { className: `banner-sub-slider ${styles['flex']} ${styles['pt-20']} ${styles['pb-20']}` },
      React.createElement(
        Col,
        { md: 3, className: styles['pl-0'] },
        React.createElement(
          'div',
          { className: `banner-sub-slider-inn ${styles['bg-white']} ${styles['p-10']} ${styles['flex-center']} ${styles['border-radius4']}` },
          React.createElement(
            Col,
            { md: 6, className: styles['pl-0'] },
            React.createElement(
              'div',
              { className: 'banner-sub-slider-inn-img' },
              React.createElement('img', { src: '/static/img/landing-page-fashion/fashiontop-img.jpg', className: 'img-responsive' })
            )
          ),
          React.createElement(
            Col,
            { md: 6, className: styles['p-0'] },
            React.createElement(
              'div',
              { className: `${styles['flex']} ${styles['flex-colum']}` },
              React.createElement(
                'span',
                { className: `${styles['fs-20']} ${styles['black-color']}` },
                'Men\'s Shoes'
              ),
              React.createElement(
                'span',
                { className: `${styles['fs-12']} ${styles['black-color']} ${styles.fontW300}` },
                'They lift you physically & emotionally.'
              ),
              React.createElement(
                'span',
                { className: `${styles['pt-25']} shop-now-btn` },
                React.createElement(
                  'a',
                  { className: `${styles['fs-12']} ${styles.fontW600} ${styles['border-bt-left-radius']}` },
                  'Buy NOW'
                )
              )
            )
          )
        )
      ),
      React.createElement(
        Col,
        { md: 3, className: styles['pl-0'] },
        React.createElement(
          'div',
          { className: `banner-sub-slider-inn ${styles['bg-white']} ${styles['p-10']} ${styles['flex-center']} ${styles['border-radius4']}` },
          React.createElement(
            Col,
            { md: 6, className: styles['pl-0'] },
            React.createElement(
              'div',
              { className: 'banner-sub-slider-inn-img' },
              React.createElement('img', { src: '/static/img/landing-page-fashion/fashiontop-img1.jpg', className: 'img-responsive' })
            )
          ),
          React.createElement(
            Col,
            { md: 6, className: styles['p-0'] },
            React.createElement(
              'div',
              { className: `${styles['flex']} ${styles['flex-colum']}` },
              React.createElement(
                'span',
                { className: `${styles['fs-20']} ${styles['black-color']}` },
                'Women\u2019s Dress'
              ),
              React.createElement(
                'span',
                { className: `${styles['fs-12']} ${styles['black-color']} ${styles.fontW300}` },
                'When in doubt, wear red.'
              ),
              React.createElement(
                'span',
                { className: `${styles['pt-25']} shop-now-btn` },
                React.createElement(
                  'a',
                  { className: `${styles['fs-12']} ${styles.fontW600} ${styles['border-bt-left-radius']}` },
                  'Buy NOW'
                )
              )
            )
          )
        )
      ),
      React.createElement(
        Col,
        { md: 3, className: styles['pl-0'] },
        React.createElement(
          'div',
          { className: `banner-sub-slider-inn ${styles['bg-white']} ${styles['p-10']} ${styles['flex-center']} ${styles['border-radius4']}` },
          React.createElement(
            Col,
            { md: 6, className: styles['pl-0'] },
            React.createElement(
              'div',
              { className: 'banner-sub-slider-inn-img' },
              React.createElement('img', { src: '/static/img/landing-page-fashion/fashiontop-img2.jpg', className: 'img-responsive' })
            )
          ),
          React.createElement(
            Col,
            { md: 6, className: styles['p-0'] },
            React.createElement(
              'div',
              { className: `${styles['flex']} ${styles['flex-colum']}` },
              React.createElement(
                'span',
                { className: `${styles['fs-20']} ${styles['black-color']}` },
                'Fitness & Sports'
              ),
              React.createElement(
                'span',
                { className: `${styles['fs-12']} ${styles['black-color']} ${styles.fontW300}` },
                'Take care of your body.'
              ),
              React.createElement(
                'span',
                { className: `${styles['pt-25']} shop-now-btn` },
                React.createElement(
                  'a',
                  { className: `${styles['fs-12']} ${styles.fontW600} ${styles['border-bt-left-radius']}` },
                  'Buy NOW'
                )
              )
            )
          )
        )
      ),
      React.createElement(
        Col,
        { md: 3, className: styles['pl-0'] },
        React.createElement(
          'div',
          { className: `banner-sub-slider-inn ${styles['bg-white']} ${styles['p-10']} ${styles['flex-center']} ${styles['border-radius4']}` },
          React.createElement(
            Col,
            { md: 6, className: styles['pl-0'] },
            React.createElement(
              'div',
              { className: 'banner-sub-slider-inn-img' },
              React.createElement('img', { src: '/static/img/landing-page-fashion/fashiontop-img3.jpg', className: 'img-responsive' })
            )
          ),
          React.createElement(
            Col,
            { md: 6, className: styles['p-0'] },
            React.createElement(
              'div',
              { className: `${styles['flex']} ${styles['flex-colum']}` },
              React.createElement(
                'span',
                { className: `${styles['fs-20']} ${styles['black-color']}` },
                'Upto 50% Off on Watches'
              ),
              React.createElement(
                'span',
                { className: `${styles['fs-12']} ${styles['black-color']} ${styles.fontW300}` },
                'They lift you physically & emotionally.'
              ),
              React.createElement(
                'span',
                { className: `${styles['pt-25']} shop-now-btn` },
                React.createElement(
                  'a',
                  { className: `${styles['fs-12']} ${styles.fontW600} ${styles['border-bt-left-radius']}` },
                  'Buy NOW'
                )
              )
            )
          )
        )
      )
    ),
    React.createElement(
      'div',
      { className: 'what-new-part' },
      React.createElement(
        'h3',
        { className: `${styles['flex-center']} what-title ${styles['justify-center']} ${styles['relative']} lobster-family ${styles['pt-20']} ${styles['pb-20']}` },
        React.createElement(
          'span',
          { className: `${styles['fs-36']} ${styles['lable']} ${styles['pl-10']} ${styles['pr-10']}` },
          'Whats New'
        ),
        ' ',
        React.createElement('span', { className: `${styles['absolute']} border` })
      ),
      React.createElement(
        'div',
        null,
        React.createElement(
          Col,
          { md: 6, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            Col,
            { md: 8, className: `${styles['pl-0']} ${styles['pr-10']}` },
            React.createElement('img', { src: '/static/img/landing-page-fashion/what-new.jpg', className: 'img-responsive' })
          ),
          React.createElement(
            Col,
            { md: 4, className: `${styles['pl-0']} ${styles['pr-10']}` },
            React.createElement(
              'div',
              { className: 'chinos-part' },
              React.createElement('img', { src: '/static/img/landing-page-fashion/what-new1.jpg', className: 'img-responsive' }),
              React.createElement(
                'div',
                { className: `${styles['bg-white']} chinos-part-inn` },
                React.createElement(
                  'h6',
                  { className: `${styles['m-0']} ${styles['fs-14']} ${styles['fontW600']}` },
                  'Chinos'
                ),
                React.createElement(
                  'span',
                  { className: 'disc' },
                  'Up to 50% Off'
                )
              )
            )
          )
        ),
        React.createElement(
          Col,
          { md: 6, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            Col,
            { md: 4, className: `${styles['pl-0']} ${styles['pr-10']}` },
            React.createElement(
              'div',
              { className: `new-brands ${styles['pb-10']}` },
              React.createElement('img', { src: '/static/img/landing-page-fashion/what-new2.jpg', className: 'img-responsive' }),
              React.createElement(
                'div',
                { className: `${styles['bg-white']} chinos-part-inn` },
                React.createElement(
                  'h6',
                  { className: `${styles['m-0']} ${styles['fs-14']} ${styles['fontW600']}` },
                  'Sunglasses'
                ),
                React.createElement(
                  'span',
                  { className: 'disc' },
                  'Up to 50% Off'
                )
              )
            )
          ),
          React.createElement(
            Col,
            { md: 4, className: `${styles['pl-0']} ${styles['pr-10']}` },
            React.createElement(
              'div',
              { className: `new-brands ${styles['pb-10']}` },
              React.createElement('img', { src: '/static/img/landing-page-fashion/what-new3.jpg', className: 'img-responsive' }),
              React.createElement(
                'div',
                { className: `${styles['bg-white']} chinos-part-inn` },
                React.createElement(
                  'h6',
                  { className: `${styles['m-0']} ${styles['fs-14']} ${styles['fontW600']}` },
                  'Kids Wear'
                ),
                React.createElement(
                  'span',
                  { className: 'disc' },
                  'Up to 50% Off'
                )
              )
            )
          ),
          React.createElement(
            Col,
            { md: 4, className: `${styles['pl-0']} ${styles['pr-10']}` },
            React.createElement(
              'div',
              { className: `new-brands ${styles['pb-10']}` },
              React.createElement('img', { src: '/static/img/landing-page-fashion/what-new4.jpg', className: 'img-responsive' }),
              React.createElement(
                'div',
                { className: `${styles['bg-white']} chinos-part-inn` },
                React.createElement(
                  'h6',
                  { className: `${styles['m-0']} ${styles['fs-14']} ${styles['fontW600']}` },
                  'Perfumes'
                ),
                React.createElement(
                  'span',
                  { className: 'disc' },
                  'Up to 50% Off'
                )
              )
            )
          ),
          React.createElement(
            Col,
            { md: 4, className: `${styles['pl-0']} ${styles['pr-10']}` },
            React.createElement(
              'div',
              { className: `new-brands ${styles['pb-10']}` },
              React.createElement('img', { src: '/static/img/landing-page-fashion/what-new5.jpg', className: 'img-responsive' }),
              React.createElement(
                'div',
                { className: `${styles['bg-white']} chinos-part-inn` },
                React.createElement(
                  'h6',
                  { className: `${styles['m-0']} ${styles['fs-14']} ${styles['fontW600']}` },
                  'Jewellery'
                ),
                React.createElement(
                  'span',
                  { className: 'disc' },
                  'Up to 50% Off'
                )
              )
            )
          ),
          React.createElement(
            Col,
            { md: 4, className: `${styles['pl-0']} ${styles['pr-10']}` },
            React.createElement(
              'div',
              { className: `new-brands ${styles['pb-10']}` },
              React.createElement('img', { src: '/static/img/landing-page-fashion/what-new6.jpg', className: 'img-responsive' }),
              React.createElement(
                'div',
                { className: `${styles['bg-white']} chinos-part-inn` },
                React.createElement(
                  'h6',
                  { className: `${styles['m-0']} ${styles['fs-14']} ${styles['fontW600']}` },
                  'Handbags'
                ),
                React.createElement(
                  'span',
                  { className: 'disc' },
                  'Up to 50% Off'
                )
              )
            )
          ),
          React.createElement(
            Col,
            { md: 4, className: `${styles['pl-0']} ${styles['pr-10']}` },
            React.createElement(
              'div',
              null,
              React.createElement('img', { src: '/static/img/landing-page-fashion/what-new7.jpg', className: 'img-responsive' })
            )
          )
        )
      )
    ),
    React.createElement(
      'div',
      { className: `price-point ${styles['clear-b']}` },
      React.createElement(
        'h3',
        { className: `${styles['flex-center']} what-title ${styles['justify-center']} ${styles['relative']} lobster-family ${styles['pt-40']} ${styles['pb-20']}` },
        React.createElement(
          'span',
          { className: `${styles['fs-36']} ${styles['lable']} ${styles['pl-10']} ${styles['pr-10']}` },
          'Price Point'
        ),
        ' ',
        React.createElement('span', { className: `${styles['absolute']} border` })
      ),
      React.createElement(
        'div',
        null,
        React.createElement(
          Col,
          { md: 2, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            'div',
            { className: `${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} price-point ${styles['bg-white']} ${styles['pt-25']} ${styles['pb-25']}` },
            React.createElement(
              'h4',
              { className: `${styles['fs-18']} ${styles['fontW600']} ${styles['m-0']}` },
              'Below SAR 500'
            ),
            React.createElement(
              'span',
              { className: styles['fontW300'] },
              '4000+ Products'
            )
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            'div',
            { className: `${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} price-point ${styles['bg-white']} ${styles['pt-25']} ${styles['pb-25']}` },
            React.createElement(
              'h4',
              { className: `${styles['fs-18']} ${styles['fontW600']} ${styles['m-0']}` },
              'Below SAR 500'
            ),
            React.createElement(
              'span',
              { className: styles['fontW300'] },
              '4000+ Products'
            )
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            'div',
            { className: `${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} price-point ${styles['bg-white']} ${styles['pt-25']} ${styles['pb-25']}` },
            React.createElement(
              'h4',
              { className: `${styles['fs-18']} ${styles['fontW600']} ${styles['m-0']}` },
              'Below SAR 500'
            ),
            React.createElement(
              'span',
              { className: styles['fontW300'] },
              '4000+ Products'
            )
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            'div',
            { className: `${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} price-point ${styles['bg-white']} ${styles['pt-25']} ${styles['pb-25']}` },
            React.createElement(
              'h4',
              { className: `${styles['fs-18']} ${styles['fontW600']} ${styles['m-0']}` },
              'Below SAR 500'
            ),
            React.createElement(
              'span',
              { className: styles['fontW300'] },
              '4000+ Products'
            )
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            'div',
            { className: `${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} price-point ${styles['bg-white']} ${styles['pt-25']} ${styles['pb-25']}` },
            React.createElement(
              'h4',
              { className: `${styles['fs-18']} ${styles['fontW600']} ${styles['m-0']}` },
              'Below SAR 500'
            ),
            React.createElement(
              'span',
              { className: styles['fontW300'] },
              '4000+ Products'
            )
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            'div',
            { className: `${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} price-point ${styles['bg-white']} ${styles['pt-25']} ${styles['pb-25']}` },
            React.createElement(
              'h4',
              { className: `${styles['fs-18']} ${styles['fontW600']} ${styles['m-0']}` },
              'Below SAR 500'
            ),
            React.createElement(
              'span',
              { className: styles['fontW300'] },
              '4000+ Products'
            )
          )
        )
      )
    ),
    React.createElement(
      'div',
      { className: `getting-ready-part ${styles['clear-b']}` },
      React.createElement(
        'h3',
        { className: `${styles['flex-center']} what-title ${styles['justify-center']} ${styles['relative']} lobster-family ${styles['pt-40']} ${styles['pb-20']}` },
        React.createElement(
          'span',
          { className: `${styles['fs-36']} ${styles['lable']} ${styles['pl-10']} ${styles['pr-10']}` },
          'Getting Ready to Office'
        ),
        ' ',
        React.createElement('span', { className: `${styles['absolute']} border` })
      ),
      React.createElement(
        'div',
        null,
        React.createElement(
          Col,
          { md: 6, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            Col,
            { md: 8, className: `${styles['pl-0']} ${styles['pr-10']}` },
            React.createElement('img', { src: '/static/img/landing-page-fashion/getting-img.jpg', className: 'img-responsive' })
          ),
          React.createElement(
            Col,
            { md: 4, className: `${styles['pl-0']} ${styles['pr-10']}` },
            React.createElement(
              'div',
              { className: styles['pb-10'] },
              React.createElement('img', { src: '/static/img/landing-page-fashion/getting-img2.jpg', className: 'img-responsive' })
            ),
            React.createElement(
              'div',
              null,
              React.createElement('img', { src: '/static/img/landing-page-fashion/getting-img3.jpg', className: 'img-responsive' })
            )
          )
        ),
        React.createElement(
          Col,
          { md: 6, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            Col,
            { md: 8, className: `${styles['pl-0']} ${styles['pr-10']}` },
            React.createElement('img', { src: '/static/img/landing-page-fashion/getting-img4.jpg', className: 'img-responsive' })
          ),
          React.createElement(
            Col,
            { md: 4, className: `${styles['pl-0']} ${styles['pr-10']}` },
            React.createElement(
              'div',
              { className: styles['pb-10'] },
              React.createElement('img', { src: '/static/img/landing-page-fashion/getting-img5.jpg', className: 'img-responsive' }),
              React.createElement(
                'div',
                { className: `${styles['bg-white']} chinos-part-inn` },
                React.createElement(
                  'h6',
                  { className: `${styles['m-0']} ${styles['fs-14']} ${styles['fontW600']}` },
                  'Women\'s Formal Shoes'
                ),
                React.createElement(
                  'span',
                  { className: 'disc' },
                  'Up to 50% Off'
                )
              )
            ),
            React.createElement(
              'div',
              null,
              React.createElement('img', { src: '/static/img/landing-page-fashion/what-new6.jpg', className: 'img-responsive' }),
              React.createElement(
                'div',
                { className: `${styles['bg-white']} chinos-part-inn` },
                React.createElement(
                  'h6',
                  { className: `${styles['m-0']} ${styles['fs-14']} ${styles['fontW600']}` },
                  'Handbags'
                ),
                React.createElement(
                  'span',
                  { className: 'disc' },
                  'Up to 50% Off'
                )
              )
            )
          )
        )
      )
    ),
    React.createElement(
      'div',
      { className: `${styles['shop-look-part']} ${styles['clear-b']}` },
      React.createElement(
        'h3',
        { className: `${styles['flex-center']} what-title ${styles['justify-center']} ${styles['relative']} lobster-family ${styles['pt-40']} ${styles['pb-20']}` },
        React.createElement(
          'span',
          { className: `${styles['fs-36']} ${styles['lable']} ${styles['pl-10']} ${styles['pr-10']}` },
          'Shop The Look'
        ),
        ' ',
        React.createElement('span', { className: `${styles['absolute']} border` })
      ),
      React.createElement(
        Col,
        { md: 3, className: `${styles['pl-0']} ${styles['pr-10']}` },
        React.createElement('img', { src: '/static/img/landing-page-fashion/shop-look.jpg', className: 'img-responsive' })
      ),
      React.createElement(
        Col,
        { md: 3, className: `${styles['pl-0']} ${styles['pr-10']}` },
        React.createElement('img', { src: '/static/img/landing-page-fashion/shop-look1.jpg', className: 'img-responsive' })
      ),
      React.createElement(
        Col,
        { md: 3, className: `${styles['pl-0']} ${styles['pr-10']}` },
        React.createElement('img', { src: '/static/img/landing-page-fashion/shop-look2.jpg', className: 'img-responsive' })
      ),
      React.createElement(
        Col,
        { md: 3, className: `${styles['pl-0']} ${styles['pr-10']}` },
        React.createElement('img', { src: '/static/img/landing-page-fashion/shop-look4.jpg', className: 'img-responsive' })
      )
    ),
    React.createElement(
      'div',
      { className: `styled-for-part ${styles['clear-b']}` },
      React.createElement(
        'h3',
        { className: `${styles['flex-center']} what-title ${styles['justify-center']} ${styles['relative']} lobster-family ${styles['pt-40']} ${styles['pb-20']}` },
        React.createElement(
          'span',
          { className: `${styles['fs-36']} ${styles['lable']} ${styles['pl-10']} ${styles['pr-10']}` },
          'Want to See It Styled for You ?'
        ),
        ' ',
        React.createElement('span', { className: `${styles['absolute']} border` })
      ),
      React.createElement(
        Col,
        { md: 2, className: `${styles['pl-0']} ${styles['pr-10']}` },
        React.createElement('img', { src: '/static/img/landing-page-fashion/styled-for.jpg', className: 'img-responsive' })
      ),
      React.createElement(
        Col,
        { md: 2, className: `${styles['pl-0']} ${styles['pr-10']}` },
        React.createElement('img', { src: '/static/img/landing-page-fashion/styled-for1.jpg', className: 'img-responsive' })
      ),
      React.createElement(
        Col,
        { md: 2, className: `${styles['pl-0']} ${styles['pr-10']}` },
        React.createElement('img', { src: '/static/img/landing-page-fashion/styled-for2.jpg', className: 'img-responsive' })
      ),
      React.createElement(
        Col,
        { md: 2, className: `${styles['pl-0']} ${styles['pr-10']}` },
        React.createElement('img', { src: '/static/img/landing-page-fashion/styled-for3.jpg', className: 'img-responsive' })
      ),
      React.createElement(
        Col,
        { md: 2, className: `${styles['pl-0']} ${styles['pr-10']}` },
        React.createElement('img', { src: '/static/img/landing-page-fashion/styled-for3.jpg', className: 'img-responsive' })
      ),
      React.createElement(
        Col,
        { md: 2, className: `${styles['pl-0']} ${styles['pr-10']}` },
        React.createElement('img', { src: '/static/img/landing-page-fashion/styled-for3.jpg', className: 'img-responsive' })
      )
    ),
    React.createElement(
      'div',
      { className: `top-brand-part ${styles['clear-b']}` },
      React.createElement(
        'h3',
        { className: `${styles['flex-center']} what-title ${styles['justify-center']} ${styles['relative']} lobster-family ${styles['pt-40']} ${styles['pb-20']}` },
        React.createElement(
          'span',
          { className: `${styles['fs-36']} ${styles['lable']} ${styles['pl-10']} ${styles['pr-10']}` },
          'Top Brands'
        ),
        ' ',
        React.createElement('span', { className: `${styles['absolute']} border` })
      ),
      React.createElement(
        'div',
        { className: styles['flex'] },
        React.createElement(
          Col,
          { md: 2, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            'div',
            { className: `   ${styles['flex-colum']} ${styles['bg-white']} top-brand-part-inn ${styles['border-radius4']}` },
            React.createElement(
              'div',
              { className: `adidas-logo ${styles['flex-center']}` },
              React.createElement('img', { src: '/static/img/landing-page-fashion/top-brands.jpg', className: 'img-responsive' })
            ),
            React.createElement(
              'div',
              { className: `${styles['pt-20']} ${styles['t-c']} top-brand-list` },
              React.createElement(
                'ul',
                { className: styles['pl-0'] },
                React.createElement(
                  'li',
                  null,
                  'Shoes'
                ),
                React.createElement(
                  'li',
                  null,
                  'Clothes'
                ),
                React.createElement(
                  'li',
                  null,
                  'Track Suite'
                ),
                React.createElement(
                  'li',
                  null,
                  'Sports'
                ),
                React.createElement(
                  'li',
                  null,
                  'Clothing & Accessories'
                )
              )
            )
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            'div',
            { className: `${styles['flex-center']}  ${styles['flex-colum']} ${styles['bg-white']} top-brand-part-inn ${styles['border-radius4']}` },
            React.createElement(
              'div',
              { className: `canvali-logo ${styles['flex-center']}` },
              React.createElement('img', { src: '/static/img/landing-page-fashion/top-brands1.jpg', className: 'img-responsive' })
            ),
            React.createElement(
              'div',
              { className: `${styles['pt-20']} ${styles['t-c']} top-brand-list` },
              React.createElement(
                'ul',
                { className: styles['pl-0'] },
                React.createElement(
                  'li',
                  null,
                  'Shoes'
                ),
                React.createElement(
                  'li',
                  null,
                  'Clothes'
                ),
                React.createElement(
                  'li',
                  null,
                  'Track Suite'
                ),
                React.createElement(
                  'li',
                  null,
                  'Sports'
                ),
                React.createElement(
                  'li',
                  null,
                  'Clothing & Accessories'
                )
              )
            )
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            'div',
            { className: `${styles['flex-center']}  ${styles['flex-colum']} ${styles['bg-white']} top-brand-part-inn ${styles['border-radius4']}` },
            React.createElement(
              'div',
              { className: `dg-logo ${styles['flex-center']}` },
              React.createElement('img', { src: '/static/img/landing-page-fashion/top-brands2.jpg', className: 'img-responsive' })
            ),
            React.createElement(
              'div',
              { className: `${styles['pt-20']} ${styles['t-c']} top-brand-list` },
              React.createElement(
                'ul',
                { className: styles['pl-0'] },
                React.createElement(
                  'li',
                  null,
                  'Shoes'
                ),
                React.createElement(
                  'li',
                  null,
                  'Clothes'
                ),
                React.createElement(
                  'li',
                  null,
                  'Track Suite'
                ),
                React.createElement(
                  'li',
                  null,
                  'Sports'
                ),
                React.createElement(
                  'li',
                  null,
                  'Clothing & Accessories'
                )
              )
            )
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            'div',
            { className: `${styles['flex-center']}  ${styles['flex-colum']} ${styles['bg-white']} top-brand-part-inn ${styles['border-radius4']}` },
            React.createElement(
              'div',
              { className: `dg-logo ${styles['flex-center']}` },
              React.createElement('img', { src: '/static/img/landing-page-fashion/top-brands3.jpg', className: 'img-responsive' })
            ),
            React.createElement(
              'div',
              { className: `${styles['pt-20']} ${styles['t-c']} top-brand-list` },
              React.createElement(
                'ul',
                { className: styles['pl-0'] },
                React.createElement(
                  'li',
                  null,
                  'Shoes'
                ),
                React.createElement(
                  'li',
                  null,
                  'Clothes'
                ),
                React.createElement(
                  'li',
                  null,
                  'Track Suite'
                ),
                React.createElement(
                  'li',
                  null,
                  'Sports'
                ),
                React.createElement(
                  'li',
                  null,
                  'Clothing & Accessories'
                )
              )
            )
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            'div',
            { className: `${styles['flex-center']}  ${styles['flex-colum']} ${styles['bg-white']} top-brand-part-inn ${styles['border-radius4']}` },
            React.createElement(
              'div',
              { className: `adidas-logo ${styles['flex-center']}` },
              React.createElement('img', { src: '/static/img/landing-page-fashion/top-brands4.jpg', className: 'img-responsive' })
            ),
            React.createElement(
              'div',
              { className: `${styles['pt-20']} ${styles['t-c']} top-brand-list` },
              React.createElement(
                'ul',
                { className: styles['pl-0'] },
                React.createElement(
                  'li',
                  null,
                  'Shoes'
                ),
                React.createElement(
                  'li',
                  null,
                  'Clothes'
                ),
                React.createElement(
                  'li',
                  null,
                  'Track Suite'
                ),
                React.createElement(
                  'li',
                  null,
                  'Sports'
                ),
                React.createElement(
                  'li',
                  null,
                  'Clothing & Accessories'
                )
              )
            )
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            'div',
            { className: `${styles['flex-center']}  ${styles['flex-colum']} ${styles['bg-white']} top-brand-part-inn ${styles['border-radius4']}` },
            React.createElement(
              'div',
              { className: `guc-logo ${styles['flex-center']}` },
              React.createElement('img', { src: '/static/img/landing-page-fashion/top-brands5.jpg', className: 'img-responsive' })
            ),
            React.createElement(
              'div',
              { className: `${styles['pt-20']} ${styles['t-c']} top-brand-list` },
              React.createElement(
                'ul',
                { className: styles['pl-0'] },
                React.createElement(
                  'li',
                  null,
                  'Shoes'
                ),
                React.createElement(
                  'li',
                  null,
                  'Clothes'
                ),
                React.createElement(
                  'li',
                  null,
                  'Track Suite'
                ),
                React.createElement(
                  'li',
                  null,
                  'Sports'
                ),
                React.createElement(
                  'li',
                  null,
                  'Clothing & Accessories'
                )
              )
            )
          )
        )
      )
    )
  )
);