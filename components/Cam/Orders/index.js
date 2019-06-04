import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Order from './includes/Order';
import OrderIssueWidget from '../../Order/includes/OrderIssueWidget';
import { selectors, actionCreators } from '../../../store/cam/orders';
import { actionCreators as singleOrderActionCreators } from '../../../store/order';
import Pagination from '../../common/Pagination';
import { languageDefinations } from '../../../utils/lang/';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './orders_en.styl';
import styles_ar from './orders_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const { ORDERS } = languageDefinations();

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
    };
    this.onPageChanged = this.onPageChanged.bind(this);
  }

  componentDidMount() {
    this.props.getOrderHistory(this.state.currentPage);
  }

  componentWillReceiveProps(nextProps) {
    const { currentPage } = this.state;
    if (nextProps.pageDetails.page !== currentPage) {
      window.scrollTo(0, 0);
      this.setState({
        currentPage: nextProps.pageDetails.page,
      });
    }
  }

  onPageChanged(currentPage) {
    this.setState({
      currentPage,
    }, () => this.props.getOrderHistory(currentPage));
  }

  render() {
    const { ordersData, pageDetails, getInvoice } = this.props;
    const { currentPage } = this.state;
    return (
      <div>
        <div className={styles['orders-container']}>
          {
          ordersData.length
          ?
          ordersData.map(order => <Order key={order.id} getInvoice={getInvoice} order={order} />)
          :
          <div className={`${styles.box} ${styles['mt-20']} ${styles['mb-20']} ${styles['p-20']}`}>{ORDERS.NO_ORDERS}</div>
        }
          <Pagination
            totalSize={pageDetails.total_pages > 1 ? (pageDetails.total_pages - 1) : 0}
            pageNeighbours={0}
            onPageChanged={this.onPageChanged}
            currentPage={currentPage}
          />
        </div>
        <OrderIssueWidget />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  ordersData: selectors.getOrdersData(store),
  pageDetails: selectors.getPageDetails(store),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getOrderHistory: actionCreators.getOrderHistory,
      getInvoice: singleOrderActionCreators.getInvoice,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
