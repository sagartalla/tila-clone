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
    const { ordersData, tabDetails } = this.props;
    const [tab, ...queryParams] = tabDetails;
    const camComponent = ((tabName) => {
      switch(tabName) {
        case 'orders':
          return 
      }
    })(tab)

    return (
      <div className={styles['orders-container']}>
        {ordersData.map((order) => <Order key={order.id} order={order} />)}
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