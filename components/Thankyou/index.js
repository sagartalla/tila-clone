import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectors, actionCreators } from '../../store/order';

import PaymentStatus from './includes/PaymentStatus';
import OrderDetails from '../Order/includes/OrderDetails';
import HeaderBar from '../HeaderBar';
import { Router } from '../../routes';

import lang from '../../utils/language';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './thankyou_en.styl';
import styles_ar from './thankyou_ar.styl';
import AuthWrapper from '../common/AuthWrapper';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

class Thankyou extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'SUCCESSFUL',
      orderId: '',
    };
  }

  componentDidMount() {
    const {
      orderId, getOrderDetails, status, track
    } = this.props;
    window.dataLayer.push({
      event: 'purchase',
    });
    this.setState({ status });
    getOrderDetails({ orderId }).then((res) => {
      const { data } = res.value;
      if (res.value.status === 200) {
        track({
          event: 'Order Placed',
          orderData: data,
        });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.orderData.status && nextProps.orderData.status !== 'CONFIRMED') && (window.location.href.indexOf('FAILED') === -1)) {
      Router.pushRoute(window.location.href.replace('SUCCESSFUL', 'FAILED'));
    }
    if (nextProps.errorCode === 400) {
      Router.push(`/${lang}/customer/orders`);
    }
  }

  render() {
    const { orderId, query, orderData } = this.props;
    const { status } = this.state;
    return (
      <div className={styles.thankyou}>
        <HeaderBar hideSearch hideMegamenu />
        <AuthWrapper>
          <PaymentStatus
            status={status}
            orderId={orderId}
          />
          {
            orderData.orderItems.length ?
              <OrderDetails
                query={query}
                orderData={orderData}
                thankyouPage
              />
              : null
          }
        </AuthWrapper>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  orderData: selectors.getOrderDetails(store),
  errorCode: selectors.getErrorCode(store),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getOrderDetails: actionCreators.getOrderDetails,
    track: actionCreators.track,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(Thankyou);
