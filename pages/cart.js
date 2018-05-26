import React, { Component } from 'react';
import NoSSR from 'react-no-ssr';
import withRedux from 'next-redux-wrapper';
import makeStore from '../store';

import Layout from '../layout/main';
import Cart from '../components/Cart';
import Base from './base';

class CartPage extends Base {
  pageName = 'CART'
  render() {
    return (
      <NoSSR>
        <Layout>
          <Cart />
        </Layout>
      </NoSSR>
    );
  }
}

export default withRedux(makeStore, null, null)(CartPage);
