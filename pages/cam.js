import React from 'react';
import NoSSR from 'react-no-ssr';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';

import makeStore from '../store';

import Base, { baseActions } from './base';
import Layout from '../layout/main';
import Cam from '../components/Cam';

class CamPage extends Base {
  pageName = 'CAM';
  render() {
    const { url } = this.props;
    return (
      <Layout>
        <NoSSR>
          <Cam tabDetails={url.query.tabDetails} query={url.query} />
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
  );

export default withRedux(makeStore, null, mapDispatchToProps)(CamPage);
