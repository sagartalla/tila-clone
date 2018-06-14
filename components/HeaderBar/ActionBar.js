import React, { Component } from 'react';
import { Modal } from "react-router-modal";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ModalContainer } from 'react-router-modal';
import SVGCompoent from '../common/SVGComponet';
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

  state = { show: false }

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

  render() {
    const { isLoggedIn } = this.props;
    return (
      <div className={styles['actionbar-wrapper']}>
        <div className={`${styles['action-item']} ${styles['flex-center']} ${styles['justify-center']}`}>
          <SVGCompoent clsName={`${styles['wish-list-icon']}`} src="icons/wish-list/wish-list-icon" />
        </div>
        <div className={`${styles['action-item']} ${styles['flex-center']} ${styles['justify-center']}`}>
          <Link route="/cart">
            <span className={`${styles['flex-center']} ${styles['justify-center']}`}>
              <SVGCompoent clsName={`${styles['cart-icon']}`} src="icons/cart/cart-icon" />
            </span>
          </Link>
        </div>
        <div className={`${styles['action-item']} ${styles['flex-center']} ${styles['justify-center']}`}>
          <Link route="/cam">
            <span className={`${styles['flex-center']} ${styles['justify-center']}`}>
              <SVGCompoent clsName={`${styles['cam-icon']}`} src="icons/cam/cam-icon" />
            </span>
          </Link>
        </div>
        <div className={`${styles['action-item']} ${styles['flex-center']} ${styles['justify-center']}`}>
          {
            isLoggedIn
              ?
              <span onClick={this.logoutClick}>logout</span>
              :
              <span onClick={this.loginClick}>login</span>
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