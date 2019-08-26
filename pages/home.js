import React from 'react';
//import NoSSR from 'react-no-ssr';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';

import makeStore from '../store';
import Layout from '../layout/main';
import FTB from '../components/Ftb';
import Base, { baseActions } from './base';
import { actionCreators as landingactionCreators } from '../store/landing';
import LoaderBarContext from '../components/helpers/context/loaderBarContext'

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
    }
    await Promise.all([
      store.dispatch(landingactionCreators.getPage(params)),
    ]);
    return { isServer };
  }
  render() {
    const { loaderProps } = this.props;
    return (
        <LoaderBarContext.Provider value={loaderProps}>
          <Layout>
            <FTB />
          </Layout>
        </LoaderBarContext.Provider>
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
