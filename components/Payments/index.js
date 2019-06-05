import React from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Row, Col } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';

import Cart from '../Cart';
import SignIn from './includes/SignIn';
import PaymentMode from './includes/PaymentMode';
import HeaderBar from '../HeaderBar';
import LoyaltyPoints from './includes/LoyaltyPoints';
import OffersAndDiscounts from './includes/OffersAndDiscounts';
import RightSideBar from '../Cart/CartPaymentSideBar';
import { languageDefinations } from '../../utils/lang/';
import DeliveryAddress from './includes/DeliveryAddress';
import { actionCreators, selectors } from '../../store/payments';
import { actionCreators as cartAction } from '../../store/cart'
import { actionCreators as authActionCreators, selectors as authSelectors } from '../../store/auth';
import { actionCreators as cartActionCreators, selectors as cartSelectors } from '../../store/cart';
import Slider from '../common/slider';
import Coupon from '../Cart/CartPaymentSideBar/coupons';
import FormValidator from '../common/FormValidator';

import lang from '../../utils/language';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './payment_en.styl';
import styles_ar from './payment_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const cookies = new Cookies();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

class Payments extends React.Component {
  constructor(props) {
    super(props);
    this.validations = new FormValidator([
      {
        field: 'username',
        method: this.validateEmail,
        message: 'Enter valid emailid',
        validWhen: false,
      },
      {
        field: 'password',
        method: this.validateLengthPassword,
        message: 'Password must be atleast 8 characters',
        validWhen: false,
      },
    ]);
    this.state = {
      login: {
        username: '',
        password: '',
      },
      validation: this.validations.valid(),
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
      editCartDetails: true,
      showSlider: false,
      showError: false,
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
    this.checkBoxChange = this.checkBoxChange.bind(this);
  }

  componentDidMount() {
    // TODO move it to base component later after discussion on login.
    this.props.getLoginInfo();
    this.props.getCartResults();
  }

  componentWillReceiveProps(nextProps) {
    // if cart is empty redirect to cart page.
    // if user hits payment url directly and no cart items, this condition will execute.
    if (nextProps.cartResults.items.length === 0 && nextProps.cartResults.ui.loading) {
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
      this.setState({
        paymentConfigJson, login, loggedInFlag: true,
      });
    }
  }

  onClickEdit() {
    const paymentConfigJson = { ...this.state.paymentConfigJson };
    paymentConfigJson.signIn = { basic: false, progress: true, done: false };
    paymentConfigJson.address = {
      basic: true,
      progress: false,
      done: false,
    };
    this.setState({
      paymentConfigJson,
      loggedInFlag: false,
    });
  }


  checkBoxChange(e) {
    let { showError } = this.state;
    if (!e.target.checked) {
      showError = true;
    } else {
      showError = false;
    }
    this.setState({
      showError,
    });
  }

  inputOnChange(e) {
    const { login } = this.state;
    login[e.target.name] = e.target.value;
    this.setState({ login });
  }
  // onclick payment method tabs.
  showPaymentType(value) {
    /* method not used */
    this.setState({ showTab: value });
  }

  // Clicking on pay button
  // TODO make paymentjson manipulation as util
  // NOT USING - remove 6 months later after PCD-IS [31-Jul-2018]
  makePayment() {
    /* method not used */
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
    const selectedAddrId = this.props.selectedAddress.address_id;
    if (selectedAddrId) {
      this.props.createOrder(selectedAddrId)
      const paymentConfigJson = { ...this.state.paymentConfigJson };
      paymentConfigJson['address'] = { basic: false, progress: false, done: true };
      // paymentConfigJson['loyaltyPoints'] = { basic: false, progress: true, done: false };
      // paymentConfigJson['offersDiscounts'] = { basic: true, progress: false, done: false };
      paymentConfigJson['payment'] = { basic: false, progress: true, done: false };
      this.setState(
       { paymentConfigJson, editCartDetails: !editCartDetails }
      ,() => this.props.cartEditDetails(this.state.editCartDetails));
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

    this.setState({ paymentConfigJson, editCartDetails: !editCartDetails },() => this.props.cartEditDetails(this.state.editCartDetails));

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

  //TODO Show loader on clicking on login button.
  showAddressTab() {
    const validation = this.validations.validate(this.state.login);
    const { showError } = this.state;
    if (validation.isValid && !showError) {
      const serverData = {
        channel: 'BASIC_AUTH',
        metadata: this.state.login,
        rememberMe: true,
      };

      this.props.userLogin(serverData);
    }
    this.setState({
      validation,
    });
  }

  validateEmail = (fieldvalue, state) => {
    const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailReg.test(fieldvalue)) return false;
    return true;
  }

  validateLengthPassword = (fieldvalue, state) => {
    if (fieldvalue.length >= 8) return false;
    return true;
  }

  validatePassword = (fieldvalue, state) => {
    const passreg = /^([a-zA-Z0-9_-]){8,30}$/;
    if (passreg.test(fieldvalue)) return false;
    return true;
  }

  openSlider = () => {
    this.setState({
      showSlider: true,
    });
  }
  closeSlider = () => {
    this.setState({
      showSlider: false,
    });
  }
  render() {
    const { login, showTab, paymentConfigJson, editCartDetails, showSlider, validation, showError } = this.state;
    const { paymentOptions, selectedAddress, signInLoader, isLoggedIn, cartResults } = this.props;
    const { PAYMENT_PAGE, CART_PAGE } = languageDefinations();

    return (
      <div className={styles['payment']}>
        <HeaderBar hideSearch hideMegamenu/>
        <Grid className={styles['pt-50']}>
          <Row>
            <Col xs={12} md={12} sm={12}>
              <h4 className={`${styles['mt-30']} ${styles['mb-20']} ${styles['fontW600']} ${styles['light-gry-clr']}`}>{PAYMENT_PAGE.SECURE_CHECKOUT}</h4>
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
                validation={validation}
                checkBoxChange={this.checkBoxChange}
                showError={showError}
              />
              <DeliveryAddress
                selectedAddress={selectedAddress}
                editAddressTab={this.editAddressTab}
                configJson={paymentConfigJson.address}
                handleShippingAddressContinue={this.handleShippingAddressContinue}
                showNonShippable
              />
            {/*<LoyaltyPoints
                editLoyalityTab={this.editLoyalityTab}
                handleLoyaltyBtn={this.handleLoyaltyBtn}
                configJson={paymentConfigJson.loyaltyPoints}
              />*/}
              {/*<OffersAndDiscounts
                configJson={paymentConfigJson.offersDiscounts}
                handleOffersDiscountsTab={this.handleOffersDiscountsTab}
              />*/}
              <PaymentMode
                data={paymentOptions}
                saveCard={this.saveCard}
                makePayment={this.makePayment}
                showPaymentType={this.showPaymentType}
                configJson={paymentConfigJson.payment}
              />
            </Col>
            <Col md={3} xs={12} sm={12} className={`${styles['pl-5']} ${styles['landscape-pr-0']} ${styles['sidebar-payment']} ${styles['m-p-l-15']}`}>
              <div>
                {
                  cartResults && (cartResults.total_price.money_value === 0 || cartResults.total_price.money_value > 0) ?
                    <div className={`${styles['box']} ${styles['payment-summary']}`}>
                      <RightSideBar
                        data={cartResults}
                        showInstant={false}
                        openSlider={this.openSlider}
                      />
                      <Cart
                        showMiniCart={true}
                        cartData={cartResults}
                        editCartDetails={editCartDetails}
                      />
                    </div>
                    : null
                }
                {/*<div className={styles['secure-img']}>
                  <img className={styles['']} src={"/static/img/bg-img/group-cards.png"} />
                </div>*/}
              </div>
            </Col>
          </Row>
        </Grid>
        {
        showSlider &&
          <Slider
            closeSlider={this.closeSlider}
            isOpen={showSlider}
            label={CART_PAGE.COUPONS}
          >
            <Coupon
              closeSlider={this.closeSlider}
              openSlider={this.openSlider}
            />
          </Slider>
        }
      </div>
    );
  }
}

const mapStateToprops = store => ({
  userCreds: authSelectors.getUserCreds(store),
  cartResults: cartSelectors.getCartResults(store),
  paymentOptions: selectors.getPaymentOptions(store),
  makePaymentOptions: selectors.getPaymentUrl(store),
  isLoggedIn: authSelectors.getLoggedInStatus(store),
  signInLoader: authSelectors.getLoginProgressStatus(store),
  selectedAddress: selectors.getSelectedAddress(store),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      saveCard: actionCreators.saveCard,
      doPayment: actionCreators.doPayment,
      userLogin: authActionCreators.userLogin,
      createOrder: actionCreators.createOrder,
      getLoginInfo: authActionCreators.getLoginInfo,
      getCartResults: cartActionCreators.getCartResults,
      emptyPaymentPaylod: actionCreators.emptyPaymentPaylod,
      cartEditDetails:cartAction.cartEditDetails
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
