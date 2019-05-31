
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
        { href: '/SAU/en/srp?search=home%20decor&isListed=false' },
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
        React.createElement(
          'a',
          { href: 'http://localhost:3000/SAU/en/srp/home-furnishing?categoryTree=true&isListed=false&sid=932,941' },
          React.createElement('img', { src: '/static/img/landing-page-lifestyle/sub-banner1.jpg', className: 'img-responsive' })
        )
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
        React.createElement(
          'a',
          { href: 'http://localhost:3000/SAU/en/srp/rack?categoryTree=true&isListed=false&sid=932,941,944' },
          React.createElement('img', { src: '/static/img/landing-page-lifestyle/sub-banner2.jpg', className: 'img-responsive' })
        )
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
            'a',
            { href: 'http://localhost:3000/SAU/en/srp/home-furnishing?categoryTree=true&isListed=false&sid=932,941' },
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
          )
        ),
        React.createElement(
          Col,
          { md: 1, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            'a',
            { href: 'http://localhost:3000/SAU/en/srp/kitchen-appliances?categoryTree=true&isListed=false&sid=932,945' },
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
          )
        ),
        React.createElement(
          Col,
          { md: 1, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            'a',
            { href: 'http://localhost:3000/SAU/en/srp/health-care?categoryTree=true&isListed=false&sid=932,972' },
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
          )
        ),
        React.createElement(
          Col,
          { md: 1, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            'a',
            { href: 'http://localhost:3000/SAU/en/srp?search=Fitness&language=en&isListed=false' },
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
          )
        ),
        React.createElement(
          Col,
          { md: 1, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            'a',
            { href: 'http://localhost:3000/SAU/en/srp/baby-care?categoryTree=true&isListed=false&sid=932,955' },
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
          )
        ),
        React.createElement(
          Col,
          { md: 1, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            'a',
            { href: 'http://localhost:3000/SAU/en/srp/beauty-&-personal-care?categoryTree=true&isListed=false&sid=932,958' },
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
          )
        ),
        React.createElement(
          Col,
          { md: 1, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            'a',
            { href: 'http://localhost:3000/SAU/en/srp?search=sports&language=en&isListed=false' },
            React.createElement(
              'div',
              { className: `${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon` },
              React.createElement(SVGComponent, { clsName: 'poular-cat2', src: 'icons/landing-page-lifestyle/sports-ball' }),
              React.createElement(
                'span',
                { className: `${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}` },
                'Sports'
              )
            )
          )
        ),
        React.createElement(
          Col,
          { md: 1, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            'a',
            { href: 'http://localhost:3000/SAU/en/srp?search=Gardening&language=en&isListed=false' },
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
          )
        ),
        React.createElement(
          Col,
          { md: 1, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            'a',
            { href: 'http://localhost:3000/SAU/en/srp?search=Daily%20Needs&language=en&isListed=false' },
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
          )
        ),
        React.createElement(
          Col,
          { md: 1, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            'a',
            { href: 'http://localhost:3000/SAU/en/srp/health-care?categoryTree=true&isListed=false&sid=932,972' },
            React.createElement(
              'div',
              { className: `${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon` },
              React.createElement(SVGComponent, { clsName: 'poular-cat', src: 'icons/landing-page-lifestyle/health' }),
              React.createElement(
                'span',
                { className: `${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}` },
                'Health Care'
              )
            )
          )
        ),
        React.createElement(
          Col,
          { md: 1, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            'a',
            { href: 'http://localhost:3000/SAU/en/srp/office-supplies?categoryTree=true&isListed=false&sid=932,979' },
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
          )
        ),
        React.createElement(
          Col,
          { md: 1, className: `${styles['pl-0']} ${styles['pr-10']}` },
          React.createElement(
            'a',
            { href: 'http://localhost:3000/SAU/en/srp/home-applaince?categoryTree=true&isListed=false&sid=932,935' },
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
        React.createElement(
          'a',
          { href: 'http://localhost:3000/SAU/en/srp/home-furnishing?categoryTree=true&isListed=false&sid=932,941' },
          React.createElement('img', { src: '/static/img/landing-page-lifestyle/essental.jpg', className: 'img-responsive' })
        )
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
        React.createElement(
          'a',
          { href: 'http://localhost:3000/SAU/en/srp/rack?categoryTree=true&isListed=false&sid=932,941,944' },
          React.createElement('img', { src: '/static/img/landing-page-lifestyle/essential1.jpg', className: 'img-responsive' })
        )
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
            React.createElement(
              'a',
              { href: 'http://localhost:3000/SAU/en/srp?search=Cutlery&language=en&isListed=false' },
              React.createElement('img', { src: '/static/img/landing-page-lifestyle/home-ess.jpg', className: 'img-responsive' })
            )
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
            React.createElement(
              'a',
              { href: 'http://localhost:3000/SAU/en/srp?search=Tools%20and%20hardware&language=en&isListed=false' },
              React.createElement('img', { src: '/static/img/landing-page-lifestyle/home-ess1.jpg', className: 'img-responsive' })
            )
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
            React.createElement(
              'a',
              { href: 'http://localhost:3000/SAU/en/srp/beauty-&-personal-care?categoryTree=true&isListed=false&sid=932,958' },
              React.createElement('img', { src: '/static/img/landing-page-lifestyle/home-ess2.jpg', className: 'img-responsive' })
            )
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
            React.createElement(
              'a',
              { href: 'http://localhost:3000/SAU/en/srp?search=Gardening%20Tools&language=en&isListed=false' },
              React.createElement('img', { src: '/static/img/landing-page-lifestyle/home-ess3.jpg', className: 'img-responsive' })
            )
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
            React.createElement(
              'a',
              { href: 'http://localhost:3000/SAU/en/srp?search=Grooming&language=en&isListed=false' },
              React.createElement('img', { src: '/static/img/landing-page-lifestyle/home-ess4.jpg', className: 'img-responsive' })
            )
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
            React.createElement(
              'a',
              { href: 'http://localhost:3000/SAU/en/srp?search=Home%20Cleaning&language=en&isListed=false' },
              React.createElement('img', { src: '/static/img/landing-page-lifestyle/home-ess5.jpg', className: 'img-responsive' })
            )
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
            React.createElement(
              'a',
              { href: 'http://localhost:3000/SAU/en/srp?search=ssoccer&language=en&isListed=false' },
              React.createElement('img', { src: '/static/img/landing-page-lifestyle/sports.jpg', className: 'img-responsive' })
            )
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            'div',
            { className: `top-selling-img ${styles['flex']} ${styles['p-35']} ${styles['bg-white']}` },
            React.createElement(
              'a',
              { href: 'http://localhost:3000/SAU/en/srp?search=badminton&language=en&isListed=false' },
              React.createElement('img', { src: '/static/img/landing-page-lifestyle/sports1.jpg', className: 'img-responsive' })
            )
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            'div',
            { className: `top-selling-img ${styles['flex']} ${styles['p-35']} ${styles['bg-white']}` },
            React.createElement(
              'a',
              { href: 'http://localhost:3000/SAU/en/srp?search=table%20tennis&language=en&isListed=false' },
              React.createElement('img', { src: '/static/img/landing-page-lifestyle/sports2.jpg', className: 'img-responsive' })
            )
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            'div',
            { className: `top-selling-img ${styles['flex']} ${styles['p-35']} ${styles['bg-white']}` },
            React.createElement(
              'a',
              { href: 'http://localhost:3000/SAU/en/srp?search=lawn%20tennis&language=en&isListed=false' },
              React.createElement('img', { src: '/static/img/landing-page-lifestyle/sports3.jpg', className: 'img-responsive' })
            )
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            'div',
            { className: `top-selling-img ${styles['flex']} ${styles['p-35']} ${styles['bg-white']}` },
            React.createElement(
              'a',
              { href: 'http://localhost:3000/SAU/en/srp?search=cricket&language=en&isListed=false' },
              React.createElement('img', { src: '/static/img/landing-page-lifestyle/sports4.jpg', className: 'img-responsive' })
            )
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            'div',
            { className: `top-selling-img ${styles['flex']} ${styles['p-35']} ${styles['bg-white']}` },
            React.createElement(
              'a',
              { href: 'http://localhost:3000/SAU/en/srp?search=basketball&language=en&isListed=false' },
              React.createElement('img', { src: '/static/img/landing-page-lifestyle/sports5.jpg', className: 'img-responsive' })
            )
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
              React.createElement(
                'a',
                { href: 'http://localhost:3000/SAU/en/srp?search=coins&language=en&isListed=false' },
                React.createElement('img', { src: '/static/img/landing-page-lifestyle/hobby5.jpg', className: 'img-responsive' })
              )
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
              React.createElement(
                'a',
                { href: 'http://localhost:3000/SAU/en/srp?search=Crafts&language=en&isListed=false' },
                React.createElement('img', { src: '/static/img/landing-page-lifestyle/hobby1.jpg', className: 'img-responsive' })
              )
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
              React.createElement(
                'a',
                { href: 'http://localhost:3000/SAU/en/srp?search=Sewing&language=en&isListed=false' },
                React.createElement('img', { src: '/static/img/landing-page-lifestyle/hobby2.jpg', className: 'img-responsive' })
              )
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
              React.createElement(
                'a',
                { href: 'http://localhost:3000/SAU/en/srp?search=Antiques&language=en&isListed=false' },
                React.createElement('img', { src: '/static/img/landing-page-lifestyle/hobby3.jpg', className: 'img-responsive' })
              )
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
              React.createElement(
                'a',
                { href: 'http://localhost:3000/SAU/en/srp?search=Toys&language=en&isListed=false' },
                React.createElement('img', { src: '/static/img/landing-page-lifestyle/hobby4.jpg', className: 'img-responsive' })
              )
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
              React.createElement(
                'a',
                { href: 'http://localhost:3000/SAU/en/srp?search=Photography&language=en&isListed=false' },
                React.createElement('img', { src: '/static/img/landing-page-lifestyle/hobby5.jpg', className: 'img-responsive' })
              )
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
        React.createElement(
          'a',
          { href: 'http://localhost:3000/SAU/en/srp/beauty-&-personal-care?categoryTree=true&isListed=false&sid=932,958' },
          React.createElement('img', { src: '/static/img/landing-page-lifestyle/health-but.jpg', className: 'img-responsive' })
        )
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
        React.createElement(
          'a',
          { href: 'http://localhost:3000/SAU/en/srp?search=Grooming&language=en&isListed=false' },
          React.createElement('img', { src: '/static/img/landing-page-lifestyle/health-but1.jpg', className: 'img-responsive' })
        )
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
        React.createElement(
          'a',
          { href: 'http://localhost:3000/SAU/en/srp/baby-care?categoryTree=true&isListed=false&sid=932,955' },
          React.createElement('img', { src: '/static/img/landing-page-lifestyle/health-but2.jpg', className: 'img-responsive' })
        )
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
            React.createElement(
              'a',
              { href: 'http://localhost:3000/SAU/en/srp?search=shoe%20mart&language=en&isListed=false' },
              React.createElement('img', { src: '/static/img/landing-page-lifestyle/popular5.jpg', className: 'img-responsive' })
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
              'a',
              { href: 'http://localhost:3000/SAU/en/srp?search=babyshop&language=en&isListed=false' },
              React.createElement('img', { src: '/static/img/landing-page-lifestyle/popular1.jpg', className: 'img-responsive' })
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
              'a',
              { href: 'http://localhost:3000/SAU/en/srp?search=max&language=en&isListed=false' },
              React.createElement('img', { src: '/static/img/landing-page-lifestyle/popular2.jpg', className: 'img-responsive' })
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
              'a',
              { href: 'http://localhost:3000/SAU/en/srp?search=splash&language=en&isListed=false' },
              React.createElement('img', { src: '/static/img/landing-page-lifestyle/popular3.jpg', className: 'img-responsive' })
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
              'a',
              { href: 'http://localhost:3000/SAU/en/srp?search=centrepoint&language=en&isListed=false' },
              React.createElement('img', { src: '/static/img/landing-page-lifestyle/popular4.jpg', className: 'img-responsive' })
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
              'a',
              { href: 'http://localhost:3000/SAU/en/srp?search=shoe%20mart&language=en&isListed=false' },
              React.createElement('img', { src: '/static/img/landing-page-lifestyle/popular5.jpg', className: 'img-responsive' })
            )
          )
        )
      )
    )
  )
);