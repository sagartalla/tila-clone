import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import HeaderBar from '../HeaderBar/index';
import OrderDetails from './includes/OrderDetails';
import OrderReturnExchange from './includes/OrderReturnExchange';

import { selectors, actionCreators } from '../../store/order';
import { languageDefinations } from '../../utils/lang';

const { ORDER_PAGE } = languageDefinations();

import lang from '../../utils/language';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './order_en.styl';
import styles_ar from './order_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_en, ...styles_ar};

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
          `${ORDER_PAGE.LOADING}`
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
