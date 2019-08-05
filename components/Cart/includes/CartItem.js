import React from 'react';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';
import Cookie from 'universal-cookie';

import { Link } from '../../../routes';
import Warranty from '../../Product/includes/Warranty';
import CartStepper from './CartStepper';
import SVGComponent from '../../common/SVGComponet';
import { languageDefinations } from '../../../utils/lang/';
import constants from '../../../constants';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../cart_en.styl';
import styles_ar from '../cart_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const { PDP_PAGE, CART_PAGE, ORDER_PAGE, DELIVERY_ADDR_PAGE } = languageDefinations();

const cookies = new Cookie();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';


// const popover = ({
//   mrp, offer_price, total_amount, cur, selling_price, offerDiscounts, total_discount, shipping,
// }) => {
//   return (
//       <div className={`${styles['p-10']} ${styles['tool-tip']}`}>
//         <div className={`${styles['table']} ${styles['width100']}`}>
//           <div className={styles['t-row']}>
//             <div className={`${styles['t-cell']} ${styles['pb-10']}`}>
//               <div>{CART_PAGE.MAXIMUM_RETAIL_PRICE}</div>
//               <div className={`${styles['fs-10']} ${styles['label-light-grey']}`}>({CART_PAGE.INCL_OF_ALL_TAXES})</div>
//             </div>
//             <div className={`${styles['t-cell']} ${styles['t-rt']}`}>
//               {`${mrp} ${cur}`}
//             </div>
//           </div>
//           <div className={styles['t-row']}>
//             <div className={`${styles['t-cell']} ${styles['pb-10']}`}>
//               <div>{CART_PAGE.SELLING_PRICE}</div>
//             </div>
//             <div className={`${styles['t-cell']} ${styles['t-rt']}`}>
//               {`${selling_price} ${cur}`}
//             </div>
//           </div>
//           {offerDiscounts.length > 0 &&
//             offerDiscounts.map((od) => {
//               return (
//                 <div className={styles['t-row']}>
//                   <div className={`${styles['t-cell']} ${styles['pb-10']}`}>
//                     <div>{od.description}</div>
//                   </div>
//                   <div className={`${styles['t-cell']} ${styles['t-rt']}`}>
//                     {`${od.discount} ${cur}`}
//                   </div>
//                 </div>
//               );
//             })
//           }
//           {
//             shipping !== null ?
//               <div className={styles['t-row']}>
//                 <div className={`${styles['t-cell']} ${styles['pb-10']}`}>
//                   <div>{CART_PAGE.DELIVERY_CHARGES}</div>
//                 </div>
//                 <div className={`${styles['t-cell']} ${styles['t-rt']}`}>
//                   {shipping.shipping_fees ?
//                     `${shipping.shipping_fees} ${cur}`
//                     : <SVGComponent clsName={`${styles['ship-icon']}`} src="icons/free-shipping" />}
//                 </div>
//               </div>
//             :
//               null
//           }

//           <div className={`${styles['t-row']} ${styles['total-amount']}`}>
//             <div className={styles['t-cell']}>{ORDER_PAGE.TOTAL}</div>
//             <div className={`${styles['t-cell']} ${styles['t-rt']}`}>{total_amount} {cur}</div>
//           </div>
//         </div>
//         <div className={`${styles['p-5']} ${styles['mt-5']} ${styles['overall-amount']}`}>{CART_PAGE.OVERALL_YOU_SAVE} {total_discount} {cur} {CART_PAGE.ON_THIS_PRODUCT}</div>
//       </div>
//   );
// };

class CartItem extends React.Component {
  constructor(props) {
    super(props);
    const { gift_info } = props.item;
    this.state = {
      checked: gift_info ? true : false,
    };
  }

  giftChecked = ({ currentTarget }) => {
    const { addOrRemoveGift } = this.props;
    if (!currentTarget.checked) {
      addOrRemoveGift(currentTarget.getAttribute('data-id'), 'remove');
    } else {
      addOrRemoveGift(currentTarget.getAttribute('data-id'), 'add');
    }
    this.setState({
      checked: currentTarget.checked,
    });
  }

