// params: { columnIndex, key, rowIndex, style }
import styles from '../search.styl';

const Product = ({ media, productId, displayName, variants }) => (
  <div className={styles['product-item']}>
    <div className={styles['img-cont']}>
      <img src="http://via.placeholder.com/180x240" alt={media[0]} />
    </div>
    <div className={styles['desc-cont']}>
      <div className={styles['prdt-name']}>{displayName}</div>
      <div className={styles['prdt-name-count']}> {variants.length}</div>
    </div>
  </div>
);

export default Product;