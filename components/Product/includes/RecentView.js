import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
// import constants from '../../../constants';

import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Product/product');

const RecentView = props => {
  const { recentlyViewed } = props;
  return (
    <div className={`${styles['recentview-main']} ${styles['pt-25']} ${styles['pb-25']}`}>
      <h6 className={`${styles['recent-title']} ${styles['pt-15']} ${styles['pb-15']} ${styles['pl-15']} ${styles['fontW600']}`}><span className={styles['pl-15']}>RECENTLY VIEWED</span></h6>
      <div>
        {
          recentlyViewed.map((item) => {
            return (
              <Col md={2} className={`${styles['pl-0']} ${styles['mr-30']}`}>
                <a href={item.uri}>
                  <div>
                    <img src={"https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/" + item.im} className="img-responsive" />
                    <div>
                      <h6 className={`${styles['fs-10']} ${styles['mb-0']} ${styles['thick-gry-clr']} ${styles['elipsis']}`}>{item.nm}</h6>
                      <span className={`${styles['fs-12']} ${styles['thick-gry-clr']}`}><span className={styles['fontW600']}>{item.pr} </span><span>{item.cd}</span></span>
                    </div>
                  </div>
                </a>
              </Col>
            )
          })
        }
      </div>
    </div>
  );
}

export default RecentView;