import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreaters, selectors } from '../../store/payments';

import PaymentHeader from './includes/PaymentHeader';
import RightSideBar from './includes/RightSideBar';

import SignIn from './includes/SignIn';
import DeliveryAddress from './includes/DeliveryAddress';
import PaymentMode from './includes/PaymentMode';

import styles from './payment.styl';

class Payments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: {
        user_name: ''
      },
      paymentJson: {
        "payment_details": [
          {
            "amount": 0,
            "currency": "string",
            "payment_mode": "CREDIT_CARD"
          }
        ],
        "transaction_id": "string"
      },
      showTab: 0,// to show payment tabs
      paymentOptions: {} // which payment options to show.
    }

    this.inputOnChange = this.inputOnChange.bind(this);
    this.showPaymentType = this.showPaymentType.bind(this);
    this.makePayment = this.makePayment.bind(this);
    this.handleShippingAddressContinue = this.handleShippingAddressContinue.bind(this);
  }

  inputOnChange(e) {
    const { login } = this.state;
    login[e.target.name] = e.target.value;
    this.setState({ login });
  }

  //send params
  handleShippingAddressContinue(e) {
    this.props.createOrder()
  }

  // onclick payment method tabs.
  showPaymentType(value){
    this.setState({showTab: value});
  }

  // Clicking on pay button
  makePayment(){
    this.props.doPayment(this.state.paymentJson);
  }

  render() {
    const { login, showTab } = this.state;
    const {paymentOptions} = this.props;
    return (
      <div className={styles['payment']}>
        <PaymentHeader />
        <Grid>
          <Row>
            <Col xs={12} md={12} sm={12}>
              <h2>Secure Checkout </h2>
            </Col>
          </Row>
          <Row>
            <Col md={9} xs={12} sm={12}>
              <SignIn
                login={login}
                inputOnChange={this.inputOnChange}
              />
              <DeliveryAddress
                handleShippingAddressContinue={this.handleShippingAddressContinue}
              />
              {paymentOptions && paymentOptions.data ? 
                <PaymentMode
                  data = {paymentOptions}
                  showTab={showTab}
                  showPaymentType={this.showPaymentType}
                  makePayment= {this.makePayment}
                />
                : null
              }
            </Col>
            <Col md={3} xs={12} sm={12}>
              <Row>
                <RightSideBar />
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToprops = (store) => ({
  paymentOptions: selectors.getPaymentOptions(store)
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      createOrder: actionCreaters.createOrder,
      doPayment: actionCreaters.doPayment,
    },
    dispatch,
  );


export default connect(mapStateToprops, mapDispatchToProps)(Payments);


