import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, selectors } from '../../store/thankyou';

import PaymentStatus from './includes/PaymentStatus';
import Summary from './includes/Summary';


import styles from './thankyou.styl';

class Thankyou extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderState: "SUCCESSFUL",
      orderId: ""
    };
  }

  componentDidMount() {
    const { orderId, status } = this.props;
    this.setState({
      orderState: status,
      orderId: orderId
    });
    if (status == "SUCCESSFUL")
      this.props.getOrderStatusDetails(orderId);
  }

  render() {
    const { orderDetails } = this.props;
    const { orderState, orderId } = this.state;
    const summary = orderState == "SUCCESSFUL" ? (<Summary orderId={orderId} orderDetails={orderDetails} />) : "";
    return (
      <div className={styles['thankyou']}>
        <Grid>
          <PaymentStatus status={orderState} />
          {summary}
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  orderDetails: selectors.getFinalOrderDetails(store)
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getOrderStatusDetails: actionCreators.getOrderStatusDetails
    },
    dispatch,
  );

Thankyou.propTypes = {
  orderDetails: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Thankyou);