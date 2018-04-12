// params: { columnIndex, key, rowIndex, style }
import styles from '../search.styl';
import { mediaDomain } from '../../../constants';

const Product = ({ media=[], productId, displayName, variants }) => {
  const style = {
    backgroundImage: `url(${mediaDomain}/${media[0]})`
  };
  return (
    <div className={styles['product-item']}>
      <div className={styles['img-cont']}>
        <div style={style} className={styles['image-div']}/>
      </div>
      <div className={styles['desc-cont']}>
        <div className={styles['prdt-name']}>{displayName}</div>
        <div className={styles['prdt-name-count']}> {variants.length}</div>
      </div>
    </div>
  );
};

export default Product;