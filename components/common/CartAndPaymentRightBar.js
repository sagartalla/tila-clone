import { Grid, Row, Col } from 'react-bootstrap';

import styles from './rightBar.styl';

const CartAndPaymentRightBar = props => {
  const { total_price, currency } = props.data;
  return (
    <div className={`${styles['right-bar']}`}>
      <div>
        <ul className={`${styles['m-0']} ${styles['p-0']}`}>
          <li><h4 className={styles['mb-20']}>Order Summary</h4></li>
          <li>Price(2) items <span> {total_price + ' ' + currency}</span></li>
          <li>Delivery Charges <span>0 {currency}</span></li>
          <li>Coupon Discount <span>0 {currency}</span></li>
          <li>Taxes <span>0 {currency}</span></li>

          <li className={styles['mt-20']}><b>Total Amount <span>{total_price + ' ' + currency}</span></b></li>
        </ul>
      </div>
    </div>
  )
};

export default CartAndPaymentRightBar;

