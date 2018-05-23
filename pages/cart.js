import React from 'react';
import NoSSR from 'react-no-ssr';
import withRedux from 'next-redux-wrapper';
import makeStore from '../store';

import Layout from '../layout/main';
import Cart from '../components/Cart';

const CartPage = () => (
  <NoSSR>
    <Layout>
      <Cart />
    </Layout>
  </NoSSR>
);

export default withRedux(makeStore, null, null)(CartPage);
