import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Order from './includes/Order';

import { selectors } from '../../../store/cam/orders';

import styles from './orders.styl';

const Orders = ({ ordersData }) => (
  ordersData.map((order) => <Order order={order} />)
);

const mapStateToProps = (store) => ({
  ordersData: selectors.getOrdersData(store)
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {},
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Orders);