import React, { Component } from 'react';
import { languageDefinations } from '../../utils/lang/';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';

import styles from './rightBar.styl';

const CartAndPaymentRightBar = props => {
  const { total_price, total_offer_price, total_discount, total_shipping, tax, item_cnt, currency } = props.data;
  const { CART_PAGE } = languageDefinations();
  return (
    <div className={`${styles['right-bar']}`}>
      <div>
        <ul className={`${styles['m-0']} ${styles['p-0']}`}>
          <li><h5 className={`${styles['mb-15']} ${styles['mt-15']} ${styles['fs-16']} ${styles['fontW600']} ${styles['light-gry-clr']}`}>{CART_PAGE.ORDER_SUMMARY}</h5></li>
          {/* <li>Price ({item_cnt} item{item_cnt > 1 ? 's' : ''})<span> {total_price + ' ' + currency}</span></li> */}
          <li>{CART_PAGE.PRICE} ({item_cnt + ' ' + CART_PAGE.ITEMS})<span> {total_price + ' ' + currency}</span></li>
          <li>{CART_PAGE.DELIVERY_CHARGES} <span>{total_shipping} {currency}</span></li>
          <li>{CART_PAGE.DISCOUNT} <span>{total_discount} {currency}</span></li>
          {
            tax != 0 ? <li>{CART_PAGE.TAXES} <span>{currency}</span></li> : null
          }
          <li className={`${styles['mt-20']} ${styles['fs-16']} ${styles['light-gry-clr']}`}><b>{CART_PAGE.TOTAL_AMOUNT} <span>{total_offer_price + ' ' + currency}</span></b></li>
        </ul>
      </div>
    </div>
  )
};

CartAndPaymentRightBar.propTypes = {
  total_price: PropTypes.number,
  total_offer_price: PropTypes.number,
  total_discount: PropTypes.number,
  total_shipping: PropTypes.number,
  tax: PropTypes.number,
  item_cnt: PropTypes.number,
  currency: PropTypes.string,
};

CartAndPaymentRightBar.defaultProps = {

};

export default CartAndPaymentRightBar;

