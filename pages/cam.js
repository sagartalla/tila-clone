import React from 'react';
import NoSSR from 'react-no-ssr';
import withRedux from 'next-redux-wrapper';

import makeStore from '../store';

import Cam from '../components/Cam';
import Layout from '../layout/main';

const CamPage = () => (
  <Layout>
    <NoSSR>
      <Cam />
    </NoSSR>
  </Layout>
);

export default withRedux(makeStore, null, null)(CamPage);
