import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, selectors } from '../../../store/auth';

class AuthWrapper extends Component {
  componentDidMount() {
    const { isLoggedIn } = this.props;
    if (!isLoggedIn) {
      this.props.showLoginScreen();
    }
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.isLoggedIn !== this.props.isLoggedIn) && nextProps.isLoggedIn) {
      this.props.closeThankYouScreen();
    }
    // if (!nextProps.isLoginShown) {
    //   this.props.popupClosed && this.props.popupClosed();
    // } else {   
    //   this.props.popupOpened && this.props.popupOpened();
    // }
  }

  render() {
    const { children, isLoggedIn } = this.props;
    if (isLoggedIn) {
      return (
        <Fragment>
          {children ? children : null}
        </Fragment>
      );
    }
    return null;
  }
}

const mapStateToProps = store => ({
  isLoggedIn: selectors.getLoggedInStatus(store),
  isLoginShown: selectors.getShowLogin(store)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      showLoginScreen: actionCreators.showLoginScreen,
      closeThankYouScreen: actionCreators.closeThankYouScreen,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(AuthWrapper);
