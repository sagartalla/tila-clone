import React from 'react';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';
import Warranty from '../../Product/includes/Warranty';
import CartStepper from './CartStepper';
import SVGComponent from '../../common/SVGComponet';
import { mergeCss } from '../../../utils/cssUtil';
import { languageDefinations } from '../../../utils/lang/';

const styles = mergeCss('components/Cart/cart');
const { CART_PAGE } = languageDefinations();

class CartItem extends React.Component {
  constructor(props) {
    super(props);
    const { gift_info } = props.item;
    this.state = {
      gift_card_message: gift_info ? gift_info.gift_card_message : '',
      checked: gift_info ? true : false,
      showMessage: true,
    };
  }

  giftChecked = ({ currentTarget }) => {
    const { addOrRemoveGift } = this.props;
    let { showMessage } = this.state;
    if (!currentTarget.checked) {
      addOrRemoveGift(currentTarget.getAttribute('data-id'), 'remove');
    } else showMessage = false;
    this.setState({
      checked: currentTarget.checked,
      showMessage,
    });
  }

  toggleMessage = () => {
    this.setState({
      showMessage: false,
    });
  }

  updateMsg = ({ target }) => {
    this.setState({
      gift_card_message: target.value,
    });
  }

  sendGiftPack = ({ target }) => {
    const { addOrRemoveGift } = this.props;
    const { gift_card_message } = this.state;
    addOrRemoveGift(target.getAttribute('data-id'), 'add', {
      gift_card_message,
    });
  }

  render() {
    const {
      item,
      count,
      routeChange,
      increaseItemCnt,
      decreaseItemCnt,
      addToWishlist,
      removeCartItem,
      cartStepperInputHandler,
      addOrRemoveGift,
      cartData,
      index,
    } = this.props;
    const { gift_card_message, checked, showMessage } = this.state;
    const {
      item_id, img, name, price, cur, quantity, max_limit, inventory,
      brand_name, gift_info, shipping, warranty, total_amount,
      product_id, variant_id, itemType, catalogId,
    } = item;
    return (
      <div key={item_id} className={`${styles['mb-20']} ${styles['box']}`}>
        {
          max_limit == quantity ?
            <div className={`${styles['p-10-22']} ${styles['alrt-message-bg']} ${styles['light-gry-clr']} ${styles['alrt-message-part']} ${styles['thick-border-btm']}`}><span>{CART_PAGE.MAX_PER_ORDER}</span></div>
            : ''
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
                <img className={styles.img} alt={img} src={img} />
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
                    <input data-id={item_id} id={"gift" + item_id} type="checkbox" checked={checked} onClick={this.giftChecked} />
                    <label htmlFor={"gift" + item_id}> {CART_PAGE.SEND_GIFT} {gift_info ? "(" + gift_info.gift_rate + " " + cur + ")" : ''} </label>
                  </div>
                  {checked && showMessage &&
                    <div>
                      <span className={styles.fontW600}>Message:&nbsp;</span><span>{gift_card_message}&nbsp;</span>
                      <span>{'('}<a onClick={this.toggleMessage}>edit</a>{')'}</span>
                    </div>
                  }
                  {!showMessage && checked &&
                  <div className={styles['flex-center']}>
                    <textarea
                      name="msg"
                      id={item_id}
                      cols="30"
                      rows="2"
                      className={styles['resize-none']}
                      placeholder="Gift Message (optional)"
                      value={gift_card_message}
                      onChange={this.updateMsg}
                    />
                    <button
                      data-id={item_id}
                      className={`${styles['ml-5']} ${styles['bg-thick-blue']} ${styles['p-5']} ${styles['white-color']} ${styles['border-radius4']}`}
                      onClick={this.sendGiftPack}
                    >
                      Gift Pack
                    </button>
                  </div>}
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
    );
  }
}

export default CartItem;
