import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import OrderHeader from './OrderHeader';
import OrderItem from './OrderItem';
import OrderIssueWidget from '../OrderIssueWidget';

// import styles from '../order.styl';
import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Order/order');

const OrderDetails = ({ query, orderData }) => {
  return (
    <div>
      <Grid>
        <Row>
          <Col md={12}>
            <div>
              {/* TODO Breadcrums */}
              <span>My account</span>
              <span>></span>
              <span>Orders</span>
              <span>></span>
              <span>{query.orderId}</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div>
              <OrderHeader orderDetails={orderData} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className={`${styles['box']} ${styles['p-20']} ${styles['mt-20']}`}>
              {
                orderData.orderItems.map((item) => <OrderItem key={item.id} orderItem={item} orderId={orderData.orderId} />)
              }
            </div>
          </Col>
        </Row>
      </Grid>
      <OrderIssueWidget />
    </div>
  );
}

export default OrderDetails;
