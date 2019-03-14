import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import Cookie from 'universal-cookie';

import CartItem from './CartItem';
import Blocker from '../../common/Blocker';
import RightBar from '../CartPaymentSideBar';
import Wishlist from '../../Cam/Wishlist/';
import { languageDefinations } from '../../../utils/lang/';
import { mergeCss } from '../../../utils/cssUtil';
import { Router } from '../../../routes';
import { cartPlaceHolder } from '../../common/Loader/skeletonPlaceHolder';

const cookies = new Cookie();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

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
  openSlider,
  isError,
}) => {
  const { items, error } = data;
  const flag = data && items && items.length;
  const cnt = flag > 0 ? items.length : 0;
  const { CART_PAGE } = languageDefinations();

  const routeChange = (variantId, productId, catalogId, itemType) => {
    Router.pushRoute(`/${country}/${language}/product?productId=${productId}${variantId ? `&variantId=${variantId}` : ''}&catalogId=${catalogId}&itemType=${itemType}`);
  }

  return (
    isLoading ?
      cartPlaceHolder
          : 
    <div className={styles['cart-container']}>
      {
        showBlocker ? <Blocker /> : ''
      }
      <Row>
        <Col md={12} sm={12} xs={12}>
          <h4 className={`${styles['mt-20']} ${styles['mb-20']} ${styles['fontW300']} ${styles['fs-20']} ${styles['light-gry-clr']} ${styles['text-capitalize']}`}>
            <span>{`${cnt} ${CART_PAGE.ITEMS_IN_CART}`}</span>
          </h4>
        </Col>
      </Row>
      {
        flag > 0 ?
          <Row className={styles['mr-0']}>
            <Col md={9} sm={12} xs={12} className={styles['pr-5']}>
            
              <div>
                {
                  items.map(item => (
                    <CartItem
                      item={item}
                      count={count}
                      routeChange={routeChange}
                      increaseItemCnt={increaseItemCnt}
                      decreaseItemCnt={decreaseItemCnt}
                      addToWishlist={addToWishlist}
                      removeCartItem={removeCartItem}
                      cartStepperInputHandler={cartStepperInputHandler}
                      addOrRemoveGift={addOrRemoveGift}
                    />
                ))}

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
                  openSlider={openSlider}
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
