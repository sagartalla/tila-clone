import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import Cookie from 'universal-cookie';

import CartItem from './CartItem';
import Blocker from '../../common/Blocker';
import RightBar from '../CartPaymentSideBar';
import Wishlist from '../../Cam/Wishlist';
import { languageDefinations } from '../../../utils/lang/';
import { cartPlaceHolder } from '../../common/Loader/skeletonPlaceHolder';

const cookies = new Cookie();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../cart_en.styl';
import styles_ar from '../cart_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};


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
}) => {
  const { items } = data;
  const flag = data && items && items.length;
  const cnt = flag > 0 ? items.length : 0;
  const { CART_PAGE } = languageDefinations();

  return (
    <>
    {
      isLoading ? cartPlaceHolder : null
    }
    <div className={styles['cart-container']}>
      {
        showBlocker ? <Blocker /> : ''
      }
      <Row>
        <Col md={12} sm={12} xs={12}>
          <h4 className={`${styles['mt-20']} ${styles['mb-20']} ${styles['fontW600']} ${styles['fs-20']} ${styles['light-gry-clr']}`}>
            { cnt===1 ? <span>{`${cnt} item`}</span> : cnt===0 ? <span>Your shopping cart is empty.</span> :<span>{`${cnt} ${CART_PAGE.ITEMS_IN_CART}`}</span> }
          </h4>
        </Col>
      </Row>
      <Row className={styles['mr-0']}>
        <Col md={9} sm={12} xs={12} className={styles['pr-5']}>
          <div>
            {
              items.map((item) => (
                <CartItem
                  key={item.item_id}
                  item={item}
                  count={count}
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
        {
          flag > 0
            ?
              <Col md={3} sm={12} xs={12} className={`${styles['pr-0']} ${styles['sidebar-position']}`}>
                <div className={`${styles['box']}`}>
                  <RightBar
                    data={data}
                    showInstant={true}
                    // isFromCart={true}
                    showCheckoutBtn={true}
                    checkoutBtnHandler={checkoutBtnHandler}
                    openSlider={openSlider}
                  />
                </div>
                {/*<div className={styles['secure-img']}>
                  <img className={styles['']} src={"/static/img/bg-img/group-cards.png"} />
                </div>*/}
              </Col>
            :
              null
        }
      </Row>
    </div>
    </>
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

export default CartBody;
