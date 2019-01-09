import { Grid, Row, Col } from 'react-bootstrap';
import SVGComponent from '../common/SVGComponet';
import { mergeCss } from '../../utils/cssUtil';
import publicUrls from '../../constants';
const styles = mergeCss('components/Footer/footer');
import { languageDefinations } from '../../utils/lang';
const {FOOTER_PAGE} = languageDefinations();

const FooterBar = props => (
  <div className={`${styles['footer-container']} ${styles['mt-25']} hidden-xs`}>
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
              Fashion
            </h4>
            <ul className={`${styles['pl-30']} ${styles['lne-ht2']}`}>
              <li>{`${FOOTER_PAGE.WOMENS} ${FOOTER_PAGE.FASHION}`}</li>
              <li>{`${FOOTER_PAGE.MENS} ${FOOTER_PAGE.FASHION}`}</li>
              <li>{`${FOOTER_PAGE.GIRLS} ${FOOTER_PAGE.FASHION}`}</li>
              <li>{`${FOOTER_PAGE.BOYS} ${FOOTER_PAGE.FASHION}`}</li>
              <li>{FOOTER_PAGE.WATCHES}</li>
              <li>{FOOTER_PAGE.JEWELLERY}</li>
              <li>{`${FOOTER_PAGE.WOMENS} ${FOOTER_PAGE.HANDGBAGS}`}</li>
              <li>{`${FOOTER_PAGE.MENS} ${FOOTER_PAGE.EYEWEAR}`}</li>
            </ul>
          </Col>
          <Col md={3} sm={3} className={styles['ipad-pr-0']}>
            <h4 className={`${styles['fontW600']} ${styles['fs-16']} ${styles['flex-center']}`}>
              <SVGComponent clsName={`${styles['footer-list-icon']} ${styles['mr-10']}`} src="icons/common-icon/processor-icon" />
              {FOOTER_PAGE.ELECTRONICS}
            </h4>
            <ul className={`${styles['pl-30']} ${styles['lne-ht2']}`}>
              <li>{FOOTER_PAGE.MOBILES}</li>
              <li>{FOOTER_PAGE.TABLETS}</li>
              <li>{FOOTER_PAGE.LAPTOPS}</li>
              <li>{FOOTER_PAGE.HOME_APLLIANCES}</li>
              <li>{`${FOOTER_PAGE.CAMERA},${FOOTER_PAGE.PHOTO} & ${FOOTER_PAGE.VIDEO}`}</li>
              <li>{FOOTER_PAGE.TELEVISIONS}</li>
              <li>{FOOTER_PAGE.HEADPHONES}</li>
              <li>{FOOTER_PAGE.VIDEO_GAMES}</li>
            </ul>
          </Col>
          <Col md={2} sm={2} className={styles['ipad-pr-0']}>
            <h4 className={`${styles['fontW600']} ${styles['fs-16']} ${styles['flex-center']}`}>
              <SVGComponent clsName={`${styles['footer-list-icon']} ${styles['mr-10']}`} src="icons/footers-icons/life-style" />
              Lifestyle</h4>
            <ul className={`${styles['pl-30']} ${styles['lne-ht2']}`}>
              <li>{FOOTER_PAGE.HOME_DECOR}</li>
              <li>{`${FOOTER_PAGE.KITCHEN} & ${FOOTER_PAGE.DINING}`}</li>
              <li>{FOOTER_PAGE.BATH}</li>
              <li>{FOOTER_PAGE.HOME_APLLIANCES}</li>
              <li>{`${FOOTER_PAGE.TOOLS} & ${FOOTER_PAGE.HOME_IMPROVE}`}</li>
              <li>{`${FOOTER_PAGE.AUDIO} & ${FOOTER_PAGE.VIDEO}`}</li>
              <li>{FOOTER_PAGE.FURNITURE}</li>
              <li>{`${FOOTER_PAGE.PATIO}, ${FOOTER_PAGE.LAWN} & ${FOOTER_PAGE.GARDEN}`}</li>
            </ul>
          </Col>
          <Col md={2} sm={2} className={styles['ipad-pr-0']}>
            <h4 className={`${styles['fontW600']} ${styles['fs-16']} ${styles['flex-center']}`}>
              <SVGComponent clsName={`${styles['footer-list-icon']} ${styles['mr-10']}`} src="icons/footers-icons/beauty-makeup" />
              {`${FOOTER_PAGE.BEAUTY} & ${FOOTER_PAGE.MAKEUP}`}</h4>
            <ul className={`${styles['pl-30']} ${styles['lne-ht2']}`}>
              <li>{FOOTER_PAGE.FRAGRANCE}</li>
              <li>{FOOTER_PAGE.MAKEUP}</li>
              <li>{FOOTER_PAGE.HAIRCARE}</li>
              <li>{`${FOOTER_PAGE.SKINCARE}${FOOTER_PAGE.AUDIO} & ${FOOTER_PAGE.VIDEO}`}</li>
              <li>{FOOTER_PAGE.PERSONAL_CARE}</li>
              <li>{`${FOOTER_PAGE.TOOLS} & ${FOOTER_PAGE.ACCESSORIES}`}</li>
              <li>{`${FOOTER_PAGE.MENS} ${FOOTER_PAGE.GROOMING}`}</li>
            </ul>
          </Col>

          <Col md={2} sm={2} className={styles['ipad-pr-0']}>
            <h4 className={`${styles['fontW600']} ${styles['fs-16']}`}>{FOOTER_PAGE.TOP_BRAND}</h4>
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
                    <span className={`${styles['fs-12']} ${styles['lgt-blue']} ${styles['pl-10']}`}>{FOOTER_PAGE.VENESSA}</span>
                  </span>
                  <p className={`${styles['thick-gry-clr']} ${styles['m-0']} ${styles['pt-5']}`}>${FOOTER_PAGE.PANSTICK_SKIN_ADD}</p>
                  <span className={`${styles['fs-12']} ${styles['footer-time']}`}>2 {FOOTER_PAGE.HOUR_AGO}</span>
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
                    <span className={`${styles['fs-12']} ${styles['lgt-blue']} ${styles['pl-10']}`}>{FOOTER_PAGE.PRIYANKA}</span>
                  </span>
                  <p className={`${styles['thick-gry-clr']} ${styles['m-0']} ${styles['pt-5']}`}>{FOOTER_PAGE.PANSTICK_SKIN_ADD}</p>
                  <span className={`${styles['fs-12']} ${styles['footer-time']}`}>2 {FOOTER_PAGE.HOUR_AGO}</span>
                </Col>
              </div>
            </div>
          </Col>
          <Col md={3} sm={6} className={styles['pr-0']}>
            <h4 className={styles['flex-center']}>
              <span className={`${styles['footer-social-title']} ${styles['mr-10']}`}><img src="/static/img/bg-img/bitmap-twitter.jpg" className={styles['img-responsive']} /></span>
              <span className={`${styles['twitter-clr']} ${styles['fontW600']}`}>{FOOTER_PAGE.ON_TWITTER}</span>
              <span className={`${styles['follow-twi-btn']} ${styles['fs-10']} ${styles['lne-ht2']} ${styles['white-color']} ${styles['ml-10']} ${styles['pl-15']} ${styles['pr-15']}`}>{FOOTER_PAGE.FOLLOW}</span>
            </h4>
            <div className={`${styles['footer-social-list-main-inn']} ${styles['ipad-br-0']} ${styles['pr-10']}`}>
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
                    <span className={`${styles['fs-12']} ${styles['lgt-blue']} ${styles['pl-10']}`}>{FOOTER_PAGE.PUMA}</span>
                  </span>
                  <p className={`${styles['thick-gry-clr']} ${styles['m-0']} ${styles['pt-5']}`}>{FOOTER_PAGE.PANSTICK_SKIN_ADD}</p>
                  <span className={`${styles['fs-12']} ${styles['footer-time']}`}>2 {FOOTER_PAGE.HOUR_AGO}</span>
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
                    <span className={`${styles['fs-12']} ${styles['lgt-blue']} ${styles['pl-10']}`}>{FOOTER_PAGE.NIKE}</span>
                  </span>
                  <p className={`${styles['thick-gry-clr']} ${styles['m-0']} ${styles['pt-5']}`}>{FOOTER_PAGE.PANSTICK_SKIN_ADD}</p>
                  <span className={`${styles['fs-12']} ${styles['footer-time']}`}>2 {FOOTER_PAGE.HOUR_AGO}</span>
                </Col>
              </div>
            </div>
          </Col>
          <Col md={3} sm={6} className={styles['pr-0']}>
            <h4 className={styles['flex-center']}>
              <span className={`${styles['footer-social-title']} ${styles['mr-10']}`}><img src="/static/img/bg-img/bitmap-instgram.jpg" className={styles['img-responsive']} /></span>
              <span className={`${styles['fontW600']}`}>{FOOTER_PAGE.ON_INSTAGRAM}</span>
              <span className={`${styles['follow-inst-btn']} ${styles['fs-10']} ${styles['lne-ht2']} ${styles['white-color']} ${styles['ml-10']} ${styles['pl-15']} ${styles['pr-15']}`}>{FOOTER_PAGE.FOLLOW}</span>
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
                    <span className={`${styles['fs-12']} ${styles['lgt-blue']} ${styles['pl-10']}`}>{FOOTER_PAGE.SONY_INDIA}</span>
                  </span>
                  <p className={`${styles['thick-gry-clr']} ${styles['m-0']} ${styles['pt-5']}`}>{FOOTER_PAGE.PANSTICK_SKIN_ADD}</p>
                  <span className={`${styles['fs-12']} ${styles['footer-time']}`}>2 {FOOTER_PAGE.HOUR_AGO}</span>
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
                    <span className={`${styles['fs-12']} ${styles['lgt-blue']} ${styles['pl-10']}`}>{FOOTER_PAGE.LEVIS}</span>
                  </span>
                  <p className={`${styles['thick-gry-clr']} ${styles['m-0']} ${styles['pt-5']}`}>{FOOTER_PAGE.PANSTICK_SKIN_ADD}</p>
                  <span className={`${styles['fs-12']} ${styles['footer-time']}`}>2 {FOOTER_PAGE.HOUR_AGO}</span>
                </Col>
              </div>
            </div>
          </Col>
          <Col md={3} sm={6} className={styles['pr-0']}>
            <h4 className={styles['flex-center']}>
              <span className={`${styles['footer-social-title']} ${styles['mr-10']}`}><img src="/static/img/bg-img/bitmap-social-fb.jpg" className={styles['img-responsive']} /></span>
              <span className={`${styles['lgt-blue']} ${styles['fontW600']}`}>{FOOTER_PAGE.ON_FACEBOOK}</span>
              <span className={`${styles['follow-fb-btn']} ${styles['fs-10']} ${styles['lne-ht2']} ${styles['white-color']} ${styles['ml-10']} ${styles['pl-15']} ${styles['pr-15']}`}>{FOOTER_PAGE.FOLLOW}</span>
            </h4>
            <div className={`${styles['footer-social-list-main-inn']} ${styles['ipad-br-0']} ${styles['pr-10']}`}>
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
                    <span className={`${styles['fs-12']} ${styles['lgt-blue']} ${styles['pl-10']}`}>{FOOTER_PAGE.H_M}</span>
                  </span>
                  <p className={`${styles['thick-gry-clr']} ${styles['m-0']} ${styles['pt-5']}`}>{FOOTER_PAGE.PANSTICK_SKIN_ADD}</p>
                  <span className={`${styles['fs-12']} ${styles['footer-time']}`}>2 {FOOTER_PAGE.HOUR_AGO}</span>
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
                    <span className={`${styles['fs-12']} ${styles['lgt-blue']} ${styles['pl-10']}`}>{FOOTER_PAGE.LEVIS}</span>
                  </span>
                  <p className={`${styles['thick-gry-clr']} ${styles['m-0']} ${styles['pt-5']}`}>{FOOTER_PAGE.LOOK_FEEL}</p>
                  <span className={`${styles['fs-12']} ${styles['footer-time']}`}>2 {FOOTER_PAGE.HOUR_AGO}</span>
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
              <li>{FOOTER_PAGE.TERMS_CONDITION}</li>
              <li>{FOOTER_PAGE.PRIVACY_POLICY}</li>
              <li>{FOOTER_PAGE.COOKIE_POLICY}</li>
            </ul>
          </Col>
          <Col md={2} sm={2} className={styles['ipad-pr-0']}>
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
          </Col>
          <Col md={2} sm={2} className={styles['ipad-pr-0']}>
            <div>
              <h4 className={`${styles['fontW600']} ${styles['fs-16']} ${styles['black-color']}`}>{FOOTER_PAGE.CUSTOMER_SERVICE}</h4>
              <ul className={`${styles['pl-0']} ${styles['lne-ht2']}`}>
                <li>{FOOTER_PAGE.DELIVERY}</li>
                <li>{FOOTER_PAGE.SIZE_GUIDE}</li>
                <li>{FOOTER_PAGE.PAY_METHOD}</li>
                <li>{FOOTER_PAGE.RETURN}</li>
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
                <span className={styles['fs-10']}>{FOOTER_PAGE.TILA_RIGHTS}</span>
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  </div>
);

export default FooterBar;
