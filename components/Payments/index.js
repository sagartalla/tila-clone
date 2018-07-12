import React from 'react';
import { languageDefinations } from '../../utils/lang/';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, selectors } from '../../store/payments';

import { actionCreators as authActionCreators, selectors as authSelectors } from '../../store/auth';
import { actionCreators as cartActionCreators, selectors as cartSelectors } from '../../store/cart';

import PaymentHeader from './includes/PaymentHeader';

import RightSideBar from '../common/CartPaymentSideBar';

import SignIn from './includes/SignIn';
import DeliveryAddress from './includes/DeliveryAddress';
import PaymentMode from './includes/PaymentMode';

import Cart from '../Cart';

import { mergeCss } from '../../utils/cssUtil';
const styles = mergeCss('components/Payments/payment');

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
      loggedInFlag: false,
      signInLoader: false,
      editCartDetails: true,
    }

    this.inputOnChange = this.inputOnChange.bind(this);
    this.showPaymentType = this.showPaymentType.bind(this);
    this.makePayment = this.makePayment.bind(this);
    this.showAddress = this.showAddress.bind(this);
    this.editAddress = this.editAddress.bind(this);
    this.handleShippingAddressContinue = this.handleShippingAddressContinue.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // if cart is empty redirect to cart page.
    // if user hits payment url directly and no cart items, this condition will execute.
    if (nextProps.cartResults.items.length === 0 && nextProps.cartResults.ui.loaded) {
      Router.push('/cart');
    }
    const { loggedInFlag } = this.state;
    // Clicking on pay button and after getting response, we will redirect to given URL.
    if (nextProps && nextProps.makePaymentOptions && nextProps.makePaymentOptions.redirect_url) {
      location.href = nextProps.makePaymentOptions.redirect_url;
    }

    if (nextProps.isLoggedIn && !loggedInFlag) {
      const login = nextProps.userCreds || this.state.login;
      const paymentConfigJson = { ...this.state.paymentConfigJson };

      paymentConfigJson['signIn'] = { basic: false, progress: false, done: true };
      paymentConfigJson['address'] = { basic: false, progress: true, done: false };
      this.setState({ paymentConfigJson, login, loggedInFlag: true, signInLoader: false });
    }
  }

  componentDidMount() {
    // TODO move it to base component later after discussion on login.
    this.props.getLoginInfo();
    this.props.getCartResults();
  }

  //TODO Show loader on clicking on login button.
  showAddress() {
    this.setState({ signInLoader: true });
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

  handleShippingAddressContinue(e) {
    const { editCartDetails } = this.state;
    const defaultAddrId = this.props.defaultAddress[0].address_id;
    this.props.createOrder(defaultAddrId)

    const paymentConfigJson = { ...this.state.paymentConfigJson };
    paymentConfigJson['address'] = { basic: false, progress: false, done: true };
    paymentConfigJson['payment'] = { basic: false, progress: true, done: false };
    this.setState({ paymentConfigJson, editCartDetails: !editCartDetails });
  }

  editAddress() {
    const { editCartDetails } = this.state;
    const paymentConfigJson = { ...this.state.paymentConfigJson };
    paymentConfigJson['address'] = { basic: false, progress: true, done: false };
    paymentConfigJson['payment'] = { basic: true, progress: false, done: false };
    this.setState({ paymentConfigJson, editCartDetails: !editCartDetails });

    //clearing payment reducer on address edit button.
    this.props.emptyPaymentPaylod();
  }

  render() {
    const { login, showTab, paymentConfigJson, signInLoader, editCartDetails } = this.state;
    const { paymentOptions, defaultAddress, isLoggedIn, cartResults } = this.props;
    const { PAYMENT_PAGE } = languageDefinations();

    return (
      <div className={styles['payment']}>
        <PaymentHeader />
        <Grid>
          <Row>
            <Col xs={12} md={12} sm={12}>
              <h4 className={`${styles['mt-30']} ${styles['mb-20']} ${styles['light-gry-clr']}`}>{PAYMENT_PAGE.SECURE_CHECKOUT}</h4>
            </Col>
          </Row>
          <Row>
            <Col md={9} xs={12} sm={12} className={`${styles['pl-30']}`}>
              <SignIn
                login={login}
                inputOnChange={this.inputOnChange}
                configJson={paymentConfigJson.signIn}
                showAddress={this.showAddress}
                signInLoader={signInLoader}
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
            <Col md={3} xs={12} sm={12} className={`${styles['pl-5']}`}>
              <div>
                {
                  cartResults && cartResults.total_price ?
                    <div className={`${styles['box']} ${styles['payment-summary']}`}>
                      <RightSideBar
                        data={cartResults}
                      />
                      <Cart
                        paymentPageInclude={true}
                        cartData={cartResults}
                        editCartDetails={editCartDetails}
                      />
                    </div>
                    : null
                }
                <div className={styles['secure-img']}>
                  <img className={styles['']} src={"/static/img/bg-img/group-cards.png"}/>
                </div>
              </div>
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
  cartResults: cartSelectors.getCartResults(store),
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      createOrder: actionCreators.createOrder,
      doPayment: actionCreators.doPayment,
      emptyPaymentPaylod: actionCreators.emptyPaymentPaylod,
      userLogin: authActionCreators.userLogin,
      getLoginInfo: authActionCreators.getLoginInfo,
      getCartResults: cartActionCreators.getCartResults,
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


