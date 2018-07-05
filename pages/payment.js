import React, { Component } from 'react';
import NoSSR from 'react-no-ssr';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';

import makeStore from '../store';

import Layout from '../layout/main';
import Payments from '../components/Payments';
import Base, { baseActions } from './base';

class PaymentPage extends Base {
  pageName = 'PAYMENT';
  render() {
    return (
      <NoSSR>
        <Layout>
          <Payments />
        </Layout>
      </NoSSR>
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

export default withRedux(makeStore, null, mapDispatchToProps)(PaymentPage);
