
const Lifestyle = () => (
  <div className="life-style-main">
    <Grid>
      <div className={`${styles['flex']} life-banner-inn ${styles['relative']}`}>
        <a href={`/${lang}/Home%20Furnishing/clp`}>
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
          <a href={`/${lang}/Home%20Furnishing/clp`}>
            <img src="/static/img/landing-page-lifestyle/sub-banner1.jpg" className="img-responsive" />
          </a>
        </Col>
        <Col md={6} className={styles['pr-0']}>
          <div className={`sub-banner-title ${styles['pb-10']}`}>
            <h5 className={`title ${styles['fs-16']} ${styles['fontW600']} ${styles['m-0']}`}>Home for your books</h5>
            <span className={`dec ${styles['fs-12']}`}>Book shelves, Racks, Folders, Bookmarks & more...</span>
          </div>
          <a href={`/${lang}/Book%20shelves/clp`}>
            <img src="/static/img/landing-page-lifestyle/sub-banner2.jpg" className="img-responsive" />
          </a>
        </Col>
      </div>
      {/* popular category start */}
      {/* <div className={`poular-cat ${styles['pt-30']} ${styles['pb-30']}`}>
        <h5 className={`main-title ${styles['fs-16']} ${styles['fontW600']}`}>Popular Category</h5>
        <div className={`${styles['flex']} ${styles['poular-cat-inn']}`}>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <a href={`/${lang}/srp/home-furnishing?categoryTree=true&isListed=true&sid=932,941`}>
              <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
                <SVGComponent clsName="poular-cat" src="icons/landing-page-lifestyle/chair" />
                <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Furniture</span>
              </div>
            </a>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <a href={`/${lang}/srp/kitchen-appliances?categoryTree=true&isListed=true&sid=932,945`}>
              <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
                <SVGComponent clsName="poular-cat" src="icons/landing-page-lifestyle/kichen" />
                <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Kitchen Tools</span>
              </div>
            </a>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <a href={`/${lang}/srp/health-care?categoryTree=true&isListed=true&sid=932,972`}>
              <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
                <SVGComponent clsName="poular-cat" src="icons/landing-page-lifestyle/apple" />
                <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Health & Fitness</span>
              </div>
            </a>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <a href={`/${lang}/search?q=Fitness&language=en&isListed=true`}>
              <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
                <SVGComponent clsName="poular-cat" src="icons/landing-page-lifestyle/sports" />
                <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Sports & Fitness</span>
              </div>
            </a>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <a href={`/${lang}/srp/baby-care?categoryTree=true&isListed=true&sid=932,955`}>
              <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
                <SVGComponent clsName="poular-cat1" src="icons/landing-page-lifestyle/baby-care" />
                <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Baby Care</span>
              </div>
            </a>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <a href={`/${lang}/srp/beauty-&-personal-care?categoryTree=true&isListed=true&sid=932,958`}>
              <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
                <SVGComponent clsName="poular-cat4" src="icons/landing-page-lifestyle/personal-care" />
                <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Personal Care</span>
              </div>
            </a>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <a href={`/${lang}/search?q=sports&language=en&isListed=true`}>
              <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
                <SVGComponent clsName="poular-cat2" src="icons/landing-page-lifestyle/sports-gloves" />
                <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Sports</span>
              </div>
            </a>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <a href={`/${lang}/search?q=Gardening&language=en&isListed=true`}>
              <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
                <SVGComponent clsName="poular-cat3" src="icons/landing-page-lifestyle/gardening" />
                <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Gardening</span>
              </div>
            </a>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <a href={`/${lang}/search?q=Daily%20Needs&language=en&isListed=true`}>
              <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
                <SVGComponent clsName="popular-cat5" src="icons/landing-page-lifestyle/daily-needs" />
                <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Daily Needs</span>
              </div>
            </a>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <a href={`/${lang}/srp/health-care?categoryTree=true&isListed=true&sid=932,972`}>
              <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
                <SVGComponent clsName="poular-cat" src="icons/landing-page-lifestyle/kitchen-dining" />
                <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>kitchen & dining</span>
              </div>
            </a>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <a href={`/${lang}/srp/office-supplies?categoryTree=true&isListed=true&sid=932,979`}>
              <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
                <SVGComponent clsName="poular-cat" src="icons/landing-page-lifestyle/satinary" />
                <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Stationary</span>
              </div>
            </a>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <a href={`/${lang}/srp/home-applaince?categoryTree=true&isListed=true&sid=932,935`}>
              <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
                <SVGComponent clsName="poular-cat" src="icons/landing-page-lifestyle/home-application" />
                <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Home Appliances</span>
              </div>
            </a>
          </Col>
        </div>
      </div> */}
      {/* essential start */}
      <div className={`sub-banner ${styles['flex']} ${styles['pt-40']} ${styles['pb-20']} ${styles['clear-b']}`}>
        <Col md={6} className={styles['pl-0']}>
          <div className={`sub-banner-title ${styles['pb-10']}`}>
            <h5 className={`title ${styles['fs-16']} ${styles['fontW600']} ${styles['m-0']}`}>TRAVEL AND LEISURE</h5>
            <span className={`dec ${styles['fs-12']}`}>Cusion, Cushion covers, Vase, Lights, Tea table, Sofa sets & more…</span>
          </div>
          <a href={`/${lang}/travel and leisure/clp`}>
            <img src="/static/img/landing-page-lifestyle/essental.jpg" className="img-responsive" />
          </a>
        </Col>
        <Col md={6} className={styles['pr-0']}>
          <div className={`sub-banner-title ${styles['pb-10']}`}>
            <h5 className={`title ${styles['fs-16']} ${styles['fontW600']} ${styles['m-0']}`}>HEALTH AND FITNESS</h5>
            <span className={`dec ${styles['fs-12']}`}>Book shelves, Racks, Folders, Bookmarks & more...</span>
          </div>
          <a href={`/${lang}/fitness/clp`}>
            <img src="/static/img/landing-page-lifestyle/essential1.jpg" className="img-responsive" />
          </a>
        </Col>
      </div>
      {/* home essential */}
      <div className={`top-selling-part ${styles['pt-10']}`}>
        <h5 className={`main-title ${styles['fs-16']} ${styles['fontW600']}  ${styles['mb-0']}`}>Home Essentials</h5>
        <span className={`dec ${styles['fs-12']}`}>Kitchen tools, Gardening tools, Cutlery, Table Tennis, Boxing  </span>
        <div className={`top-selling-part-inn ${styles['pt-10']} ${styles.flex}`}>
          <Col md={2} className={styles['pl-0']}>
            <div className={`top-selling-img ${styles['flex']}`}>
              <a href={`/${lang}/cutlery/clp`}>
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
              <a href={`/${lang}/Tools%20and%20Hardware/clp`}>
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
              <a href={`/${lang}/Healthcare/clp`}>
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
              <a href={`/${lang}/search?q=Gardening%20Tools&isListed=true`}>
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
              <a href={`/${lang}/Men%27s%20Grooming/clp`}>
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
              <a href={`/${lang}/Home%20Cleaninig/clp`}>
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
      {/* <div className={`poular-cat ${styles['pt-30']} ${styles['pb-30']}`}>
        <h5 className={`main-title ${styles['fs-16']} ${styles['fontW600']}`}>Sports Essentials</h5>
        <p>Soccer, Badminton, Table Tennis, Lawn Tennis, Cricket & more...</p>
        <div className={`${styles['flex']} ${styles['poular-cat-inn']}`}>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <a href={`/${lang}/srp/home-furnishing?categoryTree=true&isListed=true&sid=932,941`}>
              <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
                <SVGComponent clsName="poular-cat" src="icons/landing-page-lifestyle/soccer"/>
                <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Soccer</span>
              </div>
            </a>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <a href={`/${lang}/srp/kitchen-appliances?categoryTree=true&isListed=true&sid=932,945`}>
              <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
                <SVGComponent clsName="popular-cat6" src="icons/landing-page-lifestyle/badminton" />
                <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Badminton</span>
              </div>
            </a>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <a href={`/${lang}/srp/health-care?categoryTree=true&isListed=true&sid=932,972`}>
              <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
                <SVGComponent clsName="poular-cat" src="icons/landing-page-lifestyle/tabletennis" />
                <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Table Tennis</span>
              </div>
            </a>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <a href={`/${lang}/search?q=Fitness&language=en&isListed=true`}>
              <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
                <SVGComponent clsName="popular-cat7" src="icons/landing-page-lifestyle/tennis" />
                <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Lawn Tennis</span>
              </div>
            </a>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <a href={`/${lang}/srp/baby-care?categoryTree=true&isListed=true&sid=932,955`}>
              <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
                <SVGComponent clsName="popular-cat7" src="icons/landing-page-lifestyle/cricket" />
                <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Cricket</span>
              </div>
            </a>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <a href={`/${lang}/srp/beauty-&-personal-care?categoryTree=true&isListed=true&sid=932,958`}>
              <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
                <SVGComponent clsName="popular-cat8" src="icons/landing-page-lifestyle/basketball" />
                <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Basketball</span>
              </div>
            </a>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <a href={`/${lang}/search?q=sports&language=en&isListed=true`}>
              <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
                <SVGComponent clsName="poular-cat2" src="icons/landing-page-lifestyle/baseball" />
                <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Baseball</span>
              </div>
            </a>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <a href={`/${lang}/search?q=Gardening&language=en&isListed=true`}>
              <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
                <SVGComponent clsName="poular-cat3" src="icons/landing-page-lifestyle/swimming" />
                <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Swimming</span>
              </div>
            </a>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <a href={`/${lang}/search?q=Daily%20Needs&language=en&isListed=true`}>
              <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
                <SVGComponent clsName="popular-cat5" src="icons/landing-page-lifestyle/cycling" />
                <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Cycling</span>
              </div>
            </a>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <a href={`/${lang}/srp/health-care?categoryTree=true&isListed=true&sid=932,972`}>
              <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
                <SVGComponent clsName="poular-cat" src="icons/landing-page-lifestyle/riverrafting" />
                <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>River Rafting</span>
              </div>
            </a>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <a href={`/${lang}/srp/office-supplies?categoryTree=true&isListed=true&sid=932,979`}>
              <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
                <SVGComponent clsName="poular-cat" src="icons/landing-page-lifestyle/snorkeling" />
                <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Snorkeling</span>
              </div>
            </a>
          </Col>
          <Col md={1} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <a href={`/${lang}/srp/home-applaince?categoryTree=true&isListed=true&sid=932,935`}>
              <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['bg-white']} ${styles['pt-15']} ${styles['pb-15']} poular-icon`}>
                <SVGComponent clsName="poular-cat" src="icons/landing-page-lifestyle/boxing" />
                <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pop-title']} ${styles['pt-5']}`}>Boxing</span>
              </div>
            </a>
          </Col>
        </div>
      </div> */}
      <div className={`hobby-part ${styles['pt-20']} ${styles['pb-20']} ${styles['clear-b']}`}>
        <h5 className={`main-title ${styles['fs-16']} ${styles['fontW600']}  ${styles['mb-0']}`}>Hobby Shop</h5>
        <span className={`dec ${styles['fs-12']}`}>Coins, Toys, Photography frames, Antiques, Arts & Crafts, Books, Cooking, Scrapbook, Fabric sewing,  & more…</span>
        <div className={`hobby-part-inn ${styles['pt-10']} ${styles['flex']}`}>
          <Col md={2} className={styles['pl-0']}>
            <div className={`hobby-part-img ${styles['relative']}`}>
              <div className="hobby-part-img-inn">
                <a href={`/${lang}/search?q=coins&isListed=true`}>
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
                <a href={`/${lang}/Art%20and%20Crafts/clp`}>
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
                <a href={`/${lang}/search?q=Sewing&isListed=true`}>
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
                <a href={`/${lang}/search?q=Antiques&isListed=true`}>
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
                <a href={`/${lang}/search?q=Toys&isListed=true`}>
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
                <a href={`/${lang}/search?q=Photography&isListed=true`}>
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
          <a href={`/${lang}/srp/personal-care`}>
            <img src="/static/img/landing-page-lifestyle/health-but.jpg" className="img-responsive" />
          </a>
        </Col>
        <Col md={4} className={`${styles['pl-0']} ${styles['pr-10']}`}>
          <div className={`sub-banner-title ${styles['pb-10']}`}>
            <h5 className={`main-title ${styles['fs-16']} ${styles['fontW600']} ${styles['m-0']}`}>Grooming Essentials</h5>
            <span className={`dec ${styles['fs-12']}`}>Beard Gel, Beard Shampoo, Face & Body Lotion, Trimmer &  more…</span>
          </div>
          <a href={`/${lang}/Men%27s%20grooming/clp`}>
            <img src="/static/img/landing-page-lifestyle/health-but1.jpg" className="img-responsive" />
          </a>
        </Col>
        <Col md={4} className={`${styles['pl-0']} ${styles['pr-10']}`}>
          <div className={`sub-banner-title ${styles['pb-10']}`}>
            <h5 className={`main-title ${styles['fs-16']} ${styles['fontW600']} ${styles['m-0']}`}>Kids Care</h5>
            <span className={`dec ${styles['fs-12']}`}>Knee guard, Wrist Guard, Elbow Guard & more…</span>
          </div>
          <a href={`/${lang}/kids%20care/clp`}>
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
              <a href={`/${lang}/search?q=shoe%20mart&isListed=true`}>
                <img src="/static/img/landing-page-lifestyle/popular5.jpg" className="img-responsive" />
              </a>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`hobby-part-img ${styles['relative']}`}>
              <a href={`/${lang}/search?q=babyshop&isListed=true`}>
                <img src="/static/img/landing-page-lifestyle/popular1.jpg" className="img-responsive" />
              </a>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`hobby-part-img ${styles['relative']}`}>
              <a href={`/${lang}/search?q=max&isListed=true`}>
                <img src="/static/img/landing-page-lifestyle/popular2.jpg" className="img-responsive" />
              </a>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`hobby-part-img ${styles['relative']}`}>
              <a href={`/${lang}/search?q=splash&isListed=true`}>
                <img src="/static/img/landing-page-lifestyle/popular3.jpg" className="img-responsive" />
              </a>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`hobby-part-img ${styles['relative']}`}>
              <a href={`/${lang}/search?q=centrepoint&isListed=true`}>
                <img src="/static/img/landing-page-lifestyle/popular4.jpg" className="img-responsive" />
              </a>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`hobby-part-img ${styles['relative']}`}>
              <a href={`/${lang}/search?q=shoe%20mart&isListed=true`}>
                <img src="/static/img/landing-page-lifestyle/popular5.jpg" className="img-responsive" />
              </a>
            </div>
          </Col>
        </div>
      </div>
    </Grid>
  </div>
);
