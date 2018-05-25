import React from 'react';
import NoSSR from 'react-no-ssr';
import withRedux from 'next-redux-wrapper';
import makeStore from '../store';

import Layout from '../layout/main';
import Thankyou from '../components/Thankyou';
import Base from './base';

class ThankyouPage extends Base {
  pageName = 'THANK YOU';
  render() {
    return (
      <NoSSR>
        <Layout>
          <Thankyou />
        </Layout>
      </NoSSR>
    );
  }
}

export default withRedux(makeStore, null, null)(ThankyouPage);
