// params: { columnIndex, key, rowIndex, style }
import { Link } from '../../../routes';
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import constants from '../../../constants';
import { Grid, Row, Col } from 'react-bootstrap';

import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Search/search');

const Product = ({
  media = [],
  displayName,
  variants,
  productId,
  priceRange,
}) => {
  const style = {
    backgroundImage: `url(${constants.mediaDomain}/${media[0]})`
  };
  return (

    <Link route={`/product?productId=${productId}`}>
      <Col md={3} xs={12} className={`${styles['pr-0']} ${styles['pb-25']} ${styles['product-items']}`}>
        <div className={`${styles['img-cont']} ${styles['p-20']}`}>
          <div style={style} className={styles['image-div']} />
        </div>
        <div className={styles['desc-cont']}>
          <div className={`${styles['prdt-name']} ${styles['fs-12']} ${styles['pt-15']} ${styles['pb-5']}`}><a href="#">{displayName}</a></div>
          <div> {priceRange}</div>
          <div className={styles['variant-info']}>
            {
              _.map(variants, (variantValues, key) => <div key={key}>{`${key} : ${variantValues.join(', ')}`}</div>)
            }
          </div>
        </div>
      </Col>

      {/*<div className={styles['product-item']}>
        <div className={styles['img-cont']}>
          <div style={style} className={styles['image-div']}/>
        </div>
        <div className={styles['desc-cont']}>
          <div className={styles['prdt-name']}>{displayName}</div>
          <div> Price:  { priceRange } </div>
          <div className={styles['variant-info']}>
            {
              _.map(variants, (variantValues, key) => <div key={key}>{`${key} : ${variantValues.join(', ')}`}</div>)
            }
          </div>
        </div>
          </div>*/}
    </Link>
  );
};

Product.propTypes = {
  media: PropTypes.array.isRequired,
  displayName: PropTypes.array.isRequired,
  variants: PropTypes.object.isRequired,
}


export default Product;