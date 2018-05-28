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
    const { orderId } = this.props;
    this.setState({
      orderState: this.props.status,
      orderId: this.props.orderId
    });
    if (this.props.status == "SUCCESSFUL")
      this.props.getOrderStatusDetails(orderId);
  }

  render() {
    const { orderDetails } = this.props;
    const summary = this.state.orderState == "SUCCESSFUL" ? (<Summary orderId={this.state.orderId} orderDetails={orderDetails} />) : "";
    return (
      <div className={styles['thankyou']}>
        <Grid>
          <PaymentStatus status={this.state.orderState} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Thankyou);