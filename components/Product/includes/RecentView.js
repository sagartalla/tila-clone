import React from 'react';
// import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import Slider from 'react-slick';
// import constants from '../../../constants';
import constants from '../../../constants';
import { mergeCss } from '../../../utils/cssUtil';
import { languageDefinations } from '../../../utils/lang';

const styles = mergeCss('components/Product/product');

const { PDP_PAGE } = languageDefinations();

const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
};

const RecentView = (props) => {
  const { recentlyViewed, shippingInfo } = props;
  return (
    <div className={`${styles['recentview-main']} ${styles['pt-25']} ${styles['pb-25']}`}>
      <h6 className={`${styles['recent-title']} ${styles['pt-15']} ${styles['pb-15']} ${styles['pl-15']} ${styles['fontW600']}`}><span className={styles['pl-15']}>{PDP_PAGE.RECENTLY_VIEWED}</span></h6>
      <div>
        <Slider {...settings}>
          {
            recentlyViewed.map(item => (
              <Col md={2} className={`${styles['pl-0']}`}>
                <a href={item.uri}>
                  <div className={`${styles['recentview-main-inn']} ${styles['flex']} ${styles['flex-colum']}`}>
                    <div className={styles['recentview-main-inn-img']}><img src={`${constants.mediaDomain}/${item.im}`} className="img-responsive" /></div>
                    <div>
                      <h6 className={`${styles['fs-10']} ${styles['mb-0']} ${styles['thick-gry-clr']} ${styles['elipsis']}`}>{item.nm}</h6>
                      <span className={`${styles['fs-12']} ${styles['thick-gry-clr']}`}><span className={styles['fontW600']}>{item.pr} </span><span>{item.cd}</span></span>
                    </div>
                  </div>
                </a>
              </Col>
            ))
          }
        </Slider>
      </div>
    </div>
  );
}

export default RecentView;
