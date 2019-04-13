import React from 'react';
import { Row, Col, OverlayTrigger, Popover } from 'react-bootstrap';
import moment from 'moment';
import Cookie from 'universal-cookie';

import { Link } from '../../../routes'
import Warranty from '../../Product/includes/Warranty';
import CartStepper from './CartStepper';
import SVGComponent from '../../common/SVGComponet';
import { mergeCss } from '../../../utils/cssUtil';
import { languageDefinations } from '../../../utils/lang/';
import constants from '../../../constants';

const styles = mergeCss('components/Cart/cart');
const { CART_PAGE, ORDER_PAGE } = languageDefinations();

const cookies = new Cookie();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';


const popover = ({
  mrp, offer_price, total_amount, cur, selling_price, offerDiscounts, total_discount,
}) => {
  return (
    <Popover id="offer-popover">
      <div className={styles['fs-12']}>
        <div className={`${styles['table']} ${styles['width100']}`}>
          <div className={styles['t-row']}>
            <div className={`${styles['t-cell']} ${styles['pb-10']}`}>
              <div>{CART_PAGE.MAXIMUM_RETAIL_PRICE}</div>
              <div className={`${styles['fs-10']} ${styles['label-light-grey']}`}>({CART_PAGE.INCL_OF_ALL_TAXES})</div>
            </div>
            <div className={`${styles['t-cell']} ${styles['t-rt']}`}>
              {`${mrp} ${cur}`}
            </div>
          </div>
          <div className={styles['t-row']}>
            <div className={`${styles['t-cell']} ${styles['pb-10']}`}>
              <div>{CART_PAGE.SELLING_PRICE}</div>
            </div>
            <div className={`${styles['t-cell']} ${styles['t-rt']}`}>
              {`${selling_price} ${cur}`}
            </div>
          </div>
          {offerDiscounts.length > 0 &&
            offerDiscounts.map((od) => {
              return (
                <div className={styles['t-row']}>
                  <div className={`${styles['t-cell']} ${styles['pb-10']}`}>
                    <div>{od.description}</div>
                  </div>
                  <div className={`${styles['t-cell']} ${styles['t-rt']}`}>
                    {`${od.discount} ${cur}`}
                  </div>
                </div>
              );
            })
          }
          <div className={styles['t-row']}>
            <div className={`${styles['t-cell']} ${styles['pb-10']}`}>
              <div>{CART_PAGE.DELIVERY_CHARGES}</div>
            </div>
            <div className={`${styles['t-cell']} ${styles['t-rt']}`}>{ORDER_PAGE.FREE}</div>
          </div>
          <div className={`${styles['t-row']} ${styles['total-amount']}`}>
            <div className={styles['t-cell']}>{ORDER_PAGE.TOTAL}</div>
            <div className={`${styles['t-cell']} ${styles['t-rt']}`}>{total_amount} {cur}</div>
          </div>
        </div>
        <div className={`${styles['p-5']} ${styles['mt-5']} ${styles['overall-amount']}`}>{ORDER_PAGE.OVERALL_YOU_SAVE} {total_discount} {cur} {ORDER_PAGE.ON_THIS_PRODUCT}</div>
      </div>
    </Popover>
  );
};

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
      item_id, img, name, offer_price, cur, quantity, max_limit, inventory,
      brand_name, gift_info, shipping, warranty, total_amount,
      product_id, variant_id, itemType, catalogId, discount, mrp,
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
                <h3>{CART_PAGE.UH_OH}</h3>
                <p>
                  {CART_PAGE.ITEM_OUT_OF_STOCK_MESSAGE} <br /> {CART_PAGE.CONTINUE_TO_WISHLIST}
                </p>
              </div>
              : null
          }
          <Row>
            <Col md={2} sm={2} xs={3} className={`${styles['ipad-pr-0']} ${styles['m-pd-r-0']}`}>
              <div
                className={`${styles['flex-center']} ${styles['justify-center']} ${styles['pb-15']} ${styles['card-box-inn-img']}`}
              >
                <Link route={`/${country}/${language}/product?productId=${product_id}${variant_id ? `&variantId=${variant_id}` : ''}&catalogId=${catalogId}&itemType=${itemType}`}>
                  <a className={`${styles['width100']} ${styles['ht-100P']}`}>
                    <img className={styles.img} alt={img} src={`${constants.mediaDomain}/${img}`} />
                  </a>
                </Link>
              </div>
              <CartStepper
                count={count}
                item={item}
                decreaseItemCnt={decreaseItemCnt}
                increaseItemCnt={increaseItemCnt}
                cartStepperInputHandler={cartStepperInputHandler}
              />
            </Col>
            <Col md={10} sm={10} xs={9}>
              <Row>
                <Col md={12}>
                  <h5 className={`${styles['mt-0']} ${styles['mb-0']}`}>{brand_name}</h5>
                </Col>
                <Col md={10} sm={10} className={styles['landscape-cart-details']}>
                  <h4 className={`${styles['fontW600']} ${styles['m-fs-14']}`}>
                    <Link route={`/${country}/${language}/product?productId=${product_id}${variant_id ? `&variantId=${variant_id}` : ''}&catalogId=${catalogId}&itemType=${itemType}`}>
                      <a className={`${styles['width100']} ${styles['ht-100P']} ${styles['light-gry-clr']}`}>
                        {name}
                      </a>
                    </Link>
                  </h4>
                  <div className={`${styles['warranty-part']} ${styles['p-10']} ${styles['light-gry-clr']}`}>
                    {cartData.items ? <p className={`${styles['mb-0']} ${styles['fs-12']} ${styles['flex']}`}>
                      <span>{CART_PAGE.WARRENTY} : </span>
                      <span className={`${styles['pl-10']} ${styles['pr-10']}`}><Warranty warranty={cartData.items[index].warranty_duration} /></span>
                    </p>
                      : null}
                    <p className={`${styles['mb-0']} ${styles['fs-12']}`}>
                      <span>{CART_PAGE.SHIPPING} : </span>
                      <span className={`${styles['pl-10']} ${styles['pr-10']}`}>{CART_PAGE.REGULAR_SHIPPING}  ({shipping.shipping_fees + ' ' + cur}) - <span className={`${styles['fs-12']} ${styles['base-font']}`}>{CART_PAGE.ETA_DELIVERY_BY} {moment().add(shipping.shipping_days, 'days').format('LL')}</span>
                      </span>
                    </p>
                  </div>
                  <div data-id={item_id} className={`${styles['checkbox-material']} ${styles['mt-15']}`}>
                    <input data-id={item_id} id={"gift" + item_id} type="checkbox" checked={checked} onClick={this.giftChecked} />
                    <label htmlFor={"gift" + item_id}> {CART_PAGE.SEND_GIFT} {gift_info ? "(" + gift_info.gift_rate + " " + cur + ")" : ''} </label>
                  </div>
                  {checked && showMessage &&
                    <div>
                      <span className={styles.fontW600}>{CART_PAGE.MESSAGE}:&nbsp;</span><span>{gift_card_message}&nbsp;</span>
                      <span>{'('}<a onClick={this.toggleMessage}>{CART_PAGE.EDIT}</a>{')'}</span>
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
                        placeholder={CART_PAGE.GIFT_MESSAGE_OPTIONAL}
                        value={gift_card_message}
                        onChange={this.updateMsg}
                      />
                      <button
                        data-id={item_id}
                        className={`${styles['ml-5']} ${styles['bg-thick-blue']} ${styles['p-5']} ${styles['white-color']} ${styles['border-radius4']}`}
                        onClick={this.sendGiftPack}
                      >
                        {CART_PAGE.GIFT_PACK}
                    </button>
                    </div>}
                </Col>
                <Col md={2} sm={2} className={`${styles['pl-0']} ${styles['landscape-cart-price']}`}>
                  {Math.floor(discount) > 5 &&
                    <p className={`${styles['mb-0']} ${styles['fs-12']}`}>
                      <span className={styles['success-green']}>{`${Math.floor(discount)}% OFF`}</span>
                      <span className={`${styles['cross-strike']} ${styles.relative} ${styles['ml-10']}`}>
                        <span className={styles['label-light-grey']}>
                          <span>{mrp}&nbsp;</span>
                          <span>{cur}</span>
                        </span>
                      </span>
                    </p>}
                  <h4 className={`${styles.fontW600} ${styles['justify-flex-end']} ${styles['cart-price-label']} ${styles['light-gry-clr']} ${styles['flex-center']} ${styles['mt-10']} ${styles['t-rt']}`}>
                    {`${offer_price} ${cur}`}
                    <OverlayTrigger placement="bottom" overlay={popover(item)}>
                      {/* <span className={`${styles['fs-12']} ${styles['pr-5']}`}>
                        <SVGComponent clsName={`${styles['secure-icon']} ${styles['mr-10']} ${styles['pointer']}`} src="icons/common-icon/trust-secure" />
                      </span> */}
                      <span className={`${styles.question} ${styles['ml-5']} ${styles['flex-center']} ${styles['justify-center']} ${styles['default-shadow']} ${styles['fs-14']} ${styles.pointer}`}>  ? </span>
                    </OverlayTrigger>
                  </h4>
                  <p className={`${styles['t-rt']}`}>0.00 <span className={`${styles['fs-12']}`}>{cur}</span></p>
                  <p className={`${styles['t-rt']}`}>{shipping.shipping_fees} <span className={`${styles['fs-12']}`}>{cur}</span></p>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <div className={`${styles['cart-box-btm']} ${styles['flex']} ${styles['p-14-22']}`}>
          <Col md={9} sm={9} xs={9} className={`${styles['flex']} ${styles['m-pd-r-0']}`}>
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
          <Col md={3} sm={3} xs={3} className={`${styles['t-rt']} ${styles['pr-0']} ${styles['m-pad-5']}`}>
            <span>{ORDER_PAGE.TOTAL} : </span><span className={`${styles['fs-16']} ${styles['fontW600']}`}>{total_amount + ' ' + cur}</span>
          </Col>
        </div>

      </div>
    );
  }
}

export default CartItem;
