import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, OverlayTrigger, Popover } from 'react-bootstrap';

import OrderItem from './OrderItem';

import styles from '../orders.styl';

const Order = ({order}) => {
  const popover = (
    <Popover id="popover-positioned-right">
      <address>
        {order.shippingTo.address} {order.shippingTo.phone}
      </address>
    </Popover>
  );
  return (
    <div className={`${styles['order-item-wrap']} ${styles['box-shadow']} ${styles['mt-20']} ${styles['mb-20']} ${styles['p-20']}`}>
      <Row>
        <Col md={6}>
          <div>
            <span>Order Id #</span>
          </div>
          <div>
            <span className={styles['link-text']}>{order.id}</span>
          </div>
        </Col>
        <Col md={6}>
          <Row>
            <Col md={8}>
              <div>
                <span>Shipping to</span>
              </div>
              <div>
                <span className={styles['link-text']}>{order.shippingTo.name}</span>
                <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                  <span className={styles['ml-10']}>v</span>
                </OverlayTrigger>
              </div>
            </Col>
            <Col md={4}>
              <a href={`/cam/orders/${order.id}`}>
                <Button>Track Order</Button>
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          {order.orderItems.map((orderItem) => <OrderItem key={orderItem.id} orderItem={orderItem} />)}
        </Col>
      </Row>
      <Row> 
        <div className={styles['m-10']}>
          <Col md={7}>
            <div className={styles['f-14']}>
              <span>
                Orderd on&nbsp;
              </span>
              <span className={styles['bold-font']}>
                {order.orderDate}
              </span>
            </div>
          </Col>
          <Col md={5}>
            <div className={`${styles['f-14']} ${styles['float-r']}`}>
              <span>
                <span className={styles['link-text']}>Request Invoice&nbsp;</span>
                <span>v</span>
              </span>
              <span className={styles['ml-10']}>
                <span>Order Total:&nbsp;</span>
                <span>{order.orderTotal}</span>
              </span>
            </div>
          </Col>
        </div>
      </Row>
    </div>
  );
};

Order.proptypes = {
  order: PropTypes.object.isRequired
}

export default Order;