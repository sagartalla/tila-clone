import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import styles from '../payment.styl';

const RightSidebar = () => (
  <div className={`${styles['right-bar']} ${styles['box']} ${styles['box-space']}`}>
    {/*<div className={`${styles['offer']} ${styles['p-5']}`}>
      Buy and Earn 300 points
    </div>
     <div className={styles['up-selling']}>
      Buy 50AED more and get 10% off on your total purchase.
    </div> */}
    <div>
      <ul className={`${styles['m-0']} ${styles['p-0']}`}>
        <li><h4 className={styles['mb-20']}>Order Summary</h4></li>
        <li>Price(2) items <span>2455.00 AED</span></li>
        <li>Delivery Charges <span>10 AED</span></li>
        <li>Coupon Discount <span>60 AED</span></li>
        <li>Taxes <span>90 AED</span></li>

        <li className={styles['mt-20']}><b>Total Amount <span>2400.00 AED</span></b></li>

        {/* <li><small> you saved 500 AED</small></li> */}
      </ul>
    </div>
  </div>
);

export default RightSidebar;

