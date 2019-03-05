import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import SVGComponent from '../../../common/SVGComponet';
import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Landing/includes/Electronics/electronics');
const Electronics = () => (
  <div className={styles['electronics-main-part']}>
    <Grid>
      <div className={styles['main-banner']}>
        <img src="/static/img/landing-page-tech-img/main-banner.jpg" className={styles['img-responsive']} />
      </div>
      <Row className={`${styles['m-0']} ${styles['pt-10']}`}>
        {/* Popular Categories start */}
        <div className={styles['popular-cat-part']}>
          <h4 className={`${styles['fontW600']} ${styles['text-uppercase']}`}><span className={`${styles['populat-cat-title']} ${styles['bdr-btm-green-color']}`}>Popular</span> Categories</h4>
          <div className={`${styles['flex']} ${styles['popular-cat-part-sub']} ${styles['pt-20']} ${styles['pb-20']}`}>
            <div className={`${styles['popular-cat-part-inn']} ${styles['mr-35']}`}>
              <div className={styles['popular-cat-inn-img']}>
                <img src="/static/img/landing-page-tech-img/popular-cat.png" className={styles['img-responsive']} />
              </div>
              <div className={`${styles['flex-center']} ${styles['flex-colum']}`}>
                <span className={styles['fs-12']}>Mobiles</span>
                <span className={styles['fontW600']}>UP to 35% Off</span>
              </div>
            </div>
            <div className={`${styles['popular-cat-part-inn-1']} ${styles['mr-35']}`}>
              <div className={styles['popular-cat-inn-img']}>
                <img src="/static/img/landing-page-tech-img/popular-cat1.png" className={styles['img-responsive']} />
              </div>
              <div className={`${styles['flex-center']} ${styles['flex-colum']}`}>
                <span className={styles['fs-12']}>Televisions</span>
                <span className={styles['fontW600']}>UP to 25% Off</span>
              </div>
            </div>
            <div className={`${styles['popular-cat-part-inn']} ${styles['mr-35']}`}>
              <div className={styles['popular-cat-inn-img']}>
                <img src="/static/img/landing-page-tech-img/popular-cat2.png" className={styles['img-responsive']} />
              </div>
              <div className={`${styles['flex-center']} ${styles['flex-colum']}`}>
                <span className={styles['fs-12']}>Laptop</span>
                <span className={styles['fontW600']}>UP to 25% Off</span>
              </div>
            </div>
            <div className={`${styles['popular-cat-part-inn']} ${styles['mr-35']}`}>
              <div className={styles['popular-cat-inn-img']}>
                <img src="/static/img/landing-page-tech-img/popular-cat3.png" className={styles['img-responsive']} />
              </div>
              <div className={`${styles['flex-center']} ${styles['flex-colum']}`}>
                <span className={styles['fs-12']}>Tablets</span>
                <span className={styles['fontW600']}>UP to 15% Off</span>
              </div>
            </div>
            <div className={`${styles['popular-cat-part-inn']}`}>
              <div className={styles['popular-cat-inn-img']}>
                <img src="/static/img/landing-page-tech-img/popular-cat4.png" className={styles['img-responsive']} />
              </div>
              <div className={`${styles['flex-center']} ${styles['flex-colum']}`}>
                <span className={styles['fs-12']}>Cameras</span>
                <span className={styles['fontW600']}>UP to 15% Off</span>
              </div>
            </div>
            <div className={`${styles['popular-cat-part-inn']} ${styles['mr-35']}`}>
              <div className={styles['popular-cat-inn-img']}>
                <img src="/static/img/landing-page-tech-img/popular-cat5.png" className={styles['img-responsive']} />
              </div>
              <div className={`${styles['flex-center']} ${styles['flex-colum']}`}>
                <span className={styles['fs-12']}>Gaming</span>
                <span className={styles['fontW600']}>UP to 35% Off</span>
              </div>
            </div>
            <div className={`${styles['popular-cat-part-inn']} ${styles['mr-35']}`}>
              <div className={styles['popular-cat-inn-img']}>
                <img src="/static/img/landing-page-tech-img/popular-cat6.png" className={styles['img-responsive']} />
              </div>
              <div className={`${styles['flex-center']} ${styles['flex-colum']}`}>
                <span className={styles['fs-12']}>Mobile Accessories</span>
                <span className={styles['fontW600']}>UP to 35% Off</span>
              </div>
            </div>
            <div className={`${styles['popular-cat-part-inn']} ${styles['mr-35']}`}>
              <div className={styles['popular-cat-inn-img']}>
                <img src="/static/img/landing-page-tech-img/popular-cat7.png" className={styles['img-responsive']} />
              </div>
              <div className={`${styles['flex-center']} ${styles['flex-colum']}`}>
                <span className={styles['fs-12']}>Personal &amp; Health Care</span>
                <span className={styles['fontW600']}>UP to 35% Off</span>
              </div>
            </div>
            <div className={`${styles['popular-cat-part-inn']} ${styles['mr-35']}`}>
              <div className={styles['popular-cat-inn-img']}>
                <img src="/static/img/landing-page-tech-img/popular-cat8.png" className={styles['img-responsive']} />
              </div>
              <div className={`${styles['flex-center']} ${styles['flex-colum']}`}>
                <span className={styles['fs-12']}>Home Appliances</span>
                <span className={styles['fontW600']}>UP to 35% Off</span>
              </div>
            </div>
            <div className={styles['popular-cat-part-inn-1']}>
              <div className={styles['popular-cat-inn-img']}>
                <img src="/static/img/landing-page-tech-img/popular-cat9.png" className={styles['img-responsive']} />
              </div>
              <div className={`${styles['flex-center']} ${styles['flex-colum']}`}>
                <span className={styles['fs-12']}>Home Entertainment</span>
                <span className={styles['fontW600']}>UP to 35% Off</span>
              </div>
            </div>

          </div>
        </div>
        {/* brand part stat */}
        <div className={`${styles['brand-part']} ${styles['flex']} ${styles['pt-20']} ${styles['pb-20']}`}>
          <Col md={4} className={styles['pl-0']}>
            <h4 className={styles['fontW600']}><span className={`${styles['populat-cat-title']} ${styles['bdr-btm-green-color']}`}>NEW</span></h4>
            <div className={`${styles['mt-20']} ${styles['relative']} ${styles['brand-part-inn']}`}>
              <img src="/static/img/landing-page-tech-img/samsung.jpg" className={styles['img-responsive']} />
              <div className={`${styles['absolute']} ${styles['price-details']} ${styles['flex']} ${styles['flex-colum']}`}>
                <span className={`${styles['fs-22']} ${styles['fontW300']}`}>Samsung Curve</span>
                <span className={`${styles['fontW600']} ${styles['flex']}`}><span className={styles['fs-40']}>375</span><span className={styles['fs-24']}>SAR</span></span>
              </div>
            </div>
          </Col>
          <Col md={4} className={styles['pl-0']}>
            <h4 className={`${styles['fontW600']} ${styles['text-uppercase']}`}><span className={`${styles['populat-cat-title']} ${styles['bdr-btm-green-color']}`}>Exclusive</span> </h4>
            <div className={`${styles['mt-20']} ${styles['relative']} ${styles['brand-part-inn']}`}>
              <img src="/static/img/landing-page-tech-img/mi-brand-img.jpg" className={styles['img-responsive']} />
              <div className={`${styles['absolute']} ${styles['price-details']} ${styles['flex']} ${styles['flex-colum']} ${styles['white-color']}`}>
                <span className={`${styles['fs-22']} ${styles['fontW300']}`}>MI A1</span>
                <span className={`${styles['fontW600']} ${styles['flex']}`}><span className={styles['fs-40']}>120</span><span className={styles['fs-24']}>SAR</span></span>
              </div>
            </div>
          </Col>
          <Col md={4} className={styles['pl-0']}>
            <h4 className={`${styles['fontW600']}`}><span className={`${styles['populat-cat-title']} ${styles['bdr-btm-green-color']} ${styles['text-uppercase']}`}>Apple</span>  - Its always a good idea!</h4>
            <div className={`${styles['mt-20']} ${styles['relative']} ${styles['brand-part-inn']}`}>
              <img src="/static/img/landing-page-tech-img/apple-brand-img.jpg" className={styles['img-responsive']} />
              <div className={`${styles['absolute']} ${styles['price-details']} ${styles['flex']} ${styles['flex-colum']} ${styles['white-color']}`}>
                <span className={`${styles['fs-22']} ${styles['fontW300']}`}>Apple</span>
                <span className={`${styles['fontW600']} ${styles['flex']}`}><span className={styles['fs-40']}>375</span><span className={styles['fs-24']}>SAR</span></span>
              </div>
            </div>
          </Col>
        </div>
        {/* top selling mobiles */}
        <div className={`${styles['top-selling-brands']} ${styles['pt-20']} ${styles['pb-20']}`}>
          <h4 className={`${styles['fontW600']}`}><span className={`${styles['populat-cat-title']} ${styles['bdr-btm-green-color']} ${styles['text-uppercase']}`}>Top Selling </span>  Mobiles</h4>
          <div className={`${styles['flex']} ${styles['pt-30']} ${styles['pb-30']}`}>
            <Col md={2} className={styles['pl-0']}>
              <div className={` ${styles['top-selling-img']} ${styles['flex-center']} ${styles['bg-white']} ${styles['p-35']}`}>
                <img src="/static/img/landing-page-tech-img/top-selling-mob.jpg" className={styles['img-responsive']} />
              </div>
              <div className={`${styles['top-price-details']} ${styles['flex']} ${styles['flex-colum']} ${styles['pt-15']}`}>
                <span className={styles['flx-spacebw-alignc']}>
                  <span className={`${styles['fs-12']} ${styles['lgt-blue']}`}>Mi A1</span>
                  <SVGComponent clsName={`${styles['wistlist-logo']}`} src="icons/wish-list/wish-list-icon" />
                </span>
                <span><span className={styles['fs-24']}>1200</span> <span>SAR</span><span className={`${styles['fs-12']} ${styles['google-clr']} ${styles['pl-10']}`}>-60%</span></span>
                <div className={styles['flex-center']}>
                  <span className={`${styles['rating']} ${styles['fs-10']} ${styles['white-color']}`}>4.5</span>
                  <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pl-5']}`}>187 Ratings | 25 Reviews</span>
                </div>
              </div>
            </Col>
            <Col md={2} className={styles['pl-0']}>
              <div className={` ${styles['top-selling-img']} ${styles['flex-center']} ${styles['bg-white']} ${styles['p-35']}`}>
                <img src="/static/img/landing-page-tech-img/top-selling-mob4.jpg" className={styles['img-responsive']} />
              </div>
              <div className={`${styles['top-price-details']} ${styles['flex']} ${styles['flex-colum']} ${styles['pt-15']}`}>
                <span className={styles['flx-spacebw-alignc']}>
                  <span className={`${styles['fs-12']} ${styles['lgt-blue']}`}>Redmi Note 4</span>
                  <SVGComponent clsName={`${styles['wistlist-logo']}`} src="icons/wish-list/wish-list-icon" />
                </span>
                <span><span className={styles['fs-24']}>1200</span> <span>SAR</span><span className={`${styles['fs-12']} ${styles['google-clr']} ${styles['pl-10']}`}>-60%</span></span>
                <div className={styles['flex-center']}>
                  <span className={`${styles['rating']} ${styles['fs-10']} ${styles['white-color']}`}>4.5</span>
                  <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pl-5']}`}>187 Ratings | 25 Reviews</span>
                </div>
              </div>
            </Col>
            <Col md={2} className={styles['pl-0']}>
              <div className={` ${styles['top-selling-img']} ${styles['flex-center']} ${styles['bg-white']} ${styles['p-35']}`}>
                <img src="/static/img/landing-page-tech-img/top-selling-mob1.jpg" className={styles['img-responsive']} />
              </div>
              <div className={`${styles['top-price-details']} ${styles['flex']} ${styles['flex-colum']} ${styles['pt-15']}`}>
                <span className={styles['flx-spacebw-alignc']}>
                  <span className={`${styles['fs-12']} ${styles['lgt-blue']}`}>Lenovo K8 Plus</span>
                  <SVGComponent clsName={`${styles['wistlist-logo']}`} src="icons/wish-list/wish-list-icon" />
                </span>
                <span><span className={styles['fs-24']}>1200</span> <span>SAR</span><span className={`${styles['fs-12']} ${styles['google-clr']} ${styles['pl-10']}`}>-60%</span></span>
                <div className={styles['flex-center']}>
                  <span className={`${styles['rating']} ${styles['fs-10']} ${styles['white-color']}`}>4.5</span>
                  <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pl-5']}`}>187 Ratings | 25 Reviews</span>
                </div>
              </div>
            </Col>
            <Col md={2} className={styles['pl-0']}>
              <div className={` ${styles['top-selling-img']} ${styles['flex-center']} ${styles['bg-white']} ${styles['p-35']}`}>
                <img src="/static/img/landing-page-tech-img/top-selling-mob2.jpg" className={styles['img-responsive']} />
              </div>
              <div className={`${styles['top-price-details']} ${styles['flex']} ${styles['flex-colum']} ${styles['pt-15']}`}>
                <span className={styles['flx-spacebw-alignc']}>
                  <span className={`${styles['fs-12']} ${styles['lgt-blue']}`}>Moto C Plus</span>
                  <SVGComponent clsName={`${styles['wistlist-logo']}`} src="icons/wish-list/wish-list-icon" />
                </span>
                <span><span className={styles['fs-24']}>1200</span> <span>SAR</span><span className={`${styles['fs-12']} ${styles['google-clr']} ${styles['pl-10']}`}>-60%</span></span>
                <div className={styles['flex-center']}>
                  <span className={`${styles['rating']} ${styles['fs-10']} ${styles['white-color']}`}>4.5</span>
                  <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pl-5']}`}>187 Ratings | 25 Reviews</span>
                </div>
              </div>
            </Col>
            <Col md={2} className={styles['pl-0']}>
              <div className={` ${styles['top-selling-img']} ${styles['flex-center']} ${styles['bg-white']} ${styles['p-35']}`}>
                <img src="/static/img/landing-page-tech-img/top-selling-mob3.jpg" className={styles['img-responsive']} />
              </div>
              <div className={`${styles['top-price-details']} ${styles['flex']} ${styles['flex-colum']} ${styles['pt-15']}`}>
                <span className={styles['flx-spacebw-alignc']}>
                  <span className={`${styles['fs-12']} ${styles['lgt-blue']}`}>Moto E4 Plus</span>
                  <SVGComponent clsName={`${styles['wistlist-logo']}`} src="icons/wish-list/wish-list-icon" />
                </span>
                <span><span className={styles['fs-24']}>1200</span> <span>SAR</span><span className={`${styles['fs-12']} ${styles['google-clr']} ${styles['pl-10']}`}>-60%</span></span>
                <div className={styles['flex-center']}>
                  <span className={`${styles['rating']} ${styles['fs-10']} ${styles['white-color']}`}>4.5</span>
                  <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pl-5']}`}>187 Ratings | 25 Reviews</span>
                </div>
              </div>
            </Col>
            <Col md={2} className={styles['pl-0']}>
              <div className={` ${styles['top-selling-img']} ${styles['flex-center']} ${styles['bg-white']} ${styles['p-35']}`}>
                <img src="/static/img/landing-page-tech-img/top-selling-mob.jpg" className={styles['img-responsive']} />
              </div>
              <div className={`${styles['top-price-details']} ${styles['flex']} ${styles['flex-colum']} ${styles['pt-15']}`}>
                <span className={styles['flx-spacebw-alignc']}>
                  <span className={`${styles['fs-12']} ${styles['lgt-blue']}`}>Mi A1</span>
                  <SVGComponent clsName={`${styles['wistlist-logo']}`} src="icons/wish-list/wish-list-icon" />
                </span>
                <span><span className={styles['fs-24']}>1200</span> <span>SAR</span><span className={`${styles['fs-12']} ${styles['google-clr']} ${styles['pl-10']}`}>-60%</span></span>
                <div className={styles['flex-center']}>
                  <span className={`${styles['rating']} ${styles['fs-10']} ${styles['white-color']}`}>4.5</span>
                  <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pl-5']}`}>187 Ratings | 25 Reviews</span>
                </div>
              </div>
            </Col>
          </div>
        </div>
        {/* gaming part start */}
        <div className={styles['flex']}>
          <Col md={6} className={styles['pl-0']}>
            <h4 className={`${styles['fontW600']} ${styles['text-uppercase']} ${styles['pb-10']}`}><span className={`${styles['populat-cat-title']} ${styles['bdr-btm-green-color']}`}>Gaming  </span>  Consoles</h4>
            <div>
              <img src="/static/img/landing-page-tech-img/gaming-img.jpg" className={styles['img-responsive']} />
            </div>
          </Col>
          <Col md={6} className={styles['pr-0']}>
            <h4 className={`${styles['fontW600']} ${styles['text-uppercase']} ${styles['pb-10']}`}><span className={`${styles['populat-cat-title']} ${styles['bdr-btm-green-color']}`}>RC Toys</span> </h4>
            <div>
              <img src="/static/img/landing-page-tech-img/gaming-img1.jpg" className={styles['img-responsive']} />
            </div>
          </Col>
        </div>
        {/* top selling start */}
        <div className={`${styles['top-selling-brands']} ${styles['pt-30']} ${styles['pb-20']}`}>
          <h4 className={`${styles['fontW600']}`}><span className={`${styles['populat-cat-title']} ${styles['bdr-btm-green-color']} ${styles['text-uppercase']}`}>Top Selling </span> </h4>
          <div className={`${styles['flex']} ${styles['pt-30']} ${styles['pb-30']}`}>
            <Col md={2} className={styles['pl-0']}>
              <div className={` ${styles['top-selling-img']} ${styles['flex-center']} ${styles['bg-white']} ${styles['p-35']}`}>
                <img src="/static/img/landing-page-tech-img/top-selling.jpg" className={styles['img-responsive']} />
              </div>
              <div className={`${styles['top-price-details']} ${styles['flex']} ${styles['flex-colum']} ${styles['pt-15']}`}>
                <span className={styles['flx-spacebw-alignc']}>
                  <span className={`${styles['fs-12']} ${styles['lgt-blue']}`}>Iphone</span>
                  <SVGComponent clsName={`${styles['wistlist-logo']}`} src="icons/wish-list/wish-list-icon" />
                </span>
                <span><span className={styles['fs-24']}>1200</span> <span>SAR</span><span className={`${styles['fs-12']} ${styles['google-clr']} ${styles['pl-10']}`}>-60%</span></span>
                <div className={styles['flex-center']}>
                  <span className={`${styles['rating']} ${styles['fs-10']} ${styles['white-color']}`}>4.5</span>
                  <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pl-5']}`}>187 Ratings | 25 Reviews</span>
                </div>
              </div>
            </Col>
            <Col md={2} className={styles['pl-0']}>
              <div className={` ${styles['top-selling-img']} ${styles['flex-center']} ${styles['bg-white']} ${styles['p-35']}`}>
                <img src="/static/img/landing-page-tech-img/top-selling1.jpg" className={styles['img-responsive']} />
              </div>
              <div className={`${styles['top-price-details']} ${styles['flex']} ${styles['flex-colum']} ${styles['pt-15']}`}>
                <span className={styles['flx-spacebw-alignc']}>
                  <span className={`${styles['fs-12']} ${styles['lgt-blue']}`}>HP</span>
                  <SVGComponent clsName={`${styles['wistlist-logo']}`} src="icons/wish-list/wish-list-icon" />
                </span>
                <span><span className={styles['fs-24']}>1200</span> <span>SAR</span><span className={`${styles['fs-12']} ${styles['google-clr']} ${styles['pl-10']}`}>-60%</span></span>
                <div className={styles['flex-center']}>
                  <span className={`${styles['rating']} ${styles['fs-10']} ${styles['white-color']}`}>4.5</span>
                  <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pl-5']}`}>187 Ratings | 25 Reviews</span>
                </div>
              </div>
            </Col>
            <Col md={2} className={styles['pl-0']}>
              <div className={` ${styles['top-selling-img']} ${styles['flex-center']} ${styles['bg-white']} ${styles['p-35']}`}>
                <img src="/static/img/landing-page-tech-img/top-selling2.jpg" className={styles['img-responsive']} />
              </div>
              <div className={`${styles['top-price-details']} ${styles['flex']} ${styles['flex-colum']} ${styles['pt-15']}`}>
                <span className={styles['flx-spacebw-alignc']}>
                  <span className={`${styles['fs-12']} ${styles['lgt-blue']}`}>Quenchua</span>
                  <SVGComponent clsName={`${styles['wistlist-logo']}`} src="icons/wish-list/wish-list-icon" />
                </span>
                <span><span className={styles['fs-24']}>1200</span> <span>SAR</span><span className={`${styles['fs-12']} ${styles['google-clr']} ${styles['pl-10']}`}>-60%</span></span>
                <div className={styles['flex-center']}>
                  <span className={`${styles['rating']} ${styles['fs-10']} ${styles['white-color']}`}>4.5</span>
                  <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pl-5']}`}>187 Ratings | 25 Reviews</span>
                </div>
              </div>
            </Col>
            <Col md={2} className={styles['pl-0']}>
              <div className={` ${styles['top-selling-img']} ${styles['flex-center']} ${styles['bg-white']} ${styles['p-35']}`}>
                <img src="/static/img/landing-page-tech-img/top-selling3.jpg" className={styles['img-responsive']} />
              </div>
              <div className={`${styles['top-price-details']} ${styles['flex']} ${styles['flex-colum']} ${styles['pt-15']}`}>
                <span className={styles['flx-spacebw-alignc']}>
                  <span className={`${styles['fs-12']} ${styles['lgt-blue']}`}>Bosh</span>
                  <SVGComponent clsName={`${styles['wistlist-logo']}`} src="icons/wish-list/wish-list-icon" />
                </span>
                <span><span className={styles['fs-24']}>1200</span> <span>SAR</span><span className={`${styles['fs-12']} ${styles['google-clr']} ${styles['pl-10']}`}>-60%</span></span>
                <div className={styles['flex-center']}>
                  <span className={`${styles['rating']} ${styles['fs-10']} ${styles['white-color']}`}>4.5</span>
                  <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pl-5']}`}>187 Ratings | 25 Reviews</span>
                </div>
              </div>
            </Col>
            <Col md={2} className={styles['pl-0']}>
              <div className={` ${styles['top-selling-img']} ${styles['flex-center']} ${styles['bg-white']} ${styles['p-35']}`}>
                <img src="/static/img/landing-page-tech-img/top-selling4.jpg" className={styles['img-responsive']} />
              </div>
              <div className={`${styles['top-price-details']} ${styles['flex']} ${styles['flex-colum']} ${styles['pt-15']}`}>
                <span className={styles['flx-spacebw-alignc']}>
                  <span className={`${styles['fs-12']} ${styles['lgt-blue']}`}>Red Cat</span>
                  <SVGComponent clsName={`${styles['wistlist-logo']}`} src="icons/wish-list/wish-list-icon" />
                </span>
                <span><span className={styles['fs-24']}>1200</span> <span>SAR</span><span className={`${styles['fs-12']} ${styles['google-clr']} ${styles['pl-10']}`}>-60%</span></span>
                <div className={styles['flex-center']}>
                  <span className={`${styles['rating']} ${styles['fs-10']} ${styles['white-color']}`}>4.5</span>
                  <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pl-5']}`}>187 Ratings | 25 Reviews</span>
                </div>
              </div>
            </Col>
            <Col md={2} className={styles['pl-0']}>
              <div className={` ${styles['top-selling-img']} ${styles['flex-center']} ${styles['bg-white']} ${styles['p-35']}`}>
                <img src="/static/img/landing-page-tech-img/top-selling5.jpg" className={styles['img-responsive']} />
              </div>
              <div className={`${styles['top-price-details']} ${styles['flex']} ${styles['flex-colum']} ${styles['pt-15']}`}>
                <span className={styles['flx-spacebw-alignc']}>
                  <span className={`${styles['fs-12']} ${styles['lgt-blue']}`}>Samsung</span>
                  <SVGComponent clsName={`${styles['wistlist-logo']}`} src="icons/wish-list/wish-list-icon" />
                </span>
                <span><span className={styles['fs-24']}>1200</span> <span>SAR</span><span className={`${styles['fs-12']} ${styles['google-clr']} ${styles['pl-10']}`}>-60%</span></span>
                <div className={styles['flex-center']}>
                  <span className={`${styles['rating']} ${styles['fs-10']} ${styles['white-color']}`}>4.5</span>
                  <span className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['pl-5']}`}>187 Ratings | 25 Reviews</span>
                </div>
              </div>
            </Col>
          </div>
        </div>
        {/* home & kitchen application */}
        <div className={styles['home-kitchan-part']}>
          <h4 className={`${styles['fontW600']} ${styles['text-uppercase']} ${styles['pb-10']}`}><span className={`${styles['populat-cat-title']} ${styles['bdr-btm-green-color']}`}>Home & Kitchen  </span>  Appliances</h4>
          <Col md={2} className={styles['pl-0']}>
            <div className={`${styles['mt-20']} ${styles['relative']} ${styles['home-kitchan-inn']}`}>
              <img src="/static/img/landing-page-tech-img/home-kitchen1.jpg" className={styles['img-responsive']} />
              <div className={`${styles['absolute']} ${styles['home-price-details']} ${styles['white-color']} ${styles['flex']} ${styles['flex-colum']}`}>
                <span className={`${styles['fs-18']} ${styles['fontW300']}`}>Irons</span>
                <span className={`${styles['fontW600']} ${styles['fs-18']}`}>50 SAR</span>
                <span className={`${styles['fontW600']} ${styles['fs-12']}`}>ONWARDS</span>
              </div>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`${styles['mt-20']} ${styles['relative']} ${styles['home-kitchan-inn']}`}>
              <img src="/static/img/landing-page-tech-img/home-kitchen.jpg" className={styles['img-responsive']} />
              <div className={`${styles['absolute']} ${styles['home-price-details']} ${styles['white-color']} ${styles['flex']} ${styles['flex-colum']}`}>
                <span className={`${styles['fs-18']} ${styles['fontW300']}`}>Refrigerators</span>
                <span className={`${styles['fontW600']} ${styles['fs-18']}`}>50 SAR</span>
                <span className={`${styles['fontW600']} ${styles['fs-12']}`}>ONWARDS</span>
              </div>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`${styles['mt-20']} ${styles['relative']} ${styles['home-kitchan-inn']}`}>
              <img src="/static/img/landing-page-tech-img/home-kitchen2.jpg" className={styles['img-responsive']} />
              <div className={`${styles['absolute']} ${styles['home-price-details']} ${styles['white-color']} ${styles['flex']} ${styles['flex-colum']}`}>
                <span className={`${styles['fs-18']} ${styles['fontW300']}`}>Mixer & Juicers</span>
                <span className={`${styles['fontW600']} ${styles['fs-18']}`}>50 SAR</span>
                <span className={`${styles['fontW600']} ${styles['fs-12']}`}>ONWARDS</span>
              </div>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`${styles['mt-20']} ${styles['relative']} ${styles['home-kitchan-inn']}`}>
              <img src="/static/img/landing-page-tech-img/home-kitchen3.jpg" className={styles['img-responsive']} />
              <div className={`${styles['absolute']} ${styles['home-price-details']} ${styles['white-color']} ${styles['flex']} ${styles['flex-colum']}`}>
                <span className={`${styles['fs-18']} ${styles['fontW300']}`}>Washing Machines</span>
                <span className={`${styles['fontW600']} ${styles['fs-18']}`}>50 SAR</span>
                <span className={`${styles['fontW600']} ${styles['fs-12']}`}>ONWARDS</span>
              </div>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`${styles['mt-20']} ${styles['relative']} ${styles['home-kitchan-inn']}`}>
              <img src="/static/img/landing-page-tech-img/home-kitchen4.jpg" className={styles['img-responsive']} />
              <div className={`${styles['absolute']} ${styles['home-price-details']} ${styles['white-color']} ${styles['flex']} ${styles['flex-colum']}`}>
                <span className={`${styles['fs-18']} ${styles['fontW300']}`}>Vaccum Cleaners</span>
                <span className={`${styles['fontW600']} ${styles['fs-18']}`}>50 SAR</span>
                <span className={`${styles['fontW600']} ${styles['fs-12']}`}>ONWARDS</span>
              </div>
            </div>
          </Col>
          <Col md={2} className={styles['pl-0']}>
            <div className={`${styles['mt-20']} ${styles['relative']} ${styles['home-kitchan-inn']}`}>
              <img src="/static/img/landing-page-tech-img/home-kitchen1.jpg" className={styles['img-responsive']} />
              <div className={`${styles['absolute']} ${styles['home-price-details']} ${styles['white-color']} ${styles['flex']} ${styles['flex-colum']}`}>
                <span className={`${styles['fs-18']} ${styles['fontW300']}`}>Irons</span>
                <span className={`${styles['fontW600']} ${styles['fs-18']}`}>50 SAR</span>
                <span className={`${styles['fontW600']} ${styles['fs-12']}`}>ONWARDS</span>
              </div>
            </div>
          </Col>
        </div>
        {/* brands you love start */}
        <div className={`${styles['brands-love-part']} ${styles['pt-30']} ${styles['pb-30']} ${styles['clear-b']}`}>
          <h4 className={`${styles['fontW600']} ${styles['text-uppercase']}`}><span className={`${styles['populat-cat-title']} ${styles['bdr-btm-green-color']}`}>Brands </span>  you love</h4>
          <div className={styles['mt-25']}>
            <Col md={2} className={styles['pl-0']}>
              <div className={`${styles['brands-inn']} ${styles['flex-center']} ${styles['justify-center']} ${styles['bg-white']}`}>
                <img src="/static/img/landing-page-tech-img/brands5.jpg" className={styles['brand-apple']} />
              </div>
              <div className={`${styles['flex']} ${styles['flex-wrp']} ${styles['brand-litem-list']} ${styles['fs-10']}`}>
                <span>Mac</span>
                <span>iPhone</span>
                <span>iPad</span>
                <span>Watch</span>
                <span>Tv</span>
              </div>
            </Col>
            <Col md={2} className={styles['pl-0']}>
              <div className={`${styles['brands-inn']} ${styles['flex-center']} ${styles['justify-center']} ${styles['bg-white']}`}>
                <img src="/static/img/landing-page-tech-img/brands.jpg" className={styles['brand-samsung']} />
              </div>
              <div className={`${styles['flex']} ${styles['flex-wrp']} ${styles['brand-litem-list']} ${styles['fs-10']}`}>
                <span>Mobiles</span>
                <span>Tablets</span>
                <span>Audio & Video</span>
                <span>Watch</span>
                <span>Tv</span>
              </div>
            </Col>
            <Col md={2} className={styles['pl-0']}>
              <div className={`${styles['brands-inn']} ${styles['flex-center']} ${styles['justify-center']} ${styles['bg-white']}`}>
                <img src="/static/img/landing-page-tech-img/brands1.jpg" className={styles['brand-samsung']} />
              </div>
              <div className={`${styles['flex']} ${styles['flex-wrp']} ${styles['brand-litem-list']} ${styles['fs-10']}`}>
                <span>Mobiles</span>
                <span>Tablets</span>
                <span>Audio & Video</span>
                <span>Cameras</span>
                <span>Tv</span>
                <span>Laptops</span>
              </div>
            </Col>
            <Col md={2} className={styles['pl-0']}>
              <div className={`${styles['brands-inn']} ${styles['flex-center']} ${styles['justify-center']} ${styles['bg-white']}`}>
                <img src="/static/img/landing-page-tech-img/brands2.jpg" className={styles['brand-lg']} />
              </div>
              <div className={`${styles['flex']} ${styles['flex-wrp']} ${styles['brand-litem-list']} ${styles['fs-10']}`}>
                <span>Mobiles</span>
                <span>Tablets</span>
                <span>Audio & Video</span>
                <span>Cameras</span>
                <span>Tv</span>
                <span>Power Banks</span>
              </div>
            </Col>
            <Col md={2} className={styles['pl-0']}>
              <div className={`${styles['brands-inn']} ${styles['flex-center']} ${styles['justify-center']} ${styles['bg-white']}`}>
                <img src="/static/img/landing-page-tech-img/brands3.jpg" className={styles['brand-dell']} />
              </div>
              <div className={`${styles['flex']} ${styles['flex-wrp']} ${styles['brand-litem-list']} ${styles['fs-10']}`}>
                <span>Laptops</span>
                <span>Personal Computers</span>
              </div>
            </Col>
            <Col md={2} className={styles['pl-0']}>
              <div className={`${styles['brands-inn']} ${styles['flex-center']} ${styles['justify-center']} ${styles['bg-white']}`}>
                <img src="/static/img/landing-page-tech-img/brands4.jpg" className={styles['brand-mi']} />
              </div>
              <div className={`${styles['flex']} ${styles['flex-wrp']} ${styles['brand-litem-list']} ${styles['fs-10']}`}>
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

export default Electronics;
