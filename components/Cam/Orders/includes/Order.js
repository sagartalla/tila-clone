import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import { Row, Col, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import SVGComponent from '../../../common/SVGComponet';
import OrderItem from '../../../Order/includes/OrderDetails/OrderItem';
import { Router } from '../../../../routes';
import { mergeCss } from '../../../../utils/cssUtil';

const styles = mergeCss('components/Cam/Orders/orders');

const cookies = new Cookies();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

const Order = ({ order }) => {
  const popover = (
    <Popover id="popover-positioned-right">
      <address>
        {order.shippingTo.address} {order.shippingTo.phone}
      </address>
    </Popover>
  );

  const routeChange = () => {
    Router.push(`/${country}/${language}/cam/orders/${order.id}`);
  }

  return (
    <div className={`${styles['order-item-wrap']} ${styles['box-shadow']} ${styles['mt-20']} ${styles['mb-20']} ${styles['p-20']}`}>
      <div className={`${styles['flx-spacebw-alignc']}`}>
        <div>
          <span>Order Id #</span>
          <div onClick={routeChange}>
            <span className={styles['link-text']}>{order.id}</span>
          </div>
        </div>
        <div>
          <span>Shipping to</span>
          <div className={`${styles['flex']}`}>
            <span className={`${styles['link-text']} ${styles['text-capitalize']}`}>{order.shippingTo.name}</span>
            <OverlayTrigger placement="bottom" overlay={popover}>
              <span className={styles['ml-10']}>
                <SVGComponent clsName={`${styles['down-arrow']}`} src="icons/down-arrow/down-arrow" />
              </span>
            </OverlayTrigger>
          </div>
        </div>
        <div>
          <a href={`/${country}/${language}/cam/orders/${order.id}`} className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['text-uppercase']}`}>
            Track Order
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
              variantId={orderItem.variantId}
              isCancelable={orderItem.isCancelable}
              isReturnable={orderItem.isReturnable}
              isExchangable={orderItem.isExchangable}
            />
          ))}
        </Col>
      </Row>
      <Row>
        <Col md={7} className={styles.flex}>
          <div className={`${styles['pr-10']} ${styles['thck-gry-rt-border']}`}>
            <span>
              Ordered on{' '}
            </span>
            <span className={`${styles['fontW600']} ${styles['light-gry-clr']}`}>
              {order.orderDate}
            </span>
          </div>
          <span className={`${styles['thick-blue']} ${styles['p-5']} ${styles['flex-center']} ${styles['ml-10']} ${styles.border} ${styles['border-radius4']}`}>
            <SVGComponent clsName={`${styles['help-icon']}`} src="icons/help-icon/help" />
            &nbsp;&nbsp;Need Help?
          </span>
        </Col>
        <Col md={5} className={styles['pl-0']}>
          <div className={`${styles['flx-space-bw']}`}>
            <span className={`${styles['flex']}`}>
              <span className={styles['link-text']}>Request Invoice&nbsp;</span>
              <span>
                <SVGComponent clsName={`${styles['down-arrow']}`} src="icons/down-arrow/down-arrow" />
              </span>
            </span>
            <span className={`${styles['ml-10']} ${styles['fs-16']}`}>
              <span>Order Total:</span> <span className={`${styles['fontW600']} ${styles['light-gry-clr']}`}>{order.orderTotal}</span>
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
