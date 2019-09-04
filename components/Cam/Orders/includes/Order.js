import React, { useState} from 'react';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import { Row, Col, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import SVGComponent from '../../../common/SVGComponet';
import OrderItem from '../../../Order/includes/OrderDetails/OrderItem';
import { Router } from '../../../../routes';
import { languageDefinations } from '../../../../utils/lang/';

import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../orders_en.styl';
import styles_ar from '../orders_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const { ORDERS, ORDER_PAGE } = languageDefinations();
const cookies = new Cookies();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

const Order = ({ order, getInvoice }) => {
  const { totalOrderPrice } = order
  const [showToolTip,toggleToolTip] = useState(false)

  const renderToolTip = () => {
    return toggleToolTip(!showToolTip)
  }
  const popover = (
    <Popover id="popover-positioned-right">
      <div className={`${styles.flex} ${styles['justify-between']} ${styles['flex-colum']} ${styles['ht-100']}`}>
        <div className={`${styles.fontW600} ${styles['fs-16']} ${styles['black-color']}`}>{order.shippingTo.name}</div>
        <div className={`${styles['fs-14']} ${styles.ellipsis} ${styles['thick-gry-clr']}`}>{order.shippingTo.address}</div>
        <div className={`${styles['fs-14']} ${styles['thick-gry-clr']}`}>{order.shippingTo.phone}</div>
      </div>
    </Popover>
  );
  const pricePopover = (
    <Popover id="popover-positioned-left" className={styles['popover-post-lft']}>
      <div className={`${styles['price-tooltip']}`}>
        <ul>
          <li className={`${styles['flx-space-bw']}`}>
            <span className={`${styles['fs-12']} ${styles['thick-gry-clr']}`}>{ORDER_PAGE.MRP} : </span>
            <span className={`${styles['fontW600']} ${styles['fs-12']}`}> {totalOrderPrice.total_mrp.currency_code} {totalOrderPrice.total_mrp.display_value}</span>
          </li>
          <li className={`${styles['flx-space-bw']}`}>
            <span className={`${styles['fs-12']} ${styles['thick-gry-clr']}`}>{ORDER_PAGE.PRICE} : </span>
            <span className={`${styles['fontW600']} ${styles['fs-12']}`}> {totalOrderPrice.total_offer_price.currency_code} {totalOrderPrice.total_offer_price.display_value}</span>
          </li>
          {
            totalOrderPrice && totalOrderPrice.total_discount && totalOrderPrice.total_discount.money_value && totalOrderPrice.total_discount.money_value > 0 &&
            <li className={`${styles['flx-space-bw']}`}>
              <span className={`${styles['fs-12']} ${styles['thick-gry-clr']}`}>{ORDER_PAGE.DISCOUNT} : </span>
              <span className={`${styles['fontW600']} ${styles['fs-12']}`}> {totalOrderPrice.total_discount.currency_code} {totalOrderPrice.total_discount.display_value}</span>
            </li>
          }
          {
            totalOrderPrice && totalOrderPrice.total_gift_charges && totalOrderPrice.total_gift_charges.money_value && totalOrderPrice.total_gift_charges.money_value > 0 &&
            <li className={`${styles['flx-space-bw']}`}>
              <span className={`${styles['fs-12']} ${styles['thick-gry-clr']}`}>{ORDER_PAGE.GIFT_CHARGES} : </span>
              <span className={`${styles['fontW600']} ${styles['fs-12']}`}> {totalOrderPrice.total_gift_charges.currency_code} {totalOrderPrice.total_gift_charges.display_value}</span>
            </li>
          }
          {
            (totalOrderPrice.total_tila_care_charges && totalOrderPrice.total_tila_care_charges.money_value > 0) &&
            <li className={`${styles['flx-space-bw']}`}>
              <span className={`${styles['fs-12']} ${styles['thick-gry-clr']}`}>{ORDER_PAGE.TILA_CARE_SERVICE_FEE} </span>
              <span className={`${styles['fontW600']} ${styles['fs-12']}`}> {totalOrderPrice.total_tila_care_charges.currency_code} {totalOrderPrice.total_tila_care_charges.display_value}</span>
            </li>
          }
          <li className={`${styles['flx-space-bw']}`}>
            <span className={`${styles['fs-12']} ${styles['thick-gry-clr']}`}>{ORDER_PAGE.SHIPPING} : </span>
            <span className={`${styles['fontW600']} ${styles['fs-12']}`}>
              {totalOrderPrice.total_shipping.display_value ? `(+) ${totalOrderPrice.total_shipping.currency_code} ${totalOrderPrice.total_shipping.display_value}` :
              <SVGComponent clsName={`${styles['ship-icon']}`} src={lang === 'en' ? 'icons/free-shipping' : 'icons/Arabic-Freeshipping'} />}
            </span>
          </li>
          <li className={`
              ${styles['flx-space-bw']}
              ${styles['border-t']}
              ${styles['border-b']}
              ${styles['pt-5']}
              ${styles['pb-5']} ${styles['mt-5']} ${styles['mb-5']}`}>
            <span className={`${styles['fontW600']} ${styles['fs-12']}`}>{ORDER_PAGE.TOTAL} : </span>
            <span className={`${styles['fontW600']} ${styles['fs-12']}`}> {totalOrderPrice.total_price.currency_code} {totalOrderPrice.total_price.display_value}</span>
          </li>
          <li className={`${styles['fs-12']} ${styles['thick-gry-clr']}`}> {ORDER_PAGE.INCLUSIVE_OF_ALL_TAXES}</li>
        </ul>

      </div>
    </Popover>
  )
  const fetchInvoice = () => getInvoice(order.id);

  const routeChange = () => {
    Router.push(`/${language}/customer/orders/${order.id}`);
  }
  return (
    <div className={`${styles['order-item-wrap']} ${styles['box-shadow']} ${styles['mt-20']} ${styles['mb-20']} ${styles['p-20']}`}>
      <div className={`${styles['flx-spacebw-alignc']}`}>
        <div className={`${styles.width42}`}>
          <span>{ORDERS.ORDER_ID}</span>
          <div onClick={routeChange}>
            <span className={styles['link-text']}>{order.id}</span>
          </div>
        </div>
        <div>
          <span>{ORDERS.SHIPPING_TO}</span>
          <div className={`${styles.flex}`}>
            <span className={`${styles['text-capitalize']}`}>{order.shippingTo.name}</span>
            <OverlayTrigger placement="bottom" overlay={popover}>
              <span className={styles['ml-10']}>
                <SVGComponent clsName={`${styles['down-arrow']}`} src="icons/down-arrow/down-arrow" />
              </span>
            </OverlayTrigger>
          </div>
        </div>
        <div>
          <a href={`/${language}/customer/orders/${order.id}`} className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['left-radius']} ${styles['text-uppercase']}`}>
            {ORDERS.TRACK_ORDER}
          </a>
        </div>
      </div>
      <Row>
        <Col md={12}>
          {order.orderItems.map(orderItem => (
            <OrderItem
              key={orderItem.id}
              orderItem={orderItem}
              orderId={order.id}
              showPriceInfo={false}
              variantId={orderItem.variantId}
              isCancelable={orderItem.isCancelable}
              isReturnable={orderItem.isReturnable}
              isExchangable={orderItem.isExchangable}
              isDamageProtectionAvailable={orderItem.isDamageProtectionAvailable}
              isWarrantyAvailable={orderItem.isWarrantyAvailable}
              listingId={orderItem.listingId}
              tilaPolicy={orderItem.tilaPolicy}
              tuinId={orderItem.tuinId}
              isOrderDetailsPage={false}
            />
          ))}
        </Col>
      </Row>
      <Row className={styles['flex-center']}>
        <Col md={7} className={styles['flex-center']}>
          <div className={`${styles['pr-10']} ${styles['thck-gry-rt-border']}`}>
            <span>
            {ORDER_PAGE.ORDERED_ON}{' '}
            </span>
            <span className={`${styles.fontW600} ${styles['light-gry-clr']}`}>
              {order.orderDate}
            </span>
          </div>
          <a href={`/${language}/help/answers/orders#${order.id}`}>
            <span className={`${styles['p-5']} ${styles['black-color']} ${styles['flex-center']} ${styles['ml-10']}`}>
              <SVGComponent clsName={`${styles['help-icon']}`} src="icons/help-icon/help" />
              &nbsp;&nbsp;{ORDERS.NEED_HELP} <span className={`${lang === 'en' ? '' : styles['flip-questionmark']}`}>?</span>
            </span>
          </a>

        </Col>
        <Col md={5} className={styles['pl-0']}>
          <div className={`${styles['flx-space-bw']}`}>
            <span className={`${styles.flex} ${styles.pointer}`}>
              {order.invoice_id &&
                <span className={styles.flex} onClick={fetchInvoice}>
                  <span>{ORDERS.REQUEST_INVOICE}&nbsp;</span>
                  <span>
                    <SVGComponent clsName={`${styles['down-arrow']}`} src="icons/down-arrow/down-arrow" />
                  </span>
                </span>
              }
            </span>
            <span className={`${styles['ml-10']} ${styles['fs-16']} ${styles.flex}`}>
              <span className={`${styles['thick-gry-clr']}`}>{ORDERS.ORDER_TOTAL} :</span>
              <span className={`${styles.flex} ${styles['align-baseline']}`}>
                <span className={`${styles['fs-14']} ${styles['thick-gry-clr']}`}>{order.orderCurrency}</span>&nbsp;
                <span className={`${styles.fontW600}`}>{order.orderAmount}</span>
                <OverlayTrigger
                  placement="bottom"
                  overlay={pricePopover}
                 >
                  <span className={`${styles['pl-5']} ${styles['flex']}`}>
                    <SVGComponent clsName={`${styles['down-arrow']}`} src="icons/down-arrow/down-arrow" />
                  </span>
                </OverlayTrigger>
              </span>
            </span>
          </div>
        </Col>
      </Row>
    </div>
  );
};

Order.proptypes = {
  order: PropTypes.object.isRequired
}

export default Order;
