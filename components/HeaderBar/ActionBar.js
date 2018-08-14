import React, { Component } from 'react';
import { Modal } from "react-router-modal";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ModalContainer } from 'react-router-modal';
import { Dropdown, MenuItem } from "react-bootstrap";
import { selectors as personalSelectors } from '../../store/cam/personalDetails';
import Cart from '../Cart';
import Login from '../Login';
import { Link } from '../../routes';
import Country from './includes/Country';
import publicUrls from '../../constants';
import SVGComponent from '../common/SVGComponet';

import { selectors, actionCreators } from '../../store/auth';
import { actionCreators as cartActionCreators, selectors as cartSelectors } from '../../store/cart';
import { languageDefinations } from '../../utils/lang'
import { mergeCss } from '../../utils/cssUtil';
const styles = mergeCss('components/HeaderBar/header');
const {HEADER_PAGE} = languageDefinations();

class ActionBar extends Component {
  constructor(props) {
    super(props);
    this.logoutClick = this.logoutClick.bind(this);
    this.loginClick = this.loginClick.bind(this);
    this.onBackdropClick = this.onBackdropClick.bind(this);
  }

  state = {
    show: false,
    isHidden: true,
    isCountryToggle: true
  }

  componentDidMount() {
    this.props.getLoginInfo();
    this.props.getCartResults();
  }

  componentWillReceiveProps(nextProps) {
    const show = (!nextProps.isLoggedIn && (nextProps.isLoggedIn != this.props.isLoggedIn) && !this.state.logoutClicked) || this.state.loginClicked || !!nextProps.error || nextProps.loginInProgress || (!nextProps.isLoggedIn && nextProps.showLogin);
    // console.log('show:',show,'nextProps.isLoggedIn', nextProps.isLoggedIn, 'this.props.isLoggedIn', this.props.isLoggedIn, 'this.state.logoutClicked', this.state.logoutClicked, 'nextProps.error', nextProps.error, 'nextProps.loginInProgress', nextProps.loginInProgress);
    this.setState({
      show: show,
      logoutClicked: false,
      loginClicked: false
    });
  }

  logoutClick() {
    this.setState({
      logoutClicked: true,
    }, () => {
      this.props.logout();
    })
  }

  loginClick(e) {
    const state = {};
    state.loginClicked = true;
    if (e.currentTarget.getAttribute('data-mode') === 'sign-up') {
      state.mode = 'register';
    } else {
      state.mode = 'login';
    }
    state.show = true;
    this.setState(state);
  }

  onBackdropClick() {
    this.setState({ show: false });
    this.props.resetLoginError();
    this.props.resetShowLogin();
  }

