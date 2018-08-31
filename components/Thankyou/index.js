import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectors, actionCreators } from '../../store/order';

import PaymentStatus from './includes/PaymentStatus';
import OrderDetails from '../Order/includes/OrderDetails';
import PaymentHeader from '../Payments/includes/PaymentHeader';

import { mergeCss } from '../../utils/cssUtil';
const styles = mergeCss('components/Thankyou/thankyou');

class Thankyou extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'SUCCESSFUL',
      orderId: ''
    };
  }

  componentDidMount() {
    const { orderId, getOrderDetails, status } = this.props;
    this.setState({ status })
    getOrderDetails({ orderId: orderId });
  }

  render() {
    const { orderId, query, orderData } = this.props;
    const { status } = this.state;

    return (
      <div className={styles['thankyou']}>
        <PaymentHeader />
        <PaymentStatus
          status={status}
          orderId={orderId}
        />
        {
          orderData.orderItems.length ?
            <OrderDetails
              query={query}
              orderData={orderData}
              thankyouPage={true}
            />
            : null
        }
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return ({
    orderData: selectors.getOrderDetails(store)
  })
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getOrderDetails: actionCreators.getOrderDetails
  },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Thankyou);
