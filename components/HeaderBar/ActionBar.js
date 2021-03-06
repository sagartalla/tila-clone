import React, { Component } from 'react';
import NoSSR from 'react-no-ssr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown } from 'react-bootstrap';
import Cookie from 'universal-cookie';

import { selectors as personalSelectors, actionCreators as personalActionCreators } from '../../store/cam/personalDetails';
import { actionCreators as wishListActionCreators, selectors as wishListSelectors } from '../../store/cam/wishlist';
import Cart from '../Cart';
import Wishlist from '../Cam/Wishlist';
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

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './header_en.styl';
import styles_ar from './header_ar.styl';
import ProfilePic from '../Cam/Sidebar/ProfilePic';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const { HEADER_PAGE, PDP_PAGE } = languageDefinations();
const cookies = new Cookie();

const language = cookies.get('language') || 'ar';
const country = cookies.get('country') || 'SAU';
const auth = cookies.get('auth');

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
    this.state = {
      hideLogin: props.hideLogin,
    }
    this.logoutClick = this.logoutClick.bind(this);
    this.loginClick = this.loginClick.bind(this);
    this.onBackdropClick = this.onBackdropClick.bind(this);
  }

  componentDidMount() {
    if (window.location.pathname.indexOf('resetpassword') === -1 && window.sessionStorage.getItem('TILuservisitcount') !== '1' && !auth) {
      if (!window.sessionStorage.getItem('TILuservisitcount')) {
        window.sessionStorage.setItem('TILuservisitcount', 1);
      }
      this.props.showLoginScreen();
    }
    this.props.getUserProfileInfo();
    this.props.getLoginInfo();
    this.props.getCartResults();
    // console.log('loggedin', this.props.isLoggedIn);
    if (this.props.isLoggedIn) {
      this.props.getWishlist();
      this.props.getWishlistData();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { closeThankYouScreen } = this.props;
    if (nextProps.isLoggedIn !== this.props.isLoggedIn) {
      this.props.getWishlistData();
      this.props.getWishlist();
    }

    // let show = ((nextProps.isLoggedIn != this.props.isLoggedIn) && !this.state.logoutClicked) || this.state.loginClicked || !!nextProps.error || (!nextProps.isLoggedIn && nextProps.showLogin) || nextProps.loginInProgress || nextProps.showEmailVerificationScreen;
    // if (window.location.pathname.indexOf('/payment') > -1) {
    //   show = false;
    // }


    this.setState({
      // show,
      // logoutClicked: false,
      // showLoginScreen: nextProps.showLoginScreen,
      loginClicked: false,
    });

    if ((nextProps && nextProps.activeObj && nextProps.activeObj.nextPage === null) || (nextProps.showEmailVerifySuccess && (this.props.showEmailVerifySuccess !== nextProps.showEmailVerifySuccess))) {
      setTimeout(() => {
        closeThankYouScreen();
        nextProps.showEmailVerifySuccess && Router.pushRoute(`${window.location.origin}/${cookies.get('language')}`);
      }, 2000);
    }

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
    if (nextProps.userInfo.personalInfo.image_url === this.props.userInfo.personalInfo.image_url) {
      return;
    }
    nextProps.userInfo.personalInfo.image_url && this.props.downloadPic(nextProps.userInfo.personalInfo.image_url);
  }


  // loginClick() {
  //   digitalData.page.pageInfo.pageType = 'Login Page';
  //   digitalData.page.pageInfo.pageName = 'Login Page';
  //   const state = {};
  //   state.loginClicked = true;
  //   state.mode = 'login';
  //   state.show = true;
  //   this.setState(state);
  // }


  onBackdropClick(logoutRequired = false) {
    const {
      activeObj, closeThankYouScreen, userInfo, userData, isLoggedIn,
    } = this.props;
    this.props.resetLoginError();
    if (logoutRequired) {
      this.props.logout();
    }
    if ((((activeObj.activePage === 'verify_email' || activeObj.activePage === 'shipping_to_page') && activeObj.nextPage === 'thank_you') || ((activeObj.activePage === 'verify_email' && activeObj.nextPage === 'shipping_to_page')))) {
      const data = { nextPage: 'thank_you' };
      const { v2CurrentFlow } = this.props;
      v2CurrentFlow(data);
    }
    this.props.resetShowLogin();
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
  logoutClick() {
    this.props.logout().then((res) => {
      if (res && res.value && res.value.status === 200) {
        window.location = `${window.location.origin}/${cookies.get('language')}`;
        localStorage.clear();
      }
    });
  }

  loginClick(e) {
    digitalData.page.pageInfo.pageType = 'Login Page';
    digitalData.page.pageInfo.pageName = 'Login Page';
    this.setState({
      hideLogin: false,
    }, () => {
      this.props.showLoginScreen();
    })
    if (!window.sessionStorage.getItem('TILuservisitcount')) {
      window.sessionStorage.setItem('TILuservisitcount', 1);
    }
    // const state = {};
    // state.loginClicked = true;
    // if (e.currentTarget.getAttribute('data-mode') === 'sign-up') {
    //   state.mode = 'register';
    // } else {
    //   state.mode = 'login';
    // }
    // state.show = true;
  }

  moveToWishlist = () => {
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      Router.pushRoute(`/${language}/customer/wishlist`);
    } else {
      this.loginClick();
    }
  }

  render() {
    const {
      isLoggedIn, cartResults, userInfo, wishListCount, getEditDetails, hideCountry, showLoginPage,
    } = this.props;
    const { hideLogin } = this.state;
    return (
      <div className={styles['actionbar-wrapper']}>
        <div className={`${styles['action-item']} ${styles['flex-center']} ${styles['justify-center']} ${styles['country-code']}`}>
          <NoSSR>
            <Language />
          </NoSSR>
        </div>
        <div className={`${styles['action-item']} ${styles['flex-center']} ${styles['justify-center']} ${styles['country-code']}`}>
          <NoSSR>
            {hideCountry ? null :
            <Country />
            }
          </NoSSR>
        </div>
        <div className={`${styles['action-item']} ${styles['wishlist-inn']} ${styles['pt-10']} ${styles['pb-10']} ${styles['pr-15']} ${styles['pl-15']} ${styles['flex-center']} ${styles['justify-center']}`}>
          <Dropdown id="cart-toggle" className={`${styles['round-shape']} ${styles['flex-center']} ${styles['justify-center']}`}>
            <Dropdown.Toggle style={{ display: 'none' }} />
            <Link route={`/${language}/customer/wishlist`}>
              <a style={{ dispaly: 'block' }} onClick={this.moveToWishlist}>
                <span className={`${styles['flex-center']} ${styles['justify-center']} ${styles.relative}`} title={PDP_PAGE.GO_TO_WISHLIST}>
                  <SVGComponent clsName={`${styles['wish-list-icon']}`} src="icons/wish-list/wish-list-icon" />
                  <span className={`${styles.absolute} ${styles['cart-count']} ${styles['flex-center']} ${styles['justify-center']} ${styles['fs-10']} ${styles['white-color']}`}>{wishListCount}</span>
                </span>
              </a>
            </Link>
            <Dropdown.Menu className={`${styles['wishlist-item']}`}>
              <span>
                <Wishlist
                  showMiniWishlist
                />
              </span>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className={`${styles['action-item']} ${styles['cart-inn']} ${styles['pt-10']} ${styles['pb-10']} ${styles['flex-center']} ${styles['justify-center']} ${styles['pr-15']} ${styles['pl-15']}`}>
          <Dropdown id="cart-toggle" className={`${styles['round-shape']} ${styles['flex-center']} ${styles['justify-center']}`}>
            <Dropdown.Toggle style={{ display: 'none' }} />
            <Link route={`/${language}/cart`}>
              <a style={{ display: 'block' }}>
                <span className={`${styles['flex-center']} ${styles['justify-center']} ${styles.relative}`} title={PDP_PAGE.GO_TO_CART}>
                  <SVGComponent clsName={`${styles['cart-icon']}`} src="icons/cart/cart-icon" />
                  <span className={`${styles.absolute} ${styles['cart-count']} ${styles['flex-center']} ${styles['justify-center']} ${styles['fs-10']} ${styles['white-color']}`}>{cartResults.items.length}</span>
                </span>
              </a>
            </Link>
            <Dropdown.Menu className={`${styles['cart-item']}`}>
              <span>
                <Cart
                  showMiniCart
                  showCheckOutBtn
                  cartData={cartResults}
                  editCartDetails={getEditDetails}
                />
              </span>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className={`${styles['action-item']} ${styles['flex-center']} ${styles['account-inn']} ${styles['pt-10']} ${styles['pb-10']} ${styles['justify-center']} ${styles.relative}`}>
          <Dropdown id="profile-login" className={`${isLoggedIn ? null : `${styles['round-shape']}`} ${styles['flex-center']} ${styles['justify-center']} ${styles.pointer}`}>
            <Dropdown.Toggle style={{ display: 'none' }} />
            <span className={`${styles['flex-center']} ${styles['justify-center']} ${styles['profile-icon-main']}`}>
              { isLoggedIn ?
              <div className={`${styles['flex-center']} ${styles['flex-colum']}`}>
                {this.props.imgSource ?
                  <ProfilePic loader={false} userInfo={userInfo} imgUrl={this.props.imgSource} header/>
                :
                  <span className={`${styles['after-login-pf']}`}><SVGComponent clsName={`${styles['profile-icon']}`} src="icons/profile-icons/account-icon" /></span>
                }
                {userInfo.personalInfo ?
                  <span className={`${styles['fs-10']} ${styles['text-uppercase']}`}>
                    {userInfo.personalInfo.first_name ?
                      <span>{userInfo.personalInfo.first_name.charAt(0)}</span>
                      :
                      null
                    }
                    {userInfo.personalInfo.last_name ?
                      <span>{userInfo.personalInfo.last_name.charAt(0)}</span>
                      :
                      null
                    }
                  </span>
                  :
                  null
                }
              </div>
            :
              <SVGComponent clsName={`${styles['profile-icon']}`} src="icons/profile-icons/account-icon" />
            }
            </span>
            { isLoggedIn ?
              <Dropdown.Menu className={`${styles['account-item']}`}>
                <div className={styles['profile-part']}>
                  <div className={`${styles['flex-center']} ${styles['ple-icon']}`}>
                    <ProfilePic loader={false} userInfo={userInfo} imgUrl={this.props.imgSource} />
                    <span className={`${styles['profile-name']}`}>
                      <span className={`${styles['hello-text-clr']}`}>{HEADER_PAGE.HELLO}</span>
                      {userInfo.personalInfo.first_name ?
                        <span>
                          <span className={`${styles['user-name']} ${styles['mr-5']}`}>{userInfo.personalInfo.first_name}</span>
                          {userInfo.personalInfo.first_name.length < 15 && <span className={`${styles['mr-5']}`}>{userInfo.personalInfo.last_name.charAt(0)}</span>}
                        </span> : <span>{`${HEADER_PAGE.TILA_CUSTOMER}` }</span>}
                    </span>
                  </div>
                  <ul className={`${styles['pl-0']} ${styles['profile-inn']}`}>
                    <li >
                      <a href={`/${language}/customer/profile`} className={`${styles['flex-center']} ${styles['pl-30']} ${styles['pr-20']} ${styles.width100}`}>
                        <SVGComponent clsName={`${styles['profile-icon']}`} src="icons/profile-icons/round-profile" />
                        <span className={styles['pl-25']}>{HEADER_PAGE.MY_ACCOUNT}</span>
                      </a>
                    </li>
                    <li >
                      <a href={`/${language}/customer/orders`} className={`${styles['flex-center']} ${styles['pl-30']} ${styles['pr-20']} ${styles.width100}`}>
                        <SVGComponent clsName={`${styles['profile-icon']}`} src="icons/my-orders" />
                        <span className={styles['pl-25']}>{HEADER_PAGE.MY_ORDERS}</span>
                      </a>
                    </li>
                    {/* <li className={`${styles['flex-center']} ${styles['pl-30']} ${styles['pr-20']}`}>
                  <a href={`/${language}/customer/notifications`} className={styles['flex-center']}>
                    <SVGComponent clsName={`${styles['profile-icon']}`} src="icons/notifications" />
                    <span className={styles['pl-20']}>{HEADER_PAGE.NOTIFICATIONS}</span>
                    </a>
                  </li> */}
                    <li >
                      <a href={`/${language}/help/faq`} target="_blank" className={`${styles['flex-center']} ${styles['pl-30']} ${styles['pr-20']} ${styles['width-100']}`}>
                        <span className={styles.support}>
                          <span className={`${styles['flex-center']} ${styles['justify-center']}`}>?</span>
                        </span>
                        <span className={styles['pl-20']}>{HEADER_PAGE.HELP_SUPPORT}</span>
                      </a>
                    </li>
                    <li onClick={this.logoutClick} className={`${styles['flex-center']} ${styles['pl-30']} ${styles['pr-20']}`}>
                      <span className={`${styles['flex-center']} ${styles['login-details-inn']} ${styles.pointer}`}>
                        <SVGComponent clsName={`${styles['logout-icon']}`} src="icons/common-icon/icon-logout" />
                        <span className={`${styles['pl-25']} `}>{HEADER_PAGE.LOGOUT}</span>
                      </span>
                    </li>
                  </ul>
                </div>
              </Dropdown.Menu>
            :
              <Dropdown.Menu className={`${styles['account-item']}`}>
                <div className={styles['profile-part']}>
                  <ul className={`${styles['pl-0']} ${styles['profile-inn']}`}>
                    <li >
                      <a href={`/${language}/help/faq`} target="_blank" className={`${styles['flex-center']} ${styles['pl-30']} ${styles['pr-20']} ${styles['width-100']}`}>
                        <span className={styles.support}>
                          <span className={`${styles['flex-center']} ${styles['justify-center']}`}>?</span>
                        </span>
                        <span className={styles['pl-15']}>{HEADER_PAGE.HELP_SUPPORT}</span>
                      </a>
                    </li>
                    <li onClick={this.loginClick} className={`${styles['flex-center']} ${styles['pl-30']} ${styles['pr-20']}`}>
                      <span className={`${styles['flex-center']} ${styles['login-details-inn']} ${styles.pointer}`}>
                        <SVGComponent clsName={`${styles['login-icon']}`} src="icons/common-icon/icon-login" />
                        <span className={`${styles['pl-20']}`}>{HEADER_PAGE.LOGIN}</span>
                      </span>
                    </li>
                  </ul>
                </div>
              </Dropdown.Menu>
            }
          </Dropdown>
        </div>
        {hideLogin ? null :
          showLoginPage ?
            <Login onBackdropClick={this.onBackdropClick} />
             : null}
      </div>
    );
  }
}


