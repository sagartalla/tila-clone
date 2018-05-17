import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';

import OrderItem from './OrderItem';

import styles from '../orders.styl';

const Order = ({order}) => (
  <div className={`${styles['order-item-wrap']} ${styles['box-shadow']} ${styles['mt-20']} ${styles['mb-20']} ${styles['p-20']}`}>
    <Row>
      <Col md={6}>
        <div>
          <span>Order Id #</span>
        </div>
        <div>
          <span className={styles['link-font-color']}>{order.id}</span>
        </div>
      </Col>
      <Col md={6}>
        <Row>
          <Col md={8}>
            <div>
              <span>Shipping to</span>
            </div>
            <div>
              <span className={styles['link-font-color']}>{order.shippingTo.name}</span>
              <span className={styles['ml-10']}>v</span>
            </div>
          </Col>
          <Col md={4}>
            <Button>Track Order</Button>
          </Col>
        </Row>
      </Col>
    </Row>
    <Row>
      <Col md={12}>
        {order.orderItems.map((orderItem) => <OrderItem key={orderItem.id} orderItem={orderItem} />)}
      </Col>
    </Row>
  </div>
);

Order.proptypes = {
  order: PropTypes.object.isRequired
}

export default Order;