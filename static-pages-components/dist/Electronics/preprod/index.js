

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
        { href: `/${lang}/search?q=electronics&isListed=true` },
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
                { href: `/${lang}/${lang === 'en' ? 'mobiles' : 'الهواتف-النقالة'}/clp` },
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
                { href: `/${lang}/${lang === 'en' ? 'televisions' : 'التلفزيونات'}/clp` },
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
                { href: `/${lang}/${lang === 'en' ? 'laptops' : 'أجهزة-الكمبيوتر-المحمولة'}/clp` },
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
                { href: `/${lang}/${lang === 'en' ? 'Tablets' : 'اجهزة تابلت وايباد'}/clp` },
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
                { href: `/${lang}/${lang === 'en' ? 'camera' : 'الة-تصوير'}/clp` },
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
                { href: `/${lang}/${lang === 'en' ? 'gaming' : 'الة-تصوير'}/clp` },
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
                { href: `/${lang}/${lang === 'en' ? 'mobile-accessories' : 'ملحقات-الهاتف-المحمول'}/clp` },
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
                { href: `/${lang}/${lang === 'en' ? 'health-care' : 'ملحقات-الهاتف-المحمول'}/clp` },
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
                { href: `/${lang}/${lang === 'en' ? 'Home Appliances' : 'أجهزة المنزل'}/clp` },
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
                { href: `/${lang}/${lang === 'en' ? 'Home Entertainment' : 'أجهزة ترفيهية'}/clp` },
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
              { href: `/${lang}/Samsung%20Curve%20TV/clp` },
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
              { href: `/${lang}/MI%20A1/clp` },
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
              { href: `/${lang}/srp/${lang === 'en' ? 'Apple' : 'ابل'}/search?q=Apple` },
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
              { href: `/${lang}/Gaming%20Console/clp` },
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
              { href: `/${lang}/Remote%20Control%20Toys/clp` },
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
              { href: `/${lang}/Iron%20box/clp` },
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
              { href: `/${lang}/search?q=Refrigerators&isListed=true` },
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
              { href: `/${lang}/Mixer%20and%20Juicer/clp` },
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
              { href: `/${lang}/search?q=washing%20Machines&isListed=true` },
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
              { href: `/${lang}/search?q=Vaccum%20Cleaners&isListed=true` },
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
              { href: `/${lang}/Iron%20box/clp` },
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
      )
    )
  )
);