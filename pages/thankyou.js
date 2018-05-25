import React from 'react';
import NoSSR from 'react-no-ssr';
import withRedux from 'next-redux-wrapper';
import makeStore from '../store';

import Layout from '../layout/main';
import Thankyou from '../components/Thankyou';

const ThankyouPage = (props) => (
  <NoSSR>
    <Layout>
      <Thankyou props={props.url.query.tabDetails} />
    </Layout>
  </NoSSR>
);

export default withRedux(makeStore, null, null)(ThankyouPage);
