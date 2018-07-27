import { Grid, Row, Col } from 'react-bootstrap';
import SVGComponent from '../common/SVGComponet';
import { mergeCss } from '../../utils/cssUtil';
import publicUrls from '../../constants';
const styles = mergeCss('components/Footer/footer');

const FooterBar = props => (
  <div className={`${styles['footer-container']} ${styles['mt-25']}`}>
    <div className={`${styles['footer-container-inn']} ${styles['pt-40']} ${styles['pb-40']}`}>
      <Grid>
        <Row>
          <Col md={3}>
            <div className={`${styles['flex-center']} ${styles['border-radius4']} ${styles['footer-suport-part']} ${styles['p-15']}`}>
              <span className={`${styles['flex']} ${styles['quation-bar']}`}>
                <SVGComponent clsName={`${styles['quation-bar-inn']}`} src="icons/common-icon/quation" />
              </span>
              <div className={`${styles['flex']} ${styles['flex-colum']} ${styles['pl-20']}`}>
                <span className={`${styles['fontW600']} ${styles['text-uppercase']}`}>Got a question? </span>
                <span className={styles['footer-suport-title']}>wecare@tila.com | 900-66666</span>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <div className={`${styles['flex-center']} ${styles['border-radius4']} ${styles['footer-suport-part']} ${styles['p-15']}`}>
              <span className={`${styles['flex']} ${styles['quation-bar']}`}>
                <SVGComponent clsName={`${styles['quation-bar-inn']}`} src="icons/common-icon/guarantee" />
              </span>
              <div className={`${styles['flex']} ${styles['flex-colum']} ${styles['pl-20']}`}>
                <span className={`${styles['fontW600']} ${styles['text-uppercase']}`}>100% ORIGINAL  </span>
                <span className={styles['footer-suport-title']}>guarantee for all products at tila.com</span>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <div className={`${styles['flex-center']} ${styles['border-radius4']} ${styles['footer-suport-part']} ${styles['p-15']}`}>
              <span className={`${styles['flex']} ${styles['quation-bar']}`}>
                <SVGComponent clsName={`${styles['quation-bar-inn']}`} src="icons/common-icon/return" />
              </span>
              <div className={`${styles['flex']} ${styles['flex-colum']} ${styles['pl-20']}`}>
                <span className={`${styles['fontW600']} ${styles['text-uppercase']}`}>Return within 30days </span>
                <span className={styles['footer-suport-title']}>placing your order</span>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <div className={`${styles['flex-center']} ${styles['border-radius4']} ${styles['footer-suport-part']} ${styles['p-15']}`}>
              <span className={`${styles['flex']} ${styles['quation-bar']}`}>
                <SVGComponent clsName={`${styles['quation-bar-inn']}`} src="icons/common-icon/trust-secure" />
              </span>
              <div className={`${styles['flex']} ${styles['flex-colum']} ${styles['pl-20']}`}>
                <span className={`${styles['fontW600']} ${styles['text-uppercase']}`}>Trust pay  </span>
                <span className={styles['footer-suport-title']}>100% secure payments with tila</span>
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
    <div className={`${styles['footer-menu-items']} ${styles['pt-30']} ${styles['pb-30']} ${styles['bg-white']}`}>
      <Grid>
        <Row>
          <Col md={3}>
            <h4 className={`${styles['fontW600']} ${styles['fs-16']} ${styles['flex-center']}`}>
              <SVGComponent clsName={`${styles['footer-list-icon']} ${styles['mr-10']}`} src="icons/footers-icons/fashion" />
              Fashion
            </h4>
            <ul className={`${styles['pl-30']} ${styles['lne-ht2']}`}>
              <li>Women’s fashion</li>
              <li>Men’s fashion</li>
              <li>Gir’s Fashion</li>
              <li>Boy’s Fashion</li>
              <li>Watches</li>
              <li>Jewellery</li>
              <li>Women’s Handbags</li>
              <li>Men’s eyewear</li>
            </ul>
          </Col>
          <Col md={3}>
            <h4 className={`${styles['fontW600']} ${styles['fs-16']} ${styles['flex-center']}`}>
              <SVGComponent clsName={`${styles['footer-list-icon']} ${styles['mr-10']}`} src="icons/common-icon/processor-icon" />
              Electronics
            </h4>
            <ul className={`${styles['pl-30']} ${styles['lne-ht2']}`}>
              <li>Mobiles</li>
              <li>Tablets</li>
              <li>Laptops</li>
              <li>Home appliances</li>
              <li>Camera, Photo & Video</li>
              <li>Televisions</li>
              <li>Headphones</li>
              <li>Video Games</li>
            </ul>
          </Col>
          <Col md={2}>
            <h4 className={`${styles['fontW600']} ${styles['fs-16']} ${styles['flex-center']}`}>
              <SVGComponent clsName={`${styles['footer-list-icon']} ${styles['mr-10']}`} src="icons/footers-icons/life-style" />
              Lifestyle</h4>
            <ul className={`${styles['pl-30']} ${styles['lne-ht2']}`}>
              <li> Home Decor</li>
              <li>Kitchen & Dining</li>
              <li>Bath</li>
              <li>Home appliances</li>
              <li>Tools & Home improvement</li>
              <li>Audio & Video</li>
              <li>Furniture</li>
              <li>Patio, Lawn & Garden</li>
            </ul>
          </Col>
          <Col md={2}>
            <h4 className={`${styles['fontW600']} ${styles['fs-16']} ${styles['flex-center']}`}>
              <SVGComponent clsName={`${styles['footer-list-icon']} ${styles['mr-10']}`} src="icons/footers-icons/beauty-makeup" />
              Beauty & Makeup</h4>
            <ul className={`${styles['pl-30']} ${styles['lne-ht2']}`}>
              <li>Fragrance</li>
              <li>Make-Up</li>
              <li>Haircare</li>
              <li>SkincareAudio & Video</li>
              <li>Personal Care</li>
              <li>Tools & Accessories</li>
              <li>Men’s grooming</li>
            </ul>
          </Col>

          <Col md={2}>
            <h4 className={`${styles['fontW600']} ${styles['fs-16']}`}>Top Brands</h4>
            <ul className={`${styles['pl-0']} ${styles['lne-ht2']} ${styles['top-brands']}`}>
              <li className={`${styles['flex']} ${styles['mb-20']} ${styles['brand-icon']}`}>
                <img src="/static/img/bg-img/samsung-img.jpg" className={styles['img-responsive']} />
              </li>
              <li className={`${styles['flex']} ${styles['mb-20']} ${styles['apple-icon']}`}><img src="/static/img/bg-img/apple.jpg" className={styles['img-responsive']} /></li>
              <li className={`${styles['flex']} ${styles['mb-20']} ${styles['sony-icon']}`}><img src="/static/img/bg-img/sony.jpg" className={styles['img-responsive']} /></li>
              <li className={`${styles['flex']} ${styles['mb-20']} ${styles['brand-icon']}`}><img src="/static/img/bg-img/philips.jpg" className={styles['img-responsive']} /></li>
              <li className={`${styles['flex']} ${styles['mb-20']} ${styles['brand-icon']}`}><img src="/static/img/bg-img/microsoft.jpg" className={styles['img-responsive']} /></li>
            </ul>
          </Col>
        </Row>
      </Grid>
    </div>
    {/* social part start */}
    <div className={`${styles['footer-social-list-main']} ${styles['pt-40']} ${styles['pb-40']} ${styles['bg-white']}`}>
      <Grid>
        <Row>
          <Col md={3} className={styles['pr-0']}>
            <h4 className={styles['flex-center']}>
              <span className={`${styles['footer-social-title']} ${styles['mr-10']}`}><img src="/static/img/bg-img/bitmap-social-fb.jpg" className={styles['img-responsive']} /></span>
              <span className={`${styles['lgt-blue']} ${styles['fontW600']}`}>On Facebook</span>
              <span className={`${styles['follow-fb-btn']} ${styles['fs-10']} ${styles['lne-ht2']} ${styles['white-color']} ${styles['ml-10']} ${styles['pl-15']} ${styles['pr-15']}`}>Follow</span>
            </h4>
            <div className={`${styles['footer-social-list-main-inn']} ${styles['pr-10']}`}>
              <div className={`${styles['sc-part']} ${styles['pt-15']} ${styles['pb-15']} ${styles['flex']}`}>
                <Col md={4} className={styles['p-0']}>
                  <div className={styles['footer-sc-img']}>
                    <img src="/static/img/bg-img/bitmapf8.jpg" className={styles['img-responsive']} />
                  </div>
                </Col>
                <Col md={8} className={styles['pr-0']}>
                  <span className={styles['flex-center']}>
                    <span className={styles['footer-sc-logo']}>
                      <img src="/static/img/bg-img/bitmap-logo.jpg" className={styles['img-responsive']} />
                    </span>
                    <span className={`${styles['fs-12']} ${styles['lgt-blue']} ${styles['pl-10']}`}>H&M</span>
                  </span>
                  <p className={`${styles['thick-gry-clr']} ${styles['m-0']} ${styles['pt-5']}`}>Get flawless & even-toned skin with Max Factor Panstik</p>
                  <span className={`${styles['fs-12']} ${styles['footer-time']}`}>2 hours ago</span>
                </Col>
              </div>
              <div className={`${styles['sc-part']} ${styles['pt-15']} ${styles['pb-15']} ${styles['flex']}`}>
                <Col md={4} className={styles['p-0']}>
                  <div className={styles['footer-sc-img']}>
                    <img src="/static/img/bg-img/bitmap.jpg" className={styles['img-responsive']} />
                  </div>
                </Col>
                <Col md={8} className={styles['pr-0']}>
                  <span className={styles['flex-center']}>
                    <span className={styles['footer-sc-logo']}>
                      <img src="/static/img/bg-img/levis.jpg" className={styles['img-responsive']} />
                    </span>
                    <span className={`${styles['fs-12']} ${styles['lgt-blue']} ${styles['pl-10']}`}>Levis</span>
                  </span>
                  <p className={`${styles['thick-gry-clr']} ${styles['m-0']} ${styles['pt-5']}`}>Looks great. Feels great. It's called perfect for a reason.</p>
                  <span className={`${styles['fs-12']} ${styles['footer-time']}`}>2 hours ago</span>
                </Col>
              </div>
            </div>
          </Col>
          <Col md={3} className={styles['pr-0']}>
            <h4 className={styles['flex-center']}>
              <span className={`${styles['footer-social-title']} ${styles['mr-10']}`}><img src="/static/img/bg-img/bitmap-instgram.jpg" className={styles['img-responsive']} /></span>
              <span className={`${styles['fontW600']}`}> On Instagram</span>
              <span className={`${styles['follow-inst-btn']} ${styles['fs-10']} ${styles['lne-ht2']} ${styles['white-color']} ${styles['ml-10']} ${styles['pl-15']} ${styles['pr-15']}`}>Follow</span>
            </h4>
            <div className={`${styles['footer-social-list-main-inn']} ${styles['pr-10']}`}>
              <div className={`${styles['sc-part']} ${styles['pt-15']} ${styles['pb-15']} ${styles['flex']}`}>
                <Col md={4} className={styles['p-0']}>
                  <div className={styles['footer-sc-img']}>
                    <img src="/static/img/bg-img/bitmapf1.jpg" className={styles['img-responsive']} />
                  </div>
                </Col>
                <Col md={8} className={styles['pr-0']}>
                  <span className={styles['flex-center']}>
                    <span className={styles['footer-sc-logo']}>
                      <img src="/static/img/bg-img/sony-bg.jpg" className={styles['img-responsive']} />
                    </span>
                    <span className={`${styles['fs-12']} ${styles['lgt-blue']} ${styles['pl-10']}`}>Sony India</span>
                  </span>
                  <p className={`${styles['thick-gry-clr']} ${styles['m-0']} ${styles['pt-5']}`}>Get flawless & even-toned skin with Max Factor Panstik</p>
                  <span className={`${styles['fs-12']} ${styles['footer-time']}`}>2 hours ago</span>
                </Col>
              </div>
              <div className={`${styles['sc-part']} ${styles['pt-15']} ${styles['pb-15']} ${styles['flex']}`}>
                <Col md={4} className={styles['p-0']}>
                  <div className={styles['footer-sc-img']}>
                    <img src="/static/img/bg-img/bitmapf2.jpg" className={styles['img-responsive']} />
                  </div>
                </Col>
                <Col md={8} className={styles['pr-0']}>
                  <span className={styles['flex-center']}>
                    <span className={styles['footer-sc-logo']}>
                      <img src="/static/img/bg-img/levis.jpg" className={styles['img-responsive']} />
                    </span>
                    <span className={`${styles['fs-12']} ${styles['lgt-blue']} ${styles['pl-10']}`}>Levis</span>
                  </span>
                  <p className={`${styles['thick-gry-clr']} ${styles['m-0']} ${styles['pt-5']}`}>Get flawless & even-toned skin with Max Factor Panstik</p>
                  <span className={`${styles['fs-12']} ${styles['footer-time']}`}>2 hours ago</span>
                </Col>
              </div>
            </div>
          </Col>
          <Col md={3} className={styles['pr-0']}>
            <h4 className={styles['flex-center']}>
              <span className={`${styles['footer-social-title']} ${styles['mr-10']}`}><img src="/static/img/bg-img/bitmap-twitter.jpg" className={styles['img-responsive']} /></span>
              <span className={`${styles['twitter-clr']} ${styles['fontW600']}`}>On Twitter</span>
              <span className={`${styles['follow-twi-btn']} ${styles['fs-10']} ${styles['lne-ht2']} ${styles['white-color']} ${styles['ml-10']} ${styles['pl-15']} ${styles['pr-15']}`}>Follow</span>
            </h4>
            <div className={`${styles['footer-social-list-main-inn']} ${styles['pr-10']}`}>
              <div className={`${styles['sc-part']} ${styles['pt-15']} ${styles['pb-15']} ${styles['flex']}`}>
                <Col md={4} className={styles['p-0']}>
                  <div className={styles['footer-sc-img']}>
                    <img src="/static/img/bg-img/bitmapf3.jpg" className={styles['img-responsive']} />
                  </div>
                </Col>
                <Col md={8} className={styles['pr-0']}>
                  <span className={styles['flex-center']}>
                    <span className={styles['footer-sc-logo']}>
                      <img src="/static/img/bg-img/puma.jpg" className={styles['img-responsive']} />
                    </span>
                    <span className={`${styles['fs-12']} ${styles['lgt-blue']} ${styles['pl-10']}`}>Puma</span>
                  </span>
                  <p className={`${styles['thick-gry-clr']} ${styles['m-0']} ${styles['pt-5']}`}>Get flawless & even-toned skin with Max Factor Panstik</p>
                  <span className={`${styles['fs-12']} ${styles['footer-time']}`}>2 hours ago</span>
                </Col>
              </div>
              <div className={`${styles['sc-part']} ${styles['pt-15']} ${styles['pb-15']} ${styles['flex']}`}>
                <Col md={4} className={styles['p-0']}>
                  <div className={styles['footer-sc-img']}>
                    <img src="/static/img/bg-img/bitmapf5.jpg" className={styles['img-responsive']} />
                  </div>
                </Col>
                <Col md={8} className={styles['pr-0']}>
                  <span className={styles['flex-center']}>
                    <span className={styles['footer-sc-logo']}>
                      <img src="/static/img/bg-img/nike.jpg" className={styles['img-responsive']} />
                    </span>
                    <span className={`${styles['fs-12']} ${styles['lgt-blue']} ${styles['pl-10']}`}>Nike</span>
                  </span>
                  <p className={`${styles['thick-gry-clr']} ${styles['m-0']} ${styles['pt-5']}`}>Get flawless & even-toned skin with Max Factor Panstik</p>
                  <span className={`${styles['fs-12']} ${styles['footer-time']}`}>2 hours ago</span>
                </Col>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <h4 className={styles['flex-center']}>
              <span className={`${styles['footer-social-title']} ${styles['mr-10']}`}><img src="/static/img/bg-img/bitmap-instgram.jpg" className={styles['img-responsive']} /></span>
              <span className={`${styles['fontW600']}`}>On Snapchat</span>
              <span className={`${styles['follow-sc-btn']} ${styles['fs-10']} ${styles['lne-ht2']}  ${styles['ml-10']} ${styles['pl-15']} ${styles['pr-15']}`}>Follow</span>
            </h4>
            <div className={`${styles['footer-social-list-main-inn']} ${styles['pr-10']}`}>
              <div className={`${styles['sc-part']} ${styles['pt-15']} ${styles['pb-15']} ${styles['flex']}`}>
                <Col md={4} className={styles['p-0']}>
                  <div className={styles['footer-sc-img']}>
                    <img src="/static/img/bg-img/bitmapf4.jpg" className={styles['img-responsive']} />
                  </div>
                </Col>
                <Col md={8} className={styles['pr-0']}>
                  <span className={styles['flex-center']}>
                    <span className={styles['footer-sc-logo']}>
                      <img src="/static/img/bg-img/venesa.jpg" className={styles['img-responsive']} />
                    </span>
                    <span className={`${styles['fs-12']} ${styles['lgt-blue']} ${styles['pl-10']}`}>Venessa</span>
                  </span>
                  <p className={`${styles['thick-gry-clr']} ${styles['m-0']} ${styles['pt-5']}`}>Get flawless & even-toned skin with Max Factor Panstik</p>
                  <span className={`${styles['fs-12']} ${styles['footer-time']}`}>2 hours ago</span>
                </Col>
              </div>
              <div className={`${styles['sc-part']} ${styles['pt-15']} ${styles['pb-15']} ${styles['flex']}`}>
                <Col md={4} className={styles['p-0']}>
                  <div className={styles['footer-sc-img']}>
                    <img src="/static/img/bg-img/bitmapf6.jpg" className={styles['img-responsive']} />
                  </div>
                </Col>
                <Col md={8} className={styles['pr-0']}>
                  <span className={styles['flex-center']}>
                    <span className={styles['footer-sc-logo']}>
                      <img src="/static/img/bg-img/toy.jpg" className={styles['img-responsive']} />
                    </span>
                    <span className={`${styles['fs-12']} ${styles['lgt-blue']} ${styles['pl-10']}`}>Priyanka</span>
                  </span>
                  <p className={`${styles['thick-gry-clr']} ${styles['m-0']} ${styles['pt-5']}`}>Get flawless & even-toned skin with Max Factor Panstik</p>
                  <span className={`${styles['fs-12']} ${styles['footer-time']}`}>2 hours ago</span>
                </Col>
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
    {/* footer componay policy part start */}
    <div className={`${styles['footer-social-main']} ${styles['pt-30']} ${styles['pb-30']} ${styles['bg-white']}`}>
      <Grid>
        <Row>
          <Col md={3}>
            <h4 className={`${styles['fontW600']} ${styles['fs-16']} ${styles['black-color']}`}>Company</h4>
            <ul className={`${styles['pl-0']} ${styles['lne-ht2']}`}>
              <li>About Us </li>
              <li>Core Values  </li>
              <li>Mission </li>
              <li>In news </li>
              <li>Careers </li>
              <li>Contact Us </li>
            </ul>
          </Col>
          <Col md={3}>
            <h4 className={`${styles['fontW600']} ${styles['fs-16']} ${styles['black-color']}`}>POLICY</h4>
            <ul className={`${styles['pl-0']} ${styles['lne-ht2']}`}>
              <li>Terms and conditions </li>
              <li>Privacy Policy  </li>
              <li>Cookie Policy </li>
            </ul>
          </Col>
          <Col md={2}>
            <div>
              <h4 className={`${styles['fontW600']} ${styles['fs-16']} ${styles['black-color']}`}>Selling on TiLa.com</h4>
              <ul className={`${styles['pl-0']} ${styles['lne-ht2']}`}>
                <li>Selling on TiLa.com</li>
                <li>How It Works </li>
                <li>Selling Policies </li>
                <li>Seller Terms and Conditions </li>
                <li>Fulfilled by TiLa </li>
                <li>FAQs </li>
              </ul>
            </div>
          </Col>
          <Col md={2}>
            <div>
              <h4 className={`${styles['fontW600']} ${styles['fs-16']} ${styles['black-color']}`}>Customer Services</h4>
              <ul className={`${styles['pl-0']} ${styles['lne-ht2']}`}>
                <li>Delivery</li>
                <li>Size Guide </li>
                <li>Payment Methods</li>
                <li>Returns </li>
                <li>Consumer Rights</li>
              </ul>
            </div>
          </Col>
          <Col md={2}>
            <div className={`${styles['fs-12']} ${styles['footer-download-app']}`}>
              <h4 className={`${styles['fontW600']} ${styles['fs-16']} ${styles['black-color']}`}>Download the app</h4>
              <div>
                <span className={`${styles['flex']} ${styles['mt-10']} ${styles['mb-15']} ${styles['download-icons']}`}>
                  <img src="static/img/bg-img/app-strore.jpg" />
                </span>
                <span className={`${styles['flex']} ${styles['download-icons']}`}>
                  <img src="static/img/bg-img/google.jpg" />
                </span>
              </div>
              <div className={styles['pt-30']}>
                <span className={styles['fs-10']}>&copy; 2018 www.tila.com. All rights reserved</span>
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  </div>
);

export default FooterBar;
