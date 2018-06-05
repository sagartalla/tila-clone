import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import RightBar from '../../common/CartAndPaymentRightBar';
import Blocker from '../../common/Blocker';

import styles from '../cart.styl';

const CartBody = props => {
  const { showBlocker, increaseItemCnt, decreaseItemCnt, data, removeCartItem, checkoutBtnHandler } = props;
  const { items, error } = data;
  const flag = data && items && items.length;
  const cnt = flag > 0 ? items.length : 0;
  return (
    <div className={styles['cart-container']}>
      {
        showBlocker ? <Blocker /> : ''
      }
      <Row>
        <Col md={12} sm={12} xs={12}>
          <h4 className={`${styles['mt-20']} ${styles['mb-20']} ${styles['fontW300']}}`}>
            {flag > 0 ? <span>{cnt} item{cnt > 1 ? 's' : ''} in cart</span> : <span>0 items in cart</span>}
          </h4>
        </Col>
      </Row>
      {
        flag > 0 ?
          <Row>
            <Col md={9} sm={12} xs={12} className={styles['pr-5']}>
              <div>
                {
                  items.map((item, index) => {
                    const { item_id, img, name, price, cur, quantity, max_limit, inventory, brand_name } = item;
                    return (
                      <div key={index} className={`${styles['mb-20']} ${styles['box']}`}>
                        <div className={`${styles['cart-box']} ${styles['p-22']}`}>
                          <Row>
                            <Col md={12}>
                              <span className={styles['error-msg']}>{error ? error : ''}</span>
                            </Col>
                            <Col md={2}>
                              <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['pb-15']}`}><img className={styles['img']} src={img} /></div>
                              <div className={`${styles['flex-center']} ${styles['justify-center']}`}>
                                {
                                  quantity == 1 ?
                                    <span className={`${styles['minus-disable']} ${styles['fs-20']} ${styles['flex-center']} ${styles['justify-center']}`}> - </span>
                                    : <span data-id={item_id} onClick={decreaseItemCnt} className={`${styles['minus']} ${styles['fs-20']} ${styles['flex-center']} ${styles['justify-center']} ${styles['pointer']}`}> - </span>
                                }
                                <span className={`${styles['quantity-title']} ${styles['border-radius2']}`}>{quantity}</span>
                                {
                                  max_limit == quantity ?
                                    <Fragment><span> X </span> <span>Max per order quantity of this item reached</span></Fragment>
                                    : <span data-id={item_id} onClick={increaseItemCnt} className={`${styles['plus']} ${styles['flex-center']} ${styles['justify-center']} ${styles['default-shadow']} ${styles['fs-18']} ${styles['pointer']}`}>  + </span>
                                }
                              </div>
                            </Col>
                            <Col md={10}>
                              <Row>
                                <Col md={12}>
                                  <h5 className={`${styles['mt-0']} ${styles['mb-0']}`}>{brand_name}</h5>
                                </Col>
                                <Col md={9}>
                                  <h4 className={`${styles['fontW600']} ${styles['light-gry-clr']}`}>{name}</h4>
                                </Col>
                                <Col md={3}>
                                  <h4 className={`${styles['fontW600']} ${styles['light-gry-clr']} ${styles['mt-15']} ${styles['t-c']}`}>{price + ' ' + cur}</h4>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </div>
                        <div className={`${styles['cart-box-btm']} ${styles['']} ${styles['p-14-22']}`}>
                          {
                            inventory <= 5 ?
                              <span className={`${styles['fontW600']} ${styles['thick-red']} ${styles['pr-20']}`}>Only {inventory} units left</span>
                              : ''
                          }
                          <span id={item_id} onClick={removeCartItem}>Remove</span>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </Col>
            <Col md={3} sm={12} xs={12}>
              <div className={`${styles['box']} ${styles['p-22']}`}>
                <div className={styles['t-c']}>
                  <button className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['fp-btn-large']} ${styles['fs-18']}`} onClick={checkoutBtnHandler}>Secure Checkout</button>
                </div>
                <div>
                  <RightBar
                    data={data}
                  />
                </div>
              </div>
            </Col>
          </Row>
          : null
      }
    </div>
  );
};

CartBody.propTypes = {
  checkoutBtnHandler: PropTypes.func.isRequired,
  removeCartItem: PropTypes.func.isRequired,
  decreaseItemCnt: PropTypes.func.isRequired,
  increaseItemCnt: PropTypes.func.isRequired,
  showBlocker: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
};

CartBody.defaultProps = {

};

export default CartBody;