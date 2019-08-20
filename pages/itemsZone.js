import React from 'react';
import NoSSR from 'react-no-ssr';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';

import makeStore from '../store';
import Layout from '../layout/main';
import Zones from '../components/Zones';
import Base, { baseActions } from './base';
import { actionCreators as landingactionCreators } from '../store/landing';

class ItemsZone extends Base {
  pageName = 'ITEMS_ZONE';
  // static async getInitialProps({
  //   store, isServer, query,
  // }) {
  //   await Promise.all([
  //     store.dispatch(landingactionCreators.getPage()),
  //   ]);
  //   return { isServer };
  // }
  render() {
    const { query } = this.props.url;
    return (
      <NoSSR>
        <Layout>
          <Zones query={query} />
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
  );

export default withRedux(makeStore, null, mapDispatchToProps)(ItemsZone);