const mapStateToProps = store => ({
  error: selectors.getErrorMessege(store),
  isLoggedIn: selectors.getLoggedInStatus(store),
  instaCode: selectors.getInstaCode(store),
  cartResults: cartSelectors.getCartResults(store),
  loginInProgress: selectors.getLoginProgressStatus(store),
  userInfo: personalSelectors.getUserInfo(store),
  showLogin: selectors.getShowLogin(store),
  ptaToken: selectors.getPTAToken(store),
  wishListCount: wishListSelectors.getProductsDetails(store).length,
  showEmailVerifySuccess: selectors.showEmailVerifySuccess(store),
  getEditDetails: cartSelectors.getEditDetails(store),
  imgSource: personalSelectors.getImageSource(store),
  activeObj: selectors.getActive(store),
  showLoginPage: selectors.showLogin(store),
  userData: selectors.userInfo(store),
  showUserInfo: selectors.showUserInfo(store),
  currentFlow: selectors.currentFlow(store),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getLoginInfo: actionCreators.getLoginInfo,
    logout: actionCreators.userLogout,
    displayLogin: actionCreators.showLogin,
    getCartResults: cartActionCreators.getCartResults,
    resetLoginError: actionCreators.resetLoginError,
    resetShowLogin: actionCreators.resetShowLogin,
    savePtaToken: actionCreators.savePtaToken,
    userLogin: actionCreators.userLogin,
    getWishlist: wishListActionCreators.getWishlistProducts,
    getUserProfileInfo: personalActionCreators.getUserProfileInfo,
    downloadPic: personalActionCreators.downloadPic,
    showLoginScreen: actionCreators.showLoginScreen,
    closeThankYouScreen: actionCreators.closeThankYouScreen,
    v2CurrentFlow: actionCreators.v2CurrentFlow,
    v2NextPage: actionCreators.v2NextPage,
    getWishlistData: wishListActionCreators.getWishlist,

  },
  dispatch,
);


export default connect(mapStateToProps, mapDispatchToProps)(ActionBar);
