// params: { columnIndex, key, rowIndex, style }
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styles from '../search.styl';
import constants from '../../../constants';

const Product = ({
  media = [],
  displayName,
  variants 
}) => {
  const style = {
    backgroundImage: `url(${constants.mediaDomain}/${media[0]})`
  };
  return (
    <div className={styles['product-item']}>
      <div className={styles['img-cont']}>
        <div style={style} className={styles['image-div']}/>
      </div>
      <div className={styles['desc-cont']}>
        <div className={styles['prdt-name']}>{displayName}</div>
        <div className={styles['variant-info']}>
          {
            _.map(variants, (variantValues, key) => <div key={key}>{`${key} : ${variantValues.join(', ')}`}</div>)
          }
        </div>
      </div>
    </div>
  );
};

Product.propTypes = {
  media: PropTypes.array.isRequired,
  displayName: PropTypes.string.isRequired,
  variants: PropTypes.array.isRequired, 
}


export default Product;