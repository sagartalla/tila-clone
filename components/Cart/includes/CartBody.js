import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import Warranty from '../../Product/includes/Warranty';
import CartStepper from './CartStepper';
import Blocker from '../../common/Blocker';
import SVGComponent from '../../common/SVGComponet';
import RightBar from '../../common/CartPaymentSideBar';
import Wishlist from '../../Cam/Wishlist/';
import { languageDefinations } from '../../../utils/lang/';
import { mergeCss } from '../../../utils/cssUtil';
import { Router } from '../../../routes';
import { cartPlaceHolder } from '../../common/Loader/skeletonPlaceHolder';

const styles = mergeCss('components/Cart/cart');

const CartBody = ({
  showBlocker,
  increaseItemCnt,
  decreaseItemCnt,
  data,
  removeCartItem,
  checkoutBtnHandler,
  addToWishlist,
  addOrRemoveGift,
  cartStepperInputHandler,
  count,
  isLoading,
  cartData,
}) => {
  const { items, error } = data;
  const flag = data && items && items.length;
  const cnt = flag > 0 ? items.length : 0;
  const { CART_PAGE } = languageDefinations();

  const routeChange = (variantId, productId, catalogId, itemType) => {
    Router.pushRoute(`/product?productId=${productId}${variantId ? `&variantId=${variantId}` : ''}&catalogId=${catalogId}&itemType=${itemType}`);
  }

  return (isLoading ?
    cartPlaceHolder
    :
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
                    const {
                      item_id, img, name, price, cur, quantity, max_limit, inventory,
                      brand_name, gift_info, shipping, warranty, total_amount,
                      product_id, variant_id, itemType, catalogId
                    } = item;
                    return (
                      <div key={item_id} className={`${styles['mb-20']} ${styles['box']}`}>
                        {
                          max_limit == quantity ?
                            <div className={`${styles['p-10-22']} ${styles['alrt-message-bg']} ${styles['light-gry-clr']} ${styles['alrt-message-part']} ${styles['thick-border-btm']}`}><span>{CART_PAGE.MAX_PER_ORDER}</span></div>
                            : ""
                        }
                        <div className={`${styles['cart-box']} ${styles['p-20']}`}>
                          {
                            inventory <= 0 ?
                              <div className={`${styles['out-of-stock']} ${styles['text-center']} ${styles['absolute']} ${styles['bg-white']}`}>
                                <h3>uh-oh!</h3>
                                <p>
                                  {CART_PAGE.ITEM_OUT_OF_STOCK_MESSAGE} <br /> {CART_PAGE.CONTINUE_TO_WISHLIST}
                                </p>
                              </div>
                              : null
                          }

                          <Row>
                            <Col md={2} sm={2} className={styles['ipad-pr-0']}>
                              <div
                                className={`${styles['flex-center']} ${styles['justify-center']} ${styles['pb-15']} ${styles['card-box-inn-img']}`}
                                onClick={() => routeChange(variant_id, product_id, catalogId, itemType)}
                              >
                                <img className={styles['img']} src={img} />
                              </div>
                              <CartStepper
                                count={count}
                                item={item}
                                decreaseItemCnt={decreaseItemCnt}
                                increaseItemCnt={increaseItemCnt}
                                cartStepperInputHandler={cartStepperInputHandler}
                              />
                            </Col>
                            <Col md={10} sm={10}>
                              <Row>
                                <Col md={12}>
                                  <h5 className={`${styles['mt-0']} ${styles['mb-0']}`}>{brand_name}</h5>
                                </Col>
                                <Col md={10} sm={10} className={styles['landscape-cart-details']}>
                                  <h4 className={`${styles['fontW600']} ${styles['light-gry-clr']}`}>
                                    <a onClick={() => routeChange(variant_id, product_id, catalogId, itemType)}>{name}</a>
                                  </h4>
                                  <div className={`${styles['warranty-part']} ${styles['p-10']} ${styles['light-gry-clr']}`}>
                                    <div className={`${styles['flx-spacebw-alignc']} ${styles['fontW600']} ${styles['p-5']} ${styles['fs-12']} ${styles['warrenty-part']}`}>
                                      {cartData.items ? <Warranty warranty={cartData.items[index].warranty_duration} /> : null}
                                    </div>
                                    <p className={`${styles['mb-0']} ${styles['fs-12']}`}>
                                      <span>{CART_PAGE.SHIPPING} : </span>
                                      <span className={`${styles['pl-10']} ${styles['pr-10']}`}>{CART_PAGE.REGULAR_SHIPPING}  ({shipping.shipping_fees + ' ' + cur}) - <span className={`${styles['fs-12']} ${styles['base-font']}`}>{CART_PAGE.ETA_DELIVERY_BY} {moment().add(shipping.shipping_days, 'days').format('LL')}</span>
                                      </span><a href="" className={`${styles['fontW600']}`}> {CART_PAGE.VIEW_MORE}</a>
                                    </p>
                                  </div>
                                  <div data-id={item_id} className={`${styles['checkbox-material']} ${styles['mt-15']}`}>
                                    <input data-id={item_id} id={"gift" + item_id} type="checkbox" checked={gift_info ? true : false} onClick={addOrRemoveGift} />
                                    <label htmlFor={"gift" + item_id}> {CART_PAGE.SEND_GIFT} {gift_info ? "(" + gift_info.gift_rate + " " + cur + ")" : ''} </label>
                                  </div>
                                </Col>
                                <Col md={2} sm={2} className={`${styles['pl-0']} ${styles['landscape-cart-price']}`}>
                                  <h4 className={`${styles['fontW600']} ${styles['light-gry-clr']} ${styles['mt-15']} ${styles['t-rt']}`}>{price + ' ' + cur}</h4>
                                  <p className={`${styles['t-rt']}`}>0.00 <span className={`${styles['fs-12']}`}>{cur}</span></p>
                                  <p className={`${styles['t-rt']}`}>{shipping.shipping_fees} <span className={`${styles['fs-12']}`}>{cur}</span></p>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </div>
                        <div className={`${styles['cart-box-btm']} ${styles['flex']} ${styles['p-14-22']}`}>
                          <Col md={9} sm={9} className={styles['flex']}>
                            <span className={styles['width21']}>
                              {
                                inventory <= 10 && inventory != 0 ?
                                  <span className={`${styles['fontW600']} ${styles['thick-red']} ${styles['pr-20']}`}>{CART_PAGE.ONLY + ' ' + inventory + ' ' + CART_PAGE.UNITS_LEFT} </span>
                                  : ''
                              }
                              {
                                inventory <= 0 ?
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
                          <Col md={3} sm={3} className={`${styles['t-rt']} ${styles['pr-0']}`}>
                            <span>Total : </span><span className={`${styles['fs-16']} ${styles['fontW600']}`}>{total_amount + ' ' + cur}</span>
                          </Col>
                        </div>

                      </div>
                    )
                  })
                }

                <Wishlist cartMiniWishList={true} />
              </div>

            </Col>
            <Col md={3} sm={12} xs={12} className={styles['pr-0']}>
              <div className={`${styles['box']}`}>
                <RightBar
                  data={data}
                  showInstant={true}
                  showCheckoutBtn={true}
                  checkoutBtnHandler={checkoutBtnHandler}
                />
              </div>
              <div className={styles['secure-img']}>
                <img className={styles['']} src={"/static/img/bg-img/group-cards.png"} />
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
  cartStepperInputHandler: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default CartBody