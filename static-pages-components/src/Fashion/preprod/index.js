
const Fashion = () => (
  <div className="fashion-main-part">
    <Grid fluid={true} className={styles['p-0']}>
      <div className={`${styles['flex']} fashion-banner-main ${styles['relative']}`}>
        <a href={`/SAU/${lang}/srp?search=dress&isListed=false`}>
          <img src={`/static/img/landing-page-fashion/${lang === 'en' ? 'womens-clothing' : 'womens-clothing-ar'}.jpg`} className="img-responsive" />
        </a>
        {/* <div className={`${styles['absolute']} ${styles['flex']} ${styles['flex-colum']} banner-label`}>
          <span className={`main-quation ${styles['fs-44']}`}>Up to 50% Off on Party Dresses</span>
          <span className={`banner-dec ${styles['fs-16']}`}>“You can have anything you want in life if you dress for it.”</span>
          <span className={`${styles['pt-25']} shop-now-btn`}><a className={`${styles['fs-12']} ${styles['fontW600']} ${styles['border-radius4']}`}>SHOP NOW</a></span>
        </div> */}
      </div>
    </Grid>
    <Grid>
      <div className={`banner-sub-slider ${styles['flex']} ${styles['pt-20']} ${styles['pb-20']}`}>
        <Col md={3} className={styles['pl-0']}>
          <a href={`/SAU/${lang}/srp/shoe?categoryTree=true&isListed=false&sid=892,907,908`}>
            <div className={`banner-sub-slider-inn ${styles['bg-white']} ${styles['p-10']} ${styles['flex-center']} ${styles['border-radius4']}`}>
              <Col md={6} className={styles['pl-0']}>
                <div className="banner-sub-slider-inn-img">
                  <img src="/static/img/landing-page-fashion/fashiontop-img.jpg" className="img-responsive" />
                </div>
              </Col>
              <Col md={6} className={styles['p-0']}>
                <div className={`${styles['flex']} ${styles['flex-colum']}`}>
                  <span className={`lobster-family ${styles['fs-24']}`}>Men's Shoes</span>
                  <span className={styles['fs-12']}>They lift you physically & emotionally.</span>
                  <span className={`${styles['pt-25']} shop-now-btn`}><a className={`${styles['fs-12']} ${styles['fontW600']} ${styles['border-radius4']}`}>Buy NOW</a></span>
                </div>
              </Col>
            </div>
          </a>
        </Col>
        <Col md={3} className={styles['pl-0']}>
          <a href={`/SAU/${lang}/srp/skirt?categoryTree=true&isListed=false&sid=892,910,912`}>
            <div className={`banner-sub-slider-inn ${styles['bg-white']} ${styles['p-10']} ${styles['flex-center']} ${styles['border-radius4']}`}>
              <Col md={6} className={styles['pl-0']}>
                <div className="banner-sub-slider-inn-img">
                  <img src="/static/img/landing-page-fashion/fashiontop-img1.jpg" className="img-responsive" />
                </div>
              </Col>
              <Col md={6} className={styles['p-0']}>
                <div className={`${styles['flex']} ${styles['flex-colum']}`}>
                  <span className={`lobster-family ${styles['fs-24']}`}>Women’s Dress</span>
                  <span className={styles['fs-12']}>When in doubt, wear red.</span>
                  <span className={`${styles['pt-25']} shop-now-btn`}><a className={`${styles['fs-12']} ${styles['fontW600']} ${styles['border-radius4']}`}>Buy NOW</a></span>
                </div>
              </Col>
            </div>
          </a>
        </Col>
        <Col md={3} className={styles['pl-0']}>
          <a href={`/SAU/${lang}/srp/smart-wearable-tech?categoryTree=true&isListed=false&sid=848,860`}>
            <div className={`banner-sub-slider-inn ${styles['bg-white']} ${styles['p-10']} ${styles['flex-center']} ${styles['border-radius4']}`}>
              <Col md={6} className={styles['pl-0']}>
                <div className="banner-sub-slider-inn-img">
                  <img src="/static/img/landing-page-fashion/fashiontop-img2.jpg" className="img-responsive" />
                </div>
              </Col>
              <Col md={6} className={styles['p-0']}>
                <div className={`${styles['flex']} ${styles['flex-colum']}`}>
                  <span className={`lobster-family ${styles['fs-24']}`}>Fitness & Sports</span>
                  <span className={styles['fs-12']}>Take care of your body.</span>
                  <span className={`${styles['pt-25']} shop-now-btn`}><a className={`${styles['fs-12']} ${styles['fontW600']} ${styles['border-radius4']}`}>Buy NOW</a></span>
                </div>
              </Col>
            </div>
          </a>
        </Col>
        <Col md={3} className={styles['pl-0']}>
          <a href={`/SAU/${lang}/srp/watch?categoryTree=true&isListed=false&sid=892,929`}>
            <div className={`banner-sub-slider-inn ${styles['bg-white']} ${styles['p-10']} ${styles['flex-center']} ${styles['border-radius4']}`}>
              <Col md={6} className={styles['pl-0']}>
                <div className="banner-sub-slider-inn-img">
                  <img src="/static/img/landing-page-fashion/fashiontop-img3.jpg" className="img-responsive" />
                </div>
              </Col>
              <Col md={6} className={styles['p-0']}>
                <div className={`${styles['flex']} ${styles['flex-colum']}`}>
                  <span className={`lobster-family ${styles['fs-24']}`}>Upto 50% Off on Watches</span>
                  <span className={styles['fs-12']}>They lift you physically & emotionally.</span>
                  <span className={`${styles['pt-25']} shop-now-btn`}><a className={`${styles['fs-12']} ${styles['fontW600']} ${styles['border-radius4']}`}>Buy NOW</a></span>
                </div>
              </Col>
            </div>
          </a>
        </Col>
      </div>
      {/* what new start */}
      <div className="what-new-part">
        <h3 className={`${styles['flex-center']} what-title ${styles['justify-center']} ${styles['relative']} lobster-family ${styles['pt-20']} ${styles['pb-20']}`}><span className={`${styles['fs-36']} ${styles['lable']} ${styles['pl-10']} ${styles['pr-10']}`}>Whats New</span> <span className={`${styles['absolute']} border`}></span></h3>
        <div>
          <Col md={6} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <Col md={8} className={`${styles['pl-0']} ${styles['pr-10']}`}>
              <a href={`/SAU/${lang}/srp?search=rainware&isListed=false`}>
                <img src="/static/img/landing-page-fashion/what-new.jpg" className="img-responsive" />
              </a>
            </Col>
            <Col md={4} className={`${styles['pl-0']} ${styles['pr-10']}`}>
              <div className="chinos-part">
                <a href={`/SAU/${lang}/srp?search=Chinos&isListed=false`}>
                  <img src="/static/img/landing-page-fashion/what-new1.jpg" className="img-responsive" />
                </a>
                <div className={`${styles['bg-white']} chinos-part-inn`}>
                  <h6 className={`${styles['m-0']} ${styles['fs-14']} ${styles['fontW600']}`}>Chinos</h6>
                  <span className="disc">Up to 50% Off</span>
                </div>
              </div>
            </Col>
          </Col>
          <Col md={6} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <Col md={4} className={`${styles['pl-0']} ${styles['pr-10']}`}>
              <div className={`new-brands ${styles['pb-10']}`}>
                <a href={`/SAU/${lang}/srp/sunglass?categoryTree=true&isListed=false&sid=892,928`}>
                  <img src="/static/img/landing-page-fashion/what-new2.jpg" className="img-responsive" />
                </a>
                <div className={`${styles['bg-white']} chinos-part-inn`}>
                  <h6 className={`${styles['m-0']} ${styles['fs-14']} ${styles['fontW600']}`}>Sunglasses</h6>
                  <span className="disc">Up to 50% Off</span>
                </div>
              </div>
            </Col>
            <Col md={4} className={`${styles['pl-0']} ${styles['pr-10']}`}>
              <div className={`new-brands ${styles['pb-10']}`}>
                <a href={`/SAU/${lang}/srp/kid%27s?categoryTree=true&isListed=false&sid=892,893`}>
                  <img src="/static/img/landing-page-fashion/what-new3.jpg" className="img-responsive" />
                </a>
                <div className={`${styles['bg-white']} chinos-part-inn`}>
                  <h6 className={`${styles['m-0']} ${styles['fs-14']} ${styles['fontW600']}`}>Kids Wear</h6>
                  <span className="disc">Up to 50% Off</span>
                </div>
              </div>
            </Col>
            <Col md={4} className={`${styles['pl-0']} ${styles['pr-10']}`}>
              <div className={`new-brands ${styles['pb-10']}`}>
                <a href={`/SAU/${lang}/srp/fragrance?categoryTree=true&isListed=false&sid=932,958,964`}>
                  <img src="/static/img/landing-page-fashion/what-new4.jpg" className="img-responsive" />
                </a>
                <div className={`${styles['bg-white']} chinos-part-inn`}>
                  <h6 className={`${styles['m-0']} ${styles['fs-14']} ${styles['fontW600']}`}>Perfumes</h6>
                  <span className="disc">Up to 50% Off</span>
                </div>
              </div>
            </Col>
            <Col md={4} className={`${styles['pl-0']} ${styles['pr-10']}`}>
              <div className={`new-brands ${styles['pb-10']}`}>
                <a href={`/SAU/${lang}/srp?search=Jewellery&isListed=false`}>
                  <img src="/static/img/landing-page-fashion/what-new5.jpg" className="img-responsive" />
                </a>
                <div className={`${styles['bg-white']} chinos-part-inn`}>
                  <h6 className={`${styles['m-0']} ${styles['fs-14']} ${styles['fontW600']}`}>Jewellery</h6>
                  <span className="disc">Up to 50% Off</span>
                </div>
              </div>
            </Col>
            <Col md={4} className={`${styles['pl-0']} ${styles['pr-10']}`}>
              <div className={`new-brands ${styles['pb-10']}`}>
                <a href={`/SAU/${lang}/srp?search=Handbags&isListed=false`}>
                  <img src="/static/img/landing-page-fashion/what-new6.jpg" className="img-responsive" />
                </a>
                <div className={`${styles['bg-white']} chinos-part-inn`}>
                  <h6 className={`${styles['m-0']} ${styles['fs-14']} ${styles['fontW600']}`}>Handbags</h6>
                  <span className="disc">Up to 50% Off</span>
                </div>
              </div>
            </Col>
            <Col md={4} className={`${styles['pl-0']} ${styles['pr-10']}`}>
              <div>
                <a href={`/SAU/${lang}/srp/watch?categoryTree=true&isListed=false&sid=892,929`}>
                  <img src="/static/img/landing-page-fashion/what-new7.jpg" className="img-responsive" />
                </a>
              </div>
            </Col>
          </Col>
        </div>
      </div>
      {/* getting ready to office */}
      <div className={`getting-ready-part ${styles['clear-b']}`}>
        <h3 className={`${styles['flex-center']} what-title ${styles['justify-center']} ${styles['relative']} lobster-family ${styles['pt-40']} ${styles['pb-20']}`}><span className={`${styles['fs-36']} ${styles['lable']} ${styles['pl-10']} ${styles['pr-10']}`}>Getting Ready to Office</span> <span className={`${styles['absolute']} border`}></span></h3>
        <div>
          <Col md={6} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <Col md={8} className={`${styles['pl-0']} ${styles['pr-10']}`}>
              <a href={`/SAU/${lang}/srp/shirt?categoryTree=true&isListed=false&sid=892,899,902`}>
                <img src="/static/img/landing-page-fashion/getting-img.jpg" className="img-responsive" />
              </a>
            </Col>
            <Col md={4} className={`${styles['pl-0']} ${styles['pr-10']}`}>
              <div className={styles['pb-10']}>
                <a href={`/SAU/${lang}/srp/trousers?categoryTree=true&isListed=false&sid=892,899,2281`}>
                  <img src="/static/img/landing-page-fashion/getting-img2.jpg" className="img-responsive" />
                </a>
              </div>
              <div>
                <a href={`/SAU/${lang}/srp/shoe?categoryTree=true&isListed=false&sid=892,907,908`}>
                  <img src="/static/img/landing-page-fashion/getting-img3.jpg" className="img-responsive" />
                </a>
              </div>
            </Col>
          </Col>
          <Col md={6} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <Col md={8} className={`${styles['pl-0']} ${styles['pr-10']}`}>
              <a href={`/SAU/${lang}/srp/shirt?categoryTree=true&isListed=false&sid=892,910,916`}>
                <img src="/static/img/landing-page-fashion/getting-img4.jpg" className="img-responsive" />
              </a>
            </Col>
            <Col md={4} className={`${styles['pl-0']} ${styles['pr-10']}`}>
              <div className={styles['pb-10']}>
                <a href={`/SAU/${lang}/srp/shoe?categoryTree=true&isListed=false&sid=892,921,922`}>
                  <img src="/static/img/landing-page-fashion/getting-img5.jpg" className="img-responsive" />
                </a>
                <div className={`${styles['bg-white']} chinos-part-inn`}>
                  <h6 className={`${styles['m-0']} ${styles['fs-14']} ${styles['fontW600']}`}>Women's Formal Shoes</h6>
                  <span className="disc">Up to 50% Off</span>
                </div>
              </div>
              <div>
                <a href={`/SAU/${lang}/srp?search=Handbags&isListed=false`}>
                  <img src="/static/img/landing-page-fashion/what-new6.jpg" className="img-responsive" />
                </a>
                <div className={`${styles['bg-white']} chinos-part-inn`}>
                  <h6 className={`${styles['m-0']} ${styles['fs-14']} ${styles['fontW600']}`}>Handbags</h6>
                  <span className="disc">Up to 50% Off</span>
                </div>
              </div>
            </Col>
          </Col>
        </div>
      </div>
      {/* top brands */}
      <div className={`top-brand-part ${styles['clear-b']}`}>
        <h3 className={`${styles['flex-center']} what-title ${styles['justify-center']} ${styles['relative']} lobster-family ${styles['pt-40']} ${styles['pb-20']}`}><span className={`${styles['fs-36']} ${styles['lable']} ${styles['pl-10']} ${styles['pr-10']}`}>Top Brands</span> <span className={`${styles['absolute']} border`}></span></h3>
        <div className={styles['flex']}>
          <Col md={2} className={`${styles['pl-0']} ${styles['pr-10']}`}>
          </Col>
          <Col md={2} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <div className={`${styles['flex-center']}  ${styles['flex-colum']} ${styles['bg-white']} top-brand-part-inn ${styles['border-radius4']}`}>
              <div className={`canvali-logo ${styles['flex-center']}`}>
                <a href={`/SAU/${lang}/srp?search=just%20cavalli&isListed=false`}>
                  <img src="/static/img/landing-page-fashion/top-brands1.jpg" className="img-responsive" />
                </a>
              </div>
              <div className={`${styles['pt-20']} ${styles['t-c']} top-brand-list`}>
                <ul className={styles['pl-0']}>
                  <li>Shoes</li>
                  <li>Clothes</li>
                  <li>Track Suite</li>
                  <li>Sports</li>
                  <li>Clothing &amp; Accessories</li>
                </ul>
              </div>
            </div>
          </Col>
          <Col md={2} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <div className={`${styles['flex-center']}  ${styles['flex-colum']} ${styles['bg-white']} top-brand-part-inn ${styles['border-radius4']}`}>
              <div className={`dg-logo ${styles['flex-center']}`}>
                <a href={`/SAU/${lang}/srp?search=DOLCE%20&%20GABBANA&isListed=false`}>
                  <img src="/static/img/landing-page-fashion/top-brands2.jpg" className="img-responsive" />
                </a>
              </div>
              <div className={`${styles['pt-20']} ${styles['t-c']} top-brand-list`}>
                <ul className={styles['pl-0']}>
                  <li>Shoes</li>
                  <li>Clothes</li>
                  <li>Track Suite</li>
                  <li>Sports</li>
                  <li>Clothing &amp; Accessories</li>
                </ul>
              </div>
            </div>
          </Col>
          <Col md={2} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <div className={`${styles['flex-center']}  ${styles['flex-colum']} ${styles['bg-white']} top-brand-part-inn ${styles['border-radius4']}`}>
              <div className={`dg-logo ${styles['flex-center']}`}>
                <a href={`/SAU/${lang}/srp?search=gg&isListed=false`}>
                  <img src="/static/img/landing-page-fashion/top-brands3.jpg" className="img-responsive" />
                </a>
              </div>
              <div className={`${styles['pt-20']} ${styles['t-c']} top-brand-list`}>
                <ul className={styles['pl-0']}>
                  <li>Shoes</li>
                  <li>Clothes</li>
                  <li>Track Suite</li>
                  <li>Sports</li>
                  <li>Clothing &amp; Accessories</li>
                </ul>
              </div>
            </div>
          </Col>
          <Col md={2} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <div className={`${styles['flex-center']}  ${styles['flex-colum']} ${styles['bg-white']} top-brand-part-inn ${styles['border-radius4']}`}>
              <div className={`guc-logo ${styles['flex-center']}`}>
                <a href={`/SAU/${lang}/srp?search=gucci&isListed=false`}>
                  <img src="/static/img/landing-page-fashion/top-brands5.jpg" className="img-responsive" />
                </a>
              </div>
              <div className={`${styles['pt-20']} ${styles['t-c']} top-brand-list`}>
                <ul className={styles['pl-0']}>
                  <li>Shoes</li>
                  <li>Clothes</li>
                  <li>Track Suite</li>
                  <li>Sports</li>
                  <li>Clothing &amp; Accessories</li>
                </ul>
              </div>
            </div>
          </Col>
          <Col md={2} className={`${styles['pl-0']} ${styles['pr-10']}`}>
          </Col>
        </div>
      </div>
    </Grid>
  </div>
);
