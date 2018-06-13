import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import StatusWidget from './widget/StatusWidget';
import constants from '../../../../constants';

import styles from '../orders.styl';

const OrderItem = ({ orderItem }) => {
  const { products } = orderItem;
  return (
    <div className={`${styles['shipment-wrap']} ${styles['mb-20']} ${styles['mt-20']} ${styles['flex-center']}`}>
      <Col md={7} className={`${styles['pl-0']} ${styles['pr-0']} ${styles['thck-gry-rt-border']}`}>
        <div className={`${styles['products-wrap']} ${styles['flex']} ${styles['p-10']}`}>
          {
            orderItem.products.map((product) => (
              <div key={product.id} className={`${styles['product-item']} ${styles['flex-center']}`}>
                <div className={`${styles['img-wrap']} ${styles['flex-center']} ${styles['justify-center']}`}>
                  <img className={`${styles['order-item-img']}`} src={`${constants.mediaDomain}/${product.img}`} alt={product.img} />
                </div>
                <div className={`${styles['text-wrap']} ${styles['pl-10']}`}>
                  <span>{product.name}</span>
                </div>
              </div>
            ))
          }
        </div>
      </Col>
      <Col md={5}>
        <div className={`${styles['pt-15']} ${styles['pb-15']}`}>
          <div className={styles['date-cont']}>
            <div className={styles['fs-12']}>Delivery by</div>
            <div className={`${styles['ff-t']} ${styles['fs-30']}`}>21, Monday</div>
          </div>
          <div className={styles['cancel-btn']}>
            <span className={`${styles['link-text']} ${styles['fs-12']}`}>Cancel</span>
          </div>
          <div className={`${styles['widget-wrap']} ${styles['pt-10']}`}>
            {
              orderItem.status === 'DELIVERED' 
              ?
                null
              :
                <StatusWidget currentStatus={orderItem.status} />
            }
            
          </div>
        </div>
      </Col>
    </div>
  )
};

export default OrderItem;