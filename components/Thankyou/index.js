import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectors, actionCreators } from '../../store/order';

import PaymentStatus from './includes/PaymentStatus';
import OrderDetails from '../Order/includes/OrderDetails';
import HeaderBar from '../HeaderBar';

import lang from '../../utils/language';

import styles_en from './thankyou_en.styl';
import styles_ar from './thankyou_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;

class Thankyou extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'SUCCESSFUL',
      orderId: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if((nextProps.orderData.status && nextProps.orderData.status !== 'CONFIRMED') && (window.location.href.indexOf('FAILED') === -1)) {
      window.location = window.location.href.replace('SUCCESSFUL', 'FAILED');
    }
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
        <HeaderBar hideSearch hideMegamenu/>
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
    );
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
