
const Fashion = () => (
  <div className="fashion-main-part">
    <Grid fluid={true} className={styles['p-0']}>
      <div className={`${styles['flex']} fashion-banner-main ${styles['relative']}`}>
        <a href={`/${lang}/search?q=dress&isListed=true`}>
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
          <a href={`/${lang}/Men%27s%20Shoes/clp`}>
            <div className={`banner-sub-slider-inn ${styles['bg-white']} ${styles['p-10']} ${styles['flex-center']} ${styles['border-radius4']}`}>
              <Col md={6} className={styles['pl-0']}>
                <div className="banner-sub-slider-inn-img">
                  <img src="/static/img/landing-page-fashion/fashiontop-img.jpg" className="img-responsive" />
                </div>
              </Col>
              <Col md={6} className={styles['p-0']}>
                <div className={`${styles['flex']} ${styles['flex-colum']}`}>
                  <span className={`${styles['fs-20']} ${styles['black-color']}`}>Men's Shoes</span>
                  <span className={`${styles['fs-12']} ${styles['black-color']} ${styles.fontW300}`}>They lift you physically & emotionally.</span>
                  <span className={`${styles['pt-25']} shop-now-btn`}><a className={`${styles['fs-12']} ${styles.fontW600} ${styles['border-bt-left-radius']} ${styles['black-color']}`}>Buy NOW</a></span>
                </div>
              </Col>
            </div>
          </a>
        </Col>
        <Col md={3} className={styles['pl-0']}>
          <a href={`/${lang}/Women%20dress/clp`}>
            <div className={`banner-sub-slider-inn ${styles['bg-white']} ${styles['p-10']} ${styles['flex-center']} ${styles['border-radius4']}`}>
              <Col md={6} className={styles['pl-0']}>
                <div className="banner-sub-slider-inn-img">
                  <img src="/static/img/landing-page-fashion/fashiontop-img1.jpg" className="img-responsive" />
                </div>
              </Col>
              <Col md={6} className={styles['p-0']}>
                <div className={`${styles['flex']} ${styles['flex-colum']}`}>
                  <span className={`${styles['fs-20']} ${styles['black-color']}`}>Women’s Dress</span>
                  <span className={`${styles['fs-12']} ${styles['black-color']} ${styles.fontW300}`}>When in doubt, wear red.</span>
                  <span className={`${styles['pt-25']} shop-now-btn`}><a className={`${styles['fs-12']} ${styles.fontW600} ${styles['border-bt-left-radius']} ${styles['black-color']}`}>Buy NOW</a></span>
                </div>
              </Col>
            </div>
          </a>
        </Col>
        <Col md={3} className={styles['pl-0']}>
          <a href={`/${lang}/search?q=fitness%20&%20sports&isListed=true`}>
            <div className={`banner-sub-slider-inn ${styles['bg-white']} ${styles['p-10']} ${styles['flex-center']} ${styles['border-radius4']}`}>
              <Col md={6} className={styles['pl-0']}>
                <div className="banner-sub-slider-inn-img">
                  <img src="/static/img/landing-page-fashion/fashiontop-img2.jpg" className="img-responsive" />
                </div>
              </Col>
              <Col md={6} className={styles['p-0']}>
                <div className={`${styles['flex']} ${styles['flex-colum']}`}>
                  <span className={`${styles['fs-20']} ${styles['black-color']}`}>Fitness & Sports</span>
                  <span className={`${styles['fs-12']} ${styles['black-color']} ${styles.fontW300}`}>Take care of your body.</span>
                  <span className={`${styles['pt-25']} shop-now-btn`}><a className={`${styles['fs-12']} ${styles.fontW600} ${styles['border-bt-left-radius']} ${styles['black-color']}`}>Buy NOW</a></span>
                </div>
              </Col>
            </div>
          </a>
        </Col>
        <Col md={3} className={styles['pl-0']}>
          <a href={`/${lang}/search?q=watch&isListed=true`}>
            <div className={`banner-sub-slider-inn ${styles['bg-white']} ${styles['p-10']} ${styles['flex-center']} ${styles['border-radius4']}`}>
              <Col md={6} className={styles['pl-0']}>
                <div className="banner-sub-slider-inn-img">
                  <img src="/static/img/landing-page-fashion/fashiontop-img3.jpg" className="img-responsive" />
                </div>
              </Col>
              <Col md={6} className={styles['p-0']}>
                <div className={`${styles['flex']} ${styles['flex-colum']}`}>
                  <span className={`${styles['fs-20']} ${styles['black-color']}`}>Upto 50% Off on Watches</span>
                  <span className={`${styles['fs-12']} ${styles['black-color']} ${styles.fontW300}`}>They lift you physically & emotionally.</span>
                  <span className={`${styles['pt-25']} shop-now-btn`}><a className={`${styles['fs-12']} ${styles.fontW600} ${styles['border-bt-left-radius']}`}>Buy NOW</a></span>
                </div>
              </Col>
            </div>
          </a>
        </Col>
      </div>
      {/* what new start */}
      <div className="what-new-part">
        <h3 className={`${styles['flex-center']} what-title ${styles['justify-center']} ${styles['relative']} lobster-family ${styles['pt-20']} ${styles['pb-20']}`}><span className={`${styles['fs-36']} ${styles['lable']} ${styles['pl-10']} ${styles['pr-10']}`}>Whats New</span> <span className={`${styles['absolute']} border`}></span></h3>
        <div className={styles['flex']}>
          <Col md={6} className={`${styles['pl-0']} ${styles['pr-0']} ${styles['flex']}`}>
            {/* <Col md={8} className={`${styles['pl-0']} ${styles['pr-10']}`}>
              <a href={`/${lang}/srp?search=rainware&isListed=true`}>
                <img src="/static/img/landing-page-fashion/what-new.jpg" className="img-responsive" />
              </a>
            </Col> */}
            <Col md={8} className={`${styles['p-0']} ${styles['mr-10']} ${styles['bg-white']}`}>
              <div className="chinos-part">
                <a href={`/${lang}/search?q=rainwear`}>
                  <img src="/static/img/landing-page-fashion/rainwear.png" className="img-responsive" />
                </a>
                <div className={`${styles['bg-white']} chinos-part-inn what-new-inn`}>
                  <h6 className={`${styles['m-0']} ${styles['fs-14']} ${styles['fontW600']}`}>Rainwear For All Ages</h6>
                  <span className="disc">Up to 50% Off</span>
                </div>
              </div>
            </Col>
            <Col md={4} className={`${styles['p-0']} ${styles['mr-10']} ${styles['bg-white']}`}>
              <div className="chinos-part">
                <a href={`/${lang}/search?q=Chinos&isListed=true`}>
                  <img src="/static/img/landing-page-fashion/what-new1.png" className="img-responsive" />
                </a>
                <div className={`${styles['bg-white']} chinos-part-inn what-new-inn`}>
                  <h6 className={`${styles['m-0']} ${styles['fs-14']} ${styles['fontW600']}`}>Chinos</h6>
                  <span className="disc">Up to 50% Off</span>
                </div>
              </div>
            </Col>
          </Col>
          <Col md={6} className={`${styles['p-0']}`}>
            <Col md={4} className={`${styles['pl-0']} ${styles['pr-10']}`}>
              <div className={`new-brands ${styles['pb-10']}`}>
                <a href={`/${lang}/Sunglasses/clp`}>
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
                <a href={`/${lang}/search?q=Kids%20Wear&isListed=true`}>
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
                <a href={`/${lang}/Perfumes/clp`}>
                  <img src="/static/img/landing-page-fashion/what-new4.jpg" className="img-responsive" />
                </a>
                <div className={`${styles['bg-white']} chinos-part-inn`}>
                  <h6 className={`${styles['m-0']} ${styles['fs-14']} ${styles['fontW600']}`}>Perfumes</h6>
                  <span className="disc">Up to 50% Off</span>
                </div>
              </div>
            </Col>
            <Col md={4} className={`${styles['pl-0']} ${styles['pr-10']}`}>
              <div className={`new-brands ${styles['pb-10']} ${styles['bg-white']}`}>
                <a href={`/${lang}/search?q=Jewellery&isListed=true`}>
                  <img src="/static/img/landing-page-fashion/what-new5.jpg" className="img-responsive" />
                </a>
                <div className={`${styles['bg-white']} chinos-part-inn`}>
                  <h6 className={`${styles['m-0']} ${styles['fs-14']} ${styles['fontW600']}`}>Jewellery</h6>
                  <span className="disc">Up to 50% Off</span>
                </div>
              </div>
            </Col>
            <Col md={4} className={`${styles['pl-0']} ${styles['pr-10']}`}>
              <div className={`new-brands ${styles['pb-10']} ${styles['bg-white']}`}>
                <a href={`/${lang}/search?q=Handbags&isListed=true`}>
                  <img src="/static/img/landing-page-fashion/what-new6.jpg" className="img-responsive" />
                </a>
                <div className={`${styles['bg-white']} chinos-part-inn`}>
                  <h6 className={`${styles['m-0']} ${styles['fs-14']} ${styles['fontW600']}`}>Handbags</h6>
                  <span className="disc">Up to 50% Off</span>
                </div>
              </div>
            </Col>
            <Col md={4} className={`${styles['pl-0']} ${styles['pr-10']}`}>
              <div className={`new-brands ${styles['pb-10']} ${styles['bg-white']}`}>
                <a href={`/${lang}/search?q=watch&isListed=true`}>
                  <img src="/static/img/landing-page-fashion/bitmap.png" className="img-responsive" />
                </a>
                <div className={`${styles['bg-white']} chinos-part-inn`}>
                  <h6 className={`${styles['m-0']} ${styles['fs-13']} ${styles['fontW600']}`}>Men's & Womens Watches </h6>
                  <span className="disc">Up to 50% Off</span>
                </div>
              </div>
            </Col>
          </Col>
        </div>
      </div>
      {/* getting ready to office */}
      <div className={`getting-ready-part ${styles['clear-b']}`}>
        <h3 className={`${styles['flex-center']} what-title ${styles['justify-center']} ${styles['relative']} lobster-family ${styles['pt-40']} ${styles['pb-20']}`}><span className={`${styles['fs-36']} ${styles['lable']} ${styles['pl-10']} ${styles['pr-10']}`}>Getting Ready to Office</span> <span className={`${styles['absolute']} border`}></span></h3>
        <div className={styles['flex']}>
          <Col md={6} className={`${styles['pl-0']} ${styles['pr-0']} ${styles['flex']}`}>
            <Col md={8} className={`${styles['p-0']} ${styles['mr-10']} ${styles['bg-white']}`}>
              <a href={`/${lang}/Men%27s%20Formal%20Shirts/clp`}>
                <img src="/static/img/landing-page-fashion/getting-img.jpg" className="img-responsive" />
              </a>
              <div className={`${styles['bg-white']} chinos-part-inn`}>
                <h6 className={`${styles['m-0']} ${styles['fs-14']} ${styles['fontW600']}`}>Mens Formal Shirts</h6>
                <span className="disc">Up to 50% Off</span>
              </div>
            </Col>
            <Col md={4} className={`${styles['pl-0']} ${styles['pr-10']}`}>
              <div className={`${styles['mb-10']} ${styles['bg-white']}`}>
                <a href={`/${lang}/search?q=mens%20trousers&isListed=true`}>
                  <img src="/static/img/landing-page-fashion/getting-img2.jpg" className="img-responsive" />
                </a>
                <div className={`${styles['bg-white']} chinos-part-inn`}>
                  <h6 className={`${styles['m-0']} ${styles['fs-14']} ${styles['fontW600']}`}>Mens Trousrs</h6>
                  <span className="disc">Up to 50% Off</span>
                </div>
              </div>
              <div className={`${styles['pb-10']} ${styles['bg-white']}`}>
                <a href={`/${lang}/Men%27s%20Formal%20Shoes/clp`}>
                  <img src="/static/img/landing-page-fashion/getting-img3.jpg" className="img-responsive" />
                </a>
                <div className={`${styles['bg-white']} chinos-part-inn`}>
                  <h6 className={`${styles['m-0']} ${styles['fs-14']} ${styles['fontW600']}`}>Mens Formal Shoes</h6>
                  <span className="disc">Up to 50% Off</span>
                </div>
              </div>
            </Col>
          </Col>
          <Col md={6} className={`${styles['pl-0']} ${styles['pr-0']} ${styles['flex']}`}>
            <Col md={8} className={`${styles['p-0']} ${styles['mr-10']} ${styles['bg-white']}`}>
              <a href={`/${lang}/women%27s%20formal%20tops/clp`}>
                <img src="/static/img/landing-page-fashion/getting-img4.jpg" className="img-responsive" />
              </a>
              <div className={`${styles['bg-white']} chinos-part-inn`}>
                <h6 className={`${styles['m-0']} ${styles['fs-14']} ${styles['fontW600']}`}>Women's Formal Tops</h6>
                <span className="disc">Up to 50% Off</span>
              </div>
            </Col>
            <Col md={4} className={`${styles['pl-0']} ${styles['pr-10']}`}>
              <div className={`${styles['mb-10']} ${styles['bg-white']}`}>
                <a href={`/${lang}/Women%27s%20Formal%20Footwear/clp`}>
                  <img src="/static/img/landing-page-fashion/getting-img5.jpg" className="img-responsive" />
                </a>
                <div className={`${styles['bg-white']} chinos-part-inn`}>
                  <h6 className={`${styles['m-0']} ${styles['fs-14']} ${styles['fontW600']}`}>Women's Formal Shoes</h6>
                  <span className="disc">Up to 50% Off</span>
                </div>
              </div>
              <div className={`${styles['pb-10']} ${styles['bg-white']}`}>
                <a href={`/${lang}/search?q=Handbags&isListed=true`}>
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
      {/* <div className={`top-brand-part ${styles['clear-b']}`}>
        <h3 className={`${styles['flex-center']} what-title ${styles['justify-center']} ${styles['relative']} lobster-family ${styles['pt-40']} ${styles['pb-20']}`}><span className={`${styles['fs-36']} ${styles['lable']} ${styles['pl-10']} ${styles['pr-10']}`}>Top Brands</span> <span className={`${styles['absolute']} border`}></span></h3>
        <div className={styles['flex']}>
          <Col md={2} className={`${styles['pl-0']} ${styles['pr-10']}`}>
          </Col>
          <Col md={2} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <div className={`${styles['flex-center']}  ${styles['flex-colum']} ${styles['bg-white']} top-brand-part-inn ${styles['border-radius4']}`}>
              <div className={`canvali-logo ${styles['flex-center']}`}>
                <a href={`/${lang}/search?q=just%20cavalli&isListed=true`}>
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
                <a href={`/${lang}/search?q=DOLCE%20&%20GABBANA&isListed=true`}>
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
                <a href={`/${lang}/search?q=gg&isListed=true`}>
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
                <a href={`/${lang}/search?q=gucci&isListed=true`}>
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
      </div> */}
    </Grid>
  </div>
);
