import React from 'react';
import NoSSR from 'react-no-ssr';
import withRedux from 'next-redux-wrapper';
import makeStore from '../store';

import Layout from '../layout/main';
import Order from '../components/Order';

const OrderPage = ({url}) => (
  <Layout>
    <NoSSR>
      <Order query={url.query} />
    </NoSSR>
  </Layout>
);

export default withRedux(makeStore, null, null)(OrderPage);
