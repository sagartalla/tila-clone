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
    debugger;
    this.setState({
      orderState:this.props.status,
      orderId:this.props.transId
    });
    if(this.props.status=="SUCCESSFUL")
     this.props.getOrderStatusDetails(this.props.transId);
  }

  componentWillReceiveProps(nextProps, nextState) {
    
  }

  render() {
    const summary= this.state.orderState=="SUCCESSFUl"? (<Summary orderId={this.state.orderId}/>): "";
    return (
      <div className={styles['thankyou']}>
        <Grid>
          <PaymentStatus status={this.state.orderState}/>
          {summary}
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  order: selectors.getFinalOrderDetails(store)
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getOrderStatusDetails: actionCreators.getOrderStatusDetails
    },
    dispatch,
  );

export default connect(mapStateToProps,mapDispatchToProps)(Thankyou);