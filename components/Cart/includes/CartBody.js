import React, { Component } from 'react';
import { languageDefinations } from '../../../utils/lang/';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import RightBar from '../../common/CartAndPaymentRightBar';
import Blocker from '../../common/Blocker';
import SVGCompoent from '../../common/SVGComponet';
// import styles from '../cart.styl';

import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Cart/cart');

const CartBody = props => {
  const { showBlocker, increaseItemCnt, decreaseItemCnt, data, removeCartItem, checkoutBtnHandler, addToWishlist } = props;
  const { items, error } = data;
  const flag = data && items && items.length;
  const cnt = flag > 0 ? items.length : 0;
  const { CART_PAGE } = languageDefinations();
  return (
    <div className={styles['cart-container']}>
      {
        showBlocker ? <Blocker /> : ''
      }
      <Row>
        <Col md={12} sm={12} xs={12}>
          <h4 className={`${styles['mt-20']} ${styles['mb-20']} ${styles['fontW300']} ${styles['fs-20']} ${styles['light-gry-clr']} ${styles['text-capitalize']}`}>
            {/* {flag > 0 ? <span>{cnt} item{cnt > 1 ? 's' : ''} in cart</span> : <span>0 {CART_PAGE.ITEMS_IN_CART}</span>} */}
            <span>{cnt + ' ' + CART_PAGE.ITEMS_IN_CART}</span>
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
                        {
                          max_limit == quantity ?
                            <div className={`${styles['p-10-22']} ${styles['alrt-message-bg']} ${styles['light-gry-clr']} ${styles['alrt-message-part']} ${styles['thick-border-btm']}`}><span>{CART_PAGE.MAX_PER_ORDER}</span></div>
                            : ""
                        }
                        <div className={`${styles['cart-box']} ${styles['p-20']}`}>
                          <Row>
                            <Col md={2}>
                              <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['pb-15']}`}><img className={styles['img']} src={img} /></div>
                              {
                               inventory > 0 ?
                                <div className={`${styles['flex-center']} ${styles['justify-center']}`}>
                                  {
                                    quantity == 1 ?
                                      <span className={`${styles['minus-disable']} ${styles['fs-20']} ${styles['flex-center']} ${styles['justify-center']}`}> - </span>
                                      : <span data-id={item_id} onClick={decreaseItemCnt} className={`${styles['minus']} ${styles['fs-20']} ${styles['flex-center']} ${styles['justify-center']} ${styles['pointer']}`}> - </span>
                                  }
                                  <span className={`${styles['quantity-title']} ${styles['border-radius2']}`}>{quantity}</span>
                                  {
                                    max_limit == quantity ?
                                      <span className={`${styles['minus-disable']} ${styles['fs-20']} ${styles['flex-center']} ${styles['justify-center']}`}> + </span>
                                      : <span data-id={item_id} onClick={increaseItemCnt} className={`${styles['plus']} ${styles['flex-center']} ${styles['justify-center']} ${styles['default-shadow']} ${styles['fs-18']} ${styles['pointer']}`}>  + </span>
                                  }
                                </div>
                              : '' 
                             }
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
                        <div className={`${styles['cart-box-btm']} ${styles['flex']} ${styles['p-14-22']}`}>
                          <span className={styles['width16']}>
                            {
                              inventory <= 10 && inventory != 0 ?
                                <span className={`${styles['fontW600']} ${styles['thick-red']} ${styles['pr-20']}`}>{CART_PAGE.ONLY + ' ' + inventory + ' ' + CART_PAGE.UNITS_LEFT} </span>
                                : ''
                            }
                            {
                              inventory == 0 ?
                                <span className={`${styles['fontW600']} ${styles['thick-red']} ${styles['pr-20']}`}>{CART_PAGE.OUT_OF_STOCK} </span>
                                : ''
                            }
                          </span>
                          <span data-id={item_id} onClick={addToWishlist} className={`${styles['flex-center']} ${styles['mve-to-wishlist']} ${styles['pr-20']} ${styles['pointer']}`}>
                            <SVGCompoent clsName={`${styles['wish-list-icon']}`} src="icons/wish-list/wish-list-icon" />
                            <span className={styles['pl-10']}>Move to Wishlist</span>
                          </span>
                          <span id={item_id} onClick={removeCartItem} className={`${styles['flex-center']} ${styles['cart-remove-icon']} ${styles['pl-20']} ${styles['pointer']}`}>
                            <SVGCompoent clsName={`${styles['delete-icon']}`} src="icons/delete-icon/delete-icon" />
                            <span className={styles['pl-10']}>{CART_PAGE.REMOVE}</span>
                          </span>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </Col>
            <Col md={3} sm={12} xs={12}>
              <div className={`${styles['box']} ${styles['p-20']}`}>
                <div className={styles['t-c']}>
                  <button className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['fp-btn-large']} ${styles['fs-18']}`} onClick={checkoutBtnHandler}>{CART_PAGE.SECURE_CHECKOUT}</button>
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
  addToWishlist: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

CartBody.defaultProps = {

};

export default CartBody;