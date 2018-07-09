import React, {Component} from 'react';
import NoSSR from 'react-no-ssr';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';

import makeStore from '../store';
import Base, { baseActions } from './base';
import Layout from '../layout/main';
import Thankyou from '../components/Thankyou';

class ThankyouPage extends Base {
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...baseActions,
    },
    dispatch,
  )

export default withRedux(makeStore, null, mapDispatchToProps)(ThankyouPage);
