import React, { Fragment } from 'react';
import { languageDefinations } from '../../../utils/lang/';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import SVGComponent from '../../common/SVGComponet';
import Blocker from '../../common/Blocker';
import CartStepper from './CartStepper';

import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Cart/cart');

const MiniCartBody = props => {
  const { showBlocker, increaseItemCnt, decreaseItemCnt, data, removeCartItem, editCartDetails, showCheckOutBtn, checkoutBtnHandler } = props;
  const { items, error, total_offer_price, currency } = data;
  const flag = data && items && items.length;
  const cnt = flag > 0 ? items.length : 0;
  const { CART_PAGE } = languageDefinations();

  return (
    <div>
      <div className={`${styles['cart-container']} ${styles['mini-cart']} ${styles['border-t']}`}>
        {
          showBlocker ? <Blocker /> : ''
        }
        <div>
          <h5 className={`${styles['mt-0']} ${styles['pb-15']} ${styles['fontW600']} ${styles['thick-gry-clr']} ${styles['mb-0']}`}>
            <span>{cnt + ' Items'}</span>
          </h5>
        </div>
        <div>
          {
            items.map((item, index) => {
              const { item_id, img,product_id, name, price, cur, quantity, max_limit, inventory, brand_name } = item;
              return (
                <div key={item_id} className={`${styles['flex']} ${styles['pt-15']} ${styles['pb-15']} ${styles['border-b']} ${styles['min-items-list']}`}>
                  <Col md={2} sm={2} xs={2} className={`${styles['pl-0']} ${styles['pr-0']}`}>
                    <div className={`${styles['cart-container-img']} ${styles['flex']} ${styles['justify-center']}`}>
                      <img className={styles['img']} src={img} />
                    </div>
                  </Col>
                  <Col md={10} sm={10} xs={10} className={`${styles['pr-0']} ${styles['card-details-labels']}`}>
                    <div className={`${styles['flx-space-bw']}`}>
                      <h6 className={`${styles['m-0']} ${styles['card-details-name']}`}>{name}</h6>
                      {
                        editCartDetails
                          ?
                          <span id={item_id} data-productid={product_id} onClick={removeCartItem} className={`${styles['flex']} ${styles['min-delete-icon']}`}>
                            <a className={styles['flex']}>
                              <SVGComponent clsName={`${styles['delete-icon']}`} src="icons/delete-icon/delete-icon" />
                            </a>
                          </span>
                          : null
                      }
                    </div>
                    <div className={`${styles['flx-space-bw']} ${styles['pt-10']} ${styles['price-stepper-part']}`}>
                      <span className={styles['fontW600']}>{price + ' ' + cur}</span>
                      <span>
                        {
                          editCartDetails ?
                            <CartStepper
                              item={item}
                              decreaseItemCnt={decreaseItemCnt}
                              increaseItemCnt={increaseItemCnt}
                            />
                            : ''
                        }
                      </span>
                    </div>
                  </Col>
                </div>
              )
            })
          }

        </div>
      </div>
      {
        cnt > 0 && showCheckOutBtn ?
          <div className={`${styles['p-20']} ${styles['instant-checkout-btn-part']}`}>
            <div className={`${styles['flx-spacebw-alignc']} ${styles['pb-10']}`}>
              <span className={styles['fontW600']}>Total Amount :</span><span className={`${styles['fs-16']} ${styles['fontW600']}`}> {total_offer_price + ' ' + currency}</span>
            </div>
            <button className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['fp-btn-large']} ${styles['fs-18']} ${styles['flex-center']} ${styles['justify-center']}`} onClick={checkoutBtnHandler}>
              <SVGComponent clsName={`${styles['secure-checkout']}`} src="icons/common-icon/secure-checkout" />
              <span className={styles['pl-5']}>{CART_PAGE.SECURE_CHECKOUT}</span>
            </button>
          </div>
          : null
      }
    </div>
  );
};

MiniCartBody.propTypes = {
  removeCartItem: PropTypes.func.isRequired,
  decreaseItemCnt: PropTypes.func.isRequired,
  increaseItemCnt: PropTypes.func.isRequired,
  showBlocker: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
};

MiniCartBody.defaultProps = {
  showCheckOutBtn: false
};

export default MiniCartBody;