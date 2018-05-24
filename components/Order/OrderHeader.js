import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';

import  styles from './order.styl';
import OrderItem from '../Cam/Orders/includes/OrderItem';

const OrderHeader = ({orderDetails}) => {
  const { name, address, phone, orderId, orderDate, itemsTotal, orderTotal, shippingTotal, paymentDetals } = orderDetails;
  return (
    <div className={`${styles['box']} ${styles['p-20']}`}>
      <Row>
        <Col md={4}>
          <div>
            <div>Address Details</div>
            <div>
              <div>{name}</div>
              <address>
                {address}
              </address>
              <div>
                <span>Phone: </span>
                <span>{phone}</span>
                </div>
            </div>         
          </div>
        </Col>
        <Col md={4}>
          <table>
            <tr>
              <th>ORDER SUMMARY</th>
              <th>{orderId}</th>
            </tr>
            <tr>
              <td>Order Date</td> 
              <td>{itemsTotal}</td>
            </tr>
            <tr>
              <td>Item(s) Subtotals</td>
              <td>{orderTotal}</td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td>{shippingTotal}</td>
            </tr>
          </table>
        </Col>
        <Col md={4}>
          <table>
            <tr>
              <th>PAYMENT METHOD</th>
            </tr>
            {paymentDetals.map((i) => (
              <tr key={i.id}>
                <td>img</td>
                <td>{i.payType}</td>
                <td>{i.amount}</td>
              </tr>
            ))}
          </table>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Button>Change Address</Button>
        </Col>
        <Col md={4}>
          <table>
            <tr>
              <td>Grand Total</td>
              <td>{orderTotal}</td>
            </tr>
          </table>
        </Col>
        <Col md={4}>
          <span>Request Invoice</span>
        </Col>
      </Row>
    </div>
  )
}

export default OrderHeader;