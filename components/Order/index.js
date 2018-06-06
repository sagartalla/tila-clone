import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import HeaderBar from '../HeaderBar/index';
import OrderHeader from './OrderHeader';
import OrderItem from "./includes/OrderItem";
import OrderIssueWidget from './includes/OrderIssueWidget';

import { selectors, actionCreators } from '../../store/order';

import styles from './order.styl';

class Order extends Component {

  componentDidMount() {
    const { query, getOrderDetails } = this.props;
    getOrderDetails({ orderId: query.orderId });
  }

  render() {
    const { query, orderData } = this.props;
    return (
      <div className={styles['bg-color']}>
        <HeaderBar />
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
              <div className={`${styles['box']} ${styles['pl-20']} ${styles['pr-20']} ${styles['mt-20']}`}>
                {
                  orderData.orderItems.map((item) => <OrderItem  key={item.id} orderItem={item}/>)
                }
              </div>
            </Col>
          </Row>
        </Grid>
        <OrderIssueWidget />
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return ({
    orderData: selectors.getOrderDetails(store)
  })
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { getOrderDetails: actionCreators.getOrderDetails },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);