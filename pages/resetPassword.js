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
      // token: null,
    };
  }
  pageName = 'RESETPASSWORD';
  // componentWillMount() {
  //   let token = window.location.pathname.split('/');
  //   token = token[token.length - 1];
  //   this.setState({
  //     token,
  //   });
  // }

  render() {
    // const { token } = this.state;
    return (
    // TODO >>> token should be dynamic
    // <ResetPassword token={token}/>
      <ResetPassword token="ab7eb0775db645ff9b96af619a6e97aa" />
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
