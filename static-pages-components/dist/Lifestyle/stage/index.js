
const Lifestyle = () => React.createElement(
  'div',
  { className: 'life-style-main' },
  React.createElement(
    Grid,
    null,
    React.createElement(
      'div',
      { className: `${styles['flex']} life-banner-inn ${styles['relative']}` },
      React.createElement(
        'a',
        { href: '/en/search?q=home%20decor&isListed=false' },
        React.createElement('img', { src: `/static/img/landing-page-lifestyle/${lang === 'en' ? 'furnitures' : 'furnitures-ar'}.jpg`, className: 'img-responsive' })
      )
    ),
    React.createElement(
      'div',
      { className: `sub-banner ${styles['flex']} ${styles['pt-20']}` },
      React.createElement(
        Col,
        { md: 6, className: styles['pl-0'] },
        React.createElement(
          'div',
          { className: `sub-banner-title ${styles['pb-10']}` },
          React.createElement(
            'h5',
            { className: `title ${styles['fs-16']} ${styles['fontW600']} ${styles['m-0']}` },
            'Home Furnishing'
          ),
          React.createElement(
            'span',
            { className: `dec ${styles['fs-12']}` },
            'Cusion, Cushion covers, Vase, Lights, Tea table, Sofa sets & more\u2026'
          )
        ),
        React.createElement('img', { src: '/static/img/landing-page-lifestyle/sub-banner1.jpg', className: 'img-responsive' })
      ),
      React.createElement(
        Col,
        { md: 6, className: styles['pr-0'] },
        React.createElement(
          'div',
          { className: `sub-banner-title ${styles['pb-10']}` },
          React.createElement(
            'h5',
            { className: `title ${styles['fs-16']} ${styles['fontW600']} ${styles['m-0']}` },
            'Home for your books'
          ),
          React.createElement(
            'span',
            { className: `dec ${styles['fs-12']}` },
            'Book shelves, Racks, Folders, Bookmarks & more...'
          )
        ),
        React.createElement('img', { src: '/static/img/landing-page-lifestyle/sub-banner2.jpg', className: 'img-responsive' })
      )
    ),
    React.createElement(
      'div',
      { className: `poular-cat ${styles['pt-30']} ${styles['pb-30']}` },
      React.createElement(
        'h5',
        { className: `main-title ${styles['fs-16']} ${styles['fontW600']}` },
        'Popular Category'
      ),
      React.createElement(
        'div',
        { className: `${styles['flex']} ${styles['poular-cat-inn']}` },
        React.createElement(
          Col,
          { md: 1, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            'div',
            { className: `${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon` },
            React.createElement(SVGComponent, { clsName: 'poular-cat', src: 'icons/landing-page-lifestyle/chair' }),
            React.createElement(
              'span',
              { className: `${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}` },
              'Furniture'
            )
          )
        ),
        React.createElement(
          Col,
          { md: 1, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            'div',
            { className: `${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon` },
            React.createElement(SVGComponent, { clsName: 'poular-cat', src: 'icons/landing-page-lifestyle/kichen' }),
            React.createElement(
              'span',
              { className: `${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}` },
              'Kitchen Tools'
            )
          )
        ),
        React.createElement(
          Col,
          { md: 1, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            'div',
            { className: `${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon` },
            React.createElement(SVGComponent, { clsName: 'poular-cat', src: 'icons/landing-page-lifestyle/apple' }),
            React.createElement(
              'span',
              { className: `${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}` },
              'Health & Fitness'
            )
          )
        ),
        React.createElement(
          Col,
          { md: 1, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            'div',
            { className: `${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon` },
            React.createElement(SVGComponent, { clsName: 'poular-cat', src: 'icons/landing-page-lifestyle/sports' }),
            React.createElement(
              'span',
              { className: `${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}` },
              'Sports & Fitness'
            )
          )
        ),
        React.createElement(
          Col,
          { md: 1, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            'div',
            { className: `${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon` },
            React.createElement(SVGComponent, { clsName: 'poular-cat1', src: 'icons/landing-page-lifestyle/baby-care' }),
            React.createElement(
              'span',
              { className: `${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}` },
              'Baby Care'
            )
          )
        ),
        React.createElement(
          Col,
          { md: 1, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            'div',
            { className: `${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon` },
            React.createElement(SVGComponent, { clsName: 'poular-cat1', src: 'icons/landing-page-lifestyle/personal-care' }),
            React.createElement(
              'span',
              { className: `${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}` },
              'Personal Care'
            )
          )
        ),
        React.createElement(
          Col,
          { md: 1, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            'div',
            { className: `${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon` },
            React.createElement(SVGComponent, { clsName: 'poular-cat2', src: 'icons/landing-page-lifestyle/sports-gloves' }),
            React.createElement(
              'span',
              { className: `${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}` },
              'Sports'
            )
          )
        ),
        React.createElement(
          Col,
          { md: 1, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            'div',
            { className: `${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon` },
            React.createElement(SVGComponent, { clsName: 'poular-cat3', src: 'icons/landing-page-lifestyle/gardening' }),
            React.createElement(
              'span',
              { className: `${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}` },
              'Gardening'
            )
          )
        ),
        React.createElement(
          Col,
          { md: 1, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            'div',
            { className: `${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon` },
            React.createElement(SVGComponent, { clsName: 'poular-cat', src: 'icons/landing-page-lifestyle/daily-needs' }),
            React.createElement(
              'span',
              { className: `${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}` },
              'Daily Needs'
            )
          )
        ),
        React.createElement(
          Col,
          { md: 1, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            'div',
            { className: `${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon` },
            React.createElement(SVGComponent, { clsName: 'poular-cat', src: 'icons/landing-page-lifestyle/kitchen-dining' }),
            React.createElement(
              'span',
              { className: `${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}` },
              'kitchen & dining'
            )
          )
        ),
        React.createElement(
          Col,
          { md: 1, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            'div',
            { className: `${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon` },
            React.createElement(SVGComponent, { clsName: 'poular-cat', src: 'icons/landing-page-lifestyle/satinary' }),
            React.createElement(
              'span',
              { className: `${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}` },
              'Stationary'
            )
          )
        ),
        React.createElement(
          Col,
          { md: 1, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            'div',
            { className: `${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon` },
            React.createElement(SVGComponent, { clsName: 'poular-cat', src: 'icons/landing-page-lifestyle/home-application' }),
            React.createElement(
              'span',
              { className: `${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}` },
              'Home Appliances'
            )
          )
        )
      )
    ),
    React.createElement(
      'div',
      { className: `top-selling-part ${styles['pt-10']}` },
      React.createElement(
        'h5',
        { className: `main-title ${styles['fs-16']} ${styles['fontW600']}  ${styles['mb-0']}` },
        'Top Selling Furniture'
      ),
      React.createElement(
        'span',
        { className: `dec ${styles['fs-12']}` },
        'Trolley bags, Shoes, Perfumes, Make-up kit, Grooming kit, Trimmers, Slippers, & more\u2026 '
      ),
      React.createElement(
        'div',
        { className: `top-selling-part-inn ${styles['pt-10']}` },
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            'div',
            { className: `top-selling-img ${styles['flex']}` },
            React.createElement('img', { src: '/static/img/landing-page-lifestyle/top-selling.jpg', className: 'img-responsive' })
          ),
          React.createElement(
            'div',
            { className: `${styles['thick-gry-clr']} ${styles['fs-12']}` },
            React.createElement(
              'h5',
              { className: `${styles['mb-0']} ${styles['fs-12']}` },
              'Wooden legs corner chairs'
            ),
            React.createElement(
              'span',
              { className: `${styles['fontW600']} ${styles['fs-12']}` },
              'AT 120 SAR'
            )
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            'div',
            { className: `top-selling-img ${styles['flex']}` },
            React.createElement('img', { src: '/static/img/landing-page-lifestyle/top-selling1.jpg', className: 'img-responsive' })
          ),
          React.createElement(
            'div',
            { className: `${styles['thick-gry-clr']} ${styles['fs-12']}` },
            React.createElement(
              'h5',
              { className: `${styles['mb-0']} ${styles['fs-12']}` },
              'Bed side table'
            ),
            React.createElement(
              'span',
              { className: `${styles['fontW600']} ${styles['fs-12']}` },
              'AT 180 SAR'
            )
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            'div',
            { className: `top-selling-img ${styles['flex']}` },
            React.createElement('img', { src: '/static/img/landing-page-lifestyle/top-selling2.jpg', className: 'img-responsive' })
          ),
          React.createElement(
            'div',
            { className: `${styles['thick-gry-clr']} ${styles['fs-12']}` },
            React.createElement(
              'h5',
              { className: `${styles['mb-0']} ${styles['fs-12']}` },
              'Work table with chair (White)'
            ),
            React.createElement(
              'span',
              { className: `${styles['fontW600']} ${styles['fs-12']}` },
              'AT 100 SAR'
            )
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            'div',
            { className: `top-selling-img ${styles['flex']}` },
            React.createElement('img', { src: '/static/img/landing-page-lifestyle/top-selling3.jpg', className: 'img-responsive' })
          ),
          React.createElement(
            'div',
            { className: `${styles['thick-gry-clr']} ${styles['fs-12']}` },
            React.createElement(
              'h5',
              { className: `${styles['mb-0']} ${styles['fs-12']}` },
              '2 Seater sofa with 4 pillow'
            ),
            React.createElement(
              'span',
              { className: `${styles['fontW600']} ${styles['fs-12']}` },
              'AT 120 SAR'
            )
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            'div',
            { className: `top-selling-img ${styles['flex']}` },
            React.createElement('img', { src: '/static/img/landing-page-lifestyle/top-selling4.jpg', className: 'img-responsive' })
          ),
          React.createElement(
            'div',
            { className: `${styles['thick-gry-clr']} ${styles['fs-12']}` },
            React.createElement(
              'h5',
              { className: `${styles['mb-0']} ${styles['fs-12']}` },
              'Work table with chair (White)'
            ),
            React.createElement(
              'span',
              { className: `${styles['fontW600']} ${styles['fs-12']}` },
              'AT 120 SAR'
            )
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            'div',
            { className: `top-selling-img ${styles['flex']}` },
            React.createElement('img', { src: '/static/img/landing-page-lifestyle/top-selling5.jpg', className: 'img-responsive' })
          ),
          React.createElement(
            'div',
            { className: `${styles['thick-gry-clr']}` },
            React.createElement(
              'h5',
              { className: `${styles['mb-0']} ${styles['fs-12']}` },
              'Home decor'
            ),
            React.createElement(
              'span',
              { className: `${styles['fontW600']} ${styles['fs-12']}` },
              'AT 120 SAR'
            )
          )
        )
      )
    ),
    React.createElement(
      'div',
      { className: `sub-banner ${styles['flex']} ${styles['pt-40']} ${styles['pb-20']} ${styles['clear-b']}` },
      React.createElement(
        Col,
        { md: 6, className: styles['pl-0'] },
        React.createElement(
          'div',
          { className: `sub-banner-title ${styles['pb-10']}` },
          React.createElement(
            'h5',
            { className: `title ${styles['fs-16']} ${styles['fontW600']} ${styles['m-0']}` },
            'Home Furnishing'
          ),
          React.createElement(
            'span',
            { className: `dec ${styles['fs-12']}` },
            'Cusion, Cushion covers, Vase, Lights, Tea table, Sofa sets & more\u2026'
          )
        ),
        React.createElement('img', { src: '/static/img/landing-page-lifestyle/essental.jpg', className: 'img-responsive' })
      ),
      React.createElement(
        Col,
        { md: 6, className: styles['pr-0'] },
        React.createElement(
          'div',
          { className: `sub-banner-title ${styles['pb-10']}` },
          React.createElement(
            'h5',
            { className: `title ${styles['fs-16']} ${styles['fontW600']} ${styles['m-0']}` },
            'Home for your books'
          ),
          React.createElement(
            'span',
            { className: `dec ${styles['fs-12']}` },
            'Book shelves, Racks, Folders, Bookmarks & more...'
          )
        ),
        React.createElement('img', { src: '/static/img/landing-page-lifestyle/essential1.jpg', className: 'img-responsive' })
      )
    ),
    React.createElement(
      'div',
      { className: `top-selling-part ${styles['pt-10']}` },
      React.createElement(
        'h5',
        { className: `main-title ${styles['fs-16']} ${styles['fontW600']}  ${styles['mb-0']}` },
        'Home Essentials'
      ),
      React.createElement(
        'span',
        { className: `dec ${styles['fs-12']}` },
        'Kitchen tools, Gardening tools, Cutlery, Table Tennis, Boxing  '
      ),
      React.createElement(
        'div',
        { className: `top-selling-part-inn ${styles['pt-10']}` },
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            'div',
            { className: `top-selling-img ${styles['flex']}` },
            React.createElement('img', { src: '/static/img/landing-page-lifestyle/home-ess.jpg', className: 'img-responsive' })
          ),
          React.createElement(
            'div',
            { className: `${styles['thick-gry-clr']} ${styles['fs-12']}` },
            React.createElement(
              'h5',
              { className: `${styles['mb-0']} ${styles['fs-12']}` },
              'Cutlery'
            ),
            React.createElement(
              'span',
              { className: `${styles['fontW600']} ${styles['fs-12']}` },
              'UPTO 50% OFF'
            )
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            'div',
            { className: `top-selling-img ${styles['flex']}` },
            React.createElement('img', { src: '/static/img/landing-page-lifestyle/home-ess1.jpg', className: 'img-responsive' })
          ),
          React.createElement(
            'div',
            { className: `${styles['thick-gry-clr']} ${styles['fs-12']}` },
            React.createElement(
              'h5',
              { className: `${styles['mb-0']} ${styles['fs-12']}` },
              'Tools & Hardware'
            ),
            React.createElement(
              'span',
              { className: `${styles['fontW600']} ${styles['fs-12']}` },
              'UPTO 20% OFF'
            )
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            'div',
            { className: `top-selling-img ${styles['flex']}` },
            React.createElement('img', { src: '/static/img/landing-page-lifestyle/home-ess2.jpg', className: 'img-responsive' })
          ),
          React.createElement(
            'div',
            { className: `${styles['thick-gry-clr']} ${styles['fs-12']}` },
            React.createElement(
              'h5',
              { className: `${styles['mb-0']} ${styles['fs-12']}` },
              'Personal Health Care'
            ),
            React.createElement(
              'span',
              { className: `${styles['fontW600']} ${styles['fs-12']}` },
              'UPTO 75% OFF'
            )
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            'div',
            { className: `top-selling-img ${styles['flex']}` },
            React.createElement('img', { src: '/static/img/landing-page-lifestyle/home-ess3.jpg', className: 'img-responsive' })
          ),
          React.createElement(
            'div',
            { className: `${styles['thick-gry-clr']} ${styles['fs-12']}` },
            React.createElement(
              'h5',
              { className: `${styles['mb-0']} ${styles['fs-12']}` },
              'Gardening Tools'
            ),
            React.createElement(
              'span',
              { className: `${styles['fontW600']} ${styles['fs-12']}` },
              'UPTO 65% OFF'
            )
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            'div',
            { className: `top-selling-img ${styles['flex']}` },
            React.createElement('img', { src: '/static/img/landing-page-lifestyle/home-ess4.jpg', className: 'img-responsive' })
          ),
          React.createElement(
            'div',
            { className: `${styles['thick-gry-clr']} ${styles['fs-12']}` },
            React.createElement(
              'h5',
              { className: `${styles['mb-0']} ${styles['fs-12']}` },
              'Grooming'
            ),
            React.createElement(
              'span',
              { className: `${styles['fontW600']} ${styles['fs-12']}` },
              'UPTO 65% OFF'
            )
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            'div',
            { className: `top-selling-img ${styles['flex']}` },
            React.createElement('img', { src: '/static/img/landing-page-lifestyle/home-ess5.jpg', className: 'img-responsive' })
          ),
          React.createElement(
            'div',
            { className: `${styles['thick-gry-clr']}` },
            React.createElement(
              'h5',
              { className: `${styles['mb-0']} ${styles['fs-12']}` },
              'Home Cleaning'
            ),
            React.createElement(
              'span',
              { className: `${styles['fontW600']} ${styles['fs-12']}` },
              'UPTO 40% OFF'
            )
          )
        )
      )
    ),
    React.createElement(
      'div',
      { className: `top-selling-part sports-part' ${styles['pt-40']} ${styles['pb-20']} ${styles['clear-b']}` },
      React.createElement(
        'h5',
        { className: `main-title ${styles['fs-16']} ${styles['fontW600']}  ${styles['mb-0']}` },
        'Sports Essentials'
      ),
      React.createElement(
        'span',
        { className: `dec ${styles['fs-12']}` },
        'Cricket, Soccer, Basketball, Table Tennis, Boxing, Lawn tennis, badminton & more\u2026 '
      ),
      React.createElement(
        'div',
        { className: `top-selling-part-inn ${styles['pt-10']} ${styles['flex']}` },
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            'div',
            { className: `top-selling-img ${styles['flex']} ${styles['p-35']} ${styles['bg-white']}` },
            React.createElement('img', { src: '/static/img/landing-page-lifestyle/sports.jpg', className: 'img-responsive' })
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            'div',
            { className: `top-selling-img ${styles['flex']} ${styles['p-35']} ${styles['bg-white']}` },
            React.createElement('img', { src: '/static/img/landing-page-lifestyle/sports1.jpg', className: 'img-responsive' })
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            'div',
            { className: `top-selling-img ${styles['flex']} ${styles['p-35']} ${styles['bg-white']}` },
            React.createElement('img', { src: '/static/img/landing-page-lifestyle/sports2.jpg', className: 'img-responsive' })
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            'div',
            { className: `top-selling-img ${styles['flex']} ${styles['p-35']} ${styles['bg-white']}` },
            React.createElement('img', { src: '/static/img/landing-page-lifestyle/sports3.jpg', className: 'img-responsive' })
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            'div',
            { className: `top-selling-img ${styles['flex']} ${styles['p-35']} ${styles['bg-white']}` },
            React.createElement('img', { src: '/static/img/landing-page-lifestyle/sports4.jpg', className: 'img-responsive' })
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            'div',
            { className: `top-selling-img ${styles['flex']} ${styles['p-35']} ${styles['bg-white']}` },
            React.createElement('img', { src: '/static/img/landing-page-lifestyle/sports5.jpg', className: 'img-responsive' })
          )
        )
      )
    ),
    React.createElement(
      'div',
      { className: `hobby-part ${styles['pt-20']} ${styles['pb-20']} ${styles['clear-b']}` },
      React.createElement(
        'h5',
        { className: `main-title ${styles['fs-16']} ${styles['fontW600']}  ${styles['mb-0']}` },
        'Hobby Shop'
      ),
      React.createElement(
        'span',
        { className: `dec ${styles['fs-12']}` },
        'Coins, Toys, Photography frames, Antiques, Arts & Crafts, Books, Cooking, Scrapbook, Fabric sewing,  & more\u2026'
      ),
      React.createElement(
        'div',
        { className: `hobby-part-inn ${styles['pt-10']} ${styles['flex']}` },
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            'div',
            { className: `hobby-part-img ${styles['relative']}` },
            React.createElement(
              'div',
              { className: 'hobby-part-img-inn' },
              React.createElement('img', { src: '/static/img/landing-page-lifestyle/hobby5.jpg', className: 'img-responsive' })
            ),
            React.createElement(
              'div',
              { className: `${styles['absolute']} bottom-label ${styles['white-color']}` },
              React.createElement(
                'span',
                { className: styles['fs-24'] },
                'Coins'
              )
            )
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            'div',
            { className: `hobby-part-img ${styles['relative']}` },
            React.createElement(
              'div',
              { className: 'hobby-part-img-inn' },
              React.createElement('img', { src: '/static/img/landing-page-lifestyle/hobby1.jpg', className: 'img-responsive' })
            ),
            React.createElement(
              'div',
              { className: `${styles['absolute']} bottom-label ${styles['white-color']}` },
              React.createElement(
                'span',
                { className: styles['fs-24'] },
                'Arts & Crafts'
              )
            )
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            'div',
            { className: `hobby-part-img ${styles['relative']}` },
            React.createElement(
              'div',
              { className: 'hobby-part-img-inn' },
              React.createElement('img', { src: '/static/img/landing-page-lifestyle/hobby2.jpg', className: 'img-responsive' })
            ),
            React.createElement(
              'div',
              { className: `${styles['absolute']} bottom-label ${styles['white-color']}` },
              React.createElement(
                'span',
                { className: styles['fs-24'] },
                'Fabric & Sewing'
              )
            )
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            'div',
            { className: `hobby-part-img ${styles['relative']}` },
            React.createElement(
              'div',
              { className: 'hobby-part-img-inn' },
              React.createElement('img', { src: '/static/img/landing-page-lifestyle/hobby3.jpg', className: 'img-responsive' })
            ),
            React.createElement(
              'div',
              { className: `${styles['absolute']} bottom-label ${styles['white-color']}` },
              React.createElement(
                'span',
                { className: styles['fs-24'] },
                'Antiques'
              )
            )
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            'div',
            { className: `hobby-part-img ${styles['relative']}` },
            React.createElement(
              'div',
              { className: 'hobby-part-img-inn' },
              React.createElement('img', { src: '/static/img/landing-page-lifestyle/hobby4.jpg', className: 'img-responsive' })
            ),
            React.createElement(
              'div',
              { className: `${styles['absolute']} bottom-label ${styles['white-color']}` },
              React.createElement(
                'span',
                { className: styles['fs-24'] },
                'Toys'
              )
            )
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            'div',
            { className: `hobby-part-img ${styles['relative']}` },
            React.createElement(
              'div',
              { className: 'hobby-part-img-inn' },
              React.createElement('img', { src: '/static/img/landing-page-lifestyle/hobby5.jpg', className: 'img-responsive' })
            ),
            React.createElement(
              'div',
              { className: `${styles['absolute']} bottom-label ${styles['white-color']}` },
              React.createElement(
                'span',
                { className: styles['fs-24'] },
                'Photography'
              )
            )
          )
        )
      )
    ),
    React.createElement(
      'div',
      { className: `${styles['health-buaty-part']} ${styles['flex']} ${styles['pt-20']} ${styles['pb-20']} ` },
      React.createElement(
        Col,
        { md: 4, className: `${styles['pl-0']} ${styles['pr-10']}` },
        React.createElement(
          'div',
          { className: `sub-banner-title ${styles['pb-10']}` },
          React.createElement(
            'h5',
            { className: `main-title ${styles['fs-16']} ${styles['fontW600']} ${styles['m-0']}` },
            'Health & Beauty'
          ),
          React.createElement(
            'span',
            { className: `dec ${styles['fs-12']}` },
            'Body lotion, Face cream, Massager & more\u2026'
          )
        ),
        React.createElement('img', { src: '/static/img/landing-page-lifestyle/health-but.jpg', className: 'img-responsive' })
      ),
      React.createElement(
        Col,
        { md: 4, className: `${styles['pl-0']} ${styles['pr-10']}` },
        React.createElement(
          'div',
          { className: `sub-banner-title ${styles['pb-10']}` },
          React.createElement(
            'h5',
            { className: `main-title ${styles['fs-16']} ${styles['fontW600']} ${styles['m-0']}` },
            'Grooming Essentials'
          ),
          React.createElement(
            'span',
            { className: `dec ${styles['fs-12']}` },
            'Beard Gel, Beard Shampoo, Face & Body Lotion, Trimmer &  more\u2026'
          )
        ),
        React.createElement('img', { src: '/static/img/landing-page-lifestyle/health-but1.jpg', className: 'img-responsive' })
      ),
      React.createElement(
        Col,
        { md: 4, className: `${styles['pl-0']} ${styles['pr-10']}` },
        React.createElement(
          'div',
          { className: `sub-banner-title ${styles['pb-10']}` },
          React.createElement(
            'h5',
            { className: `main-title ${styles['fs-16']} ${styles['fontW600']} ${styles['m-0']}` },
            'Kids Care'
          ),
          React.createElement(
            'span',
            { className: `dec ${styles['fs-12']}` },
            'Knee guard, Wrist Guard, Elbow Guard & more\u2026'
          )
        ),
        React.createElement('img', { src: '/static/img/landing-page-lifestyle/health-but2.jpg', className: 'img-responsive' })
      )
    ),
    React.createElement(
      'div',
      { className: `popular-part ${styles['pt-20']} ${styles['pb-20']} ${styles['clear-b']}` },
      React.createElement(
        'h5',
        { className: `main-title ${styles['fs-16']} ${styles['fontW600']}  ${styles['mb-0']}` },
        'Popular Brands'
      ),
      React.createElement(
        'span',
        { className: `dec ${styles['fs-12']}` },
        'Home Centre, Babyshop, Max, Splash, Centrepoint, Shoe Mart, Gucci, Addidas, Nike, Puma, Wrangler, Levis, H&M & more\u2026 '
      ),
      React.createElement(
        'div',
        { className: `hobby-part-inn ${styles['pt-10']} ${styles['flex']}` },
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            'div',
            { className: `hobby-part-img ${styles['relative']}` },
            React.createElement('img', { src: '/static/img/landing-page-lifestyle/popular5.jpg', className: 'img-responsive' })
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            'div',
            { className: `hobby-part-img ${styles['relative']}` },
            React.createElement('img', { src: '/static/img/landing-page-lifestyle/popular1.jpg', className: 'img-responsive' })
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            'div',
            { className: `hobby-part-img ${styles['relative']}` },
            React.createElement('img', { src: '/static/img/landing-page-lifestyle/popular2.jpg', className: 'img-responsive' })
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            'div',
            { className: `hobby-part-img ${styles['relative']}` },
            React.createElement('img', { src: '/static/img/landing-page-lifestyle/popular3.jpg', className: 'img-responsive' })
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            'div',
            { className: `hobby-part-img ${styles['relative']}` },
            React.createElement('img', { src: '/static/img/landing-page-lifestyle/popular4.jpg', className: 'img-responsive' })
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            'div',
            { className: `hobby-part-img ${styles['relative']}` },
            React.createElement('img', { src: '/static/img/landing-page-lifestyle/popular5.jpg', className: 'img-responsive' })
          )
        )
      )
    )
  )
);