import React from 'react';
import NoSSR from 'react-no-ssr';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';

import AuthWrapper from '../components/common/AuthWrapper';
import HeaderBar from '../components/HeaderBar';
import makeStore from '../store';

import Base, { baseActions } from './base';
import Layout from '../layout/main';

class CamPage extends Base {
  pageName = 'LOGIN';
  render(){
    return (
      <Layout>
        <NoSSR>
          <HeaderBar />
          <AuthWrapper />
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

export default withRedux(makeStore, null, mapDispatchToProps)(CamPage);
