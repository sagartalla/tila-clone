import { Grid, Row, Col } from 'react-bootstrap';
import SVGComponent from '../common/SVGComponet';
import publicUrls from '../../constants';
import lang from '../../utils/language';
import { languageDefinations } from '../../utils/lang';

const { FOOTER_PAGE } = languageDefinations();

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './footer_en.styl';
import styles_ar from './footer_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const f = [{"Women's Clothing":	"https://storefront-stage.fptechscience.com/srp/Clothing-910?categoryTree=true&isListed=false"},
{"Men's Clothing":	"https://storefront-stage.fptechscience.com/srp/Clothing-899?categoryTree=true&isListed=false"},
{"Kids Clothing":	"https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=Kids"},
{"Watches":	"https://storefront-stage.fptechscience.com/srp/watches-1128/?isListed=false&language=en&search=Watch"},
{"Jewellery":	"https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=Jewellery"},
{"Men's Footwear":	"https://storefront-stage.fptechscience.com/srp/Footwear-921?categoryTree=true&isListed=false&language=en"},
{"Women's Footwear":	"https://storefront-stage.fptechscience.com/srp/Footwear-921?categoryTree=true&isListed=false&language=en"},
{"Bags":	"https://storefront-stage.fptechscience.com/srp/Backpack-926?categoryTree=true&isListed=false&language=en"}];

const e = [{"Mobiles":"https://storefront-stage.fptechscience.com/srp?search=Mobiles&language=en&isListed=false"},
{"Tablets":"https://storefront-stage.fptechscience.com/srp/Tablets-877?categoryTree=true&isListed=false&language=en"},
{"Laptops":"https://storefront-stage.fptechscience.com/srp/laptop-1173/?search=Laptops&language=en&isListed=false"},
{"Home Appliances":"https://storefront-stage.fptechscience.com/srp?search=Home%20Appliances&language=en&isListed=false"},
{"Cameras":"https://storefront-stage.fptechscience.com/srp?search=Camera&language=en&isListed=false"},
{"Televisions":"https://storefront-stage.fptechscience.com/srp/Televisions-878?categoryTree=true&isListed=false"},
{"Speakers":"https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=Speaker"},
{"Storage Devices":"https://storefront-stage.fptechscience.com/srp?search=Storage&language=en&isListed=false"}];

const l = [{"Travel Accessories":	"https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=travel%20accessories"},
{"Photo Frames":	"https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=Photo%20Frames"},
{"Lights":	"https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=Lights"}];

