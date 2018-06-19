import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import StatusWidget from '../StatusWidget';
import constants from '../../../../constants';
import { ORDER_ISSUE_TYPES, ORDER_ISSUE_STEPS } from '../../constants';
import { actionCreators }   from '../../../../store/order';

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Cam/Orders/orders');

const OrderItem = ({ orderItem, raiseOrderIssue, orderId }) => {
  const { products } = orderItem;

  const cancelOrder = () => {
    raiseOrderIssue({
      issueType: ORDER_ISSUE_TYPES.CANCEL,
      items: products,
      defaultStep: ORDER_ISSUE_STEPS.LIST,
      orderId,
    });
  };

  const exchangeReturnOrder = () => {
    raiseOrderIssue({
      issueType: null,
      items: products,
      defaultStep: ORDER_ISSUE_STEPS.LIST,
      orderId,
    });
  };

  return (
    <div className={`${styles['shipment-wrap']} ${styles['mb-30']} ${styles['mt-30']}`}>
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
              <span className={`${styles['link-text']} ${styles['fs-12']}`} onClick={cancelOrder}>Cancel</span>
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { raiseOrderIssue: actionCreators.raiseOrderIssue },
    dispatch,
  );
}

OrderItem.propTypes = {
  orderItem: PropTypes.object.isRequired,
  raiseOrderIssue: PropTypes.func.isRequired,
  orderId: PropTypes.string.isRequired,
}

export default connect(null, mapDispatchToProps)(OrderItem);
