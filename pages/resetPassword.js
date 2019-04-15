import React from 'react';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import makeStore from '../store';
import Base, { baseActions } from './base';
import ResetPassword from '../components/Login/ResetPassword';

class ResetPasswordPage extends Base {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
    };
  }
  pageName = 'RESETPASSWORD';
  componentWillMount() {
    let token = window.location.pathname.split('/');
    token = token[token.length - 1];
    this.setState({
      token,
    });
  }

  render() {
    const { token } = this.state;
    return (
      <ResetPassword token={token} />
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...baseActions,
    },
    dispatch,
  );

export default withRedux(makeStore, null, mapDispatchToProps)(ResetPasswordPage);
