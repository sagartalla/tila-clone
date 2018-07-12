import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Tabs, Tab } from 'react-bootstrap';
import constants from '../../../constants';

import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Product/product');

const RecentView = ({imgs}) => {
 return(
  <div className={`${styles['recentview-main']} ${styles['pt-25']} ${styles['pb-25']}`}>
    <h6 className={`${styles['recent-title']} ${styles['pt-15']} ${styles['pb-15']} ${styles['pl-15']} ${styles['fontW600']}`}><span className={styles['pl-15']}>RECENTLY VIEWED</span></h6>
    <div>
      <Col md={2} className={`${styles['pl-0']} ${styles['mr-30']}`}>
        <div>
          <img src="https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/catalog/t_shirt/PTSHSAUMURGPB7WJ2V/GALLERY/MEDIAZMPJUDTA0UTLWVW6F5BAY8/1-web-desktop-product.jpg" className="img-responsive"/>
          <div>
            <h6 className={`${styles['fs-10']} ${styles['mb-0']} ${styles['thick-gry-clr']}`}>Round Hat</h6>
            <span className={styles['fs-12']}><span className={styles['fontW600']}>16.00 </span><span>AED</span></span>
          </div>
        </div>
      </Col>
      <Col md={2}  className={`${styles['pl-0']} ${styles['mr-30']}`}>
        <div>
          <img src="https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/catalog/t_shirt/PTSH6DN9HC1FZCPUW0/GALLERY/MEDIAMFSQVFXYQVJYLNIQDJCRUI/1-web-desktop-product.jpg" className="img-responsive"/>
          <div>
            <h6 className={`${styles['fs-10']} ${styles['mb-0']} ${styles['thick-gry-clr']}`}>Round Hat</h6>
            <span className={styles['fs-12']}><span className={styles['fontW600']}>16.00 </span><span>AED</span></span>
          </div>
        </div>
      </Col>
      <Col md={2}  className={`${styles['pl-0']} ${styles['mr-30']}`}>
        <div>
          <img src="https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/catalog/t_shirt/PTSHXARRVKNVZJCTXN/GALLERY/MEDIAGVBH4CP09TZ5VJ0LR38MIP/1-web-desktop-product.jpg" className="img-responsive"/>
          <div>
            <h6 className={`${styles['fs-10']} ${styles['mb-0']} ${styles['thick-gry-clr']}`}>Round Hat</h6>
            <span className={styles['fs-12']}><span className={styles['fontW600']}>16.00 </span><span>AED</span></span>
          </div>
        </div>
      </Col>
      <Col md={2}  className={`${styles['pl-0']} ${styles['mr-30']}`}>
        <div>
          <img src="https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/catalog/sweatshirt/PSWSWNNZM561EV7BQW/GALLERY/MEDIAA4CCD1HEQTAMWXNGWW7WOU/4-web-desktop-product.jpg" className="img-responsive"/>
          <div>
            <h6 className={`${styles['fs-10']} ${styles['mb-0']} ${styles['thick-gry-clr']}`}>Round Hat</h6>
            <span className={styles['fs-12']}><span className={styles['fontW600']}>16.00 </span><span>AED</span></span>
          </div>
        </div>
      </Col>
      <Col md={2}  className={`${styles['pl-0']}`}>
        <div>
          <img src="https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/catalog/jean/PJEADNCHLDNTPGPE1B/GALLERY/MEDIALZ0B9OHXYNNN01LUKMCWVZ/1-web-desktop-product.jpg" className="img-responsive"/>
          <div>
            <h6 className={`${styles['fs-10']} ${styles['mb-0']} ${styles['thick-gry-clr']}`}>Round Hat</h6>
            <span className={styles['fs-12']}><span className={styles['fontW600']}>16.00 </span><span>AED</span></span>
          </div>
        </div>
      </Col>
    </div>
  </div>
 );
}

export default RecentView;