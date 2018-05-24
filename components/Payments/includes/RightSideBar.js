import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import styles from '../payment.styl';

const RightSidebar = () => (
  <div className={styles['right-bar']}>
    <div className={`${styles['offer']} ${styles['p-5']}`}>
      Buy and Earn 300 points
    </div>
    <div className={styles['up-selling']}>
      Buy 50AED more and get 10% off on your total purchase.
    </div>
    <div className={`${styles['box']} ${styles['box-space']}`}>

      <div>
        <ul className={`${styles['m-0']} ${styles['p-0']}`}>
          <li><b>Order Summary</b></li>
          <li>Price(2) items <span>2455.00 AED</span></li>
          <li>Delivery Charges <span>10 AED</span></li>
          <li>Coupon Discount <span>60 AED</span></li>
          <li>Taxes <span>90 AED</span></li>

          <li className={styles['mt-10']}><b>Total Amount <span>2400.00 AED</span></b></li>

          <li><small> you saved 500 AED</small></li>
        </ul>

      </div>
    </div>
  </div>
);

export default RightSidebar;

