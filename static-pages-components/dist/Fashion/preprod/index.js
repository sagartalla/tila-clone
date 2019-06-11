
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
        { href: `/SAU/${lang}/srp?search=dress&isListed=false` },
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
          'a',
          { href: `/SAU/${lang}/srp?search=shoe&language=en&isListed=false` },
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
                  { className: `lobster-family ${styles['fs-24']}` },
                  'Men\'s Shoes'
                ),
                React.createElement(
                  'span',
                  { className: styles['fs-12'] },
                  'They lift you physically & emotionally.'
                ),
                React.createElement(
                  'span',
                  { className: `${styles['pt-25']} shop-now-btn` },
                  React.createElement(
                    'a',
                    { className: `${styles['fs-12']} ${styles['fontW600']} ${styles['border-radius4']}` },
                    'Buy NOW'
                  )
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
          'a',
          { href: `/SAU/${lang}/srp?search=skirt&language=en&isListed=false` },
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
                  { className: `lobster-family ${styles['fs-24']}` },
                  'Women\u2019s Dress'
                ),
                React.createElement(
                  'span',
                  { className: styles['fs-12'] },
                  'When in doubt, wear red.'
                ),
                React.createElement(
                  'span',
                  { className: `${styles['pt-25']} shop-now-btn` },
                  React.createElement(
                    'a',
                    { className: `${styles['fs-12']} ${styles['fontW600']} ${styles['border-radius4']}` },
                    'Buy NOW'
                  )
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
          'a',
          { href: `/SAU/${lang}/srp?search=fitness%20&%20sports&language=en&isListed=false` },
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
                  { className: `lobster-family ${styles['fs-24']}` },
                  'Fitness & Sports'
                ),
                React.createElement(
                  'span',
                  { className: styles['fs-12'] },
                  'Take care of your body.'
                ),
                React.createElement(
                  'span',
                  { className: `${styles['pt-25']} shop-now-btn` },
                  React.createElement(
                    'a',
                    { className: `${styles['fs-12']} ${styles['fontW600']} ${styles['border-radius4']}` },
                    'Buy NOW'
                  )
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
          'a',
          { href: `/SAU/${lang}/srp?search=watch&language=en&isListed=false` },
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
                  { className: `lobster-family ${styles['fs-24']}` },
                  'Upto 50% Off on Watches'
                ),
                React.createElement(
                  'span',
                  { className: styles['fs-12'] },
                  'They lift you physically & emotionally.'
                ),
                React.createElement(
                  'span',
                  { className: `${styles['pt-25']} shop-now-btn` },
                  React.createElement(
                    'a',
                    { className: `${styles['fs-12']} ${styles['fontW600']} ${styles['border-radius4']}` },
                    'Buy NOW'
                  )
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
            React.createElement(
              'a',
              { href: `/SAU/${lang}/srp?search=rainware&isListed=false` },
              React.createElement('img', { src: '/static/img/landing-page-fashion/what-new.jpg', className: 'img-responsive' })
            )
          ),
          React.createElement(
            Col,
            { md: 4, className: `${styles['pl-0']} ${styles['pr-10']}` },
            React.createElement(
              'div',
              { className: 'chinos-part' },
              React.createElement(
                'a',
                { href: `/SAU/${lang}/srp?search=Chinos&language=en&isListed=false` },
                React.createElement('img', { src: '/static/img/landing-page-fashion/what-new1.jpg', className: 'img-responsive' })
              ),
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
              React.createElement(
                'a',
                { href: `/SAU/${lang}/srp/sunglasses?categoryTree=true&isListed=false&sid=892,2439` },
                React.createElement('img', { src: '/static/img/landing-page-fashion/what-new2.jpg', className: 'img-responsive' })
              ),
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
              React.createElement(
                'a',
                { href: `/SAU/${lang}/srp?search=Kids%20Wear&language=en&isListed=false` },
                React.createElement('img', { src: '/static/img/landing-page-fashion/what-new3.jpg', className: 'img-responsive' })
              ),
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
              React.createElement(
                'a',
                { href: `/SAU/${lang}/srp/fragrance?categoryTree=true&isListed=false&sid=932,958,964` },
                React.createElement('img', { src: '/static/img/landing-page-fashion/what-new4.jpg', className: 'img-responsive' })
              ),
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
              React.createElement(
                'a',
                { href: `/SAU/${lang}/srp?search=Jewellery&isListed=false` },
                React.createElement('img', { src: '/static/img/landing-page-fashion/what-new5.jpg', className: 'img-responsive' })
              ),
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
              React.createElement(
                'a',
                { href: `/SAU/${lang}/srp?search=Handbags&isListed=false` },
                React.createElement('img', { src: '/static/img/landing-page-fashion/what-new6.jpg', className: 'img-responsive' })
              ),
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
              React.createElement(
                'a',
                { href: `/SAU/${lang}/srp?search=watch&language=en&isListed=false` },
                React.createElement('img', { src: '/static/img/landing-page-fashion/what-new7.jpg', className: 'img-responsive' })
              )
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
            React.createElement(
              'a',
              { href: `/SAU/${lang}/srp?search=men%20formal%20shirts&language=en&isListed=false` },
              React.createElement('img', { src: '/static/img/landing-page-fashion/getting-img.jpg', className: 'img-responsive' })
            )
          ),
          React.createElement(
            Col,
            { md: 4, className: `${styles['pl-0']} ${styles['pr-10']}` },
            React.createElement(
              'div',
              { className: styles['pb-10'] },
              React.createElement(
                'a',
                { href: `/SAU/${lang}/srp?search=mens%20trousers&language=en&isListed=false` },
                React.createElement('img', { src: '/static/img/landing-page-fashion/getting-img2.jpg', className: 'img-responsive' })
              )
            ),
            React.createElement(
              'div',
              null,
              React.createElement(
                'a',
                { href: `/SAU/${lang}/srp/srp?search=shoe&language=en&isListed=false` },
                React.createElement('img', { src: '/static/img/landing-page-fashion/getting-img3.jpg', className: 'img-responsive' })
              )
            )
          )
        ),
        React.createElement(
          Col,
          { md: 6, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            Col,
            { md: 8, className: `${styles['pl-0']} ${styles['pr-10']}` },
            React.createElement(
              'a',
              { href: `/SAU/${lang}/srp/srp?search=womens%20tops&language=en&isListed=false` },
              React.createElement('img', { src: '/static/img/landing-page-fashion/getting-img4.jpg', className: 'img-responsive' })
            )
          ),
          React.createElement(
            Col,
            { md: 4, className: `${styles['pl-0']} ${styles['pr-10']}` },
            React.createElement(
              'div',
              { className: styles['pb-10'] },
              React.createElement(
                'a',
                { href: `/SAU/${lang}/srp/footwear?categoryTree=true&isListed=false&sid=892,909,921` },
                React.createElement('img', { src: '/static/img/landing-page-fashion/getting-img5.jpg', className: 'img-responsive' })
              ),
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
              React.createElement(
                'a',
                { href: `/SAU/${lang}/srp?search=Handbags&isListed=false` },
                React.createElement('img', { src: '/static/img/landing-page-fashion/what-new6.jpg', className: 'img-responsive' })
              ),
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
        React.createElement(Col, { md: 2, className: `${styles['pl-0']} ${styles['pr-10']}` }),
        React.createElement(
          Col,
          { md: 2, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            'div',
            { className: `${styles['flex-center']}  ${styles['flex-colum']} ${styles['bg-white']} top-brand-part-inn ${styles['border-radius4']}` },
            React.createElement(
              'div',
              { className: `canvali-logo ${styles['flex-center']}` },
              React.createElement(
                'a',
                { href: `/SAU/${lang}/srp?search=just%20cavalli&isListed=false` },
                React.createElement('img', { src: '/static/img/landing-page-fashion/top-brands1.jpg', className: 'img-responsive' })
              )
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
              React.createElement(
                'a',
                { href: `/SAU/${lang}/srp?search=DOLCE%20&%20GABBANA&isListed=false` },
                React.createElement('img', { src: '/static/img/landing-page-fashion/top-brands2.jpg', className: 'img-responsive' })
              )
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
              React.createElement(
                'a',
                { href: `/SAU/${lang}/srp?search=gg&isListed=false` },
                React.createElement('img', { src: '/static/img/landing-page-fashion/top-brands3.jpg', className: 'img-responsive' })
              )
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
              React.createElement(
                'a',
                { href: `/SAU/${lang}/srp?search=gucci&isListed=false` },
                React.createElement('img', { src: '/static/img/landing-page-fashion/top-brands5.jpg', className: 'img-responsive' })
              )
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
        React.createElement(Col, { md: 2, className: `${styles['pl-0']} ${styles['pr-10']}` })
      )
    )
  )
);