import React from 'react';
import NoSSR from 'react-no-ssr';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';
import { actionCreators as megamenuActionsCreators } from '../store/megamenu';
import makeStore from '../store';
import LoaderBarContext from '../components/helpers/context/loaderBarContext';
import Base, { baseActions } from './base';
import Layout from '../layout/main';
import Cam from '../components/Cam';

class CamPage extends Base {
    static async getInitialProps({ store, isServer, query, req }) {
      await store.dispatch(megamenuActionsCreators.getMegamenu());
      return { isServer }
    }
  pageName = 'CAM';
  render() {
    const { url, loaderProps } = this.props;
    return (
      <LoaderBarContext.Provider value={loaderProps}>
        <Layout>
          <Cam tabDetails={url.query.tabDetails} query={url.query} />
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

export default withRedux(makeStore, null, mapDispatchToProps)(CamPage);
