import React from 'react';
import Cookies from 'universal-cookie';
import NoSSR from 'react-no-ssr';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';

import makeStore from '../store';
import Layout from '../layout/main';
import FTB from '../components/Ftb';
import Base, { baseActions } from './base';
import { actionCreators as LandingactionCreators } from '../store/landing';

class FirstTimeBuyer extends Base {
  pageName = 'FIRST_TIME_BUYER'
  static async getInitialProps({
    store, isServer,
  }) {
    await Promise.all([
      store.dispatch(LandingactionCreators.getPage({ page: 'propertyPage', id: 'first_time_buyer' })),
    ]);
    return { isServer };
  }
  render() {
    return (
      <NoSSR>
        <Layout>
          <FTB />
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

export default withRedux(makeStore, null, mapDispatchToProps)(FirstTimeBuyer);
