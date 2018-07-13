import React from 'react';
import PropTypes from "prop-types";
import { Grid, Row, Col } from 'react-bootstrap';
import SVGCompoent from '../../common/SVGComponet';
import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Product/product');

const Compare = ({ catalog }) => {
  return (
    <div className={`${styles['compare-main']} ${styles['pt-25']} ${styles['pb-25']}`}>
      <h4 className={`${styles['fs-16']} ${styles['fontW600']}`}>Tila Comparing (4 items) for you</h4>
      <Row className={styles['feature-part']}>
        <Col md={3}>
          <div className={styles['compare-product']}>
            <div className={styles['compare-product-inn']}>
              <h5 className={`${styles['flx-space-bw']}`}><span className={styles['fontW600']}>Features</span><span className={styles['lgt-blue']}>Clear All</span></h5>
              <div className={styles['checkbox-material']}>
                <input id="screen-size" type="checkbox" />
                <label htmlFor="screen-size"> Screen Size </label>
              </div>
              <div className={styles['checkbox-material']}>
                <input id="camera" type="checkbox" />
                <label htmlFor="camera"> Camera </label>
              </div>
              <div className={styles['checkbox-material']}>
                <input id="ram" type="checkbox" />
                <label htmlFor="ram"> RAM </label>
              </div>
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className={styles['compare-dtls']}>
            <div className={`${styles['compare-dtls-img']} ${styles['flex']} ${styles['justify-center']}`}>
              <img src="https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/catalog/mobile/PMOB02S4O3EWO5P4MX/GALLERY/MEDIASEV9NQV42NB3W1GRWT1LUF/apple-iphone-6s-plus-na-original-imaeby6wkfpmcsym.jpeg" className="img-responsive" />
            </div>
            <div className={`${styles['compare-dtls-inn']} ${styles['pt-20']} ${styles['t-c']}`}>
              <span className={`${styles['fs-12']} ${styles['lgt-blue']}`}>Apple</span>
              <div><span className={styles['fontW600']}>600.00 SAR  </span><span className={`${styles['fs-12']} ${styles['google-clr']}`}>- 60%</span></div>
              <span className={`${styles['fs-10']} ${styles['thick-gry-clr']}`}>iPhone 7 128 GB, Space Grey</span>
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className={styles['compare-dtls']}>
            <div className={`${styles['compare-dtls-img']} ${styles['flex']} ${styles['justify-center']}`}>
              <img src="https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/catalog/mobile/PMOBBIXF5GLMPQFBLY/GALLERY/MEDIAOYU1JZY4GKWPQJPZQW5KH8/item_XL_30719633_112682072.jpg" className="img-responsive" />
            </div>
            <div className={`${styles['compare-dtls-inn']} ${styles['pt-20']} ${styles['t-c']}`}>
              <span className={`${styles['fs-12']} ${styles['lgt-blue']}`}>Samsung</span>
              <div><span className={styles['fontW600']}>600.00 SAR  </span><span className={`${styles['fs-12']} ${styles['google-clr']}`}>- 60%</span></div>
              <span className={`${styles['fs-10']} ${styles['thick-gry-clr']}`}>Samsung 7 128 GB, Space Grey</span>
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className={styles['compare-dtls']}>
            <div className={`${styles['compare-dtls-img']} ${styles['flex']} ${styles['justify-center']}`}>
              <img src="https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/catalog/mobile/PMOBLWN3JQQ9G3SIE2/GALLERY/MEDIAWYM2HU91Y8RU6KXI3OAZFY/item_XXL_11725389_16973934.jpg" className="img-responsive" />
            </div>
            <div className={`${styles['compare-dtls-inn']} ${styles['pt-20']} ${styles['t-c']}`}>
              <span className={`${styles['fs-12']} ${styles['lgt-blue']}`}>LG</span>
              <div><span className={styles['fontW600']}>600.00 SAR  </span><span className={`${styles['fs-12']} ${styles['google-clr']}`}>- 60%</span></div>
              <span className={`${styles['fs-10']} ${styles['thick-gry-clr']}`}>LG 7 128 GB, Space Grey</span>
            </div>
          </div>
        </Col>
      </Row>
      <div className={styles['compare-main-items']}>
        <Row className={`${styles['compare-product-spficication']} ${styles['flex-center']} ${styles['m-0']}`}>
          <Col md={3}>
            <div className={`${styles['flex-center']} ${styles['flex-colum']} ${styles['dispy-screen']}`}>
              <SVGCompoent clsName={`${styles['screen-icon']}`} src="icons/common-icon/display-screen" />
              <span className={`${styles['fs-10']} ${styles['thick-gry-clr']} ${styles['pt-10']}`}>Screen Size</span>
            </div>
          </Col>
          <Col md={3}>
            <div className={`${styles['compare-product-spficication-inn']} ${styles['flex-center']} ${styles['flex-colum']} ${styles['fs-12']} ${styles['fontW600']}`}>
              <span>5.8”</span>
              <span>(1440 x 2960)</span>
            </div>
          </Col>
          <Col md={3}>
            <div className={`${styles['compare-product-spficication-inn']} ${styles['flex-center']} ${styles['flex-colum']} ${styles['fs-12']} ${styles['fontW600']}`}>
              <span>5.8”</span>
              <span>(1440 x 2960)</span>
            </div>
          </Col>
          <Col md={3}>
            <div className={`${styles['compare-product-spficication-inn']} ${styles['flex-center']} ${styles['flex-colum']} ${styles['fs-12']} ${styles['fontW600']}`}>
              <span>5.8”</span>
              <span>(1440 x 2960)</span>
            </div>
          </Col>
        </Row>
        <Row className={`${styles['compare-product-spficication']} ${styles['flex-center']} ${styles['m-0']}`}>
          <Col md={3}>
            <div className={`${styles['flex-center']} ${styles['flex-colum']} ${styles['dispy-screen']}`}>
              <SVGCompoent clsName={`${styles['camera-icon']}`} src="icons/common-icon/camera-icon" />
              <span className={`${styles['fs-10']} ${styles['thick-gry-clr']} ${styles['pt-10']}`}>Camera</span>
            </div>
          </Col>
          <Col md={3}>
            <div className={`${styles['compare-product-spficication-inn']} ${styles['flex-center']} ${styles['flex-colum']} ${styles['fs-12']} ${styles['fontW600']}`}>
              <span>12 MP R</span>
              <span>8 MP F</span>
            </div>
          </Col>
          <Col md={3}>
            <div className={`${styles['compare-product-spficication-inn']} ${styles['flex-center']} ${styles['flex-colum']} ${styles['fs-12']} ${styles['fontW600']}`}>
              <span>12 MP R</span>
              <span>8 MP F</span>
            </div>
          </Col>
          <Col md={3}>
            <div className={`${styles['compare-product-spficication-inn']} ${styles['flex-center']} ${styles['flex-colum']} ${styles['fs-12']} ${styles['fontW600']}`}>
              <span>12 MP R</span>
              <span>8 MP F</span>
            </div>
          </Col>
        </Row>
        <Row className={`${styles['compare-product-spficication']} ${styles['flex-center']} ${styles['m-0']}`}>
          <Col md={3}>
            <div className={`${styles['flex-center']} ${styles['flex-colum']} ${styles['dispy-screen']}`}>
              <SVGCompoent clsName={`${styles['processor-icon']}`} src="icons/common-icon/processor-icon" />
              <span className={`${styles['fs-10']} ${styles['thick-gry-clr']} ${styles['pt-10']}`}>Processor</span>
            </div>
          </Col>
          <Col md={3}>
            <div className={`${styles['compare-product-spficication-inn']} ${styles['flex-center']} ${styles['flex-colum']} ${styles['fs-12']} ${styles['fontW600']}`}>
              <span>2.4 GHz,Octa</span>
            </div>
          </Col>
          <Col md={3}>
            <div className={`${styles['compare-product-spficication-inn']} ${styles['flex-center']} ${styles['flex-colum']} ${styles['fs-12']} ${styles['fontW600']}`}>
              <span>2.4 GHz,Octa</span>
            </div>
          </Col>
          <Col md={3}>
            <div className={`${styles['compare-product-spficication-inn']} ${styles['flex-center']} ${styles['flex-colum']} ${styles['fs-12']} ${styles['fontW600']}`}>
              <span>2.4 GHz,Octa</span>
            </div>
          </Col>
        </Row>
        <Row className={`${styles['compare-product-spficication']} ${styles['flex-center']} ${styles['m-0']}`}>
          <Col md={3}>
            <div className={`${styles['flex-center']} ${styles['flex-colum']} ${styles['dispy-screen']}`}>
              <SVGCompoent clsName={`${styles['battery-icon']}`} src="icons/common-icon/battery" />
              <span className={`${styles['fs-10']} ${styles['thick-gry-clr']} ${styles['pt-10']}`}>Battery Power</span>
            </div>
          </Col>
          <Col md={3}>
            <div className={`${styles['compare-product-spficication-inn']} ${styles['flex-center']} ${styles['flex-colum']} ${styles['fs-12']} ${styles['fontW600']}`}>
              <span>3100 mah</span>
            </div>
          </Col>
          <Col md={3}>
            <div className={`${styles['compare-product-spficication-inn']} ${styles['flex-center']} ${styles['flex-colum']} ${styles['fs-12']} ${styles['fontW600']}`}>
              <span>3500 mah</span>
            </div>
          </Col>
          <Col md={3}>
            <div className={`${styles['compare-product-spficication-inn']} ${styles['flex-center']} ${styles['flex-colum']} ${styles['fs-12']} ${styles['fontW600']}`}>
              <span>3100 mah</span>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
export default Compare;