

const Electronics = () => (
  <div className="electronics-main-part">
    <Grid>
      <div className="main-banner">
        <a href='#'>
          <img src={`/static/img/landing-page-tech-img/${lang === 'en' ? 'appliances' : 'appliances-ar'}.jpg`} className="img-responsive" />
        </a>
      </div>
      <Row className={`${styles['m-0']} ${styles['pt-10']}`}>
        {/* Popular Categories start */}
        <div className="popular-cat-part">
          <h4 className={`${styles['fontW600']} ${styles['text-uppercase']}`}><span className={`populat-cat-title ${styles['bdr-btm-green-color']}`}>Popular</span> Categories</h4>
          <div className={`${styles['flex']} popular-cat-part-sub ${styles['pt-20']} ${styles['pb-20']}`}>
            <div className={`popular-cat-part-inn ${styles['mr-35']}`}>
              <div className="popular-cat-inn-img">
                <a href="/SAU/en/srp/mobiles?categoryTree=true&isListed=false&sid=848,849">
                  <img src="/static/img/landing-page-tech-img/popular-cat.png" className="img-responsive" />
                </a>
              </div>
              <div className={`${styles['flex-center']} ${styles['flex-colum']}`}>
                <span className={styles['fs-12']}>Mobiles</span>
                <span className={styles['fontW600']}>UP to 35% Off</span>
              </div>
            </div>
            <div className={`popular-cat-part-inn-1 ${styles['mr-35']}`}>
              <div className="popular-cat-inn-img">
                <a href="/SAU/en/srp/televisions?categoryTree=true&isListed=false&sid=848,878">
                  <img src="/static/img/landing-page-tech-img/popular-cat1.png" className="img-responsive" />
                </a>
              </div>
              <div className={`${styles['flex-center']} ${styles['flex-colum']}`}>
                <span className={styles['fs-12']}>Televisions</span>
                <span className={styles['fontW600']}>UP to 25% Off</span>
              </div>
            </div>
            <div className={`popular-cat-part-inn
             ${styles['mr-35']}`}>
              <div className="popular-cat-inn-img">
                <a href="/SAU/en/srp/laptops?categoryTree=true&isListed=false&sid=848,864">
                  <img src="/static/img/landing-page-tech-img/popular-cat2.png" className="img-responsive" />
                </a>
              </div>
              <div className={`${styles['flex-center']} ${styles['flex-colum']}`}>
                <span className={styles['fs-12']}>Laptop</span>
                <span className={styles['fontW600']}>UP to 25% Off</span>
              </div>
            </div>
            <div className={`popular-cat-part-inn ${styles['mr-35']}`}>
              <div className="popular-cat-inn-img">
                <a href="/SAU/en/srp/tablets?categoryTree=true&isListed=false&sid=848,877">
                  <img src="/static/img/landing-page-tech-img/popular-cat3.png" className="img-responsive" />
                </a>
              </div>
              <div className={`${styles['flex-center']} ${styles['flex-colum']}`}>
                <span className={styles['fs-12']}>Tablets</span>
                <span className={styles['fontW600']}>UP to 15% Off</span>
              </div>
            </div>
            <div className="popular-cat-part-inn">
              <div className="popular-cat-inn-img">
                <a href="/SAU/en/srp/camera?categoryTree=true&isListed=false&sid=848,882">
                  <img src="/static/img/landing-page-tech-img/popular-cat4.png" className="img-responsive" />
                </a>
              </div>
              <div className={`${styles['flex-center']} ${styles['flex-colum']}`}>
                <span className={styles['fs-12']}>Cameras</span>
                <span className={styles['fontW600']}>UP to 15% Off</span>
              </div>
            </div>
            <div className={`popular-cat-part-inn ${styles['mr-35']}`}>
              <div className="popular-cat-inn-img">
                <a href="/SAU/en/srp/gaming-&-accessories?categoryTree=true&isListed=false&sid=848,866">
                  <img src="/static/img/landing-page-tech-img/popular-cat5.png" className="img-responsive" />
                </a>
              </div>
              <div className={`${styles['flex-center']} ${styles['flex-colum']}`}>
                <span className={styles['fs-12']}>Gaming</span>
                <span className={styles['fontW600']}>UP to 35% Off</span>
              </div>
            </div>
            <div className={`popular-cat-part-inn ${styles['mr-35']}`}>
              <div className="popular-cat-inn-img">
                <a href="/SAU/en/srp/mobile-accessories?categoryTree=true&isListed=false&sid=848,850">
                  <img src="/static/img/landing-page-tech-img/popular-cat6.png" className="img-responsive" />
                </a>
              </div>
              <div className={`${styles['flex-center']} ${styles['flex-colum']}`}>
                <span className={styles['fs-12']}>Mobile Accessories</span>
                <span className={styles['fontW600']}>UP to 35% Off</span>
              </div>
            </div>
            <div className={`popular-cat-part-inn ${styles['mr-35']}`}>
              <div className="popular-cat-inn-img">
                <a href="/SAU/en/srp/health-care?categoryTree=true&isListed=false&sid=932,972">
                  <img src="/static/img/landing-page-tech-img/popular-cat7.png" className="img-responsive" />
                </a>
              </div>
              <div className={`${styles['flex-center']} ${styles['flex-colum']}`}>
                <span className={styles['fs-12']}>Personal &amp; Health Care</span>
                <span className={styles['fontW600']}>UP to 35% Off</span>
              </div>
            </div>
            <div className={`popular-cat-part-inn ${styles['mr-35']}`}>
              <div className="popular-cat-inn-img">
                <a href="/SAU/en/srp/home-applaince?categoryTree=true&isListed=false&sid=932,935">
                  <img src="/static/img/landing-page-tech-img/popular-cat8.png" className="img-responsive" />
                </a>
              </div>
              <div className={`${styles['flex-center']} ${styles['flex-colum']}`}>
                <span className={styles['fs-12']}>Home Appliances</span>
                <span className={styles['fontW600']}>UP to 35% Off</span>
              </div>
            </div>
            <div className="popular-cat-part-inn-1">
              <div className="popular-cat-inn-img">
                <a href="/SAU/en/srp/home-entertainment?categoryTree=true&isListed=false&sid=848,879">
                  <img src="/static/img/landing-page-tech-img/popular-cat9.png" className="img-responsive" />
                </a>
              </div>
              <div className={`${styles['flex-center']} ${styles['flex-colum']}`}>
                <span className={styles['fs-12']}>Home Entertainment</span>
                <span className={styles['fontW600']}>UP to 35% Off</span>
              </div>
            </div>

          </div>
        </div>
        {/* brand part stat */}
        <div className={`brand-part ${styles['flex']} ${styles['pt-20']} ${styles['pb-20']}`}>
          <Col md={4} className={styles['pl-0']}>
            <h4 className={styles['fontW600']}><span className={`populat-cat-title ${styles['bdr-btm-green-color']}`}>NEW</span></h4>
            <div className={`${styles['mt-20']} ${styles['relative']} brand-part-inn`}>
              <a href="/SAU/en/srp?search=samsung&language=en&isListed=false">
                <img src="/static/img/landing-page-tech-img/samsung.jpg" className="img-responsive" />
              </a>
              <div className={`${styles['absolute']} price-details ${styles['flex']} ${styles['flex-colum']}`}>
                <span className={`${styles['fs-22']} ${styles['fontW300']}`}>Samsung Curve</span>
                <span className={`${styles['fontW600']} ${styles['flex']}`}><span className={styles['fs-40']}>375</span><span className={styles['fs-24']}>SAR</span></span>
              </div>
            </div>
          </Col>
          <Col md={4} className={styles['pl-0']}>
            <h4 className={`${styles['fontW600']} ${styles['text-uppercase']}`}><span className={`populat-cat-title ${styles['bdr-btm-green-color']}`}>Exclusive</span> </h4>
            <div className={`${styles['mt-20']} ${styles['relative']} brand-part-inn`}>
              <a href="/SAU/en/srp?search=MI%20A1&language=en&isListed=false">
                <img src="/static/img/landing-page-tech-img/mi-brand-img.jpg" className="img-responsive" />
              </a>
              <div className={`${styles['absolute']} price-details ${styles['flex']} ${styles['flex-colum']} ${styles['white-color']}`}>
                <span className={`${styles['fs-22']} ${styles['fontW300']}`}>MI A1</span>
                <span className={`${styles['fontW600']} ${styles['flex']}`}><span className={styles['fs-40']}>120</span><span className={styles['fs-24']}>SAR</span></span>
              </div>
            </div>
          </Col>
          <Col md={4} className={styles['pl-0']}>
            <h4 className={`${styles['fontW600']}`}><span className={`populat-cat-title ${styles['bdr-btm-green-color']} ${styles['text-uppercase']}`}>Apple</span>  - Its always a good idea!</h4>
            <div className={`${styles['mt-20']} ${styles['relative']} brand-part-inn`}>
              <a href="/SAU/en/srp?search=apple&language=en&isListed=false">
                <img src="/static/img/landing-page-tech-img/apple-brand-img.jpg" className="img-responsive" />
              </a>
              <div className={`${styles['absolute']} price-details ${styles['flex']} ${styles['flex-colum']} ${styles['white-color']}`}>
                <span className={`${styles['fs-22']} ${styles['fontW300']}`}>Apple</span>
                <span className={`${styles['fontW600']} ${styles['flex']}`}><span className={styles['fs-40']}>375</span><span className={styles['fs-24']}>SAR</span></span>
              </div>
            </div>
          </Col>
        </div>
        {/* gaming part start */}
        <div className={styles['flex']}>
          <Col md={6} className={styles['pl-0']}>
            <h4 className={`${styles['fontW600']} ${styles['text-uppercase']} ${styles['pb-10']}`}><span className={`populat-cat-title ${styles['bdr-btm-green-color']}`}>Gaming  </span>  Consoles</h4>
            <div>
              <a href="/SAU/en/srp/gaming-console?categoryTree=true&isListed=false&sid=848,866,870">
                <img src="/static/img/landing-page-tech-img/gaming-img.jpg" className="img-responsive" />
              </a>
            </div>
          </Col>
          <Col md={6} className={styles['pr-0']}>
            <h4 className={`${styles['fontW600']} ${styles['text-uppercase']} ${styles['pb-10']}`}><span className={`populat-cat-title ${styles['bdr-btm-green-color']}`}>RC Toys</span> </h4>
            <div>
              <a href="/SAU/en/srp/gaming-&-accessories?categoryTree=true&isListed=false&sid=848,866">
                <img src="/static/img/landing-page-tech-img/gaming-img1.jpg" className="img-responsive" />
              </a>
            </div>
          </Col>
        </div>
        {/* home & kitchen application */}
        <div className="home-kitchan-part">
          <h4 className={`${styles['fontW600']} ${styles['text-uppercase']} ${styles['pb-10']}`}><span className={`populat-cat-title ${styles['bdr-btm-green-color']}`}>Home & Kitchen  </span>  Appliances</h4>
          <Col md={2} className={styles['pl-0']}>
            <div className={`${styles['mt-20']} ${styles['relative']} ${styles['home-kitchan-inn']}`}>
              <a href="/SAU/en/srp?search=Iron&language=en&isListed=false">
                <img src="/static/img/landing-page-tech-img/home-kitchen1.jpg" className="img-responsive" />
              </a>
              <div className={`${styles['absolute']} home-price-details ${styles['white-color']} ${styles['flex']} ${styles['flex-colum']}`}>
                <span className={`${styles['fs-18']} ${styles['fontW300']}`}>Irons</span>
                <span className={`${styles['fontW600']} ${styles['fs-18']}`}>50 SAR</span>
                <span className={`${styles['fontW600']} ${styles['fs-12']}`}>ONWARDS</span>
              </div>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`${styles['mt-20']} ${styles['relative']} ${styles['home-kitchan-inn']}`}>
              <a href="/SAU/en/srp/refrigerators?categoryTree=true&isListed=false&sid=932,945,2263">
                <img src="/static/img/landing-page-tech-img/home-kitchen.jpg" className="img-responsive" />
              </a>
              <div className={`${styles['absolute']} home-price-details ${styles['white-color']} ${styles['flex']} ${styles['flex-colum']}`}>
                <span className={`${styles['fs-18']} ${styles['fontW300']}`}>Refrigerators</span>
                <span className={`${styles['fontW600']} ${styles['fs-18']}`}>50 SAR</span>
                <span className={`${styles['fontW600']} ${styles['fs-12']}`}>ONWARDS</span>
              </div>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`${styles['mt-20']} ${styles['relative']} ${styles['home-kitchan-inn']}`}>
              <a href="/SAU/en/srp/mixer-grinder-juicers?categoryTree=true&isListed=false&sid=932,945,2259">
                <img src="/static/img/landing-page-tech-img/home-kitchen2.jpg" className="img-responsive" />
              </a>
              <div className={`${styles['absolute']} home-price-details ${styles['white-color']} ${styles['flex']} ${styles['flex-colum']}`}>
                <span className={`${styles['fs-18']} ${styles['fontW300']}`}>Mixer & Juicers</span>
                <span className={`${styles['fontW600']} ${styles['fs-18']}`}>50 SAR</span>
                <span className={`${styles['fontW600']} ${styles['fs-12']}`}>ONWARDS</span>
              </div>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`${styles['mt-20']} ${styles['relative']} ${styles['home-kitchan-inn']}`}>
              <a href="/SAU/en/srp/washing-machines?categoryTree=true&isListed=false&sid=932,935,2270">
                <img src="/static/img/landing-page-tech-img/home-kitchen3.jpg" className="img-responsive" />
              </a>
              <div className={`${styles['absolute']} home-price-details ${styles['white-color']} ${styles['flex']} ${styles['flex-colum']}`}>
                <span className={`${styles['fs-18']} ${styles['fontW300']}`}>Washing Machines</span>
                <span className={`${styles['fontW600']} ${styles['fs-18']}`}>50 SAR</span>
                <span className={`${styles['fontW600']} ${styles['fs-12']}`}>ONWARDS</span>
              </div>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`${styles['mt-20']} ${styles['relative']} ${styles['home-kitchan-inn']}`}>
              <a href="/SAU/en/srp?search=Vaccum%20Cleaners&language=en&isListed=false">
                <img src="/static/img/landing-page-tech-img/home-kitchen4.jpg" className="img-responsive" />
              </a>
              <div className={`${styles['absolute']} home-price-details ${styles['white-color']} ${styles['flex']} ${styles['flex-colum']}`}>
                <span className={`${styles['fs-18']} ${styles['fontW300']}`}>Vaccum Cleaners</span>
                <span className={`${styles['fontW600']} ${styles['fs-18']}`}>50 SAR</span>
                <span className={`${styles['fontW600']} ${styles['fs-12']}`}>ONWARDS</span>
              </div>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`${styles['mt-20']} ${styles['relative']} ${styles['home-kitchan-inn']}`}>
              <a href="/SAU/en/srp?search=Iron&language=en&isListed=false">
                <img src="/static/img/landing-page-tech-img/home-kitchen1.jpg" className="img-responsive" />
              </a>
              <div className={`${styles['absolute']} home-price-details ${styles['white-color']} ${styles['flex']} ${styles['flex-colum']}`}>
                <span className={`${styles['fs-18']} ${styles['fontW300']}`}>Irons</span>
                <span className={`${styles['fontW600']} ${styles['fs-18']}`}>50 SAR</span>
                <span className={`${styles['fontW600']} ${styles['fs-12']}`}>ONWARDS</span>
              </div>
            </div>
          </Col>
        </div>
        {/* brands you love start */}
        <div className={`brands-love-part ${styles['pt-30']} ${styles['pb-30']} ${styles['clear-b']}`}>
          <h4 className={`${styles['fontW600']} ${styles['text-uppercase']}`}><span className={`populat-cat-title ${styles['bdr-btm-green-color']}`}>Brands </span>  you love</h4>
          <div className={styles['mt-25']}>
            <Col md={2} className={styles['pl-0']}>
              <div className={`brands-inn ${styles['flex-center']} ${styles['justify-center']} ${styles['bg-white']}`}>
                <a href="/SAU/en/srp?search=apple&language=en&isListed=false">
                  <img src="/static/img/landing-page-tech-img/brands5.jpg" className="brand-apple" />
                </a>
              </div>
              <div className={`${styles['flex']} ${styles['flex-wrp']} brand-litem-list ${styles['fs-10']}`}>
                <span>Mac</span>
                <span>iPhone</span>
                <span>iPad</span>
                <span>Watch</span>
                <span>Tv</span>
              </div>
            </Col>
            <Col md={2} className={styles['pl-0']}>
              <div className={`brands-inn ${styles['flex-center']} ${styles['justify-center']} ${styles['bg-white']}`}>
                <a href="/SAU/en/srp?search=samsung&language=en&isListed=false">
                  <img src="/static/img/landing-page-tech-img/brands.jpg" className="brand-samsung" />
                </a>
              </div>
              <div className={`${styles['flex']} ${styles['flex-wrp']} brand-litem-list ${styles['fs-10']}`}>
                <span>Mobiles</span>
                <span>Tablets</span>
                <span>Audio & Video</span>
                <span>Watch</span>
                <span>Tv</span>
              </div>
            </Col>
            <Col md={2} className={styles['pl-0']}>
              <div className={`brands-inn ${styles['flex-center']} ${styles['justify-center']} ${styles['bg-white']}`}>
                <a href="/SAU/en/srp?search=sony&language=en&isListed=false">
                  <img src="/static/img/landing-page-tech-img/brands1.jpg" className="brand-samsung" />
                </a>
              </div>
              <div className={`${styles['flex']} ${styles['flex-wrp']} brand-litem-list ${styles['fs-10']}`}>
                <span>Mobiles</span>
                <span>Tablets</span>
                <span>Audio & Video</span>
                <span>Cameras</span>
                <span>Tv</span>
                <span>Laptops</span>
              </div>
            </Col>
            <Col md={2} className={styles['pl-0']}>
              <div className={`brands-inn ${styles['flex-center']} ${styles['justify-center']} ${styles['bg-white']}`}>
                <a href="/SAU/en/srp?search=LG&language=en&isListed=false">
                  <img src="/static/img/landing-page-tech-img/brands2.jpg" className="brand-lg" />
                </a>
              </div>
              <div className={`${styles['flex']} ${styles['flex-wrp']} brand-litem-list ${styles['fs-10']}`}>
                <span>Mobiles</span>
                <span>Tablets</span>
                <span>Audio & Video</span>
                <span>Cameras</span>
                <span>Tv</span>
                <span>Power Banks</span>
              </div>
            </Col>
            <Col md={2} className={styles['pl-0']}>
              <div className={`brands-inn ${styles['flex-center']} ${styles['justify-center']} ${styles['bg-white']}`}>
                <a href="/SAU/en/srp?search=dell&language=en&isListed=false">
                  <img src="/static/img/landing-page-tech-img/brands3.jpg" className="brand-dell" />
                </a>
              </div>
              <div className={`${styles['flex']} ${styles['flex-wrp']} brand-litem-list ${styles['fs-10']}`}>
                <span>Laptops</span>
                <span>Personal Computers</span>
              </div>
            </Col>
            <Col md={2} className={styles['pl-0']}>
              <div className={`brands-inn ${styles['flex-center']} ${styles['justify-center']} ${styles['bg-white']}`}>
                <a href="/SAU/en/srp?search=mi&language=en&isListed=false">
                  <img src="/static/img/landing-page-tech-img/brands4.jpg" className="brand-mi" />
                </a>
              </div>
              <div className={`${styles['flex']} ${styles['flex-wrp']} brand-litem-list ${styles['fs-10']}`}>
                <span>Mobiles</span>
                <span>Tablets</span>
                <span>Audio & Video</span>
                <span>Cameras</span>
                <span>Tv</span>
                <span>Power Banks</span>
              </div>
            </Col>
          </div>
        </div>
      </Row>
    </Grid>
  </div>
);
