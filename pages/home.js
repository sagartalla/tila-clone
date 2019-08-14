import React from 'react';
import Cookies from 'universal-cookie';
import NoSSR from 'react-no-ssr';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';

import makeStore from '../store';
import Layout from '../layout/main';
import FTB from '../components/Ftb';
import Base, { baseActions } from './base';
import { actionCreators as landingactionCreators } from '../store/landing';

class Home extends Base {
  pageName = 'HOME_PAGE'
  static async getInitialProps({
    store, isServer, query,
  }) {
    const params = {
      page: 'homePage',
      id: 'home_page',
    };
    if (query.category) {
      params.page = 'mainCategoryPage';
      params.id = query.category;
      params.published = false;
    }

    await Promise.all([
      store.dispatch(landingactionCreators.getPage(params)),
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

export default withRedux(makeStore, null, mapDispatchToProps)(Home);