  render() {
    const { isLoggedIn, cartResults, userInfo } = this.props;
    return (
      <div className={styles['actionbar-wrapper']}>
        <div className={`${styles['action-item']} ${styles['flex-center']} ${styles['justify-center']} ${styles['country-code']}`}>
          <Country />
        </div>
        <div className={`${styles['action-item']} ${styles['flex-center']} ${styles['justify-center']}`}>
          <Link route="/cam/wishlist">
            <span className={`${styles['flex-center']} ${styles['justify-center']}`}>
              <SVGComponent clsName={`${styles['wish-list-icon']}`} src="icons/wish-list/wish-list-icon" />
            </span>
          </Link>
        </div>
        <div className={`${styles['action-item']} ${styles['flex-center']} ${styles['justify-center']}`}>
          <Dropdown id="cart-toggle" className={`${styles['cart-inn']} ${styles['profile-login-inn']}`}>
            <Dropdown.Toggle>
              <Link route="/cart">
                <span className={`${styles['flex-center']} ${styles['justify-center']} ${styles['relative']}`}>
                  <SVGComponent clsName={`${styles['cart-icon']}`} src="icons/cart/cart-icon" />
                  <span className={`${styles['absolute']} ${styles['cart-count']} ${styles['fs-10']} ${styles['white-color']}`}>{cartResults.items.length}</span>
                </span>
              </Link>
            </Dropdown.Toggle>
            <Dropdown.Menu className={`${styles['cart-item']}`}>
              <span>
                <Cart
                  showMiniCart={true}
                  showCheckOutBtn={true}
                  cartData={cartResults}
                  editCartDetails={true}
                />
              </span>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className={`${styles['action-item']} ${styles['flex-center']} ${styles['justify-center']} ${styles['relative']} ${styles['profile-login']}`}>
          <Dropdown id="profile-login" className={styles['profile-login-inn']}>
            <Dropdown.Toggle>
              <span className={`${styles['flex-center']} ${styles['justify-center']} ${styles['profile-icon-main']}`}>
                <SVGComponent clsName={`${styles['profile-icon']}`} src="icons/profile-icons/round-profile" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu className={`${styles['item']}`}>
              <div className={styles['profile-part']}>
                <div className={`${styles['flex-center']} ${styles['ple-icon']}`}>
                  <span className={styles['icon']}></span>
                  <span className={styles['pl-15']}>Hello {userInfo.personalInfo.first_name || `${HEADER_PAGE.TILA_CUSTOMER}` }</span>
                </div>
                <ul className={`${styles['pl-0']} ${styles['profile-inn']}`}>
                  <li className={`${styles['flex-center']} ${styles['pl-30']} ${styles['pr-20']}`}>
                    <a href="/cam" className={styles['flex-center']}>
                    <SVGComponent clsName={`${styles['profile-icon']}`} src="icons/profile-icons/round-profile" />
                    <span className={styles['pl-20']}>{HEADER_PAGE.MY_ACCOUNT}</span>
                    </a>
                  </li>
                  <li className={`${styles['flex-center']} ${styles['pl-30']} ${styles['pr-20']}`}>
                    <a href="/cam/orders" className={styles['flex-center']}>
                      <SVGComponent clsName={`${styles['profile-icon']}`} src="icons/my-orders" />
                      <span className={styles['pl-20']}>{HEADER_PAGE.MY_ORDERS}</span>
                    </a>
                  </li>
                  <li className={`${styles['flex-center']} ${styles['pl-30']} ${styles['pr-20']}`}>
                  <a href="/cam/notifications" className={styles['flex-center']}>
                    <SVGComponent clsName={`${styles['profile-icon']}`} src="icons/notifications" />
                    <span className={styles['pl-20']}>{HEADER_PAGE.NOTIFICATIONS}</span>
                    </a>
                  </li>
                  <li className={`${styles['flex-center']} ${styles['pl-30']} ${styles['pr-20']}`}>
                    <a href={"http://omc-dev.fptechscience.com/login?p_next_page=faq%2Ffaq"} target="_blank" className={styles['flex-center']}><span className={styles['support']}><span className={`${styles['flex-center']} ${styles['justify-center']}`}>?</span></span>
                      <span className={styles['pl-20']}>{HEADER_PAGE.HELP_SUPPORT}</span></a>
                  </li>
                  <li className={`${styles['flex-center']} ${styles['pl-30']} ${styles['pr-20']}`}>
                    {isLoggedIn
                      ?
                      <span onClick={this.logoutClick} className={`${styles['flex-center']} ${styles['login-details-inn']} ${styles['pointer']}`}>
                        <SVGComponent clsName={`${styles['logout-icon']}`} src="icons/common-icon/icon-logout" />
                        <span className={`${styles['pl-20']} `}>{HEADER_PAGE.LOGOUT}</span>
                      </span>
                      :
                      <span onClick={this.loginClick} className={`${styles['flex-center']} ${styles['login-details-inn']} ${styles['pointer']}`}>
                        <SVGComponent clsName={`${styles['login-icon']}`} src="icons/common-icon/icon-login" />
                        <span className={`${styles['pl-20']}`}>{HEADER_PAGE.LOGIN}</span>
                      </span>
                    }
                  </li>
                </ul>

              </div>
            </Dropdown.Menu>
          </Dropdown>

        </div>
        {
          (this.state.show)
            ?
            (
              <Modal className={`react-router-modal__modal ${styles['login-reg-modal']} ${styles['p-20']}`} onBackdropClick={this.onBackdropClick}>
                <Login mode={this.state.mode} />
              </Modal>
            )
            :
            null}
      </div>
    );
  }
}


const mapStateToProps = (store) => {
  return ({
    error: selectors.getErrorMessege(store),
    isLoggedIn: selectors.getLoggedInStatus(store),
    cartResults: cartSelectors.getCartResults(store),
    loginInProgress: selectors.getLoginProgressStatus(store),
    userInfo: personalSelectors.getUserInfo(store),
    showLogin: selectors.getShowLogin(store),
  })
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getLoginInfo: actionCreators.getLoginInfo,
      logout: actionCreators.userLogout,
      getCartResults: cartActionCreators.getCartResults,
      resetLoginError: actionCreators.resetLoginError,
      resetShowLogin: actionCreators.resetShowLogin,
    },
    dispatch,
  );
}


export default connect(mapStateToProps, mapDispatchToProps)(ActionBar);
