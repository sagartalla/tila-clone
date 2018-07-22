import React from 'react';
import PropTypes from "prop-types";
import { Grid, Row, Col } from 'react-bootstrap';

import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Product/product');

const Description = ({ catalog }) => {
  return (
    <div className={`${styles['elt-description-main']} ${styles['pt-30']} ${styles['pb-30']}`}>
      <h4><span className={`${styles['think-pink-bdr-rgt']} ${styles['pl-15']} ${styles['fontW600']} ${styles['fs-20']}`}>Screen size & Dimensions</span></h4>
      <div className={styles['flex']}>
        <Col md={4}>
          <div>
            <h4 className={styles['fontW600']}>Screen Size</h4>
            <ul className={`${styles['pl-0']} ${styles['lne-ht2']}`}>
              <li>13.9cm (5.5) LTPS FHD</li>
              <li>display</li>
              <li>450nit brightness</li>
              <li>1920 x 1080 resolution, </li>
            </ul>
          </div>
          <div>
            <h4 className={styles['fontW600']}>Dimensions</h4>
            <ul className={`${styles['pl-0']} ${styles['lne-ht2']}`}>
              <li>Height: 155.4 mm</li>
              <li>Width: 75.8 mm</li>
              <li>Thickness: 7.3 mm</li>
              <li>Weight: 165 g</li>
            </ul>
          </div>
        </Col>
        <Col md={8}>

        </Col>
      </div>
      <div className={`${styles['prod-description']} ${styles['pb-20']}`}>
        <h4><span className={`${styles['think-pink-bdr-rgt']} ${styles['pl-15']} ${styles['fontW600']} ${styles['fs-20']}`}>Product Description</span></h4>
        <p className={styles['pl-15']}>Tailoring is part of the Stella McCartney DNA and for SS18 classics are twisted using vivid colours and contrasting volumes. Pair jackets with casual trousers and sporty shoes for a relaxed look. Tailoring is part of the Stella McCartney DNA and for SS18 classics are twisted using vivid colours and contrasting volumes. Pair jackets with casual trousers and sporty shoes for a relaxed look. </p>
      </div>
      <div className={styles['prod-specification']}>
        <h4><span className={`${styles['think-pink-bdr-rgt']} ${styles['pl-15']} ${styles['fontW600']} ${styles['fs-20']}`}>Camera & Video</span></h4>
        <div className={`${styles['flex']} ${styles['overview-inn']}`}>
          <Col md={4}>
            <h4 className={styles['fontW600']}>Dual Camera</h4>
            <ul className={`${styles['pl-0']} ${styles['lne-ht2']}`}>
              <li>Wide-angle lens</li>
              <li>12MP 1.25μm f/2.2</li>
              <li>26mm equivalent focal length</li>
              <li>5-piece lens</li>
            </ul>
          </Col>
          <Col md={4}>
            <ul className={`${styles['pl-0']} ${styles['lne-ht2']}`}>
              <li>Wide-angle lens</li>
              <li>12MP 1.25μm f/2.2</li>
              <li>26mm equivalent focal length</li>
              <li>5-piece lens</li>
            </ul>
          </Col>
          <Col md={4}>
            <ul className={`${styles['pl-0']} ${styles['lne-ht2']}`}>
              <li>Wide-angle lens</li>
              <li>12MP 1.25μm f/2.2</li>
              <li>26mm equivalent focal length</li>
              <li>5-piece lens</li>
            </ul>
          </Col>
        </div>
      </div>
    </div>
  );
}
export default Description;
