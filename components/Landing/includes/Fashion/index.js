import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import SVGComponent from '../../../common/SVGComponet';
import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Landing/includes/Fashion/fashion');

const Fashion = () => (
  <div className={styles['fashion-main-part']}>
    <Grid fluid={true} className={styles['p-0']}>
      <div className={`${styles['flex']} ${styles['fashion-banner-main']} ${styles['relative']}`}>
        <img src="/static/img/landing-page-fashion/fashion-banner.png" className={styles['img-responsive']} />
        <div className={`${styles['absolute']} ${styles['flex']} ${styles['flex-colum']} ${styles['banner-label']}`}>
          <span className={`${styles['main-quation']} ${styles['fs-44']}`}>Up to 50% Off on Party Dresses</span>
          <span className={`${styles['banner-dec']} ${styles['fs-16']}`}>“You can have anything you want in life if you dress for it.”</span>
          <span className={`${styles['pt-25']} ${styles['shop-now-btn']}`}><a className={`${styles['fs-12']} ${styles['fontW600']} ${styles['border-radius4']}`}>SHOP NOW</a></span>
        </div>
      </div>
    </Grid>
    <Grid>
      <div className={`${styles['banner-sub-slider']} ${styles['flex']} ${styles['pt-20']} ${styles['pb-20']}`}>
        <Col md={3} className={styles['pl-0']}>
          <div className={`${styles['banner-sub-slider-inn']} ${styles['bg-white']} ${styles['p-10']} ${styles['flex-center']} ${styles['border-radius4']}`}>
            <Col md={6} className={styles['pl-0']}>
              <div className={styles['banner-sub-slider-inn-img']}>
                <img src="/static/img/landing-page-fashion/fashiontop-img.jpg" className={styles['img-responsive']} />
              </div>
            </Col>
            <Col md={6} className={styles['p-0']}>
              <div className={`${styles['flex']} ${styles['flex-colum']}`}>
                <span className={`${styles['lobster-family']} ${styles['fs-24']}`}>Mens Shoes</span>
                <span className={styles['fs-12']}>They lift you physically & emotionally.</span>
                <span className={`${styles['pt-25']} ${styles['shop-now-btn']}`}><a className={`${styles['fs-12']} ${styles['fontW600']} ${styles['border-radius4']}`}>Buy NOW</a></span>
              </div>
            </Col>
          </div>
        </Col>
        <Col md={3} className={styles['pl-0']}>
          <div className={`${styles['banner-sub-slider-inn']} ${styles['bg-white']} ${styles['p-10']} ${styles['flex-center']} ${styles['border-radius4']}`}>
            <Col md={6} className={styles['pl-0']}>
              <div className={styles['banner-sub-slider-inn-img']}>
                <img src="/static/img/landing-page-fashion/fashiontop-img1.jpg" className={styles['img-responsive']} />
              </div>
            </Col>
            <Col md={6} className={styles['p-0']}>
              <div className={`${styles['flex']} ${styles['flex-colum']}`}>
                <span className={`${styles['lobster-family']} ${styles['fs-24']}`}>Women’s Dress</span>
                <span className={styles['fs-12']}>When in doubt, wear red.</span>
                <span className={`${styles['pt-25']} ${styles['shop-now-btn']}`}><a className={`${styles['fs-12']} ${styles['fontW600']} ${styles['border-radius4']}`}>Buy NOW</a></span>
              </div>
            </Col>
          </div>
        </Col>
        <Col md={3} className={styles['pl-0']}>
          <div className={`${styles['banner-sub-slider-inn']} ${styles['bg-white']} ${styles['p-10']} ${styles['flex-center']} ${styles['border-radius4']}`}>
            <Col md={6} className={styles['pl-0']}>
              <div className={styles['banner-sub-slider-inn-img']}>
                <img src="/static/img/landing-page-fashion/fashiontop-img2.jpg" className={styles['img-responsive']} />
              </div>
            </Col>
            <Col md={6} className={styles['p-0']}>
              <div className={`${styles['flex']} ${styles['flex-colum']}`}>
                <span className={`${styles['lobster-family']} ${styles['fs-24']}`}>Fitness & Sports</span>
                <span className={styles['fs-12']}>Take care of your body.</span>
                <span className={`${styles['pt-25']} ${styles['shop-now-btn']}`}><a className={`${styles['fs-12']} ${styles['fontW600']} ${styles['border-radius4']}`}>Buy NOW</a></span>
              </div>
            </Col>
          </div>
        </Col>
        <Col md={3} className={styles['pl-0']}>
          <div className={`${styles['banner-sub-slider-inn']} ${styles['bg-white']} ${styles['p-10']} ${styles['flex-center']} ${styles['border-radius4']}`}>
            <Col md={6} className={styles['pl-0']}>
              <div className={styles['banner-sub-slider-inn-img']}>
                <img src="/static/img/landing-page-fashion/fashiontop-img3.jpg" className={styles['img-responsive']} />
              </div>
            </Col>
            <Col md={6} className={styles['p-0']}>
              <div className={`${styles['flex']} ${styles['flex-colum']}`}>
                <span className={`${styles['lobster-family']} ${styles['fs-24']}`}>Upto 50% Off on Watches</span>
                <span className={styles['fs-12']}>They lift you physically & emotionally.</span>
                <span className={`${styles['pt-25']} ${styles['shop-now-btn']}`}><a className={`${styles['fs-12']} ${styles['fontW600']} ${styles['border-radius4']}`}>Buy NOW</a></span>
              </div>
            </Col>
          </div>
        </Col>
      </div>
      {/* what new start */}
      <div className={styles['what-new-part']}>
        <h3 className={`${styles['flex-center']} ${styles['what-title']} ${styles['justify-center']} ${styles['relative']} ${styles['lobster-family']} ${styles['pt-20']} ${styles['pb-20']}`}><span className={`${styles['fs-36']} ${styles['lable']} ${styles['pl-10']} ${styles['pr-10']}`}>Whats New</span> <span className={`${styles['absolute']} ${styles['border']}`}></span></h3>
        <div>
          <Col md={6} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <Col md={8} className={`${styles['pl-0']} ${styles['pr-10']}`}>
              <img src="/static/img/landing-page-fashion/what-new.jpg" className={styles['img-responsive']} />
            </Col>
            <Col md={4} className={`${styles['pl-0']} ${styles['pr-10']}`}>
              <div className={styles['chinos-part']}>
                <img src="/static/img/landing-page-fashion/what-new1.jpg" className={styles['img-responsive']} />
                <div className={`${styles['bg-white']} ${styles['chinos-part-inn']}`}>
                  <h6 className={`${styles['m-0']} ${styles['fs-14']} ${styles['fontW600']}`}>Chinos</h6>
                  <span className={styles['disc']}>Up to 50% Off</span>
                </div>
              </div>
            </Col>
          </Col>
          <Col md={6} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <Col md={4} className={`${styles['pl-0']} ${styles['pr-10']}`}>
              <div className={`${styles['new-brands']} ${styles['pb-10']}`}>
                <img src="/static/img/landing-page-fashion/what-new2.jpg" className={styles['img-responsive']} />
                <div className={`${styles['bg-white']} ${styles['chinos-part-inn']}`}>
                  <h6 className={`${styles['m-0']} ${styles['fs-14']} ${styles['fontW600']}`}>Sunglasses</h6>
                  <span className={styles['disc']}>Up to 50% Off</span>
                </div>
              </div>
            </Col>
            <Col md={4} className={`${styles['pl-0']} ${styles['pr-10']}`}>
              <div className={`${styles['new-brands']} ${styles['pb-10']}`}>
                <img src="/static/img/landing-page-fashion/what-new3.jpg" className={styles['img-responsive']} />
                <div className={`${styles['bg-white']} ${styles['chinos-part-inn']}`}>
                  <h6 className={`${styles['m-0']} ${styles['fs-14']} ${styles['fontW600']}`}>Kids Wear</h6>
                  <span className={styles['disc']}>Up to 50% Off</span>
                </div>
              </div>
            </Col>
            <Col md={4} className={`${styles['pl-0']} ${styles['pr-10']}`}>
              <div className={`${styles['new-brands']} ${styles['pb-10']}`}>
                <img src="/static/img/landing-page-fashion/what-new4.jpg" className={styles['img-responsive']} />
                <div className={`${styles['bg-white']} ${styles['chinos-part-inn']}`}>
                  <h6 className={`${styles['m-0']} ${styles['fs-14']} ${styles['fontW600']}`}>Perfumes</h6>
                  <span className={styles['disc']}>Up to 50% Off</span>
                </div>
              </div>
            </Col>
            <Col md={4} className={`${styles['pl-0']} ${styles['pr-10']}`}>
              <div className={`${styles['new-brands']} ${styles['pb-10']}`}>
                <img src="/static/img/landing-page-fashion/what-new5.jpg" className={styles['img-responsive']} />
                <div className={`${styles['bg-white']} ${styles['chinos-part-inn']}`}>
                  <h6 className={`${styles['m-0']} ${styles['fs-14']} ${styles['fontW600']}`}>Jewellery</h6>
                  <span className={styles['disc']}>Up to 50% Off</span>
                </div>
              </div>
            </Col>
            <Col md={4} className={`${styles['pl-0']} ${styles['pr-10']}`}>
              <div className={`${styles['new-brands']} ${styles['pb-10']}`}>
                <img src="/static/img/landing-page-fashion/what-new6.jpg" className={styles['img-responsive']} />
                <div className={`${styles['bg-white']} ${styles['chinos-part-inn']}`}>
                  <h6 className={`${styles['m-0']} ${styles['fs-14']} ${styles['fontW600']}`}>Handbags</h6>
                  <span className={styles['disc']}>Up to 50% Off</span>
                </div>
              </div>
            </Col>
            <Col md={4} className={`${styles['pl-0']} ${styles['pr-10']}`}>
              <div>
                <img src="/static/img/landing-page-fashion/what-new7.jpg" className={styles['img-responsive']} />
              </div>
            </Col>
          </Col>
        </div>
      </div>
      {/* price point start */}
      <div className={`${styles['price-point']} ${styles['clear-b']}`}>
        <h3 className={`${styles['flex-center']} ${styles['what-title']} ${styles['justify-center']} ${styles['relative']} ${styles['lobster-family']} ${styles['pt-40']} ${styles['pb-20']}`}><span className={`${styles['fs-36']} ${styles['lable']} ${styles['pl-10']} ${styles['pr-10']}`}>Price Point</span> <span className={`${styles['absolute']} ${styles['border']}`}></span></h3>
        <div>
          <Col md={2} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['price-point-inn']} ${styles['bg-white']} ${styles['pt-25']} ${styles['pb-25']}`}>
              <h4 className={`${styles['fs-18']} ${styles['fontW600']} ${styles['m-0']}`}>Below SAR 500</h4>
              <span className={styles['fontW300']}>4000+ Products</span>
            </div>
          </Col>
          <Col md={2} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['price-point-inn']} ${styles['bg-white']} ${styles['pt-25']} ${styles['pb-25']}`}>
              <h4 className={`${styles['fs-18']} ${styles['fontW600']} ${styles['m-0']}`}>Below SAR 500</h4>
              <span className={styles['fontW300']}>4000+ Products</span>
            </div>
          </Col>
          <Col md={2} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['price-point-inn']} ${styles['bg-white']} ${styles['pt-25']} ${styles['pb-25']}`}>
              <h4 className={`${styles['fs-18']} ${styles['fontW600']} ${styles['m-0']}`}>Below SAR 500</h4>
              <span className={styles['fontW300']}>4000+ Products</span>
            </div>
          </Col>
          <Col md={2} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['price-point-inn']} ${styles['bg-white']} ${styles['pt-25']} ${styles['pb-25']}`}>
              <h4 className={`${styles['fs-18']} ${styles['fontW600']} ${styles['m-0']}`}>Below SAR 500</h4>
              <span className={styles['fontW300']}>4000+ Products</span>
            </div>
          </Col>
          <Col md={2} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['price-point-inn']} ${styles['bg-white']} ${styles['pt-25']} ${styles['pb-25']}`}>
              <h4 className={`${styles['fs-18']} ${styles['fontW600']} ${styles['m-0']}`}>Below SAR 500</h4>
              <span className={styles['fontW300']}>4000+ Products</span>
            </div>
          </Col>
          <Col md={2} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['flex-colum']} ${styles['price-point-inn']} ${styles['bg-white']} ${styles['pt-25']} ${styles['pb-25']}`}>
              <h4 className={`${styles['fs-18']} ${styles['fontW600']} ${styles['m-0']}`}>Below SAR 500</h4>
              <span className={styles['fontW300']}>4000+ Products</span>
            </div>
          </Col>
        </div>
      </div>
      {/* getting ready to office */}
      <div className={`${styles['getting-ready-part']} ${styles['clear-b']}`}>
        <h3 className={`${styles['flex-center']} ${styles['what-title']} ${styles['justify-center']} ${styles['relative']} ${styles['lobster-family']} ${styles['pt-40']} ${styles['pb-20']}`}><span className={`${styles['fs-36']} ${styles['lable']} ${styles['pl-10']} ${styles['pr-10']}`}>Getting Ready to Office</span> <span className={`${styles['absolute']} ${styles['border']}`}></span></h3>
        <div>
          <Col md={6} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <Col md={8} className={`${styles['pl-0']} ${styles['pr-10']}`}>
              <img src="/static/img/landing-page-fashion/getting-img.jpg" className={styles['img-responsive']} />
            </Col>
            <Col md={4} className={`${styles['pl-0']} ${styles['pr-10']}`}>
              <div className={styles['pb-10']}>
                <img src="/static/img/landing-page-fashion/getting-img2.jpg" className={styles['img-responsive']} />
              </div>
              <div>
                <img src="/static/img/landing-page-fashion/getting-img3.jpg" className={styles['img-responsive']} />
              </div>
            </Col>
          </Col>
          <Col md={6} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <Col md={8} className={`${styles['pl-0']} ${styles['pr-10']}`}>
              <img src="/static/img/landing-page-fashion/getting-img4.jpg" className={styles['img-responsive']} />
            </Col>
            <Col md={4} className={`${styles['pl-0']} ${styles['pr-10']}`}>
              <div className={styles['pb-10']}>
                <img src="/static/img/landing-page-fashion/getting-img5.jpg" className={styles['img-responsive']} />
                <div className={`${styles['bg-white']} ${styles['chinos-part-inn']}`}>
                  <h6 className={`${styles['m-0']} ${styles['fs-14']} ${styles['fontW600']}`}>Womens Formal Shoes</h6>
                  <span className={styles['disc']}>Up to 50% Off</span>
                </div>
              </div>
              <div>
                <img src="/static/img/landing-page-fashion/what-new6.jpg" className={styles['img-responsive']} />
                <div className={`${styles['bg-white']} ${styles['chinos-part-inn']}`}>
                  <h6 className={`${styles['m-0']} ${styles['fs-14']} ${styles['fontW600']}`}>Handbags</h6>
                  <span className={styles['disc']}>Up to 50% Off</span>
                </div>
              </div>
            </Col>
          </Col>
        </div>
      </div>
      {/* shop the look */}
      <div className={`${styles['shop-look-part']} ${styles['clear-b']}`}>
        <h3 className={`${styles['flex-center']} ${styles['what-title']} ${styles['justify-center']} ${styles['relative']} ${styles['lobster-family']} ${styles['pt-40']} ${styles['pb-20']}`}><span className={`${styles['fs-36']} ${styles['lable']} ${styles['pl-10']} ${styles['pr-10']}`}>Shop The Look</span> <span className={`${styles['absolute']} ${styles['border']}`}></span></h3>
        <Col md={3} className={`${styles['pl-0']} ${styles['pr-10']}`}>
          <img src="/static/img/landing-page-fashion/shop-look.jpg" className={styles['img-responsive']} />
        </Col>
        <Col md={3} className={`${styles['pl-0']} ${styles['pr-10']}`}>
          <img src="/static/img/landing-page-fashion/shop-look1.jpg" className={styles['img-responsive']} />
        </Col>
        <Col md={3} className={`${styles['pl-0']} ${styles['pr-10']}`}>
          <img src="/static/img/landing-page-fashion/shop-look2.jpg" className={styles['img-responsive']} />
        </Col>
        <Col md={3} className={`${styles['pl-0']} ${styles['pr-10']}`}>
          <img src="/static/img/landing-page-fashion/shop-look4.jpg" className={styles['img-responsive']} />
        </Col>
      </div>
      {/* styled for you */}
      <div className={`${styles['styled-for-part']} ${styles['clear-b']}`}>
        <h3 className={`${styles['flex-center']} ${styles['what-title']} ${styles['justify-center']} ${styles['relative']} ${styles['lobster-family']} ${styles['pt-40']} ${styles['pb-20']}`}><span className={`${styles['fs-36']} ${styles['lable']} ${styles['pl-10']} ${styles['pr-10']}`}>Want to See It Styled for You ?</span> <span className={`${styles['absolute']} ${styles['border']}`}></span></h3>
        <Col md={2} className={`${styles['pl-0']} ${styles['pr-10']}`}>
          <img src="/static/img/landing-page-fashion/styled-for.jpg" className={styles['img-responsive']} />
        </Col>
        <Col md={2} className={`${styles['pl-0']} ${styles['pr-10']}`}>
          <img src="/static/img/landing-page-fashion/styled-for1.jpg" className={styles['img-responsive']} />
        </Col>
        <Col md={2} className={`${styles['pl-0']} ${styles['pr-10']}`}>
          <img src="/static/img/landing-page-fashion/styled-for2.jpg" className={styles['img-responsive']} />
        </Col>
        <Col md={2} className={`${styles['pl-0']} ${styles['pr-10']}`}>
          <img src="/static/img/landing-page-fashion/styled-for3.jpg" className={styles['img-responsive']} />
        </Col>
        <Col md={2} className={`${styles['pl-0']} ${styles['pr-10']}`}>
          <img src="/static/img/landing-page-fashion/styled-for3.jpg" className={styles['img-responsive']} />
        </Col>
        <Col md={2} className={`${styles['pl-0']} ${styles['pr-10']}`}>
          <img src="/static/img/landing-page-fashion/styled-for3.jpg" className={styles['img-responsive']} />
        </Col>
      </div>
      {/* top brands */}
      <div className={`${styles['top-brand-part']} ${styles['clear-b']}`}>
        <h3 className={`${styles['flex-center']} ${styles['what-title']} ${styles['justify-center']} ${styles['relative']} ${styles['lobster-family']} ${styles['pt-40']} ${styles['pb-20']}`}><span className={`${styles['fs-36']} ${styles['lable']} ${styles['pl-10']} ${styles['pr-10']}`}>Top Brands</span> <span className={`${styles['absolute']} ${styles['border']}`}></span></h3>
        <div className={styles['flex']}>
          <Col md={2} className={`${styles['pl-0']} ${styles['pr-10']}`}>
            <div className={`   ${styles['flex-colum']} ${styles['bg-white']} ${styles['top-brand-part-inn']} ${styles['border-radius4']}`}>
              <div className={`${styles['adidas-logo']} ${styles['flex-center']}`}>
                <img src="/static/img/landing-page-fashion/top-brands.jpg" className={styles['img-responsive']} />
              </div>
              <div className={`${styles['pt-20']} ${styles['t-c']} ${styles['top-brand-list']}`}>
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
            <div className={`${styles['flex-center']}  ${styles['flex-colum']} ${styles['bg-white']} ${styles['top-brand-part-inn']} ${styles['border-radius4']}`}>
              <div className={`${styles['canvali-logo']} ${styles['flex-center']}`}>
                <img src="/static/img/landing-page-fashion/top-brands1.jpg" className={styles['img-responsive']} />
              </div>
              <div className={`${styles['pt-20']} ${styles['t-c']} ${styles['top-brand-list']}`}>
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
            <div className={`${styles['flex-center']}  ${styles['flex-colum']} ${styles['bg-white']} ${styles['top-brand-part-inn']} ${styles['border-radius4']}`}>
              <div className={`${styles['dg-logo']} ${styles['flex-center']}`}>
                <img src="/static/img/landing-page-fashion/top-brands2.jpg" className={styles['img-responsive']} />
              </div>
              <div className={`${styles['pt-20']} ${styles['t-c']} ${styles['top-brand-list']}`}>
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
            <div className={`${styles['flex-center']}  ${styles['flex-colum']} ${styles['bg-white']} ${styles['top-brand-part-inn']} ${styles['border-radius4']}`}>
              <div className={`${styles['dg-logo']} ${styles['flex-center']}`}>
                <img src="/static/img/landing-page-fashion/top-brands3.jpg" className={styles['img-responsive']} />
              </div>
              <div className={`${styles['pt-20']} ${styles['t-c']} ${styles['top-brand-list']}`}>
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
            <div className={`${styles['flex-center']}  ${styles['flex-colum']} ${styles['bg-white']} ${styles['top-brand-part-inn']} ${styles['border-radius4']}`}>
              <div className={`${styles['adidas-logo']} ${styles['flex-center']}`}>
                <img src="/static/img/landing-page-fashion/top-brands4.jpg" className={styles['img-responsive']} />
              </div>
              <div className={`${styles['pt-20']} ${styles['t-c']} ${styles['top-brand-list']}`}>
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
            <div className={`${styles['flex-center']}  ${styles['flex-colum']} ${styles['bg-white']} ${styles['top-brand-part-inn']} ${styles['border-radius4']}`}>
              <div className={`${styles['guc-logo']} ${styles['flex-center']}`}>
                <img src="/static/img/landing-page-fashion/top-brands5.jpg" className={styles['img-responsive']} />
              </div>
              <div className={`${styles['pt-20']} ${styles['t-c']} ${styles['top-brand-list']}`}>
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
        </div>
      </div>
    </Grid>
  </div>
);

export default Fashion;
