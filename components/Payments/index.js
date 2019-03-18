import React from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Row, Col } from 'react-bootstrap';
import Cookies from 'universal-cookie';

import Cart from '../Cart';
import SignIn from './includes/SignIn';
import PaymentMode from './includes/PaymentMode';
import PaymentHeader from './includes/PaymentHeader';
import LoyaltyPoints from './includes/LoyaltyPoints';
import OffersAndDiscounts from './includes/OffersAndDiscounts';
import RightSideBar from '../common/CartPaymentSideBar';
import { languageDefinations } from '../../utils/lang/';
import DeliveryAddress from './includes/DeliveryAddress';
import { actionCreators, selectors } from '../../store/payments';
import { actionCreators as authActionCreators, selectors as authSelectors } from '../../store/auth';
import { actionCreators as cartActionCreators, selectors as cartSelectors } from '../../store/cart';
import { mergeCss } from '../../utils/cssUtil';

const styles = mergeCss('components/Payments/payment');
const cookies = new Cookies();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

class Payments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: {
        username: '',
        password: '',
      },
      paymentConfigJson: {
        signIn: {
          basic: false,
          progress: true,
          done: false,
        },
        address: {
          basic: true,
          progress: false,
          done: false,
        },
        loyaltyPoints: {
          basic: true,
          progress: false,
          done: false,
        },
        offersDiscounts: {
          basic: true,
          progress: false,
          done: false,
        },
        payment: {
          basic: true,
          progress: false,
          done: false,
        },
      },
      showTab: 0,// to show payment tabs
      paymentOptions: {}, // which payment options to show.
      loggedInFlag: false,
      signInLoader: false,
      editCartDetails: true,
    }

    this.saveCard = this.saveCard.bind(this);
    this.makePayment = this.makePayment.bind(this);
    this.inputOnChange = this.inputOnChange.bind(this);
    this.editAddressTab = this.editAddressTab.bind(this);
    this.showAddressTab = this.showAddressTab.bind(this);
    // this.editLoyalityTab = this.editLoyalityTab.bind(this);
    this.showPaymentType = this.showPaymentType.bind(this);
    this.handleLoyaltyBtn = this.handleLoyaltyBtn.bind(this);
    this.handleOffersDiscountsTab = this.handleOffersDiscountsTab.bind(this);
    this.handleShippingAddressContinue = this.handleShippingAddressContinue.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // if cart is empty redirect to cart page.
    // if user hits payment url directly and no cart items, this condition will execute.
    if (nextProps.cartResults.items.length === 0 && nextProps.cartResults.ui.loaded) {
      Router.push(`/${country}/${language}/cart`);
    }
    const { loggedInFlag } = this.state;

    // Dont remove
    // Clicking on pay button and after getting response, we will redirect to given URL.
    // if (nextProps && nextProps.makePaymentOptions && nextProps.makePaymentOptions.redirect_url) {
    //   location.href = nextProps.makePaymentOptions.redirect_url;
    // }

    // console.log(nextProps)

    // if loggedin show address step directly.
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
  showAddressTab() {
    this.setState({ signInLoader: true });
    this.props.userLogin(this.state.login);
    const paymentConfigJson = { ...this.state.paymentConfigJson };
    paymentConfigJson['signIn'] = { basic: false, progress: false, done: true };
    this.setState({paymentConfigJson});
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
  // NOT USING - remove 6 months later after PCD-IS [31-Jul-2018]
  makePayment() {
    const { paymentOptions } = this.props;
    const paymentjson = {
      payment_details: [
        {
          amount: 0,
          currency: '',
          payment_mode: '',
        },
      ],
      redirect_url: `${window.location.origin}/${country}/${language}`,
      transaction_id: '',
    };
    paymentjson.payment_details[0].amount = paymentOptions.data.amount;
    paymentjson.payment_details[0].currency = paymentOptions.data.currency;
    paymentjson.payment_details[0].payment_mode = 'PAY_ONLINE';
    paymentjson.transaction_id = paymentOptions.data.transaction_id;
    this.props.doPayment(paymentjson);
  }

  handleShippingAddressContinue(e) {
    const { editCartDetails } = this.state;
    if (this.props.defaultAddress[0]) {
      const defaultAddrId = this.props.defaultAddress[0].address_id;
      this.props.createOrder(defaultAddrId)

      const paymentConfigJson = { ...this.state.paymentConfigJson };
      paymentConfigJson['address'] = { basic: false, progress: false, done: true };
      paymentConfigJson['loyaltyPoints'] = { basic: false, progress: true, done: false };
      paymentConfigJson['offersDiscounts'] = { basic: true, progress: false, done: false };
      paymentConfigJson['payment'] = { basic: true, progress: false, done: false };
      this.setState({ paymentConfigJson, editCartDetails: !editCartDetails });
    } else {
      alert('Please add a delivery address.');
    }

  }

  handleLoyaltyBtn() {
    const paymentConfigJson = { ...this.state.paymentConfigJson };
    paymentConfigJson['address'] = { basic: false, progress: false, done: true };
    paymentConfigJson['loyaltyPoints'] = { basic: false, progress: false, done: true };
    paymentConfigJson['offersDiscounts'] = { basic: false, progress: true, done: false };
    paymentConfigJson['payment'] = { basic: true, progress: false, done: false };
    this.setState({ paymentConfigJson });
  }

  // editLoyalityTab() {

  // }

  handleOffersDiscountsTab() {
    const paymentConfigJson = { ...this.state.paymentConfigJson };
    paymentConfigJson['address'] = { basic: false, progress: false, done: true };
    paymentConfigJson['loyaltyPoints'] = { basic: false, progress: false, done: true };
    paymentConfigJson['offersDiscounts'] = { basic: false, progress: false, done: true };
    paymentConfigJson['payment'] = { basic: false, progress: true, done: false };
    this.setState({ paymentConfigJson });
  }

  editAddressTab() {
    const { editCartDetails } = this.state;
    const paymentConfigJson = { ...this.state.paymentConfigJson };
    paymentConfigJson['address'] = { basic: false, progress: true, done: false };
    paymentConfigJson['loyaltyPoints'] = { basic: true, progress: false, done: false };
    paymentConfigJson['offersDiscounts'] = { basic: true, progress: false, done: false };
    paymentConfigJson['payment'] = { basic: true, progress: false, done: false };

    this.setState({ paymentConfigJson, editCartDetails: !editCartDetails });

    //clearing payment reducer on address edit button.
    this.props.emptyPaymentPaylod();
  }

  saveCard(e) {
    const { paymentOptions } = this.props;
    this.props.saveCard({
      save_card: e.target.checked,
      transaction_id: paymentOptions.data.transaction_id,
      user_id: "",
    });
  }

  onClickEdit() {
    const paymentConfigJson = { ...this.state.paymentConfigJson };
    paymentConfigJson['signIn'] = { basic: false, progress: true, done: false };
    this.setState({paymentConfigJson});
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
                signInLoader={signInLoader}
                showAddressTab={this.showAddressTab}
                inputOnChange={this.inputOnChange}
                configJson={paymentConfigJson.signIn}
                onClickEdit={this.onClickEdit}
              />
              <DeliveryAddress
                defaultAddress={defaultAddress}
                editAddressTab={this.editAddressTab}
                configJson={paymentConfigJson.address}
                handleShippingAddressContinue={this.handleShippingAddressContinue}
              />
              <LoyaltyPoints
                editLoyalityTab={this.editLoyalityTab}
                handleLoyaltyBtn={this.handleLoyaltyBtn}
                configJson={paymentConfigJson.loyaltyPoints}
              />
              <OffersAndDiscounts
                configJson={paymentConfigJson.offersDiscounts}
                handleOffersDiscountsTab={this.handleOffersDiscountsTab}
              />
              <PaymentMode
                showTab={showTab}
                data={paymentOptions}
                saveCard={this.saveCard}
                makePayment={this.makePayment}
                showPaymentType={this.showPaymentType}
                configJson={paymentConfigJson.payment}
              />
            </Col>
            <Col md={3} xs={12} sm={12} className={`${styles['pl-5']} ${styles['landscape-pr-0']} ${styles['m-p-l-15']}`}>
              <div>
                {
                  cartResults && cartResults.total_price ?
                    <div className={`${styles['box']} ${styles['payment-summary']}`}>
                      <RightSideBar
                        data={cartResults}
                        showInstant={false}
                      />
                      <Cart
                        showMiniCart={true}
                        cartData={cartResults}
                        editCartDetails={editCartDetails}
                      />
                    </div>
                    : null
                }
                <div className={styles['secure-img']}>
                  <img className={styles['']} src={"/static/img/bg-img/group-cards.png"} />
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
  userCreds: authSelectors.getUserCreds(store),
  cartResults: cartSelectors.getCartResults(store),
  paymentOptions: selectors.getPaymentOptions(store),
  makePaymentOptions: selectors.getPaymentUrl(store),
  defaultAddress: selectors.getDefaultAddress(store),
  isLoggedIn: authSelectors.getLoggedInStatus(store),
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      saveCard: actionCreators.saveCard,
      doPayment: actionCreators.doPayment,
      userLogin: authActionCreators.userLogin,
      createOrder: actionCreators.createOrder,
      getLoginInfo: authActionCreators.getLoginInfo,
      getCartResults: cartActionCreators.getCartResults,
      emptyPaymentPaylod: actionCreators.emptyPaymentPaylod,
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


