

const Electronics = () => React.createElement(
  "div",
  { className: "electronics-main-part" },
  React.createElement(
    Grid,
    null,
    React.createElement(
      "div",
      { className: "main-banner" },
      React.createElement(
        "a",
        { href: "#" },
        React.createElement("img", { src: `/static/img/landing-page-tech-img/${lang === 'en' ? 'appliances' : 'appliances-ar'}.jpg`, className: "img-responsive" })
      )
    ),
    React.createElement(
      Row,
      { className: `${styles['m-0']} ${styles['pt-10']}` },
      React.createElement(
        "div",
        { className: "popular-cat-part" },
        React.createElement(
          "h4",
          { className: `${styles['fontW600']} ${styles['text-uppercase']}` },
          React.createElement(
            "span",
            { className: `populat-cat-title ${styles['bdr-btm-green-color']}` },
            "Popular"
          ),
          " Categories"
        ),
        React.createElement(
          "div",
          { className: `${styles['flex']} popular-cat-part-sub ${styles['pt-20']} ${styles['pb-20']}` },
          React.createElement(
            "div",
            { className: `popular-cat-part-inn ${styles['mr-35']}` },
            React.createElement(
              "div",
              { className: "popular-cat-inn-img" },
              React.createElement(
                "a",
                { href: "/SAU/en/srp/mobiles?categoryTree=true&isListed=false&sid=848,849" },
                React.createElement("img", { src: "/static/img/landing-page-tech-img/popular-cat.png", className: "img-responsive" })
              )
            ),
            React.createElement(
              "div",
              { className: `${styles['flex-center']} ${styles['flex-colum']}` },
              React.createElement(
                "span",
                { className: styles['fs-12'] },
                "Mobiles"
              ),
              React.createElement(
                "span",
                { className: styles['fontW600'] },
                "UP to 35% Off"
              )
            )
          ),
          React.createElement(
            "div",
            { className: `popular-cat-part-inn-1 ${styles['mr-35']}` },
            React.createElement(
              "div",
              { className: "popular-cat-inn-img" },
              React.createElement(
                "a",
                { href: "/SAU/en/srp/televisions?categoryTree=true&isListed=false&sid=848,878" },
                React.createElement("img", { src: "/static/img/landing-page-tech-img/popular-cat1.png", className: "img-responsive" })
              )
            ),
            React.createElement(
              "div",
              { className: `${styles['flex-center']} ${styles['flex-colum']}` },
              React.createElement(
                "span",
                { className: styles['fs-12'] },
                "Televisions"
              ),
              React.createElement(
                "span",
                { className: styles['fontW600'] },
                "UP to 25% Off"
              )
            )
          ),
          React.createElement(
            "div",
            { className: `popular-cat-part-inn
             ${styles['mr-35']}` },
            React.createElement(
              "div",
              { className: "popular-cat-inn-img" },
              React.createElement(
                "a",
                { href: "/SAU/en/srp/laptops?categoryTree=true&isListed=false&sid=848,864" },
                React.createElement("img", { src: "/static/img/landing-page-tech-img/popular-cat2.png", className: "img-responsive" })
              )
            ),
            React.createElement(
              "div",
              { className: `${styles['flex-center']} ${styles['flex-colum']}` },
              React.createElement(
                "span",
                { className: styles['fs-12'] },
                "Laptop"
              ),
              React.createElement(
                "span",
                { className: styles['fontW600'] },
                "UP to 25% Off"
              )
            )
          ),
          React.createElement(
            "div",
            { className: `popular-cat-part-inn ${styles['mr-35']}` },
            React.createElement(
              "div",
              { className: "popular-cat-inn-img" },
              React.createElement(
                "a",
                { href: "/SAU/en/srp/tablets?categoryTree=true&isListed=false&sid=848,877" },
                React.createElement("img", { src: "/static/img/landing-page-tech-img/popular-cat3.png", className: "img-responsive" })
              )
            ),
            React.createElement(
              "div",
              { className: `${styles['flex-center']} ${styles['flex-colum']}` },
              React.createElement(
                "span",
                { className: styles['fs-12'] },
                "Tablets"
              ),
              React.createElement(
                "span",
                { className: styles['fontW600'] },
                "UP to 15% Off"
              )
            )
          ),
          React.createElement(
            "div",
            { className: "popular-cat-part-inn" },
            React.createElement(
              "div",
              { className: "popular-cat-inn-img" },
              React.createElement(
                "a",
                { href: "/SAU/en/srp/camera?categoryTree=true&isListed=false&sid=848,882" },
                React.createElement("img", { src: "/static/img/landing-page-tech-img/popular-cat4.png", className: "img-responsive" })
              )
            ),
            React.createElement(
              "div",
              { className: `${styles['flex-center']} ${styles['flex-colum']}` },
              React.createElement(
                "span",
                { className: styles['fs-12'] },
                "Cameras"
              ),
              React.createElement(
                "span",
                { className: styles['fontW600'] },
                "UP to 15% Off"
              )
            )
          ),
          React.createElement(
            "div",
            { className: `popular-cat-part-inn ${styles['mr-35']}` },
            React.createElement(
              "div",
              { className: "popular-cat-inn-img" },
              React.createElement(
                "a",
                { href: "/SAU/en/srp/gaming-&-accessories?categoryTree=true&isListed=false&sid=848,866" },
                React.createElement("img", { src: "/static/img/landing-page-tech-img/popular-cat5.png", className: "img-responsive" })
              )
            ),
            React.createElement(
              "div",
              { className: `${styles['flex-center']} ${styles['flex-colum']}` },
              React.createElement(
                "span",
                { className: styles['fs-12'] },
                "Gaming"
              ),
              React.createElement(
                "span",
                { className: styles['fontW600'] },
                "UP to 35% Off"
              )
            )
          ),
          React.createElement(
            "div",
            { className: `popular-cat-part-inn ${styles['mr-35']}` },
            React.createElement(
              "div",
              { className: "popular-cat-inn-img" },
              React.createElement(
                "a",
                { href: "/SAU/en/srp/mobile-accessories?categoryTree=true&isListed=false&sid=848,850" },
                React.createElement("img", { src: "/static/img/landing-page-tech-img/popular-cat6.png", className: "img-responsive" })
              )
            ),
            React.createElement(
              "div",
              { className: `${styles['flex-center']} ${styles['flex-colum']}` },
              React.createElement(
                "span",
                { className: styles['fs-12'] },
                "Mobile Accessories"
              ),
              React.createElement(
                "span",
                { className: styles['fontW600'] },
                "UP to 35% Off"
              )
            )
          ),
          React.createElement(
            "div",
            { className: `popular-cat-part-inn ${styles['mr-35']}` },
            React.createElement(
              "div",
              { className: "popular-cat-inn-img" },
              React.createElement(
                "a",
                { href: "/SAU/en/srp/health-care?categoryTree=true&isListed=false&sid=932,972" },
                React.createElement("img", { src: "/static/img/landing-page-tech-img/popular-cat7.png", className: "img-responsive" })
              )
            ),
            React.createElement(
              "div",
              { className: `${styles['flex-center']} ${styles['flex-colum']}` },
              React.createElement(
                "span",
                { className: styles['fs-12'] },
                "Personal & Health Care"
              ),
              React.createElement(
                "span",
                { className: styles['fontW600'] },
                "UP to 35% Off"
              )
            )
          ),
          React.createElement(
            "div",
            { className: `popular-cat-part-inn ${styles['mr-35']}` },
            React.createElement(
              "div",
              { className: "popular-cat-inn-img" },
              React.createElement(
                "a",
                { href: "/SAU/en/srp/home-applaince?categoryTree=true&isListed=false&sid=932,935" },
                React.createElement("img", { src: "/static/img/landing-page-tech-img/popular-cat8.png", className: "img-responsive" })
              )
            ),
            React.createElement(
              "div",
              { className: `${styles['flex-center']} ${styles['flex-colum']}` },
              React.createElement(
                "span",
                { className: styles['fs-12'] },
                "Home Appliances"
              ),
              React.createElement(
                "span",
                { className: styles['fontW600'] },
                "UP to 35% Off"
              )
            )
          ),
          React.createElement(
            "div",
            { className: "popular-cat-part-inn-1" },
            React.createElement(
              "div",
              { className: "popular-cat-inn-img" },
              React.createElement(
                "a",
                { href: "/SAU/en/srp/home-entertainment?categoryTree=true&isListed=false&sid=848,879" },
                React.createElement("img", { src: "/static/img/landing-page-tech-img/popular-cat9.png", className: "img-responsive" })
              )
            ),
            React.createElement(
              "div",
              { className: `${styles['flex-center']} ${styles['flex-colum']}` },
              React.createElement(
                "span",
                { className: styles['fs-12'] },
                "Home Entertainment"
              ),
              React.createElement(
                "span",
                { className: styles['fontW600'] },
                "UP to 35% Off"
              )
            )
          )
        )
      ),
      React.createElement(
        "div",
        { className: `brand-part ${styles['flex']} ${styles['pt-20']} ${styles['pb-20']}` },
        React.createElement(
          Col,
          { md: 4, className: styles['pl-0'] },
          React.createElement(
            "h4",
            { className: styles['fontW600'] },
            React.createElement(
              "span",
              { className: `populat-cat-title ${styles['bdr-btm-green-color']}` },
              "NEW"
            )
          ),
          React.createElement(
            "div",
            { className: `${styles['mt-20']} ${styles['relative']} brand-part-inn` },
            React.createElement(
              "a",
              { href: "/SAU/en/srp?search=samsung&language=en&isListed=false" },
              React.createElement("img", { src: "/static/img/landing-page-tech-img/samsung.jpg", className: "img-responsive" })
            ),
            React.createElement(
              "div",
              { className: `${styles['absolute']} price-details ${styles['flex']} ${styles['flex-colum']}` },
              React.createElement(
                "span",
                { className: `${styles['fs-22']} ${styles['fontW300']}` },
                "Samsung Curve"
              ),
              React.createElement(
                "span",
                { className: `${styles['fontW600']} ${styles['flex']}` },
                React.createElement(
                  "span",
                  { className: styles['fs-40'] },
                  "375"
                ),
                React.createElement(
                  "span",
                  { className: styles['fs-24'] },
                  "SAR"
                )
              )
            )
          )
        ),
        React.createElement(
          Col,
          { md: 4, className: styles['pl-0'] },
          React.createElement(
            "h4",
            { className: `${styles['fontW600']} ${styles['text-uppercase']}` },
            React.createElement(
              "span",
              { className: `populat-cat-title ${styles['bdr-btm-green-color']}` },
              "Exclusive"
            ),
            " "
          ),
          React.createElement(
            "div",
            { className: `${styles['mt-20']} ${styles['relative']} brand-part-inn` },
            React.createElement(
              "a",
              { href: "/SAU/en/srp?search=MI%20A1&language=en&isListed=false" },
              React.createElement("img", { src: "/static/img/landing-page-tech-img/mi-brand-img.jpg", className: "img-responsive" })
            ),
            React.createElement(
              "div",
              { className: `${styles['absolute']} price-details ${styles['flex']} ${styles['flex-colum']} ${styles['white-color']}` },
              React.createElement(
                "span",
                { className: `${styles['fs-22']} ${styles['fontW300']}` },
                "MI A1"
              ),
              React.createElement(
                "span",
                { className: `${styles['fontW600']} ${styles['flex']}` },
                React.createElement(
                  "span",
                  { className: styles['fs-40'] },
                  "120"
                ),
                React.createElement(
                  "span",
                  { className: styles['fs-24'] },
                  "SAR"
                )
              )
            )
          )
        ),
        React.createElement(
          Col,
          { md: 4, className: styles['pl-0'] },
          React.createElement(
            "h4",
            { className: `${styles['fontW600']}` },
            React.createElement(
              "span",
              { className: `populat-cat-title ${styles['bdr-btm-green-color']} ${styles['text-uppercase']}` },
              "Apple"
            ),
            "  - Its always a good idea!"
          ),
          React.createElement(
            "div",
            { className: `${styles['mt-20']} ${styles['relative']} brand-part-inn` },
            React.createElement(
              "a",
              { href: "/SAU/en/srp?search=apple&language=en&isListed=false" },
              React.createElement("img", { src: "/static/img/landing-page-tech-img/apple-brand-img.jpg", className: "img-responsive" })
            ),
            React.createElement(
              "div",
              { className: `${styles['absolute']} price-details ${styles['flex']} ${styles['flex-colum']} ${styles['white-color']}` },
              React.createElement(
                "span",
                { className: `${styles['fs-22']} ${styles['fontW300']}` },
                "Apple"
              ),
              React.createElement(
                "span",
                { className: `${styles['fontW600']} ${styles['flex']}` },
                React.createElement(
                  "span",
                  { className: styles['fs-40'] },
                  "375"
                ),
                React.createElement(
                  "span",
                  { className: styles['fs-24'] },
                  "SAR"
                )
              )
            )
          )
        )
      ),
      React.createElement(
        "div",
        { className: styles['flex'] },
        React.createElement(
          Col,
          { md: 6, className: styles['pl-0'] },
          React.createElement(
            "h4",
            { className: `${styles['fontW600']} ${styles['text-uppercase']} ${styles['pb-10']}` },
            React.createElement(
              "span",
              { className: `populat-cat-title ${styles['bdr-btm-green-color']}` },
              "Gaming  "
            ),
            "  Consoles"
          ),
          React.createElement(
            "div",
            null,
            React.createElement(
              "a",
              { href: "/SAU/en/srp/gaming-console?categoryTree=true&isListed=false&sid=848,866,870" },
              React.createElement("img", { src: "/static/img/landing-page-tech-img/gaming-img.jpg", className: "img-responsive" })
            )
          )
        ),
        React.createElement(
          Col,
          { md: 6, className: styles['pr-0'] },
          React.createElement(
            "h4",
            { className: `${styles['fontW600']} ${styles['text-uppercase']} ${styles['pb-10']}` },
            React.createElement(
              "span",
              { className: `populat-cat-title ${styles['bdr-btm-green-color']}` },
              "RC Toys"
            ),
            " "
          ),
          React.createElement(
            "div",
            null,
            React.createElement(
              "a",
              { href: "/SAU/en/srp/gaming-&-accessories?categoryTree=true&isListed=false&sid=848,866" },
              React.createElement("img", { src: "/static/img/landing-page-tech-img/gaming-img1.jpg", className: "img-responsive" })
            )
          )
        )
      ),
      React.createElement(
        "div",
        { className: "home-kitchan-part" },
        React.createElement(
          "h4",
          { className: `${styles['fontW600']} ${styles['text-uppercase']} ${styles['pb-10']}` },
          React.createElement(
            "span",
            { className: `populat-cat-title ${styles['bdr-btm-green-color']}` },
            "Home & Kitchen  "
          ),
          "  Appliances"
        ),
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            "div",
            { className: `${styles['mt-20']} ${styles['relative']} ${styles['home-kitchan-inn']}` },
            React.createElement(
              "a",
              { href: "/SAU/en/srp?search=Iron&language=en&isListed=false" },
              React.createElement("img", { src: "/static/img/landing-page-tech-img/home-kitchen1.jpg", className: "img-responsive" })
            ),
            React.createElement(
              "div",
              { className: `${styles['absolute']} home-price-details ${styles['white-color']} ${styles['flex']} ${styles['flex-colum']}` },
              React.createElement(
                "span",
                { className: `${styles['fs-18']} ${styles['fontW300']}` },
                "Irons"
              ),
              React.createElement(
                "span",
                { className: `${styles['fontW600']} ${styles['fs-18']}` },
                "50 SAR"
              ),
              React.createElement(
                "span",
                { className: `${styles['fontW600']} ${styles['fs-12']}` },
                "ONWARDS"
              )
            )
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            "div",
            { className: `${styles['mt-20']} ${styles['relative']} ${styles['home-kitchan-inn']}` },
            React.createElement(
              "a",
              { href: "/SAU/en/srp/refrigerators?categoryTree=true&isListed=false&sid=932,945,2263" },
              React.createElement("img", { src: "/static/img/landing-page-tech-img/home-kitchen.jpg", className: "img-responsive" })
            ),
            React.createElement(
              "div",
              { className: `${styles['absolute']} home-price-details ${styles['white-color']} ${styles['flex']} ${styles['flex-colum']}` },
              React.createElement(
                "span",
                { className: `${styles['fs-18']} ${styles['fontW300']}` },
                "Refrigerators"
              ),
              React.createElement(
                "span",
                { className: `${styles['fontW600']} ${styles['fs-18']}` },
                "50 SAR"
              ),
              React.createElement(
                "span",
                { className: `${styles['fontW600']} ${styles['fs-12']}` },
                "ONWARDS"
              )
            )
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            "div",
            { className: `${styles['mt-20']} ${styles['relative']} ${styles['home-kitchan-inn']}` },
            React.createElement(
              "a",
              { href: "/SAU/en/srp/mixer-grinder-juicers?categoryTree=true&isListed=false&sid=932,945,2259" },
              React.createElement("img", { src: "/static/img/landing-page-tech-img/home-kitchen2.jpg", className: "img-responsive" })
            ),
            React.createElement(
              "div",
              { className: `${styles['absolute']} home-price-details ${styles['white-color']} ${styles['flex']} ${styles['flex-colum']}` },
              React.createElement(
                "span",
                { className: `${styles['fs-18']} ${styles['fontW300']}` },
                "Mixer & Juicers"
              ),
              React.createElement(
                "span",
                { className: `${styles['fontW600']} ${styles['fs-18']}` },
                "50 SAR"
              ),
              React.createElement(
                "span",
                { className: `${styles['fontW600']} ${styles['fs-12']}` },
                "ONWARDS"
              )
            )
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            "div",
            { className: `${styles['mt-20']} ${styles['relative']} ${styles['home-kitchan-inn']}` },
            React.createElement(
              "a",
              { href: "/SAU/en/srp/washing-machines?categoryTree=true&isListed=false&sid=932,935,2270" },
              React.createElement("img", { src: "/static/img/landing-page-tech-img/home-kitchen3.jpg", className: "img-responsive" })
            ),
            React.createElement(
              "div",
              { className: `${styles['absolute']} home-price-details ${styles['white-color']} ${styles['flex']} ${styles['flex-colum']}` },
              React.createElement(
                "span",
                { className: `${styles['fs-18']} ${styles['fontW300']}` },
                "Washing Machines"
              ),
              React.createElement(
                "span",
                { className: `${styles['fontW600']} ${styles['fs-18']}` },
                "50 SAR"
              ),
              React.createElement(
                "span",
                { className: `${styles['fontW600']} ${styles['fs-12']}` },
                "ONWARDS"
              )
            )
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            "div",
            { className: `${styles['mt-20']} ${styles['relative']} ${styles['home-kitchan-inn']}` },
            React.createElement(
              "a",
              { href: "/SAU/en/srp?search=Vaccum%20Cleaners&language=en&isListed=false" },
              React.createElement("img", { src: "/static/img/landing-page-tech-img/home-kitchen4.jpg", className: "img-responsive" })
            ),
            React.createElement(
              "div",
              { className: `${styles['absolute']} home-price-details ${styles['white-color']} ${styles['flex']} ${styles['flex-colum']}` },
              React.createElement(
                "span",
                { className: `${styles['fs-18']} ${styles['fontW300']}` },
                "Vaccum Cleaners"
              ),
              React.createElement(
                "span",
                { className: `${styles['fontW600']} ${styles['fs-18']}` },
                "50 SAR"
              ),
              React.createElement(
                "span",
                { className: `${styles['fontW600']} ${styles['fs-12']}` },
                "ONWARDS"
              )
            )
          )
        ),
        React.createElement(
          Col,
          { md: 2, className: styles['pl-0'] },
          React.createElement(
            "div",
            { className: `${styles['mt-20']} ${styles['relative']} ${styles['home-kitchan-inn']}` },
            React.createElement(
              "a",
              { href: "/SAU/en/srp?search=Iron&language=en&isListed=false" },
              React.createElement("img", { src: "/static/img/landing-page-tech-img/home-kitchen1.jpg", className: "img-responsive" })
            ),
            React.createElement(
              "div",
              { className: `${styles['absolute']} home-price-details ${styles['white-color']} ${styles['flex']} ${styles['flex-colum']}` },
              React.createElement(
                "span",
                { className: `${styles['fs-18']} ${styles['fontW300']}` },
                "Irons"
              ),
              React.createElement(
                "span",
                { className: `${styles['fontW600']} ${styles['fs-18']}` },
                "50 SAR"
              ),
              React.createElement(
                "span",
                { className: `${styles['fontW600']} ${styles['fs-12']}` },
                "ONWARDS"
              )
            )
          )
        )
      ),
      React.createElement(
        "div",
        { className: `brands-love-part ${styles['pt-30']} ${styles['pb-30']} ${styles['clear-b']}` },
        React.createElement(
          "h4",
          { className: `${styles['fontW600']} ${styles['text-uppercase']}` },
          React.createElement(
            "span",
            { className: `populat-cat-title ${styles['bdr-btm-green-color']}` },
            "Brands "
          ),
          "  you love"
        ),
        React.createElement(
          "div",
          { className: styles['mt-25'] },
          React.createElement(
            Col,
            { md: 2, className: styles['pl-0'] },
            React.createElement(
              "div",
              { className: `brands-inn ${styles['flex-center']} ${styles['justify-center']} ${styles['bg-white']}` },
              React.createElement(
                "a",
                { href: "/SAU/en/srp?search=apple&language=en&isListed=false" },
                React.createElement("img", { src: "/static/img/landing-page-tech-img/brands5.jpg", className: "brand-apple" })
              )
            ),
            React.createElement(
              "div",
              { className: `${styles['flex']} ${styles['flex-wrp']} brand-litem-list ${styles['fs-10']}` },
              React.createElement(
                "span",
                null,
                "Mac"
              ),
              React.createElement(
                "span",
                null,
                "iPhone"
              ),
              React.createElement(
                "span",
                null,
                "iPad"
              ),
              React.createElement(
                "span",
                null,
                "Watch"
              ),
              React.createElement(
                "span",
                null,
                "Tv"
              )
            )
          ),
          React.createElement(
            Col,
            { md: 2, className: styles['pl-0'] },
            React.createElement(
              "div",
              { className: `brands-inn ${styles['flex-center']} ${styles['justify-center']} ${styles['bg-white']}` },
              React.createElement(
                "a",
                { href: "/SAU/en/srp?search=samsung&language=en&isListed=false" },
                React.createElement("img", { src: "/static/img/landing-page-tech-img/brands.jpg", className: "brand-samsung" })
              )
            ),
            React.createElement(
              "div",
              { className: `${styles['flex']} ${styles['flex-wrp']} brand-litem-list ${styles['fs-10']}` },
              React.createElement(
                "span",
                null,
                "Mobiles"
              ),
              React.createElement(
                "span",
                null,
                "Tablets"
              ),
              React.createElement(
                "span",
                null,
                "Audio & Video"
              ),
              React.createElement(
                "span",
                null,
                "Watch"
              ),
              React.createElement(
                "span",
                null,
                "Tv"
              )
            )
          ),
          React.createElement(
            Col,
            { md: 2, className: styles['pl-0'] },
            React.createElement(
              "div",
              { className: `brands-inn ${styles['flex-center']} ${styles['justify-center']} ${styles['bg-white']}` },
              React.createElement(
                "a",
                { href: "/SAU/en/srp?search=sony&language=en&isListed=false" },
                React.createElement("img", { src: "/static/img/landing-page-tech-img/brands1.jpg", className: "brand-samsung" })
              )
            ),
            React.createElement(
              "div",
              { className: `${styles['flex']} ${styles['flex-wrp']} brand-litem-list ${styles['fs-10']}` },
              React.createElement(
                "span",
                null,
                "Mobiles"
              ),
              React.createElement(
                "span",
                null,
                "Tablets"
              ),
              React.createElement(
                "span",
                null,
                "Audio & Video"
              ),
              React.createElement(
                "span",
                null,
                "Cameras"
              ),
              React.createElement(
                "span",
                null,
                "Tv"
              ),
              React.createElement(
                "span",
                null,
                "Laptops"
              )
            )
          ),
          React.createElement(
            Col,
            { md: 2, className: styles['pl-0'] },
            React.createElement(
              "div",
              { className: `brands-inn ${styles['flex-center']} ${styles['justify-center']} ${styles['bg-white']}` },
              React.createElement(
                "a",
                { href: "/SAU/en/srp?search=LG&language=en&isListed=false" },
                React.createElement("img", { src: "/static/img/landing-page-tech-img/brands2.jpg", className: "brand-lg" })
              )
            ),
            React.createElement(
              "div",
              { className: `${styles['flex']} ${styles['flex-wrp']} brand-litem-list ${styles['fs-10']}` },
              React.createElement(
                "span",
                null,
                "Mobiles"
              ),
              React.createElement(
                "span",
                null,
                "Tablets"
              ),
              React.createElement(
                "span",
                null,
                "Audio & Video"
              ),
              React.createElement(
                "span",
                null,
                "Cameras"
              ),
              React.createElement(
                "span",
                null,
                "Tv"
              ),
              React.createElement(
                "span",
                null,
                "Power Banks"
              )
            )
          ),
          React.createElement(
            Col,
            { md: 2, className: styles['pl-0'] },
            React.createElement(
              "div",
              { className: `brands-inn ${styles['flex-center']} ${styles['justify-center']} ${styles['bg-white']}` },
              React.createElement(
                "a",
                { href: "/SAU/en/srp?search=dell&language=en&isListed=false" },
                React.createElement("img", { src: "/static/img/landing-page-tech-img/brands3.jpg", className: "brand-dell" })
              )
            ),
            React.createElement(
              "div",
              { className: `${styles['flex']} ${styles['flex-wrp']} brand-litem-list ${styles['fs-10']}` },
              React.createElement(
                "span",
                null,
                "Laptops"
              ),
              React.createElement(
                "span",
                null,
                "Personal Computers"
              )
            )
          ),
          React.createElement(
            Col,
            { md: 2, className: styles['pl-0'] },
            React.createElement(
              "div",
              { className: `brands-inn ${styles['flex-center']} ${styles['justify-center']} ${styles['bg-white']}` },
              React.createElement(
                "a",
                { href: "/SAU/en/srp?search=mi&language=en&isListed=false" },
                React.createElement("img", { src: "/static/img/landing-page-tech-img/brands4.jpg", className: "brand-mi" })
              )
            ),
            React.createElement(
              "div",
              { className: `${styles['flex']} ${styles['flex-wrp']} brand-litem-list ${styles['fs-10']}` },
              React.createElement(
                "span",
                null,
                "Mobiles"
              ),
              React.createElement(
                "span",
                null,
                "Tablets"
              ),
              React.createElement(
                "span",
                null,
                "Audio & Video"
              ),
              React.createElement(
                "span",
                null,
                "Cameras"
              ),
              React.createElement(
                "span",
                null,
                "Tv"
              ),
              React.createElement(
                "span",
                null,
                "Power Banks"
              )
            )
          )
        )
      )
    )
  )
);