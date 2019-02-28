import React from 'react';
import PropTypes from "prop-types";
import { Grid, Row, Col } from 'react-bootstrap';
import _ from 'lodash';
import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Product/product');
import constants from '../../../constants';

const renderVideoImage = (url) => ({
  IMAGE: <img
    src={`${constants.mediaDomain}/${url}`}
    className='img-responsive' /> ,
  VIDEO: <video
     src={`${constants.mediaDomain}/${url}`}
     className='img-responsive' controls />
})

const displayDescription = (el,index) => {
  if(index === 0) {
    return (
      <div
        key={'desc_'+index}
        className={`${styles['flex']} ${styles['elt-description-titleInfo']}`}
        >
        <Col md={8}>
          <div>
            {renderVideoImage(el.media.url)[el.media.type]}
          </div>
        </Col>
        <Col md={4}>
          <div>
            <h4>{el.title}</h4>
            <p className={styles['fs-16']}>{el.body}</p>
          </div>
        </Col>
      </div>
    )
  }
  return (
    <div key={'desc_'+index} className={styles['elt-description-column']}>
        <div className={styles['mb-5']}>
          {renderVideoImage(el.media.url)[el.media.type]}
        </div>
        <div>
          <h4>{el.title}</h4>
          <p className={styles['fs-16']}>{el.body}</p>
        </div>
    </div>

  )
}

const Description = ({ productDescription }) => {
  return (
    <div
      className={`${styles['elt-description-main']} ${styles['pt-30']} ${styles['pb-30']}`}>
        <div>
          {
              _.sortBy(productDescription,['order']).map(displayDescription)
          }
        </div>
    </div>
  );
}
export default Description;