const b = [{"Perfumes":	"https://storefront-stage.fptechscience.com/srp?disableSpellCheck=true&isListed=false&language=en&search=perfume"},
{"Eyewear":	"https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=eyewear"},
{"Men's grooming":	"https://storefront-stage.fptechscience.com/srp?isListed=false&language=en&search=mens%20grooming"},
{"Personal Care":	"https://storefront-stage.fptechscience.com/srp/Personal%20Care-969?categoryTree=true&isListed=false&language=en"}];

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
                <span className={`${styles['fontW600']} ${styles['text-uppercase']}`}>{FOOTER_PAGE.GOT_QUESTION}</span>
                <span className={styles['footer-suport-title']}>{`${FOOTER_PAGE.WE_CARE_TILA} | 900-66666`}</span>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <div className={`${styles['flex-center']} ${styles['border-radius4']} ${styles['footer-suport-part']} ${styles['p-15']}`}>
              <span className={`${styles['flex']} ${styles['quation-bar']}`}>
                <SVGComponent clsName={`${styles['quation-bar-inn']}`} src="icons/common-icon/guarantee" />
              </span>
              <div className={`${styles['flex']} ${styles['flex-colum']} ${styles['pl-20']}`}>
                <span className={`${styles['fontW600']} ${styles['text-uppercase']}`}>{`100% ${FOOTER_PAGE.ORIGINAL}`}</span>
                <span className={styles['footer-suport-title']}>{FOOTER_PAGE.GURANTEE_PRODUCTS_AT_TILA}</span>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <div className={`${styles['flex-center']} ${styles['border-radius4']} ${styles['footer-suport-part']} ${styles['p-15']}`}>
              <span className={`${styles['flex']} ${styles['quation-bar']}`}>
                <SVGComponent clsName={`${styles['quation-bar-inn']}`} src="icons/common-icon/return" />
              </span>
              <div className={`${styles['flex']} ${styles['flex-colum']} ${styles['pl-20']}`}>
                <span className={`${styles['fontW600']} ${styles['text-uppercase']}`}>{`${FOOTER_PAGE.RETURN_WITHIN} 30 ${FOOTER_PAGE.DAYS}`}</span>
                <span className={styles['footer-suport-title']}>{FOOTER_PAGE.PLACING_ORDER}</span>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <div className={`${styles['flex-center']} ${styles['border-radius4']} ${styles['footer-suport-part']} ${styles['p-15']}`}>
              <span className={`${styles['flex']} ${styles['quation-bar']}`}>
                <SVGComponent clsName={`${styles['quation-bar-inn']}`} src="icons/common-icon/trust-secure" />
              </span>
              <div className={`${styles['flex']} ${styles['flex-colum']} ${styles['pl-20']}`}>
                <span className={`${styles['fontW600']} ${styles['text-uppercase']}`}>{FOOTER_PAGE.TRUST_PAY}</span>
                <span className={styles['footer-suport-title']}>{`100% ${FOOTER_PAGE.SECURE_PAYMENTS_TILA}`}</span>
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
    <div className={`${styles['footer-menu-items']} ${styles['pt-30']} ${styles['pb-30']} ${styles['bg-white']}`}>
      <Grid>
        <Row>
          <Col md={3} sm={3} className={styles['ipad-pr-0']}>
            <h4 className={`${styles['fontW600']} ${styles['fs-16']} ${styles['flex-center']}`}>
              <SVGComponent clsName={`${styles['footer-list-icon']} ${styles['mr-10']}`} src="icons/footers-icons/fashion" />
              <span className={styles['pointer']}>Fashion</span>
            </h4>
            <ul className={`${styles['pl-30']} ${styles['lne-ht2']}`}>
              {f.map((i) => <li><a href={Object.values(i)[0]} target="_blank"><span className={styles['pointer']}>{Object.keys(i)[0]}</span></a></li>)}
              {/*<li><span className={styles['pointer']}>{`${FOOTER_PAGE.WOMENS} ${FOOTER_PAGE.FASHION}`}</span></li>
              <li><span className={styles['pointer']}>{`${FOOTER_PAGE.MENS} ${FOOTER_PAGE.FASHION}`}</span></li>
              <li><span className={styles['pointer']}>{`${FOOTER_PAGE.GIRLS} ${FOOTER_PAGE.FASHION}`}</span></li>
              <li><span className={styles['pointer']}>{`${FOOTER_PAGE.BOYS} ${FOOTER_PAGE.FASHION}`}</span></li>
              <li><span className={styles['pointer']}>{FOOTER_PAGE.WATCHES}</span></li>
              <li><span className={styles['pointer']}>{FOOTER_PAGE.JEWELLERY}</span></li>
              <li><span className={styles['pointer']}>{`${FOOTER_PAGE.WOMENS} ${FOOTER_PAGE.HANDGBAGS}`}</span></li>
              <li><span className={styles['pointer']}>{`${FOOTER_PAGE.MENS} ${FOOTER_PAGE.EYEWEAR}`}</span></li>*/}
            </ul>
          </Col>
          <Col md={3} sm={3} className={styles['ipad-pr-0']}>
            <h4 className={`${styles['fontW600']} ${styles['fs-16']} ${styles['flex-center']}`}>
              <SVGComponent clsName={`${styles['footer-list-icon']} ${styles['mr-10']}`} src="icons/common-icon/processor-icon" />
              <span className={styles['pointer']}>{FOOTER_PAGE.ELECTRONICS}</span>
            </h4>
            <ul className={`${styles['pl-30']} ${styles['lne-ht2']}`}>
              {e.map((i) => <li><a href={Object.values(i)[0]} target="_blank"><span className={styles['pointer']}>{Object.keys(i)[0]}</span></a></li>)}
              {/*<li><span className={styles['pointer']}>{FOOTER_PAGE.MOBILES}</span></li>
              <li><span className={styles['pointer']}>{FOOTER_PAGE.TABLETS}</span></li>
              <li><span className={styles['pointer']}>{FOOTER_PAGE.LAPTOPS}</span></li>
              <li><span className={styles['pointer']}>{FOOTER_PAGE.HOME_APLLIANCES}</span></li>
              <li><span className={styles['pointer']}>{`${FOOTER_PAGE.CAMERA},${FOOTER_PAGE.PHOTO} & ${FOOTER_PAGE.VIDEO}`}</span></li>
              <li><span className={styles['pointer']}>{FOOTER_PAGE.TELEVISIONS}</span></li>
              <li><span className={styles['pointer']}>{FOOTER_PAGE.HEADPHONES}</span></li>
              <li><span className={styles['pointer']}>{FOOTER_PAGE.VIDEO_GAMES}</span></li>*/}
            </ul>
          </Col>
          <Col md={2} sm={2} className={styles['ipad-pr-0']}>
            <h4 className={`${styles['fontW600']} ${styles['fs-16']} ${styles['flex-center']}`}>
              <SVGComponent clsName={`${styles['footer-list-icon']} ${styles['mr-10']}`} src="icons/footers-icons/life-style" />
              <span className={styles['pointer']}>Lifestyle</span>
            </h4>
            <ul className={`${styles['pl-30']} ${styles['lne-ht2']}`}>
              {l.map((i) => <li><a href={Object.values(i)[0]} target="_blank"><span className={styles['pointer']}>{Object.keys(i)[0]}</span></a></li>)}
              {/*<li><span className={styles['pointer']}>{FOOTER_PAGE.HOME_DECOR}</span></li>
              <li><span className={styles['pointer']}>{`${FOOTER_PAGE.KITCHEN} & ${FOOTER_PAGE.DINING}`}</span></li>
              <li><span className={styles['pointer']}>{FOOTER_PAGE.BATH}</span></li>
              <li><span className={styles['pointer']}>{FOOTER_PAGE.HOME_APLLIANCES}</span></li>
              <li><span className={styles['pointer']}>{`${FOOTER_PAGE.TOOLS} & ${FOOTER_PAGE.HOME_IMPROVE}`}</span></li>
              <li><span className={styles['pointer']}>{`${FOOTER_PAGE.AUDIO} & ${FOOTER_PAGE.VIDEO}`}</span></li>
              <li><span className={styles['pointer']}>{FOOTER_PAGE.FURNITURE}</span></li>
              <li><span className={styles['pointer']}>{`${FOOTER_PAGE.PATIO}, ${FOOTER_PAGE.LAWN} & ${FOOTER_PAGE.GARDEN}`}</span></li>*/}
            </ul>
          </Col>
          <Col md={2} sm={2} className={styles['ipad-pr-0']}>
            <h4 className={`${styles['fontW600']} ${styles['fs-16']} ${styles['flex-center']}`}>
              <SVGComponent clsName={`${styles['footer-list-icon']} ${styles['mr-10']}`} src="icons/footers-icons/beauty-makeup" />
              <span className={styles['pointer']}>{`${FOOTER_PAGE.BEAUTY} & ${FOOTER_PAGE.MAKEUP}`}</span>
              </h4>
            <ul className={`${styles['pl-30']} ${styles['lne-ht2']}`}>
              {b.map((i) => <li><a href={Object.values(i)[0]} target="_blank"><span className={styles['pointer']}>{Object.keys(i)[0]}</span></a></li>)}
              {/*<li><span className={styles['pointer']}>{FOOTER_PAGE.FRAGRANCE}</span></li>
              <li><span className={styles['pointer']}>{FOOTER_PAGE.MAKEUP}</span></li>
              <li><span className={styles['pointer']}>{FOOTER_PAGE.HAIRCARE}</span></li>
              <li><span className={styles['pointer']}>{`${FOOTER_PAGE.SKINCARE}${FOOTER_PAGE.AUDIO} & ${FOOTER_PAGE.VIDEO}`}</span></li>
              <li><span className={styles['pointer']}>{FOOTER_PAGE.PERSONAL_CARE}</span></li>
              <li><span className={styles['pointer']}>{`${FOOTER_PAGE.TOOLS} & ${FOOTER_PAGE.ACCESSORIES}`}</span></li>
              <li><span className={styles['pointer']}>{`${FOOTER_PAGE.MENS} ${FOOTER_PAGE.GROOMING}`}</span></li>*/}
            </ul>
          </Col>

          <Col md={2} sm={2} className={styles['ipad-pr-0']}>
            <h4 className={`${styles['fontW600']} ${styles['fs-16']}`}>
            <span className={styles['pointer']}>{FOOTER_PAGE.TOP_BRAND}</span>
            </h4>
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
          <Col md={3} sm={6} className={styles['pr-0']}>
            <h4 className={styles['flex-center']}>
              <span className={`${styles['footer-social-title']} ${styles['mr-10']}`}><img src="/static/img/bg-img/bitmap-instgram.jpg" className={styles['img-responsive']} /></span>
              <span className={`${styles['fontW600']}`}>{FOOTER_PAGE.ON_SNAP}</span>
              <span className={`${styles['follow-sc-btn']} ${styles['fs-10']} ${styles['lne-ht2']}  ${styles['ml-10']} ${styles['pl-15']} ${styles['pr-15']}`}>{FOOTER_PAGE.FOLLOW}</span>
            </h4>
          </Col>
          <Col md={3} sm={6} className={styles['pr-0']}>
            <h4 className={styles['flex-center']}>
              <span className={`${styles['footer-social-title']} ${styles['mr-10']}`}><img src="/static/img/bg-img/bitmap-twitter.jpg" className={styles['img-responsive']} /></span>
              <span className={`${styles['twitter-clr']} ${styles['fontW600']}`}>{FOOTER_PAGE.ON_TWITTER}</span>
              <span className={`${styles['follow-twi-btn']} ${styles['fs-10']} ${styles['lne-ht2']} ${styles['white-color']} ${styles['ml-10']} ${styles['pl-15']} ${styles['pr-15']}`}>{FOOTER_PAGE.FOLLOW}</span>
            </h4>
          </Col>
          <Col md={3} sm={6} className={styles['pr-0']}>
            <h4 className={styles['flex-center']}>
              <span className={`${styles['footer-social-title']} ${styles['mr-10']}`}><img src="/static/img/bg-img/bitmap-instgram.jpg" className={styles['img-responsive']} /></span>
              <span className={`${styles['fontW600']}`}>{FOOTER_PAGE.ON_INSTAGRAM}</span>
              <span className={`${styles['follow-inst-btn']} ${styles['fs-10']} ${styles['lne-ht2']} ${styles['white-color']} ${styles['ml-10']} ${styles['pl-15']} ${styles['pr-15']}`}>{FOOTER_PAGE.FOLLOW}</span>
            </h4>
          </Col>
          <Col md={3} sm={6} className={styles['pr-0']}>
            <h4 className={styles['flex-center']}>
              <span className={`${styles['footer-social-title']} ${styles['mr-10']}`}><img src="/static/img/bg-img/bitmap-social-fb.jpg" className={styles['img-responsive']} /></span>
              <span className={`${styles['lgt-blue']} ${styles['fontW600']}`}>{FOOTER_PAGE.ON_FACEBOOK}</span>
              <span className={`${styles['follow-fb-btn']} ${styles['fs-10']} ${styles['lne-ht2']} ${styles['white-color']} ${styles['ml-10']} ${styles['pl-15']} ${styles['pr-15']}`}>{FOOTER_PAGE.FOLLOW}</span>
            </h4>
          </Col>
        </Row>
      </Grid>
    </div>
    {/* footer componay policy part start */}
    <div className={`${styles['footer-social-main']} ${styles['pt-30']} ${styles['pb-30']} ${styles['bg-white']}`}>
      <Grid>
        <Row>
          <Col md={3} sm={2} className={styles['ipad-pr-0']}>
            <h4 className={`${styles['fontW600']} ${styles['fs-16']} ${styles['black-color']}`}>{FOOTER_PAGE.COMPANY}</h4>
            <ul className={`${styles['pl-0']} ${styles['lne-ht2']}`}>
              <li>{FOOTER_PAGE.ABOUT_US}</li>
              <li>{FOOTER_PAGE.CORE_VALUES}</li>
              <li>{FOOTER_PAGE.MISSION}</li>
              <li>{FOOTER_PAGE.IN_NEWS}</li>
              <li>{FOOTER_PAGE.CAREERS}</li>
              <li>{FOOTER_PAGE.CONTACT_US}</li>
            </ul>
          </Col>
          <Col md={3} sm={3} className={styles['ipad-pr-0']}>
            <h4 className={`${styles['fontW600']} ${styles['fs-16']} ${styles['black-color']}`}>{FOOTER_PAGE.POLICY}</h4>
            <ul className={`${styles['pl-0']} ${styles['lne-ht2']}`}>
              <li><a href="/SAU/en/policy/tc" target="_blank">{FOOTER_PAGE.TERMS_CONDITION}</a></li>
              <li><a href="/SAU/en/policy/re" target="_blank">{FOOTER_PAGE.REFUND_POLICY}</a></li>
              <li><a href="/SAU/en/policy/wp" target="_blank">{FOOTER_PAGE.WARRENTY_POLICY}</a></li>
              <li><a href="/SAU/en/policy/sp" target="_blank">{FOOTER_PAGE.SHIPPING_POLICY}</a></li>
            </ul>
          </Col>
          {/*<Col md={2} sm={2} className={styles['ipad-pr-0']}>
            <div>
              <h4 className={`${styles['fontW600']} ${styles['fs-16']} ${styles['black-color']}`}>{FOOTER_PAGE.SELL_ON_TILA}</h4>
              <ul className={`${styles['pl-0']} ${styles['lne-ht2']}`}>
                <li>{FOOTER_PAGE.SELL_ON_TILA}</li>
                <li>{FOOTER_PAGE.HOW_WORKS}</li>
                <li>{FOOTER_PAGE.SELL_POLICY}</li>
                <li>{`${FOOTER_PAGE.SELLER} ${FOOTER_PAGE.TERMS_CONDITION}`}</li>
                <li>{FOOTER_PAGE.FULFILL_TILA}</li>
                <li>{FOOTER_PAGE.FAQS}</li>
              </ul>
            </div>
          </Col>*/}
          <Col md={4} sm={4} className={styles['ipad-pr-0']}>
            <div>
              <h4 className={`${styles['fontW600']} ${styles['fs-16']} ${styles['black-color']}`}>{FOOTER_PAGE.CUSTOMER_SERVICE}</h4>
              <ul className={`${styles['pl-0']} ${styles['lne-ht2']}`}>
                <li>{FOOTER_PAGE.DELIVERY}</li>
                <li>{FOOTER_PAGE.SIZE_GUIDE}</li>
                <li>{FOOTER_PAGE.PAY_METHOD}</li>
                <li>{FOOTER_PAGE.CONSUMER_RIGHT}</li>
              </ul>
            </div>
          </Col>
          <Col md={2} sm={3} className={styles['ipad-pr-0']}>
            <div className={`${styles['fs-12']} ${styles['footer-download-app']}`}>
              <h4 className={`${styles['fontW600']} ${styles['fs-16']} ${styles['black-color']}`}>{FOOTER_PAGE.DOWNLOAD_APP}</h4>
              <div>
                <span className={`${styles['flex']} ${styles['mt-10']} ${styles['mb-15']} ${styles['download-icons']}`}>
                  <img src="/static/img/bg-img/app-strore.jpg" />
                </span>
                <span className={`${styles['flex']} ${styles['download-icons']}`}>
                  <img src="/static/img/bg-img/google.jpg" />
                </span>
              </div>
              <div className={styles['pt-30']}>
                <span className={styles['fs-10']}>&copy;{FOOTER_PAGE.TILA_RIGHTS}</span>
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  </div>
);

export default FooterBar;
