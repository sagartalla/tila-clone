import React, { Component } from 'react';
import { Modal } from "react-router-modal";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ModalContainer } from 'react-router-modal';
import SVGComponent from '../common/SVGComponet';
import { selectors, actionCreators } from '../../store/auth';
import Login from '../Login';
import { Link } from '../../routes';

import { mergeCss } from '../../utils/cssUtil';
const styles = mergeCss('components/HeaderBar/header');


class ActionBar extends Component {
  constructor(props) {
    super(props);
    this.toggleCountry = this.toggleCountry.bind(this)
    this.toggleHidden = this.toggleHidden.bind(this);
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

  loginClick() {
    this.setState({ show: true });
  }

  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  toggleCountry() {
    this.setState({
      isCountryToggle: !this.state.isCountryToggle
    })
  }

  render() {
    const { isLoggedIn } = this.props;
    const { isHidden, isCountryToggle } = this.state;
    return (
      <div className={styles['actionbar-wrapper']}>
        <div className={`${styles['action-item']} ${styles['flex-center']} ${styles['justify-center']} ${styles['country-code']} ${styles['relative']}`}>
          <span onClick={this.toggleCountry} className={`${styles['flex-center']} ${styles['justify-center']}`}>
            <img src="/static/img/bg-img/uae-flag.png" />
          </span>
          {!isCountryToggle &&
            <span className={`${styles['flex']} ${styles['main-toggle-part']} ${styles['absolute']} ${styles['bg-white']} ${styles['p-10']}`}>
              <img src="static/img/bg-img/ksa.png" />
            </span>
          }
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
        <div className={`${styles['action-item']} ${styles['flex-center']} ${styles['justify-center']} ${styles['relative']}`}>
          <span onClick={this.toggleHidden} className={`${styles['flex-center']} ${styles['justify-center']} ${styles['profile-icon-main']}`}>
            <SVGComponent clsName={`${styles['profile-icon']}`} src="icons/profile-icons/edit-profile-icon" />
          </span>
          {!isHidden &&
            <div className={`${styles['profile-edit']} ${styles['bg-white']} ${styles['p-10']}`}>
              {isLoggedIn
                ?
                <span onClick={this.logoutClick}>logout</span>
                :
                <span onClick={this.loginClick}>login</span>
              }
            </div>
          }
        </div>
        {
          (this.state.show)
            ?
            (
              <Modal className={`react-router-modal__modal ${styles['login-reg-modal']} ${styles['p-20']}`} onBackdropClick={() => this.setState({ show: false })}>
                <Login />
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
