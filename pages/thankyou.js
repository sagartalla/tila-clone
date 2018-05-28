import React from 'react';
import NoSSR from 'react-no-ssr';
import withRedux from 'next-redux-wrapper';
import makeStore from '../store';

import Layout from '../layout/main';
import Thankyou from '../components/Thankyou';
import Base from './base';

const ThankyouPage = (props) => {
  pageName = 'THANK YOU';
  const urlParams= { transId: props.url.query.transId, status: props.url.query.status }; 
  return (
  <NoSSR>
    <Layout>
      <Thankyou { ...urlParams} />
    </Layout>
  </NoSSR>
)
};

export default withRedux(makeStore, null, null)(ThankyouPage);