  render() {
    const {
      item,
      count,
      increaseItemCnt,
      decreaseItemCnt,
      addToWishlist,
      removeCartItem,
      cartStepperInputHandler,

    } = this.props;
    const { checked } = this.state;
    const {
      item_id, img, name, offer_price, cur, quantity, max_limit, inventory, offerDiscounts,
      brand_name, gift_info, shipping, warranty_duration, total_amount, total_discount, listing_id,
      product_id, variant_id, itemType, catalogId, discount, mrp, variantAttributes, selling_price,
    } = item;
    return (
      <div key={item_id} className={`${styles['mb-20']} ${styles.box}`}>
        {
          max_limit == quantity ?
            <div className={`${styles['p-10-22']} ${styles['alrt-message-bg']} ${styles['light-gry-clr']} ${styles['alrt-message-part']} ${styles['thick-border-btm']}`}><span>{CART_PAGE.MAX_PER_ORDER}</span></div>
            : ''
        }
        <div className={`${styles['cart-box']} ${styles['p-20']}`}>
          {
            inventory <= 0 ?
              <div className={`${styles['out-of-stock']} ${styles['text-center']} ${styles.absolute} ${styles['bg-white']}`}>
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
                <Link route={`/${language}/pdp/${name.replace(/\//g, '').split(' ').join('-').toLowerCase()}/c/${catalogId}/p/${product_id}/l/${listing_id}/v/${variant_id ? `${variant_id}` : ''}`}>
                  <a className={`${styles.width100} ${styles['ht-100P']}`}>
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
                <Col md={8} sm={8} className={`${styles['landscape-cart-details']} ${styles['pr-0']}`}>
                  <h4 className={`${styles.fontW600} ${styles['m-fs-14']} ${styles['fs-16']}`}>
                  <Link route={`/${language}/pdp/${name.replace(/\//g, '').split(' ').join('-').toLowerCase()}/c/${catalogId}/p/${product_id}/l/${listing_id}/v/${variant_id ? `${variant_id}` : ''}`}>
                      <a className={`${styles.width100} ${styles['ht-100P']} ${styles['light-gry-clr']}`}>
                        {name}
                      </a>
                    </Link>
                  </h4>
                  {variantAttributes.length > 0 &&
                    variantAttributes.map((attr, index) => (
                      <div className={`${styles['thick-gry-clr']} ${styles['fs-12']} ${styles['mb-15']}`} key={index}>
                        <span>{attr.display_string} : </span>
                        <span>{attr.attribute_values[0].value}</span>
                      </div>
                    ))}
                  <React.Fragment>
                    <div className={`${styles['warranty-part']} ${styles['p-10']} ${styles['black-color']}`}>
                      <div className={`${styles['mb-0']} ${styles.flex} ${styles['pb-5']}`}>
                        <span className={`${styles['thick-gry-clr']} ${styles['fs-12']}`}>Warranty : </span>
                        <span className={`${styles['pl-10']} ${styles['fs-15']} ${styles['pr-10']}`}>
                          {(warranty_duration && Object.keys(warranty_duration).length > 0) && warranty_duration.duration !== 0 ?
                            <Warranty warranty={warranty_duration} />
                            : 'No Warranty'}
                        </span>
                      </div>
                      {
                        shipping !== null && (shipping.shippable && (
                          <p className={`${styles['mb-0']}`}>
                            <span className={`${styles['thick-gry-clr']} ${styles['fs-12']}`}>{CART_PAGE.SHIPPING} :</span>
                            <span className={`${styles['pl-10']} ${styles['pr-10']} ${styles['fs-14']}`}>{CART_PAGE.REGULAR_SHIPPING} {shipping && shipping.shipping_fees && shipping.shipping_fees.display_value && shipping.shipping_fees.display_value ? `(${shipping.shipping_fees.display_value} ${cur})` : ''} - <span className={`${styles['fs-12']} ${styles['base-font']}`}>{CART_PAGE.ETA_DELIVERY_BY} {moment().add(shipping.shipping_days, 'days').format('LL')}</span>
                            </span>
                          </p>
                        ))
                      }
                    </div>
                    <div data-id={item_id} className={`${styles['checkbox-material']} ${styles['mt-15']}`}>
                      <input data-id={item_id} id={"gift" + item_id} type="checkbox" defaultChecked={checked} onClick={this.giftChecked} />
                      <label className={`${styles['fs-14']}`} htmlFor={"gift" + item_id}> {CART_PAGE.SEND_GIFT} {(gift_info && gift_info.gift_rate) ? "(" + gift_info.gift_rate + " " + cur + ")" : ''} </label>
                    </div>
                  </React.Fragment>
                  {
                    shipping !== null && (!shipping.shippable &&
                      (<div className={`${styles['mt-20']} ${styles['fs-12']}`}>
                        <div className={`${styles['not-shippable']} ${styles.flex} ${styles['mb-20']} ${styles['p-10']}`}>
                          <Col md={2} sm={3} xs={3} className={`${styles['thick-red-clr']} ${styles.fontW600} ${styles['p-0']} ${styles['not-shipping-font']}`}>{DELIVERY_ADDR_PAGE.NOT_SHIPPABLE}</Col>
                          <Col md={10} sm={9} xs={9} className={`${styles['fs-12']} ${styles['pr-0']}`}>{CART_PAGE.CANNOT_DELIVER}</Col>
                        </div>
                        {/* <p className={`${styles['mt-20']} ${styles['thick-red-clr']}`}>{CART_PAGE.CANNOT_DELIVER}</p> */}
                      </div>))
                  }
                </Col>
                <Col md={4} sm={4} className={`${styles['pr-5']} ${styles['landscape-cart-price']}`}>
                  {Math.floor(discount) > 5 &&
                    <p className={`${styles['mb-0']} ${styles['fs-12']} ${styles.flex} ${styles['justify-end']}`}>
                      <span className={styles['success-green']}>{`${Math.floor(discount)}% ${PDP_PAGE.OFF}`}</span>
                      <span className={`${styles['cross-strike']} ${styles.relative} ${styles['ml-5']}`}>
                        <span className={styles['label-light-grey']}>
                          <span>{mrp}&nbsp;</span>
                          <span>{cur}</span>
                        </span>
                      </span>
                    </p>}
                  <h4 className={`${styles.fontW600} ${styles['justify-flex-end']} ${styles['cart-price-label']} ${styles['fs-16']} ${styles['light-gry-clr']} ${styles['flex-center']} ${styles['mt-10']} ${styles['t-rt']}`}>
                    {`${offer_price} ${cur}`}
                    {/* <OverlayTrigger trigger="click" placement="bottom" overlay={popover(item)}> */}
                    {/* <span className={`${styles['fs-12']} ${styles['pr-5']}`}>
                        <SVGComponent clsName={`${styles['secure-icon']} ${styles['mr-10']} ${styles['pointer']}`} src="icons/common-icon/trust-secure" />
                      </span> */}
                    <div className={`${styles.relative} ${styles['cart-price-toltp']}`}>
                      <span
                        className={
                          `${styles.question}
                            ${styles['ml-5']}
                            ${styles['flex-center']}
                            ${styles['justify-center']}
                            ${styles['default-shadow']}
                            ${styles['fs-14']}
                            ${styles.pointer}
                            ${lang === 'en' ? '' : styles['flip-questionmark']}
                            `
                        }

                      >  ? </span>
                      <div className={`${styles['p-10']} ${styles['tool-tip']} ${styles['cart-tool-tip']}`}>
                        <div className={`${styles.table} ${styles.width100}`}>
                          <div className={`${styles['flx-space-bw']} ${styles['fs-12']}`}>
                            <div className={`${styles['pb-10']}`}>
                              <div className={styles['thick-gry-clr']}>{CART_PAGE.MAXIMUM_RETAIL_PRICE}</div>
                              <div className={`${styles['fs-10']} ${styles['label-light-grey']}`}>({CART_PAGE.INCL_OF_ALL_TAXES})</div>
                            </div>
                            <div className={`${styles['t-rt']}`}>
                              {`${mrp} ${cur}`}
                            </div>
                          </div>
                          <div className={`${styles['flx-space-bw']} ${styles['fs-12']}`}>
                            <div className={`${styles['pb-10']}`}>
                              <div className={styles['thick-gry-clr']}>{CART_PAGE.SELLING_PRICE}</div>
                            </div>
                            <div className={`${styles['t-rt']}`}>
                              {`${selling_price} ${cur}`}
                            </div>
                          </div>
                          {offerDiscounts.length > 0 &&
                            offerDiscounts.map((od) => {
                              return (
                                <div className={`${styles['flx-space-bw']} ${styles['fs-12']}`}>
                                  <div className={`${styles['pb-10']}`}>
                                    <div className={styles['thick-gry-clr']}>{od.description}</div>
                                  </div>
                                  <div className={`${styles['t-rt']}`}>
                                    {`${od.discount.display_value} ${cur}`}
                                  </div>
                                </div>
                              );
                            })
                          }
                          {
                            shipping !== null ?
                              <div className={`${styles['flx-space-bw']} ${styles['fs-12']}`}>
                                <div className={`${styles['pb-10']}`}>
                                  <div className={styles['thick-gry-clr']}>{CART_PAGE.DELIVERY_CHARGES}</div>
                                </div>
                                <div className={`${styles['t-rt']} ${styles.flex}`}>
                                  {shipping.shipping_fees ?
                                    `${shipping.shipping_fees.display_value} ${cur}`
                                    : <SVGComponent clsName={`${styles['ship-icon']}`} src={lang === 'en' ? "icons/free-shipping" : "icons/Arabic-Freeshipping"} />}
                                </div>
                              </div>
                              :
                              null
                          }

                          <div className={` ${styles['flx-space-bw']} ${styles['total-amount']} ${styles['fs-12']}`}>
                            <div>{ORDER_PAGE.TOTAL}</div>
                            <div className={`${styles['t-rt']}`}>{total_amount} {cur}</div>
                          </div>
                        </div>
                        <div className={`${styles['p-5']} ${styles['mt-10']} ${styles['fs-12']} ${styles['overall-amount']}`}>{CART_PAGE.OVERALL_YOU_SAVE} {total_discount} {cur} {CART_PAGE.ON_THIS_PRODUCT}</div>
                      </div>
                    </div>

                    {/* </OverlayTrigger> */}
                  </h4>
                  {/* {
                      shipping !== null
                      ?
                        <p className={`${styles['t-rt']}`}>{shipping.shipping_fees} <span className={`${styles['fs-12']}`}>{cur}</span></p>
                      :
                        null
                  } */}
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <div className={`${styles['cart-box-btm']} ${styles.flex} ${styles['p-14-22']}`}>
          <Col md={8} sm={8} xs={8} className={`${styles.flex} ${styles['m-pd-r-0']}`}>
            <span className={styles.width21}>
              {
                inventory <= 10 && inventory != 0 ?
                  <span className={`${styles.fontW600} ${styles['thick-red']} ${styles['pr-20']}`}>{CART_PAGE.ONLY + ' ' + inventory + ' ' + CART_PAGE.UNITS_LEFT} </span>
                  : ''
              }
              {
                inventory <= 0 ?
                  <span className={`${styles.fontW600} ${styles['thick-red']} ${styles['pr-20']}`}>{CART_PAGE.OUT_OF_STOCK} </span>
                  : ''
              }
            </span>
            <span data-id={item_id} onClick={addToWishlist} className={`${styles['flex-center']} ${styles['move-to-wishlist']} ${styles['pr-20']} ${styles.pointer}`}>
              <SVGComponent clsName={`${styles['wish-list-icon']}`} src="icons/wish-list/wish-list-icon" />
              <span className={styles['pl-10']}>{CART_PAGE.MOVE_TO_WISHLIST}</span>
            </span>
            <span id={item_id} onClick={removeCartItem} className={`${styles['flex-center']} ${styles['cart-remove-icon']} ${styles['pl-20']} ${styles.pointer}`}>
              <SVGComponent clsName={`${styles['delete-icon']}`} src="icons/delete-icon/delete-icon" />
              <span className={styles['pl-10']}>{CART_PAGE.REMOVE}</span>
            </span>
          </Col>
          <Col md={4} sm={4} xs={4} className={`${styles['t-rt']} ${styles['pr-0']} ${styles['m-pad-5']}`}>
            <span>{ORDER_PAGE.TOTAL} : </span><span className={`${styles['fs-16']} ${styles.fontW600}`}>{total_amount + ' ' + cur}</span>
          </Col>
        </div>

      </div>
    );
  }
}

export default CartItem;
