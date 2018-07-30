import React, { Component } from 'react';
import { Modal } from "react-router-modal";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ModalContainer } from 'react-router-modal';
import { Dropdown, MenuItem } from "react-bootstrap";

import Cart from '../Cart';
import Login from '../Login';
import { Link } from '../../routes';
import Country from './includes/Country';
import publicUrls from '../../constants';
import SVGComponent from '../common/SVGComponet';

import { selectors, actionCreators } from '../../store/auth';
import { actionCreators as cartActionCreators, selectors as cartSelectors } from '../../store/cart';

import { mergeCss } from '../../utils/cssUtil';
const styles = mergeCss('components/HeaderBar/header');

class ActionBar extends Component {
  constructor(props) {
    super(props);
    this.logoutClick = this.logoutClick.bind(this);
    this.loginClick = this.loginClick.bind(this);
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
    this.setState({
      show: !nextProps.isLoggedIn && !this.state.logoutClicked,
      logoutClicked: false
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
    if (e.currentTarget.getAttribute('data-mode') === 'sign-up') {
      state.mode = 'register';
    } else {
      state.mode = 'login';
    }
    state.show = true;
    this.setState(state);
  }

  render() {
    const { isLoggedIn, cartResults } = this.props;
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
                  <span className={styles['pl-15']}>Hello Guest</span>
                </div>
                <ul className={`${styles['pl-0']} ${styles['profile-inn']}`}>
                  <li className={`${styles['flex-center']} ${styles['pl-30']} ${styles['pr-20']}`}>
                    <SVGComponent clsName={`${styles['profile-icon']}`} src="icons/profile-icons/round-profile" />
                    <span className={styles['pl-20']}>My Account</span>
                  </li>
                  <li className={`${styles['flex-center']} ${styles['pl-30']} ${styles['pr-20']}`}>
                    <a href="/cam" className={styles['flex-center']}>
                      <SVGComponent clsName={`${styles['profile-icon']}`} src="icons/my-orders" />
                      <span className={styles['pl-20']}>My Orders </span>
                    </a>
                  </li>
                  <li className={`${styles['flex-center']} ${styles['pl-30']} ${styles['pr-20']}`}>
                    <SVGComponent clsName={`${styles['profile-icon']}`} src="icons/notifications" />
                    <span className={styles['pl-20']}>Notification </span>
                  </li>
                  <li className={`${styles['flex-center']} ${styles['pl-30']} ${styles['pr-20']}`}>
                    <a href={publicUrls.customerHelp} className={styles['flex-center']}><span className={styles['support']}><span className={`${styles['flex-center']} ${styles['justify-center']}`}>?</span></span>
                      <span className={styles['pl-20']}>Help & Support</span></a>
                  </li>
                  <li className={`${styles['flex-center']} ${styles['pl-30']} ${styles['pr-20']}`}>
                    {isLoggedIn
                      ?
                      <span onClick={this.logoutClick} className={`${styles['flex-center']} ${styles['login-details-inn']}`}>
                        <SVGComponent clsName={`${styles['logout-icon']}`} src="icons/common-icon/icon-logout" />
                        <span className={`${styles['pl-20']} `}>Logout</span>
                      </span>
                      :
                      <span onClick={this.loginClick} className={`${styles['flex-center']} ${styles['login-details-inn']}`}>
                        <SVGComponent clsName={`${styles['login-icon']}`} src="icons/common-icon/icon-login" />
                        <span className={`${styles['pl-20']}`}>Login</span>
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
              <Modal className={`react-router-modal__modal ${styles['login-reg-modal']} ${styles['p-20']}`} onBackdropClick={() => this.setState({ show: false })}>
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
    isLoggedIn: selectors.getLoggedInStatus(store),
    cartResults: cartSelectors.getCartResults(store),
  })
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getLoginInfo: actionCreators.getLoginInfo,
      logout: actionCreators.userLogout,
      getCartResults: cartActionCreators.getCartResults,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionBar);
