import React, { Component } from 'react';
import { Modal } from 'react-router-modal';
import NoSSR from 'react-no-ssr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown } from 'react-bootstrap';
import Cookie from 'universal-cookie';
import { selectors as personalSelectors } from '../../store/cam/personalDetails';
import { actionCreators as wishListActionCreators, selectors as wishListSelectors } from '../../store/cam/wishlist';

import Cart from '../Cart';
import Login from '../Login';
import { Link, Router } from '../../routes';
import Country from './includes/Country';
import Language from './includes/Language';
import publicUrls from '../../constants';
import SVGComponent from '../common/SVGComponet';

import { selectors, actionCreators } from '../../store/auth';
import { actionCreators as cartActionCreators, selectors as cartSelectors } from '../../store/cart';
import { languageDefinations } from '../../utils/lang';

import lang from '../../utils/language';

import styles_en from './header_en.styl';
import styles_ar from './header_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;

const { HEADER_PAGE, PDP_PAGE } = languageDefinations();
const cookies = new Cookie();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

const snMetaObj = {
  google: {
    channel: 'GOOGLE_AUTH',
    metadata: 'google.access_token',
  },
  facebook: {
    channel: 'FACEBOOK_AUTH',
    metadata: 'fb.access_token',
  },
  instagram: {
    channel: 'INSTAGRAM_AUTH',
    metadata: 'instagram.code',
  },
};

class ActionBar extends Component {
  constructor(props) {
    super(props);
    this.logoutClick = this.logoutClick.bind(this);
    this.loginClick = this.loginClick.bind(this);
    this.onBackdropClick = this.onBackdropClick.bind(this);
  }

  state = {
    show: false,
  }

  componentDidMount() {
    this.props.getLoginInfo();
    this.props.getCartResults();
    this.props.getWishlist();
  }

  componentWillReceiveProps(nextProps) {
    let show = (!nextProps.isLoggedIn && (nextProps.isLoggedIn != this.props.isLoggedIn) && !this.state.logoutClicked) || this.state.loginClicked || !!nextProps.error || nextProps.loginInProgress || (!nextProps.isLoggedIn && nextProps.showLogin) || nextProps.showEmailVerificationScreen;
    if (window.location.pathname.indexOf('/payment') > -1) {
      show = false;
    }
    this.setState({
      show,
      logoutClicked: false,
      loginClicked: false,
    });
    if (nextProps.isLoggedIn) {
      if (nextProps.ptaToken) {
        this.props.savePtaToken(nextProps.ptaToken);
        if (Router.router.pathname === '/login') {
          window.location.replace(`${publicUrls.custhelpDomain}/ci/pta/login/redirect/${unescape(Router.router.query.p_next_page)}/p_li/${nextProps.ptaToken}`);
        }
      } else if (Router.router.pathname === '/login') {
        window.location.replace(`${publicUrls.custhelpDomain}/ci/pta/login/redirect/${unescape(Router.router.query.p_next_page)}/p_li/${cookies.get('ptaToken')}`);
      }
    } else if ((nextProps.instaCode !== this.props.instaCode) && nextProps.instaCode) {
      window.localStorage.removeItem('instagramCode');
      this.getTokenCall('instagram', nextProps.instaCode);
    }
  }

  logoutClick() {
    this.setState({
      logoutClicked: true,
    }, () => {
      this.props.logout();
    });
  }

