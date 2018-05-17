import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import StatusWidget from './StatusWidget';

import styles from '../orders.styl';

const OrderItem = ({ orderItem }) => (
  <div className={`${styles['shipment-wrap']} ${styles['mb-35']} ${styles['mt-35']}`}>
    <Row>
      <Col md={7}>
        <div className={styles['products-wrap']}>
          {
            orderItem.products.map((product) => (
              <div key={product.id} className={styles['product-item']}>
                <div className={styles['img-wrap']}>
                  <img className={styles['order-item-img']} src={product.img} alt={product.img} />
                </div>
                <div className={styles['text-wrap']}>
                  <span>{product.name}</span>
                </div>
              </div>
            ))
          }
        </div>
      </Col>
      <Col md={5}>
        <div>
          <div>Delivery by</div>
          <div>21, Monday</div>
        </div>
        <div>
          <span>Cancel</span>
        </div>
        <div>
          <StatusWidget currentStatus={orderItem.status} />
        </div>
      </Col>
    </Row>
  </div>
);

export default OrderItem;