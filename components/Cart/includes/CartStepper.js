import React, { Component } from 'react';
import { languageDefinations } from '../../../utils/lang/';
import PropTypes from 'prop-types';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../cart_en.styl';
import styles_ar from '../cart_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const CartStepper = props => {
  const { item, decreaseItemCnt, increaseItemCnt, count, data_scrollId } = props;
  const { item_id, quantity, max_limit, inventory,product_id } = item;
  const { CART_PAGE } = languageDefinations();

  return (
    <div className={styles['cart-stepper']}>
      {
        inventory > 0 ?
          <div className={`${styles['flex-center']} ${styles['justify-center']}`}>
            {
              quantity == 1 ?
                <span className={`${styles['minus-disable']} ${styles['fs-20']} ${styles['flex-center']} ${styles['justify-center']}`}> - </span>
                : <span data-id={item_id} data-productid={product_id} data_scrollId="cart-container" onClick={decreaseItemCnt} className={`${styles['minus']} ${styles['fs-20']} ${styles['flex-center']} ${styles['justify-center']} ${styles['pointer']}`}> - </span>
            }
            {/* <span className={`${styles['quantity-title']} ${styles['border-radius2']}`}>{quantity}</span> */}
            <input type="text" data-id={item_id} className={`${styles['quantity-title']} ${styles['border-radius2']} ${styles['text-center']}`} value={count || quantity} readOnly />
            {
              max_limit == quantity ?
                <span className={`${styles['minus-disable']} ${styles['fs-20']} ${styles['flex-center']} ${styles['justify-center']}`}> + </span>
                : <span data-id={item_id} data-productid={product_id} data_scrollId="cart-container" onClick={increaseItemCnt} className={`${styles['plus']} ${styles['flex-center']} ${styles['justify-center']} ${styles['default-shadow']} ${styles['fs-18']} ${styles['pointer']}`}>  + </span>
            }
          </div>
          : ''
      }
    </div>
  );
};

CartStepper.propTypes = {
  decreaseItemCnt: PropTypes.func.isRequired,
  increaseItemCnt: PropTypes.func.isRequired,
};

CartStepper.defaultProps = {

};

export default CartStepper;
