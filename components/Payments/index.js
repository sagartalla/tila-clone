import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, selectors } from '../../store/payments';

import { actionCreators as authActionCreators, selectors as authSelectors } from '../../store/auth';

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
        username: '',
        password: ''
      },
      paymentConfigJson: {
        signIn: {
          basic: false,
          progress: true,
          done: false
        },
        address: {
          basic: true,
          progress: false,
          done: false
        },
        payment: {
          basic: true,
          progress: false,
          done: false
        }
      },
      showTab: 0,// to show payment tabs
      paymentOptions: {}, // which payment options to show.
      loggedInFlag: false
    }

    this.inputOnChange = this.inputOnChange.bind(this);
    this.showPaymentType = this.showPaymentType.bind(this);
    this.makePayment = this.makePayment.bind(this);
    this.showAddress = this.showAddress.bind(this);
    this.editAddress = this.editAddress.bind(this);
    this.handleShippingAddressContinue = this.handleShippingAddressContinue.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {loggedInFlag} = this.state;
    // Clicking on pay button and after getting response, we will redirect to given URL.
    if (nextProps && nextProps.makePaymentOptions && nextProps.makePaymentOptions.redirect_url) {
      location.href = nextProps.makePaymentOptions.redirect_url;
    }

    if(nextProps.isLoggedIn && !loggedInFlag){
      // console.log(localStorage)
      const login = nextProps.userCreds || this.state.login;
      const paymentConfigJson = { ...this.state.paymentConfigJson };

      paymentConfigJson['signIn'] = { basic: false, progress: false, done: true };
      paymentConfigJson['address'] = { basic: false, progress: true, done: false };
      this.setState({ paymentConfigJson, login, loggedInFlag: true });
    }
  }

  componentDidMount() {
    // TODO move it to base component later after discussion on login.
    this.props.getLoginInfo();
  }

  //TODO Show loader on clicking on login button.
  showAddress() {
    this.props.userLogin(this.state.login);
  }

  inputOnChange(e) {
    const { login } = this.state;
    login[e.target.name] = e.target.value;
    this.setState({ login });
  }

  // onclick payment method tabs.
  showPaymentType(value) {
    this.setState({ showTab: value });
  }

  // Clicking on pay button
  // TODO make paymentjson manipulation as util
  makePayment() {
    const { paymentOptions } = this.props;
    const paymentjson = {
      "payment_details": [
        {
          "amount": 0,
          "currency": "",
          "payment_mode": ""
        }
      ],
      "transaction_id": "string"
    }
    paymentjson.payment_details[0].amount = paymentOptions.data.amount;
    paymentjson.payment_details[0].currency = paymentOptions.data.currency;
    paymentjson.payment_details[0].payment_mode = 'PAY_ONLINE';
    paymentjson.transaction_id = paymentOptions.data.transaction_id;
    this.props.doPayment(paymentjson);
  }

  // TODO Send params with cart info.
  // TODO payment page should show after AJAX call is with success.
  handleShippingAddressContinue(e) {
    this.props.createOrder()

    const paymentConfigJson = { ...this.state.paymentConfigJson };
    paymentConfigJson['address'] = { basic: false, progress: false, done: true };
    paymentConfigJson['payment'] = { basic: false, progress: true, done: false };
    this.setState({ paymentConfigJson });
  }

  editAddress() {
    const paymentConfigJson = { ...this.state.paymentConfigJson };
    paymentConfigJson['address'] = { basic: false, progress: true, done: false };
    this.setState({ paymentConfigJson });
  }

  render() {
    const { login, showTab, paymentConfigJson } = this.state;
    const { paymentOptions, defaultAddress, isLoggedIn } = this.props;

    // console.log("LoggedIn",isLoggedIn)
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
                configJson={paymentConfigJson.signIn}
                showAddress={this.showAddress}
              />
              <DeliveryAddress
                handleShippingAddressContinue={this.handleShippingAddressContinue}
                configJson={paymentConfigJson.address}
                defaultAddress={defaultAddress}
                editAddress={this.editAddress}
              />
              <PaymentMode
                data={paymentOptions}
                showTab={showTab}
                showPaymentType={this.showPaymentType}
                makePayment={this.makePayment}
                configJson={paymentConfigJson.payment}
              />
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
  paymentOptions: selectors.getPaymentOptions(store),
  makePaymentOptions: selectors.getPaymentUrl(store),
  defaultAddress: selectors.getDefaultAddress(store),
  isLoggedIn: authSelectors.getLoggedInStatus(store),
  userCreds: authSelectors.getUserCreds(store),
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      createOrder: actionCreators.createOrder,
      doPayment: actionCreators.doPayment,
      userLogin: authActionCreators.userLogin,
      getLoginInfo: authActionCreators.getLoginInfo,
    },
    dispatch,
  );

Payments.propTypes = {
  paymentOptions: PropTypes.object,
  // defaultAddress: PropTypes.array
};

Payments.defaultProps = {

};

export default connect(mapStateToprops, mapDispatchToProps)(Payments);


