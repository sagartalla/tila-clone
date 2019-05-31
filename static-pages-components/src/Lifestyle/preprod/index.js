
const Lifestyle = () => (
  <div className="life-style-main">
    <Grid>
      <div className={`${styles['flex']} life-banner-inn ${styles['relative']}`}>
        <a href="http://localhost:3000/SAU/en/srp/home-decor?categoryTree=true&isListed=false&sid=932,937">
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
          <a href="http://localhost:3000/SAU/en/srp/home-furnishing?categoryTree=true&isListed=false&sid=932,941">
            <img src="/static/img/landing-page-lifestyle/sub-banner1.jpg" className="img-responsive" />
          </a>
        </Col>
        <Col md={6} className={styles['pr-0']}>
          <div className={`sub-banner-title ${styles['pb-10']}`}>
            <h5 className={`title ${styles['fs-16']} ${styles['fontW600']} ${styles['m-0']}`}>Home for your books</h5>
            <span className={`dec ${styles['fs-12']}`}>Book shelves, Racks, Folders, Bookmarks & more...</span>
          </div>
          <a href="http://localhost:3000/SAU/en/srp/rack?categoryTree=true&isListed=false&sid=932,941,944">
            <img src="/static/img/landing-page-lifestyle/sub-banner2.jpg" className="img-responsive" />
          </a>
        </Col>
      </div>
      {/* popular category start */}
      <div className={`poular-cat ${styles['pt-30']} ${styles['pb-30']}`}>
        <h5 className={`main-title ${styles['fs-16']} ${styles['fontW600']}`}>Popular Category</h5>
        <div className={`${styles['flex']} ${styles['poular-cat-inn']}`}>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <a href="http://localhost:3000/SAU/en/srp/home-furnishing?categoryTree=true&isListed=false&sid=932,941">
              <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
                <SVGComponent clsName="poular-cat" src="icons/landing-page-lifestyle/chair" />
                <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Furniture</span>
              </div>
            </a>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <a href="http://localhost:3000/SAU/en/srp/kitchen-appliances?categoryTree=true&isListed=false&sid=932,945">
              <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
                <SVGComponent clsName="poular-cat" src="icons/landing-page-lifestyle/kichen" />
                <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Kitchen Tools</span>
              </div>
            </a>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <a href="http://localhost:3000/SAU/en/srp/health-care?categoryTree=true&isListed=false&sid=932,972">
              <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
                <SVGComponent clsName="poular-cat" src="icons/landing-page-lifestyle/apple" />
                <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Health & Fitness</span>
              </div>
            </a>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <a href="http://localhost:3000/SAU/en/srp?search=Fitness&language=en&isListed=false">
              <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
                <SVGComponent clsName="poular-cat" src="icons/landing-page-lifestyle/sports" />
                <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Sports & Fitness</span>
              </div>
            </a>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <a href="http://localhost:3000/SAU/en/srp/baby-care?categoryTree=true&isListed=false&sid=932,955">
              <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
                <SVGComponent clsName="poular-cat1" src="icons/landing-page-lifestyle/baby-care" />
                <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Baby Care</span>
              </div>
            </a>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <a href="http://localhost:3000/SAU/en/srp/beauty-&-personal-care?categoryTree=true&isListed=false&sid=932,958">
              <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
                <SVGComponent clsName="poular-cat1" src="icons/landing-page-lifestyle/personal-care" />
                <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Personal Care</span>
              </div>
            </a>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <a href="http://localhost:3000/SAU/en/srp?search=sports&language=en&isListed=false">
              <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
                <SVGComponent clsName="poular-cat2" src="icons/landing-page-lifestyle/sports-ball" />
                <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Sports</span>
              </div>
            </a>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <a href="http://localhost:3000/SAU/en/srp?search=Gardening&language=en&isListed=false">
              <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
                <SVGComponent clsName="poular-cat3" src="icons/landing-page-lifestyle/gardening" />
                <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Gardening</span>
              </div>
            </a>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <a href="http://localhost:3000/SAU/en/srp?search=Daily%20Needs&language=en&isListed=false">
              <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
                <SVGComponent clsName="poular-cat" src="icons/landing-page-lifestyle/daily-needs" />
                <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Daily Needs</span>
              </div>
            </a>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <a href="http://localhost:3000/SAU/en/srp/health-care?categoryTree=true&isListed=false&sid=932,972">
              <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
                <SVGComponent clsName="poular-cat" src="icons/landing-page-lifestyle/health" />
                <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Health Care</span>
              </div>
            </a>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <a href="http://localhost:3000/SAU/en/srp/office-supplies?categoryTree=true&isListed=false&sid=932,979">
              <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
                <SVGComponent clsName="poular-cat" src="icons/landing-page-lifestyle/satinary" />
                <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Stationary</span>
              </div>
            </a>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <a href="http://localhost:3000/SAU/en/srp/home-applaince?categoryTree=true&isListed=false&sid=932,935">
              <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
                <SVGComponent clsName="poular-cat" src="icons/landing-page-lifestyle/home-application" />
                <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Home Appliances</span>
              </div>
            </a>
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
          <a href="http://localhost:3000/SAU/en/srp/home-furnishing?categoryTree=true&isListed=false&sid=932,941">
            <img src="/static/img/landing-page-lifestyle/essental.jpg" className="img-responsive" />
          </a>
        </Col>
        <Col md={6} className={styles['pr-0']}>
          <div className={`sub-banner-title ${styles['pb-10']}`}>
            <h5 className={`title ${styles['fs-16']} ${styles['fontW600']} ${styles['m-0']}`}>Home for your books</h5>
            <span className={`dec ${styles['fs-12']}`}>Book shelves, Racks, Folders, Bookmarks & more...</span>
          </div>
          <a href="http://localhost:3000/SAU/en/srp/rack?categoryTree=true&isListed=false&sid=932,941,944">
            <img src="/static/img/landing-page-lifestyle/essential1.jpg" className="img-responsive" />
          </a>
        </Col>
      </div>
      {/* home essential */}
      <div className={`top-selling-part ${styles['pt-10']}`}>
        <h5 className={`main-title ${styles['fs-16']} ${styles['fontW600']}  ${styles['mb-0']}`}>Home Essentials</h5>
        <span className={`dec ${styles['fs-12']}`}>Kitchen tools, Gardening tools, Cutlery, Table Tennis, Boxing  </span>
        <div className={`top-selling-part-inn ${styles['pt-10']}`}>
          <Col md={2} className={styles['pl-0']}>
            <div className={`top-selling-img ${styles['flex']}`}>
              <a href="http://localhost:3000/SAU/en/srp?search=Cutlery&language=en&isListed=false">
                <img src="/static/img/landing-page-lifestyle/home-ess.jpg" className="img-responsive" />
              </a>
            </div>
            <div className={`${styles['thick-gry-clr']} ${styles['fs-12']}`}>
              <h5 className={`${styles['mb-0']} ${styles['fs-12']}`}>Cutlery</h5>
              <span className={`${styles['fontW600']} ${styles['fs-12']}`}>UPTO 50% OFF</span>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`top-selling-img ${styles['flex']}`}>
              <a href="http://localhost:3000/SAU/en/srp?search=Tools%20and%20hardware&language=en&isListed=false">
                <img src="/static/img/landing-page-lifestyle/home-ess1.jpg" className="img-responsive" />
              </a>
            </div>
            <div className={`${styles['thick-gry-clr']} ${styles['fs-12']}`}>
              <h5 className={`${styles['mb-0']} ${styles['fs-12']}`}>Tools & Hardware</h5>
              <span className={`${styles['fontW600']} ${styles['fs-12']}`}>UPTO 20% OFF</span>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`top-selling-img ${styles['flex']}`}>
              <a href="http://localhost:3000/SAU/en/srp/beauty-&-personal-care?categoryTree=true&isListed=false&sid=932,958">
                <img src="/static/img/landing-page-lifestyle/home-ess2.jpg" className="img-responsive" />
              </a>
            </div>
            <div className={`${styles['thick-gry-clr']} ${styles['fs-12']}`}>
              <h5 className={`${styles['mb-0']} ${styles['fs-12']}`}>Personal Health Care</h5>
              <span className={`${styles['fontW600']} ${styles['fs-12']}`}>UPTO 75% OFF</span>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`top-selling-img ${styles['flex']}`}>
              <a href="http://localhost:3000/SAU/en/srp?search=Gardening%20Tools&language=en&isListed=false">
                <img src="/static/img/landing-page-lifestyle/home-ess3.jpg" className="img-responsive" />
              </a>
            </div>
            <div className={`${styles['thick-gry-clr']} ${styles['fs-12']}`}>
              <h5 className={`${styles['mb-0']} ${styles['fs-12']}`}>Gardening Tools</h5>
              <span className={`${styles['fontW600']} ${styles['fs-12']}`}>UPTO 65% OFF</span>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`top-selling-img ${styles['flex']}`}>
              <a href="http://localhost:3000/SAU/en/srp?search=Grooming&language=en&isListed=false">
                <img src="/static/img/landing-page-lifestyle/home-ess4.jpg" className="img-responsive" />
              </a>
            </div>
            <div className={`${styles['thick-gry-clr']} ${styles['fs-12']}`}>
              <h5 className={`${styles['mb-0']} ${styles['fs-12']}`}>Grooming</h5>
              <span className={`${styles['fontW600']} ${styles['fs-12']}`}>UPTO 65% OFF</span>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`top-selling-img ${styles['flex']}`}>
              <a href="http://localhost:3000/SAU/en/srp?search=Home%20Cleaning&language=en&isListed=false">
                <img src="/static/img/landing-page-lifestyle/home-ess5.jpg" className="img-responsive" />
              </a>
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
              <a href="http://localhost:3000/SAU/en/srp?search=ssoccer&language=en&isListed=false">
                <img src="/static/img/landing-page-lifestyle/sports.jpg" className="img-responsive" />
              </a>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`top-selling-img ${styles['flex']} ${styles['p-35']} ${styles['bg-white']}`}>
              <a href="http://localhost:3000/SAU/en/srp?search=badminton&language=en&isListed=false">
                <img src="/static/img/landing-page-lifestyle/sports1.jpg" className="img-responsive" />
              </a>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`top-selling-img ${styles['flex']} ${styles['p-35']} ${styles['bg-white']}`}>
              <a href="http://localhost:3000/SAU/en/srp?search=table%20tennis&language=en&isListed=false">
                <img src="/static/img/landing-page-lifestyle/sports2.jpg" className="img-responsive" />
              </a>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`top-selling-img ${styles['flex']} ${styles['p-35']} ${styles['bg-white']}`}>
              <a href="http://localhost:3000/SAU/en/srp?search=lawn%20tennis&language=en&isListed=false">
                <img src="/static/img/landing-page-lifestyle/sports3.jpg" className="img-responsive" />
              </a>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`top-selling-img ${styles['flex']} ${styles['p-35']} ${styles['bg-white']}`}>
              <a href="http://localhost:3000/SAU/en/srp?search=cricket&language=en&isListed=false">
                <img src="/static/img/landing-page-lifestyle/sports4.jpg" className="img-responsive" />
              </a>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`top-selling-img ${styles['flex']} ${styles['p-35']} ${styles['bg-white']}`}>
              <a href="http://localhost:3000/SAU/en/srp?search=basketball&language=en&isListed=false">
                <img src="/static/img/landing-page-lifestyle/sports5.jpg" className="img-responsive" />
              </a>
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
                <a href="http://localhost:3000/SAU/en/srp?search=coins&language=en&isListed=false">
                  <img src="/static/img/landing-page-lifestyle/hobby5.jpg" className="img-responsive" />
                </a>
              </div>
              <div className={`${styles['absolute']} bottom-label ${styles['white-color']}`}>
                <span className={styles['fs-24']}>Coins</span>
              </div>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`hobby-part-img ${styles['relative']}`}>
              <div className="hobby-part-img-inn">
                <a href="http://localhost:3000/SAU/en/srp?search=Crafts&language=en&isListed=false">
                  <img src="/static/img/landing-page-lifestyle/hobby1.jpg" className="img-responsive" />
                </a>
              </div>
              <div className={`${styles['absolute']} bottom-label ${styles['white-color']}`}>
                <span className={styles['fs-24']}>Arts & Crafts</span>
              </div>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`hobby-part-img ${styles['relative']}`}>
              <div className="hobby-part-img-inn">
                <a href="http://localhost:3000/SAU/en/srp?search=Sewing&language=en&isListed=false">
                  <img src="/static/img/landing-page-lifestyle/hobby2.jpg" className="img-responsive" />
                </a>
              </div>
              <div className={`${styles['absolute']} bottom-label ${styles['white-color']}`}>
                <span className={styles['fs-24']}>Fabric & Sewing</span>
              </div>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`hobby-part-img ${styles['relative']}`}>
              <div className="hobby-part-img-inn">
                <a href="http://localhost:3000/SAU/en/srp?search=Antiques&language=en&isListed=false">
                  <img src="/static/img/landing-page-lifestyle/hobby3.jpg" className="img-responsive" />
                </a>
              </div>
              <div className={`${styles['absolute']} bottom-label ${styles['white-color']}`}>
                <span className={styles['fs-24']}>Antiques</span>
              </div>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`hobby-part-img ${styles['relative']}`}>
              <div className="hobby-part-img-inn">
                <a href="http://localhost:3000/SAU/en/srp?search=Toys&language=en&isListed=false">
                  <img src="/static/img/landing-page-lifestyle/hobby4.jpg" className="img-responsive" />
                </a>
              </div>
              <div className={`${styles['absolute']} bottom-label ${styles['white-color']}`}>
                <span className={styles['fs-24']}>Toys</span>
              </div>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`hobby-part-img ${styles['relative']}`}>
              <div className="hobby-part-img-inn">
                <a href="http://localhost:3000/SAU/en/srp?search=Photography&language=en&isListed=false">
                  <img src="/static/img/landing-page-lifestyle/hobby5.jpg" className="img-responsive" />
                </a>
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
            <a href="http://localhost:3000/SAU/en/srp/beauty-&-personal-care?categoryTree=true&isListed=false&sid=932,958">
            <img src="/static/img/landing-page-lifestyle/health-but.jpg" className="img-responsive" />
          </a>
        </Col>
        <Col md={4} className={`${styles['pl-0']} ${styles['pr-10']}`}>
          <div className={`sub-banner-title ${styles['pb-10']}`}>
            <h5 className={`main-title ${styles['fs-16']} ${styles['fontW600']} ${styles['m-0']}`}>Grooming Essentials</h5>
            <span className={`dec ${styles['fs-12']}`}>Beard Gel, Beard Shampoo, Face & Body Lotion, Trimmer &  more…</span>
          </div>
            <a href="http://localhost:3000/SAU/en/srp?search=Grooming&language=en&isListed=false">
            <img src="/static/img/landing-page-lifestyle/health-but1.jpg" className="img-responsive" />
          </a>
        </Col>
        <Col md={4} className={`${styles['pl-0']} ${styles['pr-10']}`}>
          <div className={`sub-banner-title ${styles['pb-10']}`}>
            <h5 className={`main-title ${styles['fs-16']} ${styles['fontW600']} ${styles['m-0']}`}>Kids Care</h5>
            <span className={`dec ${styles['fs-12']}`}>Knee guard, Wrist Guard, Elbow Guard & more…</span>
          </div>
            <a href="http://localhost:3000/SAU/en/srp/baby-care?categoryTree=true&isListed=false&sid=932,955">
            <img src="/static/img/landing-page-lifestyle/health-but2.jpg" className="img-responsive" />
          </a>
        </Col>
      </div>
      {/* popular brands start */}
      <div className={`popular-part ${styles['pt-20']} ${styles['pb-20']} ${styles['clear-b']}`}>
        <h5 className={`main-title ${styles['fs-16']} ${styles['fontW600']}  ${styles['mb-0']}`}>Popular Brands</h5>
        <span className={`dec ${styles['fs-12']}`}>Home Centre, Babyshop, Max, Splash, Centrepoint, Shoe Mart, Gucci, Addidas, Nike, Puma, Wrangler, Levis, H&M & more… </span>
        <div className={`hobby-part-inn ${styles['pt-10']} ${styles['flex']}`}>
          <Col md={2} className={styles['pl-0']}>
            <div className={`hobby-part-img ${styles['relative']}`}>
              <a href="http://localhost:3000/SAU/en/srp?search=shoe%20mart&language=en&isListed=false">
                <img src="/static/img/landing-page-lifestyle/popular5.jpg" className="img-responsive" />
              </a>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`hobby-part-img ${styles['relative']}`}>
              <a href="http://localhost:3000/SAU/en/srp?search=babyshop&language=en&isListed=false">
                <img src="/static/img/landing-page-lifestyle/popular1.jpg" className="img-responsive" />
              </a>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`hobby-part-img ${styles['relative']}`}>
              <a href="http://localhost:3000/SAU/en/srp?search=max&language=en&isListed=false">
                <img src="/static/img/landing-page-lifestyle/popular2.jpg" className="img-responsive" />
              </a>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`hobby-part-img ${styles['relative']}`}>
              <a href="http://localhost:3000/SAU/en/srp?search=splash&language=en&isListed=false">
                <img src="/static/img/landing-page-lifestyle/popular3.jpg" className="img-responsive" />
              </a>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`hobby-part-img ${styles['relative']}`}>
              <a href="http://localhost:3000/SAU/en/srp?search=centrepoint&language=en&isListed=false">
                <img src="/static/img/landing-page-lifestyle/popular4.jpg" className="img-responsive" />
              </a>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`hobby-part-img ${styles['relative']}`}>
              <a href="http://localhost:3000/SAU/en/srp?search=shoe%20mart&language=en&isListed=false">
                <img src="/static/img/landing-page-lifestyle/popular5.jpg" className="img-responsive" />
              </a>
            </div>
          </Col>
        </div>
      </div>
    </Grid>
  </div>
);
