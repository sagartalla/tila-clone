import { Grid, Row, Col } from 'react-bootstrap';
import Cookie from 'universal-cookie';
import SVGComponent from '../common/SVGComponet';
import publicUrls from '../../constants';
import lang from '../../utils/language';
import { languageDefinations } from '../../utils/lang';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './footer_en.styl';
import styles_ar from './footer_ar.styl';

const { FOOTER_PAGE } = languageDefinations();

const cookies = new Cookie();
const country = cookies.get('country');


const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const f = [
  {
    url: `/${lang}/${lang === 'en' ? 'Women\'s Clothing' : 'ملابس نسائية'}/clp`,
    title: FOOTER_PAGE.WOMEN_CLOTHING,
  },

  {
    url: `/${lang}/${lang === 'en' ? 'Men\'s Clothing' : 'ملابس رجالية'}/clp`,
    title: FOOTER_PAGE.MEN_CLOTHING,
  },

  {
    url: `/${lang}/${lang === 'en' ? 'Footwear' : 'أحذية'}/clp`,
    title: FOOTER_PAGE.FOOT_WEAR,
  },

  {
    url: `/${lang}/${lang === 'en' ? 'Sunglasses' : 'نظارات شمسية'}/clp`,
    title: FOOTER_PAGE.SUNGLASSES,
  },
  {
    url: `/${lang}/${lang === 'en' ? 'Watches' : 'ساعات اليد'}/clp`,
    title: FOOTER_PAGE.WATCHES,
  },
  {
    url: `/${lang}/Fashion%20Accessories/clp`,
    title: FOOTER_PAGE.FASHION_ACCESSORIES,
  },
];

const e = [
  {
    url: `/${lang}/${lang === 'en' ? 'mobiles' : 'الهواتف-النقالة'}/clp`,
    title: FOOTER_PAGE.MOBILES,
  },

  {
    url: `/${lang}/${lang === 'en' ? 'laptops' : 'أجهزة-الكمبيوتر-المحمولة'}/clp`,
    title: FOOTER_PAGE.LAPTOPS,
  },

  {
    url: `/${lang}/${lang === 'en' ? 'camera' : 'الة-تصوير'}/clp`,
    title: FOOTER_PAGE.CAMERAS,
  },

  {
    url: `/${lang}/${lang === 'en' ? 'televisions' : 'التلفزيونات'}/clp`,
    title: FOOTER_PAGE.TELEVISIONS,
  },

  {
    url: `/${lang}/${lang === 'en' ? 'storage devices' : 'أجهزة التخزين'}/clp`,
    title: FOOTER_PAGE.STORAGE_DEVICES,
  },

  {
    url: `/${lang}/${lang === 'en' ? 'mobile-accessories' : 'ملحقات-الهاتف-المحمول'}/clp`,
    title: FOOTER_PAGE.MOBILE_ACCESSORIES,
  },
];

const l = [
  {
    url: `/${lang}/travel%20accessories/clp`,
    title: FOOTER_PAGE.TRAVEL_ACCESSORIES,
  },

  {
    url: `/${lang}/Sports/clp`,
    title: FOOTER_PAGE.SPORTS_AND_OUTDOORS,
  },

  {
    url: `/${lang}/diaper/clp`,
    title: FOOTER_PAGE.MUMS_AND_KIDS,
  },
  {
    url: `/${lang}/beauty%20and%20health/clp`,
    title: FOOTER_PAGE.BEAUTY_AND_HEALTH,
  },
  {
    url: `/${lang}/perfumes/clp`,
    title: FOOTER_PAGE.PERFUMES,
  },
  {
    url: `/${lang}/Make%20Up/clp`,
    title: FOOTER_PAGE.MAKEUP,
  },
];

const t = [
  {
    url: `/${lang}/brand/apple`,
    title: '/static/img/bg-img/Apple.png',
  },

  {
    url: `/${lang}/brand/baseus`,
    title: '/static/img/bg-img/Baseus.png',
  },

  {
    url: `/${lang}/brand/ray%20ban`,
    title: '/static/img/bg-img/RayBan.png',
  },

  {
    url: `/${lang}/brand/fossil`,
    title: '/static/img/bg-img/Fossil.png',
  },
];