  loginClick(e) {
    digitalData.page.pageInfo[ 'pageType' ]= 'Login Page';
    digitalData.page.pageInfo.pageName = 'Login Page';
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

  onBackdropClick(logoutRequired = false) {
    this.setState({ show: false });
    this.props.resetLoginError();
    this.props.resetShowLogin();
    if (logoutRequired) {
      this.props.logout();
    }
  }

  getTokenCall = (socialNetwork, token) => {
    const serverData = {
      channel: snMetaObj[socialNetwork].channel,
      metadata: {
        [snMetaObj[socialNetwork].metadata]: token,
      },
    };
    this.props.userLogin(serverData);
  }

  render() {
    const { isLoggedIn, cartResults, userInfo, wishListCount,getEditDetails } = this.props;
    return (
      <div className={styles['actionbar-wrapper']}>
        <div className={`${styles['action-item']} ${styles['flex-center']} ${styles['justify-center']} ${styles['country-code']}`}>
          <NoSSR>
            <Language />
          </NoSSR>
        </div>
        <div className={`${styles['action-item']} ${styles['flex-center']} ${styles['justify-center']} ${styles['country-code']}`}>
          <NoSSR>
            {this.props.hideCountry ? null :
            <Country />
            }
          </NoSSR>
        </div>
        <div className={`${styles['action-item']} ${styles['pr-20']} ${styles['pl-20']} ${styles['border-rt']} ${styles['flex-center']} ${styles['justify-center']}`}>
          <Link route={`/${country}/${language}/cam/wishlist`}>
           <a style={{dispaly:'block'}}>
            <span className={`${styles['flex-center']} ${styles['justify-center']} ${styles['relative']}`} title={PDP_PAGE.GO_TO_WISHLIST}>
              <SVGComponent clsName={`${styles['wish-list-icon']}`} src="icons/wish-list/wish-list-icon" />
              <span className={`${styles['absolute']} ${styles['cart-count']} ${styles['fs-10']} ${styles['white-color']}`}>{wishListCount}</span>
            </span>
            </a>
          </Link>
        </div>
        <div className={`${styles['action-item']} ${styles['flex-center']} ${styles['justify-center']}`}>
          <Dropdown id="cart-toggle" className={`${styles['cart-inn']} ${styles['profile-login-inn']} ${styles['pr-20']}`}>
              <Link route={`/${country}/${language}/cart`}>
                <a style={{dispaly:'block'}}>
                  <span className={`${styles['flex-center']} ${styles['justify-center']} ${styles['relative']}`} title={PDP_PAGE.GO_TO_CART}>
                    <SVGComponent clsName={`${styles['cart-icon']}`} src="icons/cart/cart-icon" />
                    <span className={`${styles['absolute']} ${styles['cart-count']} ${styles['fs-10']} ${styles['white-color']}`}>{cartResults.items.length}</span>
                  </span>
                </a>
              </Link>
            <Dropdown.Menu className={`${styles['cart-item']}`}>
              <span>
                <Cart
                  showMiniCart={true}
                  showCheckOutBtn={true}
                  cartData={cartResults}
                  editCartDetails={getEditDetails}
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
                  <span className={styles['pl-15']}>{HEADER_PAGE.HELLO} {userInfo.personalInfo.first_name || `${HEADER_PAGE.TILA_CUSTOMER}` }</span>
                </div>
                <ul className={`${styles['pl-0']} ${styles['profile-inn']}`}>
                  <li className={`${styles['flex-center']} ${styles['pl-30']} ${styles['pr-20']}`}>
                    <a href={`/${country}/${language}/cam`} className={styles['flex-center']}>
                    <SVGComponent clsName={`${styles['profile-icon']}`} src="icons/profile-icons/round-profile" />
                    <span className={styles['pl-20']}>{HEADER_PAGE.MY_ACCOUNT}</span>
                    </a>
                  </li>
                  <li className={`${styles['flex-center']} ${styles['pl-30']} ${styles['pr-20']}`}>
                    <a href={`/${country}/${language}/cam/orders`} className={styles['flex-center']}>
                      <SVGComponent clsName={`${styles['profile-icon']}`} src="icons/my-orders" />
                      <span className={styles['pl-20']}>{HEADER_PAGE.MY_ORDERS}</span>
                    </a>
                  </li>
                  {/* <li className={`${styles['flex-center']} ${styles['pl-30']} ${styles['pr-20']}`}>
                  <a href={`/${country}/${language}/cam/notifications`} className={styles['flex-center']}>
                    <SVGComponent clsName={`${styles['profile-icon']}`} src="icons/notifications" />
                    <span className={styles['pl-20']}>{HEADER_PAGE.NOTIFICATIONS}</span>
                    </a>
                  </li> */}
                  <li className={`${styles['flex-center']} ${styles['pl-30']} ${styles['pr-20']}`}>
                    <a href={`/${country}/${language}/help/faq`} target="_blank" className={styles['flex-center']}><span className={styles['support']}><span className={`${styles['flex-center']} ${styles['justify-center']}`}>?</span></span>
                      <span className={styles['pl-20']}>{HEADER_PAGE.HELP_SUPPORT}</span>
                    </a>
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
              <Login mode={this.state.mode} onBackdropClick={this.onBackdropClick} />
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
    instaCode: selectors.getInstaCode(store),
    cartResults: cartSelectors.getCartResults(store),
    loginInProgress: selectors.getLoginProgressStatus(store),
    userInfo: personalSelectors.getUserInfo(store),
    showLogin: selectors.getShowLogin(store),
    ptaToken: selectors.getPTAToken(store),
    wishListCount: wishListSelectors.getProductsDetails(store).length,
    showEmailVerificationScreen: selectors.showEmailVerificationScreen(store),
    getEditDetails: cartSelectors.getEditDetails(store),
  });
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getLoginInfo: actionCreators.getLoginInfo,
      logout: actionCreators.userLogout,
      getCartResults: cartActionCreators.getCartResults,
      resetLoginError: actionCreators.resetLoginError,
      resetShowLogin: actionCreators.resetShowLogin,
      savePtaToken: actionCreators.savePtaToken,
      userLogin: actionCreators.userLogin,
      getWishlist: wishListActionCreators.getWishlistProducts,
    },
    dispatch,
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(ActionBar);
