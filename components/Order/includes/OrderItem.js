import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import StatusWidget from './widget/StatusWidget';
import constants from '../../../constants';

import styles from '../order.styl';

const OrderItem = ({ orderItem }) => {
  const { products } = orderItem;
  return (
    <div className={`${styles['shipment-wrap']} ${styles['mb-32']} ${styles['mt-32']}`}>
      <Row>
        <Col md={7}>
          <div className={styles['products-wrap']}>
            {
              orderItem.products.map((product) => (
                <div key={product.id} className={styles['product-item']}>
                  <div className={styles['img-wrap']}>
                    <img className={`${styles['order-item-img']} ${styles['center']} ${styles['middle']}`} src={`${constants.mediaDomain}/${product.img}`} alt={product.img} />
                  </div>
                  <div className={styles['text-wrap']}>
                    <span className={`${styles['middle']}`} >{product.name}</span>
                  </div>
                </div>
              ))
            }
          </div>
        </Col>
        <Col md={5}>
          <div className={`${styles['pt-15']} ${styles['pr-15']} ${styles['pb-15']}`}>
            <div className={styles['date-cont']}>
              <div className={styles['fs-12']}>Delivery by</div>
              <div className={`${styles['ff-t']} ${styles['fs-30']}`}>21, Monday</div>
            </div>
            <div className={styles['cancel-btn']}>
              <span className={`${styles['link-text']} ${styles['fs-12']}`}>Cancel</span>
            </div>
            <div className={styles['widget-wrap']}>
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
      </Row>
    </div>
  )
};

export default OrderItem;