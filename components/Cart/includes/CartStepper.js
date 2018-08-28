import React, { Component } from 'react';
import { languageDefinations } from '../../../utils/lang/';
import PropTypes from 'prop-types';

import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Cart/cart');

const CartStepper = props => {
  const { item, decreaseItemCnt, increaseItemCnt, cartStepperInputHandler, count } = props;
  const { item_id, quantity, max_limit, inventory } = item;
  const { CART_PAGE } = languageDefinations();

  return (
    <div className={styles['cart-stepper']}>
      {
        inventory > 0 ?
          <div className={`${styles['flex-center']} ${styles['justify-center']}`}>
            {
              quantity == 1 ?
                <span className={`${styles['minus-disable']} ${styles['fs-20']} ${styles['flex-center']} ${styles['justify-center']}`}> - </span>
                : <span data-id={item_id} onClick={decreaseItemCnt} className={`${styles['minus']} ${styles['fs-20']} ${styles['flex-center']} ${styles['justify-center']} ${styles['pointer']}`}> - </span>
            }
            {/* <span className={`${styles['quantity-title']} ${styles['border-radius2']}`}>{quantity}</span> */}
            <input type="text" data-id={item_id} className={`${styles['quantity-title']} ${styles['border-radius2']} ${styles['text-center']}`} value={count || quantity} onChange={cartStepperInputHandler} />
            {
              max_limit == quantity ?
                <span className={`${styles['minus-disable']} ${styles['fs-20']} ${styles['flex-center']} ${styles['justify-center']}`}> + </span>
                : <span data-id={item_id} onClick={increaseItemCnt} className={`${styles['plus']} ${styles['flex-center']} ${styles['justify-center']} ${styles['default-shadow']} ${styles['fs-18']} ${styles['pointer']}`}>  + </span>
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