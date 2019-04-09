import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Order from './includes/Order';
import OrderIssueWidget from '../../Order/includes/OrderIssueWidget';
import { selectors, actionCreators } from '../../../store/cam/orders';
import Pagination from '../../common/Pagination';
import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Cam/Orders/orders');

class Orders extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentPage:0
    }
    this.onPageChanged = this.onPageChanged.bind(this)
  }
  componentDidMount() {
    this.props.getOrderHistory(this.state.currentPage);
  }
  onPageChanged(currentPage) {
    this.setState({
      currentPage
    },() => this.props.getOrderHistory(currentPage))

  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      currentPage:nextProps.pageDetails.page
    })
  }
  render() {
    const { ordersData,pageDetails } = this.props;
    const { currentPage } = this.state;
    return (
      <div>
        <div className={styles['orders-container']}>
        {
          ordersData.length
          ?
          ordersData.map((order) => <Order key={order.id} order={order} />)
          :
          <div className={`${styles['box']} ${styles['mt-20']} ${styles['mb-20']} ${styles['p-20']}`}>Oops! No orders yet. Start Shopping</div>
        }
        <Pagination
          totalSize={pageDetails.total_pages > 1 ? (pageDetails.total_pages - 1): 0}
          pageNeighbours={0}
          onPageChanged = {this.onPageChanged}
          currentPage={currentPage}
        >
        </Pagination>
        </div>
        <OrderIssueWidget />
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  ordersData: selectors.getOrdersData(store),
  pageDetails: selectors.getPageDetails(store)
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { getOrderHistory: actionCreators.getOrderHistory },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
