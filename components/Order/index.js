import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import HeaderBar from '../HeaderBar/index';
import OrderDetails from './includes/OrderDetails';
import OrderReturnExchange from './includes/OrderReturnExchange';

import { selectors, actionCreators } from '../../store/order';

import { mergeCss } from '../../utils/cssUtil';
const styles = mergeCss('components/Order/order');

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
        {
          orderData.orderItems.length
          ?
          (
            query.returnExchangeType
            ?
            <OrderReturnExchange query={query} orderData={orderData} />
            :
            <OrderDetails query={query} orderData={orderData} />)
          :
          'loading...'
        }

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
