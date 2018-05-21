import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import styles from '../payment.styl';

const RightSidebar = () => (
  <div className={styles['box']}>
    <div>Buy and Earn 300 points</div>
    <div>
      <p>
        Buy 50AED more and get 10% off on your total purchase.
      </p> 
    </div>
    <div>
      <ul>
        <li>Order Summary</li>
        <li>Price(2) items - 2455.00 AED</li>
        <li>Delivery Charges - 10 AED</li>
        <li>Coupon Discount - 60 AED</li>
        <li>Taxes - 90AED</li>
        <li>Total Amount 2400.00AED</li>
        <li><small> you saved 500 AED</small></li>
      </ul>

    </div>
  </div>
);

export default RightSidebar;

