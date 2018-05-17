import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';

import OrderItem from './OrderItem';

import styles from '../orders.styl';

const Order = ({orderItem}) => {
  return (
    <div className={styles['order-item-wrap']}>
      <Row>
        <Col md={6}>
          <div>
            <span>Order Id #</span>
          </div>
          <div>
            <span>{orderItem.id}</span>
          </div>
        </Col>
        <Col md={6}>
          <Row>
            <Col md={8}>
              <div>
                <span>Shipping to</span>
              </div>
              <div>
                <span>{orderItem.shippingTo.name}</span>
                <span>icon</span>
              </div>
            </Col>
            <Col md={4}>
              <Button>Track Order</Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <ProductListingItem />
      </Row>
    </div>
  );
};

Order.proptypes = {
  orderItem: PropTypes.object.isRequired
}

export default Order;