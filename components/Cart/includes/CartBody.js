import React, { Component } from 'react';
import { languageDefinations } from '../../../utils/lang/';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';
import RightBar from '../../common/CartAndPaymentRightBar';
import Blocker from '../../common/Blocker';
import SVGComponent from '../../common/SVGComponet';
import CartStepper from './CartStepper';

import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Cart/cart');

const CartBody = props => {
  const { showBlocker, increaseItemCnt, decreaseItemCnt, data, removeCartItem, checkoutBtnHandler, addToWishlist, addOrRemoveGift } = props;
  const { items, error } = data;
  const flag = data && items && items.length;
  const cnt = flag > 0 ? items.length : 0;
  const { CART_PAGE } = languageDefinations();
  const wishlistImgPath = "https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/catalog/mobile/PMOBNTDOUQWWQOLDLP/GALLERY/MEDIA3STP9XJBH3D2W7EQD2TQKU/apple-iphone-6s-na-original-imaebymaz5exfapw.jpeg"
  return (
    <div className={styles['cart-container']}>
      {
        showBlocker ? <Blocker /> : ''
      }
      <Row>
        <Col md={12} sm={12} xs={12}>
          <h4 className={`${styles['mt-20']} ${styles['mb-20']} ${styles['fontW300']} ${styles['fs-20']} ${styles['light-gry-clr']} ${styles['text-capitalize']}`}>
            <span>{cnt + ' ' + CART_PAGE.ITEMS_IN_CART}</span>
          </h4>
        </Col>
      </Row>
      {
        flag > 0 ?
          <Row className={styles['mr-0']}>
            <Col md={9} sm={12} xs={12} className={styles['pr-5']}>
              <div>
                {
                  items.map((item, index) => {
                    const { item_id, img, name, price, cur, quantity, max_limit, inventory, brand_name, gift_info, shipping, warranty } = item;
                    return (
                      <div key={item_id} className={`${styles['mb-20']} ${styles['box']}`}>
                        {
                          max_limit == quantity ?
                            <div className={`${styles['p-10-22']} ${styles['alrt-message-bg']} ${styles['light-gry-clr']} ${styles['alrt-message-part']} ${styles['thick-border-btm']}`}><span>{CART_PAGE.MAX_PER_ORDER}</span></div>
                            : ""
                        }
                        <div className={`${styles['cart-box']} ${styles['p-20']}`}>
                          <Row>
                            <Col md={2}>
                              <div className={`${styles['flex-center']} ${styles['justify-center']} ${styles['pb-15']} ${styles['card-box-inn-img']}`}><img className={styles['img']} src={img} /></div>
                              <CartStepper
                                item={item}
                                decreaseItemCnt={decreaseItemCnt}
                                increaseItemCnt={increaseItemCnt}
                              />
                            </Col>
                            <Col md={10}>
                              <Row>
                                <Col md={12}>
                                  <h5 className={`${styles['mt-0']} ${styles['mb-0']}`}>{brand_name}</h5>
                                </Col>
                                <Col md={10}>
                                  <h4 className={`${styles['fontW600']} ${styles['light-gry-clr']}`}>{name}</h4>
                                  <div className={`${styles['warranty-part']} ${styles['p-10']} ${styles['light-gry-clr']}`}>
                                    <p className={`${styles['fs-12']}`}><span>{CART_PAGE.WARRENTY} : </span><span className={`${styles['pl-10']} ${styles['pr-10']}`}>{warranty[0].duration} {CART_PAGE.WARRENTY_TXT} </span><a href="" className={`${styles['fontW600']}`}>{CART_PAGE.VIEW_MORE}</a></p>
                                    <p className={`${styles['mb-0']} ${styles['fs-12']}`}>
                                      <span>{CART_PAGE.SHIPPING} : </span>
                                      <span className={`${styles['pl-10']} ${styles['pr-10']}`}>{CART_PAGE.REGULAR_SHIPPING}  ({shipping.shipping_fees + ' ' + cur}) - <span className={`${styles['fs-12']} ${styles['base-font']}`}>{CART_PAGE.ETA_DELIVERY_BY} {moment().add(shipping.shipping_days, 'days').format('LL')}</span>
                                      </span><a href="" className={`${styles['fontW600']}`}> {CART_PAGE.VIEW_MORE}</a>
                                    </p>
                                  </div>
                                  <div data-id={item_id} className={`${styles['checkbox-material']} ${styles['mt-15']}`} onClick={addOrRemoveGift}>
                                    <input id={"gift" + item_id} type="checkbox" checked={gift_info ? true : false} />
                                    <label htmlFor={"gift" + item_id}> {CART_PAGE.SEND_GIFT} {gift_info ? "(" + gift_info.gift_rate + " " + cur + ")" : ''} </label>
                                  </div>
                                </Col>
                                <Col md={2} className={`${styles['pl-0']}`}>
                                  <h4 className={`${styles['fontW600']} ${styles['light-gry-clr']} ${styles['mt-15']} ${styles['t-rt']}`}>{price + ' ' + cur}</h4>
                                  <p className={`${styles['t-rt']}`}>0.00 <span className={`${styles['fs-12']}`}>SAR</span></p>
                                  <p className={`${styles['t-rt']}`}>{shipping.shipping_fees} <span className={`${styles['fs-12']}`}>{cur}</span></p>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </div>
                        <div className={`${styles['cart-box-btm']} ${styles['flex']} ${styles['p-14-22']}`}>
                          <Col md={9} className={styles['flex']}>
                            <span className={styles['width21']}>
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
                            <span data-id={item_id} onClick={addToWishlist} className={`${styles['flex-center']} ${styles['move-to-wishlist']} ${styles['pr-20']} ${styles['pointer']}`}>
                              <SVGComponent clsName={`${styles['wish-list-icon']}`} src="icons/wish-list/wish-list-icon" />
                              <span className={styles['pl-10']}>{CART_PAGE.MOVE_TO_WISHLIST}</span>
                            </span>
                            <span id={item_id} onClick={removeCartItem} className={`${styles['flex-center']} ${styles['cart-remove-icon']} ${styles['pl-20']} ${styles['pointer']}`}>
                              <SVGComponent clsName={`${styles['delete-icon']}`} src="icons/delete-icon/delete-icon" />
                              <span className={styles['pl-10']}>{CART_PAGE.REMOVE}</span>
                            </span>
                          </Col>
                          <Col md={3} className={`${styles['t-rt']} ${styles['pr-0']}`}>
                            <span>Total : </span><span className={`${styles['fs-16']} ${styles['fontW600']}`}>{price + ' ' + cur}</span>
                          </Col>
                        </div>

                      </div>
                    )
                  })
                }
                <div className={`${styles['view-wishlist-main']} ${styles['box']} ${styles['p-20']} ${styles['flex-center']}`}>
                  <Col md={4}>
                    <span className={styles['fs-12']}>10 out of 8 Items on your wishlist are available now to purchase. <a> 3 items are on Offers</a></span>
                  </Col>
                  <Col md={6}>
                    {
                      [...Array(6).keys()].map(() => {
                        return (
                          <span className={`${styles['wishlist-img']} ${styles['mr-15']}`}><img src={wishlistImgPath} /></span>
                        )
                      })
                    }
                  </Col>
                  <Col md={2} className={`${styles['pl-0']} ${styles['pr-0']} ${styles['flex']} ${styles['view-btn-list']}`}>
                    <a className={`${styles['fp-btn']} ${styles['fp-btn-default']} ${styles['text-uppercase']} ${styles['default-small']}`}>View Wishlist</a>
                  </Col>
                </div>
              </div>

            </Col>
            <Col md={3} sm={12} xs={12} className={styles['pr-0']}>
              <div className={`${styles['box']}`}>
                <RightBar
                  data={data}
                  showCheckoutBtn={true}
                  checkoutBtnHandler={checkoutBtnHandler}
                />
              </div>
              <div className={styles['secure-img']}>
                <img className={styles['']} src={"/static/img/bg-img/group-cards.png"}/>
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