import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectors, actionCreators } from '../../store/order';

import PaymentStatus from './includes/PaymentStatus';
import OrderDetails from '../Order/includes/OrderDetails';
import HeaderBar from '../HeaderBar';

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

  componentWillReceiveProps(nextProps) {
    if((nextProps.orderData.status && nextProps.orderData.status !== 'CONFIRMED') && (window.location.href.indexOf('FAILED') === -1)) {
      window.location = window.location.href.replace('SUCCESSFUL', 'FAILED');
    }
    
    
}   

  componentDidMount() {
    const { orderId, getOrderDetails, status } = this.props;
    this.setState({ status })
    getOrderDetails({ orderId: orderId }).then(() => {
      debugger;
      if(this.props.orderData.hasOwnProperty('orderItems')&this.props.orderData.hasOwnProperty('payments')){   
        this.props.track({
          eventName: "Order Placed","orderData":this.props
        });
          }
        
    });
    window.dataLayer.push({
      'event': 'purchase'
     });
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
    getOrderDetails: actionCreators.getOrderDetails,
    track: actionCreators.track,
  },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Thankyou);
