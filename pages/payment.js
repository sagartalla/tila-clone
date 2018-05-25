import React, { Component } from 'react';
import NoSSR from 'react-no-ssr';
import withRedux from 'next-redux-wrapper';
import makeStore from '../store';

import Layout from '../layout/main';
import Payments from '../components/Payments';
import Base from './base';

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

export default withRedux(makeStore, null, null)(PaymentPage);
