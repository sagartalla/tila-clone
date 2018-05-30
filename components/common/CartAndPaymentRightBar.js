import { Grid, Row, Col } from 'react-bootstrap';

import styles from './rightBar.styl';

const CartAndPaymentRightBar = props => {
  const { total_price, total_offer_price, total_discount, total_shipping, tax, item_cnt, currency } = props.data;
  return (
    <div className={`${styles['right-bar']}`}>
      <div>
        <ul className={`${styles['m-0']} ${styles['p-0']}`}>
          <li><h5 className={styles['mb-20']}>Order Summary</h5></li>
          <li>Price ({item_cnt} item{item_cnt > 1 ? 's' : ''})<span> {total_price + ' ' + currency}</span></li>
          <li>Delivery Charges <span>{total_shipping} {currency}</span></li>
          <li>Discount <span>{total_discount} {currency}</span></li>
          {
            tax != 0 ? <li>Taxes <span>{} {currency}</span></li> : null
          }
          <li className={styles['mt-20']}><b>Total Amount <span>{total_offer_price + ' ' + currency}</span></b></li>
        </ul>
      </div>
    </div>
  )
};

export default CartAndPaymentRightBar;

