import React from 'react';
import NoSSR from 'react-no-ssr';
import withRedux from 'next-redux-wrapper';
import makeStore from '../store';
import { bindActionCreators } from 'redux';

import Base, { baseActions } from './base';
import Layout from '../layout/main';
import Order from '../components/Order';

class OrderPage extends Base {
  pageName = 'ORDER';
  render() {
    const { url } = this.props;
    return (
      <Layout>
        <NoSSR>
          <Order query={url.query} />
        </NoSSR>
      </Layout>
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

export default withRedux(makeStore, null, mapDispatchToProps)(OrderPage);
