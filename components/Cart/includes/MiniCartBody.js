import React, { Fragment } from 'react';
import { languageDefinations } from '../../../utils/lang/';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import Cookies from 'universal-cookie';

import { Link } from '../../../routes';
import SVGComponent from '../../common/SVGComponet';
import Blocker from '../../common/Blocker';
import CartStepper from './CartStepper';
import constants from '../../../constants';

const cookies = new Cookies();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../cart_en.styl';
import styles_ar from '../cart_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const MiniCartBody = (props) => {
  const { showBlocker, increaseItemCnt, decreaseItemCnt, data, removeCartItem, editCartDetails, showCheckOutBtn, checkoutBtnHandler } = props;
  const { items, error, total_offer_price, currency } = data;
  const flag = data && items && items.length;
  const cnt = flag > 0 ? items.length : 0;
  const { CART_PAGE, DELIVERY_ADDR_PAGE } = languageDefinations();
  if(data.ui.loading) {
    return <div className={`${styles['p-15']} ${styles['fontW600']} ${styles['thick-gry-clr']} ${styles['mb-0']}`}>Please Wait Fetching Cart Items</div>
  }
  return (
    <div>
      <div className={`${styles['cart-container']} ${styles['mini-cart']} ${styles['border-t']}`}>
        {
          showBlocker ? <Blocker /> : ''
        }
        <div>
          <h5 className={`${styles['mt-0']} ${styles['pb-15']} ${styles['fontW600']} ${styles['thick-gry-clr']} ${styles['mb-0']}`}>
            <span>{CART_PAGE.MY_CART} {'('}{cnt}{')'}</span>
          </h5>
        </div>
        <div>
          {
            items.map((item, index) => {
              const { item_id, img, product_id, name, offer_price, cur,
                variant_id='', catalogId: catalog_id, shipping, listing_id, tuin_id } = item;
              return (
                <div key={item_id} className={`${styles['flex']} ${styles['pt-15']} ${styles['pb-15']} ${styles['border-b']} ${styles['min-items-list']}`}>
                  <Col md={2} sm={2} xs={2} className={`${styles['pl-0']} ${styles['pr-0']}`}>
                    <div className={`${styles['cart-container-img']} ${styles['flex']} ${styles['justify-center']}`}>
                    <Link route={`/${language}/pdp/${name && name.replace(/\//g, '').split(' ').join('-').toLowerCase()}/${tuin_id ? `${tuin_id}/`: '' }${listing_id ? `${listing_id}`: ''}?pid=${product_id}&vid=${variant_id}&cid=${catalog_id}`}>
                        <a className={`${styles['width100']} ${styles['ht-100P']} ${styles['light-gry-clr']}`}>
                          <img className={styles['img']} src={`${constants.mediaDomain}/${img}`} />
                        </a>
                      </Link>
                    </div>
                  </Col>
                  <Col md={10} sm={10} xs={10} className={`${styles['pr-0']} ${styles['card-details-labels']}`}>
                    <div className={`${styles['flx-space-bw']}`}>
                      <h6 className={`${styles['m-0']} ${styles['card-details-name']}`}>
                      <Link route={`/${language}/pdp/${name && name.replace(/\//g, '').split(' ').join('-').toLowerCase()}/${tuin_id ? `${tuin_id}/`: '' }${listing_id ? `${listing_id}`: ''}?pid=${product_id}&vid=${variant_id}&cid=${catalog_id}`}>
                          <a className={`${styles['width100']} ${styles['ht-100P']} ${styles['light-gry-clr']}`}>
                            {name}
                          </a>
                        </Link>
                      </h6>
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
                    {(shipping === null || (shipping !== null && shipping.shippable)) ?
                      <div className={`${styles['flx-space-bw']} ${styles['pt-10']} ${styles['price-stepper-part']}`}>
                        <span className={styles['fontW600']}>{offer_price + ' ' + cur}</span>
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
                    :
                      <div className={`${styles['mt-20']} ${styles['fs-12']}`}>
                        <div className={`${styles['not-shippable']} ${styles.flex} ${styles['flex-colum']} ${styles['mb-20']} ${styles['p-10']}`}>
                          <Col md={12} sm={12} xs={12} className={`${styles['thick-red-clr']} ${styles.fontW600} ${styles['p-0']} ${styles['not-shipping-font']}`}>{DELIVERY_ADDR_PAGE.NOT_SHIPPABLE}</Col>
                          <Col md={12} sm={12} xs={12} className={`${styles['fs-12']} ${styles['p-0']}`}>{CART_PAGE.CANNOT_DELIVER}</Col>
                        </div>
                      </div>
                    }
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
              <span className={styles['fontW600']}>{CART_PAGE.TOTAL_AMOUNT} :</span><span className={`${styles['fs-16']} ${styles['fontW600']}`}> {total_offer_price.display_value + ' ' + currency}</span>
            </div>
            <button className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['right-radius']} ${styles['fp-btn-large']} ${styles['fs-18']} ${styles['flex-center']} ${styles['justify-center']}`} onClick={checkoutBtnHandler}>
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