const FooterBar = props => (
  <div id="footer-container" className={`${styles['footer-container']} ${styles['mt-25']}`}>
    <div className={`${styles['footer-container-inn']} ${styles['pt-40']} ${styles['pb-40']}`}>
      <Grid>
        <div className={styles['flx-space-bw']}>
          {/* <Col md={3}> */}

          <div  className={`${styles['flex-center']} ${styles['border-radius4']} ${styles['footer-suport-part']} ${styles['p-15']}`}>
            <span className={`${styles.flex} ${styles['quation-bar']}`}>
              <SVGComponent clsName={`${styles['quation-bar-inn']}`} src="icons/common-icon/quation" />
            </span>
            <a href={`/${lang}/help/faq`} target="_blank" className={styles.black}>
              <div className={`${styles.flex} ${styles['flex-colum']} ${styles['pl-20']}`}>
                    <span className={`${styles.fontW600} ${styles['text-uppercase']}`}>{FOOTER_PAGE.GOT_QUESTION}</span>
                    <span className={styles['footer-suport-title']}>{`${FOOTER_PAGE.WE_CARE_TILA} | 900-66666`}</span>
                  </div>
            </a>
          </div>

          {/* </Col>
          <Col md={3}> */}
          <div className={`${styles['flex-center']} ${styles['border-radius4']} ${styles['footer-suport-part']} ${styles['p-15']}`}>
            <span className={`${styles.flex} ${styles['quation-bar']}`}>
              <SVGComponent clsName={`${styles['quation-bar-inn']}`} src="icons/common-icon/guarantee" />
            </span>
            <div className={`${styles.flex} ${styles['flex-colum']} ${styles['pl-20']}`}>
              <span className={`${styles.fontW600} ${styles['text-uppercase']}`}>{`100% ${FOOTER_PAGE.ORIGINAL}`}</span>
              <span className={styles['footer-suport-title']}>{FOOTER_PAGE.GURANTEE_PRODUCTS_AT_TILA}</span>
            </div>
          </div>
          {/* </Col>
          <Col md={3}> */}
          <div className={`${styles['flex-center']} ${styles['border-radius4']} ${styles['footer-suport-part']} ${styles['p-15']}`}>
            <span className={`${styles.flex} ${styles['quation-bar']}`}>
              <SVGComponent clsName={`${styles['quation-bar-inn']}`} src="icons/common-icon/return" />
            </span>
            <div className={`${styles.flex} ${styles['flex-colum']} ${styles['pl-20']}`}>
              <span className={`${styles.fontW600} ${styles['text-uppercase']}`}>{`${FOOTER_PAGE.RETURN_WITHIN} 15 ${FOOTER_PAGE.DAYS}`}</span>
              <span className={styles['footer-suport-title']}>{FOOTER_PAGE.PLACING_ORDER}</span>
            </div>
          </div>
          {/* </Col>
          <Col md={3}> */}
          <div className={`${styles['flex-center']} ${styles['border-radius4']} ${styles['footer-suport-part']} ${styles['p-15']}`}>
            <span className={`${styles.flex} ${styles['quation-bar']}`}>
              <SVGComponent clsName={`${styles['quation-bar-inn']}`} src="icons/common-icon/trust-secure" />
            </span>
            <div className={`${styles.flex} ${styles['flex-colum']} ${styles['pl-20']}`}>
              <span className={`${styles.fontW600} ${styles['text-uppercase']}`}>{FOOTER_PAGE.TRUST_PAY}</span>
              <span className={styles['footer-suport-title']}>{`100% ${FOOTER_PAGE.SECURE_PAYMENTS_TILA}`}</span>
            </div>
          </div>
          {/* </Col> */}
        </div>
      </Grid>
    </div>
    <div id = "constantfootertop" className={`${styles['footer-menu-items']} ${styles['pt-30']} ${styles['pb-30']} ${styles['bg-white']}`}>
      <Grid>
        <div className={`${styles.flex} ${styles['footer-menu-list']}`}>
          <div className={`${styles['ipad-pr-0']} ${styles['footer-menu-inn']} `}>
            <h4 className={`${styles.fontW600} ${styles['fs-16']} ${styles['flex-center']} ${styles['mr-50']}`}>
              <SVGComponent clsName={`${styles['footer-list-icon']} ${styles['mr-15']}`} src="icons/footers-icons/fashion" />
              <span className={styles.pointer}>{FOOTER_PAGE.FASHION}</span>
            </h4>
            <ul id = "footertopfashion" className={`${styles['pl-30']} ${styles['lne-ht2']}`}>
              {f.map(i => <li key={i.title}><a href={i.url}><span className={styles.pointer}>{i.title}</span></a></li>)}
              {/* <li><span className={styles['pointer']}>{`${FOOTER_PAGE.WOMENS} ${FOOTER_PAGE.FASHION}`}</span></li>
              <li><span className={styles['pointer']}>{`${FOOTER_PAGE.MENS} ${FOOTER_PAGE.FASHION}`}</span></li>
              <li><span className={styles['pointer']}>{`${FOOTER_PAGE.GIRLS} ${FOOTER_PAGE.FASHION}`}</span></li>
              <li><span className={styles['pointer']}>{`${FOOTER_PAGE.BOYS} ${FOOTER_PAGE.FASHION}`}</span></li>
              <li><span className={styles['pointer']}>{FOOTER_PAGE.WATCHES}</span></li>
              <li><span className={styles['pointer']}>{FOOTER_PAGE.JEWELLERY}</span></li>
              <li><span className={styles['pointer']}>{`${FOOTER_PAGE.WOMENS} ${FOOTER_PAGE.HANDGBAGS}`}</span></li>
              <li><span className={styles['pointer']}>{`${FOOTER_PAGE.MENS} ${FOOTER_PAGE.EYEWEAR}`}</span></li> */}
            </ul>
          </div>
          <div className={`${styles['ipad-pr-0']} ${styles['footer-menu-inn']}`}>
            <h4 className={`${styles.fontW600} ${styles['fs-16']} ${styles['flex-center']}  ${styles['mr-35']}`}>
              <SVGComponent clsName={`${styles['footer-list-icon']} ${styles['mr-15']}`} src="icons/common-icon/processor-icon" />
              <span className={styles.pointer}>{FOOTER_PAGE.ELECTRONICS}</span>
            </h4>
            <ul id = "footertopelectronics" className={`${styles['pl-30']} ${styles['lne-ht2']}`}>
              {e.map(i => <li key={i.title}><a href={i.url}><span className={styles.pointer}>{i.title}</span></a></li>)}
              {/* <li><span className={styles['pointer']}>{FOOTER_PAGE.MOBILES}</span></li>
              <li><span className={styles['pointer']}>{FOOTER_PAGE.TABLETS}</span></li>
              <li><span className={styles['pointer']}>{FOOTER_PAGE.LAPTOPS}</span></li>
              <li><span className={styles['pointer']}>{FOOTER_PAGE.HOME_APLLIANCES}</span></li>
              <li><span className={styles['pointer']}>{`${FOOTER_PAGE.CAMERA},${FOOTER_PAGE.PHOTO} & ${FOOTER_PAGE.VIDEO}`}</span></li>
              <li><span className={styles['pointer']}>{FOOTER_PAGE.TELEVISIONS}</span></li>
              <li><span className={styles['pointer']}>{FOOTER_PAGE.HEADPHONES}</span></li>
              <li><span className={styles['pointer']}>{FOOTER_PAGE.VIDEO_GAMES}</span></li> */}
            </ul>
          </div>
          <div className={`${styles['ipad-pr-0']} ${styles['footer-menu-inn']}`}>
            <h4 className={`${styles.fontW600} ${styles['fs-16']} ${styles['flex-center']} ${styles['mr-80']}`}>
              <SVGComponent clsName={`${styles['footer-list-icon']} ${styles['mr-15']}`} src="icons/footers-icons/life-style" />
              <span className={styles.pointer}>{FOOTER_PAGE.LIFESTYLE}</span>
            </h4>
            <ul id = "footertoplifestyle" className={`${styles['pl-30']} ${styles['lne-ht2']}`}>
              {l.map(i => <li key={i.title}><a href={i.url}><span className={styles.pointer}>{i.title}</span></a></li>)}
              {/* <li><span className={styles['pointer']}>{FOOTER_PAGE.HOME_DECOR}</span></li>
              <li><span className={styles['pointer']}>{`${FOOTER_PAGE.KITCHEN} & ${FOOTER_PAGE.DINING}`}</span></li>
              <li><span className={styles['pointer']}>{FOOTER_PAGE.BATH}</span></li>
              <li><span className={styles['pointer']}>{FOOTER_PAGE.HOME_APLLIANCES}</span></li>
              <li><span className={styles['pointer']}>{`${FOOTER_PAGE.TOOLS} & ${FOOTER_PAGE.HOME_IMPROVE}`}</span></li>
              <li><span className={styles['pointer']}>{`${FOOTER_PAGE.AUDIO} & ${FOOTER_PAGE.VIDEO}`}</span></li>
              <li><span className={styles['pointer']}>{FOOTER_PAGE.FURNITURE}</span></li>
              <li><span className={styles['pointer']}>{`${FOOTER_PAGE.PATIO}, ${FOOTER_PAGE.LAWN} & ${FOOTER_PAGE.GARDEN}`}</span></li> */}
            </ul>
          </div>

          <div className={`${styles['ipad-pr-0']} ${styles['footer-menu-inn']}`}>
            <h4 className={`${styles.fontW600} ${styles['fs-16']}`}>
              <span className={styles.pointer}>{FOOTER_PAGE.TOP_BRAND}</span>
            </h4>
            <ul className={`${styles['pl-0']} ${styles['lne-ht2']} ${styles['top-brands']}`}>
              {t.map(i => <li key={i.title}><a href={i.url}> <img src={i.title} className={`${styles.flex} ${styles['mb-20']} ${styles['brand-icon']}`} /> </a></li>)}
            </ul>
          </div>
        </div>
      </Grid>
    </div>
    {/* social part start */}
    <div id = "constantsocialtab" className={`${styles['footer-social-list-main']} ${styles['pt-40']} ${styles['pb-40']} ${styles['bg-white']}`}>
      <Grid>
        <Row className={styles['footer-social-list']}>
          <Col md={3} sm={6} className={`${styles['footer-social-list']} ${styles['pr-0']}`}>
          <a id = "constantsnapchat" href="https://www.snapchat.com/add/tilasocial" target="_blank">
            <h4 className={styles['flex-center']}>
                <span className={`${styles['footer-social-title']} ${styles['mr-10']}`}><img src="/static/img/bg-img/snapchat.png" className={styles['img-responsive']} /></span>
                <span className={`${styles.fontW600}`}>{FOOTER_PAGE.ON_SNAP}</span>
                <span className={`${styles['follow-sc-btn']} ${styles['fs-10']} ${styles['lne-ht2']}  ${styles['ml-10']} ${styles['pl-15']} ${styles['pr-15']}`}>{FOOTER_PAGE.FOLLOW}</span>
            </h4>
          </a>
          </Col>
          <Col md={3} sm={6} className={`${styles['footer-social-list']} ${styles['pr-0']}`}>
          <a id = "constanttwitter" href="https://www.twitter.com/tilasocial" target="_blank">
            <h4 className={styles['flex-center']}>
              <span className={`${styles['footer-social-title']} ${styles['mr-10']}`}><img src="/static/img/bg-img/bitmap-twitter.jpg" className={styles['img-responsive']} /></span>
              <span className={`${styles['twitter-clr']} ${styles.fontW600}`}>{FOOTER_PAGE.ON_TWITTER}</span>
              <span className={`${styles['follow-twi-btn']} ${styles['fs-10']} ${styles['lne-ht2']} ${styles['white-color']} ${styles['ml-10']} ${styles['pl-15']} ${styles['pr-15']}`}>{FOOTER_PAGE.FOLLOW}</span>
            </h4>
          </a>
          </Col>
          <Col md={3} sm={6} className={`${styles['footer-social-list']} ${styles['pr-0']}`}>
          <a id = "constantinsta" href="https://www.instagram.com/tilasocial/" target="_blank">
            <h4 className={styles['flex-center']}>
              <span className={`${styles['footer-social-title']} ${styles['mr-10']}`}><img src="/static/img/bg-img/bitmap-instgram.jpg" className={styles['img-responsive']} /></span>
              <span className={`${styles.fontW600}`}>{FOOTER_PAGE.ON_INSTAGRAM}</span>
              <span className={`${styles['follow-inst-btn']} ${styles['fs-10']} ${styles['lne-ht2']} ${styles['white-color']} ${styles['ml-10']} ${styles['pl-15']} ${styles['pr-15']}`}>{FOOTER_PAGE.FOLLOW}</span>
            </h4>
          </a>
          </Col>
          <Col md={3} sm={6} className={`${styles['footer-social-list']} ${styles['pr-0']}`}>
          <a id = "constantfacebook" href="https://www.facebook.com/tilasocial/" target="_blank">
            <h4 className={styles['flex-center']}>
              <span className={`${styles['footer-social-title']} ${styles['mr-10']}`}><img src="/static/img/bg-img/bitmap-social-fb.jpg" className={styles['img-responsive']} /></span>
              <span className={`${styles['lgt-blue']} ${styles.fontW600}`}>{FOOTER_PAGE.ON_FACEBOOK}</span>
              <span className={`${styles['follow-fb-btn']} ${styles['fs-10']} ${styles['lne-ht2']} ${styles['white-color']} ${styles['ml-10']} ${styles['pl-15']} ${styles['pr-15']}`}>{FOOTER_PAGE.FOLLOW}</span>
            </h4>
          </a>
          </Col>
        </Row>
      </Grid>
    </div>
    {/* footer componay policy part start */}
    <div id = "constantfooterbottom" className={`${styles['footer-social-main']} ${styles['pt-30']} ${styles['pb-30']} ${styles['bg-white']}`}>
      <Grid>
        <div className={styles['footer-social-list']}>
            <div className={styles['ipad-pr-0']}>
              <h4 className={`${styles.fontW600} ${styles['fs-16']} ${styles['black-color']}`}>{FOOTER_PAGE.TILA}</h4>
              <ul id = "constantfootertila" className={`${styles['pl-0']} ${styles['lne-ht2']}`}>
                <li>{FOOTER_PAGE.WHO_WE_ARE}</li>
                <li>{FOOTER_PAGE.OUR_VALUES}</li>
                <li>{FOOTER_PAGE.OUR_MISSION}</li>
                <li>{FOOTER_PAGE.PRESS_REALESES}</li>
                <li>{FOOTER_PAGE.JOIN_OUR_TEAM}</li>
                <li>{FOOTER_PAGE.CORPARATE_ADDRESS}</li>
              </ul>
            </div>
            <div className={styles['ipad-pr-0']}>
              <h4 className={`${styles.fontW600} ${styles['fs-16']} ${styles['black-color']}`}>{FOOTER_PAGE.POLICIES}</h4>
              <ul id = "constantfooterpolicy" className={`${styles['pl-0']} ${styles['lne-ht2']}`}>
                <li><a href={`/${lang}/policy/user-terms`} target="_blank">{FOOTER_PAGE.TERMS_CONDITION}</a></li>
                <li><a href={`/${lang}/policy/cancellation-policy`} target="_blank">{FOOTER_PAGE.CANCELLATION_POLICY}</a></li>
                <li><a href={`/${lang}/policy/return-and-exchange-policy#exchangePolicy`} target="_blank">{FOOTER_PAGE.EXCHANGE_REPLACEMENT_POLICY}</a></li>
                <li><a href={`/${lang}/policy/return-and-refund-policy#returnPolicy`} target="_blank">{FOOTER_PAGE.REFUND_POLICY}</a></li>
                <li><a href={`/${lang}/policy/warranty-policy#warrantyPolicy`} target="_blank">{FOOTER_PAGE.WARRENTY_POLICY}</a></li>
                {/* <li><a href="/en/policy/sp" target="_blank">{FOOTER_PAGE.SHIPPING_POLICY}</a></li> */}
                <li><a href={`/${lang}/policy/privacy-policy`} target="_blank">{FOOTER_PAGE.PRIVACY_POLICY}</a></li>
              </ul>
            </div>
            {/* <Col md={2} sm={2} className={styles['ipad-pr-0']}>
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
            </Col> */}
            <div className={styles['ipad-pr-0']}>
              <div>
                <h4 className={`${styles.fontW600} ${styles['fs-16']} ${styles['black-color']}`}>{FOOTER_PAGE.HELP}</h4>
                <ul id = "constantfooterhelp" className={`${styles['pl-0']} ${styles['lne-ht2']}`}>
                  <li>{FOOTER_PAGE.CONSUMER_RIGHT}</li>
                  <li><a href={`/${lang}/policy/customer-delivery`} target="_blank">{FOOTER_PAGE.SHIPPING_AND_DELIVERY}</a></li>
                  <li>{FOOTER_PAGE.FREQUENTLY_ASKED_QUESTIONS}</li>
                  <li>{FOOTER_PAGE.CUSTOMER_CARE}</li>
                </ul>
              </div>
            </div>
            <div className={styles['ipad-pr-0']}>
              <div className={`${styles['fs-12']} ${styles['footer-download-app']}`}>
                <div className={styles['ml-20']}>
                  <h4 className={`${styles.fontW600} ${styles['fs-16']} ${styles['black-color']}`}>{FOOTER_PAGE.DOWNLOAD_APP}</h4>
                  <div>
                    <span className={`${styles.flex} ${styles['mt-10']} ${styles['mb-15']} ${styles['download-icons']}`}>
                      <img src="/static/img/bg-img/app-strore.jpg" />
                    </span>
                    <span className={`${styles.flex} ${styles['download-icons']}`}>
                      <img src="/static/img/bg-img/google.jpg" />
                    </span>
                  </div>
                </div>
                <div className={`${styles['pt-30']} ${styles['ml-20']}`}>
                  <span className={styles['fs-10']}>&copy;{FOOTER_PAGE.TILA_RIGHTS}</span>
                </div>
              </div>
            </div>
          </div>
      </Grid>
    </div>
  </div>
);

export default FooterBar;
