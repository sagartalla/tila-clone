import React from 'react';
import NoSSR from 'react-no-ssr';
import withRedux from 'next-redux-wrapper';
import makeStore from '../store';

import Layout from '../layout/main';
import Cam from '../components/Cam';

const CamPage = (props) => (
  <Layout>
    <NoSSR>
      <Cam tabDetails={props.url.query.tabDetails}/>
    </NoSSR>
  </Layout>
);

export default withRedux(makeStore, null, null)(CamPage);
