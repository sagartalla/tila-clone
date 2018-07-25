import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-bootstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { actionCreators, selectors } from '../../store/thankyou';

import { selectors, actionCreators } from '../../store/order';

import PaymentStatus from './includes/PaymentStatus';
import PaymentHeader from '../Payments/includes/PaymentHeader';
// import Summary from './includes/Summary';
// import OrderList from './includes/OrderList';
import OrderDetails from '../Order/includes/OrderDetails';


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
    if (status == 'SUCCESSFUL') {
      getOrderDetails({ orderId: orderId });
    }
  }

  render() {
    const { orderId, query, orderData } = this.props;
    const { status } = this.state;

    return (
      <div className={styles['thankyou']}>
        <PaymentHeader />
        {/* <Grid> */}
          <PaymentStatus status={status} orderId={orderId} />
          {
            status == 'SUCCESSFUL' && orderData.orderItems.length ?
              <OrderDetails query={query} orderData={orderData} thankyouPage={true} />
              : null
          }
        {/* </Grid> */}
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

// Thankyou.propTypes = {
//   orderDetails: PropTypes.object.isRequired,
//   orderId: PropTypes.string.isRequired,
//   status: PropTypes.string.isRequired,
//   getOrderStatusDetails: PropTypes.func.isRequired,
// };

export default connect(mapStateToProps, mapDispatchToProps)(Thankyou);
