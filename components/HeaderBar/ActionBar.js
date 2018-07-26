import React, { Component } from 'react';
import { Modal } from "react-router-modal";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ModalContainer } from 'react-router-modal';
import { Dropdown, MenuItem } from "react-bootstrap";

import Country from './includes/Country';
import SVGComponent from '../common/SVGComponet';
import { selectors, actionCreators } from '../../store/auth';
import Login from '../Login';
import { Link } from '../../routes';

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
    const { isLoggedIn } = this.props;
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
          <Link route="/cart">
            <span className={`${styles['flex-center']} ${styles['justify-center']}`}>
              <SVGComponent clsName={`${styles['cart-icon']}`} src="icons/cart/cart-icon" />
            </span>
          </Link>
        </div>
        <div className={`${styles['action-item']} ${styles['flex-center']} ${styles['justify-center']}`}>
          <Link route="/cam">
            <span className={`${styles['flex-center']} ${styles['justify-center']}`}>
              <SVGComponent clsName={`${styles['cam-icon']}`} src="icons/cam/cam-icon" />
            </span>
          </Link>
        </div>
        <div className={`${styles['action-item']} ${styles['flex-center']} ${styles['justify-center']} ${styles['relative']} ${styles['profile-login']}`}>
          <Dropdown id="profile-login" className={styles['profile-login-inn']}>
            <Dropdown.Toggle>
            <span className={`${styles['flex-center']} ${styles['justify-center']} ${styles['profile-icon-main']}`}>
              <SVGComponent clsName={`${styles['profile-icon']}`} src="icons/profile-icons/edit-profile-icon" />
            </span>
            </Dropdown.Toggle>
            <Dropdown.Menu className={`${styles['item']} ${styles['p-20']}`}>
              <h4 className={`${styles['fs-16']} ${styles['fontW600']} ${styles['mt-0']}`}>Your Account</h4>
              <p className={styles['fs-12']}>Access account and manage orders</p>
              <div className={styles['flx-spacebw-alignc']}>
                <span onClick={this.loginClick} data-mode="sign-up" className={`${styles['flex-center']} ${styles['login-details-inn']} ${styles['border-radius2']}`}>
                  <SVGComponent clsName={`${styles['logout-icon']}`} src="icons/common-icon/icon-signup" />
                  <span className={`${styles['pl-10']} ${styles['fontW700']} ${styles['lgt-blue']} `}>SIGN UP</span>
                </span>
                {isLoggedIn
                  ?
                  <span onClick={this.logoutClick} className={`${styles['flex-center']} ${styles['login-details-inn']} ${styles['border-radius2']}`}>
                    <SVGComponent clsName={`${styles['logout-icon']}`} src="icons/common-icon/icon-logout" />
                    <span className={`${styles['pl-10']} ${styles['fontW700']} ${styles['lgt-blue']} `}>LOGOUT</span>
                  </span>
                  :
                  <span onClick={this.loginClick} className={`${styles['flex-center']} ${styles['login-details-inn']} ${styles['border-radius2']}`}>
                    <SVGComponent clsName={`${styles['login-icon']}`} src="icons/common-icon/icon-login" />
                    <span className={`${styles['pl-10']} ${styles['fontW700']} ${styles['lgt-blue']}`}>LOGIN</span>
                  </span>
                }
              </div>
            </Dropdown.Menu>
          </Dropdown>
   
          {/* {!isHidden &&
            <div className={`${styles['profile-edit']} ${styles['bg-white']} ${styles['p-10']}`}>
              {isLoggedIn
                ?
                <span onClick={this.logoutClick}>logout</span>
                :
                <span onClick={this.loginClick}>login</span>
              }
            </div>
          } */}
        </div>
        {
          (this.state.show)
            ?
            (
              <Modal className={`react-router-modal__modal ${styles['login-reg-modal']} ${styles['p-20']}`} onBackdropClick={() => this.setState({ show: false })}>
                <Login mode={this.state.mode}/>
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
    isLoggedIn: selectors.getLoggedInStatus(store)
  })
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getLoginInfo: actionCreators.getLoginInfo,
      logout: actionCreators.userLogout,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionBar);
