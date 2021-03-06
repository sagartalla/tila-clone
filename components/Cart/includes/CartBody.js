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
import SVGComponent from '../../common/SVGComponet';
const cookies = new Cookie();

const language = cookies.get('language') || 'ar';
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
  wishListCount,
}) => {
  const { items } = data;
  const flag = data && items && items.length;
  const cnt = flag > 0 ? items.length : 0;
  const { CART_PAGE, WISH_LIST_PAGE, PAYMENT_PAGE } = languageDefinations();
  if(data.ui.loading) {
    return <div className={`${styles['p-15']} ${styles['fontW600']} ${styles['thick-gry-clr']} ${styles['mb-0']}`}>{CART_PAGE.PLEASE_WAIT_FETCHING_CART_ITEMS}</div>
  }
  return (
    data.ui.loading ? <Blocker message={CART_PAGE.PLEASE_WAIT_FETCHING_CART_ITEMS}/> :
    <>
    <div className={styles['cart-container']}>
      {
        showBlocker ? <Blocker /> : ''
      }
      <Row>
        <Col md={12} sm={12} xs={12}>
          <h4 className={`${styles['mt-20']} ${styles['mb-20']} ${styles['fontW600']} ${styles['fs-20']} ${styles['light-gry-clr']}`}>
            {
              cnt===1 ? <span>{`${cnt} ${CART_PAGE.ITEM_IN_CART}`}</span> : cnt===0 ? <span>{CART_PAGE.YOUR_SHOPPING_CART_IS_EMPTY}</span> :<span>{`${cnt} ${CART_PAGE.ITEMS_IN_CART}`}</span> }
          </h4>
          {
            cnt === 0 ?
            <div className={`${styles.box} ${styles['mb-15']} ${styles['mr-5']}`}>
              <div className={`${styles['flex-center']} ${styles['flex-colum']} ${styles['p-40']}`}>
                <span className={`${styles['flex']} ${styles['no-cart-icon-svg']}`}><SVGComponent clsName={`${styles['no-cart-img']}`} src="icons/cart/no-cart-icon" /></span>
                <h4 className={`${styles['mb-5']} ${styles['fs-26']}`}>{CART_PAGE.MY_CART_EMPTY}</h4>
                <span className={`${styles['text-gry']} ${styles['mt-20']}`}>{CART_PAGE.DONT_WAIT}</span>
                <div className={`${styles['flex-center']} ${styles['mt-20']}`}>
                <div>
                  <a href={`/${language}`} className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['fp-btn-x-large']} ${styles['right-radius']} ${styles['text-uppercase']} ${styles.fontW600}`}>{WISH_LIST_PAGE.START_SHOPPING}</a>
                </div>
                {wishListCount > 0 &&
                <React.Fragment>
                <div className={`${styles['or-value']} ${styles['flex-center']} ${styles['justify-center']}`}>
                {PAYMENT_PAGE.OR}
                </div>
                <div>
                  <a href={`/${language}/customer/wishlist`} className={`${styles['fp-btn']} ${styles['add-from-wishlist']} ${styles['fp-btn-x-large']} ${styles['right-radius']} ${styles['text-uppercase']} ${styles.fontW600} `}>{CART_PAGE.ADD_FROM_WISHLIST}</a>
                </div>
                </React.Fragment>
                }
                </div>
              </div>
            </div>
            :
            null
          }
        </Col>
      </Row>
      <Row className={styles['mr-0']}>
        <Col md={items.length > 0 ? 9 : 12} sm={12} xs={12} className={styles['pr-5']}>
          <div>
            {items.map(item => (
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
            <Wishlist cartMiniWishList />
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
