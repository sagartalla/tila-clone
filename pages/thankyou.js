import React, {Component} from 'react';
import NoSSR from 'react-no-ssr';
import withRedux from 'next-redux-wrapper';
import makeStore from '../store';

import Layout from '../layout/main';
import Thankyou from '../components/Thankyou';
import Base from './base';

class ThankyouPage extends Component {
  pageName = 'THANK YOU';
  render () {
    const {orderId, status} = this.props.url.query;
    const urlParams= { orderId, status }; 
    return (
      <NoSSR>
        <Layout>
          <Thankyou { ...urlParams} />
        </Layout>
      </NoSSR>
    );
  }
}

export default withRedux(makeStore, null, null)(ThankyouPage);
