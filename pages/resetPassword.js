import React from 'react';
import withRedux from 'next-redux-wrapper';
import makeStore from '../store';
import { bindActionCreators } from 'redux';
import Base, { baseActions } from './base';
import ResetPassword from '../components/Login/ResetPassword';

class ResetPasswordPage extends Base {
  pageName = 'RESETPASSWORD';
  render() {
    return (
      <ResetPassword token={this.props.url.query}/>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...baseActions,
    },
    dispatch,
  )

export default withRedux(makeStore, null, mapDispatchToProps)(ResetPasswordPage);
