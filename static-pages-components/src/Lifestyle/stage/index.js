
const Lifestyle = () => (
  <div className="life-style-main">
    <Grid>
      <div className={`${styles['flex']} life-banner-inn ${styles['relative']}`}>
        <a href="/SAU/en/srp?search=home%20decor&isListed=false">
          <img src={`/static/img/landing-page-lifestyle/${lang === 'en' ? 'furnitures' : 'furnitures-ar'}.jpg`} className="img-responsive" />
        </a>
        {/* <div className={`${styles['absolute']} ${styles['flex']} ${styles['flex-colum']} banner-label`}>
          <span className={`main-quation ${styles['fs-36']} ${styles['fontW600']}`}>Home Decor & Furnishing</span>
          <span className={`banner-dec ${styles['fs-16']}`}>Everything has a place, and everything in its place.</span>
          <span className={`${styles['pt-25']} shop-now-white-btn  ${styles['flex']}`}><a className={`${styles['fs-12']} ${styles['white-color']} ${styles['p-10']} ${styles['border-radius4']}`}>SHOP NOW</a></span>
        </div> */}
      </div>
      <div className={`sub-banner ${styles['flex']} ${styles['pt-20']}`}>
        <Col md={6} className={styles['pl-0']}>
          <div className={`sub-banner-title ${styles['pb-10']}`}>
            <h5 className={`title ${styles['fs-16']} ${styles['fontW600']} ${styles['m-0']}`}>Home Furnishing</h5>
            <span className={`dec ${styles['fs-12']}`}>Cusion, Cushion covers, Vase, Lights, Tea table, Sofa sets & more…</span>
          </div>
          <img src="/static/img/landing-page-lifestyle/sub-banner1.jpg" className="img-responsive" />
        </Col>
        <Col md={6} className={styles['pr-0']}>
          <div className={`sub-banner-title ${styles['pb-10']}`}>
            <h5 className={`title ${styles['fs-16']} ${styles['fontW600']} ${styles['m-0']}`}>Home for your books</h5>
            <span className={`dec ${styles['fs-12']}`}>Book shelves, Racks, Folders, Bookmarks & more...</span>
          </div>
          <img src="/static/img/landing-page-lifestyle/sub-banner2.jpg" className="img-responsive" />
        </Col>
      </div>
      {/* popular category start */}
      <div className={`poular-cat ${styles['pt-30']} ${styles['pb-30']}`}>
        <h5 className={`main-title ${styles['fs-16']} ${styles['fontW600']}`}>Popular Category</h5>
        <div className={`${styles['flex']} ${styles['poular-cat-inn']}`}>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
              <SVGComponent clsName="poular-cat" src="icons/landing-page-lifestyle/chair" />
              <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Furniture</span>
            </div>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
              <SVGComponent clsName="poular-cat" src="icons/landing-page-lifestyle/kichen" />
              <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Kitchen Tools</span>
            </div>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
              <SVGComponent clsName="poular-cat" src="icons/landing-page-lifestyle/apple" />
              <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Health & Fitness</span>
            </div>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
              <SVGComponent clsName="poular-cat" src="icons/landing-page-lifestyle/sports" />
              <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Sports & Fitness</span>
            </div>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
              <SVGComponent clsName="poular-cat1" src="icons/landing-page-lifestyle/baby-care" />
              <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Baby Care</span>
            </div>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
              <SVGComponent clsName="poular-cat1" src="icons/landing-page-lifestyle/personal-care" />
              <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Personal Care</span>
            </div>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
              <SVGComponent clsName="poular-cat2" src="icons/landing-page-lifestyle/sports-gloves" />
              <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Sports</span>
            </div>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
              <SVGComponent clsName="poular-cat3" src="icons/landing-page-lifestyle/gardening" />
              <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Gardening</span>
            </div>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
              <SVGComponent clsName="poular-cat" src="icons/landing-page-lifestyle/daily-needs" />
              <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Daily Needs</span>
            </div>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
              <SVGComponent clsName="poular-cat" src="icons/landing-page-lifestyle/kitchen-dining" />
              <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>kitchen & dining</span>
            </div>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
              <SVGComponent clsName="poular-cat" src="icons/landing-page-lifestyle/satinary" />
              <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Stationary</span>
            </div>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
              <SVGComponent clsName="poular-cat" src="icons/landing-page-lifestyle/home-application" />
              <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Home Appliances</span>
            </div>
          </Col>
        </div>
      </div>
      {/* top selling start */}
      <div className={`top-selling-part ${styles['pt-10']}`}>
        <h5 className={`main-title ${styles['fs-16']} ${styles['fontW600']}  ${styles['mb-0']}`}>Top Selling Furniture</h5>
        <span className={`dec ${styles['fs-12']}`}>Trolley bags, Shoes, Perfumes, Makeup kit, Grooming kit, Trimmers, Slippers, &amp; more… </span>
        <div className={`top-selling-part-inn ${styles['pt-10']}`}>
          <Col md={2} className={styles['pl-0']}>
            <div className={`top-selling-img ${styles['flex']}`}>
              <img src="/static/img/landing-page-lifestyle/top-selling.jpg" className="img-responsive" />
            </div>
            <div className={`${styles['thick-gry-clr']} ${styles['fs-12']}`}>
              <h5 className={`${styles['mb-0']} ${styles['fs-12']}`}>Wooden legs corner chairs</h5>
              <span className={`${styles['fontW600']} ${styles['fs-12']}`}>AT 120 SAR</span>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`top-selling-img ${styles['flex']}`}>
              <img src="/static/img/landing-page-lifestyle/top-selling1.jpg" className="img-responsive" />
            </div>
            <div className={`${styles['thick-gry-clr']} ${styles['fs-12']}`}>
              <h5 className={`${styles['mb-0']} ${styles['fs-12']}`}>Bed side table</h5>
              <span className={`${styles['fontW600']} ${styles['fs-12']}`}>AT 180 SAR</span>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`top-selling-img ${styles['flex']}`}>
              <img src="/static/img/landing-page-lifestyle/top-selling2.jpg" className="img-responsive" />
            </div>
            <div className={`${styles['thick-gry-clr']} ${styles['fs-12']}`}>
              <h5 className={`${styles['mb-0']} ${styles['fs-12']}`}>Work table with chair (White)</h5>
              <span className={`${styles['fontW600']} ${styles['fs-12']}`}>AT 100 SAR</span>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`top-selling-img ${styles['flex']}`}>
              <img src="/static/img/landing-page-lifestyle/top-selling3.jpg" className="img-responsive" />
            </div>
            <div className={`${styles['thick-gry-clr']} ${styles['fs-12']}`}>
              <h5 className={`${styles['mb-0']} ${styles['fs-12']}`}>2 Seater sofa with 4 pillow</h5>
              <span className={`${styles['fontW600']} ${styles['fs-12']}`}>AT 120 SAR</span>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`top-selling-img ${styles['flex']}`}>
              <img src="/static/img/landing-page-lifestyle/top-selling4.jpg" className="img-responsive" />
            </div>
            <div className={`${styles['thick-gry-clr']} ${styles['fs-12']}`}>
              <h5 className={`${styles['mb-0']} ${styles['fs-12']}`}>Work table with chair (White)</h5>
              <span className={`${styles['fontW600']} ${styles['fs-12']}`}>AT 120 SAR</span>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`top-selling-img ${styles['flex']}`}>
              <img src="/static/img/landing-page-lifestyle/top-selling5.jpg" className="img-responsive" />
            </div>
            <div className={`${styles['thick-gry-clr']}`}>
              <h5 className={`${styles['mb-0']} ${styles['fs-12']}`}>Home decor</h5>
              <span className={`${styles['fontW600']} ${styles['fs-12']}`}>AT 120 SAR</span>
            </div>
          </Col>
        </div>
      </div>
      {/* essential start */}
      <div className={`sub-banner ${styles['flex']} ${styles['pt-40']} ${styles['pb-20']} ${styles['clear-b']}`}>
        <Col md={6} className={styles['pl-0']}>
          <div className={`sub-banner-title ${styles['pb-10']}`}>
            <h5 className={`title ${styles['fs-16']} ${styles['fontW600']} ${styles['m-0']}`}>Home Furnishing</h5>
            <span className={`dec ${styles['fs-12']}`}>Cusion, Cushion covers, Vase, Lights, Tea table, Sofa sets & more…</span>
          </div>
          <img src="/static/img/landing-page-lifestyle/essental.jpg" className="img-responsive" />
        </Col>
        <Col md={6} className={styles['pr-0']}>
          <div className={`sub-banner-title ${styles['pb-10']}`}>
            <h5 className={`title ${styles['fs-16']} ${styles['fontW600']} ${styles['m-0']}`}>Home for your books</h5>
            <span className={`dec ${styles['fs-12']}`}>Book shelves, Racks, Folders, Bookmarks & more...</span>
          </div>
          <img src="/static/img/landing-page-lifestyle/essential1.jpg" className="img-responsive" />
        </Col>
      </div>
      {/* home essential */}
      <div className={`top-selling-part ${styles['pt-10']}`}>
        <h5 className={`main-title ${styles['fs-16']} ${styles['fontW600']}  ${styles['mb-0']}`}>Home Essentials</h5>
        <span className={`dec ${styles['fs-12']}`}>Kitchen tools, Gardening tools, Cutlery, Table Tennis, Boxing  </span>
        <div className={`top-selling-part-inn ${styles['pt-10']}`}>
          <Col md={2} className={styles['pl-0']}>
            <div className={`top-selling-img ${styles['flex']}`}>
              <img src="/static/img/landing-page-lifestyle/home-ess.jpg" className="img-responsive" />
            </div>
            <div className={`${styles['thick-gry-clr']} ${styles['fs-12']}`}>
              <h5 className={`${styles['mb-0']} ${styles['fs-12']}`}>Cutlery</h5>
              <span className={`${styles['fontW600']} ${styles['fs-12']}`}>UPTO 50% OFF</span>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`top-selling-img ${styles['flex']}`}>
              <img src="/static/img/landing-page-lifestyle/home-ess1.jpg" className="img-responsive" />
            </div>
            <div className={`${styles['thick-gry-clr']} ${styles['fs-12']}`}>
              <h5 className={`${styles['mb-0']} ${styles['fs-12']}`}>Tools & Hardware</h5>
              <span className={`${styles['fontW600']} ${styles['fs-12']}`}>UPTO 20% OFF</span>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`top-selling-img ${styles['flex']}`}>
              <img src="/static/img/landing-page-lifestyle/home-ess2.jpg" className="img-responsive" />
            </div>
            <div className={`${styles['thick-gry-clr']} ${styles['fs-12']}`}>
              <h5 className={`${styles['mb-0']} ${styles['fs-12']}`}>Personal Health Care</h5>
              <span className={`${styles['fontW600']} ${styles['fs-12']}`}>UPTO 75% OFF</span>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`top-selling-img ${styles['flex']}`}>
              <img src="/static/img/landing-page-lifestyle/home-ess3.jpg" className="img-responsive" />
            </div>
            <div className={`${styles['thick-gry-clr']} ${styles['fs-12']}`}>
              <h5 className={`${styles['mb-0']} ${styles['fs-12']}`}>Gardening Tools</h5>
              <span className={`${styles['fontW600']} ${styles['fs-12']}`}>UPTO 65% OFF</span>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`top-selling-img ${styles['flex']}`}>
              <img src="/static/img/landing-page-lifestyle/home-ess4.jpg" className="img-responsive" />
            </div>
            <div className={`${styles['thick-gry-clr']} ${styles['fs-12']}`}>
              <h5 className={`${styles['mb-0']} ${styles['fs-12']}`}>Grooming</h5>
              <span className={`${styles['fontW600']} ${styles['fs-12']}`}>UPTO 65% OFF</span>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`top-selling-img ${styles['flex']}`}>
              <img src="/static/img/landing-page-lifestyle/home-ess5.jpg" className="img-responsive" />
            </div>
            <div className={`${styles['thick-gry-clr']}`}>
              <h5 className={`${styles['mb-0']} ${styles['fs-12']}`}>Home Cleaning</h5>
              <span className={`${styles['fontW600']} ${styles['fs-12']}`}>UPTO 40% OFF</span>
            </div>
          </Col>
        </div>
      </div>
      {/* sports start */}
      <div className={`top-selling-part sports-part' ${styles['pt-40']} ${styles['pb-20']} ${styles['clear-b']}`}>
        <h5 className={`main-title ${styles['fs-16']} ${styles['fontW600']}  ${styles['mb-0']}`}>Sports Essentials</h5>
        <span className={`dec ${styles['fs-12']}`}>Cricket, Soccer, Basketball, Table Tennis, Boxing, Lawn tennis, badminton & more… </span>
        <div className={`top-selling-part-inn ${styles['pt-10']} ${styles['flex']}`}>
          <Col md={2} className={styles['pl-0']}>
            <div className={`top-selling-img ${styles['flex']} ${styles['p-35']} ${styles['bg-white']}`}>
              <img src="/static/img/landing-page-lifestyle/sports.jpg" className="img-responsive" />
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`top-selling-img ${styles['flex']} ${styles['p-35']} ${styles['bg-white']}`}>
              <img src="/static/img/landing-page-lifestyle/sports1.jpg" className="img-responsive" />
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`top-selling-img ${styles['flex']} ${styles['p-35']} ${styles['bg-white']}`}>
              <img src="/static/img/landing-page-lifestyle/sports2.jpg" className="img-responsive" />
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`top-selling-img ${styles['flex']} ${styles['p-35']} ${styles['bg-white']}`}>
              <img src="/static/img/landing-page-lifestyle/sports3.jpg" className="img-responsive" />
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`top-selling-img ${styles['flex']} ${styles['p-35']} ${styles['bg-white']}`}>
              <img src="/static/img/landing-page-lifestyle/sports4.jpg" className="img-responsive" />
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`top-selling-img ${styles['flex']} ${styles['p-35']} ${styles['bg-white']}`}>
              <img src="/static/img/landing-page-lifestyle/sports5.jpg" className="img-responsive" />
            </div>
          </Col>
        </div>
      </div>
      <div className={`hobby-part ${styles['pt-20']} ${styles['pb-20']} ${styles['clear-b']}`}>
        <h5 className={`main-title ${styles['fs-16']} ${styles['fontW600']}  ${styles['mb-0']}`}>Hobby Shop</h5>
        <span className={`dec ${styles['fs-12']}`}>Coins, Toys, Photography frames, Antiques, Arts & Crafts, Books, Cooking, Scrapbook, Fabric sewing,  & more…</span>
        <div className={`hobby-part-inn ${styles['pt-10']} ${styles['flex']}`}>
          <Col md={2} className={styles['pl-0']}>
            <div className={`hobby-part-img ${styles['relative']}`}>
              <div className="hobby-part-img-inn">
                <img src="/static/img/landing-page-lifestyle/hobby5.jpg" className="img-responsive" />
              </div>
              <div className={`${styles['absolute']} bottom-label ${styles['white-color']}`}>
                <span className={styles['fs-24']}>Coins</span>
              </div>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`hobby-part-img ${styles['relative']}`}>
              <div className="hobby-part-img-inn">
                <img src="/static/img/landing-page-lifestyle/hobby1.jpg" className="img-responsive" />
              </div>
              <div className={`${styles['absolute']} bottom-label ${styles['white-color']}`}>
                <span className={styles['fs-24']}>Arts & Crafts</span>
              </div>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`hobby-part-img ${styles['relative']}`}>
              <div className="hobby-part-img-inn">
                <img src="/static/img/landing-page-lifestyle/hobby2.jpg" className="img-responsive" />
              </div>
              <div className={`${styles['absolute']} bottom-label ${styles['white-color']}`}>
                <span className={styles['fs-24']}>Fabric & Sewing</span>
              </div>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`hobby-part-img ${styles['relative']}`}>
              <div className="hobby-part-img-inn">
                <img src="/static/img/landing-page-lifestyle/hobby3.jpg" className="img-responsive" />
              </div>
              <div className={`${styles['absolute']} bottom-label ${styles['white-color']}`}>
                <span className={styles['fs-24']}>Antiques</span>
              </div>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`hobby-part-img ${styles['relative']}`}>
              <div className="hobby-part-img-inn">
                <img src="/static/img/landing-page-lifestyle/hobby4.jpg" className="img-responsive" />
              </div>
              <div className={`${styles['absolute']} bottom-label ${styles['white-color']}`}>
                <span className={styles['fs-24']}>Toys</span>
              </div>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`hobby-part-img ${styles['relative']}`}>
              <div className="hobby-part-img-inn">
                <img src="/static/img/landing-page-lifestyle/hobby5.jpg" className="img-responsive" />
              </div>
              <div className={`${styles['absolute']} bottom-label ${styles['white-color']}`}>
                <span className={styles['fs-24']}>Photography</span>
              </div>
            </div>
          </Col>
        </div>
      </div>
      {/* health buaty start */}
      <div className={`${styles['health-buaty-part']} ${styles['flex']} ${styles['pt-20']} ${styles['pb-20']} `}>
        <Col md={4} className={`${styles['pl-0']} ${styles['pr-10']}`}>
          <div className={`sub-banner-title ${styles['pb-10']}`}>
            <h5 className={`main-title ${styles['fs-16']} ${styles['fontW600']} ${styles['m-0']}`}>Health & Beauty</h5>
            <span className={`dec ${styles['fs-12']}`}>Body lotion, Face cream, Massager & more…</span>
          </div>
          <img src="/static/img/landing-page-lifestyle/health-but.jpg" className="img-responsive" />
        </Col>
        <Col md={4} className={`${styles['pl-0']} ${styles['pr-10']}`}>
          <div className={`sub-banner-title ${styles['pb-10']}`}>
            <h5 className={`main-title ${styles['fs-16']} ${styles['fontW600']} ${styles['m-0']}`}>Grooming Essentials</h5>
            <span className={`dec ${styles['fs-12']}`}>Beard Gel, Beard Shampoo, Face & Body Lotion, Trimmer &  more…</span>
          </div>
          <img src="/static/img/landing-page-lifestyle/health-but1.jpg" className="img-responsive" />
        </Col>
        <Col md={4} className={`${styles['pl-0']} ${styles['pr-10']}`}>
          <div className={`sub-banner-title ${styles['pb-10']}`}>
            <h5 className={`main-title ${styles['fs-16']} ${styles['fontW600']} ${styles['m-0']}`}>Kids Care</h5>
            <span className={`dec ${styles['fs-12']}`}>Knee guard, Wrist Guard, Elbow Guard & more…</span>
          </div>
          <img src="/static/img/landing-page-lifestyle/health-but2.jpg" className="img-responsive" />
        </Col>
      </div>
      {/* popular brands start */}
      <div className={`popular-part ${styles['pt-20']} ${styles['pb-20']} ${styles['clear-b']}`}>
        <h5 className={`main-title ${styles['fs-16']} ${styles['fontW600']}  ${styles['mb-0']}`}>Popular Brands</h5>
        <span className={`dec ${styles['fs-12']}`}>Home Centre, Babyshop, Max, Splash, Centrepoint, Shoe Mart, Gucci, Addidas, Nike, Puma, Wrangler, Levis, H&M & more… </span>
        <div className={`hobby-part-inn ${styles['pt-10']} ${styles['flex']}`}>
          <Col md={2} className={styles['pl-0']}>
            <div className={`hobby-part-img ${styles['relative']}`}>
              <img src="/static/img/landing-page-lifestyle/popular5.jpg" className="img-responsive" />
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`hobby-part-img ${styles['relative']}`}>
              <img src="/static/img/landing-page-lifestyle/popular1.jpg" className="img-responsive" />
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`hobby-part-img ${styles['relative']}`}>
              <img src="/static/img/landing-page-lifestyle/popular2.jpg" className="img-responsive" />
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`hobby-part-img ${styles['relative']}`}>
              <img src="/static/img/landing-page-lifestyle/popular3.jpg" className="img-responsive" />
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`hobby-part-img ${styles['relative']}`}>
              <img src="/static/img/landing-page-lifestyle/popular4.jpg" className="img-responsive" />
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`hobby-part-img ${styles['relative']}`}>
              <img src="/static/img/landing-page-lifestyle/popular5.jpg" className="img-responsive" />

            </div>
          </Col>
        </div>
      </div>
    </Grid>
  </div>
);
