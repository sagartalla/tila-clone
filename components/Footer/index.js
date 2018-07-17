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
          <Col md={2}>
            <h4 className={`${styles['fontW600']} ${styles['fs-16']}`}>Fashion</h4>
            <ul className={`${styles['pl-0']} ${styles['lne-ht2']}`}>
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
          <Col md={2}>
            <h4 className={`${styles['fontW600']} ${styles['fs-16']}`}>Electronics</h4>
            <ul className={`${styles['pl-0']} ${styles['lne-ht2']}`}>
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
            <h4 className={`${styles['fontW600']} ${styles['fs-16']}`}>Lifestyle</h4>
            <ul className={`${styles['pl-0']} ${styles['lne-ht2']}`}>
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
            <h4 className={`${styles['fontW600']} ${styles['fs-16']}`}>Beauty & Makeup</h4>
            <ul className={`${styles['pl-0']} ${styles['lne-ht2']}`}>
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
            <h4 className={`${styles['fontW600']} ${styles['fs-16']}`}>Selling on Tila.com</h4>
            <ul className={`${styles['pl-0']} ${styles['lne-ht2']}`}>
              <li>Sell on souq.com</li>
              <li>How It Works</li>
              <li>Selling Policies</li>
              <li>Seller Terms and Conditions</li>
              <li>Fulfilled by Souq</li>
              <li>FAQs</li>
            </ul>
          </Col>
          <Col md={2}>
            <h4 className={`${styles['fontW600']} ${styles['fs-16']}`}>Top Brands</h4>
            <ul className={`${styles['pl-0']} ${styles['lne-ht2']}`}>
              <li>Apple</li>
              <li>Nike</li>
              <li>Samsung</li>
              <li>Tefal</li>
              <li>L'Oreal Paris</li>
              <li>Televisions</li>
              <li>Skechers</li>
              <li>Silsal</li>
            </ul>
          </Col>
        </Row>
      </Grid>
    </div>
    <div className={`${styles['footer-social-main']} ${styles['pt-15']} ${styles['pb-15']} ${styles['bg-white']}`}>
      <Grid>
        <Row className={styles['flex-center']}>
          <Col md={6}>
            <div className={styles['fs-12']}>
              <span className={`${styles['pr-10']} ${styles['fontW600']}`}>POLICY INFO : </span>
              <span className={styles['pr-10']} >Privacy Policy </span>
              <span className={styles['pr-10']}>Terms of Sale  </span>
              <span className={styles['pr-10']}>Terms of Use </span>
              <span className={styles['pr-10']}>Report Abuse Takedown Policy </span>
            </div>
          </Col>
          <Col md={4}>
            <div className={styles['fs-12']}>
              <span className={`${styles['pr-10']} ${styles['fontW600']}`}>COMPANY : </span>
              <span className={styles['pr-10']}>About Us </span>
              <span className={styles['pr-10']}>Core Values  </span>
              <span className={styles['pr-10']}>Careers </span>
              <span className={styles['pr-10']}>Contact us </span>
            </div>
          </Col>
          <Col md={2}>
            <div className={`${styles['flx-space-bw']} ${styles['footer-social-icons']}`}>
              <SVGComponent clsName={`${styles['social-icons']}`} src="icons/common-icon/link-icon" />
              <SVGComponent clsName={`${styles['social-icons']}`} src="icons/common-icon/email" />
              <SVGComponent clsName={`${styles['social-icons']}`} src="icons/common-icon/bg-fb" />
              <SVGComponent clsName={`${styles['social-icons']}`} src="icons/common-icon/twitter" />
              <SVGComponent clsName={`${styles['social-icons']}`} src="icons/common-icon/instagram" />
              <SVGComponent clsName={`${styles['social-icons']}`} src="icons/common-icon/gmail" />
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
    <div className={`${styles['footer-download-app']} ${styles['pt-20']} ${styles['pb-20']} ${styles['bg-white']}`}>
      <Grid>
        <div className={`${styles['flx-space-bw']}`}>
          <div>
            <span>Download the app</span>
          </div>
          <div>
            <span>© 2018 www.tila.com. All rights reserved</span>
          </div>
        </div>
      </Grid>
    </div>
  </div>
);

export default FooterBar;
