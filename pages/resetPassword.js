import React from 'react';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import makeStore from '../store';
import Base, { baseActions } from './base';
import ResetPassword from '../components/Login/ResetPassword';

class ResetPasswordPage extends Base {
  pageName = 'RESETPASSWORD';
  render() {
    return (
      <ResetPassword token="4e54318db5db45e99cd9f8c51fb59a93" />
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
