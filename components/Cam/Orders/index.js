import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Order from './includes/Order';

import { selectors, actionCreators } from '../../../store/cam/orders';

import styles from './orders.styl';

class Orders extends Component {
  componentDidMount() {
    this.props.getOrderHistory();
  }
  
  render() {
    const { ordersData } = this.props;
    return (
      <div className={styles['orders-container']}>
        {
          ordersData.length 
          ?
          ordersData.map((order) => <Order key={order.id} order={order} />)
          :
          <div className={`${styles['box']} ${styles['mt-20']} ${styles['mb-20']} ${styles['p-20']}`}>No order history</div>
        }
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  ordersData: selectors.getOrdersData(store)
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { getOrderHistory: actionCreators.getOrderHistory },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Orders);