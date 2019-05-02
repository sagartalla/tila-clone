import React from 'react';
import PropTypes from "prop-types";
import { Grid, Row, Col } from 'react-bootstrap';
import SVGCompoent from '../../common/SVGComponet';
import Review from './Reviews';
import lang from '../../../utils/language';

import styles_en from '../product_en.styl';
import styles_ar from '../product_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;


const Specification = ({ catalog }) => {
  return (
    <div className={`${styles['elt-Specification-main']} ${styles['pt-30']} ${styles['pb-30']}`}>
      <div className={`${styles['flex']} ${styles['review-main']}`}>
        <Col md={3} className={styles['t-c']}>
          <div className={`${styles['review-no']}`}>4.0</div>
        </Col>
        <Col md={9}>
          <div>
            <Col md={3}>
              <div>
                <div className={`${styles['flex-center']} ${styles['flex-colum']}`}>
                  <span className={styles['fs-26']}>1.0</span>
                  <span className={`${styles['fs-10']} ${styles['pb-10']}`}>10 people rated</span>
                </div>
                <div className={`${styles['flex-center']} ${styles['flex-colum']}`}>
                  <SVGCompoent clsName={`${styles['specification-icon']}`} src="icons/common-icon/battery" />
                  <span className={`${styles['fs-12']} ${styles['pt-15']}`}>Battery Life</span>
                </div>
              </div>
            </Col>
            <Col md={2}>
              <div>
                <div className={`${styles['flex-center']} ${styles['flex-colum']}`}>
                  <span className={styles['fs-26']}>4.0</span>
                  <span className={`${styles['fs-10']} ${styles['pb-10']}`}>110 people rated</span>
                </div>
                <div className={`${styles['flex-center']} ${styles['flex-colum']}`}>
                  <SVGCompoent clsName={`${styles['specification-icon']}`} src="icons/common-icon/display-screen" />
                  <span className={`${styles['fs-12']} ${styles['pt-15']}`}>Display Quality</span>
                </div>
              </div>
            </Col>
            <Col md={2}>
              <div>
                <div className={`${styles['flex-center']} ${styles['flex-colum']}`}>
                  <span className={styles['fs-26']}>3.5</span>
                  <span className={`${styles['fs-10']} ${styles['pb-10']}`}>35 people rated</span>
                </div>
                <div className={`${styles['flex-center']} ${styles['flex-colum']}`}>
                  <SVGCompoent clsName={`${styles['processor-icon']}`} src="icons/common-icon/processor-icon" />
                  <span className={`${styles['fs-12']} ${styles['pt-15']}`}>Processor Speed</span>
                </div>
              </div>
            </Col>
            <Col md={2}>
              <div>
                <div className={`${styles['flex-center']} ${styles['flex-colum']}`}>
                  <span className={styles['fs-26']}>4.0</span>
                  <span className={`${styles['fs-10']} ${styles['pb-10']}`}>1110 people rated</span>
                </div>
                <div className={`${styles['flex-center']} ${styles['flex-colum']}`}>
                  <SVGCompoent clsName={`${styles['specification-icon']}`} src="icons/common-icon/body-metal" />
                  <span className={`${styles['fs-12']} ${styles['pt-15']}`}>Body Weight & Material</span>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div>
                <div className={`${styles['flex-center']} ${styles['flex-colum']}`}>
                  <span className={styles['fs-26']}>4.0</span>
                  <span className={`${styles['fs-10']} ${styles['pb-10']}`}>1110 people rated</span>
                </div>
                <div className={`${styles['flex-center']} ${styles['flex-colum']}`}>
                  <SVGCompoent clsName={`${styles['camera-icon']}`} src="icons/common-icon/camera-icon" />
                  <span className={`${styles['fs-12']} ${styles['pt-15']}`}>Camera Quality</span>
                </div>
              </div>
            </Col>
          </div>
        </Col>
      </div>
      <div className={`${styles['pt-30']} ${styles['pb-30']} ${styles['specification-review']}`}>
        <Col md={12}>
          <Col md={4}>
            <div className={styles['flex-center']}>
              <div className={`${styles['profile-img']} ${styles['flex']}`}>
                <span></span>
              </div>
              <div className={`${styles['pl-20']} ${styles['thick-gry-clr']}`}>
                <h5 className={`${styles['mb-0']} ${styles['fontW600']}`}>Huda Beauty</h5>
                <span className={`${styles['fs-12']}`}>Social Influencer</span>
                <div className={`${styles['flex']} ${styles['review-start-inn']} ${styles['pb-10']}`}>
                  <SVGCompoent clsName={`${styles['star-icon']}`} src="icons/common-icon/pink-star" />
                  <SVGCompoent clsName={`${styles['star-icon']}`} src="icons/common-icon/pink-star" />
                  <SVGCompoent clsName={`${styles['star-icon']}`} src="icons/common-icon/pink-star" />
                  <SVGCompoent clsName={`${styles['star-icon']}`} src="icons/common-icon/pink-star" />
                  <SVGCompoent clsName={`${styles['star-icon']}`} src="icons/common-icon/pink-star" />
                </div>
              </div>
            </div>
          </Col>
          <Col md={8} className={styles['p-0']}>
            <h4 className={`${styles['fs-16']} ${styles['thick-gry-clr']}`}>Review title goes here</h4>
            <p className={`${styles['fs-12']} ${styles['thick-gry-clr']}`}>Tailoring is part of the Stella McCartney DNA and for SS18 classics are twisted using vivid colours and contrasting volumes. Pair jackets with casual trousers and sporty shoes for a relaxed look. </p>
          </Col>
        </Col>
        <Col md={12}>
          <Col md={4}>
            <div className={styles['flex-center']}>
              <div className={`${styles['profile-img']} ${styles['flex']}`}>
                <span></span>
              </div>
              <div className={`${styles['pl-20']} ${styles['thick-gry-clr']}`}>
                <h5 className={`${styles['mb-0']} ${styles['fontW600']}`}>Huda Beauty</h5>
                <span className={`${styles['fs-12']}`}>Social Influencer</span>
                <div className={`${styles['flex']} ${styles['review-start-inn']} ${styles['pb-10']}`}>
                  <SVGCompoent clsName={`${styles['star-icon']}`} src="icons/common-icon/pink-star" />
                  <SVGCompoent clsName={`${styles['star-icon']}`} src="icons/common-icon/pink-star" />
                  <SVGCompoent clsName={`${styles['star-icon']}`} src="icons/common-icon/pink-star" />
                  <SVGCompoent clsName={`${styles['star-icon']}`} src="icons/common-icon/pink-star" />
                  <SVGCompoent clsName={`${styles['star-icon']}`} src="icons/common-icon/pink-star" />
                </div>
              </div>
            </div>
          </Col>
          <Col md={8} className={styles['p-0']}>
            <h4 className={`${styles['fs-16']} ${styles['thick-gry-clr']}`}>Review title goes here</h4>
            <p className={`${styles['fs-12']} ${styles['thick-gry-clr']}`}>Tailoring is part of the Stella McCartney DNA and for SS18 classics are twisted using vivid colours and contrasting volumes. Pair jackets with casual trousers and sporty shoes for a relaxed look. </p>
          </Col>
        </Col>
      </div>
    </div>
  );
}
export default Specification;
